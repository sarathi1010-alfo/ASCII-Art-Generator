import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { resolveMetadata } from "@/lib/seo/resolveMetadata";
import { buildCategoryMeta } from "@/lib/seo/metaFactories";

const POSTS_PATH = path.join(process.cwd(), "src/content/blog");

export const metadata = resolveMetadata(
  buildCategoryMeta({
    title: "Blog",
    description: "ASCIIForge Blog – ASCII Art Guides, Tutorials & Inspiration",
    slug: "/blog",
  }),
);

export default function BlogIndexPage() {
  const postFilePaths = fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path));

  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { data } = matter(source);

      return {
        slug: filePath.replace(/\.mdx?$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          ASCIIForge Blog – ASCII Art Guides, Tutorials & Inspiration
        </h1>
        <p className="text-muted-foreground mb-4">
          Welcome to the ASCIIForge Blog, your ultimate destination for
          everything related to ASCII art. Whether you are a curious beginner
          looking to understand the basics of character encoding or a seasoned
          developer aiming to customize your terminal and GitHub READMEs, we
          have you covered. Our comprehensive guides, step-by-step tutorials,
          and deep dives into the history of digital text art are designed to
          inspire and educate. You will learn how to transform plain text and
          images into stunning visual masterpieces using our powerful tools. We
          explore manual techniques, automated conversions, and creative use
          cases across various platforms. Our goal is to empower your creativity
          with the best resources available on the web. Explore our{" "}
          <Link href="/" className="text-primary hover:underline">
            homepage
          </Link>{" "}
          to see more, open the{" "}
          <Link href="/generator" className="text-primary hover:underline">
            generator
          </Link>{" "}
          to start creating your own art, or check out the{" "}
          <Link href="/gallery" className="text-primary hover:underline">
            gallery
          </Link>{" "}
          for inspiration.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Fundamentals</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <Link
                  href="/blog/ascii-art-guide"
                  className="hover:text-primary transition-colors"
                >
                  The Ultimate Guide to ASCII Art in 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-ascii"
                  className="hover:text-primary transition-colors"
                >
                  What is ASCII Art?
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-a-figlet-font"
                  className="hover:text-primary transition-colors"
                >
                  What is a Figlet Font?
                </Link>
              </li>
              <li>
                <Link
                  href="/how-does-text-to-ascii-work"
                  className="hover:text-primary transition-colors"
                >
                  How Does Text-to-ASCII Work?
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-the-standard-font"
                  className="hover:text-primary transition-colors"
                >
                  What is the Standard Font?
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-the-ghost-font"
                  className="hover:text-primary transition-colors"
                >
                  What is the Ghost Font?
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <Link
                  href="/use-cases/discord-ascii-art"
                  className="hover:text-primary transition-colors"
                >
                  ASCII Art for Discord
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases/github-readme-ascii"
                  className="hover:text-primary transition-colors"
                >
                  ASCII Art for GitHub READMEs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Font Guides</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <Link
                  href="/styles/standard"
                  className="hover:text-primary transition-colors"
                >
                  Standard Font Deep-Dive
                </Link>
              </li>
              <li>
                <Link
                  href="/styles/ghost"
                  className="hover:text-primary transition-colors"
                >
                  Ghost Font Deep-Dive
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Themed Collections</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-primary transition-colors"
                >
                  Explore All Themed Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Comparisons</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <Link
                  href="/text-to-ascii/vs/patorjk"
                  className="hover:text-primary transition-colors"
                >
                  AsciiForge vs Patorjk
                </Link>
              </li>
              <li>
                <Link
                  href="/text-to-ascii/vs/textkool"
                  className="hover:text-primary transition-colors"
                >
                  AsciiForge vs TextKool
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <time className="text-xs text-muted-foreground block mt-1 mb-3">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
