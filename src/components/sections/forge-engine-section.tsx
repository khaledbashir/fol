"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, GitBranch, Shield, FileSearch, FileOutput, Zap } from "lucide-react";

const capabilities = [
  {
    icon: GitBranch,
    title: "Dynamic Logic Routing",
    description: "Ingests highly complex, multi-variable pricing models — weight-based tiers, square-footage calculations, margin stacking, conditional bundling — and converts them into linear, guided user experiences.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Guardrails",
    description: "Built with strict environment isolation, role-based access control, and mandatory human-in-the-loop verification. No unchecked AI output ever reaches a client deliverable.",
  },
  {
    icon: FileSearch,
    title: "Universal Document Ingestion",
    description: "Production-grade OCR and NLP extraction for scanned PDFs, legacy Excel workbooks, and complex architectural or construction RFPs — including documents exceeding 500 pages.",
  },
  {
    icon: FileOutput,
    title: "Adaptive Template Generation",
    description: "Dynamically assembles branded, pixel-accurate PDF proposals from structured data, eliminating the gap between estimation and client-facing output.",
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
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Layers className="w-3.5 h-3.5 mr-2 text-primary" />
            Proprietary Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Forge Engine</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            I don't build from scratch for every engagement. I accelerate enterprise transformation using the Forge Engine — a proprietary AI backend architecture purpose-built for complex operational workflows.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <p className="text-muted-foreground leading-relaxed">
            The Forge Engine is a modular, deployment-ready infrastructure layer. By leveraging it as a foundation, I deliver custom enterprise platforms in weeks instead of months, at a fraction of the cost of traditional consulting engagements.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <capability.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{capability.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {capability.description}
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
