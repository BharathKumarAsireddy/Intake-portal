'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { mloLoginSchema, type MLOLoginData } from '@/lib/validations/borrower'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MLOLoginData>({
    resolver: zodResolver(mloLoginSchema),
  })

  const onSubmit = async (data: MLOLoginData) => {
    // TODO: Supabase auth sign-in
    console.log('Login:', data)
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl text-icecap-white mb-2">
          Partner Login
        </h1>
        <p className="text-icecap-muted text-sm">
          Sign in to your broker portal
        </p>
      </div>

      {/* Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-icecap-steel bg-icecap-slate shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@brokerage.com"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-icecap-danger text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-icecap-gold hover:text-icecap-gold-light transition-colors">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-icecap-danger text-xs">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <Separator className="my-5" />

        <p className="text-center text-icecap-muted text-sm">
          Not a partner yet?{' '}
          <Link href="/register" className="text-icecap-gold hover:text-icecap-gold-light transition-colors font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
