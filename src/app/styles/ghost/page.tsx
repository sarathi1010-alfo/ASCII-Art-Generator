import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Ghost ASCII Style | Eerie Bubble Text",
  description: "Generate soft, bubbly text using the Ghost ASCII font style. Perfect for a distinct, rounded, and playful aesthetic.",
  slug: "/styles/ghost",
}));

const faqItems = [
  {
    question: "What is the Ghost ASCII style?",
    answer: "The Ghost style features rounded, bubble-like characters that give the text a soft, eerie, yet playful appearance. It is a more stylized alternative to blockier fonts."
  },
  {
    question: "Is the Ghost style readable?",
    answer: "Yes, despite its stylized bubble-like nature, the Ghost font is designed to remain legible even at moderate text sizes."
  },
  {
    question: "Where is the Ghost style most popular?",
    answer: "It is frequently used in community forums, Discord servers, and casual project READMEs to add a touch of personality and fun."
  },
  {
    question: "How tall is the Ghost font?",
    answer: "The Ghost FIGlet font is typically 7 characters high, making it a medium-sized font that balances visibility with vertical efficiency."
  }
];

export default function GhostStylePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Ghost ASCII Style
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Soft, bubbly, and playful ASCII text generation.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Try the Ghost Style</h2>
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

        <h2 className="mt-12">The Playful Aesthetic of Ghost</h2>
        <p>Not all ASCII art needs to be blocky or aggressive. The Ghost style offers a refreshing change of pace with its rounded, friendly characters. It&apos;s perfect for projects that want to appear approachable and creative without relying on the &quot;hacker&quot; aesthetic typically associated with text art.</p>

        <h3>Why Choose Ghost?</h3>
        <ul>
          <li><strong>Unique Texture:</strong> The bubble-like design provides a visual texture that stands out from standard fonts.</li>
          <li><strong>Creative Flair:</strong> Adds a whimsical touch to any text-based communication.</li>
          <li><strong>Good Contrast:</strong> The thick, rounded strokes ensure the text remains visible even against busy backgrounds.</li>
        </ul>
      </div>
    </div>
  );
}
