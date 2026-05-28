'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CTABannerProps {
  headline: string
  subheadline?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function CTABanner({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: CTABannerProps) {
  return (
    <section className="py-20 px-4 bg-icecap-navy relative overflow-hidden">
      {/* Gold gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <div className="mb-2 h-px w-16 bg-icecap-gold mx-auto rounded-full" />
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-icecap-white mt-6 mb-4">
          {headline}
        </h2>
        {subheadline && (
          <p className="text-icecap-muted text-lg mb-8">{subheadline}</p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="gold" size="lg" className="group min-w-[180px]">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          {secondaryCta && (
            <Button asChild variant="gold-outline" size="lg" className="min-w-[180px]">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>

        <p className="mt-6 text-icecap-muted text-sm">
          Your Partner in Capital — Kaye Network
        </p>
      </motion.div>
    </section>
  )
}
