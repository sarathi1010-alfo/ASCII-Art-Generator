import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Cool ASCII Text Templates | Stylish Banners",
  description: "Browse our collection of cool ASCII art text templates. Perfect for making your GitHub README or Discord server stand out with stylish fonts.",
  slug: "/generators/text-to-ascii/templates/cool",
}));

const faqItems = [
  {
    question: "What makes an ASCII template 'cool'?",
    answer: "Cool templates often use stylized FIGlet fonts like 'Slant', 'Doom', or 'Epic' that provide a modern and high-impact look compared to standard text."
  },
  {
    question: "How do I use these cool templates?",
    answer: "Simply choose a font style you like, enter your text in our generator, and copy the output into your project's documentation or chat."
  },
  {
    question: "Can I customize the cool templates?",
    answer: "Yes! Our generator allows you to change the font, adjust the width, and even add custom characters to make the template truly yours."
  },
  {
    question: "Are these templates compatible with GitHub?",
    answer: "Absolutely. Just wrap the generated ASCII art in triple backticks (```) to ensure it renders correctly on your GitHub profile or repository."
  }
];

export default function CoolTemplatesPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Cool ASCII Text Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Elevate your digital presence with our curated collection of stylish ASCII art banners.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Create Your Cool Banner</h2>
        <p className="mb-6 text-muted-foreground">
          Use our powerful generator to bring these templates to life with your own text.
        </p>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Text to ASCII Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>How to Use Cool ASCII Templates</h2>
        <p>Using a template is the fastest way to get a professional-looking ASCII banner. Instead of experimenting with dozens of fonts, we&apos;ve identified the ones that users find most &quot;cool&quot; and visually appealing.</p>

        <h3>Recommended Fonts for Cool Effects:</h3>
        <ul>
          <li><strong>Slant:</strong> Perfect for a fast, modern tech vibe.</li>
          <li><strong>Doom:</strong> Great for heavy, bold headers that demand attention.</li>
          <li><strong>Bloody:</strong> Ideal for a more aggressive or gothic aesthetic.</li>
        </ul>

        <h2>Step-by-Step Tutorial: Creating Your First Cool Banner</h2>
        <p>Follow these simple steps to create a high-impact ASCII banner for your project:</p>
        <ol>
          <li><strong>Input Your Text:</strong> Open the <Link href="/text-to-ascii">Text to ASCII tool</Link> and type your project name or username.</li>
          <li><strong>Select a &quot;Cool&quot; Font:</strong> Choose from our curated list of styles like &apos;Slant&apos; or &apos;Doom&apos; from the dropdown menu.</li>
          <li><strong>Adjust Character Width:</strong> Use the width slider to ensure your banner fits your intended platform (e.g., keeping it under 80 characters for standard terminals).</li>
          <li><strong>Copy &amp; Paste:</strong> Click the &apos;Copy&apos; button and paste the result into your README.md or Discord message using triple backticks (```).</li>
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
