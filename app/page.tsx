import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-[#0b0907]/80" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
            Handcrafted Fountain Pens
          </p>

          <h1 className="mb-6 text-5xl font-light leading-tight md:text-7xl">
            LIGNORAE
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#d6d1c7]">
            Writing instruments handcrafted in Munich from carefully selected
            woods, shaped slowly, finished by hand, and built to carry stories
            across generations.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/collections"
              className="rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black hover:shadow-[0_0_25px_rgba(198,166,106,0.35)]"
            >
              Discover Collections
            </Link>

            <Link
              href="/journal"
              className="rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-white"
            >
              Journal
            </Link>
          </div>
        </div>
      </section>

<FadeIn>

  <section className="mx-auto max-w-7xl px-6 pb-28 pt-40">      
        <div className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
            Collections
          </p>

          <h2 className="text-4xl font-light md:text-5xl">
            Materials with memory
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
            <div className="relative aspect-[16/10] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/origin.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <h3 className="mb-4 text-2xl font-light">ORIGIN</h3>
              <p className="leading-relaxed text-[#cfc8bc]">
                Noble woods selected for texture, warmth, and timeless elegance.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
            <div className="relative aspect-[16/10] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/sonora.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <h3 className="mb-4 text-2xl font-light">SONORA</h3>
              <p className="leading-relaxed text-[#cfc8bc]">
                Reclaimed musical instruments transformed into writing tools.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
            <div className="relative aspect-[16/10] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/sacra.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <h3 className="mb-4 text-2xl font-light">SACRA</h3>
              <p className="leading-relaxed text-[#cfc8bc]">
                Historic sacred woods carrying centuries of memory and silence.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
            First Edition
          </p>

          <h2 className="mb-6 text-4xl font-light">
            The first LIGNORAE instruments are in preparation.
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
            The first pieces will be produced in small numbers, with material,
            finish, and availability confirmed individually before each order.
            Early enquiries are welcome.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black hover:shadow-[0_0_25px_rgba(198,166,106,0.35)]"
          >
            Request availability
          </Link>
        </div>
      </section>
    </FadeIn>

      <FadeIn>

  <section className="relative overflow-hidden border-y border-[#4a3522]/70 py-32">
        <div className="absolute inset-0 bg-[url('/atelier.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-[#0b0907]/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
            The Atelier
          </p>

          <h2 className="mb-8 text-4xl font-light md:text-6xl">
            Built slowly. Finished by hand.
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#d6d1c7]">
            Every LIGNORAE writing instrument begins as raw material, shaped
            through patience, experimentation, sanding, polishing, and countless
            small corrections invisible to the human eye.
          </p>
        </div>
      </section>
</FadeIn>

      <Footer />
    </main>
  );
}