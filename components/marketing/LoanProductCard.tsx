'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { LoanType } from '@/types/loan'
import { LOAN_TYPE_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface LoanProductCardProps {
  type: LoanType
  title: string
  description: string
  features: string[]
  href: string
  minLoan: string
  maxLtv: string
  highlighted?: boolean
}

export function LoanProductCard({
  type,
  title,
  description,
  features,
  href,
  minLoan,
  maxLtv,
  highlighted = false,
}: LoanProductCardProps) {
  const typeColors: Record<LoanType, string> = {
    dscr:     'border-blue-700 bg-blue-900/30 text-blue-300',
    fix_flip: 'border-orange-700 bg-orange-900/30 text-orange-300',
    bridge:   'border-purple-700 bg-purple-900/30 text-purple-300',
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'group relative flex flex-col rounded-xl border p-6',
        'bg-icecap-slate transition-all duration-300',
        highlighted
          ? 'border-icecap-gold shadow-lg shadow-icecap-gold/10'
          : 'border-icecap-steel hover:border-icecap-gold/40 hover:shadow-lg hover:shadow-icecap-gold/5'
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-6">
          <Badge variant="gold" className="text-xs">Most Popular</Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <Badge className={cn('text-xs mb-3', typeColors[type])}>
          {LOAN_TYPE_LABELS[type]}
        </Badge>
        <h3 className="font-display text-xl text-icecap-white mb-2">{title}</h3>
        <p className="text-icecap-muted text-sm leading-relaxed">{description}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-icecap-navy/50 rounded-lg border border-icecap-steel/50">
        <div>
          <p className="text-icecap-muted text-xs">Min. Loan</p>
          <p className="font-mono text-icecap-gold font-semibold text-sm">{minLoan}</p>
        </div>
        <div>
          <p className="text-icecap-muted text-xs">Max LTV</p>
          <p className="font-mono text-icecap-gold font-semibold text-sm">{maxLtv}</p>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-icecap-muted">
            <Check className="h-4 w-4 text-icecap-gold shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button asChild variant={highlighted ? 'gold' : 'gold-outline'} size="sm" className="w-full group/btn">
        <Link href={href}>
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
    </motion.div>
  )
}
