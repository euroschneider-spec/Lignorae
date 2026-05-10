function extractTextFromResponse(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(extractTextFromResponse).filter(Boolean).join("\n");
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.output_text === "string") {
      return record.output_text;
    }

    if (typeof record.text === "string") {
      return record.text;
    }

    if (typeof record.content === "string") {
      return record.content;
    }

    if (Array.isArray(record.output)) {
      const outputText = extractTextFromResponse(record.output);
      if (outputText) return outputText;
    }

    if (Array.isArray(record.content)) {
      const contentText = extractTextFromResponse(record.content);
      if (contentText) return contentText;
    }
  }

  return "";
}

export async function generateOpenAIText(input: {
  system: string;
  user: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      store: false,
      max_output_tokens: 2500,
      input: [
        {
          role: "system",
          content: input.system,
        },
        {
          role: "user",
          content: input.user,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const text = extractTextFromResponse(data).trim();

  if (!text) {
    throw new Error(
      `OpenAI response did not contain text output. Raw response: ${JSON.stringify(data)}`
    );
  }

  return text;
}

export function parseJsonResponse<T>(text: string): T {
  const cleanedText = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedText) as T;
  } catch {
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(`Could not parse JSON response from OpenAI: ${cleanedText}`);
    }

    return JSON.parse(jsonMatch[0]) as T;
  }
}