import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Doom ASCII Style | Bold Text Generator",
  description: "Generate massive, aggressive text using the Doom ASCII font style. Perfect for high-impact headers and gaming profiles.",
  slug: "/styles/doom",
}));

const faqItems = [
  {
    question: "What is the Doom ASCII style?",
    answer: "The Doom style is a large, imposing FIGlet font inspired by the typography of classic 90s video games. It features bold, blocky letters with a slight 3D perspective."
  },
  {
    question: "When should I use the Doom style?",
    answer: "It is ideal for massive headers where you want to make a strong impact and have plenty of vertical and horizontal space to accommodate the large character sizes."
  },
  {
    question: "Does the Doom font support lowercase letters?",
    answer: "Most implementations of the Doom FIGlet font focus on uppercase characters for maximum impact, though some variations may include lowercase glyphs."
  },
  {
    question: "How wide is the Doom ASCII font?",
    answer: "Doom is a very wide font. A single word can easily exceed 80 or even 100 characters in width, so it is best used in environments with plenty of horizontal space."
  }
];

export default function DoomStylePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Doom ASCII Style
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Bold, aggressive, and massive ASCII text generation.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Try the Doom Style</h2>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Generator
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12">The Power of the Doom Style</h2>
        <p>If you need your text art to command attention, look no further than the Doom style. This font is designed to be loud. Its thick strokes and slight 3D slant make it pop off the page, providing a sense of power and nostalgia that few other ASCII fonts can match.</p>

        <h3>Ideal Use Cases:</h3>
        <ul>
          <li><strong>Gaming Profiles:</strong> Perfect for Discord or Steam bio headers.</li>
          <li><strong>Large Banners:</strong> Use it at the top of terminal applications for a &quot;pro&quot; look.</li>
          <li><strong>Retro Projects:</strong> Adds an authentic 90s computing vibe to any project.</li>
        </ul>
      </div>
    </div>
  );
}
