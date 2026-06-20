"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState, useTransition } from "react";
import { createPiece } from "../actions";

type UploadState = "idle" | "uploading" | "saving" | "error";

const fieldClass =
  "w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black";

const labelClass = "block space-y-2";

const labelTextClass =
  "block text-xs uppercase tracking-[0.2em] text-black/95";

function createSafeFileName(file: File, prefix: string) {
  const extension = file.name.split(".").pop() || "jpg";
  const safePrefix = prefix
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `pieces/${safePrefix || "piece"}-${Date.now()}.${extension}`;
}

export default function PieceForm({
  uploadAuthorizationToken,
}: {
  uploadAuthorizationToken: string;
}) {
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

      const uploadOptions = {
        access: "public" as const,
        handleUploadUrl: "/api/blob/upload",
        headers: {
          "x-lignorae-admin-upload-token": uploadAuthorizationToken,
        },
      };

      if (!mainImageFile) {
        throw new Error("Please choose a main image before saving the piece.");
      }

      const mainBlob = await upload(
        createSafeFileName(mainImageFile, title),
        mainImageFile,
        uploadOptions
      );

      formData.set("image", mainBlob.url);

      if (detailImageFile) {
        const detailBlob = await upload(
          createSafeFileName(detailImageFile, `${title}-detail`),
          detailImageFile,
          uploadOptions
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
        <label className={labelClass}>
          <span className={labelTextClass}>Title</span>
          <input
            name="title"
            required
            placeholder="BASICS No. 001"
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Slug</span>
          <input
            name="slug"
            placeholder="auto-generated if empty"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Collection</span>
          <select
            name="collection"
            required
            defaultValue="BASICS"
            className={fieldClass}
          >
            <option value="BASICS">BASICS</option>
            <option value="FORMA">FORMA</option>
            <option value="ORIGINS">ORIGINS</option>
            <option value="NATURA">NATURA</option>
          </select>
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Status</span>
          <select name="status" defaultValue="available" className={fieldClass}>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
            <option value="draft">Draft</option>
            <option value="prototype-archive">Prototype archive</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <label className={labelClass}>
          <span className={labelTextClass}>Year</span>
          <input name="year" defaultValue="2026" className={fieldClass} />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Material</span>
          <input
            name="material"
            placeholder="Walnut, bog oak, maple..."
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Atelier</span>
          <input
            name="atelier"
            defaultValue="Munich atelier"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <label className={labelClass}>
          <span className={labelTextClass}>Price in euros</span>
          <input
            name="priceEuros"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            defaultValue="495.00"
            className={fieldClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Currency</span>
          <input
            name="currency"
            defaultValue="EUR"
            maxLength={3}
            className={fieldClass}
          />
        </label>

        <label className="flex items-center gap-3 border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm text-black/75 md:self-end">
          <input
            name="isPurchasable"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 accent-black"
          />
          <span>Purchasable</span>
        </label>
      </div>

      <label className={labelClass}>
        <span className={labelTextClass}>Short description</span>
        <textarea
          name="shortDescription"
          required
          rows={4}
          placeholder="A handcrafted writing instrument from The First One Hundred, the founding LIGNORAE edition."
          className={`${fieldClass} min-h-32 resize-y`}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Story</span>
        <textarea
          name="story"
          rows={7}
          placeholder="Longer piece story, material character, making process and individual details."
          className={`${fieldClass} min-h-48 resize-y`}
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Main image</span>
          <input
            ref={mainImageRef}
            name="imageFile"
            type="file"
            accept="image/*"
            required
            className="w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-white hover:file:bg-black/80"
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Detail image</span>
          <input
            ref={detailImageRef}
            name="detailImageFile"
            type="file"
            accept="image/*"
            className="w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black file:mr-4 file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-white hover:file:bg-black/80"
          />
        </label>
      </div>

      <div className="border border-black/15 bg-white p-4 text-sm font-normal leading-relaxed text-black/95">
        Current upload supports one main image and one detail image. The
        multi-image gallery should be added next with a dedicated PieceImage
        model, so each pen can later hold up to 10 images without replacing the
        current structure.
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
          className="border border-black/35 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? "Working..." : "Save piece"}
        </button>
      </div>
    </form>
  );
}
