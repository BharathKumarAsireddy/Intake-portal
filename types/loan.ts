import type { UserRole } from './user'
import type { Document } from './document'

// ── Enums / Unions ────────────────────────────────────────────────────────────

export type LoanType = 'dscr' | 'fix_flip' | 'bridge'

export type LoanStatus =
  | 'draft'
  | 'submitted'
  | 'processing'
  | 'in_underwriting'
  | 'conditional_approval'
  | 'clear_to_close'
  | 'closed_funded'
  | 'suspended'
  | 'withdrawn'

export type PropertyType = 'sfr' | 'multi_family' | 'condo' | 'commercial' | 'mixed_use'

export type VestingEntity = 'individual' | 'llc' | 'trust' | 'corp'

// ── Sub-models ────────────────────────────────────────────────────────────────

export interface BorrowerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  entityName?: string
  entityType?: VestingEntity
  ein?: string
}

export interface PropertyInfo {
  address: string
  city: string
  state: string
  zip: string
  county?: string
  propertyType: PropertyType
}

// ── Loan-Type-Specific Details ────────────────────────────────────────────────

/** Debt Service Coverage Ratio loan details */
export interface DSCRDetails {
  rentalIncome: number        // stored in cents
  monthlyDebt: number         // stored in cents
  dscrRatio: number           // auto-calculated: rentalIncome / monthlyDebt
  propertyType: 'sfr' | 'multi_family' | 'condo' | 'commercial'
  leaseInPlace: boolean
  vestingEntity: VestingEntity
}

/** Fix & Flip loan details */
export interface FixFlipDetails {
  purchasePrice: number       // stored in cents
  arvEstimate: number         // After Repair Value — stored in cents
  rehabBudget: number         // stored in cents
  ltarv: number               // auto-calculated: loanAmount / arvEstimate (percentage)
  exitStrategy: 'sell' | 'refi_dscr' | 'refi_conventional'
  projectTimeline: number     // months
  contractorName?: string
}

/** Bridge loan details */
export interface BridgeDetails {
  purpose: 'purchase' | 'refi_cashout' | 'refi_rateterm'
  exitStrategy: string
  bridgePeriod: number        // months
  sourceOfRepayment: string
}

export type LoanDetails = DSCRDetails | FixFlipDetails | BridgeDetails

// ── Workflow Types ────────────────────────────────────────────────────────────

export interface Condition {
  id: string
  loanId: string
  description: string
  status: 'open' | 'satisfied' | 'waived'
  priority: 'prior_to_docs' | 'prior_to_funding' | 'informational'
  addedBy: string
  addedAt: Date
  resolvedAt?: Date
  resolvedBy?: string
  notes?: string
}

export interface Milestone {
  id: string
  loanId: string
  status: LoanStatus
  timestamp: Date
  updatedBy: string
  notes?: string
}

export interface Note {
  id: string
  loanId: string
  content: string
  authorId: string
  authorName: string
  authorRole: UserRole
  createdAt: Date
  isInternal: boolean         // internal notes hidden from MLO view
}

// ── Primary Model ─────────────────────────────────────────────────────────────

export interface LoanFile {
  id: string
  referenceNumber: string           // format: ICA-YYYY-XXXX e.g. ICA-2025-0042
  loanType: LoanType
  status: LoanStatus
  loanAmount: number                // stored in cents

  borrower: BorrowerInfo
  property: PropertyInfo
  loanDetails: LoanDetails

  documents: Document[]
  conditions: Condition[]
  milestones: Milestone[]
  notes: Note[]

  assignedProcessor: string | null  // India team member user ID
  mloId: string

  createdAt: Date
  updatedAt: Date

  ghlContactId: string | null       // linked GoHighLevel contact
  ghlOpportunityId: string | null   // linked GoHighLevel pipeline opportunity
}

// ── View / Display Helpers ────────────────────────────────────────────────────

export interface LoanCardData {
  id: string
  referenceNumber: string
  loanType: LoanType
  status: LoanStatus
  loanAmount: number
  borrowerName: string
  propertyAddress: string
  documentsUploaded: number
  documentsRequired: number
  openConditions: number
  updatedAt: Date
}

export interface PipelineStats {
  activeLoans: number
  inUnderwriting: number
  clearToClose: number
  fundedThisMonth: number
  fundedVolumeThisMonth: number   // in cents
}
