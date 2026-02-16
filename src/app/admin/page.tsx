"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  FolderKanban,
  Star,
  StarOff
} from "lucide-react";

interface Project {
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

const emptyProject = {
  title: "",
  client: "",
  description: "",
  challenge: "",
  solution: "",
  results: "",
  technologies: [] as string[],
  sector: "",
  image: "",
  featured: false,
};

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData(emptyProject);
    setEditingId(null);
    setTechInput("");
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        await fetchProjects();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save project:", error);
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
      technologies: project.technologies,
      sector: project.sector,
      image: project.image || "",
      featured: project.featured,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      await fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, featured: !project.featured }),
      });
      await fetchProjects();
    } catch (error) {
      console.error("Failed to update project:", error);
    }
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
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FolderKanban className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Projects Admin</h1>
            <p className="text-muted-foreground text-sm">Manage your portfolio projects</p>
          </div>
        </div>

        <Card className="mb-8 bg-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {editingId ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Client</label>
                <Input
                  value={formData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  placeholder="Client name (can be generic)"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Sector</label>
                <Input
                  value={formData.sector}
                  onChange={(e) => handleInputChange("sector", e.target.value)}
                  placeholder="e.g., Construction, Manufacturing"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Image URL (optional)</label>
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief project description"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Challenge</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                value={formData.challenge}
                onChange={(e) => handleInputChange("challenge", e.target.value)}
                placeholder="What was the problem?"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Solution</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                value={formData.solution}
                onChange={(e) => handleInputChange("solution", e.target.value)}
                placeholder="What did you build?"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Results</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                value={formData.results}
                onChange={(e) => handleInputChange("results", e.target.value)}
                placeholder="What was the impact?"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Technologies</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tech}
                    <button onClick={() => removeTechnology(index)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange("featured", e.target.checked)}
                className="rounded border-input"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured project
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Existing Projects ({projects.length})</h2>
          {projects.length === 0 ? (
            <Card className="bg-card/50 border-border/50">
              <CardContent className="py-8 text-center text-muted-foreground">
                No projects yet. Add your first project above.
              </CardContent>
            </Card>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-border transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{project.title}</h3>
                          {project.featured && (
                            <Badge variant="default" className="text-xs">Featured</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {project.client} · {project.sector}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(project)}
                          title={project.featured ? "Remove from featured" : "Mark as featured"}
                        >
                          {project.featured ? (
                            <Star className="h-4 w-4 text-primary fill-primary" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(project.id)}
                          className="hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
