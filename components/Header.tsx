"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isGerman = pathname.startsWith("/de");
  const isRomanian = pathname.startsWith("/ro");
  const prefix = isGerman ? "/de" : isRomanian ? "/ro" : "";

  const labels = isGerman
    ? {
        collections: "Kollektionen",
        atelier: "Atelier",
        journal: "Journal",
        contact: "Kontakt",
      }
    : isRomanian
    ? {
        collections: "Colecții",
        atelier: "Atelier",
        journal: "Jurnal",
        contact: "Contact",
      }
    : {
        collections: "Collections",
        atelier: "Atelier",
        journal: "Journal",
        contact: "Contact",
      };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#4a3522]/60 bg-[#0b0907]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`${prefix}/`} className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="LIGNORAE logo"
            width={56}
            height={56}
            className="h-14 w-auto invert opacity-90 transition duration-300 hover:opacity-100"
            priority
          />

          <span className="text-xl font-light tracking-[0.35em] text-[#f5f1e8]">
            LIGNORAE
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-[#d6d1c7] md:flex">
          <Link href={`${prefix}/collections`} className="transition hover:text-[#c6a66a]">
            {labels.collections}
          </Link>

          <Link href={`${prefix}/atelier`} className="transition hover:text-[#c6a66a]">
            {labels.atelier}
          </Link>

          <Link href={`${prefix}/journal`} className="transition hover:text-[#c6a66a]">
            {labels.journal}
          </Link>

          <Link href={`${prefix}/contact`} className="transition hover:text-[#c6a66a]">
            {labels.contact}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4a3522]/70 text-[#f5f1e8] transition hover:border-[#c6a66a] md:hidden"
          aria-label="Open menu"
        >
          <span className="text-xl leading-none">{menuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-[#4a3522]/60 bg-[#0b0907]/95 px-6 py-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm uppercase tracking-[0.25em] text-[#d6d1c7]">
            <Link href={`${prefix}/collections`} onClick={() => setMenuOpen(false)} className="transition hover:text-[#c6a66a]">
              {labels.collections}
            </Link>

            <Link href={`${prefix}/atelier`} onClick={() => setMenuOpen(false)} className="transition hover:text-[#c6a66a]">
              {labels.atelier}
            </Link>

            <Link href={`${prefix}/journal`} onClick={() => setMenuOpen(false)} className="transition hover:text-[#c6a66a]">
              {labels.journal}
            </Link>

            <Link href={`${prefix}/contact`} onClick={() => setMenuOpen(false)} className="transition hover:text-[#c6a66a]">
              {labels.contact}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}