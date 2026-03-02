"use client";

import { Sparkles, Star, FolderKanban, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AIAssistant } from "@/components/admin/ai-assistant";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectList } from "@/components/admin/project-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
} from "@/lib/api";
import {
  Project,
  ProjectFormData,
  normalizeTechnologies,
} from "@/lib/projects";

const emptyProject: ProjectFormData = {
  title: "",
  client: "",
  description: "",
  challenge: "",
  solution: "",
  results: "",
  technologies: [],
  sector: "",
  image: "",
  featured: false,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyProject);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setError(null);
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[],
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(emptyProject);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await createProject(formData);
      }
      await loadProjects();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      client: project.client,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      results: project.results,
      technologies: normalizeTechnologies(project.technologies),
      sector: project.sector,
      image: project.image || "",
      featured: project.featured,
    });
  };

  const handleDelete = async (id: string) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Are you sure you want to delete this project?")) return;

    setError(null);
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    setError(null);
    try {
      await toggleProjectFeatured(project);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update project");
    }
  };

  const handleAIGenerate = (content: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...content }));
    setShowAI(false);
  };

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="outline">Content Operations</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Project Management
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create, edit, and prioritize portfolio projects with AI-assisted
              drafting.
            </p>
          </div>
          <Button
            onClick={() => setShowAI(!showAI)}
            variant={showAI ? "default" : "outline"}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {showAI ? "Hide AI Assistant" : "Open AI Assistant"}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-semibold">{projects.length}</p>
            <FolderKanban className="h-5 w-5 text-cyan" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-semibold">
              {projects.filter(project => project.featured).length}
            </p>
            <Star className="h-5 w-5 text-ember" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80 sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Covered Sectors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-semibold">
              {new Set(projects.map(project => project.sector).filter(Boolean))
                .size || 0}
            </p>
            <Building2 className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
      </section>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {showAI && (
        <AIAssistant
          onGenerate={handleAIGenerate}
          onClose={() => setShowAI(false)}
          type="project"
        />
      )}

      <ProjectForm
        formData={formData}
        editingId={editingId}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        onChange={handleInputChange}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Existing Projects</h2>
          <Badge variant="outline">{projects.length} total</Badge>
        </div>
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleFeatured={handleToggleFeatured}
        />
      </section>
    </div>
  );
}
