import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6', className)}>
      <div>
        <h1 className="font-display text-2xl md:text-3xl text-icecap-white">
          {title}
        </h1>
        {description && (
          <p className="text-icecap-muted text-sm mt-1">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 shrink-0">{children}</div>
      )}
    </div>
  )
}
