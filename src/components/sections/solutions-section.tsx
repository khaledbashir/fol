"use client";

import { motion } from "framer-motion";
import { FileText, Brain, Layers, Settings, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const solutions = [
  {
    icon: FileText,
    title: "Proposal & Quote Automation",
    description:
      "Your senior estimators shouldn't be spending three days copy-pasting data between Excel and Word. I build systems that take your existing pricing logic and generate polished, branded proposals in under an hour — with no loss of accuracy and no change to how your team works.",
  },
  {
    icon: Brain,
    title: "RFP Intelligence",
    description:
      "Bidding on complex contracts means parsing thousands of pages of specs, drawings, and addenda. I build AI-powered pipelines that extract relevant requirements, flag critical items, and surface what your team needs to build an accurate quote — in minutes, not days.",
  },
  {
    icon: Layers,
    title: "Document Processing Pipelines",
    description:
      "Unstructured inputs — scanned PDFs, architectural drawings, messy spreadsheets — transformed into clean, structured data your systems can actually use. End-to-end, production-grade, with validation built in.",
  },
  {
    icon: Settings,
    title: "Internal Tools & Dashboards",
    description:
      "Custom platforms that give teams visibility into their workflows, automate approval chains, and eliminate the back-and-forth that kills productivity. Built for real users, not IT departments.",
  },
  {
    icon: BarChart3,
    title: "AI Integration & Consulting",
    description:
      "Already have systems in place? I identify where LLMs, vision models, and automation actually move the needle — and integrate them into your existing stack without a full rebuild.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Six systems. One specialty: replacing manual work with intelligent
            automation.
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto"></p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-[var(--cyan)]/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--cyan)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--cyan)]/20 transition-colors">
                      <solution.icon className="h-5 w-5 text-[var(--cyan)]" />
                    </div>
                    <h3 className="font-semibold text-lg">{solution.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {solution.description}
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
