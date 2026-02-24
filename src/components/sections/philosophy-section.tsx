"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, Gauge, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    icon: Lightbulb,
    title: "Real Problems, Not Hype",
    description:
      "I don't build chatbots for the sake of having AI. I identify where AI actually solves problems — document processing, workflow automation, decision support — and build only what delivers value.",
  },
  {
    icon: Users,
    title: "Built for Real Users",
    description:
      "The best AI tool is worthless if nobody uses it. I build interfaces that fit how people actually work. If your team can use a spreadsheet, they can use what I build — on day one.",
  },
  {
    icon: Gauge,
    title: "Ship Fast, Ship Working",
    description:
      "I use AI tooling aggressively in my own workflow. That means I move at a speed that surprises people used to traditional dev shops. Working software, delivered fast.",
  },
  {
    icon: Code,
    title: "Production-Grade Code",
    description:
      "No prototypes dressed up as products. Everything I build is engineered for real use — proper error handling, testing, documentation, and maintainability.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How I Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I operate as a one-person product team — scoping, building,
            deploying, and iterating directly with stakeholders.
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
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-colors duration-300 group">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <principle.icon className="h-6 w-6 text-primary" />
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
