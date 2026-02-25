"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (project: Project) => void;
}

export function ProjectList({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardContent className="py-8 text-center text-muted-foreground">
          No projects yet. Add your first project above.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
}
