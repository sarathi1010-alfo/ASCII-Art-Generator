export type PageType =
  | 'website'
  | 'article'
  | 'product'
  | 'category'
  | 'author'
  | 'docs'
  | 'landing'
  | 'tag'
  | 'faq';

export interface SeoMeta {
  title: string;                  // raw title, without site suffix
  description: string;            // 120–160 chars
  slug: string;                   // relative path, e.g. /blog/my-post
  pageType: PageType;
  canonical?: string;             // override auto-computed canonical
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt: string;
  };
  publishedAt?: string;           // ISO 8601
  updatedAt?: string;             // ISO 8601
  author?: {
    name: string;
    url?: string;
  };
  breadcrumbs?: Array<{ label: string; href: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  productData?: {
    name: string;
    price: number;
    currency: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    sku?: string;
    brand?: string;
    ratingValue?: number;
    reviewCount?: number;
  };
  articleSection?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: Array<{ locale: string; url: string }>;
  estimatedTime?: string;
  steps?: Array<{ heading: string; body: string; image?: { url: string } }>;
}
