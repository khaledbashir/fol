"use client";

import {
  Sparkles,
  FileText,
  FolderKanban,
  Settings,
  BarChart,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Projects",
    description: "Manage portfolio projects with AI assistance",
    icon: FolderKanban,
    href: "/admin/projects",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Blog Posts",
    description: "Write and publish blog posts with AI",
    icon: FileText,
    href: "/admin/blog",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "AI Assistant",
    description: "Generate content with AI",
    icon: Sparkles,
    href: "/admin/ai",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Analytics",
    description: "View site analytics and insights",
    icon: BarChart,
    href: "/admin/analytics",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Settings",
    description: "Configure site settings",
    icon: Settings,
    href: "/admin/settings",
    color: "bg-gray-500/10 text-gray-500",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">AI-powered content management</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(section => (
            <Link key={section.href} href={section.href}>
              <Card className="hover:border-primary/50 transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div
                    className={`h-12 w-12 rounded-lg ${section.color} flex items-center justify-center mb-4`}
                  >
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
