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
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const rightFit = [
  "You have manual processes eating up hours of skilled people's time.",
  "You're drowning in documents, spreadsheets, and disconnected workflows.",
  "You need AI that actually works in production, not just demos.",
  "You want to ship fast without sacrificing quality.",
];

const notRightFit = [
  "You just need a basic website or landing page.",
  "You're looking for off-the-shelf SaaS integration.",
  "You want a chatbot slapped onto your homepage.",
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

const whatIBuild = [
  {
    icon: FileText,
    title: "Proposal & Quote Automation",
    description:
      "Systems that take complex pricing spreadsheets and output polished, branded PDF proposals. No more copy-paste marathons between Excel and Word.",
  },
  {
    icon: Brain,
    title: "RFP Intelligence Platforms",
    description:
      "AI-powered tools that digest massive specification documents, extract relevant requirements using vision models, and surface what teams need to build accurate quotes fast.",
  },
  {
    icon: Layers,
    title: "Document Processing Pipelines",
    description:
      "End-to-end systems that take unstructured inputs — architectural drawings, scanned PDFs, messy spreadsheets — then classify, extract, and structure the data.",
  },
  {
    icon: Settings,
    title: "Internal Tools & Dashboards",
    description:
      "Custom platforms that give teams visibility into their workflows, automate approval chains, and eliminate the back-and-forth that kills productivity.",
  },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            I sit at the intersection of AI engineering and business process
            automation. I build tools that survive contact with real users and
            real data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            What I Build
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whatIBuild.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-[var(--cyan)]/30 transition-colors">
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
