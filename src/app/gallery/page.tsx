"use client";

import { useState } from "react";
import templatesData from "@/data/templates.json";
import categoriesData from "@/data/categories.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Search } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function GalleryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = templatesData.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(search.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "all" || template.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">ASCII Art Gallery</h1>
        <p className="text-muted-foreground">Discover, copy, and share popular ASCII art creations. Want to learn how to make your own? Check out our guide on <Link href="/blog/ascii-art-guide" className="underline">how to create ASCII art from images and text</Link>.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates, tags..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2 p-1">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className="rounded-full"
            >
              All
            </Button>
            {categoriesData.map((category) => (
              <Button
                key={category.slug}
                variant={activeCategory === category.slug ? "default" : "outline"}
                onClick={() => setActiveCategory(category.slug)}
                className="rounded-full"
              >
                {category.title}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="flex flex-col overflow-hidden group">
            <div className="p-4 flex justify-between items-center border-b bg-muted/30">
              <h3 className="font-semibold text-sm truncate pr-2">{template.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(template.id, template.content)}
              >
                {copiedId === template.id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex-1 p-4 bg-black/5 dark:bg-black/40 overflow-auto min-h-[150px] flex items-center justify-center">
              <pre className="font-mono text-[10px] leading-tight text-foreground">
                {template.content}
              </pre>
            </div>
            <div className="p-3 border-t bg-muted/30 flex gap-2 overflow-x-auto no-scrollbar">
              {template.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                  #{tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p>No ASCII art found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
