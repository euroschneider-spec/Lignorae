

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
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <article className="flex-1 px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/ro/journal"
            className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
          >
            ← Înapoi la jurnal
          </Link>

          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#c6a66a]">
            {post.createdAt.toLocaleDateString("ro-RO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <h1 className="mb-8 text-5xl font-light leading-tight md:text-6xl">
            {title}
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-[#d0cabf]">
            {excerpt}
          </p>

          {post.coverImage && (
            <div className="group mb-12 overflow-hidden rounded-[2rem] border border-[#c6a66a]/35 bg-[#21170f] shadow-[0_0_35px_rgba(198,166,106,0.08)] transition duration-500 hover:border-[#c6a66a]/70 hover:shadow-[0_0_45px_rgba(198,166,106,0.16)]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${post.coverImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </div>
          )}

          <div className="prose prose-invert max-w-none prose-p:text-[#d0cabf] prose-p:leading-8 prose-p:text-lg prose-headings:font-light prose-headings:text-[#f5f1e8]">
            {content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}