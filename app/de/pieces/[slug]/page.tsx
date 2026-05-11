import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Verfügbar";
  if (normalizedStatus === "reserved") return "Reserviert";
  if (normalizedStatus === "sold") return "Verkauft";
  if (normalizedStatus === "prototype-archive") return "Prototyp-Archiv";
  if (normalizedStatus === "archived") return "Archiviert";

  return status;
}

function getCollectionSlug(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "forma") return "forma";
  if (normalizedCollection === "origins") return "origins";
  if (normalizedCollection === "natura") return "natura";

  return normalizedCollection;
}

export default async function GermanPiecePage({
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
          locale: "DE",
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
  const collectionSlug = getCollectionSlug(piece.collection);

  const specs = [
    { label: "Status", value: getStatusLabel(piece.status) },
    piece.year ? { label: "Jahr", value: piece.year } : null,
    material ? { label: "Material", value: material } : null,
    atelier ? { label: "Atelier", value: atelier } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-24 pt-40">
        <Link
          href={`/de/collections/${collectionSlug}`}
          className="mb-14 inline-block text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:text-black"
        >
          ← Zurück zur Kollektion
        </Link>

        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="group relative aspect-[4/5] overflow-hidden bg-[#eeeae2] lg:sticky lg:top-28">
            <Image
              src={piece.detailImage || piece.image}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
            />
          </div>

          <div className="lg:pt-8">
            <p className="mb-8 text-[11px] uppercase tracking-[0.42em] text-black/95">
              {collection}
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              {title}
            </h1>

            <p className="mt-10 max-w-2xl text-lg font-normal leading-9 text-black/95">
              {shortDescription}
            </p>

            <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-[#fbfaf7] p-6">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/95">
                    {spec.label}
                  </p>
                  <p className="text-base font-normal leading-7 text-black/95">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/de/contact"
                className="inline-flex justify-center border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-black hover:text-white"
              >
                Verfügbarkeit anfragen
              </Link>

              <Link
                href="/de/collections"
                className="inline-flex justify-center border border-black/35 px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-black hover:text-white"
              >
                Kollektionen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {story && (
        <section className="border-y border-black/10 bg-[#fbfaf7] px-9 py-28">
          <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
                Objektnotizen
              </p>
              <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
                Material, Oberfläche und Charakter.
              </h2>
            </div>

            <div className="max-w-3xl space-y-7 text-lg font-normal leading-9 text-black/95">
              {story.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}