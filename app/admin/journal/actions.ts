

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

export async function createJournalPost(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim();
  const published = formData.get("published") === "on";

  const slug = slugInput || createSlug(title);

  if (!title || !slug || !excerpt || !content) {
    throw new Error("Missing required journal fields.");
  }

  await prisma.journalPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      published,
    },
  });

  redirect("/admin");
}