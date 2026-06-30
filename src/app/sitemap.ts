import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import toolsData from '../../scripts/tools-data.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asciiforge.alfo.online';

function getBlogRoutes(): string[] {
  const postsPath = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(postsPath)) return [];

  const files = fs.readdirSync(postsPath);
  return files
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => `/blog/${file.replace(/\.mdx?$/, '')}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static utility and core pages
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/tools',
    '/gallery',
    '/blog',
    '/generators/text-to-ascii',
    '/generators/image-to-ascii',
    '/styles/standard',
    '/styles/doom',
    '/styles/ghost',
    '/use-cases/discord-ascii-art',
    '/use-cases/github-readme-ascii',
    '/use-cases/terminal-ascii-art'
  ];

  // Tool routes generated from tools-data.json
  const toolRoutes = toolsData.flatMap(tool => {
    const routes = [`/${tool.tool}`];

    // Check if we need to add useCases, templates, competitors sub-routes
    // Currently they are empty arrays, but they could be populated
    if (tool.useCases && tool.useCases.length > 0) {
       // Just mapping standard structure as seen in Next.js page list
    }
    return routes;
  });

  // Additional sub-routes manually observed
  const additionalToolRoutes = [
    '/image-to-ascii/discord-pfp',
    '/image-to-ascii/forum-signature',
    '/image-to-ascii/photo-to-text',
    '/image-to-ascii/retro-art',
    '/image-to-ascii/templates/discord',
    '/image-to-ascii/templates/html',
    '/image-to-ascii/templates/terminal',
    '/image-to-ascii/vs/asciiart-eu',
    '/image-to-ascii/vs/glassgiant',
    '/text-to-ascii/discord-banner',
    '/text-to-ascii/gaming-profile',
    '/text-to-ascii/github-readme',
    '/text-to-ascii/templates/cool',
    '/text-to-ascii/templates/retro',
    '/text-to-ascii/templates/scary',
    '/text-to-ascii/terminal-header',
    '/text-to-ascii/vs/ascii-art-generator',
    '/text-to-ascii/vs/patorjk'
  ];

  // Get blog routes
  const blogRoutes = getBlogRoutes();

  // Combine and deduplicate
  const allRoutes = [...new Set([...staticRoutes, ...toolRoutes, ...additionalToolRoutes, ...blogRoutes])];

  return allRoutes.map((route) => {
    // Ensure route does not end with trailing slash unless it's strictly "/"
    let cleanRoute = route !== '/' && route.endsWith('/') ? route.slice(0, -1) : route;
    cleanRoute = cleanRoute.toLowerCase().replace(/\/+/g, '/');

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
