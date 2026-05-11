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
      className="space-y-8 bg-[#fbfaf7]"
    >
      <input type="hidden" name="image" />
      <input type="hidden" name="detailImage" />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Title
          </span>
          <input
            name="title"
            required
            placeholder="ORIGIN No. 1"
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Slug
          </span>
          <input
            name="slug"
            placeholder="auto-generated if empty"
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Collection
          </span>
          <select
            name="collection"
            required
            defaultValue="FORMA"
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition focus:border-black"
          >
            <option value="FORMA">FORMA</option>
            <option value="ORIGINS">ORIGINS</option>
            <option value="NATURA">NATURA</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Status
          </span>
          <select
            name="status"
            defaultValue="prototype-archive"
            className="w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition focus:border-black"
          >
            <option value="prototype-archive">Prototype archive</option>
            <option value="draft">Draft</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Year
          </span>
          <input
            name="year"
            placeholder="2026"
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Material
          </span>
          <input
            name="material"
            placeholder="Bog oak, walnut, ziricote..."
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Atelier
          </span>
          <input
            name="atelier"
            placeholder="Munich atelier"
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-black/95">
          Short description
        </span>
        <textarea
          name="shortDescription"
          required
          rows={4}
          placeholder="Short story, material, provenance, atmosphere."
          className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-black/95">
          Story
        </span>
        <textarea
          name="story"
          rows={7}
          placeholder="Longer piece story, provenance, making process, character."
          className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black"
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Main image
          </span>
          <input
            ref={mainImageRef}
            name="imageFile"
            type="file"
            accept="image/*"
            required
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-white hover:file:bg-black/80"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-black/95">
            Detail image
          </span>
          <input
            ref={detailImageRef}
            name="detailImageFile"
            type="file"
            accept="image/*"
            className="border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-white hover:file:bg-black/80"
          />
        </label>
      </div>

      <div className="border border-black/15 bg-white p-4 text-sm font-normal leading-relaxed text-black/95">
        Images are uploaded directly to Vercel Blob from the browser. The server
        action only saves the generated public URLs in Neon.
      </div>

      {errorMessage && (
        <div className="border border-red-500/40 bg-red-500/10 p-4 text-sm leading-relaxed text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-4">
        <p className="text-sm font-normal text-black/95">
          {state === "uploading" && "Uploading images..."}
          {state === "saving" && "Saving piece and generating translations..."}
          {state === "idle" && "Ready to save."}
          {state === "error" && "Please check the error above."}
        </p>

        <button
          type="submit"
          disabled={isBusy}
          className="border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? "Working..." : "Save piece"}
        </button>
      </div>
    </form>
  );
}