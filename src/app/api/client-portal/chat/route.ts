import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Provider config – purely from env vars, all models fetched live
// ---------------------------------------------------------------------------
interface ProviderConfig {
  prefix: string;
  baseUrl: string;
  apiKey: string;
}

function getProviderConfigs(): ProviderConfig[] {
  const configs: ProviderConfig[] = [];

  if (process.env["ZAI_API_KEY"]) {
    configs.push({
      prefix: "zai",
      baseUrl: "https://api.z.ai/api/coding/paas/v4",
      apiKey: process.env["ZAI_API_KEY"]!,
    });
  }
  if (process.env["NVIDIA_API_KEY"]) {
    configs.push({
      prefix: "nvidia",
      baseUrl: "https://integrate.api.nvidia.com/v1",
      apiKey: process.env["NVIDIA_API_KEY"]!,
    });
  }
  if (process.env["OPENAI_API_KEY"]) {
    configs.push({
      prefix: "openai",
      baseUrl: "https://api.openai.com/v1",
      apiKey: process.env["OPENAI_API_KEY"]!,
    });
  }
  if (process.env["GEMINI_API_KEY"]) {
    configs.push({
      prefix: "gemini",
      baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
      apiKey: process.env["GEMINI_API_KEY"]!,
    });
  }
  if (process.env["INCEPTION_API_KEY"]) {
    configs.push({
      prefix: "inception",
      baseUrl: "https://api.inceptionlabs.ai/v1",
      apiKey: process.env["INCEPTION_API_KEY"]!,
    });
  }

  // Custom provider via env: CUSTOM_API_KEY + CUSTOM_BASE_URL + CUSTOM_PREFIX
  if (
    process.env["CUSTOM_API_KEY"] &&
    process.env["CUSTOM_BASE_URL"] &&
    process.env["CUSTOM_PREFIX"]
  ) {
    configs.push({
      prefix: process.env["CUSTOM_PREFIX"]!,
      baseUrl: process.env["CUSTOM_BASE_URL"]!,
      apiKey: process.env["CUSTOM_API_KEY"]!,
    });
  }

  return configs;
}

async function fetchModelsForProvider(
  config: ProviderConfig,
): Promise<{ models: string[]; error?: string }> {
  try {
    const res = await fetch(`${config.baseUrl}/models`, {
      headers: { Authorization: `Bearer ${config.apiKey}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return { models: [], error: `${config.prefix}: HTTP ${res.status}` };
    }
    const data = (await res.json()) as { data?: { id: string }[] };
    const models = (data.data ?? []).map(m => `${config.prefix}/${m.id}`);
    return { models };
  } catch (err) {
    return {
      models: [],
      error: `${config.prefix}: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
  }
}

// GET – fetch models live from each configured provider
export async function GET() {
  const configs = getProviderConfigs();

  if (configs.length === 0) {
    return NextResponse.json(
      {
        error:
          "No AI providers configured. Set ZAI_API_KEY, NVIDIA_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY, INCEPTION_API_KEY, or CUSTOM_API_KEY+CUSTOM_BASE_URL+CUSTOM_PREFIX.",
      },
      { status: 503 },
    );
  }

  const results = await Promise.all(configs.map(fetchModelsForProvider));
  const models = results.flatMap(r => r.models);
  const errors = results.filter(r => r.error).map(r => r.error);

  if (models.length === 0 && errors.length > 0) {
    return NextResponse.json({ models: [], errors }, { status: 502 });
  }

  return NextResponse.json({ models });
}

// POST – run a chat completion
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      skill?: string;
      model?: string;
    };

    const message = body.message?.trim();
    const skill = body.skill?.trim();
    const modelId = body.model?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }
    if (message.length > 8_000) {
      return NextResponse.json(
        { error: "Message too long (max 8000 chars)." },
        { status: 400 },
      );
    }

    const configs = getProviderConfigs();
    if (configs.length === 0) {
      return NextResponse.json(
        { error: "No AI providers configured." },
        { status: 503 },
      );
    }

    // Resolve provider from model prefix (e.g. "inception/mercury-2" → inception provider + "mercury-2")
    let config: ProviderConfig;
    let actualModel: string;

    if (modelId) {
      const slashIdx = modelId.indexOf("/");
      if (slashIdx === -1) {
        return NextResponse.json(
          {
            error: `Model must include provider prefix, e.g. "inception/mercury-2".`,
          },
          { status: 400 },
        );
      }
      const prefix = modelId.slice(0, slashIdx);
      const found = configs.find(c => c.prefix === prefix);
      if (!found) {
        return NextResponse.json(
          { error: `No configured provider for prefix "${prefix}".` },
          { status: 400 },
        );
      }
      config = found;
      actualModel = modelId.slice(slashIdx + 1);
    } else {
      config = configs[0]!;
      const available = await fetchModelsForProvider(config);
      actualModel =
        available.models.length > 0
          ? available.models[0]!.slice(config.prefix.length + 1)
          : "";
    }

    const systemPrompt = skill
      ? `You are a helpful AI assistant. Use your "${skill}" expertise when answering.`
      : "You are a helpful AI assistant.";

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: actualModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
      signal: AbortSignal.timeout(120_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Provider error (${response.status}): ${errText}` },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string };
    };

    if (data.error?.message) {
      return NextResponse.json({ error: data.error.message }, { status: 502 });
    }

    const output =
      data.choices?.[0]?.message?.content?.trim() || "No response.";
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to run chat." },
      { status: 500 },
    );
  }
}
