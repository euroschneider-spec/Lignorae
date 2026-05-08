import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Termeni și condiții
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Termeni generali
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Domeniu de aplicare
    </h2>

    <p className="leading-relaxed">
      LIGNORAE Atelier creează instrumente de scris realizate manual, produse
      în serii foarte reduse și implicând adesea materiale naturale, recuperate sau
      cu proveniență istorică.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Caracterul produsului
    </h2>

    <p className="leading-relaxed">
      Aspectul produsului, fibra, textura, culoarea și micile variații vizuale
      pot și vor diferi natural de la o piesă la alta, datorită caracteristicilor
      lemnului și proceselor de lucru manual.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Disponibilitate și comenzi
    </h2>

    <p className="leading-relaxed">
      Disponibilitatea, prețurile, termenele de producție, condițiile de plată
      și detaliile de livrare sunt confirmate individual înainte ca o comandă
      să fie finalizată.
    </p>
  </div>

  <div>
    <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
      Lansare comercială
    </h2>

    <p className="leading-relaxed">
      Termenii comerciali compleți, condițiile de plată, drepturile clienților
      și procedurile detaliate de comandă vor fi actualizate înaintea lansării
      oficiale a vânzărilor online.
    </p>
  </div>
</div>
      </section>

      <Footer />
    </main>
  );
}