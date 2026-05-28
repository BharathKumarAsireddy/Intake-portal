import { formatRelativeTime } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Note } from '@/types/loan'
import { cn } from '@/lib/utils'

interface ActivityFeedProps {
  notes: Note[]
  className?: string
}

const ROLE_COLORS = {
  admin:     'text-purple-300 bg-purple-900/20',
  processor: 'text-blue-300 bg-blue-900/20',
  mlo:       'text-icecap-gold bg-icecap-gold/10',
  borrower:  'text-icecap-muted bg-icecap-steel/40',
}

export function ActivityFeed({ notes, className }: ActivityFeedProps) {
  if (notes.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-icecap-muted text-sm">No activity yet</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {notes.map((note, index) => (
        <div key={note.id} className="flex gap-3">
          {/* Avatar + vertical line */}
          <div className="flex flex-col items-center">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={ROLE_COLORS[note.authorRole]}>
                {note.authorName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {index < notes.length - 1 && (
              <div className="w-px flex-1 mt-2 bg-icecap-steel/40" style={{ minHeight: '16px' }} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-icecap-white text-sm font-medium">{note.authorName}</span>
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded font-medium capitalize',
                ROLE_COLORS[note.authorRole]
              )}>
                {note.authorRole}
              </span>
              <span className="text-icecap-muted text-xs ml-auto">
                {formatRelativeTime(note.createdAt)}
              </span>
            </div>

            <div className={cn(
              'rounded-lg p-3 text-sm leading-relaxed',
              note.isInternal
                ? 'bg-icecap-steel/30 border border-icecap-steel text-icecap-muted italic'
                : 'bg-icecap-slate text-icecap-white/90'
            )}>
              {note.isInternal && (
                <span className="text-icecap-muted/60 text-xs block mb-1 not-italic">
                  Internal note
                </span>
              )}
              {note.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
