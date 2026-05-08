import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalNoticePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Impressum
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Rechtliche Angaben
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Angaben zum Unternehmen
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Atelier
              <br />
              München, Deutschland
              <br />
              Die vollständigen rechtlichen Unternehmensangaben werden nach
              der offiziellen Gewerbe- bzw. Unternehmensregistrierung ergänzt.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Kontakt
            </h2>

            <p className="leading-relaxed">
              E-Mail:
              <br />
              info@lignorae.com
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Verantwortlich für den Inhalt
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Atelier
              <br />
              81673 München, Deutschland
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Haftung für Links
            </h2>

            <p className="leading-relaxed">
              Externe Links dienen ausschließlich der Information. Für die
              Inhalte verlinkter Seiten sind allein die jeweiligen Betreiber
              verantwortlich.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}