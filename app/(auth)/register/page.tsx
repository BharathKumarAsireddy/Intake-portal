'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { mloRegisterSchema, type MLORegisterData } from '@/lib/validations/borrower'
import { US_STATES } from '@/lib/constants'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MLORegisterData>({
    resolver: zodResolver(mloRegisterSchema),
  })

  const onSubmit = async (data: MLORegisterData) => {
    // TODO: Supabase auth sign-up
    console.log('Register:', data)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl text-icecap-white mb-2">
          Partner Registration
        </h1>
        <p className="text-icecap-muted text-sm">
          Create your MLO broker account to start submitting files
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-2xl border border-icecap-steel bg-icecap-slate shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
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
            <Input id="email" type="email" placeholder="john@brokerage.com" {...register('email')} />
            {errors.email && (
              <p className="text-icecap-danger text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && (
              <p className="text-icecap-danger text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nmls">NMLS #</Label>
              <Input id="nmls" placeholder="1234567" {...register('nmls')} />
              {errors.nmls && (
                <p className="text-icecap-danger text-xs">{errors.nmls.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(561) 555-0000" {...register('phone')} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="companyName">Company / Brokerage</Label>
            <Input id="companyName" placeholder="ABC Mortgage LLC" {...register('companyName')} />
          </div>

          <div className="space-y-1.5">
            <Label>License State</Label>
            <Select onValueChange={(v) => setValue('licenseState', v)}>
              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                {US_STATES.map((s) => (
                  <SelectItem key={s.code} value={s.code}>{s.code} — {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>
            ) : (
              'Create Partner Account'
            )}
          </Button>
        </form>

        <Separator className="my-5" />

        <p className="text-center text-icecap-muted text-sm">
          Already a partner?{' '}
          <Link href="/login" className="text-icecap-gold hover:text-icecap-gold-light transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
