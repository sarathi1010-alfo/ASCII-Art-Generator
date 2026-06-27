import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Ascii Animals | Free Online Generator",
  description: "Use our free online Ascii Animals. Fast, secure, and runs entirely in your browser.",
  slug: "/ascii-animals",
}));

export default function ToolPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 capitalize">
          Ascii Animals
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Use our free online tool. It&apos;s fast, secure, and completely client-side.
        </p>
      </div>

      <div className="bg-muted/30 border border-muted-foreground/20 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Under Construction</h2>
        <p className="mb-6 text-muted-foreground">
          The Ascii Animals interface is currently being built. Check back soon!
        </p>
        <Link href="/">
          <Button size="lg" className="font-bold">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
