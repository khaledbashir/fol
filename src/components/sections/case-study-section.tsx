"use client";

import { motion } from "framer-motion";
import { GitBranch, Zap, Target, Brain, Layers, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const execution = [
  {
    icon: Brain,
    title: "Document Intelligence Engine",
    description:
      "AI pipeline that reads hundreds of pages of specifications, RFPs, and technical documents — automatically extracting requirements and parameters.",
  },
  {
    icon: Layers,
    title: "Smart Component Bundler",
    description:
      "AI-powered system that automatically recommends required components based on primary configuration — preventing costly omissions.",
  },
  {
    icon: Settings,
    title: "Workflow Integration",
    description:
      "For teams who prefer existing workflows, the system reads their workbooks directly and generates deliverables without interface change.",
  },
  {
    icon: GitBranch,
    title: "Production Deployment",
    description:
      "Deployed in parallel to existing processes. Teams verify accuracy in real conditions before full adoption.",
  },
];

const results = [
  { label: "Time", value: "<1 hr", detail: "From 3-5 days" },
  { label: "Errors", value: "0%", detail: "From 10-15%" },
  { label: "Knowledge", value: "Captured", detail: "Not lost" },
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
            Case Study
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proposal Automation System
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            AI-powered proposal generation · Document intelligence · Workflow
            automation
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
                <Zap className="h-5 w-5 text-[var(--ember)]" />
                The Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A company had built significant revenue on a fragile foundation:
                massive Excel workbooks, isolated templates, and deeply guarded
                tribal knowledge held by a handful of senior staff.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Generating a single high-value proposal required days of manual
                work. Critical logic existed only in key personnel&apos;s heads.
                The company faced existential risk: if those people left, the
                knowledge walked out the door.
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
          <h3 className="text-xl font-semibold mb-6 text-center">
            Measurable Impact
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border/50 text-center">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {result.label}
                    </p>
                    <p className="text-2xl font-bold text-[var(--ember)]">
                      {result.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.detail}
                    </p>
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
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            System Components
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {execution.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border/50 h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-[var(--cyan)]/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-[var(--cyan)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
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
