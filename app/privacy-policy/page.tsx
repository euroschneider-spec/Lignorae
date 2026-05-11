import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Verantwortlicher",
    body: [
      "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
      "LIGNORAE Atelier",
      "Paul Daniel Schneider",
      "München",
      "Deutschland",
      "E-Mail: info@lignorae.com",
    ],
  },
  {
    title: "2. Allgemeine Hinweise zur Datenverarbeitung",
    body: [
      "Der Schutz personenbezogener Daten hat für LIGNORAE einen hohen Stellenwert. Personenbezogene Daten werden vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung behandelt.",
      "Die Nutzung dieser Website ist grundsätzlich ohne aktive Angabe personenbezogener Daten möglich. Sofern personenbezogene Daten erhoben werden, erfolgt dies – soweit möglich – stets auf freiwilliger Basis.",
      "Es wird darauf hingewiesen, dass die Datenübertragung im Internet Sicherheitslücken aufweisen kann. Ein vollständiger Schutz der Daten vor dem Zugriff durch Dritte ist technisch nicht möglich.",
    ],
  },
  {
    title: "3. Hosting und technische Infrastruktur",
    body: [
      "Diese Website wird über die Infrastruktur von Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.",
      "Beim Aufruf der Website werden durch den Hostinganbieter technisch notwendige Informationen verarbeitet. Dazu können insbesondere IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Datum und Uhrzeit des Zugriffs sowie angeforderte Dateien gehören.",
      "Die Verarbeitung erfolgt zur Gewährleistung von Stabilität, Sicherheit, Fehleranalyse und technischer Bereitstellung der Website gemäß Art. 6 Abs. 1 lit. f DSGVO.",
      "Es kann nicht ausgeschlossen werden, dass hierbei Daten auf Servern außerhalb der Europäischen Union verarbeitet werden. Vercel verwendet nach eigenen Angaben geeignete Garantien gemäß Art. 46 DSGVO, insbesondere Standardvertragsklauseln der Europäischen Kommission.",
    ],
  },
  {
    title: "4. Datenbank und Speicherung",
    body: [
      "Zur Speicherung strukturierter Inhalte und Website-Daten kann die Datenbankinfrastruktur von Neon verwendet werden.",
      "Die Verarbeitung erfolgt ausschließlich zur technischen Bereitstellung der Website, Verwaltung von Inhalten sowie Bearbeitung von Anfragen.",
      "Es werden angemessene technische und organisatorische Maßnahmen getroffen, um gespeicherte Daten vor Verlust, Manipulation oder unberechtigtem Zugriff zu schützen.",
    ],
  },
  {
    title: "5. Kontaktformular und Kommunikation",
    body: [
      "Wenn Sie LIGNORAE über das Kontaktformular oder per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten zur Bearbeitung der Anfrage verarbeitet.",
      "Hierzu können insbesondere Name, E-Mail-Adresse, Inhalt der Nachricht sowie freiwillig übermittelte Informationen gehören.",
      "Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur Durchführung vorvertraglicher Maßnahmen beziehungsweise gemäß Art. 6 Abs. 1 lit. f DSGVO auf Grundlage des berechtigten Interesses an professioneller Kommunikation.",
      "Die Daten werden nicht ohne ausdrückliche Zustimmung an Dritte weitergegeben, sofern keine gesetzliche Verpflichtung hierzu besteht.",
    ],
  },
  {
    title: "6. Cookies und lokale Speicherung",
    body: [
      "Diese Website verwendet derzeit keine Marketing-, Tracking- oder Analyse-Cookies.",
      "Es werden nur technisch notwendige Cookies beziehungsweise lokale Speichermechanismen verwendet, die für die ordnungsgemäße Funktion, Sicherheit und grundlegende Bedienbarkeit der Website erforderlich sind.",
      "Hierzu kann insbesondere die lokale Speicherung der Cookie-Hinweis-Bestätigung gehören.",
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO beziehungsweise, soweit erforderlich, auf Grundlage der einschlägigen Vorschriften des TTDSG.",
      "Sollten künftig optionale Analyse-, Marketing- oder Drittanbieter-Dienste eingesetzt werden, werden diese nicht ohne vorherige Einwilligung geladen.",
    ],
  },
  {
    title: "7. Server-Log-Dateien",
    body: [
      "Der Hostinganbieter kann automatisch Informationen in sogenannten Server-Log-Dateien erheben und speichern, die Ihr Browser automatisch übermittelt.",
      "Hierzu können insbesondere Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie IP-Adresse gehören.",
      "Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.",
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Sicherstellung eines sicheren und stabilen Betriebs der Website.",
    ],
  },
  {
    title: "8. Externe Links und Instagram",
    body: [
      "Diese Website kann Links zu externen Plattformen oder Diensten enthalten, insbesondere zu Instagram.",
      "Beim Anklicken solcher Links verlassen Sie die Website von LIGNORAE. Für die Verarbeitung personenbezogener Daten auf externen Plattformen sind ausschließlich die jeweiligen Betreiber verantwortlich.",
      "Es wird empfohlen, die Datenschutzhinweise der jeweiligen Plattformen zu beachten.",
    ],
  },
  {
    title: "9. Keine Analyse- oder Werbedienste",
    body: [
      "LIGNORAE verzichtet derzeit bewusst auf klassische Webanalyse-, Tracking- oder Werbedienste wie Google Analytics, Meta Pixel oder vergleichbare Marketingtechnologien.",
      "Die Website verfolgt aktuell keinen werblichen Profiling-Ansatz und verwendet keine personalisierte Nutzeranalyse.",
    ],
  },
  {
    title: "10. Speicherdauer",
    body: [
      "Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Verarbeitungszweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
      "Anfragen per E-Mail oder Kontaktformular können gespeichert bleiben, solange dies für die Kommunikation, Dokumentation oder rechtliche Absicherung erforderlich ist.",
    ],
  },
  {
    title: "11. Rechte betroffener Personen",
    body: [
      "Betroffene Personen haben im Rahmen der gesetzlichen Bestimmungen insbesondere folgende Rechte:",
      "– Recht auf Auskunft gemäß Art. 15 DSGVO",
      "– Recht auf Berichtigung gemäß Art. 16 DSGVO",
      "– Recht auf Löschung gemäß Art. 17 DSGVO",
      "– Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO",
      "– Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO",
      "– Recht auf Widerspruch gemäß Art. 21 DSGVO",
      "– Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde gemäß Art. 77 DSGVO",
      "Zur Ausübung dieser Rechte genügt eine formlose Mitteilung an die im Impressum beziehungsweise in dieser Datenschutzerklärung angegebene Kontaktadresse.",
    ],
  },
  {
    title: "12. SSL- bzw. TLS-Verschlüsselung",
    body: [
      "Diese Website verwendet aus Sicherheitsgründen und zum Schutz vertraulicher Inhalte eine SSL- beziehungsweise TLS-Verschlüsselung.",
      "Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit „https://“ beginnt und ein Schloss-Symbol angezeigt wird.",
    ],
  },
  {
    title: "13. Änderungen dieser Datenschutzerklärung",
    body: [
      "LIGNORAE behält sich vor, diese Datenschutzerklärung anzupassen, sobald technische, rechtliche oder organisatorische Änderungen dies erforderlich machen.",
      "Es gilt jeweils die zum Zeitpunkt des Besuchs aktuelle Fassung der Datenschutzerklärung.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Datenschutz
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Datenschutzerklärung.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-medium leading-8 text-black/95 md:text-lg">
            Informationen zur Verarbeitung personenbezogener Daten auf der
            Website von LIGNORAE Atelier.
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
            Diese rechtlichen Informationen werden in deutscher Sprache bereitgestellt
            und bilden die maßgebliche Fassung für Deutschland.
            <br />
            <br />
            Stand: Mai 2026. Diese Datenschutzerklärung wurde für den aktuellen
            technischen Stand der Website von LIGNORAE Atelier erstellt. Bei
            Änderungen der technischen Infrastruktur, eingesetzter Dienste oder
            rechtlicher Anforderungen wird diese Erklärung entsprechend aktualisiert.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}