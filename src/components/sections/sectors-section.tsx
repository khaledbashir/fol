"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, HardHat, Building, Factory, Landmark, Shield } from "lucide-react";

const sectors = [
  {
    icon: HardHat,
    title: "Mechanical & Electrical Contracting",
    description: "Multi-trade bid assembly, material takeoff automation, and subcontractor scope generation from architectural plans.",
  },
  {
    icon: Building,
    title: "Civil Engineering & Infrastructure",
    description: "Large-scale public bid management, prevailing wage compliance automation, and multi-phase project estimation.",
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial Equipment",
    description: "Configure-price-quote systems for custom fabrication, integrating bill-of-materials logic with margin management.",
  },
  {
    icon: Building2,
    title: "Commercial Real Estate & Construction",
    description: "Tenant improvement estimation, change order tracking, and GC bid comparison automation.",
  },
  {
    icon: Landmark,
    title: "Government & Defense Procurement",
    description: "RFP response automation, compliance matrix generation, and technical volume assembly for federal contracting.",
  },
  {
    icon: Shield,
    title: "Enterprise Technology Services",
    description: "Complex service cataloging, SOW automation, and professional services estimation for technology integrators.",
  },
];

export function SectorsSection() {
  return (
    <section id="sectors" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30">
            <Building2 className="w-3.5 h-3.5 mr-2 text-primary" />
            Applicability
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sector Applications</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            The Forge Engine's modular design has direct applications across any sector where complex estimation, document-heavy workflows, and institutional knowledge create operational bottlenecks.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-default">
                <CardContent className="p-5">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <sector.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{sector.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {sector.description}
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
