"use server";

import { prisma } from "@/lib/prisma";
import { generateOpenAIText, parseJsonResponse } from "@/lib/openai";
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

type PieceTranslationPayload = {
  title: string;
  collection: string;
  shortDescription: string;
  story: string | null;
  material: string | null;
  atelier: string | null;
};

type PieceForTranslation = {
  id: string;
  title: string;
  collection: string;
  shortDescription: string;
  story: string | null;
  material: string | null;
  atelier: string | null;
};

function getLocaleName(locale: "DE" | "RO") {
  if (locale === "DE") return "German";
  return "Romanian";
}

async function translatePieceWithOpenAI(
  piece: PieceForTranslation,
  locale: "DE" | "RO"
): Promise<PieceTranslationPayload> {
  const localeName = getLocaleName(locale);

  const response = await generateOpenAIText({
    system: `You are a premium luxury brand copy translator for LIGNORAE, a Munich atelier creating handcrafted fountain pens. Translate from English into ${localeName}. Preserve a warm, refined, editorial tone. Do not add facts. Return only valid JSON with these keys: title, collection, shortDescription, story, material, atelier. Values may be null only when the original value is null.`,
    user: JSON.stringify({
      title: piece.title,
      collection: piece.collection,
      shortDescription: piece.shortDescription,
      story: piece.story,
      material: piece.material,
      atelier: piece.atelier,
    }),
  });

  const parsed = parseJsonResponse<PieceTranslationPayload>(response);

  return {
    title: parsed.title || piece.title,
    collection: parsed.collection || piece.collection,
    shortDescription: parsed.shortDescription || piece.shortDescription,
    story: parsed.story ?? null,
    material: parsed.material ?? null,
    atelier: parsed.atelier ?? null,
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

  for (const locale of missingLocales) {
    const translatedPiece = await translatePieceWithOpenAI(piece, locale);

    await prisma.pieceTranslation.create({
      data: {
        pieceId: piece.id,
        locale,
        title: translatedPiece.title,
        collection: translatedPiece.collection,
        shortDescription: translatedPiece.shortDescription,
        story: translatedPiece.story,
        material: translatedPiece.material,
        atelier: translatedPiece.atelier,
      },
    });
  }
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
