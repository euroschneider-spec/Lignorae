"use server";

import { prisma } from "@/lib/prisma";
import { translateJournalContent } from "@/lib/translations";
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

function getOptionalTranslation(formData: FormData, locale: "DE" | "RO") {
  const suffix = locale;
  const title = String(formData.get(`title${suffix}`) || "").trim();
  const excerpt = String(formData.get(`excerpt${suffix}`) || "").trim();
  const content = String(formData.get(`content${suffix}`) || "").trim();

  if (!title && !excerpt && !content) {
    return null;
  }

  return {
    locale,
    title,
    excerpt,
    content,
  };
}

async function upsertManualJournalTranslations(
  journalPostId: string,
  translations: Array<{
    locale: "DE" | "RO";
    title: string;
    excerpt: string;
    content: string;
  }>
) {
  for (const translation of translations) {
    await prisma.journalPostTranslation.upsert({
      where: {
        journalPostId_locale: {
          journalPostId,
          locale: translation.locale,
        },
      },
      update: {
        title: translation.title,
        excerpt: translation.excerpt,
        content: translation.content,
      },
      create: {
        journalPostId,
        locale: translation.locale,
        title: translation.title,
        excerpt: translation.excerpt,
        content: translation.content,
      },
    });
  }
}

async function generateJournalTranslations(input: {
  journalPostId: string;
  title: string;
  excerpt: string;
  content: string;
}) {
  let savedTranslations = 0;

  for (const locale of ["DE", "RO"] as const) {
    const existingTranslation = await prisma.journalPostTranslation.findUnique({
      where: {
        journalPostId_locale: {
          journalPostId: input.journalPostId,
          locale,
        },
      },
    });

    if (existingTranslation) {
      continue;
    }

    const translation = await translateJournalContent(locale, {
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
    });

    await prisma.journalPostTranslation.create({
      data: {
        journalPostId: input.journalPostId,
        locale,
        ...translation,
      },
    });

    savedTranslations += 1;
  }

  return savedTranslations;
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

  const post = await prisma.journalPost.create({
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

  let savedTranslations = 0;

  try {
    savedTranslations = await generateJournalTranslations({
      journalPostId: post.id,
      title,
      excerpt,
      content,
    });
  } catch (error) {
    console.error("Journal translation generation failed:", error);
    redirect("/admin?error=journal-translation-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath("/");

  redirect(
    savedTranslations > 0
      ? `/admin?success=journal-created&translations=${savedTranslations}`
      : "/admin"
  );
}

export async function updateJournalPost(formData: FormData) {
  const postId = String(formData.get("postId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const coverImageFile = formData.get("coverImageFile") as File | null;
  const published = formData.get("published") === "on";

  const manualTranslations = [
    getOptionalTranslation(formData, "DE"),
    getOptionalTranslation(formData, "RO"),
  ].filter((translation) => translation !== null);

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

  await upsertManualJournalTranslations(postId, manualTranslations);

  const manualTranslationCount = manualTranslations.length;
  let savedTranslations = manualTranslationCount;

  if (manualTranslationCount === 0) {
    try {
      savedTranslations = await generateJournalTranslations({
        journalPostId: postId,
        title,
        excerpt,
        content,
      });
    } catch (error) {
      console.error("Journal translation generation failed:", error);
      redirect("/admin?error=journal-translation-failed");
    }
  }

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath("/de/journal");
  revalidatePath(`/de/journal/${slug}`);
  revalidatePath("/ro/journal");
  revalidatePath(`/ro/journal/${slug}`);
  revalidatePath(`/journal/${slug}`);
  revalidatePath("/");

  redirect(
    savedTranslations > 0
      ? `/admin?success=journal-updated&translations=${savedTranslations}`
      : "/admin"
  );
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
  revalidatePath("/de/journal");
  revalidatePath("/ro/journal");
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
  revalidatePath("/de/journal");
  revalidatePath(`/de/journal/${post.slug}`);
  revalidatePath("/ro/journal");
  revalidatePath(`/ro/journal/${post.slug}`);
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
  revalidatePath("/de/journal");
  revalidatePath("/ro/journal");
  revalidatePath("/");

  redirect("/admin?success=journal-deleted");
}

export async function generateMissingJournalTranslations() {
  const posts = await prisma.journalPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  let savedTranslations = 0;
  const expectedTranslations = posts.length * 2;

  try {
    for (const post of posts) {
      savedTranslations += await generateJournalTranslations({
        journalPostId: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
      });
    }
  } catch (error) {
    console.error("Missing journal translation generation failed:", error);
    redirect("/admin?error=journal-translation-failed");
  }

  revalidatePath("/admin");
  revalidatePath("/journal");
  revalidatePath("/de/journal");
  revalidatePath("/ro/journal");
  revalidatePath("/");

  for (const post of posts) {
    revalidatePath(`/journal/${post.slug}`);
    revalidatePath(`/de/journal/${post.slug}`);
    revalidatePath(`/ro/journal/${post.slug}`);
  }

  redirect(
    `/admin?success=journal-translations-generated&translations=${savedTranslations}&expected=${expectedTranslations}`
  );
}
