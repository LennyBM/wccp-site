// Typed JSON-LD schema.org generators for WCCP.
//
// CLIENT CONSTRAINT (Kim): no public prices anywhere, including JSON-LD.
// All builders run through stripPriceFields(). Keyed off site.pricingPolicy.

import { site } from './site';

const PRICE_KEYS = new Set([
  'price',
  'priceCurrency',
  'priceRange',
  'lowPrice',
  'highPrice',
  'priceSpecification',
]);

export function stripPriceFields<T extends Record<string, unknown>>(o: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) {
    if (!PRICE_KEYS.has(k)) out[k] = v;
  }
  return out as T;
}

export function containsPriceFields(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.some(containsPriceFields);
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (PRICE_KEYS.has(k)) return true;
      if (containsPriceFields(v)) return true;
    }
  }
  return false;
}

const previousNames = (site as { previousNames?: readonly string[] }).previousNames ?? [];
const alternateNames = [site.shortName, ...previousNames].filter(Boolean);

const orgAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.town,
  addressRegion: site.address.region,
  postalCode: site.address.postcode,
  addressCountry: site.address.country,
};

const orgRef = {
  '@type': 'Organization' as const,
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
};

const seller = { ...orgRef };

// ── Organization ─────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: alternateNames.length > 1 ? alternateNames : site.shortName,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    foundingDate: site.founded,
    description: site.description,
    sameAs: Object.values(site.socials).filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneIntl,
      contactType: 'sales',
      areaServed: ['GB', 'IE', 'DE', 'NL', 'FR', 'BE'],
      availableLanguage: 'English',
    },
    address: orgAddress,
    identifier: site.companyNumber,
  };
}

// ── LocalBusiness ────────────────────────────────────────────────────

export function buildLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#localbusiness`,
    name: site.name,
    image: `${site.url}/og-default.png`,
    url: site.url,
    telephone: site.contact.phoneIntl,
    address: orgAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.geo.latitude,
      longitude: site.address.geo.longitude,
    },
    openingHoursSpecification: site.hours.openingHoursSpec,
    areaServed: site.areasServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  };
}

// ── Product (price-stripped) ─────────────────────────────────────────

export function buildProductSchema(d: Record<string, unknown>) {
  let offers: unknown = d.offers;
  if (offers) {
    const norm = (o: Record<string, unknown>) => ({
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller,
      ...stripPriceFields(o),
    });
    offers = Array.isArray(offers)
      ? offers.map((o) => norm(o as Record<string, unknown>))
      : norm(offers as Record<string, unknown>);
  }

  let aggregateOffer: unknown = d.aggregateOffer;
  if (aggregateOffer) {
    const norm = (a: Record<string, unknown>) => ({
      '@type': 'AggregateOffer',
      seller,
      ...stripPriceFields(a),
    });
    aggregateOffer = Array.isArray(aggregateOffer)
      ? aggregateOffer.map((a) => norm(a as Record<string, unknown>))
      : norm(aggregateOffer as Record<string, unknown>);
  }

  const { offers: _o, aggregateOffer: _ao, ...rest } = d;
  return {
    '@type': 'Product',
    ...rest,
    ...(offers ? { offers } : {}),
    ...(aggregateOffer ? { aggregateOffer } : {}),
  };
}

// ── Service (price-stripped, area auto-filled) ───────────────────────

export function buildServiceSchema(d: Record<string, unknown>) {
  const provider = d.provider ?? {
    ...orgRef,
    telephone: site.contact.phoneIntl,
  };

  const areaServedRaw = (d.areaServed ?? site.areasServed) as unknown;
  const areaServed = Array.isArray(areaServedRaw)
    ? areaServedRaw.map((a) => (typeof a === 'string' ? { '@type': 'AdministrativeArea', name: a } : a))
    : areaServedRaw;

  const { provider: _p, areaServed: _a, hasOfferCatalog: catalog, ...rest } = d;
  const safeCatalog =
    catalog !== undefined && !containsPriceFields(catalog) ? { hasOfferCatalog: catalog } : {};

  return { '@type': 'Service', provider, areaServed, ...rest, ...safeCatalog };
}

// ── Article ──────────────────────────────────────────────────────────

export function buildArticleSchema(d: Record<string, unknown>) {
  const headline = (d.headline as string | undefined) ?? site.name;
  const author = d.author ?? orgRef;
  const datePublished =
    (d.datePublished as string | undefined) ?? new Date().toISOString().slice(0, 10);

  const { headline: _h, author: _au, datePublished: _dp, ...rest } = d;
  return { '@type': 'Article', headline, author, datePublished, ...rest };
}

// ── FAQPage ──────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQPageSchema(d: Record<string, unknown>) {
  const items = (d.mainEntity ?? []) as FAQItem[];
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
    ...Object.fromEntries(Object.entries(d).filter(([k]) => k !== 'mainEntity')),
  };
}

// ── HowTo ────────────────────────────────────────────────────────────

export function buildHowToSchema(d: Record<string, unknown>) {
  return { '@type': 'HowTo', ...d };
}

// ── BreadcrumbList (auto-generated from URL path) ────────────────────

const SLUG_LABELS: Record<string, string> = {
  products: 'Products',
  sectors: 'Sectors',
  agricultural: 'Agricultural',
  civils: 'Civil Engineering',
  bespoke: 'Bespoke',
  guides: 'Guides',
  'case-studies': 'Case Studies',
  areas: 'Areas We Serve',
  grants: 'Grants',
  news: 'News',
  standards: 'Standards',
  sustainability: 'Sustainability',
};

function slugToLabel(slug: string): string {
  return (
    SLUG_LABELS[slug] ??
    slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function buildBreadcrumbSchema(pathname: string | undefined) {
  if (!pathname) return null;
  const segments = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
  ];

  let path = '';
  for (let i = 0; i < segments.length; i++) {
    path += `/${segments[i]}`;
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: slugToLabel(segments[i]),
      item: `${site.url}${path}`,
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// ── Graph assembler ──────────────────────────────────────────────────

export type SchemaType =
  | 'Organization'
  | 'LocalBusiness'
  | 'Product'
  | 'Article'
  | 'FAQPage'
  | 'HowTo'
  | 'BreadcrumbList'
  | 'Service';

export function buildSchemaGraph(
  type: SchemaType,
  data: Record<string, unknown>,
  pathname: string,
) {
  const org = buildOrganizationSchema();

  const pageSchema = (() => {
    switch (type) {
      case 'LocalBusiness':
        return buildLocalBusinessSchema();
      case 'Organization':
        return org;
      case 'Service':
        return buildServiceSchema(data);
      case 'Product':
        return buildProductSchema(data);
      case 'Article':
        return buildArticleSchema(data);
      case 'FAQPage':
        return buildFAQPageSchema(data);
      case 'HowTo':
        return buildHowToSchema(data);
      case 'BreadcrumbList':
        return buildBreadcrumbSchema(pathname);
      default:
        return { '@type': type, ...data };
    }
  })();

  const graph: unknown[] =
    type === 'LocalBusiness' || type === 'Organization'
      ? [pageSchema]
      : [org, pageSchema];

  const breadcrumb = buildBreadcrumbSchema(pathname);
  if (breadcrumb && type !== 'BreadcrumbList') {
    graph.push(breadcrumb);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter(Boolean),
  };
}
