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
    description: "Ingestion pipeline that reads hundreds of pages of bid documents, RFPs, and specifications — automatically extracting requirements, technical parameters, and risk factors.",
  },
  {
    icon: Brain,
    title: "Intelligent Estimation System",
    description: "Guided workflow that distills decades of weight-based, square-footage, and conditional pricing logic into a system any estimator can operate.",
  },
  {
    icon: Layers,
    title: "Smart Component Bundler",
    description: "AI-powered guardrail that automatically recommends required ancillary components based on primary configuration — preventing thousands in forgotten line items.",
  },
  {
    icon: Settings,
    title: "Legacy Workflow Integration",
    description: "For senior staff who prefer existing workflows, the system reads their workbooks directly and generates client-ready deliverables without any interface change.",
  },
];

const results = [
  { label: "Knowledge", value: "20+ yrs", detail: "Logic institutionalized" },
  { label: "Speed", value: "<1 hr", detail: "From 3-5 days" },
  { label: "Errors", value: "0%", detail: "From 10-15%" },
  { label: "Timeline", value: "Weeks", detail: "Not months" },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sports Venue Systems Integrator</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            $100M+ revenue · 20+ years of tribal knowledge · 3-5 day proposal cycle
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <Card className="bg-card border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                The Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A systems integrator for sports venues and large-scale facilities had built significant revenue on a fragile foundation: massive Excel workbooks, isolated templates, and deeply guarded tribal knowledge held by a handful of senior estimators.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Generating a single high-value proposal required days of manual work. Pricing logic existed only in key personnel's heads. The company faced existential risk: if those people left, the knowledge walked out the door.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Measurable Impact</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border/50 text-center h-full">
                  <CardContent className="p-5">
                    <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {result.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">{result.value}</p>
                    <p className="text-xs text-muted-foreground">{result.detail}</p>
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
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
      </div>
    </section>
  );
}
