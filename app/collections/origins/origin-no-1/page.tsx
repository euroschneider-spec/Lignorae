import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function OriginNo1Page() {
  return (
    <main className="min-h-screen bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="relative flex min-h-screen items-center overflow-hidden border-b border-[#4a3522]/70 px-6 pt-28">
        <div className="absolute inset-0 bg-[url('/origin-no-1.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0907] via-[#0b0907]/90 to-[#0b0907]/40" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Link
              href="/collections/origin"
              className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] hover:text-[#f5f1e8]"
            >
              ← ORIGIN Collection
            </Link>

            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
              One-of-one instrument
            </p>

            <h1 className="mb-8 text-5xl font-light leading-tight md:text-7xl">
              ORIGIN No. 1
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-[#d6d1c7] md:text-xl">
              A handcrafted fountain pen shaped from richly figured wood,
              created as an early LIGNORAE study in balance, surface, warmth,
              and restraint.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.22em] text-[#c6a66a]">
              <Link
                href="/collections/origin"
                className="rounded-full border border-[#c6a66a]/50 px-4 py-2 transition duration-300 hover:border-[#c6a66a] hover:bg-[#21170f] hover:text-[#f5f1e8]"
              >
                ORIGIN
              </Link>
              <Link
                href="/collections/archive"
                className="rounded-full border border-[#c6a66a]/50 px-4 py-2 transition duration-300 hover:border-[#c6a66a] hover:bg-[#21170f] hover:text-[#f5f1e8]"
              >
                Archive Piece
              </Link>
              <Link
                href="/atelier"
                className="rounded-full border border-[#c6a66a]/50 px-4 py-2 transition duration-300 hover:border-[#c6a66a] hover:bg-[#21170f] hover:text-[#f5f1e8]"
              >
                Munich Atelier
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="group overflow-hidden rounded-[2rem] border border-[#c6a66a]/35 bg-[#21170f]/80 shadow-2xl transition duration-500 hover:border-[#c6a66a]/70 hover:shadow-[0_0_35px_rgba(198,166,106,0.18)]">
              <div className="aspect-[4/5] bg-[url('/origin-no-1.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      <FadeIn>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-28 md:grid-cols-[1fr_1fr]">
          <div className="group overflow-hidden rounded-3xl border border-[#c6a66a]/30 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/70 hover:shadow-[0_0_30px_rgba(198,166,106,0.14)]">
            <div className="aspect-[4/3] bg-[url('/origin-no-1.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
          </div>

          <div className="group overflow-hidden rounded-3xl border border-[#c6a66a]/30 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/70 hover:shadow-[0_0_30px_rgba(198,166,106,0.14)]">
            <div className="aspect-[4/3] bg-[url('/origin-no-01-detail.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
              The piece
            </p>

            <h2 className="mb-8 text-4xl font-light md:text-5xl">
              A first study in proportion, warmth, and surface.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-[#d0cabf]">
            <p>
              ORIGIN No. 1 belongs to the first generation of LIGNORAE writing
              instruments: objects created not for speed, but to understand the
              discipline of material, proportion, finishing, and assembly.
            </p>

            <p>
              The wood presents a warm, expressive grain with visible movement
              along the body. The form remains restrained, allowing the material
              itself to carry the visual weight of the piece.
            </p>

            <p>
              As an early atelier piece, it documents the beginning of the
              LIGNORAE language: natural material, quiet construction, and an
              object designed to feel personal before it feels ornamental.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="border-y border-[#4a3522]/70 bg-[#120d09] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
              Specifications
            </p>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#c6a66a]">
                  Collection
                </p>
                <p className="text-xl font-light">ORIGIN</p>
              </div>

              <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#c6a66a]">
                  Material
                </p>
                <p className="text-xl font-light">East indian palisander</p>
              </div>

              <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#c6a66a]">
                  Status
                </p>
                <p className="text-xl font-light">Prototype archive</p>
              </div>

              <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#c6a66a]">
                  Origin
                </p>
                <p className="text-xl font-light">Munich Atelier</p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="mx-auto max-w-5xl px-6 py-28 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
            Availability
          </p>

          <h2 className="mb-6 text-4xl font-light md:text-5xl">
            Future pieces may be requested individually.
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
            Each LIGNORAE instrument is produced in small numbers. Material,
            finish, nib configuration, and availability are confirmed personally
            before any commission or order is accepted.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black hover:shadow-[0_0_25px_rgba(198,166,106,0.35)]"
          >
            Request a similar piece
          </Link>
        </section>
      </FadeIn>

      <Footer />
    </main>
  );
}