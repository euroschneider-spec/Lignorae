import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PieceGallery from "@/components/PieceGallery";
import { prisma } from "@/lib/prisma";
import { isPiecePublic } from "@/lib/catalogue";
import { formatMoney } from "@/lib/money";
import { ProductSchema } from "@/components/structured-data";
import { startPieceCheckout } from "@/app/pieces/checkout/actions";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const piece = await prisma.piece.findUnique({
    where: { slug },
    include: {
      galleryImages: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!piece || !isPiecePublic(piece.status)) {
    return {
      title: "Writing Object Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `/pieces/${piece.slug}`;
  const description = piece.shortDescription.slice(0, 155);
  const image =
    piece.galleryImages[0]?.imageUrl ||
    piece.detailImage ||
    piece.image ||
    "/og-image.jpg";

  return {
    title: `${piece.title} — ${piece.collection} Writing Object`,
    description,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        de: `/de/pieces/${piece.slug}`,
        ro: `/ro/pieces/${piece.slug}`,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: `${piece.title} — LIGNORAE ${piece.collection}`,
      description,
      url: canonical,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: piece.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${piece.title} — LIGNORAE ${piece.collection}`,
      description,
      images: [image],
    },
  };
}

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Available";
  if (normalizedStatus === "reserved") return "Reserved";
  if (normalizedStatus === "sold") return "Sold";
  if (normalizedStatus === "prototype-archive") return "Prototype archive";

  return status;
}

function getCollectionSlug(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (
    normalizedCollection === "basics" ||
    normalizedCollection === "basic" ||
    normalizedCollection === "the first one hundred"
  ) {
    return "";
  }

  if (normalizedCollection === "forma") return "forma";
  if (normalizedCollection === "origins") return "origins";
  if (normalizedCollection === "natura") return "natura";

  return "";
}

function getCollectionLabel(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (
    normalizedCollection === "basics" ||
    normalizedCollection === "basic" ||
    normalizedCollection === "the first one hundred"
  ) {
    return "The First One Hundred";
  }

  return collection;
}

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const piece = await prisma.piece.findUnique({
    where: { slug },
    include: {
      galleryImages: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!piece || !isPiecePublic(piece.status)) {
    notFound();
  }

  const collectionSlug = getCollectionSlug(piece.collection);
  const collectionHref = collectionSlug
    ? `/collections/${collectionSlug}`
    : "/collections";

  const galleryImages = [
    { url: piece.image, alt: piece.title },
    ...(piece.detailImage
      ? [{ url: piece.detailImage, alt: `${piece.title} detail` }]
      : []),
    ...piece.galleryImages.map((image, index) => ({
      url: image.imageUrl,
      alt: image.altText || `${piece.title} gallery image ${index + 1}`,
    })),
  ];

  const uniqueGalleryImages = galleryImages.filter(
    (image, index, images) =>
      images.findIndex((candidate) => candidate.url === image.url) === index
  );

  const status = piece.status.toLowerCase();
  const hasPrice = piece.priceCents !== null;
  const canBuy = piece.isPurchasable && hasPrice && status === "available";
  const isReserved = status === "reserved";
  const isSold = status === "sold";
  const shouldShowEnquiry = !canBuy && !isReserved && !isSold;

  const contactLabel = isReserved
    ? "Request availability"
    : isSold
      ? "Request similar piece"
      : "Enquire";

  const specs = [
    { label: "Status", value: getStatusLabel(piece.status) },
    {
      label: "Price",
      value:
        piece.priceCents === null
          ? "On request"
          : formatMoney(piece.priceCents, piece.currency, "en-DE"),
    },
    piece.year ? { label: "Year", value: String(piece.year) } : null,
    piece.material ? { label: "Material", value: piece.material } : null,
    piece.atelier ? { label: "Atelier", value: piece.atelier } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <ProductSchema
        piece={{
          name: piece.title,
          slug: piece.slug,
          shortDescription: piece.shortDescription,
          woodSpecies: piece.material,
          collection: piece.collection,
          status: piece.status,
          priceCents: piece.priceCents,
          currency: piece.currency,
          isPurchasable: piece.isPurchasable,
          images: uniqueGalleryImages,
        }}
      />

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-6 pb-24 pt-32 md:px-9 md:pt-40">
        <Link
          href={collectionHref}
          className="mb-12 inline-block text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:text-black"
        >
          ← Back to edition
        </Link>

        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <PieceGallery images={uniqueGalleryImages} />
          </div>

          <div className="lg:pt-8">
            <p className="mb-8 text-[11px] uppercase tracking-[0.42em] text-black/95">
              {getCollectionLabel(piece.collection)}
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-[0.92] tracking-[-0.06em] text-black md:text-7xl">
              {piece.title}
            </h1>

            <p className="mt-10 max-w-2xl text-lg font-normal leading-9 text-black/95">
              {piece.shortDescription}
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
              {canBuy && (
                <form action={startPieceCheckout}>
                  <input type="hidden" name="slug" value={piece.slug} />
                  <input type="hidden" name="locale" value="EN" />
                  <button
                    type="submit"
                    className="inline-flex justify-center border border-black bg-black px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-transparent hover:text-black"
                  >
                    Buy this piece
                  </button>
                </form>
              )}

              {(isReserved || isSold || shouldShowEnquiry) && (
                <Link
                  href="/contact"
                  className="inline-flex justify-center border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black"
                >
                  {contactLabel}
                </Link>
              )}

              <Link
                href="/collections"
                className="inline-flex justify-center border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black"
              >
                View edition
              </Link>
            </div>
          </div>
        </div>
      </section>

      {piece.story && (
        <section className="border-y border-black/10 bg-[#fbfaf7] px-6 py-24 md:px-9 md:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
                Object notes
              </p>
              <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
                Material, surface and intention.
              </h2>
            </div>

            <div className="max-w-3xl space-y-7 text-lg font-normal leading-9 text-black/95">
              {piece.story.split("\n").map((paragraph, index) => (
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
