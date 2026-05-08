import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalNoticePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Informații legale
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Informații juridice
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Informații despre atelier
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Atelier
              <br />
              München, Germania
              <br />
              Informațiile juridice complete vor fi actualizate după
              înregistrarea oficială a activității.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Contact
            </h2>

            <p className="leading-relaxed">
              E-mail:
              <br />
              info@lignorae.com
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Responsabil pentru conținut
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Atelier
              <br />
              München, Germania
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Responsabilitate pentru linkuri
            </h2>

            <p className="leading-relaxed">
              Linkurile externe sunt oferite exclusiv în scop informativ.
              Responsabilitatea pentru conținutul paginilor externe aparține
              exclusiv operatorilor respectivelor website-uri.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}