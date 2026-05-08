import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AtelierPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-5xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Atelier
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Atelierul LIGNORAE
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
          LIGNORAE este un mic atelier independent din München,
          dedicat producției artizanale de stilouri din lemn atent selecționat,
          cu caracter, istorie și permanență.
        </p>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10">
          <div className="aspect-[4/3] bg-[url('/atelier.jpg')] bg-cover bg-center" />
        </div>
<div className="mt-20 grid gap-8 md:grid-cols-2">
  <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
      Ce facem
    </p>

    <h2 className="mb-5 text-3xl font-light">
      Instrumente de scris elegante, realizate în număr redus
    </h2>

    <p className="leading-relaxed text-[#d0cabf]">
      LIGNORAE se concentrează pe stilouri realizate manual în serii foarte mici,
      cu atenție pentru selecția lemnului, formare, strunjire și asamblare. Disciplina noastră vine din tăcerea îmbunătățirii prin efort susținut constant.
    </p>
  </div>

  <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
      Cum lucrăm
    </p>

    <h2 className="mb-5 text-3xl font-light">
      Încet, vizibil, cu pasiune
    </h2>

    <p className="leading-relaxed text-[#d0cabf]">
      Atelierul este încă în creștere. Încercările, greșelile, urmele de
      șlefuire, testele de suprafață și studiul materialelor fac parte din
      proces. Scopul nu este viteza, ci un instrument de scris care nu doar că se simte
      gândit cu atenție, ci chiar este gândit și executat cu atenția izvorâtă din pasiune.
    </p>
  </div>
</div>
      </section>

      <Footer />
    </main>
  );
}