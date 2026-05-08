import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Livrare
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Informații despre livrare
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Confirmare individuală
            </h2>

            <p className="leading-relaxed">
              Instrumentele de scris LIGNORAE sunt realizate în serii foarte reduse.
              Opțiunile de livrare, timpii de livrare și costurile sunt
              confirmate individual înainte ca o comandă să fie finalizată.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Ambalare
            </h2>

            <p className="leading-relaxed">
              Fiecare instrument de scris este pregătit și ambalat cu grijă,
              în funcție de natura produsului, material și destinație.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Disponibilitate
            </h2>

            <p className="leading-relaxed">
              Livrarea în Uniunea Europeană și către anumite destinații
              internaționale poate fi posibilă după confirmare individuală.
              Condițiile finale de livrare vor fi actualizate înaintea lansării
              comerciale.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}