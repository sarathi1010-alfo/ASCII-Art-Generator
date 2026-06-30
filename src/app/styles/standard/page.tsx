import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Standard ASCII Style | Text Generator",
  description: "Generate text using the classic Standard ASCII font style. Clean, readable, and perfect for any occasion.",
  slug: "/styles/standard",
}));

const faqItems = [
  {
    question: "What is the Standard ASCII style?",
    answer: "The Standard style is one of the oldest and most widely used FIGlet fonts. It is highly readable and blocky."
  },
  {
    question: "Where should I use the Standard style?",
    answer: "Because of its legibility, it is perfect for code comments, README headers, and terminal welcome messages."
  }
];

export default function StandardStylePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Standard ASCII Style
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The classic, readable ASCII font style.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Try the Standard Style</h2>
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