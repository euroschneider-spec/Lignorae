import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Lieferung und Versand",
    body: [
      "LIGNORAE Atelier fertigt und versendet handgefertigte Schreibobjekte, Holzobjekte und Präsentationsformen in kleinen Stückzahlen.",
      "Lieferzeiten, Versandkosten und Versandart werden vor Vertragsschluss individuell mitgeteilt oder im jeweiligen Angebot angegeben.",
      "Eine Anfrage über die Website stellt noch keine verbindliche Bestellung dar. Ein Vertrag kommt erst zustande, wenn ein individuelles Angebot ausdrücklich angenommen und von LIGNORAE Atelier bestätigt wurde.",
    ],
  },
  {
    title: "Bearbeitungs- und Vorbereitungszeit",
    body: [
      "Verfügbare Objekte werden nach Zahlungseingang, finaler Qualitätsprüfung und sorgfältiger Verpackung versandbereit gemacht.",
      "Bei handgefertigten Objekten, Sonderanfertigungen, Gravuren, Oberflächenveredelungen, Präsentationsformen, Cocoon-Boxen oder Materialprüfungen können zusätzliche Vorbereitungszeiten entstehen.",
      "Angegebene Liefer- oder Bearbeitungszeiten sind nur dann verbindlich, wenn sie ausdrücklich als verbindlich bestätigt wurden.",
    ],
  },
  {
    title: "Versandart und Versicherung",
    body: [
      "Hochwertige Schreibobjekte werden sorgfältig verpackt und, soweit sinnvoll und verfügbar, mit Sendungsverfolgung und angemessener Transportversicherung versendet.",
      "Je nach Warenwert, Bestimmungsort und Versanddienstleister kann eine persönliche Übergabe, Empfangsbestätigung oder Unterschrift erforderlich sein.",
      "Der konkrete Versanddienstleister wird nach Zielort, Versicherbarkeit, Zuverlässigkeit und Objektwert ausgewählt.",
    ],
  },
  {
    title: "Verpackung",
    body: [
      "Die Verpackung wird dem jeweiligen Objekt, seiner Oberfläche, Präsentationsform und dem Versandweg angepasst.",
      "Schreibobjekte, Cocoon-Boxen, empfindliche Holzoberflächen, Schreibsysteme, Zertifikate und Zubehör werden so vorbereitet, dass ein angemessener Schutz während des Transports gewährleistet ist.",
      "Verpackungen können sich je nach Objekt, Edition, Zielort und Versandanforderung unterscheiden.",
    ],
  },
  {
    title: "Versand innerhalb Deutschlands und der Europäischen Union",
    body: [
      "Versand innerhalb Deutschlands und in ausgewählte Länder der Europäischen Union ist grundsätzlich möglich, sofern keine rechtlichen, logistischen oder versicherungstechnischen Gründe entgegenstehen.",
      "Versandkosten, voraussichtliche Laufzeiten und Versicherungsoptionen werden vor Vertragsschluss individuell mitgeteilt.",
    ],
  },
  {
    title: "Internationaler Versand",
    body: [
      "Internationaler Versand außerhalb der Europäischen Union kann nach individueller Prüfung möglich sein.",
      "Zölle, Einfuhrabgaben, lokale Steuern, Gebühren und Verzögerungen durch Zollbehörden liegen außerhalb des Einflussbereichs von LIGNORAE Atelier und sind, soweit nicht ausdrücklich anders vereinbart, von der Kundin oder dem Kunden zu tragen.",
      "LIGNORAE Atelier übernimmt keine Verantwortung für Verzögerungen, die durch Zollabfertigung, unvollständige oder fehlerhafte Empfängerangaben, lokale Behörden oder ausländische Versanddienstleister entstehen.",
    ],
  },
  {
    title: "Transportschäden",
    body: [
      "Sollte ein Paket sichtbar beschädigt ankommen, sollte der Schaden nach Möglichkeit sofort beim Zusteller dokumentiert und LIGNORAE Atelier unverzüglich informiert werden.",
      "Bitte bewahren Sie Verpackung, Versandmaterial und beschädigte Ware auf, bis der Vorgang geklärt ist.",
      "Gesetzliche Rechte von Verbraucherinnen und Verbrauchern bleiben hiervon unberührt.",
    ],
  },
  {
    title: "Unzustellbare Sendungen",
    body: [
      "Kann eine Sendung wegen unvollständiger, fehlerhafter oder nicht zustellbarer Adressangaben nicht zugestellt werden, können zusätzliche Versandkosten für erneuten Versand oder Rücksendung entstehen.",
      "Bitte prüfen Sie Lieferadresse, Namen, Hausnummer, Postleitzahl, Land und Kontaktinformationen vor Bestätigung einer Bestellung sorgfältig.",
    ],
  },
  {
    title: "Abholung und persönliche Übergabe",
    body: [
      "Eine persönliche Übergabe oder Abholung kann im Einzelfall vereinbart werden.",
      "Ort, Zeitpunkt und Ablauf einer persönlichen Übergabe werden individuell abgestimmt und sind nur verbindlich, wenn sie ausdrücklich bestätigt wurden.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Versand
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Versandinformationen.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-medium leading-8 text-black/95 md:text-lg">
            Versandinformationen für handgefertigte Schreibobjekte,
            Präsentationsformen und individuelle LIGNORAE Atelier Anfragen.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] flex-1 px-9 pb-28">
        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8"
            >
              <h2 className="mb-6 text-3xl font-light tracking-[-0.04em] text-black">
                {section.title}
              </h2>

              <div className="space-y-4 text-base font-medium leading-8 text-black/95">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 border border-black/15 bg-[#fbfaf7] p-6 text-sm font-medium leading-7 text-black/95 md:p-8">
          <p>
            Stand: Juni 2026. Diese Versandinformationen wurden für den aktuellen
            Stand von LIGNORAE Atelier erstellt. Versandbedingungen,
            Versicherungsmöglichkeiten und internationale Lieferoptionen können
            je nach Objekt, Zielort und logistischer Situation angepasst werden.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
