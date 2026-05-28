import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ConditionTracker } from '@/components/dashboard/ConditionTracker'
import { Button } from '@/components/ui/button'
import type { Condition } from '@/types/loan'

export const metadata: Metadata = { title: 'Conditions' }

interface ConditionsPageProps {
  params: { id: string }
}

// TODO: Fetch real conditions from Supabase
const mockConditions: Condition[] = []

export default function ConditionsPage({ params }: ConditionsPageProps) {
  const { id } = params

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link href={`/dashboard/loans/${id}`}>
            <ArrowLeft className="h-4 w-4" /> Back to Loan
          </Link>
        </Button>
      </div>

      <PageHeader
        title="Condition Log"
        description={`Outstanding and resolved conditions for loan ${id}`}
      />

      <div className="max-w-2xl">
        <div className="rounded-xl border border-icecap-steel bg-icecap-slate p-5">
          <ConditionTracker conditions={mockConditions} />
        </div>
      </div>
    </div>
  )
}
