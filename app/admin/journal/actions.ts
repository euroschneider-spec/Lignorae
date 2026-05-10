"use server";

import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadJournalImage(file: File | null, slug: string) {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = file.name.split(".").pop() || "jpg";
  const pathname = `journal/${slug}-cover-${Date.now()}.${extension}`;

  const blob = await put(pathname, file, {
    access: "public",
  });

  return blob.url;
}

export async function createJournalPost(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const coverImageFile = formData.get("coverImageFile") as File | null;
  const published = formData.get("published") === "on";

  const slug = slugInput || createSlug(title);

  if (!title || !slug || !excerpt || !content) {
    throw new Error("Missing required journal fields.");
  }

  const coverImage = await uploadJournalImage(coverImageFile, slug);

  await prisma.journalPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      published,
      translations: {
        create: {
          locale: "EN",
          title,
          excerpt,
          content,
        },
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath("/");

  redirect("/admin?success=journal-created");
}

export async function updateJournalPost(formData: FormData) {
  const postId = String(formData.get("postId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const coverImageFile = formData.get("coverImageFile") as File | null;
  const published = formData.get("published") === "on";

  if (!postId || !title || !excerpt || !content) {
    throw new Error("Missing required journal fields.");
  }

  const existingPost = await prisma.journalPost.findUnique({
    where: {
      id: postId,
    },
  });

  if (!existingPost) {
    throw new Error("Journal post not found.");
  }

  const slug = slugInput || existingPost.slug || createSlug(title);
  const coverImage = await uploadJournalImage(coverImageFile, slug);

  await prisma.journalPost.update({
    where: {
      id: postId,
    },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || existingPost.coverImage,
      published,
      translations: {
        upsert: {
          where: {
            journalPostId_locale: {
              journalPostId: postId,
              locale: "EN",
            },
          },
          update: {
            title,
            excerpt,
            content,
          },
          create: {
            locale: "EN",
            title,
            excerpt,
            content,
          },
        },
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath(`/journal/${slug}`);
  revalidatePath("/");

  redirect("/admin?success=journal-updated");
}

export async function archiveJournalPost(formData: FormData) {
  const postId = String(formData.get("postId") || "").trim();

  if (!postId) {
    throw new Error("Missing journal post id.");
  }

  await prisma.journalPost.update({
    where: {
      id: postId,
    },
    data: {
      published: false,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath("/");

  redirect("/admin?success=journal-archived");
}

export async function publishJournalPost(formData: FormData) {
  const postId = String(formData.get("postId") || "").trim();

  if (!postId) {
    throw new Error("Missing journal post id.");
  }

  const post = await prisma.journalPost.update({
    where: {
      id: postId,
    },
    data: {
      published: true,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath(`/journal/${post.slug}`);
  revalidatePath("/");

  redirect("/admin?success=journal-published");
}

export async function deleteJournalPost(formData: FormData) {
  const postId = String(formData.get("postId") || "").trim();

  if (!postId) {
    throw new Error("Missing journal post id.");
  }

  await prisma.journalPost.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath("/");

  redirect("/admin?success=journal-deleted");
}