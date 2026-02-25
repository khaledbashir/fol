"use client";

import { ArrowLeft, Plus, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">AI Settings</h1>
            <p className="text-muted-foreground text-sm">
              Configure AI providers and models
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add AI Provider
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Provider Name
              </label>
              <Input
                value={newProvider.name}
                onChange={e =>
                  setNewProvider({ ...newProvider, name: e.target.value })
                }
                placeholder="e.g., OpenAI, Local LLM"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                API Endpoint
              </label>
              <Input
                value={newProvider.endpoint}
                onChange={e =>
                  setNewProvider({ ...newProvider, endpoint: e.target.value })
                }
                placeholder="https://api.openai.com/v1"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">API Key</label>
              <Input
                type="password"
                value={newProvider.apiKey}
                onChange={e =>
                  setNewProvider({ ...newProvider, apiKey: e.target.value })
                }
                placeholder="sk-..."
              />
            </div>
            <Button onClick={handleAddProvider} disabled={loading === "add"}>
              {loading === "add" ? "Adding..." : "Add Provider"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configured Providers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.providers.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No providers configured. Add one above.
              </p>
            ) : (
              settings.providers.map(provider => (
                <div
                  key={provider.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
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
                    <label className="text-sm font-medium mb-2 block">
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
    </div>
  );
}
