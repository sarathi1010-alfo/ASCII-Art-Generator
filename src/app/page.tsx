import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, Type, LayoutGrid, HelpCircle, Sparkles } from "lucide-react";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildLandingMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildLandingMeta({
  title: "ASCII Art Generator | Image & Text to ASCII Art - ASCIIForge",
  description: "Convert images and text to stunning ASCII art instantly. Free browser-based ASCII art generator with customizable fonts, density, and one-click copy.",
  slug: "/",
}), true);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ASCIIForge ASCII Art Generator",
    "url": "https://asciiforge.alfo.online/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert images and text to stunning ASCII art instantly with customizable fonts and density."
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://asciiforge.alfo.online/"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Generate ASCII Art from Text or Images",
    "description": "Step-by-step guide to generating ASCII art online with ASCIIForge.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Input Text or Image",
        "text": "Type your custom text string or drop an image file (PNG, JPG, SVG)."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select Font or Density",
        "text": "Choose from classic FIGlet fonts for text or adjust character density and contrast for images."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Adjust Width & Inversion",
        "text": "Tune output character width and toggle dark or light contrast modes to optimize legibility."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Copy or Download",
        "text": "Copy formatted ASCII directly to your clipboard or download as text or HTML banner."
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert an image into ASCII art?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload any PNG, JPG, or WebP image to ASCIIForge. The tool samples pixel luminance values and maps them to ASCII characters ordered by visual density in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use ASCIIForge art in GitHub README files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ASCIIForge generates monospaced text wrapped in markdown code blocks, making it 100% compatible with GitHub READMEs, terminal outputs, and code comments."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between text banner and image ASCII generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Text banner generation uses FIGlet typography algorithms to build large letterforms out of characters, while image conversion calculates grayscale pixel values to render photographic silhouettes."
        }
      },
      {
        "@type": "Question",
        "name": "Is ASCIIForge free and usable offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ASCIIForge is completely free, requires no login, and runs client-side in your browser via Web Workers for instant offline-capable generation."
        }
      },
      {
        "@type": "Question",
        "name": "How do I preserve formatting when pasting ASCII art into Discord or Slack?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wrap your copied ASCII art in triple backticks (code block format) to ensure monospaced font alignment and prevent proportional font distortion."
        }
      }
    ]
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="w-full py-16 md:py-28 px-4 flex flex-col items-center text-center space-y-8 bg-gradient-to-b from-background to-muted/50">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Fast Browser-Based Text & Image Art Generator</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground">
          Convert Images and Text to ASCII Art Instantly
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Convert any image or text snippet into beautifully styled ASCII art directly in your browser. ASCIIForge delivers fast client-side rendering with multiple character density ramps, FIGlet font typography, inverted contrasts, and one-click clipboard copying. Perfect for README files, terminal banners, Discord posts, and creative retro styling.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center">
          <Link href="/text-to-ascii" className="w-full sm:w-auto">
            <Button size="lg" role="button" className="btn w-full sm:w-auto font-bold text-base h-14 px-8 min-h-[44px] min-w-[44px]">
              Generate ASCII Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/gallery" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" role="button" className="btn w-full sm:w-auto font-bold text-base h-14 px-8 min-h-[44px] min-w-[44px]">
              Browse Templates
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl border bg-card">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
              <Type className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Text to ASCII</h3>
            <p className="text-muted-foreground text-sm">
              Type any text and instantly convert it into beautiful, large ASCII fonts. Choose from classic styles like Standard, Ghost, and Doom.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl border bg-card">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
              <ImageIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Image to ASCII</h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop any image to transform it into highly customizable text art. Adjust resolution, brightness, and contrast live.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-2xl border bg-card">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
              <LayoutGrid className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">ASCII Gallery</h3>
            <p className="text-muted-foreground text-sm">
              Browse our curated collection of copy-and-paste ASCII art templates perfect for Discord, GitHub Readmes, and social media.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 px-4 bg-muted/40 flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow four easy steps to generate, style, and copy high-density ASCII text and image artwork.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border bg-card flex flex-col">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Input Text or Image</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Type your custom text string or drop an image file (PNG, JPG, SVG).
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card flex flex-col">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Select Font or Density</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Choose from classic FIGlet fonts for text or adjust character density and contrast for images.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card flex flex-col">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Adjust Width & Inversion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tune output character width and toggle dark or light contrast modes to optimize legibility.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card flex flex-col">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-bold text-lg mb-2">Copy or Download</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Copy formatted ASCII directly to your clipboard or download as text or HTML banner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Preview Section */}
      <section className="w-full py-16 px-4 bg-background flex justify-center">
        <div className="max-w-4xl w-full">
          <pre className="font-mono text-xs md:text-sm leading-tight text-primary p-6 md:p-8 rounded-2xl border bg-black/90 overflow-x-auto shadow-2xl">
{`   _____  ________________.___.___    ________
  /  _  \\/   _____/\\_   ___ \\   |   |  /  _____/  ____   ____
 /  /_\\  \\_____  \\ /    \\  \\/   |   | /   \\  ____/ __ \\ /    \\
/    |    \\        \\\\     \\___|   |   | \\    \\_\\  \\  ___/|   |  \\
\\____|__  /_______  / \\______  /___|___|  \\______  /\\___  >___|  /
        \\/        \\/         \\/                  \\/     \\/     \\/ `}
          </pre>
        </div>
      </section>

      {/* FAQ Section (AEO/GEO DOM Accordion) */}
      <section id="faq" className="w-full py-16 px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-primary" />
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about generating ASCII art with ASCIIForge.
          </p>
        </div>

        <div className="space-y-4">
          <details className="group border rounded-2xl p-6 bg-card transition-all">
            <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center min-h-[44px]">
              <span>How do I convert an image into ASCII art?</span>
              <span className="transition group-open:rotate-180 text-primary font-bold text-xl ml-4">↓</span>
            </summary>
            <p className="text-muted-foreground mt-4 leading-relaxed text-sm sm:text-base border-t pt-4">
              Upload any PNG, JPG, or WebP image to ASCIIForge. The tool samples pixel luminance values and maps them to ASCII characters ordered by visual density in real-time.
            </p>
          </details>

          <details className="group border rounded-2xl p-6 bg-card transition-all">
            <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center min-h-[44px]">
              <span>Can I use ASCIIForge art in GitHub README files?</span>
              <span className="transition group-open:rotate-180 text-primary font-bold text-xl ml-4">↓</span>
            </summary>
            <p className="text-muted-foreground mt-4 leading-relaxed text-sm sm:text-base border-t pt-4">
              Yes, ASCIIForge generates monospaced text wrapped in markdown code blocks, making it 100% compatible with GitHub READMEs, terminal outputs, and code comments.
            </p>
          </details>

          <details className="group border rounded-2xl p-6 bg-card transition-all">
            <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center min-h-[44px]">
              <span>What is the difference between text banner and image ASCII generation?</span>
              <span className="transition group-open:rotate-180 text-primary font-bold text-xl ml-4">↓</span>
            </summary>
            <p className="text-muted-foreground mt-4 leading-relaxed text-sm sm:text-base border-t pt-4">
              Text banner generation uses FIGlet typography algorithms to build large letterforms out of characters, while image conversion calculates grayscale pixel values to render photographic silhouettes.
            </p>
          </details>

          <details className="group border rounded-2xl p-6 bg-card transition-all">
            <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center min-h-[44px]">
              <span>Is ASCIIForge free and usable offline?</span>
              <span className="transition group-open:rotate-180 text-primary font-bold text-xl ml-4">↓</span>
            </summary>
            <p className="text-muted-foreground mt-4 leading-relaxed text-sm sm:text-base border-t pt-4">
              ASCIIForge is completely free, requires no login, and runs client-side in your browser via Web Workers for instant offline-capable generation.
            </p>
          </details>

          <details className="group border rounded-2xl p-6 bg-card transition-all">
            <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center min-h-[44px]">
              <span>How do I preserve formatting when pasting ASCII art into Discord or Slack?</span>
              <span className="transition group-open:rotate-180 text-primary font-bold text-xl ml-4">↓</span>
            </summary>
            <p className="text-muted-foreground mt-4 leading-relaxed text-sm sm:text-base border-t pt-4">
              Wrap your copied ASCII art in triple backticks (code block format) to ensure monospaced font alignment and prevent proportional font distortion.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
