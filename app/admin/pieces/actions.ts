"use server";

import { prisma } from "@/lib/prisma";
import { translatePieceContent } from "@/lib/translations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


async function generatePieceTranslations(input: {
  pieceId: string;
  title: string;
  collection: string;
  shortDescription: string;
  story: string | null;
  material: string | null;
  atelier: string | null;
}) {
  let savedTranslations = 0;

  for (const locale of ["DE", "RO"] as const) {
    try {
      const translation = await translatePieceContent(locale, {
        title: input.title,
        collection: input.collection,
        shortDescription: input.shortDescription,
        story: input.story,
        material: input.material,
        atelier: input.atelier,
      });

      await prisma.pieceTranslation.upsert({
        where: {
          pieceId_locale: {
            pieceId: input.pieceId,
            locale,
          },
        },
        update: translation,
        create: {
          pieceId: input.pieceId,
          locale,
          ...translation,
        },
      });

      savedTranslations += 1;
    } catch (error) {
      console.error(
        `Piece translation generation failed for ${input.pieceId} (${locale}):`,
        error
      );
    }
  }

  return savedTranslations;
}

function revalidatePiecePublicPaths(slug: string) {
  revalidatePath(`/pieces/${slug}`);
  revalidatePath(`/de/pieces/${slug}`);
  revalidatePath(`/ro/pieces/${slug}`);
}

function revalidatePieceCollections() {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/de");
  revalidatePath("/ro");
  revalidatePath("/collections");
  revalidatePath("/collections/origin");
  revalidatePath("/collections/sacra");
  revalidatePath("/collections/sonora");
  revalidatePath("/de/collections/origin");
  revalidatePath("/de/collections/sacra");
  revalidatePath("/de/collections/sonora");
  revalidatePath("/ro/collections/origin");
  revalidatePath("/ro/collections/sacra");
  revalidatePath("/ro/collections/sonora");
}

export async function createPiece(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const collection = String(formData.get("collection") || "").trim();
  const status = String(formData.get("status") || "prototype-archive").trim();
  const year = String(formData.get("year") || "").trim();
  const material = String(formData.get("material") || "").trim();
  const atelier = String(formData.get("atelier") || "").trim();
  const shortDescription = String(formData.get("shortDescription") || "").trim();
  const story = String(formData.get("story") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const detailImage = String(formData.get("detailImage") || "").trim();

  const slug = slugInput || createSlug(title);

  if (!title || !slug || !collection || !status || !shortDescription) {
    throw new Error("Missing required piece fields.");
  }

  if (!image) {
    throw new Error("Missing required main image.");
  }

  const piece = await prisma.piece.create({
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
      translations: {
        create: {
          locale: "EN",
          title,
          collection,
          shortDescription,
          story: story || null,
          material: material || null,
          atelier: atelier || null,
        },
      },
    },
  });

  const savedTranslations = await generatePieceTranslations({
    pieceId: piece.id,
    title,
    collection,
    shortDescription,
    story: story || null,
    material: material || null,
    atelier: atelier || null,
  });

  revalidatePieceCollections();
  revalidatePiecePublicPaths(slug);

  redirect(
    savedTranslations > 0
      ? `/admin?success=piece-created&translations=${savedTranslations}`
      : "/admin"
  );
}

export async function updatePiece(formData: FormData) {
  const pieceId = String(formData.get("pieceId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const collection = String(formData.get("collection") || "").trim();
  const status = String(formData.get("status") || "prototype-archive").trim();
  const year = String(formData.get("year") || "").trim();
  const material = String(formData.get("material") || "").trim();
  const atelier = String(formData.get("atelier") || "").trim();
  const shortDescription = String(formData.get("shortDescription") || "").trim();
  const story = String(formData.get("story") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const detailImage = String(formData.get("detailImage") || "").trim();

  if (!pieceId || !title || !collection || !status || !shortDescription) {
    throw new Error("Missing required piece fields.");
  }

  const existingPiece = await prisma.piece.findUnique({
    where: {
      id: pieceId,
    },
  });

  if (!existingPiece) {
    throw new Error("Piece not found.");
  }

  const slug = slugInput || existingPiece.slug || createSlug(title);

  await prisma.piece.update({
    where: {
      id: pieceId,
    },
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
      image: image || existingPiece.image,
      detailImage: detailImage || existingPiece.detailImage,
      translations: {
        upsert: {
          where: {
            pieceId_locale: {
              pieceId,
              locale: "EN",
            },
          },
          update: {
            title,
            collection,
            shortDescription,
            story: story || null,
            material: material || null,
            atelier: atelier || null,
          },
          create: {
            locale: "EN",
            title,
            collection,
            shortDescription,
            story: story || null,
            material: material || null,
            atelier: atelier || null,
          },
        },
      },
    },
  });

  const savedTranslations = await generatePieceTranslations({
    pieceId,
    title,
    collection,
    shortDescription,
    story: story || null,
    material: material || null,
    atelier: atelier || null,
  });

  revalidatePieceCollections();
  revalidatePiecePublicPaths(slug);

  redirect(
    savedTranslations > 0
      ? `/admin?success=piece-updated&translations=${savedTranslations}`
      : "/admin"
  );
}

export async function generateMissingPieceTranslations() {
  const pieces = await prisma.piece.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  let savedTranslations = 0;
  const expectedTranslations = pieces.length * 2;

  for (const piece of pieces) {
    savedTranslations += await generatePieceTranslations({
      pieceId: piece.id,
      title: piece.title,
      collection: piece.collection,
      shortDescription: piece.shortDescription,
      story: piece.story,
      material: piece.material,
      atelier: piece.atelier,
    });
  }

  revalidatePieceCollections();

  for (const piece of pieces) {
    revalidatePiecePublicPaths(piece.slug);
  }

  const params =
    savedTranslations > 0
      ? `success=piece-translations-generated&translations=${savedTranslations}&expected=${expectedTranslations}`
      : "translations=0";

  redirect(`/admin?${params}`);
}

export async function archivePiece(formData: FormData) {
  const pieceId = String(formData.get("pieceId") || "").trim();

  if (!pieceId) {
    throw new Error("Missing piece id.");
  }

  await prisma.piece.update({
    where: {
      id: pieceId,
    },
    data: {
      status: "archived",
    },
  });

  revalidatePieceCollections();

  redirect("/admin?success=piece-archived");
}

export async function deletePiece(formData: FormData) {
  const pieceId = String(formData.get("pieceId") || "").trim();

  if (!pieceId) {
    throw new Error("Missing piece id.");
  }

  await prisma.piece.delete({
    where: {
      id: pieceId,
    },
  });

  revalidatePieceCollections();

  redirect("/admin?success=piece-deleted");
}
