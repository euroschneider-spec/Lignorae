-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'DE', 'RO');

-- CreateTable
CREATE TABLE "PieceTranslation" (
    "id" TEXT NOT NULL,
    "pieceId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "story" TEXT,
    "material" TEXT,
    "atelier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PieceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalPostTranslation" (
    "id" TEXT NOT NULL,
    "journalPostId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalPostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PieceTranslation_pieceId_locale_key" ON "PieceTranslation"("pieceId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "JournalPostTranslation_journalPostId_locale_key" ON "JournalPostTranslation"("journalPostId", "locale");

-- AddForeignKey
ALTER TABLE "PieceTranslation" ADD CONSTRAINT "PieceTranslation_pieceId_fkey" FOREIGN KEY ("pieceId") REFERENCES "Piece"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalPostTranslation" ADD CONSTRAINT "JournalPostTranslation_journalPostId_fkey" FOREIGN KEY ("journalPostId") REFERENCES "JournalPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
