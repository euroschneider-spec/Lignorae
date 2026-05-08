import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WithdrawalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Widerrufsrecht
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Widerrufsrecht für Verbraucher
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <p className="leading-relaxed">
            Verbraucher innerhalb der Europäischen Union können bei bestimmten
            Fernabsatzverträgen das Recht haben, den Vertrag innerhalb von 14
            Tagen zu widerrufen, vorbehaltlich der geltenden
            Verbraucherschutzbestimmungen.
          </p>

          <p className="leading-relaxed">
            Bestimmte handgefertigte, personalisierte, beauftragte oder nach
            Kundenspezifikation angefertigte Produkte können nach geltendem
            Recht vom Widerrufsrecht ausgeschlossen sein.
          </p>

          <p className="leading-relaxed">
            Detaillierte Widerrufsbedingungen, Abläufe und Rücksendehinweise
            werden vor dem kommerziellen Start der Online-Bestellung
            veröffentlicht.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}