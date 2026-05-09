export type PieceStatus = "available" | "reserved" | "sold" | "prototype-archive";

export type Piece = {
  title: string;
  collection: "origin" | "sacra" | "sonora";
  slug: string;
  href: string;
  image: string;
  detailImage: string;
  status: PieceStatus;
  year: string;
  material: string;
  atelier: string;
  shortDescription: string;
  createdAt: string;
};

export const pieces: Piece[] = [
  {
    title: "ORIGIN No. 1",
    collection: "origin",
    slug: "origin-no-1",
    href: "/collections/origin/origin-no-1",
    image: "/origin-no-1.jpg",
    detailImage: "/origin-no-1-detail.jpg",
    status: "prototype-archive",
    year: "2026",
    material: "Figured wood",
    atelier: "Munich Atelier",
    shortDescription:
      "A first LIGNORAE study in proportion, surface, warmth, and the quiet presence of figured wood.",
    createdAt: "2026-05-09",
  },
  {
    title: "ORIGIN No. 2",
    collection: "origin",
    slug: "origin-no-2",
    href: "/collections/origin/origin-no-2",
    image: "/origin-no-2.jpg",
    detailImage: "/origin-no-2-detail.jpg",
    status: "prototype-archive",
    year: "2026",
    material: "Figured hardwood",
    atelier: "Munich Atelier",
    shortDescription:
      "A warm, gold-accented study in linear grain, polished metal, and the calm presence of natural material.",
    createdAt: "2026-05-10",
  },
  {
    title: "ORIGIN No. 3",
    collection: "origin",
    slug: "origin-no-3",
    href: "/collections/origin/origin-no-3",
    image: "/origin-no-3.jpg",
    detailImage: "/origin-no-3-detail.jpg",
    status: "prototype-archive",
    year: "2026",
    material: "Dark figured hardwood",
    atelier: "Munich Atelier",
    shortDescription:
      "A darker, more contemplative study in polished depth, golden reflections, shadow, and grain.",
    createdAt: "2026-05-11",
  },
  {
    title: "ORIGIN No. 4",
    collection: "origin",
    slug: "origin-no-4",
    href: "/collections/origin/origin-no-4",
    image: "/origin-no-4.jpg",
    detailImage: "/origin-no-4-detail.jpg",
    status: "prototype-archive",
    year: "2026",
    material: "Light figured hardwood",
    atelier: "Munich Atelier",
    shortDescription:
      "A lighter ORIGIN study in warmth, clarity, gentle contrast, and everyday elegance.",
    createdAt: "2026-05-12",
  },
];

export function getPiecesByCollection(collection: Piece["collection"]) {
  return pieces
    .filter((piece) => piece.collection === collection)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLatestPieces(limit = 4) {
  return [...pieces]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getPieceBySlug(slug: string) {
  return pieces.find((piece) => piece.slug === slug);
}

export function getStatusLabel(status: PieceStatus) {
  const labels: Record<PieceStatus, string> = {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    "prototype-archive": "Prototype archive",
  };

  return labels[status];
}