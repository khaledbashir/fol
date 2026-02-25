"use client";

import { motion } from "framer-motion";
import { ArrowDown, Brain, FileText, Zap, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const quickProof = [
  { icon: Brain, value: "AI-Powered", label: "Automation" },
  { icon: FileText, value: "Document", label: "Intelligence" },
  { icon: Zap, value: "Weeks → Minutes", label: "Time Saved" },
  { icon: Clock, value: "Production", label: "Ready" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm border-primary/30 text-primary"
            >
              Tech Lead & AI Consultant
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Ahmad</span>{" "}
            <span className="text-primary">Basheer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            I build{" "}
            <span className="text-foreground font-medium">
              AI-powered systems
            </span>{" "}
            that replace manual workflows with intelligent automation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Turning weeks of work into minutes. I take messy, real-world
            workflows and turn them into production systems that professionals
            trust and actually use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto"
          >
            {quickProof.map(item => (
              <div key={item.label} className="text-center">
                <Card className="bg-card/50 border-border/50 hover:border-[var(--cyan)]/30 transition-colors">
                  <CardContent className="p-3">
                    <item.icon className="h-4 w-4 text-[var(--cyan)] mx-auto mb-1" />
                    <p className="text-sm font-bold text-foreground">
                      {item.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="px-8 bg-[var(--ember)] hover:bg-[var(--ember)]/90 text-[var(--ember-foreground)]"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Available for AI tool development & consulting
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
