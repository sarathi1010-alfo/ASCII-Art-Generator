const fs = require('fs');
const path = require('path');

let hasErrors = false;

function validatePageMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip files that don't export metadata
  if (!content.includes('export const metadata') && !content.includes('export async function generateMetadata')) {
    return;
  }

  // Check if they use the centralized metadata resolvers
  if (!content.includes('resolveMetadata')) {
    console.error(`❌ SEO Validation Error in ${filePath}: Uses manual metadata instead of resolveMetadata.`);
    hasErrors = true;
  }

  // Check if they use a meta factory
  if (!content.includes('buildLandingMeta') &&
      !content.includes('buildProductMeta') &&
      !content.includes('buildCategoryMeta') &&
      !content.includes('buildBlogPostMeta')) {
    console.error(`❌ SEO Validation Error in ${filePath}: Missing SEO meta factory (e.g., buildProductMeta).`);
    hasErrors = true;
  }
}

function scanAppDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanAppDirectory(fullPath);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      validatePageMetadata(fullPath);
    }
  }
}

scanAppDirectory(path.join(__dirname, '../src/app'));

if (hasErrors) {
  console.error('\n🚨 SEO validation failed. Fix the errors above before building.');
  process.exit(1);
} else {
  console.log('\n✅ SEO validation passed.');
  process.exit(0);
}
