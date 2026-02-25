"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Mail className="w-3.5 h-3.5 mr-2 text-primary" />
            Let&apos;s Talk
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a problem AI could solve?
          </h2>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            I take on a limited number of projects at a time. If you have a
            workflow that&apos;s eating up your team&apos;s time, let&apos;s
            discuss whether AI automation makes sense.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-card border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-[var(--cyan)]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-[var(--cyan)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Start a Conversation
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Tell me about your workflow challenges. I&apos;ll be honest
                    about whether I can help — and if I can&apos;t, I&apos;ll
                    point you in the right direction.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 group bg-[var(--ember)] hover:bg-[var(--ember)]/90 text-[var(--ember-foreground)]"
                  asChild
                >
                  <a href="mailto:hello@ahmadbasheer.com">
                    <Mail className="mr-2 h-4 w-4" />
                    hello@ahmadbasheer.com
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Response within 24 hours · No sales calls · Direct communication
          </p>
        </motion.div>
      </div>
    </section>
  );
}
