import { getProductRoutes, routeToEntry, formatSitemapXml } from '@/lib/seo/sitemap-utils';

export const dynamic = 'force-static';

export async function GET() {
  const routes = getProductRoutes();
  const entries = routes.map(routeToEntry);
  const xml = formatSitemapXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
