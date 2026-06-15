const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asciiforge.alfo.online';

export function buildCanonical(slug: string): string {
  const base = BASE_URL.replace(/\/$/, '');
  const path = slug.startsWith('/') ? slug : `/${slug}`;
  // Strip trailing slash except for root
  return path === '/' ? base + '/' : `${base}${path.replace(/\/$/, '')}`;
}
