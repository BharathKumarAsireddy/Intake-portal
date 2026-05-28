import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/PageHeader'
import { LoanSubmissionForm } from '@/components/forms/LoanSubmissionForm'

export const metadata: Metadata = {
  title: 'Submit New Loan File',
}

export default function SubmitPage() {
  return (
    <div>
      <PageHeader
        title="Submit New Loan File"
        description="Complete all 4 steps to submit your loan for processing."
      />

      <div className="rounded-2xl border border-icecap-steel bg-icecap-slate p-6 md:p-8">
        <LoanSubmissionForm />
      </div>
    </div>
  )
}
