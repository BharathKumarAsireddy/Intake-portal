import type { ChecklistItem } from '@/types/document'
import type { LoanStatus, LoanType } from '@/types/loan'

// ── Document Checklists ───────────────────────────────────────────────────────

export const DSCR_CHECKLIST: ChecklistItem[] = [
  { id: 'credit_authorization',  label: 'Credit Authorization',                     required: true  },
  { id: 'purchase_contract',     label: 'Fully Executed Purchase Contract',          required: true  },
  { id: 'entity_docs',           label: 'LLC / Entity Docs (if applicable)',         required: false },
  { id: 'lease_agreement',       label: 'Current Lease Agreement',                  required: true  },
  { id: 'rent_roll',             label: 'Rent Roll (if multi-unit)',                 required: false },
  { id: 'appraisal',             label: 'Appraisal / BPO',                          required: true  },
  { id: 'title_commitment',      label: 'Title Commitment',                          required: true  },
  { id: 'insurance_binder',      label: 'Property Insurance Binder',                required: true  },
  { id: 'bank_statements',       label: '3 Months Bank Statements (reserves)',       required: true  },
  { id: 'property_photos',       label: 'Property Photos',                          required: false },
]

export const FIX_FLIP_CHECKLIST: ChecklistItem[] = [
  { id: 'credit_authorization',  label: 'Credit Authorization',                     required: true  },
  { id: 'purchase_contract',     label: 'Fully Executed Purchase Contract',          required: true  },
  { id: 'scope_of_work',         label: 'Detailed Scope of Work',                   required: true  },
  { id: 'contractor_bid',        label: 'Contractor Bid / Budget',                  required: true  },
  { id: 'arv_appraisal',         label: 'ARV Appraisal or BPO',                    required: true  },
  { id: 'draw_schedule',         label: 'Proposed Draw Schedule',                   required: false },
  { id: 'entity_docs',           label: 'LLC / Entity Docs',                        required: false },
  { id: 'bank_statements',       label: '3 Months Bank Statements',                 required: true  },
  { id: 'property_photos',       label: 'Subject Property Photos (current condition)', required: true },
  { id: 'title_commitment',      label: 'Title Commitment',                          required: true  },
  { id: 'insurance_binder',      label: "Builder's Risk / Insurance Binder",        required: true  },
]

export const BRIDGE_CHECKLIST: ChecklistItem[] = [
  { id: 'credit_authorization',  label: 'Credit Authorization',                     required: true  },
  { id: 'purchase_contract',     label: 'Purchase Contract or Payoff Statement',    required: true  },
  { id: 'exit_strategy_letter',  label: 'Written Exit Strategy Letter',             required: true  },
  { id: 'entity_docs',           label: 'LLC / Entity Docs (if applicable)',         required: false },
  { id: 'appraisal',             label: 'Appraisal',                                required: true  },
  { id: 'title_commitment',      label: 'Title Commitment',                          required: true  },
  { id: 'insurance_binder',      label: 'Property Insurance Binder',                required: true  },
  { id: 'bank_statements',       label: '3 Months Bank Statements',                 required: true  },
]

export const CHECKLIST_BY_LOAN_TYPE: Record<LoanType, ChecklistItem[]> = {
  dscr:      DSCR_CHECKLIST,
  fix_flip:  FIX_FLIP_CHECKLIST,
  bridge:    BRIDGE_CHECKLIST,
}

// ── Loan Status Config ────────────────────────────────────────────────────────

export const LOAN_STATUS_LABELS: Record<LoanStatus, string> = {
  draft:               'Draft',
  submitted:           'Submitted',
  processing:          'In Processing',
  in_underwriting:     'Submitted to UW',
  conditional_approval:'Conditional Approval',
  clear_to_close:      'Clear to Close',
  closed_funded:       'Funded',
  suspended:           'Suspended',
  withdrawn:           'Withdrawn',
}

export const LOAN_STATUS_COLORS: Record<LoanStatus, string> = {
  draft:               'text-icecap-muted bg-icecap-steel/40 border-icecap-steel',
  submitted:           'text-blue-300 bg-blue-900/30 border-blue-700',
  processing:          'text-icecap-warning bg-yellow-900/30 border-yellow-700',
  in_underwriting:     'text-purple-300 bg-purple-900/30 border-purple-700',
  conditional_approval:'text-orange-300 bg-orange-900/30 border-orange-700',
  clear_to_close:      'text-icecap-success bg-green-900/30 border-green-700',
  closed_funded:       'text-icecap-gold bg-icecap-gold/10 border-icecap-gold/40',
  suspended:           'text-icecap-danger bg-red-900/30 border-red-700',
  withdrawn:           'text-icecap-muted bg-icecap-steel/20 border-icecap-steel',
}

// Maps portal status to GoHighLevel pipeline stage name
export const GHL_STAGE_MAP: Record<LoanStatus, string | null> = {
  draft:               null,
  submitted:           'New Submission',
  processing:          'In Processing',
  in_underwriting:     'Submitted to UW',
  conditional_approval:'Conditional Approval',
  clear_to_close:      'Clear to Close',
  closed_funded:       'Funded',
  suspended:           'Suspended',
  withdrawn:           null,
}

// ── Loan Type Labels ──────────────────────────────────────────────────────────

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  dscr:     'DSCR',
  fix_flip: 'Fix & Flip',
  bridge:   'Bridge',
}

export const LOAN_TYPE_COLORS: Record<LoanType, string> = {
  dscr:     'text-blue-300 bg-blue-900/30 border-blue-700',
  fix_flip: 'text-orange-300 bg-orange-900/30 border-orange-700',
  bridge:   'text-purple-300 bg-purple-900/30 border-purple-700',
}

// ── Workflow: Valid Next Statuses ─────────────────────────────────────────────

export const VALID_STATUS_TRANSITIONS: Record<LoanStatus, LoanStatus[]> = {
  draft:               ['submitted'],
  submitted:           ['processing', 'withdrawn'],
  processing:          ['in_underwriting', 'withdrawn'],
  in_underwriting:     ['conditional_approval', 'suspended', 'withdrawn'],
  conditional_approval:['clear_to_close', 'in_underwriting', 'suspended', 'withdrawn'],
  clear_to_close:      ['closed_funded', 'conditional_approval', 'suspended'],
  closed_funded:       [],
  suspended:           ['processing', 'withdrawn'],
  withdrawn:           [],
}

// ── App Constants ─────────────────────────────────────────────────────────────

export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Kaye Network'
export const BRAND_TAGLINE = process.env.NEXT_PUBLIC_BRAND_TAGLINE ?? 'Your Partner in Capital'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024   // 50 MB
export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },     { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },     { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },     { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },      { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },    { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },        { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },    { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },       { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts'},{ code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },   { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },    { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },    { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire'},{ code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina'},{ code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },        { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },      { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },{ code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },{ code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },       { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },     { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },   { code: 'WY', name: 'Wyoming' },
]
