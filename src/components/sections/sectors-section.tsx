"use client";

import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  Factory,
  Briefcase,
  HardHat,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const sectors = [
  {
    icon: HardHat,
    title: "Construction & Contracting",
    description:
      "Proposal automation, bid assembly, and estimation systems for MEP, civil, and general contractors.",
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial",
    description:
      "CPQ systems, quote automation, and production workflow tools for custom fabrication and equipment.",
  },
  {
    icon: Building2,
    title: "Professional Services",
    description:
      "SOW automation, proposal generation, and client-facing document systems for consultancies and agencies.",
  },
  {
    icon: Briefcase,
    title: "Enterprise Operations",
    description:
      "Internal tools, approval workflows, and process automation for complex business operations.",
  },
  {
    icon: FileText,
    title: "Document-Heavy Industries",
    description:
      "Any industry drowning in PDFs, spreadsheets, and manual document processing workflows.",
  },
  {
    icon: Zap,
    title: "AI-Ready Businesses",
    description:
      "Organizations ready to move beyond chatbots and implement real AI-powered process improvements.",
  },
];

export function SectorsSection() {
  return (
    <section id="sectors" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Building2 className="w-3.5 h-3.5 mr-2 text-primary" />
            Applicability
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Where AI Meets Real Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            I build systems for industries where document-heavy workflows,
            complex processes, and skilled labor create bottlenecks that AI can
            solve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-[var(--cyan)]/30 transition-all duration-300 group cursor-default">
                <CardContent className="p-5">
                  <div className="h-11 w-11 rounded-lg bg-[var(--cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--cyan)]/20 transition-colors">
                    <sector.icon className="h-5 w-5 text-[var(--cyan)]" />
                  </div>
                  <h3 className="font-semibold mb-2">{sector.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {sector.description}
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
