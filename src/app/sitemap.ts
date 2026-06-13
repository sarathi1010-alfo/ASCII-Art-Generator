import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asciiforge.alfo.online';

function getAppRoutes(dir: string, basePath = ''): string[] {
  let routes: string[] = [];

  if (!fs.existsSync(dir)) return routes;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('(') && !file.startsWith('_') && file !== 'api' && file !== 'og') {
         routes = routes.concat(getAppRoutes(filePath, `${basePath}/${file}`));
      }
    } else if (file === 'page.tsx') {
      routes.push(basePath || '/');
    }
  }

  return routes;
}

function getBlogRoutes(): string[] {
  const postsPath = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(postsPath)) return [];

  const files = fs.readdirSync(postsPath);
  return files
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => `/blog/${file.replace(/\.mdx?$/, '')}`);
}

export const revalidate = 3600; // 1 hour ISR

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'src/app');
  let appRoutes = getAppRoutes(appDir);

  // Filter out any dynamic routes
  appRoutes = appRoutes.filter(route => !route.includes('[') && !route.includes(']'));

  // Get blog routes
  const blogRoutes = getBlogRoutes();

  // Combine and deduplicate
  const allRoutes = [...new Set([...appRoutes, ...blogRoutes])];

  return allRoutes.map((route) => {
    // Ensure route does not end with trailing slash unless it's strictly "/"
    const cleanRoute = route !== '/' && route.endsWith('/') ? route.slice(0, -1) : route;

    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
    let priority = 0.7;

    if (cleanRoute === '/') {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (cleanRoute.startsWith('/tools') || cleanRoute.startsWith('/image-to-ascii') || cleanRoute.startsWith('/text-to-ascii')) {
      priority = 0.8;
      changeFrequency = 'daily';
    } else if (cleanRoute.startsWith('/blog')) {
      priority = 0.7;
      changeFrequency = 'weekly';
    } else if (['/about', '/contact', '/privacy-policy', '/terms-of-service'].includes(cleanRoute)) {
      priority = 0.5;
      changeFrequency = 'monthly';
    }

    return {
      url: `${SITE_URL}${cleanRoute}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });
}
