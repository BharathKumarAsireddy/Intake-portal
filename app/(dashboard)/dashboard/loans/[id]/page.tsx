import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Phone, Mail, Upload, MessageSquare, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { MilestoneTimeline } from '@/components/dashboard/MilestoneTimeline'
import { ConditionTracker } from '@/components/dashboard/ConditionTracker'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { StatusBadge, LoanTypeBadge } from '@/components/dashboard/StatusBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatCurrency, formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Loan File Detail' }

interface LoanDetailPageProps {
  params: { id: string }
}

// TODO: Fetch real loan data from Supabase
export default function LoanDetailPage({ params }: LoanDetailPageProps) {
  const { id } = params

  // Placeholder — replace with real fetch
  const loan = null

  if (!loan) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/dashboard/loans">
              <ArrowLeft className="h-4 w-4" /> All Loans
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-icecap-steel bg-icecap-slate p-12 text-center">
          <h2 className="font-display text-xl text-icecap-white mb-2">Loan File: {id}</h2>
          <p className="text-icecap-muted text-sm mb-6">
            Connect Supabase to load real loan data. This page will display full loan details,
            milestone timeline, conditions, documents, and activity feed.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            {/* Left column preview */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-icecap-steel bg-icecap-navy">
                <p className="text-icecap-muted text-xs mb-2 uppercase tracking-wider">Loan Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-icecap-muted text-sm">Reference</span>
                    <span className="font-mono text-sm text-icecap-gold">ICA-2025-0001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-icecap-muted text-sm">Amount</span>
                    <span className="font-mono text-sm text-icecap-white">$450,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-icecap-muted text-sm">Status</span>
                    <StatusBadge status="processing" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-icecap-muted text-sm">Type</span>
                    <LoanTypeBadge type="dscr" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-icecap-steel bg-icecap-navy">
                <p className="text-icecap-muted text-xs mb-3 uppercase tracking-wider">Milestone Timeline</p>
                <MilestoneTimeline
                  currentStatus="processing"
                  milestones={[
                    { status: 'submitted', timestamp: new Date('2025-06-01') },
                    { status: 'processing', timestamp: new Date('2025-06-02') },
                  ]}
                />
              </div>
            </div>

            {/* Right column preview */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-icecap-steel bg-icecap-navy">
                <p className="text-icecap-muted text-xs mb-3 uppercase tracking-wider">Quick Actions</p>
                <div className="space-y-2">
                  <Button variant="navy-outline" size="sm" className="w-full justify-start gap-2">
                    <Upload className="h-4 w-4" /> Upload Document
                  </Button>
                  <Button variant="navy-outline" size="sm" className="w-full justify-start gap-2">
                    <MessageSquare className="h-4 w-4" /> Add Note
                  </Button>
                  <Button variant="navy-outline" size="sm" className="w-full justify-start gap-2">
                    <RefreshCw className="h-4 w-4" /> Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return notFound()
}
