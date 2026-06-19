import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { publicPieceWhere } from "@/lib/catalogue";
const siteUrl = "https://www.lignorae.com";

const legalRouteEndings = [
  "/legal-notice",
  "/privacy-policy",
  "/terms",
  "/withdrawal",
  "/shipping",
];

function getStaticRoutePriority(route: string) {
  if (route === "") return 1;

  if (route === "/de" || route === "/ro") return 0.6;

  if (legalRouteEndings.some((ending) => route.endsWith(ending))) {
    return 0.3;
  }

  return 0.7;
}

const staticRoutes = [
  "",
  "/about",
  "/collections",
  "/collections/forma",
  "/collections/origins",
  "/collections/natura",
  "/journal",
  "/contact",
  "/legal-notice",
  "/privacy-policy",
  "/terms",
  "/withdrawal",
  "/shipping",
  "/de",
  "/de/about",
  "/de/collections",
  "/de/collections/forma",
  "/de/collections/origins",
  "/de/collections/natura",
  "/de/journal",
  "/de/contact",
  "/de/legal-notice",
  "/de/privacy-policy",
  "/de/terms",
  "/de/withdrawal",
  "/de/shipping",
  "/ro",
  "/ro/about",
  "/ro/collections",
  "/ro/collections/forma",
  "/ro/collections/origins",
  "/ro/collections/natura",
  "/ro/journal",
  "/ro/contact",
  "/ro/legal-notice",
  "/ro/privacy-policy",
  "/ro/terms",
  "/ro/withdrawal",
  "/ro/shipping",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pieces = await prisma.piece.findMany({
    where: publicPieceWhere(),
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const journalPosts = await prisma.journalPost.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: getStaticRoutePriority(route),
  }));

  const pieceEntries: MetadataRoute.Sitemap = pieces.flatMap((piece) => [
    {
      url: `${siteUrl}/pieces/${piece.slug}`,
      lastModified: piece.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/de/pieces/${piece.slug}`,
      lastModified: piece.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/ro/pieces/${piece.slug}`,
      lastModified: piece.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]);

  const journalEntries: MetadataRoute.Sitemap = journalPosts.flatMap((post) => [
    {
      url: `${siteUrl}/journal/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/de/journal/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/ro/journal/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]);

  return [...staticEntries, ...pieceEntries, ...journalEntries];
}
