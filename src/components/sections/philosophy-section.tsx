"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    icon: Lightbulb,
    title: "I focus on leverage, not novelty",
    description:
      "I don&apos;t propose AI because it&apos;s trendy. I map your workflows, find where hours are being burned on repeatable decisions and document processing, and build the specific system that eliminates that waste. If AI isn&apos;t the answer, I&apos;ll tell you.",
  },
  {
    icon: Users,
    title: "I build for adoption, not demos",
    description:
      "A tool your team avoids is worthless. Every system I build fits inside how your people already work — or it doesn't ship. If your process runs on spreadsheets today, the transition is seamless, not a six-month change management project.",
  },
  {
    icon: Gauge,
    title: "I move fast because speed has a dollar value",
    description:
      "Every week your team spends on manual proposal work is revenue at risk and senior talent wasted on data entry. I use AI aggressively in my own build process, which means working software in weeks — not a roadmap that turns into a six-month engagement.",
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One person. Full accountability. No handoffs.
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            I operate as a one-person product team — scoping, building,
            deploying, and iterating directly with decision-makers. That means
            zero context lost between a sales call and a developer. When you
            talk to me, you&apos;re talking to the person who writes the code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <p className="text-muted-foreground leading-relaxed">
            I communicate directly, I ship fast, and I treat your problem like
            my problem. No account managers, no handoffs, no lost context.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-[var(--cyan)]/30 transition-colors duration-300 group">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-[var(--cyan)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--cyan)]/20 transition-colors duration-300">
                    <principle.icon className="h-6 w-6 text-[var(--cyan)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.description}
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
