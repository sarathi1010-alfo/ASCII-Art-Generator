import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Text to ASCII Generator | Free Online Utility",
  description: "Convert your normal text into stunning ASCII art text instantly. Free, client-side, and highly customizable.",
  slug: "/generators/text-to-ascii",
}));

const faqItems = [
  {
    question: "What is a Text to ASCII Generator?",
    answer: "A Text to ASCII Generator is a tool that takes standard alphabet text and converts it into large, stylized banners made up of smaller ASCII characters."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, our Text to ASCII Generator is 100% free and processes everything locally in your browser for maximum privacy."
  }
];

export default function TextToAsciiGeneratorPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Text to ASCII Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert your text into stunning ASCII art instantly.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create?</h2>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Text to ASCII Tool
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