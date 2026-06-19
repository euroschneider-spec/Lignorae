import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePiece } from "../../actions";

export const dynamic = "force-dynamic";

const inputClass =
  "w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black";

const labelClass = "text-xs uppercase tracking-[0.2em] text-black/55";

const sectionClass = "space-y-5 border border-black/10 bg-[#f7f5f0] p-5";

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
    include: {
      translations: true,
    },
  });

  if (!piece) {
    notFound();
  }

  const englishTranslation = piece.translations.find(
    (translation) => translation.locale === "EN"
  );
  const germanTranslation = piece.translations.find(
    (translation) => translation.locale === "DE"
  );
  const romanianTranslation = piece.translations.find(
    (translation) => translation.locale === "RO"
  );

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-10 text-[#111111]">
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/45">
              LIGNORAE back-office
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-black md:text-5xl">
              Edit piece
            </h1>
          </div>

          <Link
            href="/admin/pieces"
            className="border border-black/20 px-5 py-3 text-[10px] uppercase tracking-[0.32em] text-black/60 transition hover:border-black hover:text-black"
          >
            Back
          </Link>
        </div>

        <form
          action={updatePiece}
          encType="multipart/form-data"
          className="space-y-6 border border-black/10 bg-[#fbfaf7] p-6 md:p-8"
        >
          <input type="hidden" name="pieceId" value={piece.id} />
          <input type="hidden" name="image" value={piece.image} />
          <input type="hidden" name="detailImage" value={piece.detailImage || ""} />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Title</span>
              <input
                name="title"
                required
                defaultValue={englishTranslation?.title || piece.title}
                placeholder="LIGNORAE Object No. 1"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Slug</span>
              <input
                name="slug"
                defaultValue={piece.slug}
                placeholder="auto-generated if empty"
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Collection</span>
              <select
                name="collection"
                required
                defaultValue={englishTranslation?.collection || piece.collection || "FORMA"}
                className={inputClass}
              >
                <option value="FORMA">FORMA</option>
                <option value="ORIGINS">ORIGINS</option>
                <option value="NATURA">NATURA</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Status</span>
              <select name="status" defaultValue={piece.status} className={inputClass}>
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
              <span className={labelClass}>Year</span>
              <input
                name="year"
                defaultValue={piece.year || ""}
                placeholder="2026"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Material</span>
              <input
                name="material"
                defaultValue={englishTranslation?.material || piece.material || ""}
                placeholder="Oak, beech, ziricote..."
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Atelier</span>
              <input
                name="atelier"
                defaultValue={englishTranslation?.atelier || piece.atelier || ""}
                placeholder="Munich atelier"
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="space-y-2">
              <span className={labelClass}>Price in euros</span>
              <input
                name="priceEuros"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                defaultValue={
                  piece.priceCents === null
                    ? ""
                    : (piece.priceCents / 100).toFixed(2)
                }
                placeholder="750.00"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Currency</span>
              <input
                name="currency"
                defaultValue={piece.currency}
                maxLength={3}
                className={inputClass}
              />
            </label>

            <label className="flex items-center gap-3 border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm text-black/75 md:self-end">
              <input
                name="isPurchasable"
                type="checkbox"
                defaultChecked={piece.isPurchasable}
                className="h-4 w-4 accent-black"
              />
              <span>Purchasable</span>
            </label>
          </div>

          <label className="block space-y-2">
            <span className={labelClass}>Short description</span>
            <textarea
              name="shortDescription"
              required
              rows={4}
              defaultValue={englishTranslation?.shortDescription || piece.shortDescription}
              placeholder="Short object description, material and atmosphere."
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className={labelClass}>Story</span>
            <textarea
              name="story"
              rows={7}
              defaultValue={englishTranslation?.story || piece.story || ""}
              placeholder="Longer object notes, making process, material character."
              className={inputClass}
            />
          </label>

          <div className="space-y-8 border border-black/10 bg-[#f7f5f0] p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/55">
                Manual translation refinement
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Generated translations are drafts. Refine German and Romanian
                wording here before publishing, especially brand-specific terms
                such as fountain pen, atelier, provenance and material language.
              </p>
            </div>

            <div className={sectionClass}>
              <p className="text-sm uppercase tracking-[0.25em] text-black/55">
                Deutsch
              </p>

              <label className="block space-y-2">
                <span className={labelClass}>Title DE</span>
                <input
                  name="deTitle"
                  defaultValue={germanTranslation?.title || ""}
                  className={inputClass}
                />
              </label>

              <label className="block space-y-2">
                <span className={labelClass}>Short description DE</span>
                <textarea
                  name="deShortDescription"
                  rows={4}
                  defaultValue={germanTranslation?.shortDescription || ""}
                  className={inputClass}
                />
              </label>

              <label className="block space-y-2">
                <span className={labelClass}>Story DE</span>
                <textarea
                  name="deStory"
                  rows={7}
                  defaultValue={germanTranslation?.story || ""}
                  className={inputClass}
                />
              </label>

              <div className="grid gap-5 md:grid-cols-3">
                <label className="space-y-2">
                  <span className={labelClass}>Collection DE</span>
                  <input
                    name="deCollection"
                    defaultValue={germanTranslation?.collection || ""}
                    className={inputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Material DE</span>
                  <input
                    name="deMaterial"
                    defaultValue={germanTranslation?.material || ""}
                    className={inputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Atelier DE</span>
                  <input
                    name="deAtelier"
                    defaultValue={germanTranslation?.atelier || ""}
                    className={inputClass}
                  />
                </label>
              </div>
            </div>

            <div className={sectionClass}>
              <p className="text-sm uppercase tracking-[0.25em] text-black/55">
                Română
              </p>

              <label className="block space-y-2">
                <span className={labelClass}>Title RO</span>
                <input
                  name="roTitle"
                  defaultValue={romanianTranslation?.title || ""}
                  className={inputClass}
                />
              </label>

              <label className="block space-y-2">
                <span className={labelClass}>Short description RO</span>
                <textarea
                  name="roShortDescription"
                  rows={4}
                  defaultValue={romanianTranslation?.shortDescription || ""}
                  className={inputClass}
                />
              </label>

              <label className="block space-y-2">
                <span className={labelClass}>Story RO</span>
                <textarea
                  name="roStory"
                  rows={7}
                  defaultValue={romanianTranslation?.story || ""}
                  className={inputClass}
                />
              </label>

              <div className="grid gap-5 md:grid-cols-3">
                <label className="space-y-2">
                  <span className={labelClass}>Collection RO</span>
                  <input
                    name="roCollection"
                    defaultValue={romanianTranslation?.collection || ""}
                    className={inputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Material RO</span>
                  <input
                    name="roMaterial"
                    defaultValue={romanianTranslation?.material || ""}
                    className={inputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Atelier RO</span>
                  <input
                    name="roAtelier"
                    defaultValue={romanianTranslation?.atelier || ""}
                    className={inputClass}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="border border-black/10 bg-[#f7f5f0] p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-black/55">
                Current main image
              </p>
              <div
                className="aspect-[16/10] bg-cover bg-center"
                style={{ backgroundImage: `url('${piece.image}')` }}
              />
            </div>

            {piece.detailImage && (
              <div className="border border-black/10 bg-[#f7f5f0] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-black/55">
                  Current detail image
                </p>
                <div
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{ backgroundImage: `url('${piece.detailImage}')` }}
                />
              </div>
            )}
          </div>

          <div className="border border-black/15 bg-[#f7f5f0] p-4 text-sm leading-relaxed text-black/65">
            Image replacement for existing pieces will be added through the same
            direct Blob upload flow used by new pieces. For now, this edit page
            preserves the current image URLs.
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-transparent hover:text-black"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
