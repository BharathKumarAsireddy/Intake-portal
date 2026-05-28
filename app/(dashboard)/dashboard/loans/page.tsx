import type { Metadata } from 'next'
import Link from 'next/link'
import { FilePlus, Search, Filter } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { LoanTable } from '@/components/dashboard/LoanTable'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { LoanCardData } from '@/types/loan'

export const metadata: Metadata = {
  title: 'All Loans',
}

// TODO: Replace with real Supabase data fetching + filters
const mockLoans: LoanCardData[] = []

export default function LoansPage() {
  const hasLoans = mockLoans.length > 0

  return (
    <div>
      <PageHeader
        title="All Loans"
        description="Search, filter, and manage your complete loan pipeline."
      >
        <Button asChild variant="gold" size="sm">
          <Link href="/dashboard/submit">
            <FilePlus className="mr-2 h-4 w-4" />
            New File
          </Link>
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-icecap-muted" />
          <Input
            placeholder="Search by reference, borrower, or address..."
            className="pl-9"
          />
        </div>
        <Button variant="navy-outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Status tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="underwriting">Underwriting</TabsTrigger>
          <TabsTrigger value="ctc">Clear to Close</TabsTrigger>
          <TabsTrigger value="funded">Funded</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {hasLoans ? (
            <LoanTable loans={mockLoans} />
          ) : (
            <EmptyState
              icon={FilePlus}
              title="No loans found"
              description="Submit your first loan file to populate your pipeline."
              action={{ label: 'Submit a Loan File', href: '/dashboard/submit' }}
            />
          )}
        </TabsContent>

        <TabsContent value="active">
          <EmptyState icon={FilePlus} title="No active loans" />
        </TabsContent>

        <TabsContent value="underwriting">
          <EmptyState icon={FilePlus} title="No loans in underwriting" />
        </TabsContent>

        <TabsContent value="ctc">
          <EmptyState icon={FilePlus} title="No loans clear to close" />
        </TabsContent>

        <TabsContent value="funded">
          <EmptyState icon={FilePlus} title="No funded loans this period" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
