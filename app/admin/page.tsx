import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const pieces = await prisma.piece.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const journalPosts = await prisma.journalPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#120d09] px-6 py-16 text-[#f5f1e8]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#c6a66a]">
              LIGNORAE Backoffice
            </p>

            <h1 className="text-5xl font-light">
              LIGNORAE website administration
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#c6a66a]/50 px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
          >
            View website
          </Link>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
              Total pieces
            </p>

            <p className="text-5xl font-light">
              {pieces.length}
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
              Collections
            </p>

            <p className="text-5xl font-light">
              3
            </p>
          </div>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
              Journal posts
            </p>

            <p className="text-5xl font-light">
              {journalPosts.length}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Pieces
              </p>

              <h2 className="text-3xl font-light">
                Current archive
              </h2>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="/admin/journal/new"
                className="rounded-full border border-[#c6a66a]/50 px-5 py-2 text-sm uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
              >
                Add journal entry
              </Link>

              <Link
                href="/admin/pieces/new"
                className="rounded-full border border-[#c6a66a]/50 px-5 py-2 text-sm uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
              >
                Add piece
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#4a3522]/70">
            <table className="w-full border-collapse">
              <thead className="bg-[#18110b] text-left text-xs uppercase tracking-[0.22em] text-[#c6a66a]">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Collection</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Year</th>
                </tr>
              </thead>

              <tbody>
                {pieces.map((piece) => (
                  <tr
                    key={piece.id}
                    className="border-t border-[#4a3522]/60"
                  >
                    <td className="px-6 py-5 text-lg">
                      {piece.title}
                    </td>

                    <td className="px-6 py-5 uppercase text-[#c6a66a]">
                      {piece.collection}
                    </td>

                    <td className="px-6 py-5">
                      {piece.status}
                    </td>

                    <td className="px-6 py-5">
                      {piece.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}