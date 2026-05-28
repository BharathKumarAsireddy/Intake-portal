'use client'

import Link from 'next/link'
import { ArrowUpDown, ExternalLink } from 'lucide-react'
import { StatusBadge, LoanTypeBadge } from './StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { LoanCardData } from '@/types/loan'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LoanTableProps {
  loans: LoanCardData[]
  className?: string
}

export function LoanTable({ loans, className }: LoanTableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-icecap-steel', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-icecap-steel bg-icecap-slate/80">
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider">
              <button className="flex items-center gap-1 hover:text-icecap-white transition-colors">
                Reference <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
            </th>
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider">
              Borrower
            </th>
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider hidden md:table-cell">
              Property
            </th>
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider">
              Type
            </th>
            <th className="text-right px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
              Amount
            </th>
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider hidden lg:table-cell">
              Docs
            </th>
            <th className="text-left px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider hidden xl:table-cell">
              Updated
            </th>
            <th className="text-right px-4 py-3 text-icecap-muted text-xs font-medium uppercase tracking-wider">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-icecap-steel/50">
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="bg-icecap-navy hover:bg-icecap-slate/40 transition-colors group"
            >
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-icecap-gold">{loan.referenceNumber}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-icecap-white text-sm">{loan.borrowerName}</span>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <span className="text-icecap-muted text-xs truncate max-w-[180px] block">
                  {loan.propertyAddress}
                </span>
              </td>
              <td className="px-4 py-3">
                <LoanTypeBadge type={loan.loanType} />
              </td>
              <td className="px-4 py-3 text-right hidden sm:table-cell">
                <span className="font-mono text-sm text-icecap-white">
                  {formatCurrency(loan.loanAmount, { compact: true })}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={loan.status} />
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <span className="font-mono text-xs text-icecap-muted">
                  {loan.documentsUploaded}/{loan.documentsRequired}
                </span>
              </td>
              <td className="px-4 py-3 hidden xl:table-cell">
                <span className="text-icecap-muted text-xs">{formatDate(loan.updatedAt)}</span>
              </td>
              <td className="px-4 py-3 text-right">
                <Button asChild variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/dashboard/loans/${loan.id}`}>
                    <ExternalLink className="h-3.5 w-3.5 text-icecap-gold" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
