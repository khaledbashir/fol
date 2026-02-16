"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ForgeEngineSection } from "@/components/sections/forge-engine-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { MethodologySection } from "@/components/sections/methodology-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border/50 px-4 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Ahmad Basheer</span>
            <span>·</span>
            <span>Enterprise AI Architect</span>
          </div>
        </header>
        <main className="flex-1">
          <HeroSection />
          <PhilosophySection />
          <ForgeEngineSection />
          <SolutionsSection />
          <CaseStudySection />
          <ProjectsSection />
          <MethodologySection />
          <SectorsSection />
          <AboutSection />
          <ContactSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
