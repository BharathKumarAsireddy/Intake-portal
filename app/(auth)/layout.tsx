import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-icecap-navy flex flex-col">
      {/* Minimal header */}
      <header className="border-b border-icecap-steel px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="font-mono text-icecap-gold font-bold text-base tracking-widest">
            ICE<span className="text-icecap-white">CAP</span>
          </span>
          <span className="text-icecap-muted text-xs tracking-wider border-l border-icecap-steel pl-2">
            GROUP
          </span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="border-t border-icecap-steel px-6 py-4 text-center">
        <p className="text-icecap-muted text-xs">
          © {new Date().getFullYear()} Kaye Network · Your Partner in Capital
        </p>
      </footer>
    </div>
  )
}
