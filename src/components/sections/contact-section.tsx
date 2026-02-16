"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, Calendar } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative bg-card/30">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Mail className="w-3.5 h-3.5 mr-2 text-primary" />
            Let's Talk
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to stop losing margin to manual processes?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            I take on a limited number of engagements per quarter to ensure full architectural attention on every deployment. If your team is drowning in spreadsheets, tribal knowledge, and error-prone estimation workflows, let's talk.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="px-8 group" asChild>
              <a href="mailto:hello@ahmadbasheer.com">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Mid-market and enterprise companies ($25M–$500M+ revenue) in construction, manufacturing, infrastructure, and technical services.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>Enterprise AI Architecture</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>Systems Engineering</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>Operational Transformation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
