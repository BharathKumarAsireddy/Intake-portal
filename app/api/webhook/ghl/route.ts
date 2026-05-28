import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyGHLWebhookSignature } from '@/lib/ghl'
import type { LoanStatus } from '@/types/loan'

// ── POST /api/webhook/ghl ──────────────────────────────────────────────────────
// Receives inbound webhooks from GoHighLevel (e.g., pipeline stage changes)

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()

    // Verify webhook signature
    const signature = request.headers.get('x-ghl-signature') ?? ''
    if (signature && !verifyGHLWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    let payload: Record<string, unknown>
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { event, loanId, newStatus } = payload as {
      event: string
      loanId?: string
      newStatus?: string
    }

    // Handle inbound GHL events
    switch (event) {
      case 'opportunity_stage_changed': {
        if (!loanId || !newStatus) break

        const supabase = createAdminClient()

        await supabase
          .from('loans')
          .update({
            status: newStatus as LoanStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('ghl_opportunity_id', loanId)

        break
      }

      default:
        console.log('[GHL Webhook] Unhandled event:', event)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[POST /api/webhook/ghl]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
