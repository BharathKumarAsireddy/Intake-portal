import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { triggerGHLWebhook, buildLoanSubmittedPayload } from '@/lib/ghl'
import { generateReferenceNumber } from '@/lib/utils'

// ── GET /api/loans ─────────────────────────────────────────────────────────────
// Returns all loans for the authenticated MLO

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const loanType = searchParams.get('type')

    let query = supabase
      .from('loans')
      .select('*')
      .eq('mlo_id', user.id)
      .order('updated_at', { ascending: false })

    if (status) query = query.eq('status', status)
    if (loanType) query = query.eq('loan_type', loanType)

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ loans: data ?? [] })
  } catch (err) {
    console.error('[GET /api/loans]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── POST /api/loans ────────────────────────────────────────────────────────────
// Creates a new loan file (or handles borrower inquiry)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Borrower inquiry from public form
    if (body.type === 'inquiry') {
      await triggerGHLWebhook({
        event: 'borrower_inquiry',
        ...body,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json({ success: true })
    }

    // MLO loan submission — requires auth
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const year = new Date().getFullYear()

    // Get next sequence number
    const { count } = await supabase
      .from('loans')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${year}-01-01`)

    const referenceNumber = generateReferenceNumber(year, (count ?? 0) + 1)

    const { data: loan, error } = await supabase
      .from('loans')
      .insert({
        reference_number: referenceNumber,
        loan_type: body.loanType,
        status: body.status ?? 'submitted',
        loan_amount: body.loanAmount,
        borrower: body.borrower,
        property: body.property,
        loan_details: body.loanDetails ?? {},
        mlo_id: user.id,
      })
      .select()
      .single()

    if (error) throw error

    // Trigger GHL webhook
    await triggerGHLWebhook(
      buildLoanSubmittedPayload({
        loanId: loan.id,
        referenceNumber: loan.reference_number,
        loanType: loan.loan_type,
        mloName: user.user_metadata?.full_name ?? '',
        mloEmail: user.email ?? '',
        borrowerName: `${body.borrower?.firstName} ${body.borrower?.lastName}`,
        borrowerPhone: body.borrower?.phone ?? '',
        borrowerEmail: body.borrower?.email ?? '',
        propertyAddress: `${body.property?.address}, ${body.property?.city}, ${body.property?.state}`,
        loanAmount: body.loanAmount,
      })
    )

    return NextResponse.json({ loan }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/loans]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
