import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Free Discord Templates | Image To Ascii",
  description: "Browse our collection of free Discord templates and use our Image To Ascii to customize them instantly.",
  slug: "/image-to-ascii/templates/discord",
}));

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
        <h2>About These Templates</h2>
        <p>
          Our Discord templates are designed to give you a head start. Combine them with the raw power of our client-side generator to produce stunning results in seconds.
        </p>
      </div>
    </div>
  );
}
