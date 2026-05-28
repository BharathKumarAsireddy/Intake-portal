import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:    'border-transparent bg-primary text-primary-foreground',
        secondary:  'border-transparent bg-secondary text-secondary-foreground',
        destructive:'border-transparent bg-destructive text-destructive-foreground',
        outline:    'border-icecap-steel text-icecap-muted',
        // ── IceCap Status Variants ───────────────────────────────────────
        gold:       'border-icecap-gold/40 bg-icecap-gold/10 text-icecap-gold',
        success:    'border-green-700 bg-green-900/30 text-icecap-success',
        warning:    'border-yellow-700 bg-yellow-900/30 text-icecap-warning',
        danger:     'border-red-700 bg-red-900/30 text-icecap-danger',
        muted:      'border-icecap-steel bg-icecap-steel/40 text-icecap-muted',
        blue:       'border-blue-700 bg-blue-900/30 text-blue-300',
        purple:     'border-purple-700 bg-purple-900/30 text-purple-300',
        orange:     'border-orange-700 bg-orange-900/30 text-orange-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
