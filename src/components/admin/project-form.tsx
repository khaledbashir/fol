"use client";

import { Plus, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProjectFormData } from "@/lib/projects";

interface ProjectFormProps {
  formData: ProjectFormData;
  editingId: string | null;
  saving: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string | boolean | string[]) => void;
}

export function ProjectForm({
  formData,
  editingId,
  saving,
  onSubmit,
  onCancel,
  onChange,
}: ProjectFormProps) {
  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (techInput.trim()) {
      onChange("technologies", [...formData.technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    onChange(
      "technologies",
      formData.technologies.filter((_, i) => i !== index),
    );
  };

  return (
    <Card className="border-border/70 bg-card/80">
      <CardHeader className="border-b border-border/70 pb-4">
        <CardTitle className="flex items-center gap-2">
          {editingId ? (
            <Edit className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {editingId ? "Edit Project" : "Add New Project"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={e => onChange("title", e.target.value)}
              placeholder="Project title"
              className="bg-background/80"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Client</label>
            <Input
              value={formData.client}
              onChange={e => onChange("client", e.target.value)}
              placeholder="Client name (can be generic)"
              className="bg-background/80"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Sector</label>
            <Input
              value={formData.sector}
              onChange={e => onChange("sector", e.target.value)}
              placeholder="e.g., Construction, Manufacturing"
              className="bg-background/80"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Image URL</label>
            <Input
              value={formData.image}
              onChange={e => onChange("image", e.target.value)}
              placeholder="https://..."
              className="bg-background/80"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            className="min-h-[90px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm"
            value={formData.description}
            onChange={e => onChange("description", e.target.value)}
            placeholder="Brief project description"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Challenge</label>
          <textarea
            className="min-h-[90px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm"
            value={formData.challenge}
            onChange={e => onChange("challenge", e.target.value)}
            placeholder="What was the problem?"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Solution</label>
          <textarea
            className="min-h-[90px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm"
            value={formData.solution}
            onChange={e => onChange("solution", e.target.value)}
            placeholder="What did you build?"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Results</label>
          <textarea
            className="min-h-[90px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm"
            value={formData.results}
            onChange={e => onChange("results", e.target.value)}
            placeholder="What was the impact?"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Technologies</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              placeholder="Add technology"
              onKeyDown={e =>
                e.key === "Enter" && (e.preventDefault(), addTechnology())
              }
              className="bg-background/80"
            />
            <Button type="button" onClick={addTechnology} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {tech}
                <button
                  onClick={() => removeTechnology(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-border/70 bg-background/70 px-3 py-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={e => onChange("featured", e.target.checked)}
            className="rounded border-input"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured project
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={onSubmit} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving
              ? "Saving..."
              : editingId
                ? "Update Project"
                : "Create Project"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
