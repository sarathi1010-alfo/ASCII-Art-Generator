import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Terminal ASCII Art | Custom Welcome Screens Guide",
  description: "Generate ASCII art to customize your terminal welcome screen. Learn how to update your .bashrc or .zshrc files for a pro developer look.",
  slug: "/use-cases/terminal-ascii-art",
}));

const faqItems = [
  {
    question: "How do I add ASCII art to my terminal startup?",
    answer: "Generate the text, save it to a file, and use the 'cat' command in your .bashrc or .zshrc file to display it when the terminal window is opened."
  },
  {
    question: "Can I add color to terminal ASCII art?",
    answer: "Yes, you can use ANSI escape codes to add color. Many modern terminal emulators also support 256-color and truecolor ANSI art."
  },
  {
    question: "Which shell files should I edit?",
    answer: "For bash users, edit ~/.bashrc. For Zsh users (default on macOS), edit ~/.zshrc. For Fish users, edit the fish_greeting function."
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
          Personalize your development environment with unique, text-based welcome screens.
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
        <div className="grid gap-6">
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12">Level Up Your Terminal Workflow</h2>
        <p>Your terminal is where you spend the majority of your time as a developer. Why settle for a generic welcome screen? Adding a piece of custom ASCII art is a rite of passage for many developers, signaling a deep appreciation for the craft and the history of computing.</p>

        <h3>How to Implement:</h3>
        <ol>
          <li>Generate your ASCII art using our <Link href="/text-to-ascii">Text to ASCII tool</Link>.</li>
          <li>Copy the output and save it to a file, for example: <code>~/welcome.txt</code>.</li>
          <li>Open your shell configuration file (e.g., <code>nano ~/.zshrc</code>).</li>
          <li>Add the command <code>cat ~/welcome.txt</code> to the end of the file.</li>
          <li>Restart your terminal and enjoy your new custom greeting!</li>
        </ol>
      </div>
    </div>
  );
}
