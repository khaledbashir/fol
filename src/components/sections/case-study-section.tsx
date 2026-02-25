"use client";

import { motion } from "framer-motion";
import { Target, AlertTriangle, Wrench, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const beforeAfter = [
  { metric: "Time per proposal", before: "3–5 days", after: "Under 1 hour" },
  { metric: "Error rate", before: "10–15%", after: "Near zero" },
  {
    metric: "Knowledge location",
    before: "3 people's heads",
    after: "Captured in the system",
  },
  {
    metric: "Senior staff role",
    before: "Doing data entry",
    after: "Doing actual estimation",
  },
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
            Proposal Automation System — Construction & Enterprise Contracting
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-card border-border/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[var(--ember)]" />
                  The situation
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A company generating significant revenue from complex,
                  high-value proposals had a dangerous operational dependency:
                  their entire quoting process lived inside massive Excel
                  workbooks, disconnected templates, and the heads of three
                  senior staff members.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A single proposal took 3–5 days of skilled labor. Critical
                  pricing logic existed nowhere but in key people&apos;s memory.
                  One resignation away from a process collapse.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card border-border/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-[var(--cyan)]" />
                  What I built
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A production AI system that reads their existing workbooks,
                  processes incoming specification documents, extracts
                  requirements automatically, and generates accurate, branded
                  proposals — in under an hour.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Senior estimators went from data entry operators to reviewers.
                  The knowledge that lived in people&apos;s heads was captured,
                  systematized, and made available to the whole team.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-card border-border/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  The results
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Metric
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                          Before
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                          After
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {beforeAfter.map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-border/30 last:border-0"
                        >
                          <td className="py-3 px-4 text-sm font-medium">
                            {row.metric}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {row.before}
                          </td>
                          <td className="py-3 px-4 text-sm text-green-500 font-medium">
                            {row.after}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card border-border/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">
                  How it was deployed
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  In parallel to the existing process. The team ran both systems
                  simultaneously until they trusted the output. No forced
                  cutover. No disruption to active bids. Full adoption inside
                  four weeks.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
