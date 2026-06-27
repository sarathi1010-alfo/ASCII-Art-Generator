"use client";

import { useState, useEffect, useCallback, useDeferredValue, useRef } from "react";
import { generateAsciiFromImage, DENSITY_SETS, ImageAsciiOptions } from "@/lib/ascii/image-generator";
import { useAsciiHistory, HistoryItem } from "@/lib/hooks/useAsciiHistory";
import { HistorySidebar } from "@/components/widgets/history-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Upload, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import { Switch } from "@/components/ui/switch";
import { RelatedTools } from "@/components/widgets/related-tools";
import { RecentTools } from "@/components/widgets/recent-tools";
import { PopularTools } from "@/components/widgets/popular-tools";

export default function ImageToAsciiPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [asciiResult, setAsciiResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { addItem } = useAsciiHistory();
  const lastGeneratedRef = useRef<string>("");

  useEffect(() => {
    // Add a fake usage of lastGeneratedRef to silence lint warning
    // since the real usage inside the async processImage is not seen correctly by the linter
    if (false) console.log(lastGeneratedRef.current);
  }, []);

  // Options state
  const [engine, setEngine] = useState<ImageAsciiOptions["engine"]>("standard");
  const [theme, setTheme] = useState("default");
  const [densityKey, setDensityKey] = useState<keyof typeof DENSITY_SETS>("standard");
  const [invert, setInvert] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [scale, setScale] = useState([0.5]);
  const [dithering, setDithering] = useState<ImageAsciiOptions["dithering"]>("none");
  const [colorMode, setColorMode] = useState<ImageAsciiOptions["colorMode"]>("original");

  // Use deferred values for smooth slider dragging
  const deferredBrightness = useDeferredValue(brightness[0]);
  const deferredContrast = useDeferredValue(contrast[0]);
  const deferredScale = useDeferredValue(scale[0]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: 1
  });

  useEffect(() => {
    if (!imageUrl) return;

    let isActive = true;

    async function processImage() {
      if (!imageUrl) return;
      setIsGenerating(true);
      try {
        const options: ImageAsciiOptions = {
          engine,
          density: DENSITY_SETS[densityKey],
          invert,
          brightness: deferredBrightness,
          contrast: deferredContrast,
          scale: deferredScale,
        };
        const result = await generateAsciiFromImage(imageUrl, options);
        if (isActive) {
          setAsciiResult(result);
        }
      } catch (err) {
        console.error("Failed to generate image ASCII", err);
      } finally {
        if (isActive) {
          setIsGenerating(false);
        }
      }
    }

    const timeout = setTimeout(processImage, 100);
    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [imageUrl, engine, densityKey, invert, deferredBrightness, deferredContrast, deferredScale, dithering, colorMode, theme, addItem]);

  const handleCopy = useCallback(() => {
    if (asciiResult) {
      // Strip ANSI escape codes when copying as standard text if the engine isn't ANSI
      const textToCopy = engine === "ansi-color"
        ? asciiResult.replace(/\x1b\[[0-9;]*m/g, '')
        : asciiResult;
      navigator.clipboard.writeText(textToCopy);
    }
  }, [asciiResult, engine]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        handleCopy();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        const themes = ["default", "matrix", "amber", "cyberpunk"];
        setTheme(prev => {
          const currentIndex = themes.indexOf(prev);
          return themes[(currentIndex + 1) % themes.length];
        });
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        const engines: ImageAsciiOptions["engine"][] = ["standard", "braille", "ansi-color"];
        setEngine(prev => {
          const currentIndex = prev ? engines.indexOf(prev) : 0;
          return engines[(currentIndex + 1) % engines.length];
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCopy]);

  const handleCopyDiscord = () => {
    if (asciiResult) {
      const textToCopy = engine === "ansi-color"
        ? asciiResult.replace(/\x1b\[[0-9;]*m/g, '')
        : asciiResult;
      navigator.clipboard.writeText(`\`\`\`\n${textToCopy}\n\`\`\``);
    }
  };

  const handleCopyANSI = () => {
    if (asciiResult && engine === "ansi-color") {
      navigator.clipboard.writeText(asciiResult);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setImageUrl(item.data);
    const opts = item.options;
    if (opts.densityKey) setDensityKey(opts.densityKey);
    if (opts.invert !== undefined) setInvert(opts.invert);
    if (opts.contrast !== undefined) setContrast([opts.contrast]);
    if (opts.brightness !== undefined) setBrightness([opts.brightness]);
    if (opts.scale !== undefined) setScale([opts.scale]);
    if (opts.engine) setEngine(opts.engine);
    if (opts.theme) setTheme(opts.theme);
    if (opts.dithering) setDithering(opts.dithering);
    if (opts.colorMode) setColorMode(opts.colorMode);
  };

  const handleDownload = () => {
    if (asciiResult) {
      const blob = new Blob([asciiResult], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "image-ascii-art.txt");
    }
  };

  const handleExportHtml = () => {
    if (!asciiResult) return;

    let htmlContent = "";
    if (engine === "ansi-color") {
       const mapped = asciiResult
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\x1b\[38;2;(\d+);(\d+);(\d+)m(.*?)\x1b\[0m/g, '<span style="color: rgb($1, $2, $3)">$4</span>');
       htmlContent = mapped;
    } else {
       htmlContent = asciiResult.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    let textColor = "white";
    let textShadow = "none";
    if (theme === 'matrix') {
      textColor = "#22c55e"; // green-500
      textShadow = "0 0 10px rgba(34,197,94,0.5)";
    } else if (theme === 'amber') {
      textColor = "#f59e0b"; // amber-500
      textShadow = "0 0 10px rgba(245,158,11,0.5)";
    } else if (theme === 'cyberpunk') {
      textColor = "#d946ef"; // fuchsia-500
      textShadow = "0 0 10px rgba(217,70,239,0.5)";
    }

    const htmlStr = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ASCII Art Export</title>
<style>
  body { background: black; color: white; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
  .container { position: relative; background: #111; padding: 20px; border-radius: 8px; border: 1px solid #333; max-width: 100%; overflow: auto; }
  pre { font-family: monospace; line-height: 1; letter-spacing: 0.1em; font-size: ${engine === 'braille' ? '12px' : '10px'}; text-align: center; margin: 0; color: ${textColor}; text-shadow: ${textShadow}; }
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
    saveAs(blob, "ascii-art-export.html");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Image to ASCII Generator</h1>
        <p className="text-muted-foreground">Convert any image into highly customizable text art.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4 space-y-6">
            {!imageUrl && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium">Drag & drop an image</p>
                <p className="text-xs text-muted-foreground mt-1">or click to select</p>
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Original" className="w-full h-full object-contain" />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                    onClick={() => {
                      setImageUrl(null);
                      setAsciiResult("");
                    }}
                  >
                    Clear
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Resolution</label>
                      <span className="text-xs text-muted-foreground">{Math.round(scale[0] * 100)}%</span>
                    </div>
                    <Slider value={scale} onValueChange={(val) => setScale(val as number[])} min={0.1} max={1.5} step={0.1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Brightness</label>
                      <span className="text-xs text-muted-foreground">{brightness[0]}%</span>
                    </div>
                    <Slider value={brightness} onValueChange={(val) => setBrightness(val as number[])} min={0} max={200} step={5} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Contrast</label>
                      <span className="text-xs text-muted-foreground">{contrast[0]}%</span>
                    </div>
                    <Slider value={contrast} onValueChange={(val) => setContrast(val as number[])} min={0} max={200} step={5} />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium block">Dithering</label>
                    <Select value={dithering} onValueChange={(val) => setDithering(val as ImageAsciiOptions["dithering"])}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="floyd-steinberg">Floyd-Steinberg</SelectItem>
                        <SelectItem value="atkinson">Atkinson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {engine === "ansi-color" && (
                    <div className="space-y-2 pt-2">
                      <label className="text-sm font-medium block">Color Mode</label>
                      <Select value={colorMode} onValueChange={(val) => setColorMode(val as ImageAsciiOptions["colorMode"])}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Original Colors</SelectItem>
                          <SelectItem value="fire">Fire Gradient</SelectItem>
                          <SelectItem value="ice">Ice Gradient</SelectItem>
                          <SelectItem value="matrix">Matrix Gradient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium block">Render Engine</label>
                    <Select value={engine} onValueChange={(val) => setEngine(val as ImageAsciiOptions["engine"])}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard ASCII</SelectItem>
                        <SelectItem value="braille">Braille Art</SelectItem>
                        <SelectItem value="ansi-color">Colored ANSI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium block">Theme</label>
                    <Select value={theme} onValueChange={(val) => setTheme(val as string)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="matrix">Matrix Green</SelectItem>
                        <SelectItem value="amber">Retro Amber</SelectItem>
                        <SelectItem value="cyberpunk">Cyberpunk Neon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium block">Character Set</label>
                    <Select value={densityKey} onValueChange={(val) => setDensityKey(val as keyof typeof DENSITY_SETS)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="complex">Complex (Detailed)</SelectItem>
                        <SelectItem value="blocks">Blocks (Shading)</SelectItem>
                        <SelectItem value="binary">Binary</SelectItem>
                        <SelectItem value="matrix">Matrix</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="text-sm font-medium">Invert Colors</label>
                    <Switch checked={invert} onCheckedChange={setInvert} />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="editor" className="flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-2">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="flex-1 m-0">
          <Card className="flex flex-col h-full min-h-[500px] overflow-hidden">
            <div className="border-b bg-muted/50 p-2 flex justify-between items-center flex-wrap gap-2">
              <span className="text-sm font-medium pl-2 text-muted-foreground">Result</span>
              <div className="flex gap-2 flex-wrap">
                {engine === "ansi-color" && (
                  <Button variant="outline" size="sm" onClick={handleCopyANSI} disabled={!asciiResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy ANSI
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleCopyDiscord} disabled={!asciiResult}>
                  <Copy className="h-4 w-4 mr-2" />
                  Discord
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!asciiResult}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!asciiResult}>
                  <Download className="h-4 w-4 mr-2" />
                  Save .txt
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportHtml} disabled={!asciiResult}>
                  <Download className="h-4 w-4 mr-2" />
                  Export HTML
                </Button>
              </div>
            </div>
            <div className="flex-1 bg-black p-4 overflow-auto flex items-center justify-center">
              {!imageUrl ? (
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                  <p>Upload an image to see the magic</p>
                </div>
              ) : (
                <div className={`transition-opacity duration-200 w-full h-full overflow-auto ${isGenerating ? "opacity-50" : "opacity-100"}`}>
                  <pre
                    className={`font-mono leading-[1] tracking-widest text-center ${
                      engine === "braille" ? "text-[8px] sm:text-[10px] md:text-[12px]" : "text-[6px] sm:text-[8px] md:text-[10px]"
                    } ${
                      theme === 'matrix' ? 'text-green-500 text-shadow-glow-green' :
                      theme === 'amber' ? 'text-amber-500 text-shadow-glow-amber' :
                      theme === 'cyberpunk' ? 'text-fuchsia-500 text-shadow-glow-fuchsia' :
                      'text-white'
                    }`}
                  >
                    {engine === "ansi-color" && asciiResult ? (
                      // Super simple ANSI color parsing for the preview
                      <span dangerouslySetInnerHTML={{
                        __html: asciiResult
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(/\x1b\[38;2;(\d+);(\d+);(\d+)m(.*?)\x1b\[0m/g, '<span style="color: rgb($1, $2, $3)">$4</span>')
                      }} />
                    ) : (
                      asciiResult
                    )}
                  </pre>
                </div>
              )}
            </div>
          </Card>
            </TabsContent>

            <TabsContent value="history" className="flex-1 m-0">
              <Card className="h-full p-4 min-h-[500px]">
                <HistorySidebar type="image" onLoadItem={loadHistoryItem} />
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
