import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LIGNORAE — Skulpturale Füllfederhalter aus München",
  description:
    "LIGNORAE fertigt skulpturale Füllfederhalter und Schreibobjekte in München, geprägt von Holz, Feuer, Form und ruhiger Handwerkskunst.",
  alternates: {
    canonical: "/de",
    languages: {
      en: "/",
      de: "/de",
      ro: "/ro",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "LIGNORAE — Skulpturale Füllfederhalter aus München",
    description:
      "Füllfederhalter aus Holz, Feuer und Form, handgefertigt im Münchner Atelier.",
    url: "/de",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE skulpturaler Füllfederhalter in einer galerieartigen Präsentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIGNORAE — Skulpturale Füllfederhalter aus München",
    description:
      "Füllfederhalter aus Holz, Feuer und Form, handgefertigt im Münchner Atelier.",
    images: ["/og-image.jpg"],
  },
};

export default function GermanHomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="relative min-h-[100svh] overflow-hidden pt-20">
        <div className="relative mx-auto flex h-[calc(100svh-160px)] min-h-[360px] w-full max-w-[1500px] items-center justify-center overflow-hidden bg-[#f7f5f0] md:min-h-[560px]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE Schreibobjekt und Cocoon-Präsentationsform in einem weißen Galerieraum"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-contain object-center px-4 md:px-0"
          />

          <Link
            href="/de/collections"
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 border border-black/35 bg-[#f7f5f0]/85 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-black/95 backdrop-blur-xl transition hover:border-black hover:text-black md:bottom-10"
          >
            Kollektionen erkunden
          </Link>
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-black/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 md:px-9">
            <p className="text-[10px] uppercase tracking-[0.34em] text-black/95 md:text-[11px] md:tracking-[0.48em]">
              Objects of writing
            </p>

            <div className="flex items-center gap-7 text-[10px] uppercase tracking-[0.32em] text-black/95 md:gap-10 md:tracking-[0.42em]">
              <Link href="/de/legal-notice" className="hidden transition hover:text-black md:inline">
                Impressum
              </Link>
              <Link href="/de/privacy-policy" className="hidden transition hover:text-black md:inline">
                Datenschutz
              </Link>
              <Link href="/de/shipping" className="hidden transition hover:text-black md:inline">
                Versand
              </Link>
              <Link
                href="/de/collections"
                aria-label="Kollektionen erkunden"
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