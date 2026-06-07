import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import fs from 'fs';
import path from 'path';

function getAppRoutes(dir: string, basePath = ''): string[] {
  let routes: string[] = [];
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

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'src/app');
  let routes = getAppRoutes(appDir);

  // Filter out any dynamic routes that aren't pre-generated, or handle them specifically if needed
  routes = routes.filter(route => !route.includes('['));

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
