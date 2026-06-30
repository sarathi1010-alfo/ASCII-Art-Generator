import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Doom ASCII Style | Text Generator",
  description: "Generate bold, massive text using the Doom ASCII font style. Perfect for aggressive headers.",
  slug: "/styles/doom",
}));

const faqItems = [
  {
    question: "What is the Doom ASCII style?",
    answer: "The Doom style is a large, imposing FIGlet font characterized by bold, blocky letters and a slight 3D perspective, inspired by classic video games."
  },
  {
    question: "When should I use the Doom style?",
    answer: "It is ideal for massive headers where you want to make a strong impact and have plenty of vertical and horizontal space."
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
          Massive, aggressive ASCII text generation.
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