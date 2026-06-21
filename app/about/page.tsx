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
    alt: "Daniel working at the lathe inside the LIGNORAE atelier",
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
];

function ImageFrame({
  src,
  alt,
  priority = false,
  hero = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  hero?: boolean;
}) {
  return (
    <div className="flex items-center justify-center bg-[#eeeae2] p-6 md:p-10">
      <div
        className={`relative w-full overflow-hidden ${
          hero
            ? "aspect-[5/4] max-w-[620px]"
            : "aspect-[4/3] max-w-[520px]"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 620px"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="border-b border-black/10 pt-20">
        <div className="mx-auto grid max-w-[1320px] md:grid-cols-[0.42fr_0.58fr]">
          <div className="flex min-h-[500px] items-center px-6 py-20 md:px-10 lg:px-12">
            <div className="max-w-[440px]">
              <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
                About the atelier
              </p>

              <h1 className="text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-6xl">
                A small Munich atelier dedicated to writing objects.
              </h1>

              <div className="mt-9 h-px w-14 bg-black/80" />

              <p className="mt-9 text-sm font-normal leading-7 text-black/95 md:text-base md:leading-8">
                Founded in Munich in 2026, LIGNORAE was created around a simple
                idea: that writing by hand remains one of the few elegant forms
                of resistance against an increasingly accelerated world.
              </p>
            </div>
          </div>

          <ImageFrame
            src="/about-hero.jpg"
            alt="LIGNORAE writing object in an editorial atelier setting"
            priority
            hero
          />
        </div>
      </section>

      {editorialSections.map((section, index) => (
        <section
          key={section.title}
          className="border-b border-black/10 bg-[#f7f5f0]"
        >
          <div
            className={`mx-auto grid max-w-[1320px] md:grid-cols-2 ${
              index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <ImageFrame src={section.image} alt={section.alt} />

            <div className="flex min-h-[460px] items-center px-6 py-18 md:px-10 lg:px-12">
              <div className="max-w-[520px]">
                <p className="mb-7 text-[11px] uppercase tracking-[0.48em] text-black/95">
                  {section.eyebrow}
                </p>

                <h2 className="text-4xl font-light leading-[0.95] tracking-[-0.05em] text-black md:text-5xl">
                  {section.title}
                </h2>

                <div className="mt-7 h-px w-12 bg-black/75" />

                <div className="mt-8 space-y-5 text-sm font-normal leading-7 text-black/95 md:text-base md:leading-8">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-black/10 bg-[#fbfaf7] px-6 py-24 md:px-9 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
            An atelier, not a factory
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] text-black md:text-6xl">
            Growth is not the objective.
          </h2>

          <div className="mx-auto mt-10 h-px w-14 bg-black/75" />

          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-base font-normal leading-8 text-black/95 md:text-lg md:leading-9">
            <p>
              LIGNORAE will remain an atelier. Production is intentionally
              limited and will never be expanded beyond approximately sixty
              pieces per month, regardless of demand.
            </p>

            <p>
              The aim is not industrial growth, but the preservation of
              attention, craftsmanship and individuality.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
