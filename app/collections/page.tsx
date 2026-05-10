import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Available";
  if (normalizedStatus === "reserved") return "Reserved";
  if (normalizedStatus === "sold") return "Sold";
  if (normalizedStatus === "draft") return "Draft";
  if (normalizedStatus === "prototype-archive") return "Prototype archive";

  return status;
}

export default async function CollectionsPage() {
  const latestPieces = await prisma.piece.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-7xl flex-1 px-6 pb-24 pt-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Collections
        </p>

        <h1 className="mb-16 text-5xl font-light md:text-6xl">
          Crafted Stories
        </h1>

        <div className="grid gap-10 md:grid-cols-3">
          <Link
            href="/collections/origin"
            className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-[url('/origin.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <h2 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                ORIGIN
              </h2>
              <p className="leading-relaxed text-[#cfc8bc]">
                Carefully selected noble woods transformed into timeless writing
                instruments with clean, elegant character.
              </p>
            </div>
          </Link>
          <Link
            href="/collections/sonora"
            className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-[url('/sonora.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <h2 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                SONORA
              </h2>
              <p className="leading-relaxed text-[#cfc8bc]">
                Fountain pens crafted from reclaimed musical instruments,
                preserving resonance, memory, and artistic heritage.
              </p>
            </div>
          </Link>
          <Link
            href="/collections/sacra"
            className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-[url('/sacra.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <h2 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                SACRA
              </h2>
              <p className="leading-relaxed text-[#cfc8bc]">
                Rare historic woods from sacred restorations, documented and
                reborn as instruments of permanence.
              </p>
            </div>
          </Link>
        </div>

        <section className="mt-28 border-t border-[#4a3522]/70 pt-20">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
                Individual instruments
              </p>
              <h2 className="text-4xl font-light md:text-5xl">
                Pieces from the atelier
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-[#cfc8bc]">
              Each LIGNORAE instrument may receive its own archive page, with
              material notes, photographs, specifications, and availability.
            </p>
          </div>
          {latestPieces.length === 0 ? (
            <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-10 text-center">
              <p className="text-lg leading-relaxed text-[#d0cabf]">
                No individual instruments have been added to the archive yet.
              </p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
              {latestPieces.map((piece) => (
                <Link
                  key={piece.id}
                  href={`/pieces/${piece.slug}`}
                  className="group overflow-hidden rounded-3xl border border-[#c6a66a]/30 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/70 hover:shadow-[0_0_30px_rgba(198,166,106,0.14)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${piece.image}')` }}
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
          )}
        </section>
      </section>

      <Footer />
    </main>
  );
}