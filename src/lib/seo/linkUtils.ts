/**
 * Normalizes an internal href to ensure it matches the canonical pattern.
 * - Strips trailing slashes (except root).
 * - Converts to lowercase.
 * - Removes duplicate slashes.
 */
export function normalizeInternalHref(href: string): string {
  // Don't modify external links or anchor links on the same page
  if (!href.startsWith('/') && !href.startsWith('http')) return href;
  if (href.startsWith('http')) return href; // For now, only normalize internal relative links

  // Extract hash and query
  const [pathAndQuery, hash] = href.split('#');
  const [path, query] = pathAndQuery.split('?');

  let cleanPath = path.toLowerCase().replace(/\/{2,}/g, '/');

  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  let finalHref = cleanPath;
  if (query) finalHref += `?${query}`;
  if (hash) finalHref += `#${hash}`;

  return finalHref;
}

/**
 * Validates if an internal link is considered healthy.
 */
export function validateInternalLink(href: string): boolean {
  if (href.startsWith('http')) return true; // skip external checking here

  // Ensure it matches the normalized version
  const normalized = normalizeInternalHref(href);
  return href === normalized;
}
