import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "FORMA — Sculptural Black Fountain Pens",
  description:
    "FORMA is the sculptural black language of LIGNORAE: yakisugi surfaces, quiet silhouettes and cocoon presentation forms handcrafted in Munich.",
  alternates: {
    canonical: "/collections/forma",
    languages: {
      en: "/collections/forma",
      de: "/de/collections/forma",
      ro: "/ro/collections/forma",
      "x-default": "/collections/forma",
    },
  },
  openGraph: {
    title: "FORMA — Sculptural Black Fountain Pens by LIGNORAE",
    description:
      "Yakisugi surfaces, quiet silhouettes and cocoon presentation forms handcrafted in Munich.",
    url: "/collections/forma",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FORMA sculptural black fountain pen by LIGNORAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Sculptural Black Fountain Pens by LIGNORAE",
    description:
      "Yakisugi surfaces, quiet silhouettes and cocoon presentation forms handcrafted in Munich.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function FormaPage() {
  const [pieces, latestPiece] = await Promise.all([
    prisma.piece.findMany({
      where: { collection: { equals: "FORMA", mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.piece.findFirst({
      where: { collection: { equals: "FORMA", mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const heroImage = latestPiece?.image ?? "/gallery_landing.jpg";
  const heroAlt = latestPiece?.title
    ? `${latestPiece.title} — FORMA sculptural writing object`
    : "FORMA sculptural writing object";

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Top tier collection
            </p>
            <h1 className="max-w-3xl text-6xl font-light leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              FORMA
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            FORMA is the sculptural black language of LIGNORAE: yakisugi
            surfaces, quiet silhouettes and cocoon presentation forms shaped as
            objects of presence.
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
            className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
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
              Fire
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              The surface is darkened and opened instead of being forced into a
              conventional high-gloss finish.
            </p>
          </article>

          <article className="border-l border-black/15 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Cocoon
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              The presentation form is part of the object: protective,
              sculptural and intentionally quiet.
            </p>
          </article>

          <article className="border-l border-black/15 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Presence
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              FORMA is designed less as an accessory and more as a writing
              instrument with the stillness of a small sculpture.
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
              Current FORMA pieces
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Each piece is produced in small numbers and may vary slightly in
            burn, surface and proportion.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/10 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              No FORMA objects have been added yet.
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
