import Link from 'next/link'
import { FileText, Upload, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StatusBadge, LoanTypeBadge } from './StatusBadge'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import type { LoanCardData } from '@/types/loan'
import { cn } from '@/lib/utils'

interface LoanCardProps {
  loan: LoanCardData
  className?: string
}

export function LoanCard({ loan, className }: LoanCardProps) {
  const docProgress = loan.documentsRequired > 0
    ? Math.round((loan.documentsUploaded / loan.documentsRequired) * 100)
    : 0

  return (
    <Link href={`/dashboard/loans/${loan.id}`}>
      <Card className={cn(
        'cursor-pointer transition-all duration-200 hover:border-icecap-gold/40 hover:shadow-lg hover:shadow-icecap-gold/5',
        loan.openConditions > 0 && 'border-icecap-warning/30',
        className
      )}>
        <CardContent className="p-5">

          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="font-mono text-xs text-icecap-gold mb-1 truncate">
                {loan.referenceNumber}
              </p>
              <p className="text-icecap-white text-sm font-medium truncate">
                {loan.borrowerName}
              </p>
              <p className="text-icecap-muted text-xs truncate mt-0.5">
                {loan.propertyAddress}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <StatusBadge status={loan.status} />
              <LoanTypeBadge type={loan.loanType} />
            </div>
          </div>

          {/* Loan amount */}
          <p className="font-mono text-lg text-icecap-white font-semibold mb-3">
            {formatCurrency(loan.loanAmount)}
          </p>

          {/* Document progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs text-icecap-muted">
                <Upload className="h-3.5 w-3.5" />
                <span>Documents</span>
              </div>
              <span className="text-xs font-mono text-icecap-muted">
                {loan.documentsUploaded}/{loan.documentsRequired}
              </span>
            </div>
            <Progress value={docProgress} className="h-1.5" />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {loan.openConditions > 0 && (
                <div className="flex items-center gap-1 text-icecap-warning text-xs">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{loan.openConditions} condition{loan.openConditions !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            <p className="text-icecap-muted text-xs">
              {formatRelativeTime(loan.updatedAt)}
            </p>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
