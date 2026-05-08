import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WithdrawalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Drept de retragere
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Dreptul de retragere al consumatorilor
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <p className="leading-relaxed">
            Clienții aflați în Uniunea Europeană pot avea dreptul de a se
            retrage din anumite contracte la distanță în termen de 14 zile,
            conform reglementărilor aplicabile privind protecția consumatorilor.
          </p>

          <p className="leading-relaxed">
            Anumite produse realizate manual, personalizate, comandate special
            sau fabricate la cererea clientului pot fi exceptate de la dreptul
            de retragere, conform legislației aplicabile.
          </p>

          <p className="leading-relaxed">
            Condițiile detaliate de retragere, procedurile și instrucțiunile de
            retur vor fi publicate înaintea lansării comerciale a comenzilor
            online.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}