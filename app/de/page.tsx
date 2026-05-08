import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function GermanHomePage() {
  return (
    <main className="min-h-screen bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-[#0b0907]/80" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
            Handgefertigte Füllfederhalter
          </p>

          <h1 className="mb-6 text-5xl font-light leading-tight md:text-7xl">
            LIGNORAE
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#d6d1c7]">
            Schreibinstrumente, in München von Hand gefertigt aus sorgfältig
            ausgewählten Hölzern, langsam geformt, behutsam veredelt und dafür
            geschaffen, Geschichten über Generationen weiterzutragen.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/de/collections"
              className="rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black hover:shadow-[0_0_25px_rgba(198,166,106,0.35)]"
            >
              Kollektionen entdecken
            </Link>

            <Link
              href="/de/journal"
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
              Kollektionen
            </p>

            <h2 className="text-4xl font-light md:text-5xl">
              Materialien mit Erinnerung
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
                  Edle Hölzer, ausgewählt für Struktur, Wärme und zeitlose
                  Eleganz.
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
                  Wiedergewonnene musikalische Materialien, verwandelt in
                  Schreibinstrumente.
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
                  Historische Hölzer mit dokumentierter Herkunft, getragen von
                  Erinnerung, Stille und Bestand.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-5xl rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-10 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
              Erste Edition
            </p>

            <h2 className="mb-6 text-4xl font-light">
              Die ersten LIGNORAE Schreibinstrumente sind in Vorbereitung.
            </h2>

            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
              Die ersten Stücke entstehen in kleinen Mengen. Material,
              Ausführung und Verfügbarkeit werden vor jeder Bestellung
              individuell abgestimmt.
            </p>

            <Link
              href="/de/contact"
              className="inline-block rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black hover:shadow-[0_0_25px_rgba(198,166,106,0.35)]"
            >
              Verfügbarkeit anfragen
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
              Das Atelier
            </p>

            <h2 className="mb-8 text-4xl font-light md:text-6xl">
              Langsam gebaut. Sorgfältig veredelt.
            </h2>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#d6d1c7]">
              Jedes LIGNORAE Schreibinstrument beginnt als Rohmaterial und
              entsteht durch Geduld, Versuche, Schleifen, Polieren und viele
              kleine Korrekturen, die dem Auge oft verborgen bleiben.
            </p>
          </div>
        </section>
      </FadeIn>

      <Footer />
    </main>
  );
}