import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "The First One Hundred — LIGNORAE",
  description:
    "The founding LIGNORAE edition: one hundred individually registered writing instruments handcrafted in Munich.",
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
    title: "The First One Hundred — LIGNORAE",
    description:
      "One hundred individually registered writing instruments created to establish the foundation of the atelier.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE The First One Hundred founding edition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The First One Hundred — LIGNORAE",
    description:
      "One hundred individually registered writing instruments created to establish the foundation of the atelier.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="relative min-h-[100svh] overflow-hidden pt-20">
        <div className="relative mx-auto flex h-[calc(100svh-160px)] min-h-[420px] w-full max-w-[1500px] items-center justify-center overflow-hidden bg-[#f7f5f0] md:min-h-[620px]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE The First One Hundred founding edition"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-contain object-center px-4 md:px-0"
          />

          <div className="absolute inset-x-0 bottom-10 z-10 mx-auto flex max-w-[1500px] flex-col items-center gap-5 px-6 text-center md:bottom-12">
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/95">
              Founding edition
            </p>

            <h1 className="max-w-5xl text-5xl font-light leading-[0.9] tracking-[-0.06em] text-black md:text-8xl">
              The First One Hundred.
            </h1>

            <p className="max-w-2xl text-sm font-normal leading-7 text-black/95 md:text-base">
              One hundred individually registered writing instruments created to
              establish the foundation of the atelier.
            </p>

            <Link
              href="/collections"
              className="border border-black/35 bg-[#f7f5f0]/90 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-black/95 backdrop-blur-xl transition hover:border-black hover:text-black"
            >
              Explore the edition
            </Link>
          </div>
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-black/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 text-[10px] uppercase tracking-[0.36em] text-black/95 md:px-9 md:tracking-[0.42em]">
            <p>Founding Edition.</p>

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

              <Link
                href="/legal-notice"
                className="hidden transition hover:text-black md:inline"
              >
                Legal
              </Link>
              <Link
                href="/privacy-policy"
                className="hidden transition hover:text-black md:inline"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="hidden transition hover:text-black md:inline"
              >
                Contact
              </Link>
              <Link
                href="/collections"
                aria-label="Explore The First One Hundred"
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
