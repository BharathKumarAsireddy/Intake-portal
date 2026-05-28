import Link from 'next/link'
import { type LucideIcon, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BorrowerResourceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  tag?: string
  className?: string
}

export function BorrowerResourceCard({
  icon: Icon,
  title,
  description,
  href,
  tag,
  className,
}: BorrowerResourceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-4 p-6 rounded-xl border border-icecap-steel bg-icecap-slate',
        'hover:border-icecap-gold/40 hover:bg-icecap-slate/80 transition-all duration-200',
        'hover:shadow-lg hover:shadow-icecap-gold/5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-icecap-gold/10 border border-icecap-gold/20">
          <Icon className="h-5 w-5 text-icecap-gold" />
        </div>
        {tag && (
          <span className="text-xs font-mono text-icecap-muted border border-icecap-steel rounded px-2 py-0.5">
            {tag}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-base text-icecap-white mb-1.5 group-hover:text-icecap-gold transition-colors">
          {title}
        </h3>
        <p className="text-icecap-muted text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center gap-1 text-icecap-gold text-sm font-medium mt-auto">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
