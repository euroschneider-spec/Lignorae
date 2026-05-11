import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

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
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Lower range collection
            </p>
            <h1 className="max-w-3xl text-6xl font-light leading-[0.9] tracking-[-0.07em] text-black md:text-8xl">
              NATURA
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
            NATURA is the most direct LIGNORAE language: local woods, honest
            surfaces and minimal intervention. Simple, tactile writing objects
            shaped for use without theatrical excess.
          </p>
        </div>

        <div className="relative mt-24 aspect-[16/9] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/natura.jpg"
            alt="NATURA natural wood writing object"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover object-center"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">
          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/50">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Honesty
            </h2>
            <p className="text-sm font-light leading-7 text-black/70">
              NATURA keeps the wood close to itself: visible fibres, natural
              warmth and a finish that does not hide the material.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/50">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Simplicity
            </h2>
            <p className="text-sm font-light leading-7 text-black/70">
              The form is restrained and functional, designed to carry the
              LIGNORAE feeling in a more accessible expression.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/50">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Use
            </h2>
            <p className="text-sm font-light leading-7 text-black/70">
              NATURA is made for daily contact: lighter in concept, direct in
              material and quiet on the desk.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Available objects
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] md:text-6xl">
              Current NATURA pieces
            </h2>
          </div>

          <p className="max-w-xl text-base font-light leading-8 text-black/70">
            NATURA pieces may be produced in small batches, with natural
            variation in tone, grain and surface.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-light leading-7 text-black/70">
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
                  <h3 className="mb-4 text-3xl font-light tracking-[-0.04em]">
                    {piece.title}
                  </h3>
                  <p className="mb-7 text-sm font-light leading-7 text-black/70">
                    {piece.shortDescription}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-black/70 transition group-hover:text-black">
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