import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Standard ASCII Style | Clean Text Generator",
  description: "Generate text using the classic Standard ASCII font style. Clean, highly readable, and perfect for professional documentation.",
  slug: "/styles/standard",
}));

const faqItems = [
  {
    question: "What is the Standard ASCII style?",
    answer: "The Standard style is the original and most widely used FIGlet font. It is characterized by its clean, blocky, and highly legible appearance."
  },
  {
    question: "Where should I use the Standard style?",
    answer: "Because of its exceptional readability, it is the perfect choice for code headers, README files, and terminal welcome messages."
  },
  {
    question: "Does the Standard style support special characters?",
    answer: "Yes, the Standard FIGlet font supports a wide range of alphanumeric and special characters found on most keyboards."
  },
  {
    question: "Is Standard better than Doom?",
    answer: "It depends on your needs. Standard is more readable and compact, making it better for documentation, while Doom is better for large, high-impact headers."
  }
];

export default function StandardStylePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Standard ASCII Art Style – Clean, Classic, Versatile
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The timeless, highly readable classic ASCII font.
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
        <div className="grid gap-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12">Why Choose the Standard Style?</h2>
        <p>In the world of ASCII art, clarity is often just as important as creativity. The Standard style strikes the perfect balance, providing a stylized look that doesn&apos;t sacrifice legibility. It&apos;s the &quot;Helvetica&quot; of FIGlet fonts—reliable, professional, and universally understood.</p>

        <h3>Key Features:</h3>
        <ul>
          <li><strong>High Legibility:</strong> Even at smaller resolutions, the characters remain distinct.</li>
          <li><strong>Universal Compatibility:</strong> Works perfectly across all terminals and text editors.</li>
          <li><strong>Professional Look:</strong> Ideal for documentation and formal project headers.</li>
        </ul>
      </div>
    </div>
  );
}
