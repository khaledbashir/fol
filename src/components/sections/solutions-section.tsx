"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  Layers,
  Settings,
  BarChart3,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const solutions = [
  {
    icon: FileText,
    title: "Proposal & Quote Automation",
    outcome: "Complex spreadsheets → polished PDF proposals in minutes",
  },
  {
    icon: Brain,
    title: "RFP Intelligence",
    outcome: "Thousands of pages → actionable requirements instantly",
  },
  {
    icon: Layers,
    title: "Document Processing Pipelines",
    outcome: "Unstructured inputs → clean, structured data",
  },
  {
    icon: Settings,
    title: "Internal Tools & Dashboards",
    outcome: "Manual workflows → automated systems",
  },
  {
    icon: BarChart3,
    title: "AI Integration & Consulting",
    outcome: "Real process improvements, not hype",
  },
  {
    icon: Zap,
    title: "Custom AI Applications",
    outcome: "Purpose-built solutions for your exact needs",
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Build</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AI-powered systems where intelligent automation meets real business
            processes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <solution.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground italic">
                    → {solution.outcome}
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
