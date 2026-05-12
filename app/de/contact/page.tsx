import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GermanContactForm from "@/components/GermanContactForm";

export const metadata: Metadata = {
  title: "Kontakt — Verfügbarkeit, Einzelanfertigungen und B2B-Anfragen",
  description:
    "Kontaktieren Sie LIGNORAE Atelier in München für Verfügbarkeit, Einzelanfertigungen, Sammleranfragen, Kooperationen und Retail- oder B2B-Gespräche.",
  alternates: {
    canonical: "/de/contact",
    languages: {
      en: "/contact",
      de: "/de/contact",
      ro: "/ro/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: "Kontakt LIGNORAE Atelier",
    description:
      "Verfügbarkeit, Einzelanfertigungen, Sammleranfragen, Kooperationen und Retail- oder B2B-Gespräche mit LIGNORAE Atelier in München.",
    url: "/de/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kontakt LIGNORAE Atelier in München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt LIGNORAE Atelier",
    description:
      "Verfügbarkeit, Einzelanfertigungen, Sammleranfragen, Kooperationen und Retail- oder B2B-Gespräche mit LIGNORAE Atelier in München.",
    images: ["/og-image.jpg"],
  },
};

export default function GermanContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Kontakt
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Beginnen Sie ein Gespräch.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            Für Verfügbarkeit, Einzelanfertigungen, Sammleranfragen,
            Kooperationen oder Retail/B2B-Gespräche kontaktieren Sie das Atelier
            direkt. Jede Anfrage wird persönlich gelesen.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] flex-1 gap-10 px-9 pb-28 md:grid-cols-[1.1fr_0.9fr]">
        <GermanContactForm />

        <aside className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Direkte E-Mail
            </p>
            <a
              href="mailto:info@lignorae.com"
              className="text-3xl font-light tracking-[-0.04em] text-black/95 transition hover:text-black"
            >
              info@lignorae.com
            </a>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Atelier
            </p>
            <p className="text-base font-normal leading-8 text-black/95">
              LIGNORAE Atelier
              <br />
              München, Deutschland
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Objekte in kleinen Serien
            </p>
            <p className="text-base font-normal leading-8 text-black/95">
              LIGNORAE Füllfederhalter entstehen in kleinen Serien. Details zu
              Material, Verfügbarkeit, Preis, Lieferung und möglichen
              Einzelanfertigungen werden vor jeder Auftragsbestätigung
              besprochen.
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Instagram
            </p>
            <a
              href="https://www.instagram.com/lignorae/"
              target="_blank"
              rel="noreferrer"
              className="text-base font-normal leading-8 text-black/95 transition hover:text-black"
            >
              @Lignorae
            </a>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}