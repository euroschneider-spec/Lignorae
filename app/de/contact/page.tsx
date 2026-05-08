import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Kontakt
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Verfügbarkeit anfragen
        </h1>

        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
          Die erste LIGNORAE Edition befindet sich derzeit in Vorbereitung.
          Anfragen zu Vorbestellungen, Einzelanfertigungen, Kooperationen und
          ausgewählten Händlergesprächen sind bereits möglich.
        </p>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Name
              </label>
              <input
                type="text"
                placeholder="Ihr Name"
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                E-Mail
              </label>
              <input
                type="email"
                placeholder="ihre@email.de"
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Art der Anfrage
              </label>
              <select className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none focus:border-[#c6a66a]">
                <option>Vorbestellungsanfrage</option>
                <option>Einzelanfertigung</option>
                <option>Handel / B2B Kooperation</option>
                <option>Presse / Partnerschaft</option>
                <option>Sonstiges</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Nachricht
              </label>
              <textarea
                rows={7}
                placeholder="Beschreiben Sie kurz, wonach Sie suchen..."
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <a
              href="mailto:info@lignorae.com?subject=LIGNORAE%20Enquiry"
              className="inline-block rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black"
            >
              Anfrage senden
            </a>

            <p className="mt-5 text-sm leading-relaxed text-[#9f9588]">
              Dieses Anfrageformular ist für den Launch vorbereitet. Bis zur
              Aktivierung kontaktieren Sie das Atelier bitte direkt per E-Mail.
            </p>
          </form>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
              Direkte E-Mail
            </p>

            <a
              href="mailto:info@lignorae.com"
              className="text-2xl font-light hover:text-[#c6a66a]"
            >
              info@lignorae.com
            </a>

            <div className="mt-10 border-t border-[#4a3522]/70 pt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                Erste Edition
              </p>

              <p className="leading-relaxed text-[#d0cabf]">
                Die ersten LIGNORAE Schreibinstrumente entstehen in kleinen
                Mengen. Frühe Anfragen werden persönlich bearbeitet; Material,
                Verfügbarkeit, Preis und Lieferung werden vor jeder
                Auftragsbestätigung individuell besprochen.
              </p>
            </div>

            <div className="mt-10 border-t border-[#4a3522]/70 pt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                Standort
              </p>

              <p className="leading-relaxed text-[#d0cabf]">
                LIGNORAE Atelier
                <br />
                München, Deutschland
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}