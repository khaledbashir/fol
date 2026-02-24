"use client";

import { motion } from "framer-motion";
import { GitBranch, Eye, Map, Rocket, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: MessageSquare,
    title: "Problem Discovery",
    description:
      "We start with a conversation about your workflow. Where are the bottlenecks? What's eating up time? What would move the needle? I need to understand the problem before proposing a solution.",
  },
  {
    icon: Eye,
    title: "Rapid Assessment",
    description:
      "I analyze your existing workflows, documents, and systems. Often I can identify automation opportunities you haven't seen because you're too close to the process.",
  },
  {
    icon: Map,
    title: "Scope & Build",
    description:
      "I define exactly what I'll build, then build it. You get working software fast — not wireframes, not slide decks, not endless meetings. Working code.",
  },
  {
    icon: Rocket,
    title: "Deploy & Iterate",
    description:
      "I deploy to production and iterate based on real usage. No big reveals. No months of development in a vacuum. Ship, learn, improve.",
  },
];

const timeline = [
  {
    phase: "Discovery",
    duration: "Days",
    description: "Understand the problem, assess feasibility",
  },
  {
    phase: "Build",
    duration: "Weeks",
    description: "Develop, test, and deploy working solution",
  },
  {
    phase: "Iterate",
    duration: "Ongoing",
    description: "Refine based on real-world usage",
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
            Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Problem to Solution
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            A straightforward process that delivers results.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            No months of discovery workshops. No endless meetings. I focus on
            understanding your problem and building a solution that works.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
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
                      <h3 className="text-lg font-semibold mb-3">
                        {step.title}
                      </h3>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-3xl mx-auto bg-card/50 border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Typical Timeline
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {timeline.map(item => (
                  <div key={item.phase} className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.duration}
                    </p>
                    <p className="font-semibold text-primary">{item.phase}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
