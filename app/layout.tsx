import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kaye Network | Broker & Borrower Portal',
    template: '%s | Kaye Network',
  },
  description:
    'Expert processing for investor loans — DSCR, Fix & Flip, and Bridge. Your Partner in Capital.',
  keywords: [
    'DSCR loan',
    'fix and flip loan',
    'bridge loan',
    'non-QM',
    'investor lending',
    'mortgage broker portal',
    'Kaye Network',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-icecap-navy text-icecap-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
