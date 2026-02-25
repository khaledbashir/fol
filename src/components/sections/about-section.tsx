"use client";

import { motion } from "framer-motion";
import {
  User,
  CheckCircle2,
  XCircle,
  Code,
  Brain,
  Layers,
  Database,
  Cloud,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const rightFit = [
  "Your team is losing days of skilled labor to work that should be automated.",
  "You've tried off-the-shelf tools and they don't fit your process.",
  "You need something built for your exact workflow, not adapted from someone else's.",
];

const notRightFit = [
  "You need a basic website, a chatbot, or standard SaaS integrations.",
  "You're looking for the cheapest option — I'm the right option when the problem is complex enough to require it.",
];

const techStack = [
  { icon: Code, title: "Frontend", items: "React, Next.js, TypeScript" },
  {
    icon: Database,
    title: "Backend",
    items: "Python, FastAPI, Prisma, Node.js",
  },
  {
    icon: Brain,
    title: "AI/ML",
    items: "LLM integrations, Vision models, RAG",
  },
  {
    icon: FileText,
    title: "Document Processing",
    items: "PDF parsing, OCR, Classification",
  },
  {
    icon: Cloud,
    title: "Infrastructure",
    items: "Cloud deployment, API architecture",
  },
  { icon: Layers, title: "Data", items: "Database design, ETL pipelines" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <User className="w-3.5 h-3.5 mr-2 text-primary" />
            About
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            I&apos;m Ahmad Basheer — a Tech Lead and AI consultant who builds
            enterprise automation systems for companies drowning in
            document-heavy, manual workflows.
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mt-4">
            My background is in full-stack engineering and AI integration.
            I&apos;ve spent years building systems where failure isn&apos;t a
            demo inconvenience — it&apos;s a lost contract or a compliance gap.
            That shapes how I build: production-grade by default, fast by
            design, and built for the people who actually have to use it.
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mt-4">
            I take on a small number of projects at a time. Every engagement
            gets my direct attention from discovery through deployment. No
            juniors, no handoffs, no context lost in translation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        ></motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">
                    You&apos;re the right fit if...
                  </h3>
                </div>
                <ul className="space-y-3">
                  {rightFit.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold">
                    Not the right fit if...
                  </h3>
                </div>
                <ul className="space-y-3">
                  {notRightFit.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Technical Toolkit
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-[var(--cyan)]/30 transition-colors text-center">
                  <CardContent className="p-4">
                    <tech.icon className="h-5 w-5 text-[var(--cyan)] mx-auto mb-2" />
                    <p className="text-xs font-medium mb-1">{tech.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {tech.items}
                    </p>
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
