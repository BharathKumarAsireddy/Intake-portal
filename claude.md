# CLAUDE.md — IceCap Group / Simple Close Homebuyers
## Broker & Borrower Intake Portal

---

## Project Overview

This is a **Next.js 14+ App Router** application serving as the primary intake, submission, and education portal for **IceCap Group / Simple Close Homebuyers** — a non-QM investor lending platform based in Palm Beach County, Florida.

The platform serves two distinct user types:
- **MLOs / Mortgage Brokers** — submit loan files, upload documents, track loan pipeline status
- **Borrowers / Investors** — learn about loan products, understand the process, submit initial inquiries

This portal is modeled on best practices from Willow Processing (broker portal + LOS workflow) and Saleztrax (borrower education + resource model), rebuilt specifically for **non-QM investor lending**: DSCR, Fix & Flip, and Bridge loans.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui |
| Forms | React Hook Form + Zod validation |
| File Uploads | UploadThing or Supabase Storage |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password + magic link) |
| CRM Integration | GoHighLevel API (webhooks + REST) |
| Email/SMS | GoHighLevel workflows (triggered via webhook) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Design System

### Brand Colors
```css
--icecap-navy:     #0A1628   /* primary background, hero sections */
--icecap-gold:     #C9A84C   /* primary accent, CTAs, highlights */
--icecap-gold-light: #E8C97A /* hover states, secondary gold */
--icecap-slate:    #1E2D45   /* card backgrounds, secondary surfaces */
--icecap-steel:    #2E4460   /* borders, dividers */
--icecap-white:    #F8F9FA   /* body text on dark */
--icecap-muted:    #8B9BAE   /* secondary text, labels */
--icecap-success:  #22C55E   /* approved, clear to close */
--icecap-warning:  #F59E0B   /* conditions pending, in review */
--icecap-danger:   #EF4444   /* suspended, action required */
```

### Typography
- **Display / Hero**: `font-family: 'Playfair Display', serif` — headlines, section titles, loan product names
- **Body / UI**: `font-family: 'DM Sans', sans-serif` — body copy, labels, nav, form fields
- **Mono / Data**: `font-family: 'JetBrains Mono', monospace` — loan amounts, file IDs, reference numbers

### Design Principles
- **Dark luxury aesthetic** — navy/gold palette, feels premium and institutional
- **High information density** — dashboards should show max useful data without clutter
- **Mobile-first** — brokers check pipelines on phones; forms must work on any device
- **No generic Bootstrap look** — every component should feel custom-built, not template-derived
- Generous whitespace in marketing/education pages, tight data-dense layout in dashboard

---

## Project Structure

```
/app
  /(marketing)               # Public-facing borrower pages
    /page.tsx                # Homepage — hero, loan products, process overview
    /loans
      /dscr/page.tsx         # DSCR loan education page
      /fix-and-flip/page.tsx # Fix & Flip education page
      /bridge/page.tsx       # Bridge loan education page
    /process/page.tsx        # Step-by-step process explainer (like Saleztrax)
    /resources/page.tsx      # Borrower resource center — FAQs, guides, videos
    /apply/page.tsx          # Borrower initial inquiry form
  /(auth)
    /login/page.tsx          # MLO login
    /register/page.tsx       # MLO partner registration
  /(dashboard)               # Protected — MLO/Broker portal
    /dashboard/page.tsx      # Pipeline overview — all active loans, status summary
    /submit/page.tsx         # New loan submission form (multi-step)
    /loans/page.tsx          # Loan list with filters, search, sort
    /loans/[id]/page.tsx     # Individual loan file detail view
    /loans/[id]/documents/page.tsx  # Document management per file
    /loans/[id]/conditions/page.tsx # Condition log and tracking
    /profile/page.tsx        # MLO profile, NMLS info, preferences
  /api
    /loans/route.ts          # Loan CRUD operations
    /upload/route.ts         # Document upload handler
    /webhook/ghl/route.ts    # GoHighLevel webhook receiver
    /status/route.ts         # Loan status update endpoint
/components
  /ui                        # shadcn/ui base components
  /marketing
    /HeroSection.tsx
    /LoanProductCard.tsx
    /ProcessTimeline.tsx
    /BorrowerResourceCard.tsx
    /TestimonialSection.tsx
    /CTABanner.tsx
  /dashboard
    /PipelineSummary.tsx     # Top-level stats: active loans, funded this month, etc.
    /LoanCard.tsx            # Individual loan file card
    /LoanTable.tsx           # Tabular view of pipeline
    /StatusBadge.tsx         # Color-coded loan status indicator
    /ConditionTracker.tsx    # Outstanding conditions list
    /DocumentUploader.tsx    # Drag-and-drop document upload
    /MilestoneTimeline.tsx   # Visual loan progress tracker
    /ActivityFeed.tsx        # Recent updates, notes, timestamps
  /forms
    /LoanSubmissionForm.tsx  # Multi-step new loan submission
    /BorrowerInquiryForm.tsx # Public borrower intake form
    /DocumentChecklist.tsx   # Dynamic checklist by loan type
  /shared
    /Navbar.tsx
    /Sidebar.tsx
    /PageHeader.tsx
    /LoadingSpinner.tsx
    /EmptyState.tsx
/lib
  /supabase.ts               # Supabase client
  /ghl.ts                    # GoHighLevel API helpers
  /validations               # Zod schemas
    /loan.ts
    /document.ts
    /borrower.ts
  /utils.ts
  /constants.ts              # Loan types, statuses, doc checklists
/types
  /loan.ts
  /user.ts
  /document.ts
```

---

## Core Data Models

### Loan File
```typescript
interface LoanFile {
  id: string
  referenceNumber: string           // e.g. ICA-2025-0042
  loanType: 'dscr' | 'fix_flip' | 'bridge'
  status: LoanStatus
  borrower: BorrowerInfo
  property: PropertyInfo
  loanDetails: LoanDetails
  documents: Document[]
  conditions: Condition[]
  milestones: Milestone[]
  notes: Note[]
  assignedProcessor: string | null  // India team member
  mloId: string
  createdAt: Date
  updatedAt: Date
  ghlContactId: string | null       // Linked GHL contact
  ghlOpportunityId: string | null   // Linked GHL pipeline
}

type LoanStatus =
  | 'draft'
  | 'submitted'
  | 'processing'
  | 'in_underwriting'
  | 'conditional_approval'
  | 'clear_to_close'
  | 'closed_funded'
  | 'suspended'
  | 'withdrawn'
```

### Loan Details by Type
```typescript
// DSCR Specific
interface DSCRDetails {
  rentalIncome: number
  monthlyDebt: number
  dscrRatio: number          // auto-calculated: rentalIncome / monthlyDebt
  propertyType: 'sfr' | 'multi_family' | 'condo' | 'commercial'
  leaseInPlace: boolean
  vestingEntity: 'individual' | 'llc' | 'trust' | 'corp'
}

// Fix & Flip Specific
interface FixFlipDetails {
  purchasePrice: number
  arvEstimate: number        // After Repair Value
  rehabBudget: number
  ltarv: number              // auto-calculated: loanAmount / arvEstimate
  exitStrategy: 'sell' | 'refi_dscr' | 'refi_conventional'
  projectTimeline: number    // months
  contractorName?: string
}

// Bridge Specific
interface BridgeDetails {
  purpose: 'purchase' | 'refi_cashout' | 'refi_rateterm'
  exitStrategy: string
  bridgePeriod: number       // months
  sourceOfRepayment: string
}
```

### Document
```typescript
interface Document {
  id: string
  loanId: string
  category: DocumentCategory
  fileName: string
  fileUrl: string
  fileSize: number
  uploadedBy: string
  uploadedAt: Date
  status: 'pending_review' | 'approved' | 'rejected' | 'needs_update'
  reviewNotes?: string
}

type DocumentCategory =
  // Universal
  | 'purchase_contract'
  | 'property_photos'
  | 'title_commitment'
  | 'insurance_binder'
  | 'entity_docs'       // LLC operating agreement, articles
  | 'bank_statements'
  | 'credit_authorization'
  // DSCR specific
  | 'lease_agreement'
  | 'rent_roll'
  | 'appraisal'
  // Fix & Flip specific
  | 'scope_of_work'
  | 'contractor_bid'
  | 'arv_appraisal'
  | 'draw_schedule'
  // Bridge specific
  | 'payoff_statement'
  | 'exit_strategy_letter'
```

---

## Document Checklist by Loan Type

### DSCR Checklist
```typescript
export const DSCR_CHECKLIST = [
  { id: 'credit_auth', label: 'Credit Authorization', required: true },
  { id: 'purchase_contract', label: 'Fully Executed Purchase Contract', required: true },
  { id: 'entity_docs', label: 'LLC / Entity Docs (if applicable)', required: false },
  { id: 'lease_agreement', label: 'Current Lease Agreement', required: true },
  { id: 'rent_roll', label: 'Rent Roll (if multi-unit)', required: false },
  { id: 'appraisal', label: 'Appraisal / BPO', required: true },
  { id: 'title_commitment', label: 'Title Commitment', required: true },
  { id: 'insurance_binder', label: 'Property Insurance Binder', required: true },
  { id: 'bank_statements', label: '3 Months Bank Statements (reserves)', required: true },
  { id: 'property_photos', label: 'Property Photos', required: false },
]
```

### Fix & Flip Checklist
```typescript
export const FIX_FLIP_CHECKLIST = [
  { id: 'credit_auth', label: 'Credit Authorization', required: true },
  { id: 'purchase_contract', label: 'Fully Executed Purchase Contract', required: true },
  { id: 'scope_of_work', label: 'Detailed Scope of Work', required: true },
  { id: 'contractor_bid', label: 'Contractor Bid / Budget', required: true },
  { id: 'arv_appraisal', label: 'ARV Appraisal or BPO', required: true },
  { id: 'draw_schedule', label: 'Proposed Draw Schedule', required: false },
  { id: 'entity_docs', label: 'LLC / Entity Docs', required: false },
  { id: 'bank_statements', label: '3 Months Bank Statements', required: true },
  { id: 'property_photos', label: 'Subject Property Photos (current condition)', required: true },
  { id: 'title_commitment', label: 'Title Commitment', required: true },
  { id: 'insurance_binder', label: 'Builder\'s Risk / Insurance Binder', required: true },
]
```

### Bridge Checklist
```typescript
export const BRIDGE_CHECKLIST = [
  { id: 'credit_auth', label: 'Credit Authorization', required: true },
  { id: 'purchase_contract', label: 'Purchase Contract or Payoff Statement', required: true },
  { id: 'exit_strategy_letter', label: 'Written Exit Strategy Letter', required: true },
  { id: 'entity_docs', label: 'LLC / Entity Docs (if applicable)', required: false },
  { id: 'appraisal', label: 'Appraisal', required: true },
  { id: 'title_commitment', label: 'Title Commitment', required: true },
  { id: 'insurance_binder', label: 'Property Insurance Binder', required: true },
  { id: 'bank_statements', label: '3 Months Bank Statements', required: true },
]
```

---

## Loan Status Workflow

```
draft → submitted → processing → in_underwriting → conditional_approval → clear_to_close → closed_funded
                                                                       ↘ suspended
                                                                       ↘ withdrawn
```

Each status transition must:
1. Log a timestamp in `milestones[]`
2. Trigger a GoHighLevel webhook to update the GHL opportunity stage
3. Send automated email/SMS notification to borrower and MLO (via GHL workflow)
4. Add an entry to `ActivityFeed`

---

## GoHighLevel Integration

### Webhook Payload — New Loan Submission
```typescript
// POST to GHL when MLO submits new loan
{
  event: 'loan_submitted',
  loanId: string,
  referenceNumber: string,
  loanType: 'dscr' | 'fix_flip' | 'bridge',
  mloName: string,
  mloEmail: string,
  borrowerName: string,
  borrowerPhone: string,
  borrowerEmail: string,
  propertyAddress: string,
  loanAmount: number,
  status: 'submitted',
  timestamp: string
}
```

### GHL Pipeline Stages (map to loan status)
| Portal Status | GHL Stage |
|---|---|
| submitted | New Submission |
| processing | In Processing |
| in_underwriting | Submitted to UW |
| conditional_approval | Conditional Approval |
| clear_to_close | Clear to Close |
| closed_funded | Funded |
| suspended | Suspended |

---

## Marketing Pages — Content Requirements

### Homepage Hero
- Headline: "Expert Processing for Investor Loans"
- Subheadline: "DSCR · Fix & Flip · Bridge — Fast, Reliable, Non-QM Specialists"
- Primary CTA: "Submit a Loan File" → `/dashboard/submit`
- Secondary CTA: "Learn About Our Loans" → `/loans`
- Background: dark navy with subtle gold grain/gradient

### DSCR Education Page (`/loans/dscr`)
Sections:
1. What is a DSCR loan? (plain English explanation)
2. How the DSCR ratio is calculated (interactive calculator — rentIncome / monthlyDebt)
3. Property types we finance
4. What documents you'll need (visual checklist)
5. The process timeline (milestone steps)
6. FAQ (LLC vesting, credit score, prepayment penalty, seasoning)
7. CTA: Start your DSCR application

### Fix & Flip Education Page (`/loans/fix-and-flip`)
Sections:
1. What is a Fix & Flip loan?
2. How LTV and ARV work (interactive calculator)
3. Draw schedule explained
4. What we look for in a flip deal
5. Document checklist (visual)
6. Timeline from close to payoff
7. FAQ (experience requirements, rehab timeline, extensions)
8. CTA: Submit your fix & flip deal

### Bridge Loan Education Page (`/loans/bridge`)
Sections:
1. What is a bridge loan? When to use one
2. Common bridge scenarios (purchase before selling, time-sensitive deals)
3. Exit strategy requirements
4. Document checklist (visual)
5. Bridge vs. DSCR — which is right for you?
6. FAQ
7. CTA: Talk to a specialist

### Process Page (`/process`)
Modeled after Saleztrax's home construction metaphor, but for investors:
1. **Deal Submission** — MLO submits file via portal
2. **File Setup & Doc Collection** — Processor builds out the file, requests documents
3. **Third-Party Ordering** — Title, appraisal, insurance ordered
4. **Underwriting Submission** — Complete file submitted to lender
5. **Conditions** — Processor works conditions, updates all parties
6. **Clear to Close** — Final verification, closing scheduled
7. **Funded** — Wire sent, deal closed

---

## Dashboard — Key Screens

### Pipeline Dashboard (`/dashboard`)
Stats row (top):
- Active Loans (count)
- Loans in Underwriting (count)
- Clear to Close (count)
- Funded This Month (count + dollar volume)

Below stats:
- Recent Activity Feed (right column)
- Loan Pipeline Table (left, main content) — sortable by status, loan type, date
- Quick Submit button (top right, always visible)

### Loan Submission Form (`/dashboard/submit`)
Multi-step form — 4 steps:
1. **Loan Type & Basics** — select DSCR / Fix & Flip / Bridge, loan amount, property address
2. **Borrower Info** — name, email, phone, entity info (LLC name, EIN if applicable)
3. **Loan Details** — type-specific fields (DSCR ratio inputs, ARV for fix/flip, exit strategy for bridge)
4. **Document Upload** — dynamic checklist based on loan type selected in step 1; drag-and-drop uploader; show which docs are required vs optional
- Progress bar at top showing step 1–4
- Save as Draft available at any step
- On submit: create Supabase record → trigger GHL webhook → redirect to loan detail page

### Loan Detail Page (`/dashboard/loans/[id]`)
Layout: 2-column on desktop, stacked on mobile
Left (main):
- Loan header: reference #, property address, loan type badge, loan amount
- Milestone timeline (visual step indicator showing current stage)
- Conditions section (expandable list of outstanding conditions)
- Notes / activity feed (chronological log of all actions)
Right (sidebar):
- Borrower contact card
- Assigned processor info
- Document status summary (X of Y uploaded, X approved)
- Quick actions: Upload Doc, Add Note, Update Status

---

## Processor Workflow Notes (India Team Context)

- Processors log in with separate accounts, role = `processor`
- Processor dashboard shows their assigned file queue
- Each file has a task checklist (generated from loan type)
- Processors can: update conditions, mark docs as reviewed, add internal notes, change loan status
- MLOs can see all processor activity in real time via the activity feed
- Status changes by processor trigger GHL webhook automatically
- US-based team member (admin role) can reassign files, override statuses, add processor notes

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# GoHighLevel
GHL_API_KEY=
GHL_LOCATION_ID=
GHL_WEBHOOK_SECRET=
GHL_PIPELINE_ID=

# Upload
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_BRAND_NAME="IceCap Group"
NEXT_PUBLIC_BRAND_TAGLINE="Your Partner in Capital"
```

---

## Code Style & Conventions

- All components use **named exports** (not default exports, except page.tsx files)
- Use `'use client'` directive only when necessary (prefer server components)
- All forms use **React Hook Form + Zod** — never uncontrolled inputs
- API routes use **Next.js Route Handlers** (not pages/api)
- Use **server actions** for form submissions where appropriate
- All monetary values stored as integers (cents) in the database, displayed with formatting via `Intl.NumberFormat`
- Loan reference numbers format: `ICA-YYYY-XXXX` (e.g. `ICA-2025-0042`)
- All dates stored as UTC ISO strings, displayed in user's local timezone
- Status badge colors strictly follow the design system color tokens above
- Never use inline styles — always Tailwind utility classes

---

## Key UX Rules

1. **Status is always visible** — every loan card shows a color-coded status badge at all times
2. **Document progress is always visible** — show "X of Y docs uploaded" on every loan card
3. **Conditions are surfaced prominently** — if there are outstanding conditions, they appear above the fold on the loan detail page
4. **Empty states are helpful** — when pipeline is empty, show "Submit your first loan" CTA, not a blank table
5. **Mobile pipeline works** — MLOs must be able to check loan status on phone without needing desktop
6. **Save progress** — multi-step submission form always auto-saves to draft so data is never lost
7. **DSCR ratio calculated live** — as MLO types rental income and monthly debt, DSCR ratio updates in real time

---

## Brand Voice

- Professional but approachable — not stuffy bank language
- Investor-savvy — speak the language of real estate investors (ARV, DSCR, draw schedule, etc.)
- Confidence-forward — "Close with confidence", "Fast decisions, funded deals"
- Tagline: **"Your Partner in Capital"**
- Company names: **IceCap Group** (primary brand) / **Simple Close Homebuyers** (consumer-facing)

---

## Reference Companies (for design inspiration)

| Company | What to borrow |
|---|---|
| Willow Processing (willowprocessing.com) | Portal UX, milestone tracking, same-day SLA messaging |
| Saleztrax (saleztrax.com) | Borrower education structure, process timeline metaphor, resource center layout |
| Priority PMG (prioritypmg.com) | On-demand feel, direct communication emphasis |

---

*Last updated: May 2026 | IceCap Group / Vantage Media Consulting*