import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArticleSchema } from "@/components/structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.journalPost.findUnique({
    where: {
      slug,
    },
  });

  if (!post || !post.published) {
    return {
      title: "Journal Entry Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = post.excerpt.slice(0, 155);
  const canonical = `/journal/${post.slug}`;

  return {
    title: `${post.title} — Journal`,
    description,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        de: `/de/journal/${post.slug}`,
        ro: `/ro/journal/${post.slug}`,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: `${post.title} — LIGNORAE Journal`,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: [
        {
          url: post.coverImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — LIGNORAE Journal`,
      description,
      images: [post.coverImage || "/og-image.jpg"],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.journalPost.findUnique({
    where: {
      slug,
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />
      <ArticleSchema
        entry={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
          coverImage: post.coverImage ? { url: post.coverImage } : null,
        }}
      />

      <article className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-28 pt-40">
        <Link
          href="/journal"
          className="mb-14 inline-block text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:text-black"
        >
          ← Back to journal
        </Link>

        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Journal
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              {post.title}
            </h1>
          </div>

          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-black/95">
              {post.createdAt.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
              {post.excerpt}
            </p>
          </div>
        </div>

        {post.coverImage && (
          <div className="mt-24 flex justify-center">
            <div className="group inline-flex overflow-hidden bg-[#eeeae2]">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1500}
                height={1000}
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="h-auto max-h-[820px] w-auto max-w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}

        <div className="mx-auto mt-24 max-w-4xl space-y-7 text-lg font-normal leading-9 text-black/95">
          {post.content
            .split("\n")
            .filter((paragraph) => paragraph.trim().length > 0)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
