

"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState, useTransition } from "react";
import { createPiece } from "../actions";

type UploadState = "idle" | "uploading" | "saving" | "error";

function createSafeFileName(file: File, prefix: string) {
  const extension = file.name.split(".").pop() || "jpg";
  const safePrefix = prefix
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `pieces/${safePrefix || "piece"}-${Date.now()}.${extension}`;
}

export default function PieceForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const detailImageRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    setState("uploading");
    setErrorMessage(null);

    try {
      const formData = new FormData(form);
      const title = String(formData.get("title") || "piece");
      const mainImageFile = mainImageRef.current?.files?.[0];
      const detailImageFile = detailImageRef.current?.files?.[0];

      if (!mainImageFile) {
        throw new Error("Please choose a main image before saving the piece.");
      }

      const mainBlob = await upload(
        createSafeFileName(mainImageFile, title),
        mainImageFile,
        {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        }
      );

      formData.set("image", mainBlob.url);

      if (detailImageFile) {
        const detailBlob = await upload(
          createSafeFileName(detailImageFile, `${title}-detail`),
          detailImageFile,
          {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
          }
        );

        formData.set("detailImage", detailBlob.url);
      } else {
        formData.set("detailImage", "");
      }

      formData.delete("imageFile");
      formData.delete("detailImageFile");

      setState("saving");

      startTransition(() => {
        createPiece(formData);
      });
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "The piece could not be saved."
      );
    }
  }

  const isBusy = state === "uploading" || state === "saving" || isPending;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 md:p-8"
    >
      <input type="hidden" name="image" />
      <input type="hidden" name="detailImage" />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
            Title
          </span>
          <input
            name="title"
            required
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
            defaultValue="prototype-archive"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition focus:border-[#c6a66a]/70"
          >
            <option value="prototype-archive">Prototype archive</option>
            <option value="draft">Draft</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
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
          placeholder="Longer piece story, provenance, making process, character."
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] outline-none transition placeholder:text-white/30 focus:border-[#c6a66a]/70"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
            Main image
          </span>
          <input
            ref={mainImageRef}
            name="imageFile"
            type="file"
            accept="image/*"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] file:mr-4 file:rounded-full file:border-0 file:bg-[#c6a66a] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-black hover:file:bg-[#e0c17d]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c6a66a]">
            Detail image
          </span>
          <input
            ref={detailImageRef}
            name="detailImageFile"
            type="file"
            accept="image/*"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5efe3] file:mr-4 file:rounded-full file:border-0 file:bg-[#c6a66a] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-black hover:file:bg-[#e0c17d]"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-[#c6a66a]/20 bg-black/30 p-4 text-sm leading-relaxed text-[#d0cabf]">
        Images are uploaded directly to Vercel Blob from the browser. The server
        action only saves the generated public URLs in Neon.
      </div>

      {errorMessage && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm leading-relaxed text-red-200">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-4">
        <p className="text-sm text-[#d0cabf]">
          {state === "uploading" && "Uploading images..."}
          {state === "saving" && "Saving piece and generating translations..."}
          {state === "idle" && "Ready to save."}
          {state === "error" && "Please check the error above."}
        </p>

        <button
          type="submit"
          disabled={isBusy}
          className="rounded-full bg-[#c6a66a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[#e0c17d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? "Working..." : "Save piece"}
        </button>
      </div>
    </form>
  );
}