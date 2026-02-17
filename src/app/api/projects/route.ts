import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function normalizeTechnologies(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
      }
    } catch {
      // Not JSON, fallback to comma-separated parsing below.
    }

    return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    const normalizedProjects = projects.map((project) => ({
      ...project,
      technologies: normalizeTechnologies(project.technologies),
    }));

    return NextResponse.json(normalizedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        client: data.client,
        description: data.description,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        technologies: normalizeTechnologies(data.technologies),
        sector: data.sector,
        image: data.image || null,
        featured: data.featured || false,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
