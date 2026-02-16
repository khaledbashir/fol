"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Gauge } from "lucide-react";

const principles = [
  {
    icon: Lightbulb,
    title: "Operational Architecture Over Feature Lists",
    description: "I identify structural bottlenecks — where knowledge gets hoarded, where handoffs break down, where errors compound — and architect systems that bypass legacy constraints entirely.",
  },
  {
    icon: Users,
    title: "Human-Centric Adoption",
    description: "Employees reject software that asks them to think differently. My interfaces mirror existing mental models. If your senior estimator can use Excel, he can use what I build — on day one, without training.",
  },
  {
    icon: Gauge,
    title: "Zero-Surprise Outputs",
    description: "Understated UI. Fast throughput. Every platform I build is engineered for immediate output. No feature bloat. No gratuitous UI. Clean logic, clean results.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Most Enterprise AI Fails</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The reason is never the code. It's the people.
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
            Before I engineered AI systems, I spent a decade in operations, recruiting, and SaaS product leadership. I've watched six-figure platforms collect dust because nobody asked the forty-year veteran estimator how he actually thinks.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <h3 className="text-lg font-semibold mb-3">{principle.title}</h3>
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
