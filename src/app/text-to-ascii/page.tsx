"use client";

import { useState, useEffect, useDeferredValue, useRef } from "react";
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
import { useAsciiHistory, HistoryItem } from "@/lib/hooks/useAsciiHistory";
import { HistorySidebar } from "@/components/widgets/history-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TextToAsciiPage() {
  const [text, setText] = useState("ASCII Gen");
  const deferredText = useDeferredValue(text);
  const [font, setFont] = useState(FONT_LIST[0]);
  const [asciiResult, setAsciiResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { addItem } = useAsciiHistory();
  const lastGeneratedRef = useRef<string>("");

  useEffect(() => {
    async function updateAscii() {
      setIsGenerating(true);
      try {
        const result = await generateAsciiText(deferredText, font);
        setAsciiResult(result);

        if (result !== lastGeneratedRef.current && result.trim().length > 0 && deferredText.trim().length > 0) {
          lastGeneratedRef.current = result;
          addItem({
             type: 'text',
             data: deferredText,
             resultPreview: result.split('\n').slice(0, 10).join('\n'),
             options: { font, text: deferredText }
          });
        }
      } catch (err) {
        console.error("Error generating ASCII:", err);
      } finally {
        setIsGenerating(false);
      }
    }

    const timeoutId = setTimeout(() => {
      updateAscii();
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [deferredText, font, addItem]);

  const loadHistoryItem = (item: HistoryItem) => {
    const opts = item.options;
    if (opts.text) setText(opts.text);
    if (opts.font) setFont(opts.font);
  };

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

  const handleExportHtml = () => {
    if (!asciiResult) return;

    const htmlContent = asciiResult.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const htmlStr = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ASCII Text Export</title>
<style>
  body { background: black; color: white; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
  .container { position: relative; background: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; max-width: 100%; overflow: auto; }
  pre { font-family: monospace; line-height: 1.2; letter-spacing: normal; font-size: 14px; text-align: left; margin: 0; color: white; white-space: pre; }
  button { position: absolute; top: 10px; right: 10px; background: #333; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
  button:hover { background: #444; }
</style>
</head>
<body>
<div class="container">
  <button onclick="copyContent()">Copy</button>
  <pre id="ascii-content">${htmlContent}</pre>
</div>
<script>
  function copyContent() {
    const content = document.getElementById('ascii-content');
    let text = content.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  }
</script>
</body>
</html>`;

    const blob = new Blob([htmlStr], { type: "text/html;charset=utf-8" });
    saveAs(blob, "ascii-text-export.html");
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
          <Tabs defaultValue="editor" className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="flex-1 m-0">
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
                    <Button variant="outline" size="sm" onClick={handleExportHtml} disabled={!asciiResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Export HTML
                    </Button>
                  </div>
                </div>
                <div className="flex-1 bg-black p-4 overflow-auto min-h-[400px] flex items-center justify-center">
                  <pre className="font-mono text-[10px] sm:text-xs md:text-sm leading-tight text-white whitespace-pre">
                    {isGenerating && !asciiResult ? "Generating..." : asciiResult}
                  </pre>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="flex-1 m-0">
              <Card className="h-full p-4 min-h-[400px]">
                <HistorySidebar type="text" onLoadItem={loadHistoryItem} />
              </Card>
            </TabsContent>
          </Tabs>
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
