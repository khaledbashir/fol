"use client";

import { Bot, FilePlus2, Loader2, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const SKILLS = [
  "",
  "ai-proposal-builder",
  "upwork-tactical-closer",
  "product-growth-architecture-audit",
  "anythingllm-skill-builder",
];

export default function ClientPortalPage() {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const [clientSlug, setClientSlug] = useState("");
  const [proposalDate, setProposalDate] = useState("");
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalResult, setProposalResult] = useState<{
    markdownPath: string;
    pdfPath: string;
  } | null>(null);
  const [proposalError, setProposalError] = useState<string | null>(null);

  const canSend = useMemo(
    () => message.trim().length > 0 && !sending,
    [message, sending],
  );

  useEffect(() => {
    let active = true;
    async function loadModels() {
      setModelsLoading(true);
      setModelsError(null);
      try {
        const res = await fetch("/api/client-portal/chat");
        const data = (await res.json()) as {
          models?: string[];
          error?: string;
        };
        if (!res.ok) throw new Error(data.error || "Failed to load models.");
        if (!active) return;
        const list = data.models || [];
        setModels(list);
        if (list.length > 0) {
          setSelectedModel(list[0] ?? "");
        }
      } catch (error) {
        if (!active) return;
        setModelsError(
          error instanceof Error ? error.message : "Failed to load models.",
        );
      } finally {
        if (active) setModelsLoading(false);
      }
    }

    loadModels();
    return () => {
      active = false;
    };
  }, []);

  async function onSend(event: FormEvent) {
    event.preventDefault();
    if (!message.trim() || sending) return;

    const userText = message.trim();
    setMessage("");
    setChatError(null);
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setSending(true);

    try {
      const res = await fetch("/api/client-portal/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          skill: selectedSkill || undefined,
          model: selectedModel || undefined,
        }),
      });
      const data = (await res.json()) as { output?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: data.output || "No response." },
      ]);
    } catch (error) {
      setChatError(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    } finally {
      setSending(false);
    }
  }

  async function generateProposalClone() {
    if (!clientSlug.trim() || proposalLoading) return;
    setProposalError(null);
    setProposalResult(null);
    setProposalLoading(true);

    try {
      const res = await fetch("/api/client-portal/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSlug: clientSlug.trim(),
          date: proposalDate.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        markdownPath?: string;
        pdfPath?: string;
        error?: string;
      };
      if (!res.ok)
        throw new Error(data.error || "Failed to generate proposal.");
      setProposalResult({
        markdownPath: data.markdownPath || "",
        pdfPath: data.pdfPath || "",
      });
    } catch (error) {
      setProposalError(
        error instanceof Error ? error.message : "Failed to generate proposal.",
      );
    } finally {
      setProposalLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <Badge variant="outline">Phase 1</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Client Portal
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Client-facing wrapper over OpenCode with your local skills and
          proposal generation flow.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              OpenCode Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Model</label>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background/80 px-3 text-sm"
                disabled={modelsLoading || models.length === 0}
              >
                {models.length === 0 ? (
                  <option value="">
                    {modelsLoading
                      ? "Loading models..."
                      : "No models available"}
                  </option>
                ) : (
                  models.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))
                )}
              </select>
              {modelsError && (
                <p className="text-xs text-destructive">{modelsError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Skill (optional)
              </label>
              <select
                value={selectedSkill}
                onChange={e => setSelectedSkill(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background/80 px-3 text-sm"
              >
                {SKILLS.map(skill => (
                  <option key={skill || "auto"} value={skill}>
                    {skill || "Auto (no forced skill)"}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-md border border-border/70 bg-background/50 p-3">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Start a conversation. This route runs `opencode run` on the
                  server and returns the response.
                </p>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={`${m.role}-${i}`}
                    className={`rounded-md px-3 py-2 text-sm ${
                      m.role === "user" ? "ml-8 bg-primary/15" : "mr-8 bg-muted"
                    }`}
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {m.role}
                    </p>
                    <pre className="whitespace-pre-wrap font-sans">
                      {m.text}
                    </pre>
                  </div>
                ))
              )}
            </div>

            {chatError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {chatError}
              </div>
            )}

            <form onSubmit={onSend} className="flex gap-2">
              <Input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Ask for proposal generation, audits, or client operations tasks..."
                className="bg-background/80"
              />
              <Button type="submit" disabled={!canSend}>
                {sending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle className="flex items-center gap-2">
              <FilePlus2 className="h-5 w-5 text-cyan" />
              Proposal Quick Action
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <p className="text-sm text-muted-foreground">
              Creates a cloned markdown proposal and PDF without editing the
              master template.
            </p>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Client slug</label>
              <Input
                value={clientSlug}
                onChange={e => setClientSlug(e.target.value)}
                placeholder="acme-corp"
                className="bg-background/80"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Date (optional, YYYY-MM-DD)
              </label>
              <Input
                value={proposalDate}
                onChange={e => setProposalDate(e.target.value)}
                placeholder="2026-03-02"
                className="bg-background/80"
              />
            </div>

            <Button
              onClick={generateProposalClone}
              disabled={!clientSlug.trim() || proposalLoading}
              className="w-full"
            >
              {proposalLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FilePlus2 className="mr-2 h-4 w-4" />
              )}
              Create Proposal Clone
            </Button>

            {proposalError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {proposalError}
              </div>
            )}

            {proposalResult && (
              <div className="space-y-2 rounded-md border border-border/70 bg-background/70 p-3 text-sm">
                <p className="font-medium">Created successfully</p>
                <p className="text-xs text-muted-foreground">Markdown copy</p>
                <p className="break-all font-mono text-xs">
                  {proposalResult.markdownPath}
                </p>
                <p className="text-xs text-muted-foreground">PDF output</p>
                <p className="break-all font-mono text-xs">
                  {proposalResult.pdfPath}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
