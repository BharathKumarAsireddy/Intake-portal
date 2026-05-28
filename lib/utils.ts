import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── Tailwind Class Utility ────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Currency (all monetary values stored in cents) ────────────────────────────

export function formatCurrency(
  cents: number,
  options?: { compact?: boolean }
): string {
  const dollars = cents / 100

  if (options?.compact) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(dollars)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars)
}

export function dollarsToСents(dollars: number): number {
  return Math.round(dollars * 100)
}

export function centsToDollars(cents: number): number {
  return cents / 100
}

// ── Dates (stored as UTC ISO strings, displayed in local timezone) ────────────

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = Date.now()
  const then = new Date(date).getTime()
  const diffMs = now - then
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1)    return 'just now'
  if (diffMins < 60)   return `${diffMins}m ago`
  if (diffHours < 24)  return `${diffHours}h ago`
  if (diffDays < 7)    return `${diffDays}d ago`
  return formatDate(date)
}

// ── Loan Reference Numbers (ICA-YYYY-XXXX) ────────────────────────────────────

export function generateReferenceNumber(
  year: number,
  sequence: number
): string {
  return `ICA-${year}-${String(sequence).padStart(4, '0')}`
}

export function parseReferenceNumber(
  ref: string
): { year: number; sequence: number } | null {
  const match = ref.match(/^ICA-(\d{4})-(\d{4})$/)
  if (!match) return null
  return {
    year:     parseInt(match[1], 10),
    sequence: parseInt(match[2], 10),
  }
}

// ── DSCR Calculations ─────────────────────────────────────────────────────────

export function calculateDSCR(
  rentalIncomeCents: number,
  monthlyDebtCents: number
): number {
  if (monthlyDebtCents === 0) return 0
  return Math.round((rentalIncomeCents / monthlyDebtCents) * 100) / 100
}

export function getDSCRQualificationStatus(
  dscrRatio: number
): 'strong' | 'qualifying' | 'borderline' | 'insufficient' {
  if (dscrRatio >= 1.5)  return 'strong'
  if (dscrRatio >= 1.25) return 'qualifying'
  if (dscrRatio >= 1.0)  return 'borderline'
  return 'insufficient'
}

// ── Fix & Flip Calculations ───────────────────────────────────────────────────

export function calculateLTARV(
  loanAmountCents: number,
  arvEstimateCents: number
): number {
  if (arvEstimateCents === 0) return 0
  return Math.round((loanAmountCents / arvEstimateCents) * 10_000) / 100  // as %
}

// ── File Size Formatting ──────────────────────────────────────────────────────

export function formatFileSize(bytes: number): string {
  if (bytes < 1024)            return `${bytes} B`
  if (bytes < 1024 * 1024)     return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ── String Helpers ────────────────────────────────────────────────────────────

export function initials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()
}

export function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim()
}
