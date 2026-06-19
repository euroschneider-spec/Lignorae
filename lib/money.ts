export function parseEuroPriceToCents(value: string) {
  if (!value) return null;

  const match = value.match(/^(\d+)(?:[.,](\d{1,2}))?$/);

  if (!match) {
    throw new Error(
      "Price must be a non-negative euro amount with up to two decimals."
    );
  }

  const euros = BigInt(match[1]);
  const cents = BigInt((match[2] || "").padEnd(2, "0"));
  const totalCents = euros * BigInt(100) + cents;

  if (totalCents > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Price is too large.");
  }

  return Number(totalCents);
}

export function formatMoney(
  priceCents: number,
  currency: string,
  locale: string
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(priceCents / 100);
}
