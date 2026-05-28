import { Navbar } from '@/components/shared/Navbar'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
      <footer className="border-t border-icecap-steel bg-icecap-slate py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-mono text-icecap-gold font-bold text-lg tracking-widest">
              KAYE<span className="text-icecap-white">NET</span>
            </span>
            <p className="text-icecap-muted text-sm mt-3 leading-relaxed">
              Expert processing for investor loans. DSCR, Fix &amp; Flip, and Bridge — fast, reliable, non-QM specialists.
            </p>
            <p className="text-icecap-muted text-xs mt-3">
              Based in Palm Beach County, Florida
            </p>
          </div>

          <div>
            <h4 className="text-icecap-white text-sm font-semibold mb-3">Loan Products</h4>
            <ul className="space-y-2 text-icecap-muted text-sm">
              <li><a href="/loans/dscr" className="hover:text-icecap-gold transition-colors">DSCR Loans</a></li>
              <li><a href="/loans/fix-and-flip" className="hover:text-icecap-gold transition-colors">Fix &amp; Flip</a></li>
              <li><a href="/loans/bridge" className="hover:text-icecap-gold transition-colors">Bridge Loans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-icecap-white text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-icecap-muted text-sm">
              <li><a href="/process" className="hover:text-icecap-gold transition-colors">Our Process</a></li>
              <li><a href="/resources" className="hover:text-icecap-gold transition-colors">Resource Center</a></li>
              <li><a href="/apply" className="hover:text-icecap-gold transition-colors">Get Pre-Qualified</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-icecap-white text-sm font-semibold mb-3">Partners</h4>
            <ul className="space-y-2 text-icecap-muted text-sm">
              <li><a href="/login" className="hover:text-icecap-gold transition-colors">Broker Login</a></li>
              <li><a href="/register" className="hover:text-icecap-gold transition-colors">Partner With Us</a></li>
              <li><a href="/dashboard/submit" className="hover:text-icecap-gold transition-colors">Submit a File</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-icecap-steel flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-icecap-muted text-xs">
            © {new Date().getFullYear()} Kaye Network. All rights reserved.
          </p>
          <p className="text-icecap-muted text-xs italic">
            &ldquo;Your Partner in Capital&rdquo;
          </p>
        </div>
      </footer>
    </>
  )
}
