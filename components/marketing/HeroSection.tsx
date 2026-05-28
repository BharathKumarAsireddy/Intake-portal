'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, TrendingUp, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STATS = [
  { label: 'Avg. Close Time', value: '14 Days',       icon: Zap     },
  { label: 'Loan Products',   value: '3 Specialized', icon: TrendingUp },
  { label: 'Based In',        value: 'Palm Beach, FL', icon: Shield  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-icecap-navy overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-icecap-navy via-[#0D1E36] to-icecap-navy" />
      <div className="absolute inset-0 bg-hero-radial" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-icecap-slate/70 border border-icecap-gold/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-icecap-gold rounded-full animate-gold-pulse" />
              <span className="text-icecap-gold text-sm font-medium tracking-wide font-sans">
                Kaye Network
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-icecap-white leading-[1.08] mb-6"
          >
            Expert Processing for{' '}
            <span className="gold-text-gradient">Investor Loans</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-icecap-muted mb-2 font-sans">
              DSCR · Fix &amp; Flip · Bridge
            </p>
            <p className="text-base md:text-lg text-icecap-muted/75 mb-10 max-w-2xl font-sans leading-relaxed">
              Fast, reliable non-QM loan processing for mortgage professionals across Florida.
              Submit files, track status, and close with confidence — all in one portal.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild variant="gold" size="xl" className="group">
              <Link href="/dashboard/submit">
                Submit a Loan File
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="gold-outline" size="xl">
              <Link href="/loans">
                Learn About Our Loans
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-icecap-steel grid grid-cols-3 gap-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-mono text-xl md:text-2xl text-icecap-gold font-semibold">
                  {stat.value}
                </span>
                <span className="text-icecap-muted text-xs md:text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
