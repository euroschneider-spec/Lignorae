import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About the Atelier — LIGNORAE",
  description:
    "LIGNORAE is a small Munich atelier dedicated to handcrafted writing objects, registered editions and sculptural wooden presentation forms.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      de: "/de/about",
      ro: "/ro/about",
      "x-default": "/about",
    },
  },
};

const editorialSections = [
  {
    eyebrow: "Founder",
    title: "Daniel",
    image: "/about-lathe.jpg",
    alt: "Wood being shaped at the lathe inside the LIGNORAE atelier",
    body: [
      "Before founding LIGNORAE, Daniel spent fifteen years leading logistics operations, including seven years in site management. The profession demanded structure, discipline and constant movement.",
      "LIGNORAE emerged as a deliberate counterbalance. A return to slower work, enduring materials and the simple act of writing by hand.",
      "For Daniel, LIGNORAE represents the result of a lifetime of experiences expressed through the elegance of wood, the precision of a gold nib and the fluidity of ink.",
    ],
  },
  {
    eyebrow: "Craftsmanship",
    title: "Material, patience and precision.",
    image: "/about-craft.jpg",
    alt: "Handcrafted wooden writing objects in the LIGNORAE atelier",
    body: [
      "Alongside the atelier works a master craftsman with more than two decades of woodworking experience. His patience at the lathe and his sensitivity to material remain an essential part of how each object takes shape.",
      "Every writing object is individually finished, inspected and registered. Attention is intentionally directed toward small numbers rather than industrial scale.",
      "The objective is not volume. The objective is care.",
    ],
  },
  {
    eyebrow: "Registration & archive",
    title: "Every object has a history.",
    image: "/about-archive.jpg",
    alt: "LIGNORAE archive documentation and writing object",
    body: [
      "Each piece is individually registered within the atelier archive. Materials, technical specifications, production records and identifying details are preserved as part of the object's permanent history.",
      "This archive forms the foundation of The First One Hundred, the founding edition of the atelier and the beginning of the LIGNORAE registry.",
    ],
  },
  {
    eyebrow: "The Cocoon Box",
    title: "More than packaging.",
    image: "/about-cocoon.jpg",
    alt: "LIGNORAE Cocoon Box with writing object",
    body: [
      "The Cocoon Box is conceived as an extension of the writing object itself. Rather than serving as packaging, it forms part of the complete presentation and ownership experience.",
      "Each box is designed to belong to the object it accompanies, creating a lasting relationship between instrument, material and archive.",
    ],
  },
  {
    eyebrow: "An atelier, not a factory",
    title: "Growth is not the objective.",
    image: "/about-atelier.jpg",
    alt: "The LIGNORAE atelier in Munich",
    body: [
      "LIGNORAE will remain an atelier. Production is intentionally limited and will never be expanded beyond approximately sixty pieces per month, regardless of demand.",
      "The aim is not industrial growth, but the preservation of attention, craftsmanship and individuality.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="border-b border-black/10 pt-20">
        <div className="grid min-h-[calc(100svh-80px)] md:grid-cols-2">
          <div className="flex items-center px-9 py-24 md:px-14 lg:px-20">
            <div className="max-w-2xl">
              <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
                About the atelier
              </p>

              <h1 className="text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
                A small Munich atelier dedicated to writing objects.
              </h1>

              <div className="mt-10 h-px w-14 bg-black/80" />

              <p className="mt-10 max-w-xl text-base font-normal leading-8 text-black/95 md:text-lg">
                Founded in Munich in 2026, LIGNORAE was created around a simple
                idea: that writing by hand remains one of the few elegant forms
                of resistance against an increasingly accelerated world.
              </p>
            </div>
          </div>

          <div className="relative min-h-[520px] border-t border-black/10 md:min-h-full md:border-l md:border-t-0">
            <Image
              src="/about-hero.jpg"
              alt="LIGNORAE writing object in an editorial atelier setting"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {editorialSections.map((section, index) => (
        <section
          key={section.title}
          className="border-b border-black/10 bg-[#f7f5f0]"
        >
          <div
            className={`grid md:grid-cols-2 ${
              index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="flex min-h-[420px] items-center justify-center bg-[#eeeae2] p-8 md:min-h-[560px] md:p-12">
              <div className="relative aspect-[4/3] w-full max-w-[720px] overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center"
                />
              </div>
            </div>

            <div className="flex items-center border-black/10 px-9 py-20 md:px-14 lg:px-20">
              <div className="max-w-2xl">
                <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
                  {section.eyebrow}
                </p>

                <h2 className="max-w-xl text-4xl font-light leading-[0.95] tracking-[-0.05em] text-black md:text-6xl">
                  {section.title}
                </h2>

                <div className="mt-8 h-px w-12 bg-black/75" />

                <div className="mt-9 space-y-6 text-sm font-normal leading-7 text-black/95 md:text-base md:leading-8">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
