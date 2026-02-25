"use client";

import { motion } from "framer-motion";
import {
  Layers,
  GitBranch,
  Shield,
  FileSearch,
  FileOutput,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const modules = [
  {
    icon: FileSearch,
    title: "Document Extraction Pipeline",
    does: "Processes PDFs, Excel, and RFPs up to 500+ pages using OCR and NLP",
    prevents: "Missed specs, manual re-entry, human error in transcription",
  },
  {
    icon: GitBranch,
    title: "Logic Routing Engine",
    does: "Converts complex pricing models into guided, auditable workflows",
    prevents:
      "Pricing drift, inconsistent estimates, logic locked in one person's head",
  },
  {
    icon: FileOutput,
    title: "Template Renderer",
    does: "Dynamically generates pixel-accurate, branded PDF outputs from structured data",
    prevents:
      "Formatting inconsistencies, brand drift, hours spent in Word or InDesign",
  },
  {
    icon: AlertTriangle,
    title: "Validation Layer",
    does: "Cross-checks outputs against compliance checkpoints and business rules",
    prevents: "Hallucinated line items, missed requirements, scope creep",
  },
  {
    icon: Shield,
    title: "RBAC & Audit Layer",
    does: "Granular permissions with mandatory review gates before client-facing outputs",
    prevents: "Unauthorized changes, compliance gaps, no audit trail",
  },
  {
    icon: Layers,
    title: "Workflow Orchestrator",
    does: "Coordinates extraction, validation, and generation in a single pipeline",
    prevents: "Bottlenecks, manual handoffs, process breakdown at scale",
  },
];

export function ForgeEngineSection() {
  return (
    <section id="forge-engine" className="py-24 relative bg-card/30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Layers className="w-3.5 h-3.5 mr-2 text-primary" />
            Reusable Architecture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built faster because the foundation already exists.
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Most custom development starts from scratch. Mine doesn&apos;t. The
            Forge Engine is a battle-tested infrastructure layer I&apos;ve
            refined across multiple enterprise deployments. It cuts build time
            in half and eliminates the most common failure points before your
            project even starts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card border-border/50 hover:border-[var(--cyan)]/30 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-[var(--cyan)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--cyan)]/20 transition-colors">
                      <module.icon className="h-4.5 w-4.5 text-[var(--cyan)]" />
                    </div>
                    <h4 className="font-semibold text-sm">{module.title}</h4>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground/60 uppercase tracking-wide mb-1">
                        What it does
                      </p>
                      <p className="text-sm text-foreground">{module.does}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/60 uppercase tracking-wide mb-1">
                        What it prevents
                      </p>
                      <p className="text-sm text-red-400/80">
                        {module.prevents}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
