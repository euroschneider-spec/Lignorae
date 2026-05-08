import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CollectionsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-7xl flex-1 px-6 pb-24 pt-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Kollektionen
        </p>

        <h1 className="mb-16 text-5xl font-light md:text-6xl">
          Geschichten in Holz
        </h1>

        <div className="grid gap-10 md:grid-cols-3">
          <Link
            href="/de/collections/origin"
            className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/origin.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <h2 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                ORIGIN
              </h2>

              <p className="leading-relaxed text-[#cfc8bc]">
                Sorgfältig ausgewählte edle Hölzer, verwandelt in zeitlose
                Schreibinstrumente mit klarem, elegantem Charakter.
              </p>
            </div>
          </Link>

          <Link
            href="/de/collections/sonora"
            className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/sonora.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <h2 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                SONORA
              </h2>

              <p className="leading-relaxed text-[#cfc8bc]">
                Füllfederhalter aus wiedergewonnenen musikalischen Materialien,
                geschaffen, um Klang, Erinnerung und künstlerisches Erbe
                weiterzutragen.
              </p>
            </div>
          </Link>

          <Link
            href="/de/collections/sacra"
            className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
  <div className="absolute inset-0 bg-[url('/sacra.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
</div>

            <div className="p-8">
              <h2 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                SACRA
              </h2>

              <p className="leading-relaxed text-[#cfc8bc]">
                Seltene historische Hölzer aus sakralen Restaurierungen,
                dokumentiert und als Schreibinstrumente von Bestand neu geboren.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}