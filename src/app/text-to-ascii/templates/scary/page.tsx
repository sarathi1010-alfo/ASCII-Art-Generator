import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Free Scary Templates | Text To Ascii",
  description: "Browse our collection of free Scary templates and use our Text To Ascii to customize them instantly. Create eerie designs for Halloween or gaming.",
  slug: "/text-to-ascii/templates/scary",
}));

const faqItems = [
  {
    question: "Which fonts are best for scary ASCII art?",
    answer: "The 'Ghost' and 'Doom' fonts are excellent choices for creating a scary or eerie atmosphere. 'Ghost' offers a bubbly, slightly distorted look, while 'Doom' provides massive, imposing characters."
  },
  {
    question: "Can I use these for Halloween projects?",
    answer: "Yes, these templates are ideal for Halloween-themed websites, social media posts, and community events."
  },
  {
    question: "How do I make the text look more distorted?",
    answer: "You can try using the 'Zalgo' generator for extreme distortion or combine 'Ghost' font with custom spacing and rare characters."
  },
  {
    question: "Do these work in Discord?",
    answer: "Yes, when wrapped in triple backticks (\`\`\`), these scary ASCII designs will render perfectly in Discord chats."
  }
];

export default function TemplatePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          Scary Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with one of our free Scary templates and customize it using the Text To Ascii.
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
          Our Scary templates are designed to give you a head start. Combine them with the raw power of our client-side generator to produce stunning results in seconds. Create hauntingly beautiful text art for your gaming profiles, horror-themed projects, or seasonal events.
        </p>

        <h2>How to Create Scary ASCII Art Effects</h2>
        <p>
          The secret to truly scary ASCII art lies in distortion and unconventional character choices. While fonts like &quot;Ghost&quot; provide a great baseline, you can enhance the effect by mixing in &quot;Zalgo&quot; text elements or using symbols like &apos;†&apos;, &apos;‡&apos;, and &apos;☠&apos; within your manual edits.
        </p>
        <ol>
          <li>Choose a template that matches the vibe of your project (e.g., graveyard themes or glitch aesthetics).</li>
          <li>Load it into the <strong><Link href="/text-to-ascii">Text To Ascii</Link></strong> tool.</li>
          <li>Experiment with the &apos;Ghost&apos; or &apos;Doom&apos; fonts—the former for an eerie floaty feel, the latter for a heavy, oppressive look.</li>
          <li>Use the &quot;Zalgo&quot; intensity slider if available to add chaotic vertical artifacts to your text.</li>
          <li>Copy and share your haunting creation with your community!</li>
        </ol>

        <h2>Advanced Customization Tutorial</h2>
        <p>
          To make your scary ASCII text stand out even more, you can manually combine these elements with Zalgo text (glitch text) to create a truly unsettling, corrupted feel. Generate your base header here, and then sprinkle in corrupted characters.
        </p>
        <p>
          Furthermore, try using a dark background color in your terminal or Discord server to maximize the contrast of the scary ASCII text. If you want to learn more about how text graphics work, you should check out our <Link href="/blog/ascii-art-guide">ultimate guide to creating ASCII art</Link>.
        </p>

        <h2>When to Use Eerie Designs</h2>
        <p>
          These templates aren&apos;t just for Halloween. They are perfect for dark-themed portfolio sites, horror game development documentation, and creating a unique atmosphere in private Discord servers or dark-web style terminal interfaces.
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
