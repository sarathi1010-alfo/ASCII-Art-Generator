import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Scary ASCII Art Templates | Horror & Gothic Styles",
  description: "Create creepy and scary ASCII art banners using our gothic and horror-inspired FIGlet fonts. Perfect for Halloween or dark-themed projects.",
  slug: "/generators/text-to-ascii/templates/scary",
}));

const faqItems = [
  {
    question: "Which ASCII fonts are the scariest?",
    answer: "Fonts like 'Bloody', 'Gothic', and 'Tombstone' are popular choices for creating a scary or dark atmosphere with ASCII art."
  },
  {
    question: "Can I use scary ASCII art on Discord?",
    answer: "Yes, you can paste scary ASCII art into Discord. Using it alongside 'Zalgo' text can enhance the creepy effect."
  },
  {
    question: "How do I make ASCII art look more 'glitchy'?",
    answer: "You can combine scary ASCII banners with our Zalgo text generator to create a distorted, haunting appearance."
  },
  {
    question: "Are these templates free to use?",
    answer: "Yes, all our ASCII templates and generation tools are completely free for personal and commercial use."
  }
];

export default function ScaryTemplatesPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Scary ASCII Art Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unleash the dark side of text art with our horror-themed ASCII templates.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Generate Creepy Text</h2>
        <p className="mb-6 text-muted-foreground">
          Transform your words into haunting designs using our specialized scary fonts.
        </p>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Text to ASCII Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Creating a Haunting Aesthetic</h2>
        <p>Scary ASCII art relies on irregular shapes, sharp angles, and sometimes &quot;dripping&quot; effects. These templates are perfect for Halloween events, horror game documentation, or just adding a touch of the macabre to your terminal.</p>

        <h3>Top Scary Font Picks:</h3>
        <ul>
          <li><strong>Bloody:</strong> Features a dripping, liquid effect on every character.</li>
          <li><strong>Gothic:</strong> A classic, sharp-edged font reminiscent of old horror literature.</li>
          <li><strong>Tombstone:</strong> Heavy, blocky characters that look like they were carved in stone.</li>
        </ul>

        <h2>Tutorial: How to Design a Dark Aesthetic Banner</h2>
        <p>Creating a truly haunting ASCII banner involves more than just picking a font. Here is how to master the dark aesthetic:</p>
        <ol>
          <li><strong>Choose the Right Font:</strong> Use &apos;Bloody&apos; for a visceral look or &apos;Tombstone&apos; for a more monumental, static feel.</li>
          <li><strong>Combine with Zalgo:</strong> For extra creepiness, use our <Link href="/zalgo-text-generator">Zalgo text generator</Link> to add &quot;glitch&quot; artifacts to the text before or after conversion.</li>
          <li><strong>Maximize Contrast:</strong> If you&apos;re converting an image of something scary, ensure you use the high-contrast character set to keep the details sharp.</li>
          <li><strong>Proper Formatting:</strong> Dark mode is best for horror art. Ensure your target platform (like Discord) is set to dark mode to make the characters pop against the background.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <div className="grid gap-6">
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
