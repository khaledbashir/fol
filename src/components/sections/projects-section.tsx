"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, X, ExternalLink } from "lucide-react";

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
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.filter((p: Project) => p.featured));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Briefcase className="w-3.5 h-3.5 mr-2 text-primary" />
            Featured Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Engagements</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of enterprise transformation projects I've led.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {project.sector}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card border border-border/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="outline" className="mb-2">{selectedProject.sector}</Badge>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-muted-foreground">{selectedProject.client}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">The Challenge</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.challenge}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">The Solution</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Results & Impact</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.results}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
