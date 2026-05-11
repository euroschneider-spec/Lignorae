import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function RomanianJournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.journalPost.findUnique({
    where: {
      slug,
    },
    include: {
      translations: {
        where: {
          locale: "RO",
        },
      },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  const translation = post.translations[0];
  const title = translation?.title || post.title;
  const excerpt = translation?.excerpt || post.excerpt;
  const content = translation?.content || post.content;

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <article className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-28 pt-40">
        <Link
          href="/ro/journal"
          className="mb-14 inline-block text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:text-black"
        >
          ← Înapoi la jurnal
        </Link>

        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Jurnal
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              {title}
            </h1>
          </div>

          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-black/95">
              {post.createdAt.toLocaleDateString("ro-RO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
              {excerpt}
            </p>
          </div>
        </div>

        {post.coverImage && (
          <div className="group relative mt-24 aspect-[16/9] overflow-hidden bg-[#eeeae2]">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="mx-auto mt-24 max-w-4xl space-y-7 text-lg font-normal leading-9 text-black/95">
          {content
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