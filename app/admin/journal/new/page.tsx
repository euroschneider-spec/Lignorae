

import Link from "next/link";
import { createJournalPost } from "../actions";

export default function NewJournalPostPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f5efe3]">
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#c6a66a]">
              Lignorae back-office
            </p>
            <h1 className="mt-3 text-3xl font-light tracking-[0.08em] text-[#f5efe3] md:text-4xl">
              Add journal entry
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
          action={createJournalPost}
          className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Title
              </span>
              <input
                name="title"
                required
                placeholder="Journal entry title"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
                Slug
              </span>
              <input
                name="slug"
                placeholder="auto-generated if empty"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
              Excerpt
            </span>
            <textarea
              name="excerpt"
              required
              rows={3}
              placeholder="Short teaser text shown on the journal overview."
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
              Content
            </span>
            <textarea
              name="content"
              required
              rows={12}
              placeholder="Full journal text."
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-7 text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
              Cover image
            </span>
            <input
              name="coverImage"
              placeholder="/images/journal/example.jpg"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-[#f5efe3]">
            <input
              name="published"
              type="checkbox"
              className="h-4 w-4 accent-[#c6a66a]"
            />
            <span>Publish immediately</span>
          </label>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded-full bg-[#c6a66a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#e0c17d]"
            >
              Save journal entry
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}