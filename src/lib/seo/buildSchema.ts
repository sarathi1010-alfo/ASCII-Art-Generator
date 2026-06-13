import { SeoMeta } from '@/types/seo';
import { buildCanonical } from './buildCanonical';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'ASCII Art Generator';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asciiforge.alfo.online';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/alfo_online'
    ]
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Turn text, images, and ideas into stunning ASCII art instantly. The fastest browser-based ASCII art platform.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function buildBreadcrumbSchema(items: Array<{ label: string; href: string }>) {
  if (!items || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: buildCanonical(item.href)
    }))
  };
}

export function buildArticleSchema(meta: SeoMeta) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: meta.ogImage ? [meta.ogImage.url] : undefined,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt || meta.publishedAt,
    author: meta.author ? {
      '@type': 'Person',
      name: meta.author.name,
      url: meta.author.url
    } : undefined,
    publisher: buildOrganizationSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildCanonical(meta.slug)
    }
  };

  if (meta.articleSection) {
    schema.articleSection = meta.articleSection;
  }

  if (meta.tags && meta.tags.length > 0) {
    schema.keywords = meta.tags.join(', ');
  }

  // Speakable logic
  schema.speakable = {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.article-summary', '.tldr']
  };

  // Strip empty/undefined
  return JSON.parse(JSON.stringify(schema));
}

export function buildProductSchema(meta: SeoMeta) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: meta.title,
    description: meta.description,
    image: meta.ogImage ? [meta.ogImage.url] : undefined,
    url: buildCanonical(meta.slug)
  };

  if (meta.productData) {
    if (meta.productData.brand) {
      schema.brand = {
        '@type': 'Brand',
        name: meta.productData.brand
      };
    }
    if (meta.productData.sku) {
      schema.sku = meta.productData.sku;
    }

    schema.offers = {
      '@type': 'Offer',
      priceCurrency: meta.productData.currency,
      price: meta.productData.price,
      availability: `https://schema.org/${meta.productData.availability}`,
      url: buildCanonical(meta.slug)
    };

    if (meta.productData.ratingValue && meta.productData.reviewCount) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: meta.productData.ratingValue,
        reviewCount: meta.productData.reviewCount
      };
    }
  }

  return JSON.parse(JSON.stringify(schema));
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  if (!items || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildAuthorSchema(meta: SeoMeta) {
  if (!meta.author) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: meta.author.name,
    url: meta.author.url
  };
}

export function buildHowToSchema(meta: SeoMeta) {
  if (!meta.steps || meta.steps.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: meta.title,
    description: meta.description,
    totalTime: meta.estimatedTime,
    step: meta.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.heading,
      text: s.body,
      image: s.image?.url,
    }))
  };
}
