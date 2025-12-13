import { Metadata } from 'next';

export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  keywords?: string;
}

/**
 * Generate Next.js Metadata object for SEO
 */
export function generateMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: {
      index: !seo.noindex,
      follow: !seo.nofollow,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      type: 'website',
    },
    alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
  };
}

/**
 * JSON-LD Structured Data for Product
 */
export function productStructuredData(vehicle: {
  name: string;
  slug: string;
  description: string;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  images: string[];
  ownerName: string;
}) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: vehicle.name,
    description: vehicle.description,
    url: `https://vinurban.vn/xe/${vehicle.slug}`,
    image: vehicle.images[0],
    brand: {
      '@type': 'Brand',
      name: 'VinUrban',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: vehicle.rating,
      ratingCount: vehicle.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: vehicle.pricePerDay,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: vehicle.ownerName,
      },
    },
  };
}

/**
 * JSON-LD Organization Schema
 */
export function organizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VinUrban',
    url: 'https://vinurban.vn',
    logo: 'https://vinurban.vn/logo.png',
    description: 'Nền tảng thuê xe tự lái nhanh chóng, an toàn, giá tốt',
    sameAs: [
      'https://facebook.com/vinurban',
      'https://twitter.com/vinurban',
      'https://instagram.com/vinurban',
    ],
  };
}

/**
 * Insert structured data into page <head>
 */
export function structuredDataScript(data: Record<string, any>): string {
  return JSON.stringify(data);
}
