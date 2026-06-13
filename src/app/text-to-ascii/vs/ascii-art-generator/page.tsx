import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Text To Ascii vs Ascii Art Generator | Best Free Alternative",
  description: "Comparing Text To Ascii with Ascii Art Generator. Find out why our free, client-side browser utility is the better choice.",
  slug: "/text-to-ascii/vs/ascii-art-generator",
}));

export default function ComparisonPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          Text To Ascii vs Ascii Art Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Looking for a better alternative to Ascii Art Generator? See why our completely free, client-side tool is the right choice.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Try Text To Ascii Now</h2>
        <p className="mb-6 text-muted-foreground">
          No signups. No server processing. Just instant results.
        </p>
        <Link href="/text-to-ascii">
          <Button size="lg" className="font-bold">
            Open Text To Ascii Tool
          </Button>
        </Link>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Why Choose Text To Ascii?</h2>
        <p>
          When comparing <strong>Text To Ascii</strong> to <strong>Ascii Art Generator</strong>, the most important factor is privacy and speed.
        </p>
        <ul>
          <li><strong>Client-Side Processing:</strong> We don&apos;t send your data to a server. Everything happens in your browser.</li>
          <li><strong>100% Free:</strong> No paywalls or hidden fees.</li>
          <li><strong>Instant Results:</strong> Because there&apos;s no server upload, generation is immediate.</li>
        </ul>
      </div>
    </div>
  );
}
