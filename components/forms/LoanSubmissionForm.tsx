'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight, ChevronLeft, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { DocumentChecklist } from './DocumentChecklist'
import {
  step1Schema, step2Schema,
  type Step1FormData, type Step2FormData,
} from '@/lib/validations/loan'
import { US_STATES, CHECKLIST_BY_LOAN_TYPE } from '@/lib/constants'
import { calculateDSCR, formatCurrency } from '@/lib/utils'
import type { LoanType } from '@/types/loan'
import type { ChecklistItemWithStatus } from '@/types/document'

const STEPS = [
  { label: 'Loan Basics',    step: 1 },
  { label: 'Borrower Info',  step: 2 },
  { label: 'Loan Details',   step: 3 },
  { label: 'Documents',      step: 4 },
]

export function LoanSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loanType, setLoanType] = useState<LoanType | null>(null)
  const [dscrRatio, setDscrRatio] = useState<number | null>(null)

  const step1Form = useForm<Step1FormData>({ resolver: zodResolver(step1Schema) })
  const step2Form = useForm<Step2FormData>({ resolver: zodResolver(step2Schema) })

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  const checklistItems: ChecklistItemWithStatus[] = loanType
    ? CHECKLIST_BY_LOAN_TYPE[loanType].map((item) => ({
        ...item,
        uploaded: false,
      }))
    : []

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className={`flex items-center gap-2 text-sm transition-colors ${
                s.step === currentStep
                  ? 'text-icecap-gold'
                  : s.step < currentStep
                  ? 'text-icecap-success'
                  : 'text-icecap-muted'
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono border-2 ${
                s.step === currentStep
                  ? 'border-icecap-gold bg-icecap-gold/10'
                  : s.step < currentStep
                  ? 'border-icecap-success bg-icecap-success/10'
                  : 'border-icecap-steel'
              }`}>
                {s.step}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      {/* ── Step 1: Loan Basics ───────────────────────────────────────────── */}
      {currentStep === 1 && (
        <form
          onSubmit={step1Form.handleSubmit(() => setCurrentStep(2))}
          className="space-y-5"
        >
          <h2 className="font-display text-xl text-icecap-white">Loan Type &amp; Basics</h2>

          <div className="space-y-1.5">
            <Label>Loan Type</Label>
            <Select
              onValueChange={(v) => {
                setLoanType(v as LoanType)
                step1Form.setValue('loanType', v as LoanType)
              }}
            >
              <SelectTrigger><SelectValue placeholder="Select loan type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dscr">DSCR Loan</SelectItem>
                <SelectItem value="fix_flip">Fix &amp; Flip</SelectItem>
                <SelectItem value="bridge">Bridge Loan</SelectItem>
              </SelectContent>
            </Select>
            {step1Form.formState.errors.loanType && (
              <p className="text-icecap-danger text-xs">
                {step1Form.formState.errors.loanType.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Property Address</Label>
            <Input id="address" placeholder="123 Main St" {...step1Form.register('property.address')} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Miami" {...step1Form.register('property.city')} />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Select onValueChange={(v) => step1Form.setValue('property.state', v)}>
                <SelectTrigger><SelectValue placeholder="FL" /></SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => (
                    <SelectItem key={s.code} value={s.code}>{s.code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" variant="gold" className="gap-2">
              Next: Borrower Info
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {/* ── Step 2: Borrower Info ─────────────────────────────────────────── */}
      {currentStep === 2 && (
        <form
          onSubmit={step2Form.handleSubmit(() => setCurrentStep(3))}
          className="space-y-5"
        >
          <h2 className="font-display text-xl text-icecap-white">Borrower Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bFirstName">First Name</Label>
              <Input id="bFirstName" {...step2Form.register('borrower.firstName')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bLastName">Last Name</Label>
              <Input id="bLastName" {...step2Form.register('borrower.lastName')} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bEmail">Email</Label>
            <Input id="bEmail" type="email" {...step2Form.register('borrower.email')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bPhone">Phone</Label>
            <Input id="bPhone" type="tel" {...step2Form.register('borrower.phone')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="entityName">Entity Name (if LLC/Corp)</Label>
            <Input id="entityName" placeholder="Optional" {...step2Form.register('borrower.entityName')} />
          </div>

          <div className="flex justify-between gap-3 pt-4">
            <Button type="button" variant="navy-outline" onClick={() => setCurrentStep(1)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit" variant="gold" className="gap-2">
              Next: Loan Details <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {/* ── Step 3: Loan Details (type-specific) ─────────────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl text-icecap-white">
            Loan Details —{' '}
            <span className="text-icecap-gold">
              {loanType === 'dscr' ? 'DSCR' : loanType === 'fix_flip' ? 'Fix & Flip' : 'Bridge'}
            </span>
          </h2>

          {loanType === 'dscr' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="rentalIncome">Monthly Rental Income ($)</Label>
                  <Input id="rentalIncome" type="number" placeholder="2500" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="monthlyDebt">Monthly Debt / PITIA ($)</Label>
                  <Input id="monthlyDebt" type="number" placeholder="1800" />
                </div>
              </div>
              <div className="p-4 rounded-lg border border-icecap-gold/20 bg-icecap-gold/5">
                <p className="text-xs text-icecap-muted mb-1">Calculated DSCR Ratio</p>
                <p className="font-mono text-2xl text-icecap-gold font-bold">
                  {dscrRatio !== null ? dscrRatio.toFixed(2) : '—'}
                </p>
                <p className="text-xs text-icecap-muted mt-1">
                  Target: 1.25+ for standard qualification
                </p>
              </div>
            </div>
          )}

          {loanType === 'fix_flip' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Purchase Price ($)</Label>
                  <Input type="number" placeholder="250000" />
                </div>
                <div className="space-y-1.5">
                  <Label>Rehab Budget ($)</Label>
                  <Input type="number" placeholder="75000" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>ARV Estimate ($)</Label>
                <Input type="number" placeholder="400000" />
              </div>
              <div className="space-y-1.5">
                <Label>Exit Strategy</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select exit strategy" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sell">Sell</SelectItem>
                    <SelectItem value="refi_dscr">Refinance — DSCR</SelectItem>
                    <SelectItem value="refi_conventional">Refinance — Conventional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {loanType === 'bridge' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Loan Purpose</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="refi_cashout">Refinance — Cash Out</SelectItem>
                    <SelectItem value="refi_rateterm">Refinance — Rate/Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Bridge Period (months)</Label>
                <Input type="number" placeholder="12" min={1} max={24} />
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3 pt-4">
            <Button type="button" variant="navy-outline" onClick={() => setCurrentStep(2)} className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="button" variant="gold" onClick={() => setCurrentStep(4)} className="gap-2">
              Next: Documents <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Step 4: Document Upload ───────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl text-icecap-white">Upload Documents</h2>
          <p className="text-icecap-muted text-sm">
            Upload required documents below. You can also save as draft and upload later.
          </p>

          {loanType ? (
            <DocumentChecklist
              loanType={loanType}
              items={checklistItems}
              onUpload={(id) => console.log('Upload:', id)}
            />
          ) : (
            <p className="text-icecap-muted text-sm">Select a loan type in step 1 to see the document checklist.</p>
          )}

          <div className="flex justify-between gap-3 pt-4">
            <div className="flex gap-3">
              <Button type="button" variant="navy-outline" onClick={() => setCurrentStep(3)} className="gap-2">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button type="button" variant="outline" className="gap-2 text-icecap-muted">
                <Save className="h-4 w-4" /> Save Draft
              </Button>
            </div>
            <Button type="button" variant="gold" className="gap-2">
              Submit Loan File <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
