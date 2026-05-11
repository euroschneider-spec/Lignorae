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
  generateMissingJournalTranslations,
  publishJournalPost,
} from "./journal/actions";

export const dynamic = "force-dynamic";

function getSuccessMessage(input: {
  success?: string;
  translations?: string;
  expected?: string;
}) {
  const { success, translations, expected } = input;

  if (success === "piece-created") return "Piece saved successfully.";
  if (success === "piece-updated") return "Piece updated successfully.";
  if (success === "piece-archived") return "Piece archived successfully.";
  if (success === "piece-deleted") return "Piece deleted successfully.";
  if (success === "piece-translations-generated") {
    return `Piece translations saved: ${translations || "0"} / ${expected || "0"}.`;
  }

  if (success === "journal-created") return "Journal entry saved successfully.";
  if (success === "journal-updated") return "Journal entry updated successfully.";
  if (success === "journal-published") return "Journal entry published successfully.";
  if (success === "journal-archived") return "Journal entry archived successfully.";
  if (success === "journal-deleted") return "Journal entry deleted successfully.";
  if (success === "journal-translations-generated") {
    return `Journal translations saved: ${translations || "0"} / ${expected || "0"}.`;
  }

  return null;
}

function getErrorMessage(error?: string) {
  if (error === "piece-translation-failed") {
    return "Piece translation generation failed. Check the Vercel function logs or OpenAI response.";
  }

  if (error === "journal-translation-failed") {
    return "Journal translation generation failed. Check the Vercel function logs or OpenAI response.";
  }

  if (error === "translation-failed") {
    return "Translation generation failed. Check the Vercel function logs or OpenAI response.";
  }

  return null;
}

function getCollectionLabel(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "forma") return "FORMA";
  if (normalizedCollection === "origins") return "ORIGINS";
  if (normalizedCollection === "natura") return "NATURA";

  return "UNASSIGNED";
}

const buttonGhost =
  "inline-flex shrink-0 items-center justify-center border border-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-black/60 transition hover:border-black hover:text-black";

const buttonBlack =
  "inline-flex shrink-0 items-center justify-center border border-black/35 bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black";

const dangerButton =
  "inline-flex shrink-0 items-center justify-center border border-red-700/45 bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-red-800 transition hover:border-red-800 hover:bg-red-800 hover:text-white";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    error?: string;
    translations?: string;
    expected?: string;
  }>;
}) {
  const { success, error, translations, expected } = await searchParams;
  const successMessage = getSuccessMessage({ success, translations, expected });
  const errorMessage = getErrorMessage(error);

  const pieces = await prisma.piece.findMany({
    include: {
      translations: {
        select: {
          locale: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const journalPosts = await prisma.journalPost.findMany({
    include: {
      translations: {
        select: {
          locale: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pieceTranslationCount = pieces.reduce(
    (count, piece) =>
      count +
      piece.translations.filter(
        (translation) => translation.locale === "DE" || translation.locale === "RO"
      ).length,
    0
  );

  const journalTranslationCount = journalPosts.reduce(
    (count, post) =>
      count +
      post.translations.filter(
        (translation) => translation.locale === "DE" || translation.locale === "RO"
      ).length,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-10 text-[#111111]">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/45">
              LIGNORAE back-office
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-black md:text-6xl">
              Website administration
            </h1>
          </div>

          <Link href="/" target="_blank" rel="noopener noreferrer" className={buttonGhost}>
            View website
          </Link>
        </div>

        {successMessage && (
          <div className="mb-8 border border-black/15 bg-[#fbfaf7] px-5 py-4 text-sm text-black/70">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-8 border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="border border-black/10 bg-[#fbfaf7] p-7">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/45">
              Total pieces
            </p>
            <p className="text-5xl font-light text-black">{pieces.length}</p>
          </div>

          <div className="border border-black/10 bg-[#fbfaf7] p-7">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/45">
              Journal posts
            </p>
            <p className="text-5xl font-light text-black">{journalPosts.length}</p>
          </div>

          <div className="border border-black/10 bg-[#fbfaf7] p-7">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/45">
              DE / RO translations
            </p>
            <p className="text-5xl font-light text-black">
              {pieceTranslationCount + journalTranslationCount}
            </p>
          </div>
        </div>

        <section className="border border-black/10 bg-[#fbfaf7] p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-5">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-black/45">
                Pieces
              </p>
              <h2 className="text-3xl font-light tracking-[-0.04em] text-black md:text-4xl">
                Current archive
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-black/10 pt-5">
              <form action={generateMissingPieceTranslations}>
                <button type="submit" className={buttonGhost}>
                  Regenerate translations
                </button>
              </form>
              <Link href="/admin/pieces" className={buttonGhost}>
                View pieces
              </Link>
              <Link href="/admin/pieces/new" className={buttonBlack}>
                Add piece
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto border border-black/10">
            <table className="w-full min-w-[1120px] border-collapse bg-[#fbfaf7]">
              <thead className="border-b border-black/10 text-left text-[10px] uppercase tracking-[0.28em] text-black/45">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Collection</th>
                  <th className="px-5 py-4">Published</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4">Translations</th>
                  <th className="w-[310px] px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pieces.map((piece) => (
                  <tr key={piece.id} className="border-t border-black/10">
                    <td className="px-5 py-5 text-base text-black">
                      <Link href={`/pieces/${piece.slug}`} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-60">
                        {piece.title}
                      </Link>
                    </td>

                    <td className="px-5 py-5 text-[10px] uppercase tracking-[0.25em] text-black/55">
                      {getCollectionLabel(piece.collection)}
                    </td>

                    <td className="px-5 py-5 text-sm text-black/65">
                      {piece.status === "draft" || piece.status === "archived" ? "No" : "Yes"}
                    </td>

                    <td className="px-5 py-5 text-sm text-black/65">
                      {piece.createdAt.toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-5 py-5 text-[10px] uppercase tracking-[0.25em] text-black/55">
                      {piece.translations.length > 0
                        ? piece.translations.map((translation) => translation.locale).sort().join(", ")
                        : "None"}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <div className="flex min-w-[290px] flex-wrap justify-end gap-3">
                        <Link href={`/admin/pieces/${piece.id}/edit`} className={buttonGhost}>
                          Edit
                        </Link>

                        {piece.status !== "archived" && (
                          <form action={archivePiece}>
                            <input type="hidden" name="pieceId" value={piece.id} />
                            <button type="submit" className={buttonGhost}>
                              Archive
                            </button>
                          </form>
                        )}

                        <details className="shrink-0">
                          <summary className="inline-flex shrink-0 cursor-pointer list-none items-center justify-center border border-red-700/45 bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-red-800 transition hover:border-red-800 hover:bg-red-800 hover:text-white">
                            Delete
                          </summary>

                          <form action={deletePiece} className="mt-3 w-56 border border-red-700/25 bg-white p-4">
                            <input type="hidden" name="pieceId" value={piece.id} />
                            <p className="mb-4 text-sm leading-relaxed text-black/70">
                              Delete this piece permanently?
                            </p>
                            <button type="submit" className={dangerButton}>
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
        </section>

        <section className="mt-10 border border-black/10 bg-[#fbfaf7] p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-5">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-black/45">
                Journal
              </p>
              <h2 className="text-3xl font-light tracking-[-0.04em] text-black md:text-4xl">
                Current posts
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-black/10 pt-5">
              <form action={generateMissingJournalTranslations}>
                <button type="submit" className={buttonGhost}>
                  Regenerate translations
                </button>
              </form>
              <Link href="/admin/journal/new" className={buttonBlack}>
                Add journal entry
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto border border-black/10">
            <table className="w-full min-w-[1120px] border-collapse bg-[#fbfaf7]">
              <thead className="border-b border-black/10 text-left text-[10px] uppercase tracking-[0.28em] text-black/45">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Published</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4">Translations</th>
                  <th className="w-[310px] px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {journalPosts.length === 0 ? (
                  <tr>
                    <td className="px-5 py-5 text-black/65" colSpan={5}>
                      No journal posts yet.
                    </td>
                  </tr>
                ) : (
                  journalPosts.map((post) => (
                    <tr key={post.id} className="border-t border-black/10">
                      <td className="px-5 py-5 text-base text-black">
                        <div className="flex flex-col gap-2">
                          <Link href={`/journal/${post.slug}`} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-60">
                            {post.title}
                          </Link>

                          {post.published && (
                            <Link href={`/journal/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.25em] text-black/45 transition hover:text-black">
                              View public page
                            </Link>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm text-black/65">
                        {post.published ? "Yes" : "No"}
                      </td>

                      <td className="px-5 py-5 text-sm text-black/65">
                        {post.createdAt.toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-5 py-5 text-[10px] uppercase tracking-[0.25em] text-black/55">
                        {post.translations.length > 0
                          ? post.translations.map((translation) => translation.locale).sort().join(", ")
                          : "None"}
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="flex min-w-[290px] flex-wrap justify-end gap-3">
                          <Link href={`/admin/journal/${post.id}/edit`} className={buttonGhost}>
                            Edit
                          </Link>

                          {post.published ? (
                            <form action={archiveJournalPost}>
                              <input type="hidden" name="postId" value={post.id} />
                              <button type="submit" className={buttonGhost}>
                                Archive
                              </button>
                            </form>
                          ) : (
                            <form action={publishJournalPost}>
                              <input type="hidden" name="postId" value={post.id} />
                              <button type="submit" className={buttonGhost}>
                                Publish
                              </button>
                            </form>
                          )}

                          <details className="shrink-0">
                            <summary className="inline-flex shrink-0 cursor-pointer list-none items-center justify-center border border-red-700/45 bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-red-800 transition hover:border-red-800 hover:bg-red-800 hover:text-white">
                              Delete
                            </summary>

                            <form action={deleteJournalPost} className="mt-3 w-56 border border-red-700/25 bg-white p-4">
                              <input type="hidden" name="postId" value={post.id} />
                              <p className="mb-4 text-sm leading-relaxed text-black/70">
                                Delete this post permanently?
                              </p>
                              <button type="submit" className={dangerButton}>
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
        </section>
      </div>
    </main>
  );
}
