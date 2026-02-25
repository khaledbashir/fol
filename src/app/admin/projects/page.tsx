"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AIAssistant } from "@/components/admin/ai-assistant";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectList } from "@/components/admin/project-list";
import { Button } from "@/components/ui/button";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-muted-foreground text-sm">
                Manage your portfolio projects
              </p>
            </div>
          </div>
          <Button onClick={() => setShowAI(!showAI)} variant="outline">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
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

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Existing Projects ({projects.length})
          </h2>
          <ProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        </div>
      </div>
    </div>
  );
}
