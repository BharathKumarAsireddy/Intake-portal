import type { LoanStatus } from '@/types/loan'
import { GHL_STAGE_MAP } from './constants'

const GHL_BASE_URL = 'https://rest.gohighlevel.com/v1'

// ── Webhook Trigger ───────────────────────────────────────────────────────────

export async function triggerGHLWebhook(
  payload: Record<string, unknown>
): Promise<void> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[GHL] GHL_WEBHOOK_URL not configured — skipping webhook')
    return
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`[GHL] Webhook failed ${res.status}: ${body}`)
  }
}

// ── Opportunity Stage Update ──────────────────────────────────────────────────

export async function updateGHLOpportunityStage(
  opportunityId: string,
  status: LoanStatus
): Promise<void> {
  const stageName = GHL_STAGE_MAP[status]
  if (!stageName) return  // draft / withdrawn don't map to GHL stages

  const apiKey = process.env.GHL_API_KEY
  if (!apiKey) {
    console.warn('[GHL] GHL_API_KEY not configured — skipping stage update')
    return
  }

  const res = await fetch(
    `${GHL_BASE_URL}/opportunities/${opportunityId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        pipelineStageId: stageName,
        pipelineId: process.env.GHL_PIPELINE_ID,
      }),
    }
  )

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`[GHL] Stage update failed ${res.status}: ${body}`)
  }
}

// ── Webhook Payload Builders ──────────────────────────────────────────────────

export function buildLoanSubmittedPayload(data: {
  loanId: string
  referenceNumber: string
  loanType: string
  mloName: string
  mloEmail: string
  borrowerName: string
  borrowerPhone: string
  borrowerEmail: string
  propertyAddress: string
  loanAmount: number             // in cents — converted to dollars for GHL
}) {
  return {
    event: 'loan_submitted',
    loanId: data.loanId,
    referenceNumber: data.referenceNumber,
    loanType: data.loanType,
    mloName: data.mloName,
    mloEmail: data.mloEmail,
    borrowerName: data.borrowerName,
    borrowerPhone: data.borrowerPhone,
    borrowerEmail: data.borrowerEmail,
    propertyAddress: data.propertyAddress,
    loanAmount: data.loanAmount / 100,   // send as dollars
    status: 'submitted',
    timestamp: new Date().toISOString(),
  }
}

export function buildStatusUpdatePayload(data: {
  loanId: string
  referenceNumber: string
  previousStatus: LoanStatus
  newStatus: LoanStatus
  updatedBy: string
}) {
  return {
    event: 'loan_status_updated',
    ...data,
    newStageLabel: GHL_STAGE_MAP[data.newStatus] ?? data.newStatus,
    timestamp: new Date().toISOString(),
  }
}

// ── Webhook Signature Verification ───────────────────────────────────────────

export function verifyGHLWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.GHL_WEBHOOK_SECRET
  if (!secret) return false

  // GHL uses HMAC-SHA256 for webhook signatures
  const crypto = require('crypto') as typeof import('crypto')
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  )
}
