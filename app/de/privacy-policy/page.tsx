import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Datenschutz
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Datenschutzerklärung
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Allgemeine Informationen
            </h2>

            <p className="leading-relaxed">
	      Diese Website kann ein funktionales Sprachpräferenz-Cookie verwenden, um die gewählte Sprache zu speichern. Derzeit werden keine Marketing- oder Analytics-Cookies eingesetzt.
              Der Schutz personenbezogener Daten ist LIGNORAE Atelier wichtig.
              Personenbezogene Informationen, die über diese Website übermittelt
              werden, behandeln wir vertraulich und gemäß den geltenden
              Datenschutzbestimmungen.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Kontaktanfragen
            </h2>

            <p className="leading-relaxed">
              Wenn Besucher das Atelier per E-Mail oder über das vorbereitete
              Kontaktformular nach dessen Aktivierung kontaktieren, können die
              übermittelten Informationen zur Bearbeitung der Anfrage und für
              zukünftige Kommunikation gespeichert werden.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Hosting und technische Daten
            </h2>

            <p className="leading-relaxed">
              Technische Zugriffsdaten wie Browsertyp, Betriebssystem,
              Verweisquelle und Zugriffszeit können durch den Hosting-Anbieter
              automatisch verarbeitet werden, um Sicherheit und technische
              Stabilität zu gewährleisten.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Externe Dienste
            </h2>

            <p className="leading-relaxed">
              Diese Website verzichtet derzeit soweit möglich auf Analytics,
              Marketing-Tracker und nicht notwendige Cookies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Zukünftige Aktualisierungen
            </h2>

            <p className="leading-relaxed">
              Diese Datenschutzerklärung wird erweitert und aktualisiert, sobald
              zusätzliche Dienste, Zahlungssysteme, Formulare oder Analytics-
              Werkzeuge in die Website integriert werden.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}