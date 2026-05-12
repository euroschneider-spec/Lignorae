import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — A Munich Atelier for Sculptural Fountain Pens",
  description:
    "Learn about LIGNORAE, a Munich atelier creating sculptural fountain pens through wood, fire, material restraint and small-series craftsmanship.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      de: "/de/about",
      ro: "/ro/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "About LIGNORAE — A Munich Atelier for Sculptural Fountain Pens",
    description:
      "A small Munich atelier creating sculptural fountain pens through wood, fire, material restraint and small-series craftsmanship.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE atelier and sculptural fountain pen presentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About LIGNORAE — A Munich Atelier for Sculptural Fountain Pens",
    description:
      "A small Munich atelier creating sculptural fountain pens through wood, fire, material restraint and small-series craftsmanship.",
    images: ["/og-image.jpg"],
  },
};

const principles = [
  {
    label: "01",
    title: "Art, not accessories",
    text: "LIGNORAE treats the fountain pen as a small sculptural object: functional, tactile and visually quiet.",
  },
  {
    label: "02",
    title: "Small numbers",
    text: "Pieces are made slowly, in limited series, without pretending to be industrial or endlessly repeatable.",
  },
  {
    label: "03",
    title: "Material language",
    text: "Wood, fire, grain and proportion define the work more than ornament, excess or forced storytelling.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              About LIGNORAE
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              A Munich atelier for sculptural fountain pens.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            LIGNORAE is built around a simple idea: a fountain pen can be
            more than a tool, but it does not need to become loud. It can carry
            presence through material, proportion and restraint.
          </p>
        </div>

        <div className="group mx-auto mt-24 max-w-[1200px] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE sculptural writing object in a gallery space"
            width={1500}
            height={1000}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Philosophy
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Quiet form. Natural material. Precise restraint.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.label} className="border-l border-black/20 pl-7">
                <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
                  {principle.label}
                </p>
                <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">
                  {principle.title}
                </h3>
                <p className="text-sm font-normal leading-7 text-black/95">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-16 px-9 py-28 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
            The atelier
          </p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            The work begins at the bench, not in a catalogue.
          </h2>
        </div>

        <div className="space-y-7 text-base font-normal leading-8 text-black/95 md:text-lg">
          <p>
            The atelier is intentionally small. Each object passes through the
            same direct sequence: material selection, cutting, turning, surface
            treatment, finishing, assembly and testing.
          </p>
          <p>
            The aim is not to imitate mass production. The aim is to build a
            recognizable language of writing objects: tactile, disciplined and
            calm enough to belong on a desk, in a collection or inside its own
            cocoon presentation form.
          </p>
        </div>
      </section>

      <section className="border-t border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="group overflow-hidden bg-[#eeeae2]">
            <Image
              src="/natura.jpg"
              alt="LIGNORAE material study"
              width={900}
              height={700}
              sizes="(max-width: 768px) 100vw, 680px"
              className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
            />
          </div>

          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              People
            </p>
            <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              A human-scale workshop, shaped by hands and decisions.
            </h2>
            <p className="mt-9 max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
              Behind LIGNORAE is a small working team rather than an anonymous
              production line. The value of each piece comes from attention,
              repetition, correction and the willingness to let the material
              decide part of the final expression.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}