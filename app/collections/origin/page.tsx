import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getPiecesByCollection,
  getStatusLabel,
} from "@/lib/pieces";

export default function OriginPage() {
  const originPieces = getPiecesByCollection("origin");
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <Link
          href="/collections"
          className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] hover:text-[#f5f1e8]"
        >
          ← Collections
        </Link>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Collection
        </p>

        <h1 className="mb-8 text-6xl font-light md:text-7xl">ORIGIN</h1>

        <p className="mb-16 max-w-4xl text-xl leading-relaxed text-[#d0cabf]">
          Noble woods selected for their natural beauty, structure, warmth, and
          timeless character. ORIGIN is the quiet foundation of LIGNORAE.
        </p>

        <div className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60">
          <div className="aspect-[16/8] bg-[url('/origin.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Material character</h2>
            <p className="leading-relaxed text-[#d0cabf]">
              Each piece is shaped from carefully selected wood, chosen for its
              grain, density, colour, and ability to become a refined daily
              writing instrument.
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Purpose</h2>
            <p className="leading-relaxed text-[#d0cabf]">
              ORIGIN is designed for those who value understatement: material,
              balance, craftsmanship, and a calm elegance without unnecessary
              ornament.
            </p>
          </div>
        </div>

        <section className="mt-24 border-t border-[#4a3522]/70 pt-20">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
                Origin instruments
              </p>

              <h2 className="text-4xl font-light md:text-5xl">
                Individual pieces
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-[#cfc8bc]">
              Each instrument in the ORIGIN collection may receive its own
              archive page, with photographs, material notes, specifications,
              and availability.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {originPieces.map((piece) => (
              <Link
                key={piece.slug}
                href={piece.href}
                className="group overflow-hidden rounded-3xl border border-[#c6a66a]/30 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/70 hover:shadow-[0_0_30px_rgba(198,166,106,0.14)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${piece.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                </div>

                <div className="p-8">
                  <div className="mb-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-[#c6a66a]">
                    <span className="rounded-full border border-[#c6a66a]/40 px-3 py-1">
                      {piece.collection.toUpperCase()}
                    </span>

                    <span className="rounded-full border border-[#c6a66a]/40 px-3 py-1">
                      {getStatusLabel(piece.status)}
                    </span>
                  </div>

                  <h3 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                    {piece.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-[#cfc8bc]">
                    {piece.shortDescription}
                  </p>

                  <p className="text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                    View instrument →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}