import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function JournalPage() {
  const posts = await prisma.journalPost.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Journal
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Notes from the atelier
        </h1>

        <p className="mb-20 max-w-5xl text-xl leading-relaxed text-[#d0cabf]">
          Experiments, materials, failures, discoveries, reclaimed woods,
          surface refinement, and the slow construction of LIGNORAE.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-10 text-center">
            <p className="text-lg leading-relaxed text-[#d0cabf]">
              No journal entries have been published yet.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group block overflow-hidden rounded-3xl border border-[#4a3522]/70 bg-[#21170f] transition duration-500 hover:-translate-y-1 hover:border-[#c6a66a]/60"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${post.coverImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                )}

                <div className="p-8">
                  <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                    {post.createdAt.toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <h2 className="mb-5 text-3xl font-light transition duration-300 group-hover:text-[#c6a66a]">
                    {post.title}
                  </h2>

                  <p className="leading-relaxed text-[#d0cabf]">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}