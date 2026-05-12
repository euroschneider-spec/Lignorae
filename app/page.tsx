import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "LIGNORAE — Sculptural Fountain Pens Handcrafted in Munich",
  description:
    "LIGNORAE creates sculptural fountain pens and objects of writing in Munich, shaped from wood, fire and form for collectors and quiet luxury interiors.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de",
      ro: "/ro",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "LIGNORAE — Sculptural Fountain Pens Handcrafted in Munich",
    description:
      "Sculptural fountain pens and objects of writing, handcrafted in Munich from wood, fire and form.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE sculptural fountain pen in a gallery-like presentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGNORAE — Sculptural Fountain Pens Handcrafted in Munich",
    description:
      "Sculptural fountain pens and objects of writing, handcrafted in Munich from wood, fire and form.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="relative min-h-[100svh] overflow-hidden pt-20">
        <div className="relative mx-auto flex h-[calc(100svh-160px)] min-h-[360px] w-full max-w-[1500px] items-center justify-center overflow-hidden bg-[#f7f5f0] md:min-h-[560px]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE sculptural fountain pen and cocoon presentation form in a white gallery space"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-contain object-center px-4 md:px-0"
          />

          <Link
            href="/collections"
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 border border-black/35 bg-[#f7f5f0]/85 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-black/95 backdrop-blur-xl transition hover:border-black hover:text-black md:bottom-10"
          >
            Explore collections
          </Link>
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-black/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 text-[10px] uppercase tracking-[0.36em] text-black/95 md:px-9 md:tracking-[0.42em]">
            <p>Objects of Writing.</p>

            <div className="flex items-center gap-5 md:gap-9">
              <div className="flex items-center gap-3 text-black/95">
                <Link href="/" className="transition hover:text-black">
                  EN
                </Link>
                <span>/</span>
                <Link href="/de" className="transition hover:text-black">
                  DE
                </Link>
                <span>/</span>
                <Link href="/ro" className="transition hover:text-black">
                  RO
                </Link>
              </div>

              <Link href="/legal-notice" className="hidden transition hover:text-black md:inline">
                Legal
              </Link>
              <Link href="/privacy-policy" className="hidden transition hover:text-black md:inline">
                Privacy
              </Link>
              <Link href="/contact" className="hidden transition hover:text-black md:inline">
                Contact
              </Link>
              <Link
                href="/collections"
                aria-label="Explore collections"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/55 text-[11px] text-black/95 transition hover:border-black hover:text-black"
              >
                +
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
