const fs = require('fs');
const path = require('path');

function normalizeInternalHref(href) {
  if (!href.startsWith('/') && !href.startsWith('http')) return href;
  if (href.startsWith('http')) return href;

  const [pathAndQuery, hash] = href.split('#');
  const [pathSegment, query] = pathAndQuery.split('?');

  let cleanPath = pathSegment.toLowerCase().replace(/\/{2,}/g, '/');

  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  let finalHref = cleanPath;
  if (query) finalHref += `?${query}`;
  if (hash) finalHref += `#${hash}`;

  return finalHref;
}

function processDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // Skip node_modules and .next
    if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
      processDir(fullPath);
    } else if (/\.(tsx?|mdx?|js)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Update Next.js Links and simple a tags
      // Match href="something" or href={'something'} or href={`something`}
      let newContent = content.replace(/href=(["'`]|{["'`])([^"'}]+)(["'`]}|["'`])/g, (match, openQuote, href, closeQuote) => {
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return match;
        // Don't modify Next.js dynamic routing syntax, or variables.
        if (href.includes('$') || href.startsWith('/')) {
          const normalized = normalizeInternalHref(href);
          return `href=${openQuote}${normalized}${closeQuote}`;
        }
        return match;
      });

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Repaired links in: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, '../src'));
