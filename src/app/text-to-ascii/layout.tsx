import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Text to ASCII Generator | Create ASCII Text Art",
  description: "Instantly convert text to ASCII art using hundreds of built-in fonts. Fast, client-side, and free.",
  slug: "/text-to-ascii",
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
