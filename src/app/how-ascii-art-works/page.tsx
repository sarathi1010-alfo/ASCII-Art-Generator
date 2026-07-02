import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "How ASCII Art Works | Technical Explanation",
  description: "Learn the technical process behind converting images and text into ASCII art using algorithms and character mapping.",
  slug: "/how-ascii-art-works",
}));

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          How ASCII Art Works
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Understanding the algorithms behind text-based art generation.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <p>
          Converting an image to ASCII involves analyzing pixel luminosity and mapping those values to a set of characters with varying visual densities.
        </p>
        <p>
          If you are looking for a practical tutorial, read our guide on <Link href="/blog/ascii-art-guide">how to create ASCII art from images and text</Link>.
        </p>
        <h2>The Conversion Process</h2>
        <p>The core of an image-to-ASCII algorithm is mapping brightness to character density. Denser characters like &apos;@&apos; represent darker areas, while lighter characters like &apos;.&apos; represent lighter areas.</p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Try It Yourself</h2>
        <Link href="/">
          <Button size="lg" className="font-bold">
            Open Generator
          </Button>
        </Link>
      </div>
    </div>
  );
}
