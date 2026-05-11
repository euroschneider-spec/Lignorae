

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              About LIGNORAE
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              A Munich atelier for sculptural fountain pens.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
            LIGNORAE is built around a simple idea: a fountain pen can be
            more than a tool, but it does not need to become loud. It can carry
            presence through material, proportion and restraint.
          </p>
        </div>

        <div className="group relative mt-24 aspect-[16/9] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE sculptural writing object in a gallery space"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Philosophy
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Quiet form. Natural material. Precise restraint.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.label} className="border-l border-black/20 pl-7">
                <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/55">
                  {principle.label}
                </p>
                <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">
                  {principle.title}
                </h3>
                <p className="text-sm font-light leading-7 text-black/70">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-16 px-9 py-28 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
            The atelier
          </p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            The work begins at the bench, not in a catalogue.
          </h2>
        </div>

        <div className="space-y-7 text-base font-light leading-8 text-black/70 md:text-lg">
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
          <div className="group relative aspect-[4/5] overflow-hidden bg-[#eeeae2]">
            <Image
              src="/natura.jpg"
              alt="LIGNORAE material study"
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
            />
          </div>

          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              People
            </p>
            <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              A human-scale workshop, shaped by hands and decisions.
            </h2>
            <p className="mt-9 max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
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