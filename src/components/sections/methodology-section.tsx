"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Eye, Map, Rocket } from "lucide-react";

const steps = [
  {
    icon: Eye,
    title: "Passive Logic Extraction",
    description: "I analyze existing workflows, past proposals, legacy workbooks, and historical bid data to reverse-engineer your pricing and operational logic before I ask your team a single question. By the time I engage your subject-matter experts, I already understand 80% of their process.",
  },
  {
    icon: Map,
    title: "The Parameter Map",
    description: "I never hand senior employees a blank form and ask them to document their process. Instead, I present pre-populated logic structures built from my extraction work, and I ask them to confirm or correct. This reduces a painful 40-hour documentation effort to a 2-hour verification session.",
  },
  {
    icon: Rocket,
    title: "Silent Deployment",
    description: "Every platform is deployed in parallel to existing workflows. Teams run both systems side by side, verifying output accuracy in real conditions. There is no hard cutover. The team naturally gravitates toward the faster, error-free system — and adoption happens without a single change management meeting.",
  },
];

export function MethodologySection() {
  return (
    <section id="methodology" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <GitBranch className="w-3.5 h-3.5 mr-2 text-primary" />
            The Methodology
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shadow Engineering</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I don't run your team through months of discovery workshops. I work in the background, extracting the logic your business runs on without disrupting the people who run it.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border/50 hidden md:block" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="flex gap-6">
                  <div className="hidden md:flex h-16 w-16 rounded-full bg-card border border-border/50 items-center justify-center shrink-0 relative z-10">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <Card className="flex-1 bg-card/50 border-border/50 hover:border-primary/30 transition-colors group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="md:hidden h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
