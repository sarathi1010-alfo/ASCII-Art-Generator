import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Discord ASCII Art | Copy and Paste Tool",
  description: "Create and format ASCII art perfectly for Discord chats. Avoid broken formatting with our specialized tools.",
  slug: "/use-cases/discord-ascii-art",
}));

const faqItems = [
  {
    question: "How do I prevent ASCII art from breaking in Discord?",
    answer: "Always wrap your ASCII art in triple backticks (```) when pasting it into Discord. This tells Discord to format it as a code block and preserve the monospaced spacing."
  },
  {
    question: "Can I use ASCII art on mobile Discord?",
    answer: "Yes, but be aware that mobile screens are narrower. Large ASCII art may wrap and distort, so it's best to use smaller designs for mobile users."
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
          Create perfectly formatted text art for your Discord servers.
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