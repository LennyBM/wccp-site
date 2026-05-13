// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

// Sentry — only active when SENTRY_DSN env var is set. Local dev and any
// build without the DSN ship with no Sentry runtime.
const sentryEnabled = Boolean(process.env.SENTRY_DSN);

export default defineConfig({
  site: 'https://westcountryconcreteproducts.co.uk',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      // Exclude noindex/demo pages from the public sitemap. The /news/example-post
      // page is marked noindex in BaseLayout and exists only as a content template.
      // The /intake hub is also excluded — internal-only.
      filter: (page) => !page.includes('/news/example-post') && !page.includes('/intake') && !page.includes('/wccpmeeting') && !page.includes('/matt'),
    }),
    ...(sentryEnabled
      ? [
          sentry({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.SENTRY_ENVIRONMENT || 'production',
            release: process.env.SENTRY_RELEASE,
            sourceMapsUploadOptions: {
              project: process.env.SENTRY_PROJECT || 'wccp-site',
              org: process.env.SENTRY_ORG,
              authToken: process.env.SENTRY_AUTH_TOKEN,
            },
            tracesSampleRate: 0.2,
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
          }),
        ]
      : []),
  ],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    // Don't prefetch every link in viewport — that keeps the browser busy
    // forever and breaks tooling that waits for document_idle (e.g. headless
    // screenshot capture). Hover/touch prefetch is still on by default.
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
