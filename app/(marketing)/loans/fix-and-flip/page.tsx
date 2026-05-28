import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTABanner } from '@/components/marketing/CTABanner'
import { FIX_FLIP_CHECKLIST } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Fix & Flip Loans | Kaye Network',
  description:
    'Short-term fix and flip financing for real estate investors. ARV-based lending with flexible draw schedules.',
}

const FAQ = [
  {
    q: 'Do I need prior flip experience?',
    a: 'Most lenders require at least 1–3 completed flips. First-time investors may qualify with a strong contractor and detailed scope of work.',
  },
  {
    q: 'How does the draw schedule work?',
    a: 'Draws are released in stages as work is completed and verified via inspection. Funds are disbursed within 48–72 hours of approved inspection.',
  },
  {
    q: 'Can I extend the loan term?',
    a: 'Most lenders offer one 3–6 month extension for a fee. Requests must be submitted before maturity.',
  },
  {
    q: 'What is the maximum rehab budget?',
    a: 'We can finance up to 100% of the rehab budget subject to the ARV-based LTV cap (typically 70–75% ARV).',
  },
]

export default function FixAndFlipPage() {
  return (
    <main className="bg-icecap-navy">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-icecap-slate to-icecap-navy border-b border-icecap-steel">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-mono text-orange-300 border border-orange-700 bg-orange-900/20 px-3 py-1 rounded-full mb-4">
            Fix &amp; Flip
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-icecap-white mb-6">
            Flip Smarter with{' '}
            <span className="gold-text-gradient">ARV-Based Financing</span>
          </h1>
          <p className="text-icecap-muted text-lg max-w-2xl mx-auto mb-8">
            Purchase and renovate investment properties with short-term bridge financing.
            We lend based on after-repair value, not current condition — so you can maximize leverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/apply">Submit Your Deal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="gold-outline" size="lg">
              <Link href="/dashboard/submit">Submit as a Broker</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-2xl text-icecap-white mb-4">How LTV and ARV Work</h2>
            <p className="text-icecap-muted leading-relaxed mb-4">
              Unlike traditional loans based on current value, fix &amp; flip loans are underwritten against the
              After Repair Value (ARV) — what the property will be worth <em>after</em> renovations are complete.
            </p>
            <p className="text-icecap-muted leading-relaxed mb-4">
              This means you can borrow more than the current purchase price allows, funding both acquisition and
              rehab in a single loan.
            </p>
            <div className="p-4 rounded-lg border border-icecap-gold/20 bg-icecap-gold/5">
              <p className="text-xs text-icecap-muted mb-3">Example deal:</p>
              {[
                { label: 'Purchase Price',  value: '$180,000' },
                { label: 'Rehab Budget',    value: '$60,000'  },
                { label: 'ARV Estimate',    value: '$320,000' },
                { label: 'Max Loan @ 75% ARV', value: '$240,000', highlight: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1.5 border-b border-icecap-steel/40 last:border-0">
                  <span className="text-icecap-muted text-sm">{item.label}</span>
                  <span className={`font-mono text-sm ${item.highlight ? 'text-icecap-gold font-bold' : 'text-icecap-white'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl border border-icecap-steel bg-icecap-slate space-y-4">
            <h3 className="font-display text-lg text-icecap-white">Program Terms</h3>
            {[
              { label: 'Max LTC',          value: 'Up to 90%' },
              { label: 'Max LTV (ARV)',     value: 'Up to 75%' },
              { label: 'Loan Range',        value: '$100K – $5M' },
              { label: 'Loan Term',         value: '12–24 months' },
              { label: 'Rate Type',         value: 'Interest-only' },
              { label: 'Draw Inspections',  value: 'Within 48–72 hrs' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-icecap-steel/50 last:border-0">
                <span className="text-icecap-muted text-sm">{item.label}</span>
                <span className="font-mono text-sm text-icecap-gold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="py-16 px-4 bg-icecap-slate border-y border-icecap-steel">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl text-icecap-white mb-8 text-center">
            Required Documents
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {FIX_FLIP_CHECKLIST.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-icecap-steel bg-icecap-navy">
                <Check className="h-4 w-4 text-icecap-gold shrink-0" />
                <span className="text-icecap-white text-sm">{item.label}</span>
                {!item.required && (
                  <span className="ml-auto text-xs text-icecap-muted border border-icecap-steel px-1.5 py-0.5 rounded">
                    Optional
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="h-6 w-6 text-icecap-gold" />
          <h2 className="font-display text-2xl text-icecap-white">Fix &amp; Flip FAQ</h2>
        </div>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-icecap-steel bg-icecap-slate">
              <p className="text-icecap-white font-medium mb-2">{item.q}</p>
              <p className="text-icecap-muted text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        headline="Submit Your Fix & Flip Deal"
        subheadline="Fast approvals, flexible draws, experienced processors."
        primaryCta={{ label: 'Get Started', href: '/apply' }}
        secondaryCta={{ label: 'Submit as a Broker', href: '/dashboard/submit' }}
      />
    </main>
  )
}
