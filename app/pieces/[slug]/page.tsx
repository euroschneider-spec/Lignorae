import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const piece = await prisma.piece.findUnique({
    where: {
      slug,
    },
  });

  if (!piece) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
          >
            Back to home
          </Link>

          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] border border-[#4a3522]/70 bg-[#21170f]">
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: `url('${piece.detailImage || piece.image}')` }}
              />
            </div>

            <article>
              <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
                {piece.collection}
              </p>

              <h1 className="mb-8 text-5xl font-light leading-tight md:text-7xl">
                {piece.title}
              </h1>

              <p className="mb-10 text-xl leading-relaxed text-[#d0cabf]">
                {piece.shortDescription}
              </p>

              <div className="mb-10 grid gap-4 rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-6 text-sm text-[#d0cabf] md:grid-cols-2">
                {piece.material && (
                  <div>
                    <p className="mb-1 uppercase tracking-[0.25em] text-[#c6a66a]">
                      Material
                    </p>
                    <p>{piece.material}</p>
                  </div>
                )}

                {piece.year && (
                  <div>
                    <p className="mb-1 uppercase tracking-[0.25em] text-[#c6a66a]">
                      Year
                    </p>
                    <p>{piece.year}</p>
                  </div>
                )}

                {piece.atelier && (
                  <div>
                    <p className="mb-1 uppercase tracking-[0.25em] text-[#c6a66a]">
                      Atelier
                    </p>
                    <p>{piece.atelier}</p>
                  </div>
                )}

                <div>
                  <p className="mb-1 uppercase tracking-[0.25em] text-[#c6a66a]">
                    Status
                  </p>
                  <p>{piece.status}</p>
                </div>
              </div>

              {piece.story && (
                <div className="space-y-6 text-lg leading-relaxed text-[#d0cabf]">
                  {piece.story.split("\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}