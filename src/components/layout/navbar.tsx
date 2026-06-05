"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold font-mono tracking-tight text-primary">
            ASCII<span className="text-foreground">Gen</span>
          </Link>
          <div className="hidden md:flex gap-4">
            <Link href="/text-to-ascii" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Text to ASCII
            </Link>
            <Link href="/image-to-ascii" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Image to ASCII
            </Link>
            <Link href="/gallery" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Gallery
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
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
