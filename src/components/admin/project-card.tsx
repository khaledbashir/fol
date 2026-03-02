"use client";

import { motion } from "framer-motion";
import { Trash2, Edit, Star, StarOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (project: Project) => void;
}

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onToggleFeatured,
}: ProjectCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/70 bg-card/80 transition-colors hover:border-primary/35">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="truncate font-semibold">{project.title}</h3>
                {project.featured && (
                  <Badge variant="default" className="text-xs font-medium">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mb-2 text-sm text-muted-foreground">
                {project.client} · {project.sector}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
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
                onClick={() => onToggleFeatured(project)}
                title={
                  project.featured ? "Remove from featured" : "Mark as featured"
                }
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
                onClick={() => onEdit(project)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(project.id)}
                className="hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
