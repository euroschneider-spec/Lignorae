import Link from "next/link";
import { createJournalPost } from "../actions";

const inputClass =
  "w-full border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black";

const textareaClass =
  "w-full border border-black/15 bg-white px-4 py-3 text-sm leading-7 text-black outline-none transition placeholder:text-black/35 focus:border-black";

export default function NewJournalPostPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-10 text-[#111111]">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-black/60">
              Lignorae back-office
            </p>
            <h1 className="mt-3 text-3xl font-light tracking-[0.02em] text-black md:text-4xl">
              Add journal entry
            </h1>
          </div>

          <Link
            href="/admin"
            className="border border-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-black/70 transition hover:border-black hover:text-black"
          >
            Back
          </Link>
        </div>

        <form
          action={createJournalPost}
          encType="multipart/form-data"
          className="space-y-8 border border-black/15 bg-[#fbfaf7] p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                Title
              </span>
              <input
                name="title"
                required
                placeholder="Journal entry title"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                Slug
              </span>
              <input
                name="slug"
                placeholder="auto-generated if empty"
                className={inputClass}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-black/60">
              Excerpt
            </span>
            <textarea
              name="excerpt"
              required
              rows={3}
              placeholder="Short teaser text shown on the journal overview."
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-black/60">
              Content
            </span>
            <textarea
              name="content"
              required
              rows={12}
              placeholder="Full journal text."
              className={textareaClass}
            />
          </label>

          <div className="border-t border-black/15 pt-8">
            <p className="mb-6 text-xs uppercase tracking-[0.28em] text-black/60">
              German translation
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Title DE
                </span>
                <input
                  name="titleDE"
                  placeholder="German journal title"
                  className={inputClass}
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Excerpt DE
                </span>
                <textarea
                  name="excerptDE"
                  rows={3}
                  placeholder="German teaser text"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-5 block space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                Content DE
              </span>
              <textarea
                name="contentDE"
                rows={10}
                placeholder="German journal content"
                className={textareaClass}
              />
            </label>
          </div>

          <div className="border-t border-black/15 pt-8">
            <p className="mb-6 text-xs uppercase tracking-[0.28em] text-black/60">
              Romanian translation
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Title RO
                </span>
                <input
                  name="titleRO"
                  placeholder="Romanian journal title"
                  className={inputClass}
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                  Excerpt RO
                </span>
                <textarea
                  name="excerptRO"
                  rows={3}
                  placeholder="Romanian teaser text"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-5 block space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                Content RO
              </span>
              <textarea
                name="contentRO"
                rows={10}
                placeholder="Romanian journal content"
                className={textareaClass}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-black/60">
              Cover image
            </span>
            <input
              name="coverImageFile"
              type="file"
              accept="image/*"
              className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-white hover:file:bg-black/75"
            />
          </label>

          <div className="border border-black/15 bg-white p-4 text-sm leading-relaxed text-black/70">
            The cover image is uploaded to persistent storage and the generated
            public URL is saved automatically with the journal entry.
          </div>

          <label className="flex items-center gap-3 border border-black/15 bg-white px-4 py-4 text-sm text-black/70">
            <input
              name="published"
              type="checkbox"
              className="h-4 w-4 accent-black"
            />
            <span>Publish immediately</span>
          </label>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-transparent hover:text-black"
            >
              Save journal entry
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}