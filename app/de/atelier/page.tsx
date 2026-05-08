import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AtelierPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-5xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Atelier
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Die Werkstatt hinter LIGNORAE
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
          LIGNORAE ist ein kleines unabhängiges Atelier in München,
          spezialisiert auf handgefertigte Füllfederhalter aus sorgfältig
          ausgewählten Hölzern mit Charakter, Geschichte und Beständigkeit.
        </p>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10">
          <div className="aspect-[4/3] bg-[url('/atelier.jpg')] bg-cover bg-center" />
        </div>
<div className="mt-20 grid gap-8 md:grid-cols-2">
  <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
      Was wir tun
    </p>

    <h2 className="mb-5 text-3xl font-light">
      Elegante Schreibinstrumente in kleinen Mengen
    </h2>

    <p className="leading-relaxed text-[#d0cabf]">
      LIGNORAE konzentriert sich auf handgefertigte Füllfederhalter in
      kleinen Mengen, mit besonderer Aufmerksamkeit für Holzauswahl,
      Formgebung, Veredelung, Montage und die ruhige Disziplin stetiger
      Verbesserung.
    </p>
  </div>

  <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
      Wie wir arbeiten
    </p>

    <h2 className="mb-5 text-3xl font-light">
      Langsam, sichtbar, mit Hingabe
    </h2>

    <p className="leading-relaxed text-[#d0cabf]">
      Das Atelier wächst noch. Versuche, Fehler, Schleifspuren,
      Oberflächentests und Materialstudien gehören zum Prozess. Das Ziel
      ist nicht Geschwindigkeit, sondern ein Schreibinstrument, das bewusst
      und sorgfältig gestaltet wirkt.
    </p>
  </div>
</div>
      </section>

      <Footer />
    </main>
  );
}