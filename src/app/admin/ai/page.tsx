"use client";

import { Brain, Cpu, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AIPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <Badge variant="outline">AI Workspace</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          AI Assistant
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use structured prompts to generate polished drafts for projects and
          editorial content.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Active Model
              </p>
              <p className="mt-2 text-lg font-semibold">Configured</p>
            </div>
            <Cpu className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Prompt Library
              </p>
              <p className="mt-2 text-lg font-semibold">6 Templates</p>
            </div>
            <Brain className="h-5 w-5 text-cyan" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80 sm:col-span-2 xl:col-span-1">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Status
              </p>
              <p className="mt-2 text-lg font-semibold">Ready</p>
            </div>
            <Sparkles className="h-5 w-5 text-ember" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Prompt Studio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div>
              <label className="mb-1 block text-sm font-medium">Task</label>
              <Input
                placeholder="Generate a project case study with measurable outcomes"
                className="bg-background/80"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Prompt</label>
              <textarea
                className="min-h-[160px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm"
                placeholder="Describe context, audience, expected output format, and constraints..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Draft
              </Button>
              <Button variant="outline">Save as Template</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Prompt Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5 text-sm">
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Define the exact output structure upfront
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Include target persona and tone in every brief
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Require quantified outcomes when relevant
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Run a final edit pass before publishing
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
