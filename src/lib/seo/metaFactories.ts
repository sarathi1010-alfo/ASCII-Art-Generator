import type { SeoMeta } from '@/types/seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asciiforge.alfo.online';

function getOgImageUrl(title: string, type: string) {
  return `${BASE_URL}/og?title=${encodeURIComponent(title)}&type=${type}`;
}

export function buildLandingMeta(data: Partial<SeoMeta> & { title: string; description: string; slug: string }): SeoMeta {
  return {
    ...data,
    pageType: 'landing',
    noindex: data.noindex ?? false,
    ogImage: data.ogImage ?? {
      url: getOgImageUrl(data.title, 'landing'),
      alt: data.title,
    }
  };
}

export function buildProductMeta(data: Partial<SeoMeta> & { title: string; description: string; slug: string }): SeoMeta {
  return {
    ...data,
    pageType: 'product',
    noindex: data.noindex ?? false,
    ogImage: data.ogImage ?? {
      url: getOgImageUrl(data.title, 'product'),
      alt: data.title,
    }
  };
}

export function buildBlogPostMeta(data: Partial<SeoMeta> & { title: string; description: string; slug: string; publishedAt: string }): SeoMeta {
  return {
    ...data,
    pageType: 'article',
    noindex: data.noindex ?? false,
    updatedAt: data.updatedAt || data.publishedAt,
    ogImage: data.ogImage ?? {
      url: getOgImageUrl(data.title, 'article'),
      alt: data.title,
    }
  };
}

export function buildCategoryMeta(data: Partial<SeoMeta> & { title: string; description: string; slug: string }): SeoMeta {
  return {
    ...data,
    pageType: 'category',
    noindex: data.noindex ?? false,
    ogImage: data.ogImage ?? {
      url: getOgImageUrl(data.title, 'category'),
      alt: data.title,
    }
  };
}

export function buildDocsMeta(data: Partial<SeoMeta> & { title: string; description: string; slug: string }): SeoMeta {
  return {
    ...data,
    pageType: 'docs',
    noindex: data.noindex ?? false,
    ogImage: data.ogImage ?? {
      url: getOgImageUrl(data.title, 'docs'),
      alt: data.title,
    }
  };
}
