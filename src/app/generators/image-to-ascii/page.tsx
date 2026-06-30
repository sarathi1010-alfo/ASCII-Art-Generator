import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Image to ASCII Generator | Free Online Utility",
  description: "Convert your images and photos into stunning ASCII art instantly. Adjust resolution and contrast.",
  slug: "/generators/image-to-ascii",
}));

const faqItems = [
  {
    question: "How does the Image to ASCII Generator work?",
    answer: "It analyzes the pixels in your uploaded image and assigns an ASCII character to each block based on its brightness level."
  },
  {
    question: "Are my photos uploaded to a server?",
    answer: "No, our Image to ASCII Generator runs entirely client-side in your browser. Your images are never uploaded or stored."
  }
];

export default function ImageToAsciiGeneratorPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Image to ASCII Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your photos into intricate text-based art instantly.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create?</h2>
        <Link href="/image-to-ascii">
          <Button size="lg" className="font-bold">
            Open Image to ASCII Tool
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