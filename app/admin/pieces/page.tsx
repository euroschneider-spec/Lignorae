

import Image from "next/image";
import Link from "next/link";
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

function getCollectionLabel(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "forma") return "FORMA";
  if (normalizedCollection === "origins") return "ORIGINS";
  if (normalizedCollection === "natura") return "NATURA";

  return "UNASSIGNED";
}

export default async function AdminPiecesPage() {
  const pieces = await prisma.piece.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-10 text-[#111111]">
      <section className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/45">
              LIGNORAE back-office
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-black md:text-5xl">
              Pieces
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="border border-black/20 px-5 py-3 text-[10px] uppercase tracking-[0.32em] text-black/60 transition hover:border-black hover:text-black"
            >
              Admin
            </Link>
            <Link
              href="/admin/pieces/new"
              className="border border-black bg-black px-5 py-3 text-[10px] uppercase tracking-[0.32em] text-white transition hover:bg-transparent hover:text-black"
            >
              Add piece
            </Link>
          </div>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/10 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-light leading-7 text-black/65">
              No pieces have been added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pieces.map((piece) => (
              <article
                key={piece.id}
                className="grid gap-6 border border-black/10 bg-[#fbfaf7] p-5 md:grid-cols-[180px_1fr_auto] md:items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eeeae2]">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.28em] text-black/45">
                    <span className="border border-black/15 px-3 py-1">
                      {getCollectionLabel(piece.collection)}
                    </span>
                    <span className="border border-black/15 px-3 py-1">
                      {getStatusLabel(piece.status)}
                    </span>
                  </div>

                  <h2 className="text-3xl font-light tracking-[-0.04em] text-black">
                    {piece.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm font-light leading-7 text-black/65">
                    {piece.shortDescription}
                  </p>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-black/40">
                    /pieces/{piece.slug}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  <Link
                    href={`/pieces/${piece.slug}`}
                    className="border border-black/20 px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-black/60 transition hover:border-black hover:text-black"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/pieces/${piece.id}/edit`}
                    className="border border-black bg-black px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-transparent hover:text-black"
                  >
                    Edit
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}