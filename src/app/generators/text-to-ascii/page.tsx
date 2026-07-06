import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Text to ASCII Generator | Free Online Utility",
  description: "Convert your normal text into stunning ASCII art text banner instantly. Free, client-side, and highly customizable with 100+ fonts.",
  slug: "/generators/text-to-ascii",
}));

const faqItems = [
  {
    question: "What is a Text to ASCII Generator?",
    answer: "A Text to ASCII Generator is a tool that takes standard alphabet text and converts it into large, stylized banners made up of smaller ASCII characters using FIGlet fonts."
  },
  {
    question: "How do I use ASCII text banners?",
    answer: "You can copy and paste the generated art into GitHub READMEs, terminal welcome screens, Discord messages, or code comments. Always use monospaced fonts for best results."
  },
  {
    question: "Is this tool free and private?",
    answer: "Yes, our Text to ASCII Generator is 100% free and processes everything locally in your browser, meaning your text never leaves your device."
  },
  {
    question: "Can I use different font styles?",
    answer: "Yes, we offer over 100 different FIGlet fonts, including popular styles like Standard, Slant, Doom, and Ghost."
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
          Convert your text into stunning, stylized ASCII art banners instantly.
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
        <div className="grid gap-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12">How to Use the Text to ASCII Tool</h2>
        <p>Using our generator is simple: enter your text, select a font style (like Standard, Doom, or Ghost), and watch the transformation happen in real-time. You can then copy the output and paste it into any environment that supports plain text.</p>

        <h3>Best Practices for ASCII Banners</h3>
        <ul>
          <li>Keep text short to avoid horizontal scrolling or wrapping.</li>
          <li>Use monospaced fonts (like Courier or Consolas) when viewing the output.</li>
          <li>Wrap your art in code blocks (```) on platforms like GitHub and Discord.</li>
        </ul>
      </div>
    </div>
  );
}
