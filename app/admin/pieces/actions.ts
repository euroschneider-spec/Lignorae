"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createPiece(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const collection = String(formData.get("collection") || "").trim();
  const status = String(formData.get("status") || "DRAFT").trim();
  const year = String(formData.get("year") || "").trim();
  const material = String(formData.get("material") || "").trim();
  const atelier = String(formData.get("atelier") || "").trim();
  const shortDescription = String(formData.get("shortDescription") || "").trim();
  const story = String(formData.get("story") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const detailImage = String(formData.get("detailImage") || "").trim();

  const slug = slugInput || createSlug(title);

  if (!title || !slug || !collection || !status || !shortDescription || !image) {
    throw new Error("Missing required piece fields.");
  }

  await prisma.piece.create({
    data: {
      title,
      slug,
      collection,
      status,
      year: year || null,
      material: material || null,
      atelier: atelier || null,
      shortDescription,
      story: story || null,
      image,
      detailImage: detailImage || null,
    },
  });

  redirect("/admin");
}