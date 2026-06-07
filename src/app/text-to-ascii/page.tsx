"use client";

import { useState, useEffect, useDeferredValue } from "react";
import { FONT_LIST, generateAsciiText } from "@/lib/ascii/text-generator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import { saveAs } from "file-saver";
import { RelatedTools } from "@/components/widgets/related-tools";
import { RecentTools } from "@/components/widgets/recent-tools";
import { PopularTools } from "@/components/widgets/popular-tools";

export default function TextToAsciiPage() {
  const [text, setText] = useState("ASCII Gen");
  const deferredText = useDeferredValue(text);
  const [font, setFont] = useState(FONT_LIST[0]);
  const [asciiResult, setAsciiResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function updateAscii() {
      setIsGenerating(true);
      try {
        const result = await generateAsciiText(deferredText, font);
        setAsciiResult(result);
      } catch (err) {
        console.error("Error generating ASCII:", err);
      } finally {
        setIsGenerating(false);
      }
    }

    const timeoutId = setTimeout(() => {
      updateAscii();
    }, 100); // Small debounce

    return () => clearTimeout(timeoutId);
  }, [deferredText, font]);

  const handleCopy = () => {
    if (asciiResult) {
      navigator.clipboard.writeText(asciiResult);
    }
  };

  const handleDownload = () => {
    if (asciiResult) {
      const blob = new Blob([asciiResult], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "ascii-art.txt");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Text to ASCII Generator</h1>
        <p className="text-muted-foreground">Turn any text into stunning ASCII art instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Input Text</label>
              <Textarea
                placeholder="Type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="resize-none h-32"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Font Style</label>
              <Select value={font} onValueChange={(val) => val && setFont(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_LIST.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="flex flex-col h-full overflow-hidden">
            <div className="border-b bg-muted/50 p-2 flex justify-between items-center">
              <span className="text-sm font-medium pl-2 text-muted-foreground">Preview</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!asciiResult}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!asciiResult}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <div className="flex-1 bg-black/5 dark:bg-black/40 p-4 overflow-auto min-h-[400px]">
              <pre className="font-mono text-[10px] sm:text-xs md:text-sm leading-tight text-foreground whitespace-pre">
                {isGenerating && !asciiResult ? "Generating..." : asciiResult}
              </pre>
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t">
        <div className="lg:col-span-2">
          <RelatedTools />
        </div>
        <div className="lg:col-span-1">
          <PopularTools />
        </div>
      </div>
      <div className="mt-12">
        <RecentTools />
      </div>
    </div>
  );
}
