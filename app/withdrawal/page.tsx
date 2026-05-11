import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Widerrufsbelehrung",
    body: [
      "Verbraucherinnen und Verbraucher haben grundsätzlich das Recht, binnen vierzehn Tagen ohne Angabe von Gründen einen im Fernabsatz geschlossenen Vertrag zu widerrufen, sofern kein gesetzlicher Ausschlussgrund besteht.",
      "Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht Beförderer ist, die Ware in Besitz genommen haben beziehungsweise hat.",
    ],
  },
  {
    title: "Ausübung des Widerrufsrechts",
    body: [
      "Um Ihr Widerrufsrecht auszuüben, müssen Sie LIGNORAE Atelier mittels einer eindeutigen Erklärung über Ihren Entschluss informieren, diesen Vertrag zu widerrufen.",
      "Die Erklärung kann per E-Mail oder postalisch erfolgen.",
      "LIGNORAE Atelier",
      "Paul Daniel Schneider",
      "München",
      "Deutschland",
      "E-Mail: info@lignorae.com",
    ],
  },
  {
    title: "Folgen des Widerrufs",
    body: [
      "Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten, mit Ausnahme zusätzlicher Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene günstigste Standardlieferung gewählt haben.",
      "Die Rückzahlung erfolgt unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.",
      "Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, sofern nicht ausdrücklich etwas anderes vereinbart wurde. Für die Rückzahlung werden keine Entgelte berechnet.",
      "Wir können die Rückzahlung verweigern, bis wir die Ware zurückerhalten haben.",
    ],
  },
  {
    title: "Rücksendung der Ware",
    body: [
      "Sie haben die Ware unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf unterrichten, an LIGNORAE Atelier zurückzusenden oder zu übergeben.",
      "Die Frist ist gewahrt, wenn Sie die Ware vor Ablauf der Frist von vierzehn Tagen absenden.",
      "Sie tragen die unmittelbaren Kosten der Rücksendung der Ware, sofern nicht ausdrücklich etwas anderes vereinbart wurde.",
    ],
  },
  {
    title: "Wertersatz",
    body: [
      "Sie müssen für einen etwaigen Wertverlust der Ware nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung von Beschaffenheit, Eigenschaften und Funktionsweise der Ware nicht notwendigen Umgang mit ihr zurückzuführen ist.",
      "Handgefertigte Schreibobjekte, veredelte Holzoberflächen, Präsentationsformen und empfindliche Materialien sind sorgfältig zu behandeln und sicher zu verpacken.",
    ],
  },
  {
    title: "Ausschluss oder vorzeitiges Erlöschen des Widerrufsrechts",
    body: [
      "Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch die Verbraucherin oder den Verbraucher maßgeblich ist oder die eindeutig auf persönliche Bedürfnisse zugeschnitten sind.",
      "Dies kann insbesondere für individuell angefertigte Schreibobjekte, Sonderanfertigungen, Gravuren, Materialwünsche, personalisierte Präsentationsformen oder ausdrücklich kundenspezifisch hergestellte Objekte gelten.",
      "Ob ein Widerrufsrecht besteht oder ausgeschlossen ist, wird im jeweiligen Angebot oder im Bestellprozess entsprechend berücksichtigt.",
    ],
  },
  {
    title: "Muster-Widerrufsformular",
    body: [
      "Wenn Sie den Vertrag widerrufen möchten, können Sie das folgende Muster verwenden. Die Verwendung dieses Formulars ist nicht vorgeschrieben.",
      "An LIGNORAE Atelier, Paul Daniel Schneider, München, Deutschland, E-Mail: info@lignorae.com",
      "Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden Ware:",
      "Bestellt am / erhalten am:",
      "Name der Verbraucherin / des Verbrauchers:",
      "Anschrift der Verbraucherin / des Verbrauchers:",
      "Datum:",
      "Unterschrift der Verbraucherin / des Verbrauchers, nur bei Mitteilung auf Papier:",
    ],
  },
];

export default function WithdrawalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Widerrufsbelehrung
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Widerrufsrecht.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            Informationen zum gesetzlichen Widerrufsrecht für Verbraucherinnen
            und Verbraucher sowie zu möglichen Ausschlüssen bei individuellen
            Anfertigungen.
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

              <div className="space-y-4 text-base font-normal leading-8 text-black/95">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 border border-black/15 bg-[#fbfaf7] p-6 text-sm font-normal leading-7 text-black/95 md:p-8">
          <p>
            Stand: Mai 2026. Diese Widerrufsbelehrung wurde für den aktuellen
            Stand von LIGNORAE Atelier erstellt. Bei Änderungen des Angebots-,
            Bestell- oder Verkaufsprozesses wird diese Seite entsprechend
            aktualisiert.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}