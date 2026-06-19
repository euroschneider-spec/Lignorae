import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_MS = 15 * 60 * 1000;
const MAX_CLOCK_SKEW_MS = 30 * 1000;
const TOKEN_PURPOSE = "lignorae-admin-blob-upload";

function getSigningSecret() {
  const secret =
    process.env.BLOB_READ_WRITE_TOKEN || process.env.ADMIN_PASSWORD;

  if (!secret) {
    throw new Error("Admin upload signing credentials are not configured.");
  }

  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSigningSecret())
    .update(`${TOKEN_PURPOSE}:${payload}`)
    .digest("base64url");
}

export function createAdminUploadToken() {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const nonce = randomBytes(18).toString("base64url");
  const payload = `${expiresAt}.${nonce}`;

  return `${payload}.${sign(payload)}`;
}

export function isAdminUploadTokenValid(token: string | null) {
  if (!token) return false;

  const parts = token.split(".");

  if (parts.length !== 3) return false;

  const [expiresAtValue, nonce, suppliedSignature] = parts;
  const expiresAt = Number(expiresAtValue);
  const now = Date.now();

  if (
    !Number.isSafeInteger(expiresAt) ||
    !nonce ||
    expiresAt < now ||
    expiresAt > now + TOKEN_TTL_MS + MAX_CLOCK_SKEW_MS
  ) {
    return false;
  }

  const expectedSignature = Buffer.from(
    sign(`${expiresAtValue}.${nonce}`),
    "base64url"
  );
  const actualSignature = Buffer.from(suppliedSignature, "base64url");

  return (
    expectedSignature.length === actualSignature.length &&
    timingSafeEqual(expectedSignature, actualSignature)
  );
}
