import type { Metadata } from 'next'
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline'
import { CTABanner } from '@/components/marketing/CTABanner'

export const metadata: Metadata = {
  title: 'Our Process | Kaye Network',
  description: 'How we process investor loans from submission to funded — a transparent 7-step process.',
}

export default function ProcessPage() {
  return (
    <main className="bg-icecap-navy">
      {/* Hero */}
      <section className="py-20 px-4 bg-icecap-slate border-b border-icecap-steel text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-mono text-icecap-gold border border-icecap-gold/30 bg-icecap-gold/5 px-3 py-1 rounded-full mb-4">
            How It Works
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-icecap-white mb-6">
            From Submission to Funded —{' '}
            <span className="gold-text-gradient">Every Step Visible</span>
          </h1>
          <p className="text-icecap-muted text-lg">
            We&rsquo;ve built a transparent, predictable 7-step process so MLOs and borrowers always know exactly where
            their loan stands. No black holes. No surprises.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <ProcessTimeline />

      {/* What sets us apart */}
      <section className="py-16 px-4 bg-icecap-slate border-t border-icecap-steel">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl text-icecap-white mb-10 text-center">
            What Makes Kaye Network Different
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Same-Day File Setup',
                description: 'New submissions are opened and document requests sent within hours of receipt — not days.',
              },
              {
                title: 'Real-Time Status Updates',
                description: 'Every status change triggers automatic notifications to the MLO and borrower via email and SMS.',
              },
              {
                title: 'Proactive Condition Work',
                description: 'We anticipate underwriter conditions before they&rsquo;re issued — reducing back-and-forth and closing time.',
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-icecap-steel bg-icecap-navy">
                <h3 className="font-display text-lg text-icecap-gold mb-2">{item.title}</h3>
                <p className="text-icecap-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Experience the Difference?"
        subheadline="Submit your first file and see our process in action."
        primaryCta={{ label: 'Submit a Loan File', href: '/dashboard/submit' }}
        secondaryCta={{ label: 'Partner With Us', href: '/register' }}
      />
    </main>
  )
}
