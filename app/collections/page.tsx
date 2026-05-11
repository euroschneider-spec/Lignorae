import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "FORMA",
    href: "/collections/forma",
    image: "/gallery_landing.jpg",
    eyebrow: "Flagship collection",
    statement: "Blackened surfaces. Sculptural stillness. Cocoon forms.",
    description:
      "FORMA is the defining LIGNORAE language: yakisugi surfaces, reduced silhouettes and a museum-like presence shaped around the act of writing.",
  },
  {
    title: "ORIGINS",
    href: "/collections/origins",
    image: "/origin.jpg",
    eyebrow: "Expressive woods",
    statement: "Exotic grain, depth and material character.",
    description:
      "ORIGINS is built around selected woods whose figure, colour and density give each object its own visual rhythm.",
  },
  {
    title: "NATURA",
    href: "/collections/natura",
    image: "/natura.jpg",
    eyebrow: "Essential material",
    statement: "Raw warmth. Minimal intervention. Honest texture.",
    description:
      "NATURA keeps the work direct: local woods, tactile surfaces and a more accessible expression of the LIGNORAE object language.",
  },
];

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Available";
  if (normalizedStatus === "reserved") return "Reserved";
  if (normalizedStatus === "sold") return "Sold";
  if (normalizedStatus === "draft") return "Draft";
  if (normalizedStatus === "prototype-archive") return "Prototype archive";

  return status;
}

function getCollectionLabel(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "forma") return "FORMA";
  if (normalizedCollection === "origins") return "ORIGINS";
  if (normalizedCollection === "natura") return "NATURA";

  return "UNASSIGNED";
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

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Collections
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Three material languages.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            LIGNORAE is organised around three clear expressions: the sculptural
            black language of FORMA, the expressive woods of ORIGINS and the
            direct material honesty of NATURA.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-28">
        <div className="grid gap-10">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group grid overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35 md:grid-cols-[1.05fr_0.95fr]"
            >
              <div
                className={`relative min-h-[420px] overflow-hidden bg-[#eeeae2] ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={collection.image}
                  alt={`${collection.title} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex min-h-[420px] flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-black/95">
                    {collection.eyebrow}
                  </p>

                  <h2 className="mb-8 text-5xl font-light leading-[0.9] tracking-[-0.06em] text-black md:text-7xl">
                    {collection.title}
                  </h2>

                  <p className="max-w-xl text-2xl font-light leading-tight tracking-[-0.04em] text-black md:text-3xl">
                    {collection.statement}
                  </p>
                </div>

                <div className="mt-14">
                  <p className="max-w-xl text-base font-normal leading-8 text-black/95">
                    {collection.description}
                  </p>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-black/95 transition group-hover:text-black">
                    View collection →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.75fr_1.25fr] md:items-center">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Future limited lines
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Reserved for provenance-based work.
            </h2>
          </div>

          <div className="space-y-7 text-base font-normal leading-8 text-black/95 md:text-lg">
            <p>
              SONORA and SACRA remain reserved for future limited work, once
              suitable musical or sacred historical woods are sourced and
              documented properly.
            </p>
            <p>
              Until then, the active LIGNORAE structure remains deliberately
              focused: FORMA, ORIGINS and NATURA.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Individual objects
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] text-black md:text-6xl">
              Pieces from the atelier
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Each object may receive its own archive page with material notes,
            photographs, specifications and availability.
          </p>
        </div>

        {latestPieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              No individual objects have been added to the archive yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPieces.map((piece) => (
              <Link
                key={piece.id}
                href={`/pieces/${piece.slug}`}
                className="group overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeae2]">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-8">
                  <div className="mb-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-black/95">
                    <span className="border border-black/15 px-3 py-1">
                      {getCollectionLabel(piece.collection)}
                    </span>
                    <span className="border border-black/15 px-3 py-1">
                      {getStatusLabel(piece.status)}
                    </span>
                  </div>

                  <h3 className="mb-4 text-3xl font-light tracking-[-0.04em] text-black">
                    {piece.title}
                  </h3>

                  <p className="mb-7 text-sm font-light leading-7 text-black/95">
                    {piece.shortDescription}
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.35em] text-black/95 transition group-hover:text-black">
                    View object →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}