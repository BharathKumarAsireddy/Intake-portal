'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Condition } from '@/types/loan'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const PRIORITY_LABELS = {
  prior_to_docs:    { label: 'Prior to Docs',    color: 'danger'  },
  prior_to_funding: { label: 'Prior to Funding',  color: 'warning' },
  informational:    { label: 'Informational',     color: 'muted'   },
} as const

interface ConditionTrackerProps {
  conditions: Condition[]
  className?: string
}

export function ConditionTracker({ conditions, className }: ConditionTrackerProps) {
  const [showSatisfied, setShowSatisfied] = useState(false)

  const open = conditions.filter((c) => c.status === 'open')
  const satisfied = conditions.filter((c) => c.status === 'satisfied' || c.status === 'waived')

  const displayed = [
    ...open,
    ...(showSatisfied ? satisfied : []),
  ]

  return (
    <div className={cn('space-y-3', className)}>
      {/* Header summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className={cn('h-4 w-4', open.length > 0 ? 'text-icecap-warning' : 'text-icecap-success')} />
          <span className="text-sm font-medium text-icecap-white">
            {open.length > 0
              ? `${open.length} Open Condition${open.length !== 1 ? 's' : ''}`
              : 'All Conditions Clear'}
          </span>
        </div>
        {satisfied.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-icecap-muted text-xs h-7"
            onClick={() => setShowSatisfied(!showSatisfied)}
          >
            {showSatisfied ? (
              <>Hide satisfied <ChevronUp className="ml-1 h-3.5 w-3.5" /></>
            ) : (
              <>{satisfied.length} satisfied <ChevronDown className="ml-1 h-3.5 w-3.5" /></>
            )}
          </Button>
        )}
      </div>

      {/* Condition items */}
      {displayed.length === 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-icecap-success/5 border border-icecap-success/20">
          <CheckCircle2 className="h-4 w-4 text-icecap-success" />
          <span className="text-icecap-success text-sm">No open conditions</span>
        </div>
      )}

      {displayed.map((condition) => (
        <div
          key={condition.id}
          className={cn(
            'p-3 rounded-lg border',
            condition.status === 'open'
              ? 'border-icecap-steel bg-icecap-slate'
              : 'border-icecap-steel/40 bg-icecap-slate/40 opacity-60'
          )}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className={cn(
              'text-sm',
              condition.status === 'open' ? 'text-icecap-white' : 'text-icecap-muted line-through'
            )}>
              {condition.description}
            </p>
            <Badge
              variant={
                condition.status === 'satisfied' || condition.status === 'waived'
                  ? 'success'
                  : PRIORITY_LABELS[condition.priority].color as 'danger' | 'warning' | 'muted'
              }
              className="shrink-0 text-xs"
            >
              {condition.status === 'satisfied'
                ? 'Satisfied'
                : condition.status === 'waived'
                ? 'Waived'
                : PRIORITY_LABELS[condition.priority].label}
            </Badge>
          </div>
          <p className="text-icecap-muted text-xs">
            Added {formatDate(condition.addedAt)}
            {condition.resolvedAt && ` · Resolved ${formatDate(condition.resolvedAt)}`}
          </p>
        </div>
      ))}
    </div>
  )
}
