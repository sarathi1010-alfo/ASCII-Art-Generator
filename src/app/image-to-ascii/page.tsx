"use client";

import { useState, useEffect, useCallback, useDeferredValue } from "react";
import { generateAsciiFromImage, DENSITY_SETS, ImageAsciiOptions } from "@/lib/ascii/image-generator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Upload, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import { Switch } from "@/components/ui/switch";

export default function ImageToAsciiPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [asciiResult, setAsciiResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Options state
  const [densityKey, setDensityKey] = useState<keyof typeof DENSITY_SETS>("standard");
  const [invert, setInvert] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [scale, setScale] = useState([0.5]);

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
  }, [imageUrl, densityKey, invert, deferredBrightness, deferredContrast, deferredScale]);

  const handleCopy = () => {
    if (asciiResult) {
      navigator.clipboard.writeText(asciiResult);
    }
  };

  const handleDownload = () => {
    if (asciiResult) {
      const blob = new Blob([asciiResult], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "image-ascii-art.txt");
    }
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
          <Card className="flex flex-col h-full min-h-[500px] overflow-hidden">
            <div className="border-b bg-muted/50 p-2 flex justify-between items-center">
              <span className="text-sm font-medium pl-2 text-muted-foreground">Result</span>
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
            <div className="flex-1 bg-black/5 dark:bg-black/40 p-4 overflow-auto flex items-center justify-center">
              {!imageUrl ? (
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                  <p>Upload an image to see the magic</p>
                </div>
              ) : (
                <div className={`transition-opacity duration-200 w-full h-full overflow-auto ${isGenerating ? "opacity-50" : "opacity-100"}`}>
                   <pre className="font-mono text-[6px] sm:text-[8px] md:text-[10px] leading-[1] tracking-widest text-foreground text-center">
                    {asciiResult}
                  </pre>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
