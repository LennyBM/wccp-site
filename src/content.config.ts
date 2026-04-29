import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    sector: z.enum(['agricultural', 'civils', 'bespoke']),
    summary: z.string(),
    image: z.string().optional(),
    leadTime: z.string().optional(),
    standards: z.array(z.string()).default([]),
    variants: z.array(z.object({
      name: z.string(),
      thickness: z.string().optional(),
      height: z.string().optional(),
      width: z.string().optional(),
      length: z.string().optional(),
      weight: z.string().optional(),
      grade: z.string().optional(),
      capacity: z.string().optional(),
    })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('WCCP Editorial'),
    image: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    customer: z.string(),
    location: z.string(),
    sector: z.enum(['dairy', 'beef', 'arable', 'civils', 'estate', 'bespoke']),
    products: z.array(z.string()).default([]),
    completedAt: z.coerce.date(),
    summary: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    image: z.string().optional(),
    quote: z.object({ text: z.string(), attribution: z.string() }).optional(),
  }),
});

const areas = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/areas' }),
  schema: z.object({
    name: z.string(),
    region: z.string(),
    drivetime: z.string(),
    townsServed: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

export const collections = { products, guides, caseStudies, areas };
