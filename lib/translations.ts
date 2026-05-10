

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
  "You are a professional luxury brand translator for LIGNORAE, a premium handcrafted fountain pen atelier. Translate all human-readable prose into the requested target language with elegance, restraint, warmth, and commercial polish. Preserve meaning, provenance, material nuance, and premium tone. Do not invent facts. Keep brand names, collection names such as ORIGIN, SACRA, SONORA, and material names only when they are proper names or normally used as-is. Do not leave English sentences untranslated. Return only valid JSON. Do not wrap the JSON in markdown.";

function normalizeComparableText(value: string | null | undefined) {
  return (value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function assertPieceWasTranslated(
  locale: TargetLocale,
  input: PieceTranslationInput,
  output: PieceTranslationOutput
) {
  const sourceDescription = normalizeComparableText(input.shortDescription);
  const translatedDescription = normalizeComparableText(output.shortDescription);
  const sourceStory = normalizeComparableText(input.story);
  const translatedStory = normalizeComparableText(output.story);

  const descriptionWasCopied =
    sourceDescription.length > 20 && sourceDescription === translatedDescription;
  const storyWasCopied = sourceStory.length > 20 && sourceStory === translatedStory;

  if (descriptionWasCopied && storyWasCopied) {
    throw new Error(
      `OpenAI returned untranslated piece content for locale ${locale}.`
    );
  }
}

function assertJournalWasTranslated(
  locale: TargetLocale,
  input: JournalTranslationInput,
  output: JournalTranslationOutput
) {
  const sourceExcerpt = normalizeComparableText(input.excerpt);
  const translatedExcerpt = normalizeComparableText(output.excerpt);
  const sourceContent = normalizeComparableText(input.content);
  const translatedContent = normalizeComparableText(output.content);

  const excerptWasCopied = sourceExcerpt.length > 20 && sourceExcerpt === translatedExcerpt;
  const contentWasCopied = sourceContent.length > 20 && sourceContent === translatedContent;

  if (excerptWasCopied && contentWasCopied) {
    throw new Error(
      `OpenAI returned untranslated journal content for locale ${locale}.`
    );
  }
}

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
- Translate every human-readable English sentence which is not a part of the programming language, into ${language}.
- Do not leave title, shortDescription, story, material, or atelier in English unless the value is a proper name, brand name, place name, or material name normally used as-is.
- Keep null values as null.
- Keep collection names elegant and brand-consistent. ORIGIN, SACRA, and SONORA may remain uppercase brand collection names.
- Do not add new claims.
- Do not include markdown.
- Return valid JSON only.

Source JSON:
${JSON.stringify(input, null, 2)}`,
  });

  const translated = parseJsonResponse<PieceTranslationOutput>(text);
  assertPieceWasTranslated(locale, input, translated);

  return translated;
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
- Translate every human-readable English sentence into ${language}.
- Do not leave title, excerpt, or content in English unless the value is a proper name, brand name, or place name.
- Preserve paragraph breaks in content.
- Keep the tone premium, warm, mature, and editorial.
- Do not add new claims.
- Do not include markdown.
- Return valid JSON only.

Source JSON:
${JSON.stringify(input, null, 2)}`,
  });

  const translated = parseJsonResponse<JournalTranslationOutput>(text);
  assertJournalWasTranslated(locale, input, translated);

  return translated;
}