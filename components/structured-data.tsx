

type PieceForSchema = {
  name: string;
  slug: string;
  shortDescription: string;
  woodSpecies?: string | null;
  collection: string;
  status: string;
  priceCents?: number | null;
  currency?: string;
  isPurchasable?: boolean;
  images: Array<{ url: string; alt?: string | null }>;
};

type EntryForSchema = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string | null;
  coverImage?: { url: string } | null;
};

const siteUrl = "https://www.lignorae.com";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LIGNORAE",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Sculptural fountain pens handcrafted in Munich from wood, fire and form.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "München",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/contact`,
      email: "info@lignorae.com",
    },
    sameAs: ["https://www.instagram.com/lignorae/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ piece }: { piece: PieceForSchema }) {
  const normalizedStatus = piece.status.toLowerCase();
  const availability =
    normalizedStatus === "available"
      ? "https://schema.org/InStock"
      : normalizedStatus === "reserved"
        ? "https://schema.org/PreOrder"
        : "https://schema.org/SoldOut";

  const offer =
    piece.isPurchasable &&
    piece.priceCents !== null &&
    piece.priceCents !== undefined
      ? {
          "@type": "Offer",
          availability,
          priceCurrency: piece.currency || "EUR",
          price: (piece.priceCents / 100).toFixed(2),
          seller: {
            "@type": "Organization",
            name: "LIGNORAE",
          },
        }
      : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${piece.name} — LIGNORAE ${piece.collection}`,
    description: piece.woodSpecies
      ? `${piece.shortDescription}. Handturned from ${piece.woodSpecies} in Munich.`
      : `${piece.shortDescription}. Handcrafted in Munich by LIGNORAE Atelier.`,
    url: `${siteUrl}/pieces/${piece.slug}`,
    brand: {
      "@type": "Brand",
      name: "LIGNORAE",
    },
    manufacturer: {
      "@type": "Organization",
      name: "LIGNORAE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "München",
        addressCountry: "DE",
      },
    },
    image: piece.images.map((image) => image.url),
    ...(piece.woodSpecies ? { material: piece.woodSpecies } : {}),
    ...(offer ? { offers: offer } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ entry }: { entry: EntryForSchema }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.excerpt,
    url: `${siteUrl}/journal/${entry.slug}`,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt || entry.publishedAt,
    author: {
      "@type": "Organization",
      name: "LIGNORAE",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "LIGNORAE",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    ...(entry.coverImage ? { image: entry.coverImage.url } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
