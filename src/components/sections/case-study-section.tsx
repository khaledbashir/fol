"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  Zap, 
  Target, 
  Brain,
  Layers,
  Settings,
  CheckCircle2
} from "lucide-react";

const execution = [
  {
    icon: GitBranch,
    title: "Document Intelligence Engine",
    description: "An ingestion pipeline that reads hundreds of pages of complex bid documents, RFPs, and specifications — automatically extracting critical requirements, technical parameters, and compliance factors.",
  },
  {
    icon: Brain,
    title: "Intelligent Estimation System",
    description: "A guided, linear workflow that distills decades of complex pricing logic — weight-based tiers, square-footage calculations, conditional multipliers — into a system any team member can operate.",
  },
  {
    icon: Layers,
    title: "Smart Component Bundler",
    description: "An AI-powered guardrail that automatically recommends required ancillary items, add-ons, and配套 components based on the primary configuration, preventing costly omissions.",
  },
  {
    icon: Settings,
    title: "Legacy Workflow Integration",
    description: "For senior staff who prefer existing workflows, the system reads their workbooks directly and generates client-ready, branded deliverables without requiring any interface change.",
  },
];

const results = [
  { label: "Knowledge Preservation", value: "20+ years", detail: "of unwritten pricing logic institutionalized" },
  { label: "Speed", value: "3-5 days → <1 hr", detail: "end-to-end proposal generation" },
  { label: "Accuracy", value: "10-15% → 0%", detail: "historical error rate eliminated" },
  { label: "Scalability", value: "Unlocked", detail: "junior staff producing senior-level output" },
];

export function CaseStudySection() {
  return (
    <section id="case-study" className="py-24 relative bg-card/30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Target className="w-3.5 h-3.5 mr-2 text-primary" />
            Representative Engagement
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Estimating Platform</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Transforming tribal knowledge into scalable infrastructure for a mid-market enterprise.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="bg-card border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                The Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A mid-market enterprise in the technical services sector had built significant revenue on a fragile foundation: massive Excel workbooks, isolated document templates, and deeply guarded tribal knowledge held by a handful of senior staff.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Generating a single high-value proposal required days of manual work across multiple departments. Pricing logic that had evolved over two decades existed only in the heads of key personnel. The company faced existential risk: if those people left, the institutional knowledge walked out the door.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">The Execution</h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {execution.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-colors group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Measurable Impact</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border/50 text-center h-full">
                  <CardContent className="p-6">
                    <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-3" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {result.label}
                    </p>
                    <p className="text-xl font-bold text-foreground mb-1">{result.value}</p>
                    <p className="text-xs text-muted-foreground">{result.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
