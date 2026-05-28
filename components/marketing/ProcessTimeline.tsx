'use client'

import { motion } from 'framer-motion'
import {
  FileText, FolderOpen, Building2, GraduationCap,
  ListChecks, CheckCircle2, Banknote,
} from 'lucide-react'

const STEPS = [
  {
    step: 1,
    icon: FileText,
    title: 'Deal Submission',
    description: 'MLO submits the loan file via the portal. Borrower and property details entered, loan type selected.',
    tag: 'Day 1',
  },
  {
    step: 2,
    icon: FolderOpen,
    title: 'File Setup & Doc Collection',
    description: 'Processor builds out the file, sends document checklist, and follows up to collect all required items.',
    tag: 'Days 1–3',
  },
  {
    step: 3,
    icon: Building2,
    title: 'Third-Party Ordering',
    description: 'Title, appraisal, and insurance are ordered. Processor coordinates with all vendors.',
    tag: 'Days 2–7',
  },
  {
    step: 4,
    icon: GraduationCap,
    title: 'Underwriting Submission',
    description: "Complete file submitted to lender's underwriting team. All conditions are anticipated and addressed upfront.",
    tag: 'Days 7–10',
  },
  {
    step: 5,
    icon: ListChecks,
    title: 'Conditions',
    description: 'Processor works outstanding conditions, communicates status to MLO and borrower in real time.',
    tag: 'Days 10–12',
  },
  {
    step: 6,
    icon: CheckCircle2,
    title: 'Clear to Close',
    description: 'Final loan approval issued. Title company coordinates with all parties to schedule closing.',
    tag: 'Day 12–13',
  },
  {
    step: 7,
    icon: Banknote,
    title: 'Funded',
    description: 'Wire sent, documents recorded. Deal closed. MLO and borrower notified immediately.',
    tag: 'Day 14',
  },
]

export function ProcessTimeline() {
  return (
    <section className="py-20 px-4 bg-icecap-navy">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl text-icecap-white mb-4">
            From Submission to Funded in{' '}
            <span className="gold-text-gradient">14 Days</span>
          </h2>
          <p className="text-icecap-muted text-lg max-w-2xl mx-auto">
            Our streamlined process keeps deals moving. Every milestone is tracked, every update communicated automatically.
          </p>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-icecap-gold/40 via-icecap-steel to-icecap-gold/10" />

          <div className="space-y-10">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0
              const Icon = step.icon

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {/* Mobile layout: icon left, content right */}
                  <div className="flex items-start gap-5 md:hidden">
                    <div className="relative z-10 shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-icecap-gold/40 bg-icecap-slate shadow-lg shadow-icecap-gold/10">
                      <Icon className="h-6 w-6 text-icecap-gold" />
                    </div>
                    <div className="pt-1">
                      <span className="font-mono text-xs text-icecap-gold">{step.tag}</span>
                      <h3 className="font-display text-lg text-icecap-white mt-1 mb-1">{step.title}</h3>
                      <p className="text-icecap-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Desktop layout: zigzag */}
                  <div className={`hidden md:flex items-center gap-0 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content side */}
                    <div className={`w-[calc(50%-28px)] ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <span className="font-mono text-xs text-icecap-gold bg-icecap-gold/10 border border-icecap-gold/20 px-2 py-0.5 rounded">
                        {step.tag}
                      </span>
                      <h3 className="font-display text-lg text-icecap-white mt-2 mb-1">{step.title}</h3>
                      <p className="text-icecap-muted text-sm leading-relaxed">{step.description}</p>
                    </div>

                    {/* Center icon */}
                    <div className="relative z-10 shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-icecap-gold/40 bg-icecap-slate shadow-lg shadow-icecap-gold/10">
                      <Icon className="h-6 w-6 text-icecap-gold" />
                    </div>

                    {/* Empty opposite side */}
                    <div className="w-[calc(50%-28px)]" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
