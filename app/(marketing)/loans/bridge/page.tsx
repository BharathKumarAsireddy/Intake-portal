import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, HelpCircle, Zap, RefreshCw, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTABanner } from '@/components/marketing/CTABanner'
import { BRIDGE_CHECKLIST } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Bridge Loans | Kaye Network',
  description:
    'Short-term bridge financing for time-sensitive real estate transactions. Fast funding, flexible exits.',
}

const SCENARIOS = [
  {
    icon: Zap,
    title: 'Time-Sensitive Purchase',
    description: 'Secure a deal before your permanent financing closes. Bridge the gap and refinance within 6–12 months.',
  },
  {
    icon: RefreshCw,
    title: 'Buy Before Selling',
    description: 'Purchase your next investment before selling an existing property. No need to time two transactions simultaneously.',
  },
  {
    icon: Timer,
    title: 'Force Appreciation',
    description: 'Acquire a property quickly, complete light renovations, then refinance into permanent DSCR financing.',
  },
]

const FAQ = [
  {
    q: 'What makes a strong exit strategy?',
    a: 'Lenders want a clear, realistic plan. The most accepted exits are: sale of the property, refinance into DSCR, or refinance into conventional. The strategy must be documented in a signed letter.',
  },
  {
    q: 'What is the maximum bridge period?',
    a: 'Most bridge products are structured for 6–18 months. Some lenders offer up to 24 months for the right deal.',
  },
  {
    q: 'Is a bridge loan different from a hard money loan?',
    a: 'They\'re closely related. Bridge loans typically have slightly lower rates and focus on exit strategy. Hard money is a broader term that includes bridge, fix & flip, and other short-term products.',
  },
]

export default function BridgePage() {
  return (
    <main className="bg-icecap-navy">
      <section className="py-20 px-4 bg-gradient-to-b from-icecap-slate to-icecap-navy border-b border-icecap-steel">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-mono text-purple-300 border border-purple-700 bg-purple-900/20 px-3 py-1 rounded-full mb-4">
            Bridge Loans
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-icecap-white mb-6">
            Close Fast. Finance Now.{' '}
            <span className="gold-text-gradient">Exit on Your Terms.</span>
          </h1>
          <p className="text-icecap-muted text-lg max-w-2xl mx-auto mb-8">
            Bridge loans provide short-term capital when timing is critical — whether you&rsquo;re purchasing before
            selling, closing before permanent financing is ready, or seizing an off-market opportunity.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/apply">Talk to a Specialist <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Common Scenarios */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="font-display text-2xl text-icecap-white mb-8 text-center">When to Use a Bridge Loan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SCENARIOS.map((s) => (
            <div key={s.title} className="p-6 rounded-xl border border-icecap-steel bg-icecap-slate">
              <s.icon className="h-8 w-8 text-icecap-gold mb-4" />
              <h3 className="font-display text-lg text-icecap-white mb-2">{s.title}</h3>
              <p className="text-icecap-muted text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bridge vs DSCR */}
      <section className="py-16 px-4 bg-icecap-slate border-y border-icecap-steel">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl text-icecap-white mb-8 text-center">Bridge vs. DSCR — Which Is Right for You?</h2>
          <div className="overflow-x-auto rounded-lg border border-icecap-steel">
            <table className="w-full text-sm">
              <thead className="bg-icecap-navy">
                <tr>
                  <th className="text-left p-4 text-icecap-muted font-medium">Factor</th>
                  <th className="text-left p-4 text-purple-300 font-medium">Bridge</th>
                  <th className="text-left p-4 text-blue-300 font-medium">DSCR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-icecap-steel/50">
                {[
                  { factor: 'Loan Term',     bridge: '6–24 months',         dscr: '30 years' },
                  { factor: 'Rate',          bridge: 'Higher',               dscr: 'Lower' },
                  { factor: 'Qualification', bridge: 'Asset-based',          dscr: 'Cash-flow based' },
                  { factor: 'Exit Required', bridge: 'Yes — required',       dscr: 'No' },
                  { factor: 'Best For',      bridge: 'Time-sensitive deals', dscr: 'Stabilized rentals' },
                ].map((row) => (
                  <tr key={row.factor} className="bg-icecap-slate/50">
                    <td className="p-4 text-icecap-muted">{row.factor}</td>
                    <td className="p-4 text-icecap-white">{row.bridge}</td>
                    <td className="p-4 text-icecap-white">{row.dscr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="font-display text-2xl text-icecap-white mb-8 text-center">Documents Required</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {BRIDGE_CHECKLIST.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-icecap-steel bg-icecap-slate">
              <Check className="h-4 w-4 text-icecap-gold shrink-0" />
              <span className="text-icecap-white text-sm">{item.label}</span>
              {!item.required && (
                <span className="ml-auto text-xs text-icecap-muted border border-icecap-steel px-1.5 py-0.5 rounded">Optional</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-icecap-slate border-t border-icecap-steel">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-6 w-6 text-icecap-gold" />
            <h2 className="font-display text-2xl text-icecap-white">Bridge Loan FAQ</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-icecap-steel bg-icecap-navy">
                <p className="text-icecap-white font-medium mb-2">{item.q}</p>
                <p className="text-icecap-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Bridge Your Next Deal?"
        subheadline="Talk to our team about your specific scenario."
        primaryCta={{ label: 'Talk to a Specialist', href: '/apply' }}
        secondaryCta={{ label: 'Submit as a Broker', href: '/dashboard/submit' }}
      />
    </main>
  )
}
