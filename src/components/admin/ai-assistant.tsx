"use client";

import { Sparkles, X, Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAISettings, generateContent } from "@/lib/ai";
import { ProjectFormData } from "@/lib/projects";

interface AIAssistantProps {
  onGenerate: (content: Partial<ProjectFormData>) => void;
  onClose: () => void;
  type: "project" | "blog";
}

export function AIAssistant({ onGenerate, onClose, type }: AIAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const settings = getAISettings();
    if (!settings.selectedProvider || !settings.selectedModel) {
      setError("Please configure AI provider in Settings first");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const systemPrompt =
        type === "project"
          ? `Generate a portfolio project based on this description: "${prompt}". 
           Return a JSON object with these fields: title, client, description, challenge, solution, results, sector, technologies (array).
           Make it professional and detailed.`
          : `Generate a blog post based on this topic: "${prompt}". Return markdown content.`;

      const response = await generateContent(systemPrompt, settings);

      if (type === "project") {
        try {
          const parsed = JSON.parse(response);
          onGenerate(parsed);
        } catch {
          setError("Failed to parse AI response. Try again.");
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate content",
      );
    } finally {
      setGenerating(false);
    }
  };

  const suggestions =
    type === "project"
      ? [
          "E-commerce platform with AI recommendations",
          "Healthcare management system",
          "Supply chain optimization tool",
        ]
      : [
          "How to build scalable microservices",
          "Best practices for AI integration",
          "Modern web development trends",
        ];

  return (
    <Card className="border-border/70 bg-card/80">
      <CardHeader className="border-b border-border/70 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {error && (
          <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-2 block">
            Describe what you want to create
          </label>
          <div className="flex gap-2">
            <Input
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="E.g., A project about building an AI-powered inventory system..."
              onKeyDown={e => e.key === "Enter" && handleGenerate()}
              className="bg-background/80"
            />
            <Button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {generating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-background/80 p-3 text-xs text-muted-foreground">
          <p className="mb-1 font-medium">Prompt quality tips</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Be specific about the industry and problem</li>
            <li>Mention key technologies or approaches</li>
            <li>Include desired outcomes or metrics</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
