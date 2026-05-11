

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isGerman = pathname.startsWith("/de");
  const isRomanian = pathname.startsWith("/ro");
  const prefix = isGerman ? "/de" : isRomanian ? "/ro" : "";

  const basePath = pathname.replace(/^\/(de|ro)(?=\/|$)/, "") || "/";

  function languageHref(language: "en" | "de" | "ro") {
    if (language === "en") return basePath;
    return `/${language}${basePath === "/" ? "" : basePath}`;
  }

  function setLanguageCookie(language: "en" | "de" | "ro") {
    document.cookie = `lignorae-language=${language}; path=/; max-age=31536000`;
  }

  const text = isGerman
    ? {
        statement:
          "Skulpturale Füllfederhalter aus München, geformt aus Holz, Feuer und reduzierter Präsenz.",
        explore: "Explore",
        forma: "Forma",
        origins: "Origins",
        natura: "Natura",
        about: "Über",
        journal: "Journal",
        contact: "Kontakt",
        legal: "Legal",
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
            "Stilouri realizate în München din lemn, foc și prezență redusă la esență.",
          explore: "Explorează",
          forma: "Forma",
          origins: "Origins",
          natura: "Natura",
          about: "Despre",
          journal: "Jurnal",
          contact: "Contact",
          legal: "Legal",
          legalNotice: "Date legale",
          privacy: "Confidențialitate",
          terms: "Termeni",
          withdrawal: "Retragere",
          shipping: "Livrare",
          rights: "Toate drepturile rezervate.",
        }
      : {
          statement:
            "Sculptural fountain pens, shaped in Munich from wood, fire and quiet proportion.",
          explore: "Explore",
          forma: "Forma",
          origins: "Origins",
          natura: "Natura",
          about: "About",
          journal: "Journal",
          contact: "Contact",
          legal: "Legal",
          legalNotice: "Legal Notice",
          privacy: "Privacy",
          terms: "Terms",
          withdrawal: "Withdrawal",
          shipping: "Shipping",
          rights: "All rights reserved.",
        };

  return (
    <footer className="mt-auto border-t border-black/10 bg-[#f7f5f0] px-9 py-12 text-black/70">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="mb-5 text-[13px] font-light uppercase tracking-[0.55em] text-black/88">
            LIGNORAE
          </p>

          <p className="max-w-md text-sm font-light leading-7 text-black/70">
            {text.statement}
          </p>
        </div>

        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-black/60">
            {text.explore}
          </p>

          <nav className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.32em] text-black/70">
            <Link href={`${prefix}/collections/forma`} className="transition hover:text-black">
              {text.forma}
            </Link>
            <Link href={`${prefix}/collections/origins`} className="transition hover:text-black">
              {text.origins}
            </Link>
            <Link href={`${prefix}/collections/natura`} className="transition hover:text-black">
              {text.natura}
            </Link>
            <Link href={`${prefix}/about`} className="transition hover:text-black">
              {text.about}
            </Link>
            <Link href={`${prefix}/journal`} className="transition hover:text-black">
              {text.journal}
            </Link>
            <Link href={`${prefix}/contact`} className="transition hover:text-black">
              {text.contact}
            </Link>
          </nav>
        </div>

        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-black/60">
            {text.legal}
          </p>

          <nav className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.32em] text-black/70">
            <Link href={`${prefix}/legal-notice`} className="transition hover:text-black">
              {text.legalNotice}
            </Link>
            <Link href={`${prefix}/privacy-policy`} className="transition hover:text-black">
              {text.privacy}
            </Link>
            <Link href={`${prefix}/terms`} className="transition hover:text-black">
              {text.terms}
            </Link>
            <Link href={`${prefix}/withdrawal`} className="transition hover:text-black">
              {text.withdrawal}
            </Link>
            <Link href={`${prefix}/shipping`} className="transition hover:text-black">
              {text.shipping}
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1500px] flex-col gap-6 border-t border-black/10 pt-7 text-[10px] uppercase tracking-[0.32em] text-black/65 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} LIGNORAE. {text.rights}
        </p>

        <div className="flex gap-5">
          <Link
            href={languageHref("en")}
            onClick={() => setLanguageCookie("en")}
            className={!isGerman && !isRomanian ? "text-black" : "transition hover:text-black"}
          >
            EN
          </Link>
          <Link
            href={languageHref("de")}
            onClick={() => setLanguageCookie("de")}
            className={isGerman ? "text-black" : "transition hover:text-black"}
          >
            DE
          </Link>
          <Link
            href={languageHref("ro")}
            onClick={() => setLanguageCookie("ro")}
            className={isRomanian ? "text-black" : "transition hover:text-black"}
          >
            RO
          </Link>
        </div>
      </div>
    </footer>
  );
}