import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Provider config – driven by env vars set in EasyPanel
// ---------------------------------------------------------------------------
interface Provider {
  prefix: string;
  baseUrl: string;
  apiKey: string;
  models: string[];
}

function getProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env["ZAI_API_KEY"]) {
    providers.push({
      prefix: "zai",
      baseUrl: "https://api.z.ai/api/coding/paas/v4",
      apiKey: process.env["ZAI_API_KEY"]!,
      models: ["zai/glm-4.7", "zai/glm-4.5", "zai/glm-4-flash"],
    });
  }

  if (process.env["NVIDIA_API_KEY"]) {
    providers.push({
      prefix: "nvidia",
      baseUrl: "https://integrate.api.nvidia.com/v1",
      apiKey: process.env["NVIDIA_API_KEY"]!,
      models: [
        "nvidia/meta/llama-3.3-70b-instruct",
        "nvidia/meta/llama-3.1-405b-instruct",
        "nvidia/mistralai/mixtral-8x22b-instruct-v0.1",
        "nvidia/nvidia/llama-3.1-nemotron-70b-instruct",
        "nvidia/qwen/qwq-32b",
        "nvidia/deepseek-ai/deepseek-r1",
      ],
    });
  }

  if (process.env["OPENAI_API_KEY"]) {
    providers.push({
      prefix: "openai",
      baseUrl: "https://api.openai.com/v1",
      apiKey: process.env["OPENAI_API_KEY"]!,
      models: [
        "openai/gpt-4o",
        "openai/gpt-4o-mini",
        "openai/o3-mini",
        "openai/gpt-4-turbo",
      ],
    });
  }

  if (process.env["GEMINI_API_KEY"]) {
    providers.push({
      prefix: "gemini",
      baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
      apiKey: process.env["GEMINI_API_KEY"]!,
      models: [
        "gemini/gemini-2.0-flash",
        "gemini/gemini-2.0-flash-lite",
        "gemini/gemini-1.5-pro",
        "gemini/gemini-1.5-flash",
      ],
    });
  }

  return providers;
}

function resolveProvider(
  modelId: string,
  providers: Provider[],
): { provider: Provider; actualModel: string } | null {
  for (const p of providers) {
    if (modelId.startsWith(`${p.prefix}/`)) {
      return { provider: p, actualModel: modelId.slice(p.prefix.length + 1) };
    }
  }
  return null;
}

// GET – return available models
export async function GET() {
  const providers = getProviders();
  const models = providers.flatMap(p => p.models);

  if (models.length === 0) {
    return NextResponse.json(
      {
        error:
          "No AI providers configured. Set ZAI_API_KEY, NVIDIA_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY.",
      },
      { status: 503 },
    );
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

    const providers = getProviders();
    if (providers.length === 0) {
      return NextResponse.json(
        {
          error:
            "No AI providers configured. Set ZAI_API_KEY, NVIDIA_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY.",
        },
        { status: 503 },
      );
    }

    let provider: Provider;
    let actualModel: string;

    if (modelId) {
      const resolved = resolveProvider(modelId, providers);
      if (!resolved) {
        return NextResponse.json(
          {
            error: `Unknown model "${modelId}". Available: ${providers.flatMap(p => p.models).join(", ")}`,
          },
          { status: 400 },
        );
      }
      provider = resolved.provider;
      actualModel = resolved.actualModel;
    } else {
      provider = providers[0]!;
      actualModel = provider.models[0]!.slice(provider.prefix.length + 1);
    }

    const systemPrompt = skill
      ? `You are a helpful AI assistant. Use your "${skill}" expertise when answering.`
      : "You are a helpful AI assistant.";

    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
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
