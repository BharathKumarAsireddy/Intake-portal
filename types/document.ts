// ── Document Categories ───────────────────────────────────────────────────────

/** Universal categories (all loan types) */
type UniversalDocCategory =
  | 'purchase_contract'
  | 'property_photos'
  | 'title_commitment'
  | 'insurance_binder'
  | 'entity_docs'       // LLC operating agreement, articles of org
  | 'bank_statements'
  | 'credit_authorization'

/** DSCR-specific categories */
type DSCRDocCategory =
  | 'lease_agreement'
  | 'rent_roll'
  | 'appraisal'

/** Fix & Flip-specific categories */
type FixFlipDocCategory =
  | 'scope_of_work'
  | 'contractor_bid'
  | 'arv_appraisal'
  | 'draw_schedule'

/** Bridge-specific categories */
type BridgeDocCategory =
  | 'payoff_statement'
  | 'exit_strategy_letter'

export type DocumentCategory =
  | UniversalDocCategory
  | DSCRDocCategory
  | FixFlipDocCategory
  | BridgeDocCategory

// ── Document Status ───────────────────────────────────────────────────────────

export type DocumentStatus =
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'needs_update'

// ── Primary Model ─────────────────────────────────────────────────────────────

export interface Document {
  id: string
  loanId: string
  category: DocumentCategory
  fileName: string
  fileUrl: string
  fileSize: number              // bytes
  mimeType: string
  uploadedBy: string            // user ID
  uploadedAt: Date
  status: DocumentStatus
  reviewNotes?: string
  reviewedBy?: string
  reviewedAt?: Date
}

// ── Checklist Types ───────────────────────────────────────────────────────────

export interface ChecklistItem {
  id: DocumentCategory
  label: string
  required: boolean
  description?: string
}

export interface ChecklistItemWithStatus extends ChecklistItem {
  uploaded: boolean
  documentId?: string
  documentStatus?: DocumentStatus
}
