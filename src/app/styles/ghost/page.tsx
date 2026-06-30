import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Ghost ASCII Style | Text Generator",
  description: "Generate soft, bubbly text using the Ghost ASCII font style. Great for a distinct, rounded look.",
  slug: "/styles/ghost",
}));

const faqItems = [
  {
    question: "What is the Ghost ASCII style?",
    answer: "The Ghost style features rounded, bubble-like characters that give the text a soft, eerie, yet playful appearance."
  },
  {
    question: "Is the Ghost style readable?",
    answer: "Yes, despite its stylized nature, Ghost is designed to remain legible even at smaller text sizes."
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
          Soft, bubbly ASCII text generation.
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
        {faqItems.map((faq, index) => (
          <div key={index} className="mb-4">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}