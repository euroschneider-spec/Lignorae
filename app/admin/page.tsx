import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  archivePiece,
  deletePiece,
  generateMissingPieceTranslations,
} from "./pieces/actions";
import {
  archiveJournalPost,
  deleteJournalPost,
  publishJournalPost,
} from "./journal/actions";

export const dynamic = "force-dynamic";

function getSuccessMessage(success?: string) {
  if (success === "piece-created") return "Piece saved successfully.";
  if (success === "piece-updated") return "Piece updated successfully.";
  if (success === "piece-archived") return "Piece archived successfully.";
  if (success === "piece-deleted") return "Piece deleted successfully.";
  if (success === "piece-translations-generated") return "Piece translations generated.";
  if (success === "journal-created") return "Journal entry saved successfully.";
  if (success === "journal-updated") return "Journal entry updated successfully.";
  if (success === "journal-published") return "Journal entry published successfully.";
  if (success === "journal-archived") return "Journal entry archived successfully.";
  if (success === "journal-deleted") return "Journal entry deleted successfully.";

  return null;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const successMessage = getSuccessMessage(success);
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
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#c6a66a]/50 px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
          >
            View website
          </Link>
        </div>

        {successMessage && (
          <div className="mb-10 rounded-2xl border border-[#c6a66a]/40 bg-[#c6a66a]/10 px-6 py-4 text-sm uppercase tracking-[0.2em] text-[#f5f1e8]">
            {successMessage}
          </div>
        )}

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
              <form action={generateMissingPieceTranslations}>
                <button
                  type="submit"
                  className="rounded-full border border-[#c6a66a]/50 px-5 py-2 text-sm uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
                >
                  Regenerate translations
                </button>
              </form>

              <Link
                href="/admin/pieces/new"
                className="rounded-full border border-[#c6a66a]/50 px-5 py-2 text-sm uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
              >
                Add piece
              </Link>
            </div>
          </div>

          <div className="overflow-visible rounded-2xl border border-[#4a3522]/70">
            <table className="w-full border-collapse">
              <thead className="bg-[#18110b] text-left text-xs uppercase tracking-[0.22em] text-[#c6a66a]">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Published</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pieces.map((piece) => (
                  <tr
                    key={piece.id}
                    className="border-t border-[#4a3522]/60"
                  >
                    <td className="px-6 py-5 text-lg">
                      <Link
                        href={`/pieces/${piece.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-[#c6a66a]"
                      >
                        {piece.title}
                      </Link>
                    </td>

                    <td className="px-6 py-5">
                      {piece.status === "draft" || piece.status === "archived" ? "No" : "Yes"}
                    </td>

                    <td className="px-6 py-5 text-[#d0cabf]">
                      {piece.createdAt.toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/pieces/${piece.id}/edit`}
                          className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
                        >
                          Edit
                        </Link>

                        {piece.status !== "archived" && (
                          <form action={archivePiece}>
                            <input type="hidden" name="pieceId" value={piece.id} />
                            <button
                              type="submit"
                              className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
                            >
                              Archive
                            </button>
                          </form>
                        )}

                        <details className="relative">
                          <summary className="cursor-pointer list-none rounded-full border border-red-500/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-red-300 transition hover:border-red-400 hover:bg-red-500 hover:text-white">
                            Delete
                          </summary>

                          <form
                            action={deletePiece}
                            className="absolute right-0 z-10 mt-2 w-52 rounded-2xl border border-red-500/30 bg-[#18110b] p-3 shadow-2xl shadow-black/50"
                          >
                            <input type="hidden" name="pieceId" value={piece.id} />
                            <p className="mb-3 text-xs leading-relaxed text-[#d0cabf]">
                              Delete this piece permanently?
                            </p>
                            <button
                              type="submit"
                              className="w-full rounded-full bg-red-500 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-red-400"
                            >
                              Confirm delete
                            </button>
                          </form>
                        </details>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Journal
              </p>

              <h2 className="text-3xl font-light">
                Current posts
              </h2>
            </div>

            <Link
              href="/admin/journal/new"
              className="rounded-full border border-[#c6a66a]/50 px-5 py-2 text-sm uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
            >
              Add journal entry
            </Link>
          </div>

          <div className="overflow-visible rounded-2xl border border-[#4a3522]/70">
            <table className="w-full border-collapse">
              <thead className="bg-[#18110b] text-left text-xs uppercase tracking-[0.22em] text-[#c6a66a]">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Published</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {journalPosts.length === 0 ? (
                  <tr>
                    <td className="px-6 py-5 text-[#d0cabf]" colSpan={4}>
                      No journal posts yet.
                    </td>
                  </tr>
                ) : (
                  journalPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-t border-[#4a3522]/60"
                    >
                      <td className="px-6 py-5 text-lg">
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/journal/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-[#c6a66a]"
                          >
                            {post.title}
                          </Link>

                          {post.published && (
                            <Link
                              href={`/journal/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs uppercase tracking-[0.18em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
                            >
                              View public page
                            </Link>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {post.published ? "Yes" : "No"}
                      </td>

                      <td className="px-6 py-5 text-[#d0cabf]">
                        {post.createdAt.toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/admin/journal/${post.id}/edit`}
                            className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
                          >
                            Edit
                          </Link>

                          {post.published ? (
                            <form action={archiveJournalPost}>
                              <input type="hidden" name="postId" value={post.id} />
                              <button
                                type="submit"
                                className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
                              >
                                Archive
                              </button>
                            </form>
                          ) : (
                            <form action={publishJournalPost}>
                              <input type="hidden" name="postId" value={post.id} />
                              <button
                                type="submit"
                                className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
                              >
                                Publish
                              </button>
                            </form>
                          )}

                          <details className="relative">
                            <summary className="cursor-pointer list-none rounded-full border border-red-500/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-red-300 transition hover:border-red-400 hover:bg-red-500 hover:text-white">
                              Delete
                            </summary>

                            <form
                              action={deleteJournalPost}
                              className="absolute right-0 z-10 mt-2 w-52 rounded-2xl border border-red-500/30 bg-[#18110b] p-3 shadow-2xl shadow-black/50"
                            >
                              <input type="hidden" name="postId" value={post.id} />
                              <p className="mb-3 text-xs leading-relaxed text-[#d0cabf]">
                                Delete this post permanently?
                              </p>
                              <button
                                type="submit"
                                className="w-full rounded-full bg-red-500 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-red-400"
                              >
                                Confirm delete
                              </button>
                            </form>
                          </details>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}