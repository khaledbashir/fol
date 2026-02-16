"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileCheck, Layout, Search, BarChart3, Briefcase } from "lucide-react";

const solutions = [
  {
    icon: Calculator,
    title: "Complex Estimating Engines",
    description: "Enterprise pricing is never simple math. It's decades of accumulated logic — hidden margin tiers, conditional discount structures, tribal-knowledge multipliers, and \"gut-feeling\" adjustments. I reverse-engineer that logic into automated decision trees.",
    outcome: "A junior team member can generate an accurate, multi-million-dollar project budget in under an hour.",
  },
  {
    icon: FileCheck,
    title: "Automated SOW Validation",
    description: "Automating a budget is only half the problem. The legal scope is where real risk hides. I engineer SOW generators that dynamically build highly specific scopes of work based on project parameters.",
    outcome: "Built-in compliance scanning cross-references every output against critical checkpoints before a human ever reads page 400.",
  },
  {
    icon: Layout,
    title: "Legacy Workflow Mirroring",
    description: "For teams resistant to change, I build Mirror Mode pipelines. The system reads an estimator's existing, unstructured Excel workbooks and automatically generates branded, error-free PDF proposals.",
    outcome: "The estimator keeps working exactly as they always have. Adoption isn't a conversation — it's invisible.",
  },
  {
    icon: Search,
    title: "RFP Intelligence & Triage",
    description: "Large-scale projects come with massive bid packages — often hundreds of pages of drawings, specifications, legal requirements. I build ingestion engines that read these documents and surface critical specifications.",
    outcome: "What used to take senior staff days is reduced to a structured, prioritized extraction in minutes.",
  },
  {
    icon: BarChart3,
    title: "Executive ROI Dashboards",
    description: "Leadership doesn't buy AI. They buy results. I build integrated analytics layers that track each platform's operational impact in real time: hours saved, margin accuracy, deal velocity, error-rate reductions.",
    outcome: "Continuous financial justification at every quarterly review for the C-suite.",
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
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Briefcase className="w-3.5 h-3.5 mr-2 text-primary" />
            Core Solutions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Build</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Purpose-built enterprise systems that solve real operational bottlenecks.
          </p>
        </motion.div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex gap-5">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <solution.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {solution.description}
                      </p>
                      <p className="text-foreground text-sm font-medium italic">
                        {solution.outcome}
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
