import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "GitHub README ASCII Art | Profile Customization",
  description: "Enhance your GitHub profile and project READMEs with custom ASCII art headers and banners.",
  slug: "/use-cases/github-readme-ascii",
}));

const faqItems = [
  {
    question: "How do I add ASCII art to my GitHub README?",
    answer: "Generate your ASCII art, then paste it inside a Markdown code block (using triple backticks) in your README.md file."
  },
  {
    question: "Will ASCII art look good on dark and light mode?",
    answer: "Yes, as long as it is standard text-based ASCII inside a code block, GitHub handles the contrast for both light and dark themes automatically."
  }
];

export default function GitHubUseCasePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          ASCII Art for GitHub READMEs
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Make your developer profile stand out with custom text banners.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Create Your Banner</h2>
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