import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { DocumentChecklist } from '@/components/forms/DocumentChecklist'
import { DocumentUploader } from '@/components/dashboard/DocumentUploader'
import { Button } from '@/components/ui/button'
import type { ChecklistItemWithStatus } from '@/types/document'

export const metadata: Metadata = { title: 'Documents' }

interface DocumentsPageProps {
  params: { id: string }
}

// TODO: Fetch real loan and document data from Supabase
const mockItems: ChecklistItemWithStatus[] = []

export default function DocumentsPage({ params }: DocumentsPageProps) {
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
        title="Document Management"
        description={`Loan file: ${id} — upload and track all required documents`}
      />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Checklist */}
        <div>
          <h2 className="font-display text-lg text-icecap-white mb-4">Document Checklist</h2>
          <div className="rounded-xl border border-icecap-steel bg-icecap-slate p-5">
            <p className="text-icecap-muted text-sm mb-4">
              Connect Supabase to load the real checklist for this loan type.
            </p>
            <DocumentChecklist
              loanType="dscr"
              items={mockItems}
              readOnly={false}
              onUpload={(id) => console.log('Upload:', id)}
            />
          </div>
        </div>

        {/* Uploader */}
        <div>
          <h2 className="font-display text-lg text-icecap-white mb-4">Upload Documents</h2>
          <div className="rounded-xl border border-icecap-steel bg-icecap-slate p-5">
            <DocumentUploader
              loanId={id}
              category="general"
              label="Upload"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
