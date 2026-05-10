import rss from '@astrojs/rss';
import { site } from '@/config/site';
import { newsPosts } from '@/data/news';
import type { APIContext } from 'astro';

// RSS feed of news posts — sourced from src/data/news.ts so the feed and the
// /news page never drift apart. Stub posts (slug === '#') are excluded —
// only posts with a real route make the feed.
export async function GET(context: APIContext) {
  const items = newsPosts
    .filter((p) => p.slug !== '#')
    .map((p) => ({
      title: p.title,
      link: `/news/${p.slug}`,
      pubDate: new Date(p.iso),
      description: p.excerpt,
      categories: [p.category],
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items,
    customData: '<language>en-gb</language>',
  });
}
