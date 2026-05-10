"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function refreshPieces() {
  revalidatePath("/");
  revalidatePath("/de");
  revalidatePath("/ro");
  revalidatePath("/admin");
  revalidatePath("/admin/pieces/new");
  revalidatePath("/collections");
  revalidatePath("/collections/origin");
  revalidatePath("/collections/sacra");
  revalidatePath("/collections/sonora");
  revalidatePath("/de/collections");
  revalidatePath("/de/collections/origin");
  revalidatePath("/de/collections/sacra");
  revalidatePath("/de/collections/sonora");
  revalidatePath("/ro/collections");
  revalidatePath("/ro/collections/origin");
  revalidatePath("/ro/collections/sacra");
  revalidatePath("/ro/collections/sonora");
}

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asNullableString(value: FormDataEntryValue | null) {
  const text = asString(value);
  return text.length > 0 ? text : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPieceData(formData: FormData) {
  const title = asString(formData.get("title"));
  const slugFromForm = asString(formData.get("slug"));
  const slug = slugFromForm || slugify(title);

  return {
    title,
    slug,
    collection: asString(formData.get("collection")),
    status: asString(formData.get("status")),
    year: asNullableString(formData.get("year")),
    material: asNullableString(formData.get("material")),
    atelier: asNullableString(formData.get("atelier")),
    shortDescription: asString(formData.get("shortDescription")),
    story: asNullableString(formData.get("story")),
    image: asString(formData.get("image")),
    detailImage: asNullableString(formData.get("detailImage")),
  };
}

function getId(formData: FormData) {
  return asString(formData.get("id"));
}

export async function createPiece(formData: FormData) {
  const data = getPieceData(formData);

  await prisma.piece.create({
    data,
  });

  refreshPieces();
  redirect("/admin");
}

export async function updatePiece(formData: FormData) {
  const id = getId(formData);

  if (!id) {
    throw new Error("Missing piece id.");
  }

  const data = getPieceData(formData);

  await prisma.piece.update({
    where: { id },
    data,
  });

  refreshPieces();
  redirect("/admin");
}

export async function archivePiece(formData: FormData) {
  const id = getId(formData);

  if (!id) {
    throw new Error("Missing piece id.");
  }

  await prisma.piece.update({
    where: { id },
    data: { status: "archived" },
  });

  refreshPieces();
}

export async function deletePiece(formData: FormData) {
  const id = getId(formData);

  if (!id) {
    throw new Error("Missing piece id.");
  }

  await prisma.piece.delete({
    where: { id },
  });

  refreshPieces();
}

export async function generateMissingPieceTranslations() {
  refreshPieces();
}
