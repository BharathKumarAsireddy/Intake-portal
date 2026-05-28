import { z } from 'zod'

export const documentCategorySchema = z.enum([
  // Universal
  'purchase_contract',
  'property_photos',
  'title_commitment',
  'insurance_binder',
  'entity_docs',
  'bank_statements',
  'credit_authorization',
  // DSCR
  'lease_agreement',
  'rent_roll',
  'appraisal',
  // Fix & Flip
  'scope_of_work',
  'contractor_bid',
  'arv_appraisal',
  'draw_schedule',
  // Bridge
  'payoff_statement',
  'exit_strategy_letter',
])

export const documentStatusSchema = z.enum([
  'pending_review',
  'approved',
  'rejected',
  'needs_update',
])

export const uploadDocumentSchema = z.object({
  loanId:   z.string().uuid('Invalid loan ID'),
  category: documentCategorySchema,
  fileName: z.string().min(1, 'File name is required'),
  fileUrl:  z.string().url('Invalid file URL'),
  fileSize: z
    .number()
    .max(50 * 1024 * 1024, 'File must be under 50 MB'),
  mimeType: z.string().min(1, 'MIME type is required'),
})

export const reviewDocumentSchema = z.object({
  status:      documentStatusSchema,
  reviewNotes: z
    .string()
    .max(1000, 'Review notes cannot exceed 1000 characters')
    .optional(),
})

export type UploadDocumentData  = z.infer<typeof uploadDocumentSchema>
export type ReviewDocumentData  = z.infer<typeof reviewDocumentSchema>
