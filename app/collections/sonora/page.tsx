import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SonoraPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <Link
          href="/collections"
          className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
        >
          ← Collections
        </Link>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Collection
        </p>

        <h1 className="mb-8 text-6xl font-light md:text-7xl">SONORA</h1>

        <p className="mb-16 max-w-4xl text-xl leading-relaxed text-[#d0cabf]">
          Writing instruments shaped from reclaimed musical woods, carrying
          traces of resonance, performance, silence, and time.
        </p>

        <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
          <div className="aspect-[16/8] bg-[url('/sonora.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Material character</h2>

            <p className="leading-relaxed text-[#d0cabf]">
              SONORA focuses on woods connected to music: instruments,
              fragments, cases, or other material sources where sound and
              craftsmanship have already left a mark.
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Purpose</h2>

            <p className="leading-relaxed text-[#d0cabf]">
              Each piece is intended to preserve something of its former life:
              not as decoration, but as a quiet continuation of rhythm, touch,
              and artistic memory.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}