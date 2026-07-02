import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "History of ASCII Art | The Origins of Text Art",
  description: "Explore the fascinating history of ASCII art, from early typewriter art to BBS and modern digital culture.",
  slug: "/history-of-ascii-art",
}));

export default function HistoryPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          The History of ASCII Art
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From typewriter art to modern terminal masterpieces.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <p>
          ASCII art has a rich history that predates modern computing. It started with typewriter art and evolved through the era of Bulletin Board Systems (BBS) to become a staple of modern developer culture.
        </p>
        <p>
          For a comprehensive modern perspective, check out our latest guide on <Link href="/blog/ascii-art-guide">how to create ASCII art from images and text</Link>.
        </p>
        <h2>The Typewriter Era</h2>
        <p>In the late 19th and early 20th centuries, artists used the fixed-width characters of typewriters to create elaborate images, setting the stage for digital text art.</p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Creating Today</h2>
        <Link href="/">
          <Button size="lg" className="font-bold">
            Open Generator
          </Button>
        </Link>
      </div>
    </div>
  );
}
