import type { Metadata } from "next";

/**
 * Resolves the base URL for the current environment.
 * Prioritizes SITE_URL (for production custom domains),
 * falls back to VERCEL_URL, and defaults to localhost for dev.
 */
export const getBaseUrl = () => {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export const siteConfig = {
  name: "ASCII Art Generator",
  description: "Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.",
  url: getBaseUrl(),
  ogImage: `${getBaseUrl()}/og.png`,
  creator: "alfo.online",
};

/**
 * Reusable metadata constructor for consistent SEO across all pages.
 */
export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  path = "",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path ? `${siteConfig.url}${path}` : siteConfig.url,
    },
    openGraph: {
      title,
      description,
      url: path ? `${siteConfig.url}${path}` : siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@alfo_online",
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
