import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Journal
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Notes from the atelier.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            Experiments, material studies, surface decisions and quiet fragments
            from the making of LIGNORAE objects.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-28">
        {posts.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              No journal entries have been published yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group block overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#eeeae2]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="p-8 md:p-10">
                  <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
                    {post.createdAt.toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <h2 className="mb-6 text-3xl font-light leading-tight tracking-[-0.04em] text-black md:text-4xl">
                    {post.title}
                  </h2>

                  <p className="text-sm font-normal leading-7 text-black/95 md:text-base md:leading-8">
                    {post.excerpt}
                  </p>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-black/95 transition group-hover:text-black">
                    Read entry →
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
