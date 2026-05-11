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
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "FORMA",
    href: "/collections/forma",
    image: "/gallery_landing.jpg",
    eyebrow: "Top tier",
    description:
      "Yakisugi surfaces, black sculptural presence and cocoon presentation forms. The flagship language of LIGNORAE.",
  },
  {
    title: "ORIGINS",
    href: "/collections/origins",
    image: "/origin.jpg",
    eyebrow: "Middle range",
    description:
      "Exotic and expressive woods selected for grain, depth and material character, shaped into refined writing objects.",
  },
  {
    title: "NATURA",
    href: "/collections/natura",
    image: "/natura.jpg",
    eyebrow: "Lower range",
    description:
      "Raw local woods with honest texture and minimal intervention: simple, tactile and accessible LIGNORAE pieces.",
  },
];

const futureLines = ["SONORA", "SACRA"];

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
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-24 pt-40">
        <div className="mb-20 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/40">
              Collections
            </p>
            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Three material languages.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/55 md:text-lg">
            LIGNORAE is organised around form, material and presence: from the
            sculptural black language of FORMA to expressive exotic woods and
            honest natural pieces.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group block overflow-hidden border border-black/10 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/25"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeae2]">
                <Image
                  src={collection.image}
                  alt={`${collection.title} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-black/40">
                  {collection.eyebrow}
                </p>
                <h2 className="mb-5 text-4xl font-light tracking-[-0.04em]">
                  {collection.title}
                </h2>
                <p className="text-sm font-light leading-7 text-black/55">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-24 border-y border-black/10 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-black/35">
                Future limited lines
              </p>
              <p className="max-w-3xl text-sm font-light leading-7 text-black/55">
                SONORA and SACRA remain reserved for future provenance-based
                work, once suitable musical or sacred historical woods are
                sourced and documented properly.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {futureLines.map((line) => (
                <span
                  key={line}
                  className="border border-black/15 px-5 py-2 text-[10px] uppercase tracking-[0.38em] text-black/40"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/40">
                Individual objects
              </p>
              <h2 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                Pieces from the atelier
              </h2>
            </div>
            <p className="max-w-xl text-base font-light leading-8 text-black/55">
              Each LIGNORAE object may receive its own archive page with
              material notes, photographs, specifications and availability.
            </p>
          </div>

          {latestPieces.length === 0 ? (
            <div className="border border-black/10 bg-[#fbfaf7] p-10 text-center">
              <p className="text-base font-light leading-7 text-black/55">
                No individual objects have been added to the archive yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPieces.map((piece) => (
                <Link
                  key={piece.id}
                  href={`/pieces/${piece.slug}`}
                  className="group overflow-hidden border border-black/10 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/25"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeae2]">
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8">
                    <div className="mb-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-black/40">
                      <span className="border border-black/15 px-3 py-1">
                        {piece.collection.toUpperCase()}
                      </span>
                      <span className="border border-black/15 px-3 py-1">
                        {getStatusLabel(piece.status)}
                      </span>
                    </div>

                    <h3 className="mb-4 text-3xl font-light tracking-[-0.04em]">
                      {piece.title}
                    </h3>

                    <p className="mb-7 text-sm font-light leading-7 text-black/55">
                      {piece.shortDescription}
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.35em] text-black/55 transition group-hover:text-black">
                      View object →
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