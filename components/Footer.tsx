import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#4a3522]/70 bg-[#120d09] px-6 py-10 text-[#b8b2a8] md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
        <div>
          <p className="mb-3 text-lg font-light tracking-[0.35em] text-[#f5f1e8] md:mb-4 md:text-xl">
            LIGNORAE
          </p>

          <p className="max-w-sm text-sm leading-relaxed text-[#b8b2a8] md:text-base">
            Handcrafted fountain pens made in Munich from carefully selected
            woods, shaped slowly and finished by hand.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c6a66a] md:mb-4 md:text-sm">
            Explore
          </p>

          <nav className="flex flex-col gap-2 md:gap-3">
            <Link href="/collections" className="transition hover:text-[#c6a66a]">
              Collections
            </Link>
            <Link href="/atelier" className="transition hover:text-[#c6a66a]">
              Atelier
            </Link>
            <Link href="/journal" className="transition hover:text-[#c6a66a]">
              Journal
            </Link>
            <Link href="/contact" className="transition hover:text-[#c6a66a]">
              Contact
            </Link>
          </nav>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c6a66a] md:mb-4 md:text-sm">
            Legal
          </p>

          <nav className="flex flex-col gap-2 md:gap-3">
            <Link href="/legal-notice" className="transition hover:text-[#c6a66a]">
              Legal Notice
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-[#c6a66a]">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-[#c6a66a]"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/withdrawal"
              className="transition hover:text-[#c6a66a]"
            >
              Right of Withdrawal
            </Link>
            <Link href="/shipping" className="transition hover:text-[#c6a66a]">
              Shipping
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-[#4a3522]/70 pt-6 text-xs md:mt-12 md:flex-row md:items-center md:justify-between md:text-sm">
        <p>© {new Date().getFullYear()} LIGNORAE Atelier. All rights reserved.</p>

        <div className="flex gap-4 text-xs uppercase tracking-[0.25em]">
          <span className="text-[#c6a66a]">EN</span>
          <span className="text-[#6f6558]">DE</span>
          <span className="text-[#6f6558]">RO</span>
        </div>
      </div>
    </footer>
  );
}