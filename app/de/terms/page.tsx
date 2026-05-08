import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          AGB
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Allgemeine Geschäftsbedingungen
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Geltungsbereich
    </h2>

    <p className="leading-relaxed">
      LIGNORAE Atelier fertigt handgefertigte Schreibinstrumente in kleinen
      Mengen, häufig unter Verwendung natürlicher, wiedergewonnener oder
      historisch bezogener Materialien.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Produktcharakter
    </h2>

    <p className="leading-relaxed">
      Erscheinungsbild, Maserung, Struktur, Farbgebung und kleinere visuelle
      Abweichungen können sich aufgrund der Eigenschaften von Holz und der
      handwerklichen Veredelung von Stück zu Stück natürlich unterscheiden.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Verfügbarkeit und Bestellungen
    </h2>

    <p className="leading-relaxed">
      Verfügbarkeit, Preise, Produktionszeiten, Zahlungsbedingungen und
      Versanddetails werden individuell bestätigt, bevor eine Bestellung
      abgeschlossen wird.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Kommerzieller Launch
    </h2>

    <p className="leading-relaxed">
      Vollständige Geschäftsbedingungen, Zahlungsbedingungen,
      Kundenrechte und detaillierte Bestellabläufe werden vor dem offiziellen
      Start des Online-Verkaufs ergänzt.
    </p>
  </div>
</div>
      </section>

      <Footer />
    </main>
  );
}