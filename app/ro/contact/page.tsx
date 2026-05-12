import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RomanianContactForm from "@/components/RomanianContactForm";

export const metadata: Metadata = {
  title: "Contact — Disponibilitate, comenzi speciale și colaborări B2B",
  description:
    "Contactează LIGNORAE Atelier din München pentru disponibilitate, comenzi speciale, colecționari, colaborări retail sau conversații B2B.",
  alternates: {
    canonical: "/ro/contact",
    languages: {
      en: "/contact",
      de: "/de/contact",
      ro: "/ro/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: "Contact LIGNORAE Atelier",
    description:
      "Disponibilitate, comenzi speciale, solicitări private, colaborări retail și conversații B2B cu LIGNORAE Atelier din München.",
    url: "/ro/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact LIGNORAE Atelier din München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LIGNORAE Atelier",
    description:
      "Disponibilitate, comenzi speciale, solicitări private, colaborări retail și conversații B2B cu LIGNORAE Atelier din München.",
    images: ["/og-image.jpg"],
  },
};

export default function RomanianContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Contact
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Începe o conversație.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            Pentru disponibilitate, comenzi speciale, colecționari, colaborări
            sau discuții retail/B2B, contactează atelierul direct. Fiecare
            solicitare este citită personal.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] flex-1 gap-10 px-9 pb-28 md:grid-cols-[1.1fr_0.9fr]">
        <RomanianContactForm />

        <aside className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
              E-mail direct
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
              München, Germania
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Obiecte în număr redus
            </p>
            <p className="text-base font-normal leading-8 text-black/95">
              Stilourile LIGNORAE sunt finisate în serii mici. Detaliile despre
              material, disponibilitate, preț, livrare și eventuale comenzi
              speciale sunt discutate înaintea confirmării oricărei comenzi.
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