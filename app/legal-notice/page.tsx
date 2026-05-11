import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Angaben gemäß § 5 DDG",
    body: [
      "LIGNORAE Atelier",
      "Inhaber / Verantwortlicher: [VOLLSTÄNDIGEN RECHTLICHEN NAMEN EINTRAGEN]",
      "Hohenlindener Str. 1",
      "81677 München",
      "Deutschland",
    ],
  },
  {
    title: "Kontakt",
    body: [
      "E-Mail: info@lignorae.com",
      "Telefon: [TELEFONNUMMER EINTRAGEN, SOFERN GESCHÄFTLICH VERWENDET]",
      "Internet: www.lignorae.com",
    ],
  },
  {
    title: "Rechtsform und Registerangaben",
    body: [
      "Rechtsform: [z. B. Einzelunternehmen / GmbH / UG / GbR EINTRAGEN]",
      "Registergericht: [NUR BEI REGISTERPFLICHTIGEN RECHTSFORMEN EINTRAGEN]",
      "Registernummer: [NUR BEI REGISTERPFLICHTIGEN RECHTSFORMEN EINTRAGEN]",
      "Vertretungsberechtigte Person: [BEI JURISTISCHEN PERSONEN EINTRAGEN]",
    ],
  },
  {
    title: "Umsatzsteuer",
    body: [
      "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [USt-IdNr. EINTRAGEN, FALLS ERTEILT]",
      "Wirtschafts-Identifikationsnummer: [W-IdNr. EINTRAGEN, FALLS ZUGETEILT]",
      "Hinweis: Eine private Steuernummer wird im Impressum nicht veröffentlicht.",
    ],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    body: [
      "[VOLLSTÄNDIGEN RECHTLICHEN NAMEN EINTRAGEN]",
      "Hohenlindener Str. 1",
      "81677 München",
      "Deutschland",
    ],
  },
  {
    title: "Berufsrechtliche Angaben und Aufsichtsbehörde",
    body: [
      "Für die derzeit dargestellte Tätigkeit als Atelier für handgefertigte Schreibobjekte und Präsentationsformen besteht nach aktuellem Stand keine berufsrechtlich reglementierte Zulassungspflicht wie bei freien Berufen oder erlaubnispflichtigen Gewerben.",
      "Sollte sich die Tätigkeit künftig auf zulassungspflichtige Bereiche erweitern, werden Angaben zur zuständigen Aufsichtsbehörde und etwaigen Erlaubnissen ergänzt.",
    ],
  },
  {
    title: "Verbraucherstreitbeilegung",
    body: [
      "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      "Die frühere EU-Plattform zur Online-Streitbeilegung wurde zum 20. Juli 2025 eingestellt. Ein Link auf diese Plattform wird daher nicht mehr bereitgestellt.",
    ],
  },
  {
    title: "Haftung für Inhalte",
    body: [
      "Als Diensteanbieter sind wir nach den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine entsprechende Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    ],
  },
  {
    title: "Haftung für Links",
    body: [
      "Unser Angebot kann Links zu externen Webseiten Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
      "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße geprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    ],
  },
  {
    title: "Urheberrecht",
    body: [
      "Die durch LIGNORAE erstellten Inhalte, Fotografien, Texte, Gestaltungen, Markenbestandteile und sonstigen Werke auf dieser Website unterliegen dem deutschen Urheberrecht und den einschlägigen Schutzrechten.",
      "Vervielfältigung, Bearbeitung, Verbreitung, öffentliche Wiedergabe oder sonstige Nutzung außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.",
      "Soweit Inhalte auf dieser Website nicht von LIGNORAE erstellt wurden, werden die Rechte Dritter beachtet. Sollten Sie dennoch auf eine mögliche Rechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir betroffene Inhalte umgehend entfernen.",
    ],
  },
  {
    title: "Marken- und Kennzeichenrechte",
    body: [
      "LIGNORAE, das LIGNORAE Zeichen, das Erscheinungsbild der Website sowie die Bezeichnungen der Kollektionen und Produktlinien können marken-, kennzeichen- oder wettbewerbsrechtlich geschützt sein.",
      "Eine Nutzung ohne vorherige schriftliche Zustimmung ist nicht gestattet, soweit keine gesetzliche Erlaubnis besteht.",
    ],
  },
  {
    title: "Bildnachweise",
    body: [
      "Sofern nicht anders gekennzeichnet, stammen die Bilder, Produktdarstellungen und visuellen Gestaltungen von LIGNORAE Atelier oder wurden im Auftrag von LIGNORAE erstellt.",
      "Für KI-generierte oder digital bearbeitete Visualisierungen gilt: Diese dienen der visuellen Markenkommunikation, Konzeptdarstellung und Präsentation, sofern nicht ausdrücklich als reale Produktfotografie gekennzeichnet.",
    ],
  },
];

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Impressum
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Legal notice.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
            Anbieterkennzeichnung und rechtliche Pflichtangaben für die Website
            von LIGNORAE Atelier.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-9 pb-28">
        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
              <h2 className="mb-6 text-3xl font-light tracking-[-0.04em] text-black">
                {section.title}
              </h2>

              <div className="space-y-4 text-base font-light leading-8 text-black/70">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 border border-black/15 bg-[#fbfaf7] p-6 text-sm leading-7 text-black/65 md:p-8">
          <p>
            Stand: Mai 2026. Dieses Impressum muss vor Veröffentlichung mit den
            endgültigen Unternehmensdaten, der korrekten Rechtsform, dem vollständigen
            Namen des Verantwortlichen sowie gegebenenfalls Register- und Umsatzsteuerdaten
            abgeglichen werden.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}