import type { Metadata } from 'next'
import { HeroSection } from '@/components/marketing/HeroSection'
import { LoanProductCard } from '@/components/marketing/LoanProductCard'
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline'
import { TestimonialSection } from '@/components/marketing/TestimonialSection'
import { CTABanner } from '@/components/marketing/CTABanner'

export const metadata: Metadata = {
  title: 'Kaye Network | Expert Processing for Investor Loans',
  description:
    'DSCR, Fix & Flip, and Bridge loan processing for MLOs in Florida. Submit, track, and close with confidence.',
}

const LOAN_PRODUCTS = [
  {
    type: 'dscr' as const,
    title: 'DSCR Loans',
    description:
      "Cash-flow-based financing for rental properties. No personal income verification — we lend based on the property's debt service coverage ratio.",
    features: [
      'No W-2s or tax returns required',
      'SFR, multi-family, condos, commercial',
      'LLC and trust vesting available',
      'Interest-only options',
    ],
    href: '/loans/dscr',
    minLoan: '$75,000',
    maxLtv: '80%',
  },
  {
    type: 'fix_flip' as const,
    title: 'Fix & Flip Loans',
    description:
      'Short-term bridge financing to purchase and renovate investment properties. Funded based on ARV with flexible draw schedules.',
    features: [
      'Up to 90% of purchase + rehab costs',
      'Draw schedule available',
      'Fast close — as little as 7 days',
      '12–24 month terms',
    ],
    href: '/loans/fix-and-flip',
    minLoan: '$100,000',
    maxLtv: '75% ARV',
    highlighted: true,
  },
  {
    type: 'bridge' as const,
    title: 'Bridge Loans',
    description:
      'Short-term capital for time-sensitive acquisitions or when permanent financing is still in process.',
    features: [
      'Fast funding — 7 to 14 days',
      'Multiple exit strategies accepted',
      'Purchase or refinance',
      'Cross-collateralization available',
    ],
    href: '/loans/bridge',
    minLoan: '$100,000',
    maxLtv: '70%',
  },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Loan Products */}
      <section className="py-20 px-4 bg-icecap-slate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-icecap-white mb-4">
              Loan Products We Process
            </h2>
            <p className="text-icecap-muted text-lg max-w-2xl mx-auto">
              We specialize exclusively in non-QM investor loans — no W-2s, no primary residence requirements.
              Built for real estate professionals who move fast.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOAN_PRODUCTS.map((product) => (
              <LoanProductCard key={product.type} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA */}
      <CTABanner
        headline="Ready to Submit Your First File?"
        subheadline="Join MLOs across Florida processing investor loans with confidence."
        primaryCta={{ label: 'Submit a Loan File', href: '/dashboard/submit' }}
        secondaryCta={{ label: 'Partner With Us', href: '/register' }}
      />
    </main>
  )
}
