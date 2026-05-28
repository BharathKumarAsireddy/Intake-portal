import type { Metadata } from 'next'
import {
  BookOpen, Calculator, FileText, HelpCircle,
  TrendingUp, Video,
} from 'lucide-react'
import { BorrowerResourceCard } from '@/components/marketing/BorrowerResourceCard'
import { CTABanner } from '@/components/marketing/CTABanner'

export const metadata: Metadata = {
  title: 'Resource Center | Kaye Network',
  description: 'Educational guides, calculators, and resources for real estate investors and mortgage brokers.',
}

const RESOURCES = [
  {
    icon: BookOpen,
    title: 'DSCR Loan Guide',
    description: 'Everything you need to know about qualifying for a DSCR loan — ratios, property types, and vesting.',
    href: '/loans/dscr',
    tag: 'Guide',
  },
  {
    icon: TrendingUp,
    title: 'Fix & Flip Financing Guide',
    description: 'How ARV-based lending works, draw schedules, and what lenders look for in a flip deal.',
    href: '/loans/fix-and-flip',
    tag: 'Guide',
  },
  {
    icon: FileText,
    title: 'Bridge Loan Overview',
    description: 'When to use a bridge loan, common scenarios, and exit strategy requirements.',
    href: '/loans/bridge',
    tag: 'Guide',
  },
  {
    icon: Calculator,
    title: 'DSCR Ratio Calculator',
    description: 'Calculate your debt service coverage ratio instantly — see if your rental property qualifies.',
    href: '/loans/dscr#calculator',
    tag: 'Tool',
  },
  {
    icon: HelpCircle,
    title: 'Our 7-Step Process',
    description: 'See exactly how we take a loan from submission to funded — every milestone explained.',
    href: '/process',
    tag: 'Overview',
  },
  {
    icon: Video,
    title: 'Investor Lending FAQ',
    description: 'Common questions from MLOs and borrowers about non-QM lending, timelines, and requirements.',
    href: '/loans/dscr#faq',
    tag: 'FAQ',
  },
]

export default function ResourcesPage() {
  return (
    <main className="bg-icecap-navy">
      {/* Hero */}
      <section className="py-20 px-4 bg-icecap-slate border-b border-icecap-steel text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-mono text-icecap-gold border border-icecap-gold/30 bg-icecap-gold/5 px-3 py-1 rounded-full mb-4">
            Resource Center
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-icecap-white mb-6">
            Everything You Need to{' '}
            <span className="gold-text-gradient">Close with Confidence</span>
          </h1>
          <p className="text-icecap-muted text-lg">
            Guides, tools, and FAQs for real estate investors and mortgage professionals navigating non-QM lending.
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((resource) => (
              <BorrowerResourceCard key={resource.title} {...resource} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Have a Specific Question?"
        subheadline="Our team can walk you through any scenario."
        primaryCta={{ label: 'Contact Us', href: '/apply' }}
        secondaryCta={{ label: 'Submit a File', href: '/dashboard/submit' }}
      />
    </main>
  )
}
