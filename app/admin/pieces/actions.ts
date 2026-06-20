"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthorizationValid } from "@/lib/admin-auth";
import { parsePieceCollection, parsePieceStatus } from "@/lib/catalogue";
import { parseEuroPriceToCents } from "@/lib/money";
import { generateOpenAIText, parseJsonResponse } from "@/lib/openai";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

const MAX_GALLERY_IMAGES = 10;

async function requireAdminAction() {
  const authorization = (await headers()).get("authorization");

  if (!isAdminAuthorizationValid(authorization)) {
    throw new Error("Unauthorized.");
  }
}

function refreshPieces() {
  revalidatePath("/");
  revalidatePath("/de");
  revalidatePath("/ro");
  revalidatePath("/admin");
  revalidatePath("/admin/pieces");
  revalidatePath("/admin/pieces/new");
  revalidatePath("/collections");
  revalidatePath("/collections/forma");
  revalidatePath("/collections/origins");
  revalidatePath("/collections/natura");
  revalidatePath("/de/collections");
  revalidatePath("/de/collections/forma");
  revalidatePath("/de/collections/origins");
  revalidatePath("/de/collections/natura");
  revalidatePath("/ro/collections");
  revalidatePath("/ro/collections/forma");
  revalidatePath("/ro/collections/origins");
  revalidatePath("/ro/collections/natura");
}

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asNullableString(value: FormDataEntryValue | null) {
  const text = asString(value);
  return text.length > 0 ? text : null;
}

function parseLignoraePieceCollection(value: string) {
  const normalized = value.trim().toUpperCase();

  if (
    normalized === "BASICS" ||
    normalized === "BASIC" ||
    normalized === "THE FIRST ONE HUNDRED"
  ) {
    return "BASICS";
  }

  return parsePieceCollection(value);
}

function parseCurrency(value: FormDataEntryValue | null) {
  const currency = asString(value).toUpperCase() || "EUR";

  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new Error("Currency must be a three-letter code.");
  }

  return currency;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadPieceImage(file: FormDataEntryValue | null, prefix: string) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const blob = await put(`pieces/${prefix}-${Date.now()}-${safeName}`, file, {
    access: "public",
  });

  return blob.url;
}

function getGalleryImageUrls(formData: FormData) {
  return formData
    .getAll("galleryImages")
    .map((value) => asString(value))
    .filter(Boolean)
    .slice(0, MAX_GALLERY_IMAGES);
}

function getPieceData(formData: FormData) {
  const title = asString(formData.get("title"));
  const slugFromForm = asString(formData.get("slug"));
  const slug = slugFromForm || slugify(title);
  const shortDescription = asString(formData.get("shortDescription"));

  if (!title || !slug || !shortDescription) {
    throw new Error("Missing required piece fields.");
  }

  return {
    title,
    slug,
    collection: parseLignoraePieceCollection(asString(formData.get("collection"))),
    status: parsePieceStatus(asString(formData.get("status"))),
    year: asNullableString(formData.get("year")),
    material: asNullableString(formData.get("material")),
    atelier: asNullableString(formData.get("atelier")),
    shortDescription,
    story: asNullableString(formData.get("story")),
    image: asString(formData.get("image")),
    detailImage: asNullableString(formData.get("detailImage")),
    priceCents: parseEuroPriceToCents(asString(formData.get("priceEuros"))),
    currency: parseCurrency(formData.get("currency")),
    isPurchasable: formData.get("isPurchasable") === "on",
  };
}

async function getPieceDataWithImages(formData: FormData) {
  const data = getPieceData(formData);

  const uploadedMainImage = await uploadPieceImage(
    formData.get("mainImageFile"),
    "main"
  );
  const uploadedDetailImage = await uploadPieceImage(
    formData.get("detailImageFile"),
    "detail"
  );

  return {
    ...data,
    image: uploadedMainImage || data.image,
    detailImage: uploadedDetailImage || data.detailImage,
  };
}

function getId(formData: FormData) {
  return asString(formData.get("pieceId")) || asString(formData.get("id"));
}

type PieceTranslationPayload = {
  title: string;
  collection: string;
  shortDescription: string;
  story: string | null;
  material: string | null;
  atelier: string | null;
};

function getManualPieceTranslation(
  formData: FormData,
  locale: "DE" | "RO",
  fallback: PieceTranslationPayload
) {
  const prefix = locale.toLowerCase();
  const values = {
    title: asString(formData.get(`${prefix}Title`)),
    collection: asString(formData.get(`${prefix}Collection`)),
    shortDescription: asString(formData.get(`${prefix}ShortDescription`)),
    story: asNullableString(formData.get(`${prefix}Story`)),
    material: asNullableString(formData.get(`${prefix}Material`)),
    atelier: asNullableString(formData.get(`${prefix}Atelier`)),
  };

  if (!Object.values(values).some(Boolean)) return null;

  return {
    locale,
    title: values.title || fallback.title,
    collection: values.collection || fallback.collection,
    shortDescription: values.shortDescription || fallback.shortDescription,
    story: values.story ?? fallback.story,
    material: values.material ?? fallback.material,
    atelier: values.atelier ?? fallback.atelier,
  };
}

async function upsertManualPieceTranslations(
  pieceId: string,
  translations: Array<PieceTranslationPayload & { locale: "DE" | "RO" }>
) {
  for (const translation of translations) {
    const { locale, ...content } = translation;

    await prisma.pieceTranslation.upsert({
      where: { pieceId_locale: { pieceId, locale } },
      update: content,
      create: { pieceId, locale, ...content },
    });
  }
}

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

  if (!piece) return 0;

  const existingLocales = new Set(
    piece.translations.map((translation) => translation.locale)
  );

  const missingLocales = (["DE", "RO"] as const).filter(
    (locale) => !existingLocales.has(locale)
  );

  if (missingLocales.length === 0) return 0;

  let savedTranslations = 0;

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

    savedTranslations += 1;
  }

  return savedTranslations;
}

export async function createPiece(formData: FormData) {
  await requireAdminAction();

  const data = await getPieceDataWithImages(formData);
  const galleryImageUrls = getGalleryImageUrls(formData);

  if (!data.image) {
    throw new Error("Main image is required.");
  }

  const piece = await prisma.piece.create({
    data: {
      ...data,
      galleryImages:
        galleryImageUrls.length > 0
          ? {
              create: galleryImageUrls.map((imageUrl, index) => ({
                imageUrl,
                altText: `${data.title} image ${index + 1}`,
                sortOrder: index,
              })),
            }
          : undefined,
    },
  });

  try {
    await createMissingTranslationsForPiece(piece.id);
  } catch (error) {
    console.error("Piece translation generation failed:", error);
    refreshPieces();
    redirect("/admin?error=piece-translation-failed");
  }

  refreshPieces();
  redirect("/admin?success=piece-created");
}

export async function updatePiece(formData: FormData) {
  await requireAdminAction();
  const id = getId(formData);

  if (!id) {
    throw new Error("Missing piece id.");
  }

  const data = await getPieceDataWithImages(formData);
  const galleryImageUrls = getGalleryImageUrls(formData);

  const translationFallback: PieceTranslationPayload = {
    title: data.title,
    collection: data.collection,
    shortDescription: data.shortDescription,
    story: data.story,
    material: data.material,
    atelier: data.atelier,
  };

  const manualTranslations = (["DE", "RO"] as const)
    .map((locale) =>
      getManualPieceTranslation(formData, locale, translationFallback)
    )
    .filter(
      (translation): translation is PieceTranslationPayload & {
        locale: "DE" | "RO";
      } => translation !== null
    );

  await prisma.$transaction(async (tx) => {
    await tx.piece.update({
      where: { id },
      data,
    });

    if (galleryImageUrls.length > 0) {
      await tx.pieceImage.deleteMany({
        where: { pieceId: id },
      });

      await tx.pieceImage.createMany({
        data: galleryImageUrls.map((imageUrl, index) => ({
          pieceId: id,
          imageUrl,
          altText: `${data.title} image ${index + 1}`,
          sortOrder: index,
        })),
      });
    }
  });

  await upsertManualPieceTranslations(id, manualTranslations);

  refreshPieces();
  redirect("/admin?success=piece-updated");
}

export async function archivePiece(formData: FormData) {
  await requireAdminAction();
  const id = getId(formData);

  if (!id) {
    throw new Error("Missing piece id.");
  }

  await prisma.piece.update({
    where: { id },
    data: { status: "archived" },
  });

  refreshPieces();
  redirect("/admin?success=piece-archived");
}

export async function deletePiece(formData: FormData) {
  await requireAdminAction();
  const id = getId(formData);

  if (!id) {
    throw new Error("Missing piece id.");
  }

  await prisma.piece.delete({
    where: { id },
  });

  refreshPieces();
  redirect("/admin?success=piece-deleted");
}

export async function generateMissingPieceTranslations() {
  await requireAdminAction();
  const pieces = await prisma.piece.findMany({
    select: { id: true },
  });

  const expectedTranslations = pieces.length * 2;
  let savedTranslations = 0;

  try {
    for (const piece of pieces) {
      savedTranslations += await createMissingTranslationsForPiece(piece.id);
    }
  } catch (error) {
    console.error("Missing piece translation generation failed:", error);
    refreshPieces();
    redirect("/admin?error=piece-translation-failed");
  }

  refreshPieces();
  redirect(
    `/admin?success=piece-translations-generated&translations=${savedTranslations}&expected=${expectedTranslations}`
  );
}
