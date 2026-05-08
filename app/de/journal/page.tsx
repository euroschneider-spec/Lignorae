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
          Notizen aus dem Atelier
        </h1>

        <p className="mb-20 max-w-5xl text-xl leading-relaxed text-[#d0cabf]">
          Experimente, Materialien, Fehler, Entdeckungen, wiedergewonnene
          Hölzer, Oberflächenveredelung und der langsame Aufbau von LIGNORAE.
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
                Die Kunst der Veredelung lernen
              </h2>

              <p className="leading-relaxed text-[#d0cabf]">
                Die ersten Monate von LIGNORAE stehen weniger im Zeichen der
                Perfektion als der Disziplin: schleifen, polieren, Fehler
                korrigieren, Maserungsverläufe verstehen und lernen, wie
                unterschiedliche Hölzer auf Druck, Wärme und Poliermittel
                reagieren.
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
                Materialforschung
              </p>

              <h2 className="mb-5 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                Warum wiedergewonnenes Holz zählt
              </h2>

              <p className="leading-relaxed text-[#d0cabf]">
                Manche Materialien tragen bereits Jahrzehnte oder Jahrhunderte,
                manchmal sogar Jahrtausende Geschichte in sich. Musikinstrumente,
                architektonische Fragmente und gealterte Harthölzer bieten
                Strukturen und Geschichten, die sich künstlich nicht nachbilden
                lassen.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}