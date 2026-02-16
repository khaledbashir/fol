"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, CheckCircle2, XCircle, Shield, Lock, Server, Users, HardHat, Factory, Building2 } from "lucide-react";

const rightFit = [
  "Your most critical business logic lives in the heads of 2–3 senior employees.",
  "You're generating six- and seven-figure proposals on spreadsheets.",
  "Your RFP response process is measured in days or weeks.",
  "You need a system that works for the team you have today.",
];

const notRightFit = [
  "Early-stage startup looking for an MVP.",
  "Basic website, CRM, or off-the-shelf SaaS integration.",
  "You want to replace your team. I build systems that multiply your team.",
];

const verticals = [
  { icon: HardHat, title: "Construction / MEP Estimators", focus: "Multi-trade bid assembly, material takeoff, prevailing wage compliance" },
  { icon: Factory, title: "Manufacturing CPQ & Quoting", focus: "Configure-price-quote systems, bill-of-materials logic, margin management" },
  { icon: Building2, title: "Sports & Venue Systems", focus: "Complex specifications, technical integrations, high-value project estimation" },
];

const security = [
  { icon: Shield, title: "Environment Isolation", description: "Dedicated infrastructure per client. No shared tenancy." },
  { icon: Lock, title: "Mandatory Review Gates", description: "All AI outputs require human approval before client delivery." },
  { icon: Users, title: "Role-Based Access", description: "Granular RBAC with audit logging on every action." },
  { icon: Server, title: "Flexible Deployment", description: "Your cloud, private hosting, or managed environment." },
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Best Fit Verticals</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {verticals.map((vertical, index) => (
              <motion.div
                key={vertical.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-colors text-center">
                  <CardContent className="p-5">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <vertical.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{vertical.title}</h4>
                    <p className="text-sm text-muted-foreground">{vertical.focus}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
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
          className="max-w-3xl mx-auto mb-16"
        >
          <Card className="bg-card border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">The Backstory</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I didn't start in software. I started in operations — managing teams, building recruiting pipelines, and running the day-to-day of companies that moved too fast to document their own processes. I watched brilliant businesses nearly collapse because their most valuable asset wasn't on the balance sheet. It was in someone's head.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                That's what pulled me into engineering. Not the technology itself, but the problem: how do you capture the way a business actually works — the shortcuts, the exceptions, the judgment calls — and turn it into infrastructure that scales?
              </p>
              <p className="text-foreground font-medium italic">
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
