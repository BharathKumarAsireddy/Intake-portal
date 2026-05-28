import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { LOAN_STATUS_LABELS } from '@/lib/constants'
import type { LoanStatus } from '@/types/loan'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const MILESTONE_ORDER: LoanStatus[] = [
  'submitted',
  'processing',
  'in_underwriting',
  'conditional_approval',
  'clear_to_close',
  'closed_funded',
]

interface MilestoneTimelineProps {
  currentStatus: LoanStatus
  milestones: Array<{ status: LoanStatus; timestamp: Date }>
}

export function MilestoneTimeline({ currentStatus, milestones }: MilestoneTimelineProps) {
  const milestoneMap = new Map(milestones.map((m) => [m.status, m.timestamp]))

  const isSuspended = currentStatus === 'suspended' || currentStatus === 'withdrawn'
  const currentIndex = MILESTONE_ORDER.indexOf(currentStatus)

  return (
    <div className="space-y-1">
      {MILESTONE_ORDER.map((status, index) => {
        const milestone = milestoneMap.get(status)
        const isPast = currentIndex > index
        const isCurrent = currentStatus === status
        const isFuture = !isSuspended && currentIndex < index

        return (
          <div key={status} className="flex items-start gap-3">
            {/* Icon + vertical line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                  isPast || isCurrent
                    ? 'border-icecap-gold bg-icecap-gold/10'
                    : 'border-icecap-steel bg-icecap-navy',
                  isCurrent && 'shadow-[0_0_0_3px_rgba(201,168,76,0.15)]'
                )}
              >
                {isPast ? (
                  <CheckCircle2 className="h-4 w-4 text-icecap-gold" />
                ) : isCurrent ? (
                  <Clock className="h-4 w-4 text-icecap-gold animate-pulse" />
                ) : (
                  <Circle className="h-4 w-4 text-icecap-steel" />
                )}
              </div>
              {index < MILESTONE_ORDER.length - 1 && (
                <div
                  className={cn(
                    'w-px flex-1 my-1',
                    isPast ? 'bg-icecap-gold/40' : 'bg-icecap-steel/60'
                  )}
                  style={{ minHeight: '16px' }}
                />
              )}
            </div>

            {/* Label + date */}
            <div className="pb-4 min-w-0">
              <p
                className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-icecap-gold' : isPast ? 'text-icecap-white' : 'text-icecap-muted'
                )}
              >
                {LOAN_STATUS_LABELS[status]}
                {isCurrent && (
                  <span className="ml-2 text-xs font-mono bg-icecap-gold/10 border border-icecap-gold/20 text-icecap-gold px-1.5 py-0.5 rounded">
                    Current
                  </span>
                )}
              </p>
              {milestone && (
                <p className="text-icecap-muted text-xs mt-0.5">
                  {formatDate(milestone)}
                </p>
              )}
            </div>
          </div>
        )
      })}

      {isSuspended && (
        <div className="flex items-center gap-3 mt-2 p-3 rounded-lg border border-icecap-danger/30 bg-red-900/10">
          <div className="h-7 w-7 flex items-center justify-center rounded-full border-2 border-icecap-danger bg-icecap-danger/10">
            <Circle className="h-4 w-4 text-icecap-danger" />
          </div>
          <p className="text-icecap-danger text-sm font-medium">
            {LOAN_STATUS_LABELS[currentStatus]}
          </p>
        </div>
      )}
    </div>
  )
}
