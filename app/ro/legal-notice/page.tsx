import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalNoticePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Legal Notice
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Legal information
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Business information
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Atelier
              <br />
              Munich, Germany
              <br />
              Full legal business information will be updated after official
              company registration.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Contact
            </h2>

            <p className="leading-relaxed">
              Email:
              <br />
              info@lignorae.com
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Responsible for content
            </h2>

            <p className="leading-relaxed">
              LIGNORAE Atelier
              <br />
              Munich, Germany
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Liability for links
            </h2>

            <p className="leading-relaxed">
              External links are provided for informational purposes only.
              Responsibility for linked content lies solely with the respective
              website operators.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}