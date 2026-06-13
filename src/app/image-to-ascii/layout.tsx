import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildProductMeta } from "@/lib/seo/metaFactories";

export const metadata = resolveMetadata(buildProductMeta({
  title: "Image to ASCII Converter | Turn Photos into Text Art",
  description: "Instantly turn any picture into highly customizable ASCII art. Adjust density, colors, and invert lighting natively in your browser.",
  slug: "/image-to-ascii",
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
