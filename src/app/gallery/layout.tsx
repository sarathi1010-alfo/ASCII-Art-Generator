import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "ASCII Art Gallery & Templates",
  description: "Browse our extensive gallery of copy-and-paste ASCII art templates.",
  slug: "/gallery",
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
