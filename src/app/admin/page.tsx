"use client";

import {
  ArrowRight,
  BarChart,
  BookText,
  FolderKanban,
  Layers3,
  Megaphone,
  Sparkles,
  Settings,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProjects } from "@/lib/api";
import { Project } from "@/lib/projects";

const sections = [
  {
    title: "Projects",
    description: "Manage portfolio projects with AI assistance",
    icon: FolderKanban,
    href: "/admin/projects",
    color: "text-cyan",
  },
  {
    title: "Blog",
    description: "Editorial workflow and publishing",
    icon: BookText,
    href: "/admin/blog",
    color: "text-ember",
  },
  {
    title: "AI Assistant",
    description: "Generation workspace for drafts",
    icon: Sparkles,
    href: "/admin/ai",
    color: "text-primary",
  },
  {
    title: "Analytics",
    description: "Site and content performance",
    icon: BarChart,
    href: "/admin/analytics",
    color: "text-cyan",
  },
  {
    title: "Settings",
    description: "Providers, models, environment",
    icon: Settings,
    href: "/admin/settings",
    color: "text-muted-foreground",
  },
];

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch {
        setProjects([]);
      }
    };

    void loadData();
  }, []);

  const featuredCount = useMemo(
    () => projects.filter(project => project.featured).length,
    [projects],
  );
  const sectorsCount = useMemo(
    () => new Set(projects.map(project => project.sector).filter(Boolean)).size,
    [projects],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="outline">Operational Overview</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Portfolio Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage projects, run content operations, and monitor platform
              health from a single workspace.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild>
              <Link href="/admin/projects">
                Open Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/settings">
                <Settings className="h-4 w-4" />
                Configure AI
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold">{projects.length}</p>
              <FolderKanban className="h-5 w-5 text-cyan" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold">{featuredCount}</p>
              <Layers3 className="h-5 w-5 text-ember" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Sectors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold">{sectorsCount}</p>
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              AI Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold">Ready</p>
              <Zap className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Workspaces</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map(section => (
            <Link key={section.href} href={section.href} className="group">
              <Card className="h-full border-border/70 bg-card/80 transition-colors group-hover:border-primary/40">
                <CardContent className="p-5">
                  <div
                    className={`mb-4 inline-flex rounded-xl border border-border/80 bg-background/80 p-2.5 ${section.color}`}
                  >
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    Open workspace
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
