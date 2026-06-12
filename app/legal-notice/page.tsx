import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Angaben gemäß § 5 DDG",
    body: [
      "LIGNORAE Atelier",
      "Inhaber: Paul Daniel Schneider",
      "Hohenlindener Straße 1",
      "81677 München",
      "Deutschland",
    ],
  },
  {
    title: "Kontakt",
    body: [
      "Telefon: +49 176 31176610",
      "E-Mail: info@lignorae.com",
      "Internet: www.lignorae.com",
    ],
  },
  {
    title: "Rechtsform",
    body: [
      "Rechtsform: nicht eingetragenes Einzelunternehmen",
      "Vertretungsberechtigt: Paul Daniel Schneider",
      "Es besteht keine Eintragung im Handelsregister.",
    ],
  },
  {
    title: "Umsatzsteuer",
    body: [
      "Eine Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz wurde derzeit noch nicht erteilt.",
      "Eine private Steuernummer wird im Impressum nicht veröffentlicht.",
      "Nach Erteilung einer Umsatzsteuer-Identifikationsnummer wird diese Angabe ergänzt.",
    ],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    body: [
      "Paul Daniel Schneider",
      "Hohenlindener Straße 1",
      "81677 München",
      "Deutschland",
    ],
  },
  {
    title: "Verbraucherstreitbeilegung",
    body: [
      "Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      "Die frühere EU-Plattform zur Online-Streitbeilegung wurde zum 20. Juli 2025 eingestellt. Ein Link auf diese Plattform wird daher nicht mehr bereitgestellt.",
    ],
  },
  {
    title: "Haftung für Inhalte",
    body: [
      "Als Diensteanbieter sind wir gemäß den allgemeinen gesetzlichen Vorschriften für eigene Inhalte auf diesen Seiten verantwortlich.",
      "Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    ],
  },
  {
    title: "Haftung für Links",
    body: [
      "Unser Angebot kann Links zu externen Webseiten Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben.",
      "Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der jeweiligen Seiten verantwortlich.",
      "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar.",
      "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    ],
  },
  {
    title: "Urheberrecht",
    body: [
      "Die durch LIGNORAE Atelier erstellten Inhalte, Fotografien, Texte, Gestaltungen, Produktdarstellungen, Grafiken und sonstigen Werke auf dieser Website unterliegen dem deutschen Urheberrecht und den einschlägigen Schutzrechten.",
      "Vervielfältigung, Bearbeitung, Verbreitung, öffentliche Wiedergabe oder sonstige Nutzung außerhalb der Grenzen des Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.",
      "Soweit Inhalte auf dieser Website nicht von LIGNORAE Atelier erstellt wurden, werden die Rechte Dritter beachtet und entsprechend gekennzeichnet.",
      "Sollten Sie dennoch auf eine mögliche Rechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir betroffene Inhalte umgehend entfernen.",
    ],
  },
  {
    title: "Kennzeichenrechte",
    body: [
      "Die Bezeichnung LIGNORAE Atelier, das Erscheinungsbild dieser Website, Logos, Produktnamen, Kollektionen sowie weitere kennzeichnende Elemente können urheber-, kennzeichen- oder wettbewerbsrechtlich geschützt sein.",
      "Eine Nutzung, Vervielfältigung oder Verwendung ist ohne vorherige schriftliche Zustimmung nicht gestattet, soweit keine gesetzliche Erlaubnis besteht.",
    ],
  },
  {
    title: "Bildnachweise",
    body: [
      "Sofern nicht anders gekennzeichnet, stammen die auf dieser Website verwendeten Fotografien, Produktdarstellungen und visuellen Gestaltungen von LIGNORAE Atelier oder wurden im Auftrag von LIGNORAE Atelier erstellt.",
      "KI-generierte oder digital bearbeitete Visualisierungen dienen der Markenkommunikation, Konzeptdarstellung und Präsentation, sofern sie nicht ausdrücklich als reale Produktfotografie gekennzeichnet sind.",
    ],
  },
];

export default function LegalNoticePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Impressum
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Impressum.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-medium leading-8 text-black/95 md:text-lg">
            Anbieterkennzeichnung und rechtliche Pflichtangaben für die Website
            von LIGNORAE Atelier.
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
            Stand: Juni 2026. Dieses Impressum wurde für den aktuellen Stand des
            LIGNORAE Ateliers erstellt. Bei Änderungen der Rechtsform,
            Kontaktdaten, Registerangaben oder steuerlichen Angaben wird diese
            Seite entsprechend aktualisiert.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
