import { spawn } from "node:child_process";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || process.cwd();

function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function validateDate(input?: string): string {
  if (!input) return new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    throw new Error("Invalid date. Use YYYY-MM-DD.");
  }
  return input;
}

function runCloneAndBuild(slug: string, date: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const scriptPath = `${WORKSPACE_ROOT}/scripts/new_proposal_from_template.sh`;
    const child = spawn(scriptPath, [slug, date], {
      cwd: WORKSPACE_ROOT,
      env: process.env,
    });

    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("Proposal generation timed out after 120 seconds."));
    }, 120_000);

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
        reject(new Error(stderr || `Script exited with code ${code}`));
        return;
      }
      resolve();
    });
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      clientSlug?: string;
      date?: string;
    };
    const rawSlug = body.clientSlug?.trim();
    if (!rawSlug) {
      return NextResponse.json(
        { error: "clientSlug is required." },
        { status: 400 },
      );
    }

    const slug = normalizeSlug(rawSlug);
    if (!slug) {
      return NextResponse.json(
        { error: "clientSlug is invalid after normalization." },
        { status: 400 },
      );
    }

    const date = validateDate(body.date);
    await runCloneAndBuild(slug, date);

    const markdownPath = `${WORKSPACE_ROOT}/output/proposals/${slug}-${date}.md`;
    const pdfPath = `${WORKSPACE_ROOT}/output/pdf/${slug}-${date}.pdf`;

    return NextResponse.json({
      slug,
      date,
      markdownPath,
      pdfPath,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate proposal assets.",
      },
      { status: 500 },
    );
  }
}
