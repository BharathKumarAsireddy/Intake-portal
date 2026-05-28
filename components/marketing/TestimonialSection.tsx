'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: "Kaye Network processed our DSCR file in under two weeks. Their team anticipated every condition before the underwriter even asked. Best processing partner we've had.",
    author: 'Michael R.',
    title: 'Senior MLO, Southeast Florida',
    rating: 5,
  },
  {
    quote: "We brought three fix & flip files to them in Q3. All three funded on time. The portal keeps me updated without having to call anyone — that alone saves me hours a week.",
    author: 'Sandra T.',
    title: 'Independent Mortgage Broker',
    rating: 5,
  },
  {
    quote: "The bridge loan closed in 11 days. My client was blown away. Kaye Network knew the deal inside-out from day one and never dropped the ball.",
    author: 'James L.',
    title: 'Real Estate Investment Specialist',
    rating: 5,
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 px-4 bg-icecap-slate">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-icecap-white mb-4">
            Trusted by MLOs Across Florida
          </h2>
          <p className="text-icecap-muted text-lg">
            Close with confidence — hear from the partners who already do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-xl border border-icecap-steel bg-icecap-navy/60"
            >
              <Quote className="h-6 w-6 text-icecap-gold opacity-60 shrink-0" />

              <p className="text-icecap-white/85 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-icecap-steel">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-icecap-gold/10 border border-icecap-gold/20">
                  <span className="font-mono text-xs text-icecap-gold font-semibold">
                    {t.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-icecap-white text-sm font-medium">{t.author}</p>
                  <p className="text-icecap-muted text-xs">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
