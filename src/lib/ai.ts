export interface AIProvider {
  id: string;
  name: string;
  endpoint: string;
  apiKey: string;
  models: string[];
}

export interface AISettings {
  providers: AIProvider[];
  selectedProvider: string;
  selectedModel: string;
}

const STORAGE_KEY = "ai_settings";

export function getAISettings(): AISettings {
  if (typeof window === "undefined") {
    return { providers: [], selectedProvider: "", selectedModel: "" };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { providers: [], selectedProvider: "", selectedModel: "" };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { providers: [], selectedProvider: "", selectedModel: "" };
  }
}

export function saveAISettings(settings: AISettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export async function fetchModels(
  endpoint: string,
  apiKey: string,
): Promise<string[]> {
  const res = await fetch(`${endpoint}/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch models");
  }

  const data = await res.json();
  return data.data?.map((m: { id: string }) => m.id) || [];
}

export async function generateContent(
  prompt: string,
  settings: AISettings,
): Promise<string> {
  const provider = settings.providers.find(
    p => p.id === settings.selectedProvider,
  );
  if (!provider) {
    throw new Error("No provider selected");
  }

  const res = await fetch(`${provider.endpoint}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.selectedModel,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates professional portfolio content. Return only the requested content without additional commentary.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate content");
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}
