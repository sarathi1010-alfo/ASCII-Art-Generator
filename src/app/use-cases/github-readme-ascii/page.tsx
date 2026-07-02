import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "GitHub README ASCII Art | Profile Customization Guide",
  description: "Enhance your GitHub profile and project READMEs with custom ASCII art headers, banners, and icons. Stand out in the developer community.",
  slug: "/use-cases/github-readme-ascii",
}));

const faqItems = [
  {
    question: "How do I add ASCII art to my GitHub README?",
    answer: "Generate your ASCII art, then paste it inside a Markdown code block (using triple backticks) or an HTML <pre> tag in your README.md file."
  },
  {
    question: "Will ASCII art look good on dark and light mode?",
    answer: "Yes, standard text-based ASCII inside a code block will adapt to both light and dark themes on GitHub automatically."
  },
  {
    question: "Can I use color in my GitHub ASCII art?",
    answer: "Standard GitHub Markdown does not support ANSI colors. However, you can use HTML <span> tags with style attributes if you want to add color manually, though this is much more complex."
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
          Make your repositories and developer profile stand out with unique text-based branding.
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
        <div className="grid gap-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12">Branding Your GitHub Profile</h2>
        <p>In the developer world, your GitHub profile is your digital resume. Adding a custom ASCII art header to your personal README or your most popular project is an excellent way to show attention to detail and a touch of technical creativity. It provides a unique visual identity that standard fonts simply can&apos;t match.</p>

        <h3>Placement Tips:</h3>
        <ul>
          <li><strong>Hero Banners:</strong> Place a large ASCII art title at the very top of your README for maximum impact.</li>
          <li><strong>Section Dividers:</strong> Use smaller ASCII patterns to separate different parts of your documentation.</li>
          <li><strong>Project Logos:</strong> Convert your project&apos;s logo into ASCII art to keep your documentation lightweight and fast-loading.</li>
        </ul>
      </div>
    </div>
  );
}
