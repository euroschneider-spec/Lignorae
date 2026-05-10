

import { generateOpenAIText, parseJsonResponse } from "./openai";

type TargetLocale = "DE" | "RO";

type PieceTranslationInput = {
  title: string;
  collection: string;
  shortDescription: string;
  story: string | null;
  material: string | null;
  atelier: string | null;
};

type PieceTranslationOutput = {
  title: string;
  collection: string;
  shortDescription: string;
  story: string | null;
  material: string | null;
  atelier: string | null;
};

type JournalTranslationInput = {
  title: string;
  excerpt: string;
  content: string;
};

type JournalTranslationOutput = {
  title: string;
  excerpt: string;
  content: string;
};

function getLanguageName(locale: TargetLocale) {
  if (locale === "DE") return "German";
  if (locale === "RO") return "Romanian";

  return locale;
}

const systemPrompt =
  "You are a professional luxury brand translator for LIGNORAE, a premium handcrafted fountain pen atelier. Translate with elegance, restraint, warmth, and commercial polish. Preserve meaning, provenance, material nuance, and premium tone. Do not invent facts. Return only valid JSON. Do not wrap the JSON in markdown.";

export async function translatePieceContent(
  locale: TargetLocale,
  input: PieceTranslationInput
) {
  const language = getLanguageName(locale);

  const text = await generateOpenAIText({
    system: systemPrompt,
    user: `Translate this LIGNORAE piece content into ${language}.

Return only valid JSON with exactly these keys:
- title
- collection
- shortDescription
- story
- material
- atelier

Rules:
- Keep null values as null.
- Keep collection names elegant and brand-consistent.
- Do not add new claims.
- Do not include markdown.

Source JSON:
${JSON.stringify(input, null, 2)}`,
  });

  return parseJsonResponse<PieceTranslationOutput>(text);
}

export async function translateJournalContent(
  locale: TargetLocale,
  input: JournalTranslationInput
) {
  const language = getLanguageName(locale);

  const text = await generateOpenAIText({
    system: systemPrompt,
    user: `Translate this LIGNORAE journal entry into ${language}.

Return only valid JSON with exactly these keys:
- title
- excerpt
- content

Rules:
- Preserve paragraph breaks in content.
- Keep the tone premium, warm, mature, and editorial.
- Do not add new claims.
- Do not include markdown.

Source JSON:
${JSON.stringify(input, null, 2)}`,
  });

  return parseJsonResponse<JournalTranslationOutput>(text);
}