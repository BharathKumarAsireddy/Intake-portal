'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { borrowerInquirySchema, type BorrowerInquiryData } from '@/lib/validations/borrower'
import { US_STATES } from '@/lib/constants'

export function BorrowerInquiryForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BorrowerInquiryData>({
    resolver: zodResolver(borrowerInquirySchema),
  })

  const onSubmit = async (data: BorrowerInquiryData) => {
    await fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'inquiry', ...data }),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-icecap-success/10 border-2 border-icecap-success mb-4">
          <CheckCircle2 className="h-8 w-8 text-icecap-success" />
        </div>
        <h3 className="font-display text-2xl text-icecap-white mb-2">Inquiry Received</h3>
        <p className="text-icecap-muted text-sm max-w-sm">
          A member of the Kaye Network team will reach out within one business day to discuss your loan options.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" {...register('firstName')} />
          {errors.firstName && (
            <p className="text-icecap-danger text-xs">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Smith" {...register('lastName')} />
          {errors.lastName && (
            <p className="text-icecap-danger text-xs">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
        {errors.email && (
          <p className="text-icecap-danger text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="(561) 555-0000" {...register('phone')} />
        {errors.phone && (
          <p className="text-icecap-danger text-xs">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Loan Type</Label>
          <Select onValueChange={(v) => setValue('loanType', v as BorrowerInquiryData['loanType'])}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dscr">DSCR Loan</SelectItem>
              <SelectItem value="fix_flip">Fix &amp; Flip</SelectItem>
              <SelectItem value="bridge">Bridge Loan</SelectItem>
            </SelectContent>
          </Select>
          {errors.loanType && (
            <p className="text-icecap-danger text-xs">{errors.loanType.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Property State</Label>
          <Select onValueChange={(v) => setValue('propertyState', v)}>
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((s) => (
                <SelectItem key={s.code} value={s.code}>{s.code} — {s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.propertyState && (
            <p className="text-icecap-danger text-xs">{errors.propertyState.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          placeholder="Tell us about the property or any specific questions..."
          rows={3}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-icecap-danger text-xs">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
        ) : (
          'Submit Inquiry'
        )}
      </Button>

      <p className="text-center text-icecap-muted text-xs">
        We respond within 1 business day. No spam, ever.
      </p>
    </form>
  )
}
