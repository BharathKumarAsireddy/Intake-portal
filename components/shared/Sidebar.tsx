'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FilePlus,
  FolderOpen,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const NAV_ITEMS = [
  {
    label: 'Pipeline',
    href:  '/dashboard',
    icon:  LayoutDashboard,
    exact: true,
  },
  {
    label: 'Submit New File',
    href:  '/dashboard/submit',
    icon:  FilePlus,
  },
  {
    label: 'All Loans',
    href:  '/dashboard/loans',
    icon:  FolderOpen,
  },
  {
    label: 'My Profile',
    href:  '/dashboard/profile',
    icon:  User,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-icecap-slate border-r border-icecap-steel">

      {/* Brand Mark */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-icecap-steel">
        <span className="font-mono text-icecap-gold font-bold text-base tracking-widest">
          KAYE<span className="text-icecap-white">NET</span>
        </span>
        <span className="text-icecap-muted text-xs tracking-wider border-l border-icecap-steel pl-2">
          PORTAL
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group',
                active
                  ? 'bg-icecap-gold/10 text-icecap-gold border border-icecap-gold/20'
                  : 'text-icecap-muted hover:text-icecap-white hover:bg-icecap-steel/50'
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  active ? 'text-icecap-gold' : 'text-icecap-muted group-hover:text-icecap-white'
                )}
              />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-3.5 w-3.5 text-icecap-gold" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-icecap-steel pt-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-icecap-muted hover:text-icecap-danger hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
