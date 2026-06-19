import type { Prisma } from "@prisma/client";

export const PIECE_COLLECTIONS = ["FORMA", "ORIGINS", "NATURA"] as const;
export type PieceCollection = (typeof PIECE_COLLECTIONS)[number];

export const PIECE_STATUSES = [
  "prototype-archive",
  "draft",
  "available",
  "reserved",
  "sold",
  "archived",
] as const;
export type PieceStatus = (typeof PIECE_STATUSES)[number];

const PUBLIC_PIECE_STATUSES: PieceStatus[] = [
  "prototype-archive",
  "available",
  "reserved",
  "sold",
];

export function parsePieceCollection(value: string): PieceCollection {
  const normalized = value.trim().toUpperCase();
  const canonical = normalized === "ORIGIN" ? "ORIGINS" : normalized;

  if (PIECE_COLLECTIONS.includes(canonical as PieceCollection)) {
    return canonical as PieceCollection;
  }

  throw new Error("Invalid piece collection.");
}

export function parsePieceStatus(value: string): PieceStatus {
  const normalized = value.trim().toLowerCase();

  if (PIECE_STATUSES.includes(normalized as PieceStatus)) {
    return normalized as PieceStatus;
  }

  throw new Error("Invalid piece status.");
}

export function isPiecePublic(status: string) {
  return PUBLIC_PIECE_STATUSES.includes(
    status.trim().toLowerCase() as PieceStatus
  );
}

export function publicPieceWhere(
  additional?: Prisma.PieceWhereInput
): Prisma.PieceWhereInput {
  return {
    AND: [
      { status: { in: PUBLIC_PIECE_STATUSES } },
      ...(additional ? [additional] : []),
    ],
  };
}
