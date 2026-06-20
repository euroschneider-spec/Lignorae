import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { publicPieceWhere } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "The First One Hundred — LIGNORAE",
  description:
    "Explore The First One Hundred, the founding LIGNORAE edition: one hundred individually registered writing instruments handcrafted in Munich.",
  alternates: {
    canonical: "/collections",
    languages: {
      en: "/collections",
      de: "/de/collections",
      ro: "/ro/collections",
      "x-default": "/collections",
    },
  },
  openGraph: {
    title: "The First One Hundred — LIGNORAE",
    description:
      "The founding LIGNORAE edition: one hundred individually registered writing instruments handcrafted in Munich.",
    url: "/collections",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE The First One Hundred founding edition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The First One Hundred — LIGNORAE",
    description:
      "The founding LIGNORAE edition: one hundred individually registered writing instruments handcrafted in Munich.",
    images: ["/og-image.jpg"],
  },
};

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

function getCollectionLabel(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "basics") return "THE FIRST ONE HUNDRED";
  if (normalizedCollection === "basic") return "THE FIRST ONE HUNDRED";
  if (normalizedCollection === "the first one hundred") {
    return "THE FIRST ONE HUNDRED";
  }

  if (normalizedCollection === "forma") return "FORMA";
  if (normalizedCollection === "origins") return "ORIGINS";
  if (normalizedCollection === "natura") return "NATURA";

  return "LIGNORAE";
}

export default async function CollectionsPage() {
  const [latestPieces, basicsLatest] = await Promise.all([
    prisma.piece.findMany({
      where: publicPieceWhere({
        OR: [
          { collection: { equals: "BASICS", mode: "insensitive" } },
          { collection: { equals: "BASIC", mode: "insensitive" } },
          {
            collection: {
              equals: "THE FIRST ONE HUNDRED",
              mode: "insensitive",
            },
          },
        ],
      }),
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    prisma.piece.findFirst({
      where: publicPieceWhere({
        OR: [
          { collection: { equals: "BASICS", mode: "insensitive" } },
          { collection: { equals: "BASIC", mode: "insensitive" } },
          {
            collection: {
              equals: "THE FIRST ONE HUNDRED",
              mode: "insensitive",
            },
          },
        ],
      }),
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const futureCollections = [
    {
      title: "ORIGINS",
      eyebrow: "Future collection",
      statement: "Rare woods, provenance and expressive material depth.",
      description:
        "ORIGINS will return as a provenance-led collection for exceptional woods and documented material histories.",
    },
    {
      title: "NATURA",
      eyebrow: "Future collection",
      statement: "Natural woods, direct tactility and quiet restraint.",
      description:
        "NATURA remains reserved for work centred on honest surfaces, selected woods and a calmer material language.",
    },
    {
      title: "FORMA",
      eyebrow: "Future collection",
      statement: "Blackened surfaces, sculptural stillness and stronger forms.",
      description:
        "FORMA remains the intended home for the more sculptural LIGNORAE language, including carbonised surfaces and reduced silhouettes.",
    },
  ];

  const heroImage = basicsLatest?.image ?? "/gallery_landing.jpg";

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Founding edition
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              The First One Hundred.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            One hundred individually registered writing instruments created to
            establish the foundation of the atelier. This first edition will not
            be extended once the hundred pieces have been completed.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-28">
        <Link
          href="#available-pieces"
          className="group grid overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35 md:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative min-h-[480px] overflow-hidden bg-[#eeeae2]">
            <Image
              src={heroImage}
              alt="The First One Hundred founding edition"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
              priority
            />
          </div>

          <div className="flex min-h-[480px] flex-col justify-between p-8 md:p-12">
            <div>
              <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-black/95">
                Limited to 100 pieces
              </p>

              <h2 className="mb-8 text-5xl font-light leading-[0.9] tracking-[-0.06em] text-black md:text-7xl">
                LIGNORAE - the first one hundred
              </h2>

              <p className="max-w-xl text-2xl font-light leading-tight tracking-[-0.04em] text-black md:text-3xl">
                The founding edition of the atelier.
              </p>
            </div>

            <div className="mt-14">
              <p className="max-w-xl text-base font-normal leading-8 text-black/95">
                Created as the first ever LIGNORAE edition, each piece is
                handcrafted, individually inspected and registered. The series
                exists to open the atelier's first chapter, not to replace the
                future collections.
              </p>

              <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-black/95 transition group-hover:text-black">
                View available pieces →
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.75fr_1.25fr] md:items-start">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Future collections
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              The original collection structure remains in development.
            </h2>
          </div>

          <div className="grid gap-5">
            {futureCollections.map((collection) => (
              <div
                key={collection.title}
                className="border border-black/15 bg-[#f7f5f0] p-7"
              >
                <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/80">
                  {collection.eyebrow}
                </p>
                <h3 className="mb-4 text-3xl font-light tracking-[-0.04em] text-black">
                  {collection.title}
                </h3>
                <p className="mb-4 text-lg font-light leading-tight tracking-[-0.03em] text-black">
                  {collection.statement}
                </p>
                <p className="text-sm font-normal leading-7 text-black/90">
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="available-pieces"
        className="mx-auto w-full max-w-[1500px] flex-1 px-9 py-28"
      >
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Available pieces
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] text-black md:text-6xl">
              From The First One Hundred
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Each piece may receive its own archive page with photographs,
            material notes, specifications, availability and registry details.
          </p>
        </div>

        {latestPieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              The first pieces of this edition are being prepared for the
              archive.
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
                <div className="overflow-hidden bg-[#eeeae2]">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    width={900}
                    height={700}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
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

                  <p className="mb-7 text-sm font-normal leading-7 text-black/95">
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
