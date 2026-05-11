import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GermanJournalPage() {
  const posts = await prisma.journalPost.findMany({
    where: {
      published: true,
    },
    include: {
      translations: {
        where: {
          locale: "DE",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Journal
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Notizen aus dem Atelier.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
            Experimente, Materialien, Fehler, Entdeckungen, Oberflächentests und
            der langsame Aufbau der LIGNORAE-Sprache.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-9 pb-28">
        {posts.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-light leading-7 text-black/70">
              Es wurden noch keine Journal-Einträge veröffentlicht.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => {
              const translation = post.translations[0];
              const title = translation?.title || post.title;
              const excerpt = translation?.excerpt || post.excerpt;

              return (
                <Link
                  key={post.id}
                  href={`/de/journal/${post.slug}`}
                  className="group overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eeeae2]">
                      <Image
                        src={post.coverImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/55">
                      {post.createdAt.toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <h2 className="mb-5 text-4xl font-light leading-tight tracking-[-0.05em] text-black md:text-5xl">
                      {title}
                    </h2>

                    <p className="mb-8 text-base font-light leading-8 text-black/70">
                      {excerpt}
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.35em] text-black/60 transition group-hover:text-black">
                      Artikel lesen →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}