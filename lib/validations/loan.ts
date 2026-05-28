import { z } from 'zod'

// ── Shared Field Schemas ──────────────────────────────────────────────────────

export const loanTypeSchema = z.enum(['dscr', 'fix_flip', 'bridge'])

export const propertyTypeSchema = z.enum([
  'sfr', 'multi_family', 'condo', 'commercial', 'mixed_use',
])

export const vestingEntitySchema = z.enum([
  'individual', 'llc', 'trust', 'corp',
])

// ── Borrower Info Schema ──────────────────────────────────────────────────────

export const borrowerInfoSchema = z.object({
  firstName:   z.string().min(1, 'First name is required'),
  lastName:    z.string().min(1, 'Last name is required'),
  email:       z.string().email('Valid email address required'),
  phone:       z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone number format'),
  entityName:  z.string().optional(),
  entityType:  vestingEntitySchema.optional(),
  ein:         z
    .string()
    .regex(/^\d{2}-\d{7}$/, 'EIN format: XX-XXXXXXX')
    .optional()
    .or(z.literal('')),
})

// ── Property Info Schema ──────────────────────────────────────────────────────

export const propertyInfoSchema = z.object({
  address:      z.string().min(5, 'Property address is required'),
  city:         z.string().min(1, 'City is required'),
  state:        z.string().length(2, 'Use 2-letter state abbreviation'),
  zip:          z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code required'),
  county:       z.string().optional(),
  propertyType: propertyTypeSchema,
})

// ── Loan-Type-Specific Details ────────────────────────────────────────────────

export const dscrDetailsSchema = z.object({
  rentalIncome:  z.number().min(1, 'Rental income is required').int(),
  monthlyDebt:   z.number().min(1, 'Monthly debt is required').int(),
  propertyType:  z.enum(['sfr', 'multi_family', 'condo', 'commercial']),
  leaseInPlace:  z.boolean(),
  vestingEntity: vestingEntitySchema,
})

export const fixFlipDetailsSchema = z.object({
  purchasePrice:   z.number().min(1, 'Purchase price is required').int(),
  arvEstimate:     z.number().min(1, 'ARV estimate is required').int(),
  rehabBudget:     z.number().min(0).int(),
  exitStrategy:    z.enum(['sell', 'refi_dscr', 'refi_conventional']),
  projectTimeline: z.number().min(1).max(36, 'Max 36 months'),
  contractorName:  z.string().optional(),
})

export const bridgeDetailsSchema = z.object({
  purpose:           z.enum(['purchase', 'refi_cashout', 'refi_rateterm']),
  exitStrategy:      z.string().min(10, 'Please describe the exit strategy'),
  bridgePeriod:      z.number().min(1).max(24, 'Max 24 months'),
  sourceOfRepayment: z.string().min(5, 'Please describe the source of repayment'),
})

// ── Multi-Step Form Schemas ───────────────────────────────────────────────────

export const step1Schema = z.object({
  loanType:   loanTypeSchema,
  loanAmount: z.number()
    .min(5_000_000, 'Minimum loan amount is $50,000')   // in cents
    .max(1_000_000_000, 'Maximum loan amount is $10,000,000'),
  property:   propertyInfoSchema,
})

export const step2Schema = z.object({
  borrower: borrowerInfoSchema,
})

export const step3Schema = z.discriminatedUnion('loanType', [
  z.object({ loanType: z.literal('dscr'),     details: dscrDetailsSchema    }),
  z.object({ loanType: z.literal('fix_flip'), details: fixFlipDetailsSchema }),
  z.object({ loanType: z.literal('bridge'),   details: bridgeDetailsSchema  }),
])

export const completeLoanSubmissionSchema = z.object({
  loanType:        loanTypeSchema,
  loanAmount:      z.number().min(5_000_000).int(),
  property:        propertyInfoSchema,
  borrower:        borrowerInfoSchema,
  dscrDetails:     dscrDetailsSchema.optional(),
  fixFlipDetails:  fixFlipDetailsSchema.optional(),
  bridgeDetails:   bridgeDetailsSchema.optional(),
})

// ── Exported Types ────────────────────────────────────────────────────────────

export type Step1FormData           = z.infer<typeof step1Schema>
export type Step2FormData           = z.infer<typeof step2Schema>
export type Step3FormData           = z.infer<typeof step3Schema>
export type CompleteLoanSubmission  = z.infer<typeof completeLoanSubmissionSchema>
export type BorrowerInfoFormData    = z.infer<typeof borrowerInfoSchema>
export type PropertyInfoFormData    = z.infer<typeof propertyInfoSchema>
