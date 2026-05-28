'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'DSCR Loans',    href: '/loans/dscr'        },
  { label: 'Fix & Flip',    href: '/loans/fix-and-flip' },
  { label: 'Bridge Loans',  href: '/loans/bridge'       },
  { label: 'Our Process',   href: '/process'            },
  { label: 'Resources',     href: '/resources'          },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-icecap-steel/60 bg-icecap-navy/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-icecap-gold font-bold text-lg tracking-widest">
              KAYE<span className="text-icecap-white">NET</span>
            </span>
            <span className="hidden sm:block text-icecap-muted text-xs tracking-wider border-l border-icecap-steel pl-2">
              WORK
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-icecap-muted hover:text-icecap-gold transition-colors duration-200 rounded-md hover:bg-icecap-slate/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="navy-outline" size="sm">
              <Link href="/login">Partner Login</Link>
            </Button>
            <Button asChild variant="gold" size="sm">
              <Link href="/dashboard/submit">Submit a File</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-icecap-muted hover:text-icecap-white p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            mobileOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-icecap-steel">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm text-icecap-muted hover:text-icecap-gold hover:bg-icecap-slate/50 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-icecap-steel">
              <Button asChild variant="navy-outline" size="sm" className="w-full">
                <Link href="/login">Partner Login</Link>
              </Button>
              <Button asChild variant="gold" size="sm" className="w-full">
                <Link href="/dashboard/submit">Submit a File</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
