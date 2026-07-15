import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Free Cool Templates | Text To Ascii",
  description: "Browse our collection of free Cool templates and use our Text To Ascii to customize them instantly. High-impact designs for profiles and banners.",
  slug: "/text-to-ascii/templates/cool",
}));

const faqItems = [
  {
    question: "What makes an ASCII template 'cool'?",
    answer: "Cool templates often use stylized fonts like 'Doom' or 'Slant' and incorporate decorative borders or character-based shading to create a high-impact visual effect."
  },
  {
    question: "Can I customize these templates?",
    answer: "Absolutely! You can use our Text To Ascii tool to change the text, font, and layout of any template to fit your specific needs."
  },
  {
    question: "Where can I use cool ASCII art?",
    answer: "These designs are perfect for GitHub profile READMEs, Discord community banners, and terminal start screens."
  },
  {
    question: "Are these templates free to use?",
    answer: "Yes, all templates on ASCII Forge are 100% free for both personal and commercial projects."
  }
];

export default function TemplatePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          Cool Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with one of our free Cool templates and customize it using the Text To Ascii.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Customizing</h2>
        <p className="mb-6 text-muted-foreground">
          Bring your ideas to life. Open the tool to get started.
        </p>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Text To Ascii Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <JsonLd schema={buildFaqSchema(faqItems)} />
        <h2>About These Templates</h2>
        <p>
          Our Cool templates are designed to give you a head start. Combine them with the raw power of our client-side generator to produce stunning results in seconds. Whether you&apos;re looking for a retro hacker aesthetic or a modern, clean look, these templates provide the perfect foundation.
        </p>

        <h2>How to Use Cool Templates for Your Projects</h2>
        <p>
          Using cool templates effectively involves matching the visual weight of the ASCII characters with your brand or project identity. For a high-impact developer profile, we recommend starting with the &quot;Slant&quot; or &quot;Doom&quot; fonts, which provide a dynamic sense of motion and presence.
        </p>
        <ol>
          <li>Browse the list of available cool designs below.</li>
          <li>Click on a design to load it into the <strong><Link href="/text-to-ascii">Text To Ascii</Link></strong> tool.</li>
          <li>Modify the text and experiment with different font styles to see which fits your aesthetic.</li>
          <li>Fine-tune the character density if the font supports it.</li>
          <li>Copy the final result and paste it into your GitHub README or terminal welcome message.</li>
        </ol>

        <h2>Why These Designs Stand Out</h2>
        <p>
          A &quot;cool&quot; ASCII design isn&apos;t just about the font; it&apos;s about the spatial composition. By using templates that incorporate negative space and varied character densities (like using dots for shading and slashes for hard edges), you create a sophisticated look that transcends basic text banners.
        </p>

        <h2>Frequently Asked Questions</h2>
        <div className="grid gap-6 mt-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
