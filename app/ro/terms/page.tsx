import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Terms & Conditions
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          General terms
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Scope
    </h2>

    <p className="leading-relaxed">
      LIGNORAE Atelier creates handcrafted writing instruments produced in
      small numbers and often involving natural, reclaimed, or historically
      sourced materials.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Product character
    </h2>

    <p className="leading-relaxed">
      Product appearance, grain, texture, coloration, and minor visual
      variations may differ naturally from piece to piece due to the
      characteristics of wood and handcrafted finishing processes.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Availability and orders
    </h2>

    <p className="leading-relaxed">
      Availability, pricing, production timelines, payment terms, and shipping
      details are confirmed individually before any order is finalized.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Commercial launch
    </h2>

    <p className="leading-relaxed">
      Full commercial terms, payment conditions, customer rights, and detailed
      order procedures will be updated before official online sales begin.
    </p>
  </div>
</div>
      </section>

      <Footer />
    </main>
  );
}