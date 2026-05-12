import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LIGNORAE - Stilouri sculpturale realizate în München",
  description:
    "LIGNORAE creează stilouri sculpturale și obiecte de scris în München, modelate din lemn, foc, formă și meșteșug discret.",
  alternates: {
    canonical: "/ro",
    languages: {
      en: "/",
      de: "/de",
      ro: "/ro",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "LIGNORAE — Stilouri sculpturale realizate în München",
    description:
      "Obiecte de scris din lemn, foc și formă, lucrate manual în atelierul din München.",
    url: "/ro",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stilou sculptural LIGNORAE într-o prezentare de galerie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGNORAE — Stilouri sculpturale realizate în München",
    description:
      "Stilouri din lemn, foc și formă, lucrate manual în atelierul din München.",
    images: ["/og-image.jpg"],
  },
};

export default function RomanianHomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="relative min-h-[100svh] overflow-hidden pt-20">
        <div className="relative mx-auto flex h-[calc(100svh-160px)] min-h-[360px] w-full max-w-[1500px] items-center justify-center overflow-hidden bg-[#f7f5f0] md:min-h-[560px]">
          <Image
            src="/gallery_landing.jpg"
            alt="Obiect de scris LIGNORAE și formă de prezentare cocoon într-un spațiu alb de galerie"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-contain object-center px-4 md:px-0"
          />

          <Link
            href="/ro/collections"
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 border border-black/35 bg-[#f7f5f0]/85 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-black/95 backdrop-blur-xl transition hover:border-black hover:text-black md:bottom-10"
          >
            Explorează colecțiile
          </Link>
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-black/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 md:px-9">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/95 md:text-[11px] md:tracking-[0.48em]">
              Objects of writing
            </p>

            <div className="flex items-center gap-7 text-[10px] uppercase tracking-[0.32em] text-black/95 md:gap-10 md:tracking-[0.42em]">
              <Link href="/ro/legal-notice" className="hidden transition hover:text-black md:inline">
                Impressum
              </Link>
              <Link href="/ro/privacy-policy" className="hidden transition hover:text-black md:inline">
                Datenschutz
              </Link>
              <Link href="/ro/shipping" className="hidden transition hover:text-black md:inline">
                Versand
              </Link>
              <Link
                href="/ro/collections"
                aria-label="Explorează colecțiile"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/55 text-[11px] text-black/95 transition hover:border-black hover:text-black"
              >
                +
              </Link>
            </div>
          </div>
        </footer>
      </section>

      <Footer />
    </main>
  );
}