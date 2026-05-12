import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/components/structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
    return {
      title: "Obiect de scris negăsit",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const translation = piece.translations[0];
  const title = translation?.title || piece.title;
  const collection = translation?.collection || piece.collection;
  const shortDescription = translation?.shortDescription || piece.shortDescription;
  const description = shortDescription.slice(0, 155);
  const canonical = `/ro/pieces/${piece.slug}`;
  const image = piece.detailImage || piece.image || "/og-image.jpg";

  return {
    title: `${title} — obiect de scris ${collection}`,
    description,
    alternates: {
      canonical,
      languages: {
        en: `/pieces/${piece.slug}`,
        de: `/de/pieces/${piece.slug}`,
        ro: canonical,
        "x-default": `/pieces/${piece.slug}`,
      },
    },
    openGraph: {
      title: `${title} — LIGNORAE ${collection}`,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — LIGNORAE ${collection}`,
      description,
      images: [image],
    },
  };
}

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Disponibil";
  if (normalizedStatus === "reserved") return "Rezervat";
  if (normalizedStatus === "sold") return "Vândut";
  if (normalizedStatus === "prototype-archive") return "Arhivă prototip";
  if (normalizedStatus === "archived") return "Arhivat";

  return status;
}

function getCollectionSlug(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "forma") return "forma";
  if (normalizedCollection === "origins") return "origins";
  if (normalizedCollection === "natura") return "natura";

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
  const collectionSlug = getCollectionSlug(piece.collection);

  const specs = [
    { label: "Status", value: getStatusLabel(piece.status) },
    piece.year ? { label: "An", value: piece.year } : null,
    material ? { label: "Material", value: material } : null,
    atelier ? { label: "Atelier", value: atelier } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <ProductSchema
        piece={{
          name: title,
          slug: piece.slug,
          shortDescription,
          woodSpecies: material,
          collection,
          status: piece.status,
          images: [
            { url: piece.image, alt: title },
            ...(piece.detailImage
              ? [{ url: piece.detailImage, alt: `${title} detaliu` }]
              : []),
          ],
        }}
      />

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-24 pt-40">
        <Link
          href={`/ro/collections/${collectionSlug}`}
          className="mb-14 inline-block text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:text-black"
        >
          ← Înapoi la colecție
        </Link>

        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="group overflow-hidden bg-[#eeeae2] lg:sticky lg:top-28">
            <Image
              src={piece.detailImage || piece.image}
              alt={title}
              width={1400}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 760px"
              className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
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
                href="/ro/contact"
                className="inline-flex justify-center border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black"
              >
                Solicită disponibilitatea
              </Link>

              <Link
                href="/ro/collections"
                className="inline-flex justify-center border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black"
              >
                Vezi colecțiile
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
                Note despre obiect
              </p>
              <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
                Material, suprafață și caracter.
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