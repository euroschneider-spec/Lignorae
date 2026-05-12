import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "NATURA — Natural Wood Fountain Pens",
  description:
    "NATURA is the most direct LIGNORAE collection: local woods, honest surfaces and tactile fountain pens shaped for daily use in Munich.",
  alternates: {
    canonical: "/collections/natura",
    languages: {
      en: "/collections/natura",
      de: "/de/collections/natura",
      ro: "/ro/collections/natura",
      "x-default": "/collections/natura",
    },
  },
  openGraph: {
    title: "NATURA — Natural Wood Fountain Pens by LIGNORAE",
    description:
      "Local woods, honest surfaces and tactile fountain pens shaped for daily use in Munich.",
    url: "/collections/natura",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NATURA natural wood fountain pen by LIGNORAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NATURA — Natural Wood Fountain Pens by LIGNORAE",
    description:
      "Local woods, honest surfaces and tactile fountain pens shaped for daily use in Munich.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function NaturaPage() {
  const pieces = await prisma.piece.findMany({
    where: {
      collection: "NATURA",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Lower range collection
            </p>
            <h1 className="max-w-3xl text-6xl font-light leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              NATURA
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            NATURA is the most direct LIGNORAE language: local woods, honest
            surfaces and minimal intervention. Simple, tactile fountain pens
            shaped for use without theatrical excess.
          </p>
        </div>

        <div className="mt-24 flex justify-center">
          <div className="group inline-flex overflow-hidden bg-[#eeeae2]">
            <Image
              src="/natura.jpg"
              alt="NATURA natural wood fountain pen"
              width={1500}
              height={1000}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              className="h-auto max-h-[820px] w-auto max-w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">
          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Honesty
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              NATURA keeps the wood close to itself: visible fibres, natural
              warmth and a finish that does not hide the material.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Simplicity
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              The form is restrained and functional, designed to carry the
              LIGNORAE feeling in a more accessible expression.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Use
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              NATURA is made for daily contact: lighter in concept, direct in
              material and quiet on the desk.
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
              Current NATURA pieces
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            NATURA pieces may be produced in small batches, with natural
            variation in tone, grain and surface.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              No NATURA objects have been added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => (
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