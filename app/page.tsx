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
        <div className="relative mx-auto flex min-h-[calc(100svh-160px)] w-full max-w-[1500px] flex-col items-center justify-center gap-8 overflow-hidden bg-[#f7f5f0] px-6 py-16 md:h-[calc(100svh-160px)] md:min-h-[620px] md:px-0 md:py-0">
          <div className="relative h-[40vh] min-h-[240px] w-full max-w-[920px] overflow-hidden md:absolute md:inset-0 md:h-auto md:max-w-none md:min-h-0">
            <Image
              src="/gallery_landing.jpg"
              alt="LIGNORAE The First One Hundred founding edition"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1500px"
              className="object-contain object-center"
            />
          </div>

          <div className="relative z-10 flex max-w-[760px] flex-col items-center gap-5 text-center md:absolute md:inset-x-0 md:bottom-12 md:mx-auto md:max-w-[1500px] md:px-6">
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/95">
              Founding edition
            </p>

            <h1 className="max-w-5xl text-4xl font-light leading-[0.92] tracking-[-0.06em] text-black sm:text-5xl md:text-8xl">
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
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 text-[10px] uppercase tracking-[0.28em] text-black/95 md:px-9 md:tracking-[0.42em]">
            <p>Founding Edition.</p>

            <div className="flex items-center gap-4 md:gap-9">
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
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/55 text-[11px] text-black/95 transition hover:border-black hover:text-black"
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
