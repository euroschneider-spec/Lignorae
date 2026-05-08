import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SonoraPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <Link
          href="/ro/collections"
          className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
        >
          ← Colecții
        </Link>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Colecție
        </p>

        <h1 className="mb-8 text-6xl font-light md:text-7xl">SONORA</h1>

        <p className="mb-16 max-w-4xl text-xl leading-relaxed text-[#d0cabf]">
          Instrumente de scris create din lemn recuperat din instrumente muzicale sortite altfel pierii, purtând urme de rezonanță, interpretare, tăcere și timp.
        </p>

        <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
          <div className="relative aspect-[16/8] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/sonora.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Caracterul materialului</h2>

            <p className="leading-relaxed text-[#d0cabf]">
              SONORA se concentrează pe lemn legat de muzică: instrumente,
              fragmente, corpuri sau alte surse materiale în care sunetul și
              meșteșugul au lăsat deja o urmă.
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Idee</h2>

            <p className="leading-relaxed text-[#d0cabf]">
              Fiecare piesă este gândită să păstreze ceva din viața ei
              anterioară: nu ca simplă decorațiune, ci ca o continuare tăcută
              a ritmului, atingerii și memoriei artistice.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}