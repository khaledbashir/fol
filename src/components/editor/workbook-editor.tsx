"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  RotateCcw, 
  Send,
  Trash2,
  Copy,
  Download
} from "lucide-react";

interface WorkbookEditorProps {
  onSubmit?: (content: string, file?: File) => void;
  initialContent?: string;
  placeholder?: string;
}

export function WorkbookEditor({ 
  onSubmit, 
  initialContent = "", 
  placeholder = "Paste your workbook content here or upload a PDF/Excel file..." 
}: WorkbookEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProvider, setOcrProvider] = useState<"mistral" | "tesseract" | "paddleocr">("mistral");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setContent("");
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // For now, just read text content
      // In a real implementation, you'd send this to your OCR service
      const formData = new FormData();
      formData.append("file", file);
      formData.append("provider", ocrProvider);

      // Simulate OCR processing
      setTimeout(() => {
        setContent(`[OCR Processing with ${ocrProvider}]\n\nFile: ${file.name}\nSize: ${(file.size / 1024).toFixed(2)} KB\n\nContent would appear here after OCR processing...`);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error("Error processing file:", error);
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(content, uploadedFile || undefined);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  const downloadContent = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workbook-content.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Workbook Editor
          </span>
          <div className="flex items-center gap-2">
            <Badge variant={ocrProvider === "mistral" ? "default" : "secondary"}>
              OCR: {ocrProvider}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OCR Provider Selection */}
        <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
          <span className="text-sm font-medium">OCR Provider:</span>
          <div className="flex gap-2">
            <Button
              variant={ocrProvider === "mistral" ? "default" : "outline"}
              size="sm"
              onClick={() => setOcrProvider("mistral")}
            >
              Mistral (Best)
            </Button>
            <Button
              variant={ocrProvider === "tesseract" ? "default" : "outline"}
              size="sm"
              onClick={() => setOcrProvider("tesseract")}
            >
              Tesseract
            </Button>
            <Button
              variant={ocrProvider === "paddleocr" ? "default" : "outline"}
              size="sm"
              onClick={() => setOcrProvider("paddleocr")}
            >
              PaddleOCR
            </Button>
          </div>
        </div>

        {/* File Upload */}
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.xlsx,.xls,.csv,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isProcessing ? "Processing..." : "Upload PDF/Excel"}
          </Button>
          {uploadedFile && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {uploadedFile.name}
            </Badge>
          )}
        </div>

        {/* Text Editor */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full h-96 p-4 border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {content.length > 0 && (
            <div className="absolute top-2 right-2 flex gap-1">
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={downloadContent}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Character Count */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{content.length} characters</span>
          {uploadedFile && (
            <span className="flex items-center gap-1">
              <Trash2 className="h-3 w-3" />
              <button 
                onClick={() => {
                  setUploadedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="hover:text-destructive"
              >
                Remove file
              </button>
            </span>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={!content.trim() || isProcessing}
        >
          <Send className="h-4 w-4 mr-2" />
          Submit for Analysis
        </Button>

        {/* OCR Provider Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Mistral:</strong> Best formatting, preserves table structure, understands context</p>
          <p><strong>Tesseract:</strong> Basic text extraction, loses formatting, struggles with tables</p>
          <p><strong>PaddleOCR:</strong> Good for Chinese, moderate formatting, inconsistent results</p>
        </div>
      </CardContent>
    </Card>
  );
}