import { TrendingUp, Clock, CheckCircle2, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import type { PipelineStats } from '@/types/loan'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  sublabel?: string
  icon: React.ElementType
  trend?: 'up' | 'down' | 'neutral'
  highlight?: boolean
}

function StatCard({ label, value, sublabel, icon: Icon, highlight }: StatCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden',
      highlight && 'border-icecap-gold/30 shadow-md shadow-icecap-gold/5'
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-icecap-muted text-xs font-medium uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="font-mono text-2xl font-bold text-icecap-white">{value}</p>
            {sublabel && (
              <p className="text-icecap-muted text-xs mt-1">{sublabel}</p>
            )}
          </div>
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg',
            highlight
              ? 'bg-icecap-gold/15 border border-icecap-gold/25'
              : 'bg-icecap-steel/50 border border-icecap-steel'
          )}>
            <Icon className={cn('h-5 w-5', highlight ? 'text-icecap-gold' : 'text-icecap-muted')} />
          </div>
        </div>
        {highlight && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-icecap-gold/40 to-transparent" />
        )}
      </CardContent>
    </Card>
  )
}

interface PipelineSummaryProps {
  stats: PipelineStats
}

export function PipelineSummary({ stats }: PipelineSummaryProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Active Loans"
        value={stats.activeLoans}
        icon={TrendingUp}
      />
      <StatCard
        label="In Underwriting"
        value={stats.inUnderwriting}
        icon={Clock}
      />
      <StatCard
        label="Clear to Close"
        value={stats.clearToClose}
        icon={CheckCircle2}
        highlight={stats.clearToClose > 0}
      />
      <StatCard
        label="Funded This Month"
        value={stats.fundedThisMonth}
        sublabel={formatCurrency(stats.fundedVolumeThisMonth, { compact: true }) + ' volume'}
        icon={DollarSign}
        highlight={stats.fundedThisMonth > 0}
      />
    </div>
  )
}
