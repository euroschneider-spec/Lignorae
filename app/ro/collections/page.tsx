import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function CollectionsPage() {
  const latestPieces = await prisma.piece.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-7xl flex-1 px-6 pb-24 pt-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Colecții
        </p>

        <h1 className="mb-16 text-5xl font-light md:text-6xl">
          Povești lucrate în lemn
        </h1>

        <div className="grid gap-10 md:grid-cols-3">
          <Link
            href="/ro/collections/origin"
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
                Lemn nobil, atent selecționat, transformat în instrumente de
                scris atemporale, cu un caracter curat și elegant.
              </p>
            </div>
          </Link>

          <Link
            href="/ro/collections/sonora"
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
                Stilouri realizate din instrumente muzicale recuperate, păstrând
                rezonanța, memoria și moștenirea artistică.
              </p>
            </div>
          </Link>

          <Link
            href="/ro/collections/sacra"
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
                Lemn istoric rar, provenit din restaurări de edificii sacre, documentat și
                renăscut ca instrument de scris durabil.
              </p>
            </div>
          </Link>
        </div>

        <section className="mt-28">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
                Piese individuale
              </p>

              <h2 className="text-4xl font-light md:text-5xl">
                Instrumente recent adăugate
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-[#cfc8bc] md:text-base">
              Instrumente de scris realizate manual în atelierul LIGNORAE,
              create din materiale rare și lemn cu proveniență documentată.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
            {latestPieces.map((piece) => {
              const translation = piece.translations.find(
                (entry) => entry.locale === "RO"
              );

              const title = translation?.title || piece.title;
              const shortDescription =
                translation?.shortDescription || piece.shortDescription;

              return (
                <Link
                  key={piece.id}
                  href={`/ro/pieces/${piece.slug}`}
                  className="group overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={piece.image}
                      alt={title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </div>

                  <div className="p-8">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c6a66a]">
                      {piece.collection}
                    </p>

                    <h3 className="mb-4 text-2xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                      {title}
                    </h3>

                    <p className="leading-relaxed text-[#cfc8bc]">
                      {shortDescription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}