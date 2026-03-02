"use client";

import { BookCheck, CalendarClock, PenSquare, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <Badge variant="outline">Editorial Workspace</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Blog Operations
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plan, draft, and publish long-form content through a structured
          editorial pipeline.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Drafts
              </p>
              <p className="mt-2 text-2xl font-semibold">12</p>
            </div>
            <PenSquare className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Scheduled
              </p>
              <p className="mt-2 text-2xl font-semibold">4</p>
            </div>
            <CalendarClock className="h-5 w-5 text-cyan" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Published
              </p>
              <p className="mt-2 text-2xl font-semibold">27</p>
            </div>
            <BookCheck className="h-5 w-5 text-ember" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Avg. Read Time
              </p>
              <p className="mt-2 text-2xl font-semibold">6m</p>
            </div>
            <Rocket className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Quick Draft</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Working title
              </label>
              <Input
                placeholder="How AI agents improve enterprise operations"
                className="bg-background/80"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Summary</label>
              <textarea
                className="min-h-[120px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm"
                placeholder="Outline the article purpose and angle..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>Save Draft</Button>
              <Button variant="outline">Generate with AI</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Editorial Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5 text-sm">
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Define article objective and target persona
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Validate headline clarity and search intent
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Add sources, examples, and call-to-action
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-3">
              Final proofread and schedule publish date
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
