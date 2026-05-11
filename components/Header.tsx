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
        collections: "Collections",
        about: "Über",
        journal: "Journal",
        contact: "Kontakt",
      }
    : isRomanian
      ? {
          collections: "Collections",
          about: "Despre",
          journal: "Jurnal",
          contact: "Contact",
        }
      : {
          collections: "Collections",
          about: "About",
          journal: "Journal",
          contact: "Contact",
        };

  const links = [
    { href: `${prefix}/collections`, label: labels.collections },
    { href: `${prefix}/about`, label: labels.about },
    { href: `${prefix}/journal`, label: labels.journal },
    { href: `${prefix}/contact`, label: labels.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 md:px-9">
        <Link href={`${prefix}/`} className="group flex items-center gap-5">
          <Image
            src="/logo.png"
            alt="LIGNORAE logo"
            width={28}
            height={56}
            className="h-11 w-auto object-contain opacity-90 transition group-hover:opacity-100 md:h-14"
            priority
          />

          <span className="text-[12px] font-light uppercase tracking-[0.42em] text-black/88 md:text-[13px] md:tracking-[0.55em]">
            LIGNORAE
          </span>
        </Link>

        <nav className="hidden items-center gap-12 text-[10px] uppercase tracking-[0.42em] text-black/58 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-black">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black/70 transition hover:border-black hover:text-black md:hidden"
          aria-label="Open menu"
        >
          <span className="text-xl leading-none">{menuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-black/10 bg-[#f7f5f0]/97 transition-all duration-500 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-7 md:px-9">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 text-[11px] uppercase tracking-[0.35em] text-black/58">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
