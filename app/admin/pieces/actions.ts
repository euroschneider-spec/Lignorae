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
  const [de, ro] = await Promise.all([
    translatePieceContent("DE", {
      title: input.title,
      collection: input.collection,
      shortDescription: input.shortDescription,
      story: input.story,
      material: input.material,
      atelier: input.atelier,
    }),
    translatePieceContent("RO", {
      title: input.title,
      collection: input.collection,
      shortDescription: input.shortDescription,
      story: input.story,
      material: input.material,
      atelier: input.atelier,
    }),
  ]);

  await Promise.all([
    prisma.pieceTranslation.upsert({
      where: {
        pieceId_locale: {
          pieceId: input.pieceId,
          locale: "DE",
        },
      },
      update: de,
      create: {
        pieceId: input.pieceId,
        locale: "DE",
        ...de,
      },
    }),
    prisma.pieceTranslation.upsert({
      where: {
        pieceId_locale: {
          pieceId: input.pieceId,
          locale: "RO",
        },
      },
      update: ro,
      create: {
        pieceId: input.pieceId,
        locale: "RO",
        ...ro,
      },
    }),
  ]);

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

  try {
    await generatePieceTranslations({
      pieceId: piece.id,
      title,
      collection,
      shortDescription,
      story: story || null,
      material: material || null,
      atelier: atelier || null,
    });
  } catch (error) {
    console.error("Piece translation generation failed:", error);
  }
  revalidatePieceCollections();
  revalidatePiecePublicPaths(slug);

  redirect("/admin?success=piece-created");
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

  try {
    await generatePieceTranslations({
      pieceId,
      title,
      collection,
      shortDescription,
      story: story || null,
      material: material || null,
      atelier: atelier || null,
    });
  } catch (error) {
    console.error("Piece translation generation failed:", error);
  }
  revalidatePieceCollections();
  revalidatePiecePublicPaths(slug);

  redirect("/admin?success=piece-updated");
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
    await generatePieceTranslations({
      pieceId: piece.id,
      title: piece.title,
      collection: piece.collection,
      shortDescription: piece.shortDescription,
      story: piece.story,
      material: piece.material,
      atelier: piece.atelier,
    });
  }

  const translatedRows = await prisma.pieceTranslation.findMany({
    where: {
      locale: {
        in: ["DE", "RO"],
      },
      pieceId: {
        in: pieces.map((piece) => piece.id),
      },
    },
    select: {
      pieceId: true,
      locale: true,
    },
  });

  savedTranslations = translatedRows.length;

  revalidatePieceCollections();

  for (const piece of pieces) {
    revalidatePiecePublicPaths(piece.slug);
  }

  redirect(
    `/admin?success=piece-translations-generated&translations=${savedTranslations}&expected=${expectedTranslations}`
  );
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