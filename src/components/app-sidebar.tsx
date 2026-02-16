"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Lightbulb,
  Layers,
  Briefcase,
  GitBranch,
  Building2,
  User,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#philosophy", label: "Philosophy", icon: Lightbulb },
  { href: "#forge-engine", label: "Forge Engine", icon: Layers },
  { href: "#solutions", label: "Solutions", icon: Briefcase },
  { href: "#case-study", label: "Case Study", icon: GitBranch },
  { href: "#sectors", label: "Sectors", icon: Building2 },
  { href: "#about", label: "About", icon: User },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="#hero" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">AB</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Ahmad Basheer</h1>
              <p className="text-xs text-muted-foreground">Enterprise AI Architect</p>
            </div>
          </Link>
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </motion.div>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex items-center justify-center gap-3">
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          © 2025 Ahmad Basheer
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
