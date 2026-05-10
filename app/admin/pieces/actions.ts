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

function translateDraftText(text: string | null, locale: "DE" | "RO") {
  if (!text) return null;

  if (locale === "DE") {
    return text;
  }

  if (locale === "RO") {
    return text;
  }

  return text;
}

function createDraftTranslationData(
  piece: {
    id: string;
    title: string;
    collection: string;
    shortDescription: string;
    story: string | null;
    material: string | null;
    atelier: string | null;
  },
  locale: "DE" | "RO"
) {
  return {
    pieceId: piece.id,
    locale,
    title: translateDraftText(piece.title, locale) ?? piece.title,
    collection: piece.collection,
    shortDescription:
      translateDraftText(piece.shortDescription, locale) ?? piece.shortDescription,
    story: translateDraftText(piece.story, locale),
    material: translateDraftText(piece.material, locale),
    atelier: translateDraftText(piece.atelier, locale),
  };
}

async function createMissingTranslationsForPiece(pieceId: string) {
  const piece = await prisma.piece.findUnique({
    where: { id: pieceId },
    include: { translations: true },
  });

  if (!piece) return;

  const existingLocales = new Set(
    piece.translations.map((translation) => translation.locale)
  );

  const missingLocales = (["DE", "RO"] as const).filter(
    (locale) => !existingLocales.has(locale)
  );

  if (missingLocales.length === 0) return;

  await prisma.pieceTranslation.createMany({
    data: missingLocales.map((locale) =>
      createDraftTranslationData(piece, locale)
    ),
    skipDuplicates: true,
  });
}

export async function createPiece(formData: FormData) {
  const data = getPieceData(formData);

  const piece = await prisma.piece.create({
    data,
  });

  await createMissingTranslationsForPiece(piece.id);

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
  const pieces = await prisma.piece.findMany({
    select: { id: true },
  });

  for (const piece of pieces) {
    await createMissingTranslationsForPiece(piece.id);
  }

  refreshPieces();
}
