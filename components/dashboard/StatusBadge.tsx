import { Badge } from '@/components/ui/badge'
import { LOAN_STATUS_COLORS, LOAN_STATUS_LABELS, LOAN_TYPE_COLORS, LOAN_TYPE_LABELS } from '@/lib/constants'
import type { LoanStatus, LoanType } from '@/types/loan'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: LoanStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        LOAN_STATUS_COLORS[status],
        className
      )}
    >
      {LOAN_STATUS_LABELS[status]}
    </span>
  )
}

interface LoanTypeBadgeProps {
  type: LoanType
  className?: string
}

export function LoanTypeBadge({ type, className }: LoanTypeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        LOAN_TYPE_COLORS[type],
        className
      )}
    >
      {LOAN_TYPE_LABELS[type]}
    </span>
  )
}
