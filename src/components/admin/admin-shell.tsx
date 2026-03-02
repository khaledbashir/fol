"use client";

import {
  BarChart3,
  BookText,
  BrainCircuit,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Overview and activity",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    description: "Portfolio management",
    icon: FolderKanban,
  },
  {
    href: "/admin/blog",
    label: "Blog",
    description: "Publishing pipeline",
    icon: BookText,
  },
  {
    href: "/admin/ai",
    label: "AI Assistant",
    description: "Generation workspace",
    icon: BrainCircuit,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    description: "Performance metrics",
    icon: BarChart3,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Configuration",
    icon: Settings2,
  },
];

function getPageLabel(pathname: string): string {
  const active = navItems.find(item =>
    item.href === "/admin"
      ? pathname === item.href
      : pathname.startsWith(item.href),
  );

  return active?.label ?? "Admin";
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <nav className="space-y-1">
      {navItems.map(item => {
        const isActive =
          item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
              isActive
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-card",
            )}
          >
            <item.icon
              className={cn(
                "h-4 w-4 shrink-0",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.label}</p>
              <p className="truncate text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.58_0.2_270_/_0.12),transparent_40%),radial-gradient(circle_at_80%_20%,oklch(0.75_0.15_180_/_0.08),transparent_35%)]" />
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-4 py-4 md:px-6 md:py-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 flex-col rounded-2xl border border-border/70 bg-card/80 p-5 backdrop-blur md:flex">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Portfolio CMS
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Admin Control</h1>
          </div>
          <NavLinks pathname={pathname} />
          <div className="mt-auto rounded-xl border border-border/60 bg-background/80 p-4">
            <p className="text-sm font-medium">Environment</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Production-grade admin workspace
            </p>
            <Badge variant="outline" className="mt-3">
              Secure session
            </Badge>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-4 py-3 backdrop-blur md:px-5">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Admin
              </p>
              <h2 className="truncate text-xl font-semibold md:text-2xl">
                {pageLabel}
              </h2>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Admin Navigation</SheetTitle>
                  <SheetDescription>
                    Open any management workspace.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-6">
                  <NavLinks pathname={pathname} />
                </div>
              </SheetContent>
            </Sheet>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
