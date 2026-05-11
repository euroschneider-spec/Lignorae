import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Verfügbar";
  if (normalizedStatus === "reserved") return "Reserviert";
  if (normalizedStatus === "sold") return "Verkauft";
  if (normalizedStatus === "draft") return "Entwurf";
  if (normalizedStatus === "prototype-archive") return "Prototyp-Archiv";
  if (normalizedStatus === "archived") return "Archiviert";

  return status;
}

export default async function GermanOriginPage() {
  const originPieces = await prisma.piece.findMany({
    where: {
      collection: {
        equals: "Origin",
        mode: "insensitive",
      },
      status: {
        notIn: ["draft", "archived"],
      },
    },
    include: {
      translations: {
        where: {
          locale: "DE",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <Link
          href="/de/collections"
          className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] hover:text-[#f5f1e8]"
        >
          ← Kollektionen
        </Link>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Kollektion
        </p>

        <h1 className="mb-8 text-6xl font-light md:text-7xl">ORIGIN</h1>

        <p className="mb-16 max-w-4xl text-xl leading-relaxed text-[#d0cabf]">
          Edle Hölzer, ausgewählt für natürliche Schönheit, Struktur, Wärme und
          zeitlosen Charakter. ORIGIN bildet die stille Grundlage von LIGNORAE.
        </p>

        <div className="group overflow-hidden rounded-3xl border border-[#c6a66a]/35 bg-[#21170f] shadow-[0_0_35px_rgba(198,166,106,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/70 hover:shadow-[0_0_45px_rgba(198,166,106,0.16)]">
          <div className="relative aspect-[16/8] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/origin.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Materialcharakter</h2>
            <p className="leading-relaxed text-[#d0cabf]">
              Jedes Stück entsteht aus sorgfältig ausgewähltem Holz, gewählt
              nach Maserung, Dichte, Farbe und der Fähigkeit, zu einem
              verfeinerten Schreibinstrument für den Alltag zu werden.
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <h2 className="mb-5 text-3xl font-light">Gedanke</h2>
            <p className="leading-relaxed text-[#d0cabf]">
              ORIGIN richtet sich an Menschen, die Zurückhaltung schätzen:
              Material, Balance, Handwerk und eine ruhige Eleganz ohne
              unnötige Verzierung.
            </p>
          </div>
        </div>

        <section className="mt-24 border-t border-[#4a3522]/70 pt-20">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
                Origin Schreibinstrumente
              </p>

              <h2 className="text-4xl font-light md:text-5xl">
                Einzelstücke
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-[#cfc8bc]">
              Jedes Instrument der ORIGIN-Kollektion erhält eine eigene
              Archivseite mit Fotografien, Materialnotizen, Spezifikationen und
              Verfügbarkeit.
            </p>
          </div>

          {originPieces.length === 0 ? (
            <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-10 text-center">
              <p className="text-lg leading-relaxed text-[#d0cabf]">
                Es wurden noch keine ORIGIN-Stücke zum Archiv hinzugefügt.
              </p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              {originPieces.map((piece) => {
                const translation = piece.translations[0];
                const title = translation?.title || piece.title;
                const collection = translation?.collection || piece.collection;
                const shortDescription =
                  translation?.shortDescription || piece.shortDescription;

                return (
                  <Link
                    key={piece.id}
                    href={`/de/pieces/${piece.slug}`}
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
                          {collection.toUpperCase()}
                        </span>

                        <span className="rounded-full border border-[#c6a66a]/40 px-3 py-1">
                          {getStatusLabel(piece.status)}
                        </span>
                      </div>

                      <h3 className="mb-4 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                        {title}
                      </h3>

                      <p className="mb-6 leading-relaxed text-[#cfc8bc]">
                        {shortDescription}
                      </p>

                      <p className="text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                        Instrument ansehen →
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </section>

      <Footer />
    </main>
  );
}