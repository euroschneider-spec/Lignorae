"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isGerman = pathname.startsWith("/de");
  const isRomanian = pathname.startsWith("/ro");
  const prefix = isGerman ? "/de" : isRomanian ? "/ro" : "";

  const text = isGerman
    ? {
        statement:
          "Handgefertigte Füllfederhalter aus München, gefertigt aus sorgfältig ausgewählten Hölzern, langsam geformt und von Hand veredelt.",
        explore: "Entdecken",
        collections: "Kollektionen",
        atelier: "Atelier",
        journal: "Journal",
        contact: "Kontakt",
        legal: "Rechtliches",
        legalNotice: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB",
        withdrawal: "Widerruf",
        shipping: "Versand",
        rights: "Alle Rechte vorbehalten.",
      }
    : isRomanian
    ? {
        statement:
          "Stilouri realizate manual în München din lemn atent selecționat, formate încet și finisate cu grijă.",
        explore: "Explorează",
        collections: "Colecții",
        atelier: "Atelier",
        journal: "Jurnal",
        contact: "Contact",
        legal: "Legal",
        legalNotice: "Date legale",
        privacy: "Politica de confidențialitate",
        terms: "Termeni și condiții",
        withdrawal: "Drept de retragere",
        shipping: "Livrare",
        rights: "Toate drepturile rezervate.",
      }
    : {
        statement:
          "Handcrafted fountain pens made in Munich from carefully selected woods, shaped slowly and finished by hand.",
        explore: "Explore",
        collections: "Collections",
        atelier: "Atelier",
        journal: "Journal",
        contact: "Contact",
        legal: "Legal",
        legalNotice: "Legal Notice",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        withdrawal: "Right of Withdrawal",
        shipping: "Shipping",
        rights: "All rights reserved.",
      };

  return (
    <footer className="border-t border-[#4a3522]/70 bg-[#120d09] px-6 py-10 text-[#b8b2a8] md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
        <div>
          <p className="mb-3 text-lg font-light tracking-[0.35em] text-[#f5f1e8] md:mb-4 md:text-xl">
            LIGNORAE
          </p>

          <p className="max-w-sm text-sm leading-relaxed text-[#b8b2a8] md:text-base">
            {text.statement}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c6a66a] md:mb-4 md:text-sm">
            {text.explore}
          </p>

          <nav className="flex flex-col gap-2 md:gap-3">
            <Link href={`${prefix}/collections`} className="transition hover:text-[#c6a66a]">
              {text.collections}
            </Link>
            <Link href={`${prefix}/atelier`} className="transition hover:text-[#c6a66a]">
              {text.atelier}
            </Link>
            <Link href={`${prefix}/journal`} className="transition hover:text-[#c6a66a]">
              {text.journal}
            </Link>
            <Link href={`${prefix}/contact`} className="transition hover:text-[#c6a66a]">
              {text.contact}
            </Link>
          </nav>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c6a66a] md:mb-4 md:text-sm">
            {text.legal}
          </p>

          <nav className="flex flex-col gap-2 md:gap-3">
            <Link href={`${prefix}/legal-notice`} className="transition hover:text-[#c6a66a]">
              {text.legalNotice}
            </Link>
            <Link href={`${prefix}/privacy-policy`} className="transition hover:text-[#c6a66a]">
              {text.privacy}
            </Link>
            <Link href={`${prefix}/terms`} className="transition hover:text-[#c6a66a]">
              {text.terms}
            </Link>
            <Link href={`${prefix}/withdrawal`} className="transition hover:text-[#c6a66a]">
              {text.withdrawal}
            </Link>
            <Link href={`${prefix}/shipping`} className="transition hover:text-[#c6a66a]">
              {text.shipping}
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-[#4a3522]/70 pt-6 text-xs md:mt-12 md:flex-row md:items-center md:justify-between md:text-sm">
        <p>
          © {new Date().getFullYear()} LIGNORAE Atelier. {text.rights}
        </p>

        <div className="flex gap-4 text-xs uppercase tracking-[0.25em]">
          <Link href="/" className={!isGerman && !isRomanian ? "text-[#c6a66a]" : "text-[#6f6558] hover:text-[#c6a66a]"}>
            EN
          </Link>
          <Link href="/de" className={isGerman ? "text-[#c6a66a]" : "text-[#6f6558] hover:text-[#c6a66a]"}>
            DE
          </Link>
          <Link href="/ro" className={isRomanian ? "text-[#c6a66a]" : "text-[#6f6558] hover:text-[#c6a66a]"}>
            RO
          </Link>
        </div>
      </div>
    </footer>
  );
}