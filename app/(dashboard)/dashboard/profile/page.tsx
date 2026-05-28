import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/PageHeader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const metadata: Metadata = {
  title: 'My Profile',
}

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your MLO account information and preferences."
      />

      <div className="max-w-2xl space-y-6">

        {/* Avatar section */}
        <div className="rounded-xl border border-icecap-steel bg-icecap-slate p-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl text-icecap-gold bg-icecap-gold/10">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-icecap-white font-medium font-display">John Doe</p>
              <p className="text-icecap-muted text-sm">john.doe@brokerage.com</p>
              <p className="text-icecap-muted text-xs mt-1 font-mono">NMLS #1234567</p>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="rounded-xl border border-icecap-steel bg-icecap-slate p-6">
          <h2 className="font-display text-lg text-icecap-white mb-5">Personal Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>First Name</Label>
                <Input defaultValue="John" />
              </div>
              <div className="space-y-1.5">
                <Label>Last Name</Label>
                <Input defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input type="email" defaultValue="john.doe@brokerage.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone Number</Label>
              <Input type="tel" defaultValue="(561) 555-0000" />
            </div>
          </div>
        </div>

        {/* Licensing */}
        <div className="rounded-xl border border-icecap-steel bg-icecap-slate p-6">
          <h2 className="font-display text-lg text-icecap-white mb-5">Licensing &amp; Company</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>NMLS Number</Label>
                <Input defaultValue="1234567" className="font-mono" />
              </div>
              <div className="space-y-1.5">
                <Label>License State</Label>
                <Input defaultValue="FL" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Company / Brokerage</Label>
              <Input defaultValue="ABC Mortgage LLC" />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <Button variant="navy-outline">Cancel</Button>
          <Button variant="gold">Save Changes</Button>
        </div>

        <Separator />

        {/* Danger zone */}
        <div className="rounded-xl border border-icecap-danger/20 bg-icecap-danger/5 p-6">
          <h2 className="font-display text-lg text-icecap-danger mb-2">Account</h2>
          <p className="text-icecap-muted text-sm mb-4">
            Sign out of your portal account.
          </p>
          <Button variant="destructive" size="sm">Sign Out</Button>
        </div>
      </div>
    </div>
  )
}
