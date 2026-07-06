import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Discord ASCII Art | Copy and Paste Guide",
  description: "Create and format ASCII art perfectly for Discord chats. Avoid broken formatting with our specialized tools and best practices.",
  slug: "/use-cases/discord-ascii-art",
}));

const faqItems = [
  {
    question: "How do I prevent ASCII art from breaking in Discord?",
    answer: "Always wrap your ASCII art in triple backticks (```) when pasting it into Discord. This creates a code block that preserves monospaced alignment."
  },
  {
    question: "Can I use ASCII art on mobile Discord?",
    answer: "Yes, but mobile screens are much narrower. It is best to use smaller ASCII designs to prevent text-wrapping on mobile devices."
  },
  {
    question: "Why does my ASCII art look shifted in Discord?",
    answer: "This usually happens because a proportional font is being used instead of a monospaced one. Triple backticks are the solution."
  },
  {
    question: "Is there a character limit on Discord?",
    answer: "Yes, standard Discord messages are limited to 2,000 characters. Large ASCII art might need to be split into multiple messages."
  }
];

export default function DiscordUseCasePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          ASCII Art for Discord
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create perfectly formatted text art for your Discord servers and communities.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Generating</h2>
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

        <h2 className="mt-12">Discord Formatting Secrets</h2>
        <p>Discord is a hub for ASCII culture, from small emoticons to massive multi-line banners. However, Discord&apos;s default text rendering can easily ruin the alignment of your art. To ensure your creations look exactly as intended, you must master Discord&apos;s Markdown support.</p>

        <h3>The Golden Rule: Code Blocks</h3>
        <p>Before you paste your ASCII art, type three backticks (```) on their own line. Paste your art, then add another three backticks on the following line. This forces Discord to use its monospaced font, where every character has the exact same width.</p>

        <h3>Mobile Considerations</h3>
        <p>Because Discord is heavily used on mobile, remember that vertical art is usually safer than wide horizontal art. If your ASCII banner is too wide, it will wrap on small screens, creating a jumbled mess of characters for mobile users.</p>
      </div>
    </div>
  );
}
