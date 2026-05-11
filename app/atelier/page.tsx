

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const principles = [
  {
    label: "01",
    title: "Material",
    text: "Wood is not treated as decoration. It is the starting point: grain, density, resistance, burn, surface and memory.",
  },
  {
    label: "02",
    title: "Form",
    text: "Every object is reduced until only proportion remains: a line for writing, a volume for presence, a quiet silhouette.",
  },
  {
    label: "03",
    title: "Finish",
    text: "Surfaces are shaped slowly, tested repeatedly and finished for touch rather than theatrical shine.",
  },
];

export default function AtelierPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/40">
              About the atelier
            </p>
            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              A quiet workshop for objects of writing.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/55 md:text-lg">
            LIGNORAE is a Munich atelier dedicated to sculptural fountain pens
            and presentation forms. The work sits between craft, design object
            and writing instrument: precise enough to function, quiet enough to
            be present.
          </p>
        </div>

        <div className="relative mt-24 aspect-[16/9] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE gallery object"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover object-center"
          />
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/40">
              Method
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              The process is slow because the object is small.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.label} className="border-l border-black/15 pl-7">
                <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/35">
                  {principle.label}
                </p>
                <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">
                  {principle.title}
                </h3>
                <p className="text-sm font-light leading-7 text-black/55">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-14 px-9 py-28 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/40">
            Munich
          </p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            Made in small numbers, without pretending to be industrial.
          </h2>
        </div>

        <p className="max-w-2xl text-base font-light leading-8 text-black/55 md:text-lg">
          Each piece begins as material on the bench and is shaped through a
          sequence of decisions: cut, turn, burn, sand, seal, assemble, test.
          The result is not a mass product. It is an object made slowly enough
          that its proportions can be corrected by hand.
        </p>
      </section>

      <Footer />
    </main>
  );
}