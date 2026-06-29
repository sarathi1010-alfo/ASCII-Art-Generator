const fs = require('fs');
const tools = require('./scripts/tools-data.json');

const pages = [
  '/',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/tools',
  '/gallery',
  '/blog'
];

tools.forEach(tool => {
  pages.push('/' + tool.tool);
});

fs.writeFileSync('existing_pages.md', pages.join('\n'));
