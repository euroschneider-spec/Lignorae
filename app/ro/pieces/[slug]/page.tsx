import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Disponibil";
  if (normalizedStatus === "reserved") return "Rezervat";
  if (normalizedStatus === "sold") return "Vândut";
  if (normalizedStatus === "prototype-archive") return "Arhivă prototip";

  return status;
}

function getCollectionSlug(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "origins") return "origin";
  if (normalizedCollection === "origin") return "origin";
  if (normalizedCollection === "sacra") return "sacra";
  if (normalizedCollection === "sonora") return "sonora";

  return normalizedCollection;
}

export default async function RomanianPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const piece = await prisma.piece.findUnique({
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

  if (!piece || piece.status === "draft" || piece.status === "archived") {
    notFound();
  }

  const translation = piece.translations[0];
  const title = translation?.title || piece.title;
  const collection = translation?.collection || piece.collection;
  const shortDescription = translation?.shortDescription || piece.shortDescription;
  const story = translation?.story || piece.story;
  const material = translation?.material || piece.material;
  const atelier = translation?.atelier || piece.atelier;

  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="flex-1 px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Link
              href={`/ro/collections/${getCollectionSlug(piece.collection)}`}
              className="mb-10 inline-block text-sm uppercase tracking-[0.25em] text-[#c6a66a] transition hover:text-[#f5f1e8]"
            >
              ← Înapoi la colecție
            </Link>

            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
              {collection}
            </p>

            <h1 className="mb-8 text-5xl font-light leading-tight md:text-6xl">
              {title}
            </h1>

            <p className="mb-10 text-xl leading-relaxed text-[#d0cabf]">
              {shortDescription}
            </p>

            <div className="grid gap-4 text-sm uppercase tracking-[0.22em] text-[#c6a66a] sm:grid-cols-2">
              <div className="rounded-2xl border border-[#4a3522]/70 bg-[#21170f] p-5">
                Status
                <p className="mt-2 text-base normal-case tracking-normal text-[#f5f1e8]">
                  {getStatusLabel(piece.status)}
                </p>
              </div>

              {piece.year && (
                <div className="rounded-2xl border border-[#4a3522]/70 bg-[#21170f] p-5">
                  An
                  <p className="mt-2 text-base normal-case tracking-normal text-[#f5f1e8]">
                    {piece.year}
                  </p>
                </div>
              )}

              {material && (
                <div className="rounded-2xl border border-[#4a3522]/70 bg-[#21170f] p-5">
                  Material
                  <p className="mt-2 text-base normal-case tracking-normal text-[#f5f1e8]">
                    {material}
                  </p>
                </div>
              )}

              {atelier && (
                <div className="rounded-2xl border border-[#4a3522]/70 bg-[#21170f] p-5">
                  Atelier
                  <p className="mt-2 text-base normal-case tracking-normal text-[#f5f1e8]">
                    {atelier}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="group overflow-hidden rounded-[2rem] border border-[#c6a66a]/35 bg-[#21170f] shadow-[0_0_35px_rgba(198,166,106,0.08)] transition duration-500 hover:border-[#c6a66a]/70 hover:shadow-[0_0_45px_rgba(198,166,106,0.16)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${piece.detailImage || piece.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {story && (
          <div className="mx-auto mt-20 max-w-4xl border-t border-[#4a3522]/70 pt-16">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#c6a66a]">
              Povestea piesei
            </p>

            <div className="space-y-6 text-lg leading-8 text-[#d0cabf]">
              {story.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}