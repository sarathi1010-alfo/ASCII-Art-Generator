import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";
import { JsonLd } from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/seo/buildSchema";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Image to ASCII Generator | Free Online Utility",
  description: "Convert your images and photos into stunning ASCII art instantly. Adjust resolution, contrast, and character sets entirely in your browser.",
  slug: "/generators/image-to-ascii",
}));

const faqItems = [
  {
    question: "How does the Image to ASCII Generator work?",
    answer: "It analyzes the luminosity (brightness) of pixels in your uploaded image and maps those values to ASCII characters with corresponding visual densities."
  },
  {
    question: "What images work best for ASCII art?",
    answer: "High-contrast images with simple subjects and clean backgrounds produce the best results. Portraits, logos, and silhouettes are ideal."
  },
  {
    question: "Are my photos uploaded to a server?",
    answer: "No, our Image to ASCII Generator runs entirely client-side. Your images are processed locally and never leave your browser."
  },
  {
    question: "Can I download the generated ASCII art?",
    answer: "Yes, you can copy the text to your clipboard or download it as a .txt file. You can also export it as a standalone HTML file to preserve formatting."
  }
];

export default function ImageToAsciiGeneratorPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Image to ASCII Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your favorite photos into intricate text-based masterpieces.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Create?</h2>
        <Link href="/image-to-ascii">
          <Button size="lg" className="font-bold">
            Open Image to ASCII Tool
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

        <h2 className="mt-12">How to Get the Best ASCII Results</h2>
        <p>Converting an image to text art is an balancing act between detail and readability. Here are some tips to help you get the best output:</p>

        <h3>1. Adjust Contrast</h3>
        <p>Higher contrast helps the algorithm distinguish between the subject and the background, leading to sharper edges and more recognizable shapes.</p>

        <h3>2. Fine-tune Resolution</h3>
        <p>Lower resolution creates a classic &quot;retro&quot; look, while higher resolution captures more fine detail but requires more space to view properly.</p>

        <h3>3. Try Different Character Sets</h3>
        <p>Switching between simple character sets (like dots and dashes) and complex ones (including letters and numbers) can drastically change the texture of your art.</p>
      </div>
    </div>
  );
}
