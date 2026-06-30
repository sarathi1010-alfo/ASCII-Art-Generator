import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Terminal ASCII Art | Custom Welcome Screens",
  description: "Generate ASCII art to customize your terminal welcome screen. Perfect for .bashrc or .zshrc files.",
  slug: "/use-cases/terminal-ascii-art",
}));

const faqItems = [
  {
    question: "How do I add ASCII art to my terminal startup?",
    answer: "Generate the text, save it to a file, and use the 'cat' command in your .bashrc or .zshrc file to display it when the terminal opens."
  },
  {
    question: "Can I add color to terminal ASCII art?",
    answer: "Yes, you can use ANSI escape codes to add color to your ASCII art, though you may need a specialized tool or script to apply the colors correctly."
  }
];

export default function TerminalUseCasePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          ASCII Art for Terminals
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Customize your bash or zsh welcome screen with unique text art.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Create Your Welcome Screen</h2>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Text Generator
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