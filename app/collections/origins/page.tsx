import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { publicPieceWhere } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "ORIGINS — Expressive Wood Fountain Pens",
  description:
    "ORIGINS is the expressive, most sensitive wood collection by LIGNORAE: refined fountain pens shaped from exotic grain, natural depth and material character in Munich.",
  alternates: {
    canonical: "/collections/origins",
    languages: {
      en: "/collections/origins",
      de: "/de/collections/origins",
      ro: "/ro/collections/origins",
      "x-default": "/collections/origins",
    },
  },
  openGraph: {
    title: "ORIGINS — Expressive Wood Fountain Pens by LIGNORAE",
    description:
      "Refined fountain pens shaped from exotic grain, natural depth and material character in Munich.",
    url: "/collections/origins",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ORIGINS expressive wood fountain pen by LIGNORAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORIGINS — Expressive Wood Fountain Pens by LIGNORAE",
    description:
      "Refined fountain pens shaped from exotic grain, natural depth and material character in Munich.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function OriginsPage() {
  const [pieces, latestPiece] = await Promise.all([
    prisma.piece.findMany({
      where: publicPieceWhere({ collection: "ORIGINS" }),
      orderBy: { createdAt: "desc" },
    }),
    prisma.piece.findFirst({
      where: publicPieceWhere({ collection: "ORIGINS" }),
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const heroImage = latestPiece?.image ?? "/origin.jpg";
  const heroAlt = latestPiece
    ? `${latestPiece.title} — ORIGINS by LIGNORAE`
    : "ORIGINS exotic wood writing object";

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Middle range collection
            </p>
            <h1 className="max-w-3xl text-6xl font-light leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              ORIGINS
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            ORIGINS is built around expressive woods with visible character:
            exotic grain, depth, colour and natural variation shaped into
            refined fountain pens.
          </p>
        </div>

        <div className="group mx-auto mt-24 max-w-[1200px] overflow-hidden bg-[#eeeae2]">
          <Image
            src={heroImage}
            alt={heroAlt}
            width={1500}
            height={1000}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="h-auto max-h-[620px] w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
          />
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">
          <article className="border-l border-black/15 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Grain
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              The visual language comes from the wood itself: figure, rhythm,
              contrast and natural perfect imperfection.
            </p>
          </article>

          <article className="border-l border-black/15 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Balance
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              ORIGINS keeps the sculptural discipline of LIGNORAE while allowing
              the material to remain visibly warm and expressive.
            </p>
          </article>

          <article className="border-l border-black/15 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Refinement
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              Surfaces are finished with restraint: polished enough to honour
              the grain, quiet enough to avoid excess.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Available objects
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] md:text-6xl">
              Current ORIGINS pieces
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Each piece depends on the character of the blank. No two ORIGINS
            objects are expected to look identical.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/10 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              No ORIGINS objects have been added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => (
              <Link
                key={piece.id}
                href={`/pieces/${piece.slug}`}
                className="group overflow-hidden border border-black/10 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/25"
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
                  <h3 className="mb-4 text-3xl font-light tracking-[-0.04em]">
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
