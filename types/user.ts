// ── Roles ─────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'processor' | 'mlo' | 'borrower'

// ── Base Profile ──────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
  phone?: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

// ── Role-Specific Profiles ────────────────────────────────────────────────────

/** Mortgage Loan Originator / Broker */
export interface MLOProfile extends UserProfile {
  role: 'mlo'
  nmls: string                      // NMLS license number (required)
  companyName: string
  licenseState: string              // 2-letter state code
  preferredContactMethod: 'email' | 'phone' | 'text'
  ghlContactId?: string             // linked GHL contact for CRM
}

/** Processing team member (India team) */
export interface ProcessorProfile extends UserProfile {
  role: 'processor'
  assignedLoanIds: string[]
  maxCapacity: number               // max concurrent files
}

/** Admin / US-based team member */
export interface AdminProfile extends UserProfile {
  role: 'admin'
}

export type AnyUserProfile = MLOProfile | ProcessorProfile | AdminProfile | UserProfile

// ── Auth Types ────────────────────────────────────────────────────────────────

export interface AuthSession {
  user: UserProfile
  accessToken: string
  expiresAt: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
  nmls: string
  companyName: string
  phone: string
  licenseState: string
}
