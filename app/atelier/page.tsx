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
          The workshop behind LIGNORAE
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
          LIGNORAE is a small independent atelier based in Munich,
          focused on handcrafted fountain pens made from carefully
          selected woods with character, history, and permanence.
        </p>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10">
          <div className="aspect-[4/3] bg-[url('/atelier.jpg')] bg-cover bg-center" />
        </div>
<div className="mt-20 grid gap-8 md:grid-cols-2">
  <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
      What we do
    </p>

    <h2 className="mb-5 text-3xl font-light">
      Elegant writing instruments made in small numbers
    </h2>

    <p className="leading-relaxed text-[#d0cabf]">
      LIGNORAE focuses on handcrafted fountain pens made in small numbers,
      with attention to wood selection, shaping, finishing, assembly, and
      the quiet discipline of repeated improvement.
    </p>
  </div>

  <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
      How we work
    </p>

    <h2 className="mb-5 text-3xl font-light">
      Slowly, visibly, passionately
    </h2>

    <p className="leading-relaxed text-[#d0cabf]">
      The atelier is still growing. Experiments, failures, sanding marks,
      finish tests, and material studies are part of the process. The goal
      is not speed, but a writing instrument that feels considered.
    </p>
  </div>
</div>
      </section>

      <Footer />
    </main>
  );
}