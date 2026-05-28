import { z } from 'zod'

export const borrowerInquirySchema = z.object({
  firstName:       z.string().min(1, 'First name is required'),
  lastName:        z.string().min(1, 'Last name is required'),
  email:           z.string().email('Valid email address required'),
  phone:           z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone number format'),
  loanType:        z.enum(['dscr', 'fix_flip', 'bridge'], {
    required_error: 'Please select a loan type',
  }),
  propertyState:   z.string().length(2, 'Use 2-letter state abbreviation'),
  loanAmount:      z
    .number()
    .min(5_000_000, 'Minimum loan amount is $50,000')    // in cents
    .max(1_000_000_000, 'Maximum is $10,000,000'),
  message:         z
    .string()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional(),
  referralSource:  z.string().optional(),
})

export const mloRegisterSchema = z.object({
  email:        z.string().email('Valid email required'),
  password:     z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  firstName:    z.string().min(1, 'First name is required'),
  lastName:     z.string().min(1, 'Last name is required'),
  nmls:         z
    .string()
    .min(4, 'NMLS number required')
    .regex(/^\d+$/, 'NMLS must be numeric'),
  companyName:  z.string().min(2, 'Company name is required'),
  phone:        z
    .string()
    .min(10, 'Valid phone number required')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone number format'),
  licenseState: z.string().length(2, 'Use 2-letter state code'),
})

export const mloLoginSchema = z.object({
  email:    z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required'),
})

export type BorrowerInquiryData = z.infer<typeof borrowerInquirySchema>
export type MLORegisterData     = z.infer<typeof mloRegisterSchema>
export type MLOLoginData        = z.infer<typeof mloLoginSchema>
