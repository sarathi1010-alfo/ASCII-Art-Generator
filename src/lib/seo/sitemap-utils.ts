import fs from 'fs';
import path from 'path';
import toolsData from '../../../scripts/tools-data.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asciiforge.alfo.online';

export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function getBlogRoutes(): string[] {
  const postsPath = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(postsPath)) return [];

  const files = fs.readdirSync(postsPath);
  return files
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => `/blog/${file.replace(/\.mdx?$/, '')}`);
}

const ARTICLE_TOOL_SLUGS = [
  'what-is-ascii',
  'how-ascii-art-works',
  'ascii-vs-unicode',
  'history-of-ascii-art',
  'ansi-art-guide',
  'how-to-read-binary',
  'binary-math-basics',
  'what-is-hexadecimal',
  'what-is-base64',
  'cryptography-basics',
  'how-hashing-works',
  'terminal-customization',
  'github-readme-art',
  'discord-ascii-art',
  'twitch-chat-art',
  'the-future-of-text-art'
];

export function getCoreRoutes(): string[] {
  return [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/tools',
    '/gallery'
  ];
}

export function getArticleRoutes(): string[] {
  const blogRoutes = getBlogRoutes();
  const educationalRoutes = ARTICLE_TOOL_SLUGS.map(slug => `/${slug}`);
  return ['/blog', ...blogRoutes, ...educationalRoutes];
}

export function getProductRoutes(): string[] {
  // All tools in toolsData that are NOT educational guides
  const toolSlugs = toolsData
    .map(t => t.tool)
    .filter(slug => !ARTICLE_TOOL_SLUGS.includes(slug));

  const toolRoutes = toolSlugs.map(slug => `/${slug}`);

  // Manual additional routes from sitemap.ts
  const additionalRoutes = [
    '/generators/text-to-ascii',
    '/generators/image-to-ascii',
    '/styles/standard',
    '/styles/doom',
    '/styles/ghost',
    '/use-cases/discord-ascii-art',
    '/use-cases/github-readme-ascii',
    '/use-cases/terminal-ascii-art',
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

  // We should also include any useCases, templates, vs routes from toolsData if they exist
  const programmaticRoutes: string[] = [];
  toolsData.forEach(tool => {
    if (ARTICLE_TOOL_SLUGS.includes(tool.tool)) return;

    if (tool.useCases) {
      tool.useCases.forEach(uc => programmaticRoutes.push(`/${tool.tool}/${uc}`));
    }
    if (tool.templates) {
      tool.templates.forEach(t => programmaticRoutes.push(`/${tool.tool}/templates/${t}`));
    }
    if (tool.competitors) {
      tool.competitors.forEach(c => programmaticRoutes.push(`/${tool.tool}/vs/${c}`));
    }
  });

  return [...new Set([...toolRoutes, ...additionalRoutes, ...programmaticRoutes])];
}

export function formatSitemapXml(entries: SitemapEntry[]): string {
  const urlset = entries
    .map((entry) => {
      let xml = '  <url>\n';
      xml += `    <loc>${entry.url}</loc>\n`;
      if (entry.lastModified) {
        const date = entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
        xml += `    <lastmod>${date}</lastmod>\n`;
      }
      if (entry.changeFrequency) {
        xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
      }
      if (entry.priority !== undefined) {
        xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      }
      xml += '  </url>';
      return xml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

export function routeToEntry(route: string): SitemapEntry {
  // Ensure route does not end with trailing slash unless it's strictly "/"
  let cleanRoute = route !== '/' && route.endsWith('/') ? route.slice(0, -1) : route;
  cleanRoute = cleanRoute.toLowerCase().replace(/\/+/g, '/');

  let changeFrequency: SitemapEntry['changeFrequency'] = 'weekly';
  let priority = 0.7;

  if (cleanRoute === '/') {
    priority = 1.0;
    changeFrequency = 'daily';
  } else if (
    cleanRoute.startsWith('/tools') ||
    cleanRoute.startsWith('/image-to-ascii') ||
    cleanRoute.startsWith('/text-to-ascii') ||
    getProductRoutes().includes(cleanRoute)
  ) {
    priority = 0.8;
    changeFrequency = 'daily';
  } else if (cleanRoute.startsWith('/blog') || ARTICLE_TOOL_SLUGS.some(slug => cleanRoute.includes(slug))) {
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
}
