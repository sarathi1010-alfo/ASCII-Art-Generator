import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, Type, LayoutGrid } from "lucide-react";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildLandingMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildLandingMeta({
  title: "ASCII Art Generator | Turn Text & Images into Art",
  description: "Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.",
  slug: "/",
}), true);

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-4 flex flex-col items-center text-center space-y-8 bg-gradient-to-b from-background to-muted/50">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
          Turn text, images, and ideas into stunning <span className="text-primary">ASCII art</span> instantly.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
          The fastest browser-based ASCII art platform. No software to install, no server delays. Pure client-side generation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/text-to-ascii">
            <Button size="lg" className="w-full sm:w-auto font-bold text-base h-14 px-8">
              Generate ASCII Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/gallery">
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold text-base h-14 px-8">
              Browse Templates
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
              <Type className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Text to ASCII</h3>
            <p className="text-muted-foreground">
              Type any text and instantly convert it into beautiful, large ASCII fonts. Choose from classic styles like Standard, Ghost, and Doom.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
              <ImageIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Image to ASCII</h3>
            <p className="text-muted-foreground">
              Drag and drop any image to transform it into highly customizable text art. Adjust resolution, brightness, and contrast live.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
              <LayoutGrid className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">ASCII Gallery</h3>
            <p className="text-muted-foreground">
              Browse our curated collection of copy-and-paste ASCII art templates perfect for Discord, GitHub Readmes, and social media.
            </p>
          </div>
        </div>
      </section>

      {/* Mini Preview Section */}
      <section className="w-full py-20 px-4 bg-muted/30 flex justify-center">
        <div className="max-w-4xl w-full">
           <pre className="font-mono text-xs md:text-sm leading-tight text-primary p-8 rounded-lg border bg-black/90 overflow-x-auto shadow-2xl">
{`   _____  ________________.___.___    ________
  /  _  \\/   _____/\\_   ___ \\   |   |  /  _____/  ____   ____
 /  /_\\  \\_____  \\ /    \\  \\/   |   | /   \\  ____/ __ \\ /    \\
/    |    \\        \\\\     \\___|   |   | \\    \\_\\  \\  ___/|   |  \\
\\____|__  /_______  / \\______  /___|___|  \\______  /\\___  >___|  /
        \\/        \\/         \\/                  \\/     \\/     \\/ `}
          </pre>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="w-full py-20 px-4 max-w-4xl prose prose-neutral dark:prose-invert text-center">
        <h2>Why use an ASCII Art Generator?</h2>
        <p>
          ASCII art is a classic form of digital expression, using characters to create images and massive text layouts.
          Whether you are looking for an <strong>image to ascii generator</strong> to turn your favorite photo into terminal art,
          or a <strong>text ascii art maker</strong> to craft a bold header for your GitHub profile, our tools are built for speed and privacy.
        </p>
        <p>
          Unlike AI chatbots that struggle with precise spatial layout, our dedicated tools give you
          instant visual iteration, live previews, and robust download options. Best of all, everything runs locally in your browser.
        </p>
        <h2>About ASCII Art</h2>
        <p>
          Curious about how this all works behind the scenes? Learn the history, manual techniques, and modern automated methods in our comprehensive guide on <Link href="/blog/ascii-art-guide">how to create ASCII art from images and text</Link>.
        </p>
      </section>
    </div>
  );
}
