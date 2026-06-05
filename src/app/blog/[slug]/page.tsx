import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

const POSTS_PATH = path.join(process.cwd(), "src/content/blog");

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const paths = fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path));

  return paths.map((path) => ({
    slug: path.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const postFilePath = path.join(POSTS_PATH, `${resolvedParams.slug}.mdx`);
  if (!fs.existsSync(postFilePath)) return { title: 'Not Found' };

  const source = fs.readFileSync(postFilePath);
  const { data } = matter(source);
  return {
    title: `${data.title} | ASCII Gen Blog`,
    description: data.excerpt,
  }
}


export default async function BlogPostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const postFilePath = path.join(POSTS_PATH, `${resolvedParams.slug}.mdx`);

  if (!fs.existsSync(postFilePath)) {
    notFound();
  }

  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to blog
      </Link>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="mb-8 border-b pb-8">
          <h1 className="mb-2 !text-4xl">{data.title}</h1>
          <time className="text-sm text-muted-foreground">{new Date(data.date).toLocaleDateString()}</time>
        </div>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
