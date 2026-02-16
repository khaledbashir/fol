"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Calendar, FileSpreadsheet, Send, Edit3 } from "lucide-react";
import { WorkbookEditor } from "@/components/editor/workbook-editor";

export function ContactSection() {
  const [showEditor, setShowEditor] = useState(false);

  const handleEditorSubmit = (content: string, file?: File) => {
    // Here you would send the content to your backend
    console.log("Submitting workbook:", { content, file });
    
    // You could send via email API, webhook, or direct upload
    const subject = file ? `Workbook Submission: ${file.name}` : "Workbook Content Submission";
    const body = `Workbook content submitted:\n\n${content.substring(0, 1000)}${content.length > 1000 ? "..." : ""}`;
    
    // Create mailto link
    window.location.href = `mailto:hello@ahmadbasheer.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (showEditor) {
    return (
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Button
              variant="outline"
              onClick={() => setShowEditor(false)}
              className="mb-4"
            >
              ← Back to Contact Options
            </Button>
          </motion.div>
          <WorkbookEditor onSubmit={handleEditorSubmit} />
        </div>
      </section>
    );
  }

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
            Let's Talk
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to stop losing margin to manual processes?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            I take on a limited number of engagements per quarter. If your team is drowning in spreadsheets, tribal knowledge, and error-prone workflows, let's talk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="bg-card border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Free Assessment</h3>
                  <p className="text-muted-foreground text-sm">
                    Send me your ugliest estimator workbook + one prior proposal PDF. I'll return a 2-page extraction map + automation plan.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 group" onClick={() => setShowEditor(true)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Use Editor (No Upload Needed)
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="flex-1 group" asChild>
                  <a href="mailto:hello@ahmadbasheer.com?subject=Free Assessment Request">
                    <Send className="mr-2 h-4 w-4" />
                    Send Your Workbook
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <a href="mailto:hello@ahmadbasheer.com?subject=Schedule a Conversation">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Call
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-4">
            <span>Enterprise AI Architecture</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Systems Engineering</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Operational Transformation</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Mid-market and enterprise ($25M–$500M+ revenue) · Construction · Manufacturing · Infrastructure
          </p>
        </motion.div>
      </div>
    </section>
  );
}
