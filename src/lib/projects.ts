export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  sector: string;
  image: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  sector: string;
  image: string;
  featured: boolean;
}

export function normalizeTechnologies(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map(item => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    return trimmed
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeProject(project: unknown): Project | null {
  if (!project || typeof project !== "object") return null;

  const p = project as Record<string, unknown>;
  if (typeof p["id"] !== "string") return null;

  return {
    id: p["id"],
    title: typeof p["title"] === "string" ? p["title"] : "",
    client: typeof p["client"] === "string" ? p["client"] : "",
    description: typeof p["description"] === "string" ? p["description"] : "",
    challenge: typeof p["challenge"] === "string" ? p["challenge"] : "",
    solution: typeof p["solution"] === "string" ? p["solution"] : "",
    results: typeof p["results"] === "string" ? p["results"] : "",
    technologies: normalizeTechnologies(p["technologies"]),
    sector: typeof p["sector"] === "string" ? p["sector"] : "",
    image:
      typeof p["image"] === "string" || p["image"] === null ? p["image"] : null,
    featured: Boolean(p["featured"]),
    createdAt: typeof p["createdAt"] === "string" ? p["createdAt"] : "",
    updatedAt: typeof p["updatedAt"] === "string" ? p["updatedAt"] : "",
  };
}

export function extractProjectsPayload(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];

  const payload = data as Record<string, unknown>;
  if (Array.isArray(payload["projects"])) return payload["projects"];
  if (Array.isArray(payload["data"])) return payload["data"];

  return [];
}
