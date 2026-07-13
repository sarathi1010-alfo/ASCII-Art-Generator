import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Discord Image to ASCII Guide | Templates & Tips",
  description: "Learn how to convert images to ASCII art specifically for Discord. Includes templates, best practices for resolution, and formatting tricks.",
  slug: "/generators/image-to-ascii/templates/discord",
}));

const faqItems = [
  {
    question: "What resolution is best for Discord ASCII art?",
    answer: "For Discord, a width of 30-40 characters is ideal to prevent line-wrapping on most desktop and mobile screens."
  },
  {
    question: "How do I preserve colors on Discord?",
    answer: "Standard Discord messages don't support colored text art. To preserve colors, you must export your ASCII art as an image or use our HTML export for web viewing."
  },
  {
    question: "Why does my image look like a mess in Discord chat?",
    answer: "This is usually due to the image being too complex or the resolution being too high. Try increasing the contrast and lowering the resolution to 35 characters wide."
  },
  {
    question: "Which rendering engine should I use for Discord?",
    answer: "The 'Standard' or 'Braille' engines work best. Braille allows for more detail within the 2,000 character limit of a Discord message."
  }
];

export default function DiscordImageTemplatesPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Discord Image to ASCII Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The ultimate guide to sharing image-based text art on Discord without breaking the layout.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Convert Your Image Now</h2>
        <p className="mb-6 text-muted-foreground">
          Upload any photo and optimize it specifically for Discord with our specialized tool.
        </p>
        <Link href="/image-to-ascii">
          <Button size="lg" className="font-bold">
            Open Image to ASCII Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Discord Optimization Best Practices</h2>
        <p>Discord presents unique challenges for ASCII art due to its character limits and varying screen widths. Following these templates ensures your art looks great for everyone in your server.</p>

        <h3>The &quot;Sweet Spot&quot; Settings for Discord:</h3>
        <ul>
          <li><strong>Resolution:</strong> Set to roughly 35-45 characters wide.</li>
          <li><strong>Contrast:</strong> Boost to 120-140% to make edges pop.</li>
          <li><strong>Characters:</strong> Use a high-contrast set or the Braille engine for maximum detail.</li>
        </ul>

        <h2>Tutorial: Converting Images for Discord Chat</h2>
        <p>Sharing image-based ASCII art on Discord requires a few specific steps to avoid the common &quot;wrapping mess&quot; on mobile:</p>
        <ol>
          <li><strong>Upload Your Image:</strong> Go to the <Link href="/image-to-ascii">Image to ASCII tool</Link>.</li>
          <li><strong>Limit Width:</strong> Set the width slider to no more than 40 characters. This ensures the art fits on mobile screens without wrapping.</li>
          <li><strong>Adjust for Detail:</strong> If the art looks too blocky, try the &apos;Braille&apos; rendering engine. It uses 8 dots per character space to provide much higher resolution within the same footprint.</li>
          <li><strong>Copy to Discord:</strong> Use the copy button, then in Discord, type ``` then Shift+Enter, paste your art, then another ```.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
