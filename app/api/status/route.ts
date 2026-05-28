import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { triggerGHLWebhook, updateGHLOpportunityStage, buildStatusUpdatePayload } from '@/lib/ghl'
import { VALID_STATUS_TRANSITIONS } from '@/lib/constants'
import type { LoanStatus } from '@/types/loan'

// ── PATCH /api/status ──────────────────────────────────────────────────────────
// Updates a loan's status with full workflow: milestone log + GHL sync + activity

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json() as {
      loanId: string
      newStatus: LoanStatus
      notes?: string
    }

    const { loanId, newStatus, notes } = body
    if (!loanId || !newStatus) {
      return NextResponse.json({ error: 'loanId and newStatus are required' }, { status: 400 })
    }

    // Fetch current loan
    const { data: loan, error: loanError } = await supabase
      .from('loans')
      .select('id, status, reference_number, mlo_id, ghl_opportunity_id')
      .eq('id', loanId)
      .single()

    if (loanError || !loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 })
    }

    const previousStatus = loan.status as LoanStatus

    // Validate status transition
    const allowed = VALID_STATUS_TRANSITIONS[previousStatus]
    if (!allowed.includes(newStatus)) {
      return NextResponse.json(
        { error: `Cannot transition from '${previousStatus}' to '${newStatus}'` },
        { status: 422 }
      )
    }

    // Update loan status
    const { error: updateError } = await supabase
      .from('loans')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', loanId)

    if (updateError) throw updateError

    // Log milestone
    await supabase.from('milestones').insert({
      loan_id: loanId,
      status: newStatus,
      updated_by: user.id,
      notes: notes ?? null,
    })

    // Log activity note
    await supabase.from('notes').insert({
      loan_id: loanId,
      content: `Status updated from "${previousStatus}" to "${newStatus}"${notes ? `: ${notes}` : ''}`,
      author_id: user.id,
      is_internal: false,
    })

    // Sync to GHL
    if (loan.ghl_opportunity_id) {
      await updateGHLOpportunityStage(loan.ghl_opportunity_id, newStatus)
    }

    await triggerGHLWebhook(
      buildStatusUpdatePayload({
        loanId,
        referenceNumber: loan.reference_number,
        previousStatus,
        newStatus,
        updatedBy: user.email ?? user.id,
      })
    )

    return NextResponse.json({ success: true, status: newStatus })
  } catch (err) {
    console.error('[PATCH /api/status]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
