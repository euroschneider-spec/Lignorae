"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@prisma/client";
import { isPiecePublic } from "@/lib/catalogue";
import { prisma } from "@/lib/prisma";
import { createPieceCheckoutSession } from "@/lib/stripe-checkout";

const CHECKOUT_LOCALES = ["EN", "DE", "RO"] as const satisfies Locale[];

function getLocale(value: FormDataEntryValue | null): Locale {
  const locale = String(value || "EN").toUpperCase();

  if (CHECKOUT_LOCALES.includes(locale as Locale)) {
    return locale as Locale;
  }

  return "EN";
}

function getPiecePath(slug: string, locale: Locale) {
  if (locale === "DE") return `/de/pieces/${slug}`;
  if (locale === "RO") return `/ro/pieces/${slug}`;

  return `/pieces/${slug}`;
}

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (configuredUrl) {
    const absoluteUrl = configuredUrl.startsWith("http")
      ? configuredUrl
      : `https://${configuredUrl}`;

    return absoluteUrl.replace(/\/$/, "");
  }

  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "https";

  if (!host) {
    throw new Error("Unable to determine the site URL for Stripe Checkout.");
  }

  return `${protocol}://${host}`;
}

export async function startPieceCheckout(formData: FormData) {
  const slug = String(formData.get("slug") || "");
  const locale = getLocale(formData.get("locale"));
  const fallbackPath = getPiecePath(slug, locale);

  if (!slug) {
    redirect("/");
  }

  const piece = await prisma.piece.findUnique({
    where: {
      slug,
    },
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
  });

  if (
    !piece ||
    !isPiecePublic(piece.status) ||
    piece.status.toLowerCase() !== "available" ||
    !piece.isPurchasable ||
    piece.priceCents === null
  ) {
    redirect(`${fallbackPath}?checkout=unavailable`);
  }

  const translation = piece.translations[0];
  const title = translation?.title || piece.title;
  const collection = translation?.collection || piece.collection;
  const shortDescription =
    translation?.shortDescription || piece.shortDescription;
  const origin = await getRequestOrigin();
  const piecePath = getPiecePath(piece.slug, locale);
  const checkoutUrl = await createPieceCheckoutSession({
    pieceId: piece.id,
    pieceSlug: piece.slug,
    title,
    collection,
    shortDescription,
    image: piece.detailImage || piece.image,
    priceCents: piece.priceCents,
    currency: piece.currency,
    successUrl: `${origin}${piecePath}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}${piecePath}?checkout=cancelled`,
  });

  redirect(checkoutUrl);
}
