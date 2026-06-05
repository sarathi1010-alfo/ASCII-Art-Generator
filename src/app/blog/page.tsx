import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const POSTS_PATH = path.join(process.cwd(), "src/content/blog");

export default function BlogIndexPage() {
  const postFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));

  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { data } = matter(source);

    return {
      slug: filePath.replace(/\.mdx?$/, ""),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground">Articles, tips, and the history behind ASCII art.</p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h2>
              <time className="text-xs text-muted-foreground block mt-1 mb-3">{new Date(post.date).toLocaleDateString()}</time>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
