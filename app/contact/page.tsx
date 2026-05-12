import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Availability, Commissions and B2B Enquiries",
  description:
    "Contact LIGNORAE Atelier in Munich for fountain pen availability, commissions, collector enquiries, collaborations and retail or B2B conversations.",
  alternates: {
    canonical: "/contact",
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
      "Availability, commissions, collector enquiries, collaborations and retail or B2B conversations with LIGNORAE Atelier in Munich.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact LIGNORAE Atelier in Munich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LIGNORAE Atelier",
    description:
      "Availability, commissions, collector enquiries, collaborations and retail or B2B conversations with LIGNORAE Atelier in Munich.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
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
              Begin a conversation.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            For availability, commissions, collectors, collaborations or retail
            conversations, contact the atelier directly. Each enquiry is handled
            personally.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] flex-1 gap-10 px-9 pb-28 md:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />

        <aside className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/95">
            Direct email
          </p>

          <a
            href="mailto:info@lignorae.com"
            className="text-2xl font-light tracking-[-0.03em] text-black transition hover:opacity-60 md:text-3xl"
          >
            info@lignorae.com
          </a>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Objects
            </p>

            <p className="text-base font-normal leading-8 text-black/95">
              LIGNORAE fountain pens are prepared in small series. Details on
              material, availability, pricing, delivery and possible commissions
              are discussed before any order is confirmed.
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Location
            </p>

            <p className="text-base font-normal leading-8 text-black/95">
              LIGNORAE Atelier
              <br />
              Munich, Germany
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/95">
              Instagram
            </p>

            <a
              href="https://www.instagram.com/lignorae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-light tracking-[-0.03em] text-black transition hover:opacity-60 md:text-3xl"
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