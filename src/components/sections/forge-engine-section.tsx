"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, GitBranch, Shield, FileSearch, FileOutput, AlertTriangle } from "lucide-react";

const modules = [
  {
    icon: GitBranch,
    title: "Logic Routing Engine",
    prevents: "Pricing drift & inconsistent estimates",
    description: "Converts complex, multi-variable pricing models into guided workflows anyone can follow.",
  },
  {
    icon: Shield,
    title: "RBAC & Audit Layer",
    prevents: "Unauthorized changes & compliance gaps",
    description: "Granular permissions with mandatory review gates before client-facing outputs.",
  },
  {
    icon: FileSearch,
    title: "Document Extraction Pipeline",
    prevents: "Missed specs & manual data entry errors",
    description: "OCR and NLP extraction for PDFs, Excel, and RFPs up to 500+ pages.",
  },
  {
    icon: FileOutput,
    title: "Template Renderer",
    prevents: "Formatting inconsistencies & brand drift",
    description: "Dynamically assembles branded, pixel-accurate PDFs from structured data.",
  },
  {
    icon: AlertTriangle,
    title: "Validation Layer",
    prevents: "Hallucinated clauses & scope creep",
    description: "Cross-references outputs against compliance checkpoints, bond requirements, and legal constraints.",
  },
  {
    icon: Layers,
    title: "Workflow Orchestrator",
    prevents: "Process bottlenecks & handoff failures",
    description: "Coordinates extraction, validation, and output generation in a single pipeline.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Forge Engine</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A modular infrastructure layer that reduces build time and risk. I deliver in weeks, not months.
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
              <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <module.icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{module.title}</h4>
                      <p className="text-xs text-red-400/80 mt-0.5">Prevents: {module.prevents}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
