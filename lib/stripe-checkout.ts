import "server-only";

type CreatePieceCheckoutSessionInput = {
  pieceId: string;
  pieceSlug: string;
  title: string;
  collection: string;
  shortDescription: string;
  image: string;
  priceCents: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
};

type StripeCheckoutSessionResponse = {
  url?: string | null;
  error?: {
    message?: string;
  };
};

const STRIPE_CHECKOUT_SESSIONS_URL =
  "https://api.stripe.com/v1/checkout/sessions";

function getStripeSecretKey() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Stripe secret key is not configured.");
  }

  return secretKey;
}

function appendIfAbsoluteImageUrl(params: URLSearchParams, image: string) {
  try {
    const imageUrl = new URL(image);

    if (imageUrl.protocol === "https:" || imageUrl.protocol === "http:") {
      params.append("line_items[0][price_data][product_data][images][0]", image);
    }
  } catch {
    // Relative image paths are valid for the site but not for Stripe product images.
  }
}

export async function createPieceCheckoutSession({
  pieceId,
  pieceSlug,
  title,
  collection,
  shortDescription,
  image,
  priceCents,
  currency,
  successUrl,
  cancelUrl,
}: CreatePieceCheckoutSessionInput) {
  const params = new URLSearchParams();

  params.set("mode", "payment");
  params.set("client_reference_id", pieceId);
  params.set("success_url", successUrl);
  params.set("cancel_url", cancelUrl);
  params.set("line_items[0][quantity]", "1");
  params.set(
    "line_items[0][price_data][currency]",
    currency.trim().toLowerCase()
  );
  params.set(
    "line_items[0][price_data][unit_amount]",
    String(priceCents)
  );
  params.set(
    "line_items[0][price_data][product_data][name]",
    `${title} — ${collection}`
  );
  params.set(
    "line_items[0][price_data][product_data][description]",
    shortDescription
  );
  params.set("metadata[pieceId]", pieceId);
  params.set("metadata[pieceSlug]", pieceSlug);
  params.set("payment_intent_data[metadata][pieceId]", pieceId);
  params.set("payment_intent_data[metadata][pieceSlug]", pieceSlug);
  appendIfAbsoluteImageUrl(params, image);

  const response = await fetch(STRIPE_CHECKOUT_SESSIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getStripeSecretKey()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    cache: "no-store",
  });

  const session = (await response.json()) as StripeCheckoutSessionResponse;

  if (!response.ok) {
    throw new Error(
      session.error?.message || "Stripe Checkout session could not be created."
    );
  }

  if (!session.url) {
    throw new Error("Stripe Checkout session did not include a redirect URL.");
  }

  return session.url;
}
