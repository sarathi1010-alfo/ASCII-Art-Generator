"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-14 items-center px-4 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold font-mono tracking-tight text-primary flex items-center gap-2">
            ASCII<span className="text-foreground">Gen</span>
          </Link>
          <div className="hidden md:flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                  Related Tools <ChevronDown className="h-4 w-4" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <a href="https://qrgenerator.alfo.online" target="_blank" rel="noopener noreferrer">QR Generator</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="https://resumeforge.alfo.online" target="_blank" rel="noopener noreferrer">Resume Forge</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="https://paletteflow.alfo.online" target="_blank" rel="noopener noreferrer">Palette Flow</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="https://pdfutility.app" target="_blank" rel="noopener noreferrer">PDF Utility</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="https://hub.alfo.online" target="_blank" rel="noopener noreferrer" className="font-bold text-primary">All Tools Hub</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/text-to-ascii" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Text to ASCII
            </Link>
            <Link href="/image-to-ascii" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Image to ASCII
            </Link>
            <Link href="/gallery" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Gallery
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://alfo.online" target="_blank" rel="noopener noreferrer" className="hidden md:block text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            Powered by alfo.online
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
