'use client'

import { CheckCircle2, Circle, Upload, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CHECKLIST_BY_LOAN_TYPE } from '@/lib/constants'
import type { LoanType } from '@/types/loan'
import type { ChecklistItemWithStatus } from '@/types/document'
import { cn } from '@/lib/utils'

interface DocumentChecklistProps {
  loanType: LoanType
  items: ChecklistItemWithStatus[]
  onUpload?: (itemId: string) => void
  readOnly?: boolean
  className?: string
}

export function DocumentChecklist({
  loanType,
  items,
  onUpload,
  readOnly = false,
  className,
}: DocumentChecklistProps) {
  const checklist = CHECKLIST_BY_LOAN_TYPE[loanType]
  const required = items.filter((i) => i.required)
  const requiredUploaded = required.filter((i) => i.uploaded).length

  return (
    <div className={cn('space-y-4', className)}>
      {/* Progress summary */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-icecap-navy border border-icecap-steel">
        <span className="text-icecap-muted text-sm">
          Required documents:
        </span>
        <span className={cn(
          'font-mono text-sm font-semibold',
          requiredUploaded === required.length ? 'text-icecap-success' : 'text-icecap-warning'
        )}>
          {requiredUploaded}/{required.length} uploaded
        </span>
      </div>

      {/* Document items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border transition-all',
              item.uploaded && item.documentStatus === 'approved'
                ? 'border-icecap-success/30 bg-icecap-success/5'
                : item.uploaded && item.documentStatus === 'rejected'
                ? 'border-icecap-danger/30 bg-icecap-danger/5'
                : item.uploaded
                ? 'border-icecap-steel bg-icecap-slate'
                : 'border-icecap-steel/60 bg-icecap-slate/30'
            )}
          >
            {/* Status icon */}
            <div className="shrink-0">
              {item.uploaded && item.documentStatus === 'approved' ? (
                <CheckCircle2 className="h-5 w-5 text-icecap-success" />
              ) : item.uploaded && item.documentStatus === 'rejected' ? (
                <AlertCircle className="h-5 w-5 text-icecap-danger" />
              ) : item.uploaded ? (
                <Circle className="h-5 w-5 text-icecap-warning" />
              ) : (
                <Circle className="h-5 w-5 text-icecap-steel" />
              )}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                'text-sm',
                item.uploaded ? 'text-icecap-white' : 'text-icecap-muted'
              )}>
                {item.label}
              </p>
              {item.documentStatus && item.uploaded && (
                <p className={cn(
                  'text-xs capitalize mt-0.5',
                  item.documentStatus === 'approved' ? 'text-icecap-success' :
                  item.documentStatus === 'rejected' ? 'text-icecap-danger' :
                  item.documentStatus === 'needs_update' ? 'text-icecap-warning' :
                  'text-icecap-muted'
                )}>
                  {item.documentStatus.replace('_', ' ')}
                </p>
              )}
            </div>

            {/* Required badge + upload button */}
            <div className="flex items-center gap-2 shrink-0">
              {item.required ? (
                <Badge variant="danger" className="text-xs py-0">Required</Badge>
              ) : (
                <Badge variant="muted" className="text-xs py-0">Optional</Badge>
              )}
              {!readOnly && !item.uploaded && onUpload && (
                <Button
                  variant="gold-outline"
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                  onClick={() => onUpload(item.id)}
                >
                  <Upload className="h-3.5 w-3.5 mr-1" />
                  Upload
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
