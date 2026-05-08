import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Versand
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Informationen zur Lieferung
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Individuelle Bestätigung
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Schreibinstrumente entstehen in kleinen Mengen.
              Versandoptionen, Lieferzeiten und Kosten werden individuell
              bestätigt, bevor eine Bestellung abgeschlossen wird.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Verpackung
            </h2>

            <p className="leading-relaxed">
              Jedes Schreibinstrument wird sorgfältig vorbereitet und verpackt,
              angepasst an Produkt, Material und Zielort.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Verfügbarkeit
            </h2>

            <p className="leading-relaxed">
              Versand innerhalb der EU und in ausgewählte internationale Länder
              kann nach individueller Bestätigung möglich sein. Die endgültigen
              Versandbedingungen werden vor dem kommerziellen Launch ergänzt.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}