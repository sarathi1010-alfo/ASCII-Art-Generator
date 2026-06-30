import { MetadataRoute } from 'next';
import { getCoreRoutes, routeToEntry } from '@/lib/seo/sitemap-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getCoreRoutes();

  return routes.map(route => {
    const entry = routeToEntry(route);
    return {
      url: entry.url,
      lastModified: entry.lastModified as Date,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    };
  });
}
