"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileCheck, Layout, Search, BarChart3, Briefcase } from "lucide-react";

const solutions = [
  {
    icon: Calculator,
    title: "Complex Estimating Engines",
    outcome: "Junior staff generates accurate $5M+ proposals in under an hour",
  },
  {
    icon: FileCheck,
    title: "Automated SOW Validation",
    outcome: "Compliance checks catch risks before human review",
  },
  {
    icon: Layout,
    title: "Legacy Workflow Mirroring",
    outcome: "Zero training required. Adoption happens invisibly.",
  },
  {
    icon: Search,
    title: "RFP Intelligence & Triage",
    outcome: "Days of manual review reduced to minutes",
  },
  {
    icon: BarChart3,
    title: "Executive ROI Dashboards",
    outcome: "Continuous financial justification for leadership",
  },
  {
    icon: Briefcase,
    title: "Custom Enterprise Platforms",
    outcome: "Purpose-built for your exact operational reality",
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
            Purpose-built enterprise systems that solve real operational bottlenecks.
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
