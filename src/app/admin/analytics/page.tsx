"use client";

import {
  Activity,
  ArrowUpRight,
  Eye,
  MousePointerClick,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <Badge variant="outline">Performance Center</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Analytics
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track portfolio engagement, campaign impact, and conversion quality.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Page Views
              </p>
              <p className="mt-2 text-2xl font-semibold">18.4K</p>
            </div>
            <Eye className="h-5 w-5 text-cyan" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Sessions
              </p>
              <p className="mt-2 text-2xl font-semibold">6.2K</p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                CTR
              </p>
              <p className="mt-2 text-2xl font-semibold">4.8%</p>
            </div>
            <MousePointerClick className="h-5 w-5 text-ember" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Avg. Session
              </p>
              <p className="mt-2 text-2xl font-semibold">3m 27s</p>
            </div>
            <Timer className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Top Performing Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {[
              { name: "Projects Section", value: "34%", trend: "+5.2%" },
              { name: "Case Study", value: "22%", trend: "+2.1%" },
              { name: "About Section", value: "17%", trend: "+1.7%" },
              { name: "Contact Section", value: "12%", trend: "-0.9%" },
            ].map(item => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg border border-border/70 bg-background/70 p-3"
              >
                <p className="text-sm font-medium">{item.name}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan">
                    {item.trend}
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {[
              { source: "Organic Search", share: "46%" },
              { source: "Direct", share: "28%" },
              { source: "Social", share: "14%" },
              { source: "Referral", share: "12%" },
            ].map(item => (
              <div
                key={item.source}
                className="rounded-lg border border-border/70 bg-background/70 p-3"
              >
                <p className="text-sm font-medium">{item.source}</p>
                <p className="text-xs text-muted-foreground">{item.share}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
