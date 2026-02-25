import {
  Project,
  ProjectFormData,
  normalizeProject,
  extractProjectsPayload,
} from "@/lib/projects";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }
  const data = await res.json();
  const payload = extractProjectsPayload(data);
  return payload
    .map(project => normalizeProject(project))
    .filter((project): project is Project => project !== null);
}

export async function createProject(data: ProjectFormData): Promise<void> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to create project: ${res.status}`);
  }
}

export async function updateProject(
  id: string,
  data: ProjectFormData,
): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to update project: ${res.status}`);
  }
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete project: ${res.status}`);
  }
}

export async function toggleProjectFeatured(project: Project): Promise<void> {
  const res = await fetch(`/api/projects/${project.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...project, featured: !project.featured }),
  });
  if (!res.ok) {
    throw new Error(`Failed to toggle featured: ${res.status}`);
  }
}
