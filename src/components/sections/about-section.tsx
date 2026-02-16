"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, CheckCircle2, XCircle, ArrowRight, Shield, Lock, Server, Users } from "lucide-react";

const rightFit = [
  "Your most critical business logic lives in the heads of 2–3 senior employees.",
  "You're generating six- and seven-figure proposals on spreadsheets that haven't been audited in years.",
  "Your RFP response process is measured in days or weeks, not hours.",
  "You've been burned by software vendors who delivered a demo that looked nothing like the final product.",
  "You need a system that works for the team you have today — not the team you wish you had.",
];

const notRightFit = [
  "You're an early-stage startup looking for an MVP.",
  "You need a basic website, CRM, or off-the-shelf SaaS integration.",
  "You want a system that replaces your team. I build systems that multiply your team.",
];

const security = [
  { icon: Shield, title: "Environment Isolation", description: "Dedicated infrastructure per client. No shared tenancy, no data commingling." },
  { icon: Lock, title: "Role-Based Access Control", description: "Granular RBAC with audit logging across every user action and system event." },
  { icon: Users, title: "Human-in-the-Loop", description: "All AI-generated outputs require human review before client-facing delivery." },
  { icon: Server, title: "Deployment Flexibility", description: "Deploy on client-managed cloud, private hosting, or managed environments." },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who This Is For</h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
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
                  <h3 className="text-lg font-semibold">You're the right fit if...</h3>
                </div>
                <ul className="space-y-3">
                  {rightFit.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      {item}
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
                  <h3 className="text-lg font-semibold">I'm not the right fit if...</h3>
                </div>
                <ul className="space-y-3">
                  {notRightFit.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-red-400 mt-0.5">•</span>
                      {item}
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
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-card border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">The Backstory</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I didn't start in software. I started in operations — managing teams, building recruiting pipelines, and running the day-to-day machinery of companies that moved too fast to document their own processes. I watched brilliant businesses nearly collapse because their most valuable asset wasn't on the balance sheet. It was in someone's head.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                That's what pulled me into engineering. Not the technology itself, but the problem: how do you capture the way a business actually works — the shortcuts, the exceptions, the judgment calls — and turn it into infrastructure that scales?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I've since founded and built SaaS platforms from the ground up, led full-stack product development, and spent thousands of hours inside the operational realities of industries that most software engineers never see. That dual fluency — in boardrooms and in codebases — is what makes my work different.
              </p>
              <p className="text-foreground font-medium mt-6 italic">
                I don't build software that looks like it should work. I build software that works the way your business actually operates.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Infrastructure & Security</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {security.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 text-center">
                  <CardContent className="p-5">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1 text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.description}
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
