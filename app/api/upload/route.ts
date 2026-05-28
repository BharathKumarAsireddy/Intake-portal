import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { uploadDocumentSchema } from '@/lib/validations/document'

// ── POST /api/upload ───────────────────────────────────────────────────────────
// Saves document metadata to Supabase after file upload completes via UploadThing

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = uploadDocumentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const { loanId, category, fileName, fileUrl, fileSize, mimeType } = parsed.data

    // Verify MLO owns this loan
    const { data: loan, error: loanError } = await supabase
      .from('loans')
      .select('id, mlo_id')
      .eq('id', loanId)
      .single()

    if (loanError || !loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 })
    }

    if (loan.mlo_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        loan_id: loanId,
        category,
        file_name: fileName,
        file_url: fileUrl,
        file_size: fileSize,
        mime_type: mimeType,
        uploaded_by: user.id,
        status: 'pending_review',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ document }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/upload]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
