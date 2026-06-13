import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import fs from 'fs';
import path from 'path';

function getAppRoutes(dir: string, basePath = ''): string[] {
  let routes: string[] = [];

  if (!fs.existsSync(dir)) return routes;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('(') && !file.startsWith('_') && file !== 'api') {
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

    return {
      url: `${siteConfig.url}${cleanRoute}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: cleanRoute === '/' ? 1 : 0.8,
    };
  });
}
