import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

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
    <main className="min-h-screen bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <article className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/journal"
            className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
          >
            Back to journal
          </Link>

          <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
            Journal
          </p>

          <h1 className="mb-8 text-5xl font-light leading-tight md:text-7xl">
            {post.title}
          </h1>

          <p className="mb-10 text-xl leading-relaxed text-[#d0cabf]">
            {post.excerpt}
          </p>

          {post.coverImage && (
            <div className="mb-12 overflow-hidden rounded-[2rem] border border-[#4a3522]/70 bg-[#21170f]">
              <div
                className="aspect-[16/9] bg-cover bg-center"
                style={{ backgroundImage: `url('${post.coverImage}')` }}
              />
            </div>
          )}

          <div className="space-y-6 text-lg leading-relaxed text-[#d0cabf]">
            {post.content.split("\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
