

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePiece } from "../../actions";

export default async function EditPiecePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const piece = await prisma.piece.findUnique({
    where: {
      id,
    },
  });

  if (!piece) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f5efe3]">
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#c6a66a]">
              Lignorae back-office
            </p>
            <h1 className="mt-3 text-3xl font-light tracking-[0.08em] text-[#f5efe3] md:text-4xl">
              Edit piece
            </h1>
          </div>

          <Link
            href="/admin"
            className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
          >
            Back
          </Link>
        </div>

        <form
          action={updatePiece}
          encType="multipart/form-data"
          className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 md:p-8"
        >
          <input type="hidden" name="pieceId" value={piece.id} />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Title
              </span>
              <input
                name="title"
                required
                defaultValue={piece.title}
                placeholder="ORIGIN No. 1"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Slug
              </span>
              <input
                name="slug"
                defaultValue={piece.slug}
                placeholder="auto-generated if empty"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Collection
              </span>
              <input
                name="collection"
                required
                defaultValue={piece.collection}
                placeholder="Origin / Sacra / Sonora"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Status
              </span>
              <select
                name="status"
                defaultValue={piece.status}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition focus:border-[#c6a66a]/70"
              >
                <option value="prototype-archive">Prototype archive</option>
                <option value="draft">Draft</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
                <option value="archived">Archived</option>
              </select>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Year
              </span>
              <input
                name="year"
                defaultValue={piece.year || ""}
                placeholder="2026"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Material
              </span>
              <input
                name="material"
                defaultValue={piece.material || ""}
                placeholder="Bog oak, walnut, ziricote..."
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Atelier
              </span>
              <input
                name="atelier"
                defaultValue={piece.atelier || ""}
                placeholder="Munich atelier"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
              Short description
            </span>
            <textarea
              name="shortDescription"
              required
              rows={4}
              defaultValue={piece.shortDescription}
              placeholder="Short story, material, provenance, atmosphere."
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
              Story
            </span>
            <textarea
              name="story"
              rows={7}
              defaultValue={piece.story || ""}
              placeholder="Longer piece story, provenance, making process, character."
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Current main image
              </p>
              <div
                className="aspect-[16/10] rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${piece.image}')` }}
              />
            </div>

            {piece.detailImage && (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                  Current detail image
                </p>
                <div
                  className="aspect-[16/10] rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${piece.detailImage}')` }}
                />
              </div>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Replace main image
              </span>
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] file:mr-4 file:rounded-full file:border-0 file:bg-[#c6a66a] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-black hover:file:bg-[#e0c17d]"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Replace detail image
              </span>
              <input
                name="detailImageFile"
                type="file"
                accept="image/*"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] file:mr-4 file:rounded-full file:border-0 file:bg-[#c6a66a] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-black hover:file:bg-[#e0c17d]"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-[#c6a66a]/20 bg-black/30 p-4 text-sm leading-relaxed text-[#d0cabf]">
            Leave image fields empty if you want to keep the current images.
            Select new files only when you want to replace them.
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded-full bg-[#c6a66a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#e0c17d]"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}