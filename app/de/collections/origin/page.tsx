import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OriginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <Link
          href="/de/collections"
          className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] hover:text-[#f5f1e8]"
        >
          ← Kollektionen
        </Link>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Kollektion
        </p>

        <h1 className="mb-8 text-6xl font-light md:text-7xl">ORIGIN</h1>

        <p className="mb-16 max-w-4xl text-xl leading-relaxed text-[#d0cabf]">
          Edle Hölzer, ausgewählt für natürliche Schönheit, Struktur, Wärme und
          zeitlosen Charakter. ORIGIN bildet die stille Grundlage von LIGNORAE.
        </p>

        <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
          <div className="relative aspect-[16/8] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/origin.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Materialcharakter</h2>
            <p className="leading-relaxed text-[#d0cabf]">
              Jedes Stück entsteht aus sorgfältig ausgewähltem Holz, gewählt
              nach Maserung, Dichte, Farbe und der Fähigkeit, zu einem
              verfeinerten Schreibinstrument für den Alltag zu werden.
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Gedanke</h2>
            <p className="leading-relaxed text-[#d0cabf]">
              ORIGIN richtet sich an Menschen, die Zurückhaltung schätzen:
              Material, Balance, Handwerk und eine ruhige Eleganz ohne
              unnötige Verzierung.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}