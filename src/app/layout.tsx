import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Basheer | Enterprise AI Architect & Systems Engineer",
  description: "I turn corporate bottlenecks into scalable AI infrastructure. Architecting secure, human-centric AI platforms that capture institutional knowledge, eliminate manual data entry, and deliver measurable ROI from day one.",
  keywords: ["Enterprise AI", "Systems Engineer", "AI Architect", "Automation", "SaaS", "Digital Transformation"],
  authors: [{ name: "Ahmad Basheer" }],
  openGraph: {
    title: "Ahmad Basheer | Enterprise AI Architect",
    description: "I turn corporate bottlenecks into scalable AI infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://basheer-umami.prd42b.easypanel.host/script.js"
          data-website-id="879ac914-8b23-418d-9a8f-f6a776c98cff"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
