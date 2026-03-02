"use client";

import { Cpu, Plus, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AIProvider,
  AISettings,
  getAISettings,
  saveAISettings,
  fetchModels,
} from "@/lib/ai";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AISettings>({
    providers: [],
    selectedProvider: "",
    selectedModel: "",
  });
  const [newProvider, setNewProvider] = useState({
    name: "",
    endpoint: "",
    apiKey: "",
  });
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSettings(getAISettings());
  }, []);

  const handleAddProvider = async () => {
    if (!newProvider.name || !newProvider.endpoint || !newProvider.apiKey) {
      setError("All fields are required");
      return;
    }

    setLoading("add");
    setError(null);

    try {
      const models = await fetchModels(
        newProvider.endpoint,
        newProvider.apiKey,
      );

      const provider: AIProvider = {
        id: Date.now().toString(),
        name: newProvider.name,
        endpoint: newProvider.endpoint,
        apiKey: newProvider.apiKey,
        models,
      };

      const updated = {
        ...settings,
        providers: [...settings.providers, provider],
      };

      setSettings(updated);
      saveAISettings(updated);
      setNewProvider({ name: "", endpoint: "", apiKey: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add provider");
    } finally {
      setLoading(null);
    }
  };

  const handleRemoveProvider = (id: string) => {
    const updated = {
      ...settings,
      providers: settings.providers.filter(p => p.id !== id),
      selectedProvider:
        settings.selectedProvider === id ? "" : settings.selectedProvider,
    };
    setSettings(updated);
    saveAISettings(updated);
  };

  const handleRefreshModels = async (provider: AIProvider) => {
    setLoading(provider.id);
    setError(null);

    try {
      const models = await fetchModels(provider.endpoint, provider.apiKey);

      const updated = {
        ...settings,
        providers: settings.providers.map(p =>
          p.id === provider.id ? { ...p, models } : p,
        ),
      };

      setSettings(updated);
      saveAISettings(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh models");
    } finally {
      setLoading(null);
    }
  };

  const handleSelectProvider = (providerId: string) => {
    const provider = settings.providers.find(p => p.id === providerId);
    const updated = {
      ...settings,
      selectedProvider: providerId,
      selectedModel: provider?.models[0] || "",
    };
    setSettings(updated);
    saveAISettings(updated);
  };

  const handleSelectModel = (model: string) => {
    const updated = { ...settings, selectedModel: model };
    setSettings(updated);
    saveAISettings(updated);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6">
        <Badge variant="outline">Configuration</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          AI Settings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Configure providers, refresh available models, and choose your active
          inference endpoint.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Providers
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {settings.providers.length}
              </p>
            </div>
            <ShieldCheck className="h-5 w-5 text-cyan" />
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Active Model
              </p>
              <p className="mt-2 text-lg font-semibold">
                {settings.selectedModel || "Not selected"}
              </p>
            </div>
            <Cpu className="h-5 w-5 text-primary" />
          </CardContent>
        </Card>
      </section>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card className="border-border/70 bg-card/80">
        <CardHeader className="border-b border-border/70 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add AI Provider
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Provider Name
            </label>
            <Input
              value={newProvider.name}
              onChange={e =>
                setNewProvider({ ...newProvider, name: e.target.value })
              }
              placeholder="e.g., OpenAI, Local LLM"
              className="bg-background/80"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              API Endpoint
            </label>
            <Input
              value={newProvider.endpoint}
              onChange={e =>
                setNewProvider({ ...newProvider, endpoint: e.target.value })
              }
              placeholder="https://api.openai.com/v1"
              className="bg-background/80"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">API Key</label>
            <Input
              type="password"
              value={newProvider.apiKey}
              onChange={e =>
                setNewProvider({ ...newProvider, apiKey: e.target.value })
              }
              placeholder="sk-..."
              className="bg-background/80"
            />
          </div>
          <Button onClick={handleAddProvider} disabled={loading === "add"}>
            {loading === "add" ? "Adding..." : "Add Provider"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/80">
        <CardHeader className="border-b border-border/70 pb-4">
          <CardTitle>Configured Providers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          {settings.providers.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No providers configured. Add one above.
            </p>
          ) : (
            settings.providers.map(provider => (
              <div
                key={provider.id}
                className="space-y-3 rounded-lg border border-border/70 bg-background/70 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold">{provider.name}</h3>
                      {settings.selectedProvider === provider.id && (
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {provider.endpoint}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRefreshModels(provider)}
                      disabled={loading === provider.id}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${loading === provider.id ? "animate-spin" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveProvider(provider.id)}
                      className="hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Models ({provider.models.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {provider.models.map(model => (
                      <Badge
                        key={model}
                        variant={
                          settings.selectedProvider === provider.id &&
                          settings.selectedModel === model
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          handleSelectProvider(provider.id);
                          handleSelectModel(model);
                        }}
                      >
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>

                {settings.selectedProvider !== provider.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectProvider(provider.id)}
                  >
                    Set as Active
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
