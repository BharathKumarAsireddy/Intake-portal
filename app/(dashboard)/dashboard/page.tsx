import type { Metadata } from 'next'
import Link from 'next/link'
import { FilePlus } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { PipelineSummary } from '@/components/dashboard/PipelineSummary'
import { LoanTable } from '@/components/dashboard/LoanTable'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import type { PipelineStats, LoanCardData } from '@/types/loan'

export const metadata: Metadata = {
  title: 'Pipeline Dashboard',
}

// TODO: Replace with real data fetching from Supabase
const mockStats: PipelineStats = {
  activeLoans: 0,
  inUnderwriting: 0,
  clearToClose: 0,
  fundedThisMonth: 0,
  fundedVolumeThisMonth: 0,
}

const mockLoans: LoanCardData[] = []

export default function DashboardPage() {
  const hasLoans = mockLoans.length > 0

  return (
    <div>
      <PageHeader
        title="Pipeline Dashboard"
        description="All active loan files and pipeline status"
      >
        <Button asChild variant="gold" size="sm">
          <Link href="/dashboard/submit">
            <FilePlus className="mr-2 h-4 w-4" />
            Submit New File
          </Link>
        </Button>
      </PageHeader>

      {/* Stats row */}
      <section className="mb-8">
        <PipelineSummary stats={mockStats} />
      </section>

      {/* Main content */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Loan table (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-icecap-white">Active Loans</h2>
            <Button asChild variant="ghost" size="sm" className="text-icecap-muted text-xs">
              <Link href="/dashboard/loans">View all</Link>
            </Button>
          </div>

          {hasLoans ? (
            <LoanTable loans={mockLoans.slice(0, 5)} />
          ) : (
            <EmptyState
              icon={FilePlus}
              title="No loans yet"
              description="Submit your first loan file to get started. Your full pipeline will appear here."
              action={{ label: 'Submit a Loan File', href: '/dashboard/submit' }}
            />
          )}
        </div>

        {/* Activity feed (1/3 width) */}
        <div>
          <h2 className="font-display text-lg text-icecap-white mb-4">Recent Activity</h2>
          <div className="rounded-lg border border-icecap-steel bg-icecap-slate p-4">
            <ActivityFeed notes={[]} />
          </div>
        </div>
      </div>
    </div>
  )
}
