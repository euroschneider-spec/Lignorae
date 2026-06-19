import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.piece.createMany({
    data: [
      {
        title: "ORIGIN No. 1",
        collection: "ORIGINS",
        slug: "origin-no-1",
        status: "prototype-archive",
        year: "2026",
        material: "Figured wood",
        atelier: "Munich Atelier",
        shortDescription:
          "A first LIGNORAE study in proportion, surface, warmth, and the quiet presence of figured wood.",
        image: "/origin-no-1.jpg",
        detailImage: "/origin-no-1-detail.jpg",
      },

      {
        title: "ORIGIN No. 2",
        collection: "ORIGINS",
        slug: "origin-no-2",
        status: "prototype-archive",
        year: "2026",
        material: "Figured hardwood",
        atelier: "Munich Atelier",
        shortDescription:
          "A warm, gold-accented study in linear grain, polished metal, and the calm presence of natural material.",
        image: "/origin-no-2.jpg",
        detailImage: "/origin-no-2-detail.jpg",
      },

      {
        title: "ORIGIN No. 3",
        collection: "ORIGINS",
        slug: "origin-no-3",
        status: "prototype-archive",
        year: "2026",
        material: "Dark figured hardwood",
        atelier: "Munich Atelier",
        shortDescription:
          "A darker, more contemplative study in polished depth, golden reflections, shadow, and grain.",
        image: "/origin-no-3.jpg",
        detailImage: "/origin-no-3-detail.jpg",
      },

      {
        title: "ORIGIN No. 4",
        collection: "ORIGINS",
        slug: "origin-no-4",
        status: "prototype-archive",
        year: "2026",
        material: "Light figured hardwood",
        atelier: "Munich Atelier",
        shortDescription:
          "A lighter ORIGIN study in warmth, clarity, gentle contrast, and everyday elegance.",
        image: "/origin-no-4.jpg",
        detailImage: "/origin-no-4-detail.jpg",
      },
    ],
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
