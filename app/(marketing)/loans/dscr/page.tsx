import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Calculator, Building2, FileText, Clock, HelpCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTABanner } from '@/components/marketing/CTABanner'
import { DSCR_CHECKLIST } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'DSCR Loans | Kaye Network',
  description:
    'Debt Service Coverage Ratio loans for rental properties. No income verification — qualify based on property cash flow.',
}

const FAQ = [
  {
    q: 'Can I vest in an LLC?',
    a: "Yes. We routinely close DSCR loans in LLC, Trust, or corporate entities. Entity docs are required at submission.",
  },
  {
    q: 'What credit score is required?',
    a: 'Most lenders require a minimum 640–680 mid-score. Strong DSCR ratios can sometimes offset lower credit scores.',
  },
  {
    q: 'Is there a prepayment penalty?',
    a: 'Most DSCR products have a 3- or 5-year prepayment penalty (step-down or flat). Terms vary by lender.',
  },
  {
    q: 'What is the minimum DSCR ratio needed?',
    a: 'Standard qualification starts at 1.25. Some lenders allow 1.0 with compensating factors. Below 1.0 requires special exceptions.',
  },
  {
    q: 'Is seasoning required?',
    a: 'For refinances, most lenders require 6–12 months seasoning from purchase date. Purchases have no seasoning requirement.',
  },
]

export default function DSCRPage() {
  return (
    <main className="bg-icecap-navy">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-icecap-slate to-icecap-navy border-b border-icecap-steel">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-mono text-icecap-gold border border-icecap-gold/30 bg-icecap-gold/5 px-3 py-1 rounded-full mb-4">
            DSCR Loans
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-icecap-white mb-6">
            Invest with Cash Flow,{' '}
            <span className="gold-text-gradient">Not Income Docs</span>
          </h1>
          <p className="text-icecap-muted text-lg max-w-2xl mx-auto mb-8">
            DSCR loans qualify based on the property&rsquo;s rental income relative to its debt obligations —
            no W-2s, tax returns, or personal income verification required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/apply">Start Your DSCR Application <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="gold-outline" size="lg">
              <Link href="/dashboard/submit">Submit as a Broker</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is DSCR */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-icecap-white mb-4">
              What Is a DSCR Loan?
            </h2>
            <p className="text-icecap-muted leading-relaxed mb-4">
              A DSCR loan (Debt Service Coverage Ratio loan) is a type of non-QM mortgage designed for real estate
              investors. Instead of verifying your personal income, lenders analyze whether the rental property generates
              enough cash flow to cover its mortgage payment.
            </p>
            <p className="text-icecap-muted leading-relaxed">
              This makes DSCR loans ideal for self-employed investors, those with complex tax returns, or anyone
              building a portfolio where traditional income verification doesn&rsquo;t accurately reflect their ability to repay.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-icecap-steel bg-icecap-slate space-y-4">
            <h3 className="font-display text-lg text-icecap-white">Quick Stats</h3>
            {[
              { label: 'Min. DSCR',     value: '1.0 (1.25 preferred)' },
              { label: 'Max LTV',       value: 'Up to 80%' },
              { label: 'Loan Range',    value: '$75K – $3M+' },
              { label: 'Vesting',       value: 'Individual, LLC, Trust, Corp' },
              { label: 'Property Types', value: 'SFR, 2–4 unit, Condo, Commercial' },
              { label: 'Terms',         value: '30yr fixed, ARM, I/O' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-icecap-steel/50 last:border-0">
                <span className="text-icecap-muted text-sm">{item.label}</span>
                <span className="font-mono text-sm text-icecap-gold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DSCR Calculator */}
      <section className="py-16 px-4 bg-icecap-slate border-y border-icecap-steel">
        <div className="max-w-2xl mx-auto text-center">
          <Calculator className="h-10 w-10 text-icecap-gold mx-auto mb-4" />
          <h2 className="font-display text-2xl md:text-3xl text-icecap-white mb-4">
            DSCR Ratio Calculator
          </h2>
          <p className="text-icecap-muted mb-8">
            DSCR = Monthly Rental Income ÷ Monthly PITIA (principal, interest, taxes, insurance, HOA)
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6 text-left">
            <div className="p-4 rounded-lg bg-icecap-navy border border-icecap-steel">
              <label className="text-icecap-muted text-xs block mb-2">Monthly Rental Income</label>
              <p className="font-mono text-2xl text-icecap-white">$2,500</p>
            </div>
            <div className="p-4 rounded-lg bg-icecap-navy border border-icecap-steel">
              <label className="text-icecap-muted text-xs block mb-2">Monthly PITIA</label>
              <p className="font-mono text-2xl text-icecap-white">$1,800</p>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-icecap-gold/30 bg-icecap-gold/5 text-center">
            <p className="text-icecap-muted text-sm mb-1">DSCR Ratio</p>
            <p className="font-mono text-5xl font-bold text-icecap-gold">1.39</p>
            <p className="text-icecap-success text-sm mt-2">✓ Qualifying</p>
          </div>
          <p className="text-icecap-muted text-xs mt-4">
            The interactive calculator is available in the loan submission form — try it live when you submit.
          </p>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-icecap-white mb-8 text-center">
          Documents You&rsquo;ll Need
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {DSCR_CHECKLIST.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-icecap-steel bg-icecap-slate"
            >
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
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-icecap-slate border-t border-icecap-steel">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-6 w-6 text-icecap-gold" />
            <h2 className="font-display text-2xl text-icecap-white">DSCR FAQ</h2>
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

      {/* CTA */}
      <CTABanner
        headline="Start Your DSCR Application"
        subheadline="Fast pre-qualification, no income docs required."
        primaryCta={{ label: 'Apply Now', href: '/apply' }}
        secondaryCta={{ label: 'Submit as a Broker', href: '/dashboard/submit' }}
      />
    </main>
  )
}
