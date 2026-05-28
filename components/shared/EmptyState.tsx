import Link from 'next/link'
import { type LucideIcon, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        'rounded-lg border border-dashed border-icecap-steel bg-icecap-slate/30',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-icecap-steel/30 mb-4">
        <Icon className="h-7 w-7 text-icecap-muted" />
      </div>

      <h3 className="font-display text-lg text-icecap-white mb-2">{title}</h3>

      {description && (
        <p className="text-icecap-muted text-sm max-w-sm mb-6">{description}</p>
      )}

      {action && (
        action.href ? (
          <Button asChild variant="gold" size="sm">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button variant="gold" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      )}
    </div>
  )
}
