import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Free Discord Templates | Image To Ascii",
  description: "Browse our collection of free Discord templates and use our Image To Ascii to customize them instantly. Optimize your profile picture or server banners.",
  slug: "/image-to-ascii/templates/discord",
}));

const faqItems = [
  {
    question: "How do I make ASCII art look good on Discord?",
    answer: "The key is to use the right resolution. Discord's chat width is limited, so we recommend setting your resolution to 40-60 characters wide and always using triple backticks (\`\`\`) to preserve formatting."
  },
  {
    question: "Can I convert my Discord PFP to ASCII?",
    answer: "Yes! Upload your profile picture to our Image to ASCII tool, adjust the contrast and resolution, and you'll have a unique text-based version of your avatar in seconds."
  },
  {
    question: "Does the generator support colored ASCII for Discord?",
    answer: "While Discord doesn't natively support full ANSI color in regular messages, you can use our 'Discord' export button to format your art for Discord's built-in syntax highlighting (using 'ansi' blocks)."
  },
  {
    question: "Is there a limit to the size of art I can post in Discord?",
    answer: "Discord has a 2,000 character limit for regular users (4,000 for Nitro). If your art exceeds this, you can try lowering the resolution or posting it as an attached .txt file."
  }
];

export default function TemplatePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          Discord Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with one of our free Discord templates and customize it using the Image To Ascii.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Customizing</h2>
        <p className="mb-6 text-muted-foreground">
          Bring your ideas to life. Open the tool to get started.
        </p>
        <Link href="/image-to-ascii">
          <Button size="lg" className="font-bold">
            Open Image To Ascii Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <JsonLd schema={buildFaqSchema(faqItems)} />
        <h2>About These Templates</h2>
        <p>
          Our Discord templates are designed to give you a head start. Combine them with the raw power of our client-side generator to produce stunning results in seconds. Optimize your visual identity for one of the world&apos;s most popular community platforms.
        </p>

        <h2>Mastering the Discord Image-to-ASCII Workflow</h2>
        <p>
          Discord presents unique challenges for ASCII art due to its variable message widths and the difference between mobile and desktop rendering. To ensure your images look crisp, we recommend using a lower resolution than you would for a full-screen terminal. A width of 45-55 characters is usually the &quot;sweet spot&quot; that prevents ugly line-wrapping on most smartphones.
        </p>
        <ol>
          <li>Upload your image to the <strong><Link href="/image-to-ascii">Image To Ascii</Link></strong> tool.</li>
          <li>Set the width to approximately 50 characters to ensure it fits on mobile and desktop screens.</li>
          <li>Increase the contrast (aim for 120-140%) to help the art stand out against Discord&apos;s dark or light themes.</li>
          <li>Choose between the &apos;Standard&apos; engine for classic looks or &apos;Braille&apos; for high-detail representations that work surprisingly well in Discord code blocks.</li>
          <li>Click the &apos;Discord&apos; copy button to automatically wrap your art in the correct triple-backtick (```) syntax.</li>
        </ol>

        <h2>Advanced Customization Tutorial</h2>
        <p>
          For those who want to truly impress their server, consider mastering ANSI color codes. Discord now supports basic ANSI colors within specific code block types. By exporting your image as ANSI (using our advanced options), you can paste colored ASCII art directly into your chats!
        </p>
        <p>
          Just remember that colored ASCII requires the `ansi` tag at the start of your code block, like so: <code>```ansi</code>. For a deep dive into how algorithms calculate these values and how to get the most out of your image conversions, read our <Link href="/blog/ascii-art-guide">comprehensive guide to creating ASCII art from images and text</Link>.
        </p>

        <h2>Creative Uses for Discord ASCII Templates</h2>
        <p>
          Beyond simple chat messages, you can use these templates to create unique server icons (by taking a screenshot of your ASCII art), stylized rule headers for your #rules channel, or personalized &quot;About Me&quot; sections for your Discord profile. The key is to experiment with different character sets to see which ones pop best against the Discord UI.
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
