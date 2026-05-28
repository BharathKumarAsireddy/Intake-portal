import type { Metadata } from 'next'
import { BorrowerInquiryForm } from '@/components/forms/BorrowerInquiryForm'

export const metadata: Metadata = {
  title: 'Apply | Kaye Network',
  description: 'Submit your loan inquiry and a specialist will reach out within one business day.',
}

export default function ApplyPage() {
  return (
    <main className="bg-icecap-navy min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-mono text-icecap-gold border border-icecap-gold/30 bg-icecap-gold/5 px-3 py-1 rounded-full mb-4">
            Get Pre-Qualified
          </span>
          <h1 className="font-display text-3xl md:text-4xl text-icecap-white mb-4">
            Tell Us About Your Deal
          </h1>
          <p className="text-icecap-muted">
            Fill out this quick form and a member of the Kaye Network team will reach out within
            one business day to discuss your loan options.
          </p>
        </div>

        {/* Form card */}
        <div className="p-6 md:p-8 rounded-2xl border border-icecap-steel bg-icecap-slate shadow-xl shadow-black/20">
          <BorrowerInquiryForm />
        </div>

        {/* Trust indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { label: '1 Business Day', sublabel: 'Response time' },
            { label: 'No Spam',        sublabel: 'Ever' },
            { label: 'Expert Team',    sublabel: 'Palm Beach, FL' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg border border-icecap-steel/40">
              <p className="font-mono text-sm text-icecap-gold font-semibold">{item.label}</p>
              <p className="text-icecap-muted text-xs mt-0.5">{item.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
