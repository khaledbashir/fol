import { execSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const WORKSPACE_ROOT = process.env["WORKSPACE_ROOT"] || process.cwd();
const OPENCODE_CANDIDATES = [
  process.env["OPENCODE_BIN"],
  "/root/.opencode/bin/opencode",
  "/home/node/.opencode/bin/opencode",
].filter(Boolean) as string[];

function getOpencodeBin(): string {
  for (const candidate of OPENCODE_CANDIDATES) {
    if (existsSync(candidate)) return candidate;
  }

  try {
    const fromPath = execSync("command -v opencode", {
      cwd: WORKSPACE_ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (fromPath) return fromPath;
  } catch {
    // no-op
  }

  throw new Error(
    "OpenCode binary not found in container. Set OPENCODE_BIN (absolute path) or install opencode in this runtime.",
  );
}

const ANSI_REGEX =
  /\u001b\[[0-9;]*m|\u001b\][^\u0007]*(?:\u0007|\u001b\\)|[\u0000-\u0008\u000b-\u001a\u001c-\u001f]/g;

function sanitizeOutput(value: string): string {
  const cleaned = value
    .replace(ANSI_REGEX, "")
    .replace(/^>\s.*$/gm, "")
    .replace(/^\s*% /gm, "")
    .trim();
  return cleaned || "No output returned.";
}

function runOpenCode(message: string, model?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let opencodeBin: string;
    try {
      opencodeBin = getOpencodeBin();
    } catch (error) {
      reject(error);
      return;
    }

    const args = ["run"];
    if (model) {
      args.push("-m", model);
    }
    args.push(message);

    const child = spawn(opencodeBin, args, {
      cwd: WORKSPACE_ROOT,
      env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0" },
    });

    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("OpenCode request timed out after 120 seconds."));
    }, 120_000);

    child.stdout.on("data", chunk => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", chunk => {
      stderr += chunk.toString();
    });

    child.on("error", error => {
      clearTimeout(timeout);
      reject(error);
    });

    child.on("close", code => {
      clearTimeout(timeout);
      if (code !== 0) {
        reject(
          new Error(
            sanitizeOutput(
              stderr || stdout || `OpenCode exited with code ${code}`,
            ),
          ),
        );
        return;
      }
      resolve(sanitizeOutput(stdout || stderr));
    });
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      skill?: string;
      model?: string;
    };
    const message = body.message?.trim();
    const skill = body.skill?.trim();
    const model = body.model?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    if (message.length > 8_000) {
      return NextResponse.json(
        { error: "Message is too long (max 8000 chars)." },
        { status: 400 },
      );
    }

    const finalPrompt = skill
      ? `Use the "${skill}" skill when relevant.\n\n${message}`
      : message;

    const output = await runOpenCode(finalPrompt, model || undefined);
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to run client portal chat.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const opencodeBin = getOpencodeBin();
    const child = spawn(opencodeBin, ["models"], {
      cwd: WORKSPACE_ROOT,
      env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0" },
    });

    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
    }, 30_000);

    child.stdout.on("data", chunk => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", chunk => {
      stderr += chunk.toString();
    });

    const models: string[] = await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("close", code => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(
            new Error(stderr || `opencode models failed with code ${code}`),
          );
          return;
        }
        const list = stdout
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean);
        resolve(list);
      });
    });

    return NextResponse.json({ models });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load model list.",
      },
      { status: 500 },
    );
  }
}
