

export async function generateOpenAIText(input: {
  system: string;
  user: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;

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
      model: "gpt-5.1-mini",
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

  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  const textParts = data.output
    ?.flatMap((item: any) => item.content || [])
    ?.filter((content: any) => content.type === "output_text")
    ?.map((content: any) => content.text);

  const text = textParts?.join("\n") || "";

  if (!text) {
    throw new Error("OpenAI response did not contain text output.");
  }

  return text;
}

export function parseJsonResponse<T>(text: string): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Could not parse JSON response from OpenAI.");
    }

    return JSON.parse(jsonMatch[0]) as T;
  }
}