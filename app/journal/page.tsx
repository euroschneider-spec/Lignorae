import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JournalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Journal
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Notes from the atelier
        </h1>

        <p className="mb-20 max-w-5xl text-xl leading-relaxed text-[#d0cabf]">
          Experiments, materials, failures, discoveries, reclaimed woods,
          surface refinement, and the slow construction of LIGNORAE.
        </p>

        <div className="space-y-12">
          <article className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
            <div className="relative aspect-[16/9] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/atelier.jpg')] bg-cover bg-[position:center_35%] transition duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                April 2026
              </p>

              <h2 className="mb-5 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                Learning the craft of refinement
              </h2>

              <p className="leading-relaxed text-[#d0cabf]">
                The first months of LIGNORAE are focused less on perfection and
                more on discipline: sanding, polishing, correcting mistakes,
                understanding grain direction, and learning how different woods
                react under pressure, heat, and polishing compounds.
              </p>
            </div>
          </article>

          <article className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
            <div className="relative aspect-[16/9] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/sonora.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                Material Research
              </p>

              <h2 className="mb-5 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                Why reclaimed wood matters
              </h2>

              <p className="leading-relaxed text-[#d0cabf]">
                Some materials already carry decades or centuries, sometimes
                even millennia of history. Musical instruments, architectural
                fragments, and aged hardwoods offer textures and stories
                impossible to reproduce artificially.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}