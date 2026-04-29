// Branded OG share cards for the high-value pages.
// Outputs 1200x630 PNGs to /public/og/{slug}.png by compositing the page's
// hero image with a forest-green overlay + Fraunces-style serif title (SVG).
//
// Usage: `node scripts/generate-og-cards.mjs` (run from project root).

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const OUT = join(PUBLIC, 'og');

const W = 1200;
const H = 630;

// One entry per OG card we want to ship.
// `image` is a /public-relative path. Falls back to og-default if missing.
const cards = [
  { slug: 'home',                        title: 'Precast concrete, cast in North Devon.',           image: '/images/products/cubicles/wccp-cubicles-portable-cubicles-1024x768.jpg' },
  { slug: 'products',                    title: 'The full precast catalogue.',                       image: '/images/products/cubicles/wccp-cubicles-portable-cubicles-1024x768.jpg' },
  { slug: 'sectors-agricultural',        title: 'Cast for the herd, since 1971.',                    image: '/images/products/cubicles/wccp-cubicles-portable-cubicles-1024x768.jpg' },
  { slug: 'sectors-civils',              title: 'Civils precast, on programme.',                     image: '/images/products/retaining-walls/wccp-retaining-walls-l-t-wall-1024x732.jpg' },
  { slug: 'sectors-bespoke',             title: 'If we can lift it, we can probably cast it.',       image: '/images/products/concrete-panels/wccp-concrete-panels-prestressed-concrete-panels.jpg' },
  { slug: 'cattle-cubicles',             title: 'Cattle Cubicles.',                                  image: '/images/products/cubicles/wccp-cubicles-portable-cubicles-1024x768.jpg' },
  { slug: 'slurry-storage',              title: 'Slurry Storage.',                                   image: '/images/products/slurry-handling/wccp-slurry-handling-channel.jpg' },
  { slug: 'slurry-channels',             title: 'Slurry Channels.',                                  image: '/images/products/slurry-handling/wccp-slurry-handling-channel.jpg' },
  { slug: 'water-troughs',               title: 'Drinking Troughs.',                                 image: '/images/products/water-troughs/wccp-water-troughs-500-gallon-crop1-1024x731.jpg' },
  { slug: 'feed-troughs',                title: 'Feed Troughs.',                                     image: '/images/products/feed-troughs/wccp-feed-troughs-j-shape-single-sided-concrete-feed-trough.jpg' },
  { slug: 'footbaths',                   title: 'Footbaths.',                                        image: '/images/products/home/wccp-home-footbath-at-bath-and-west-show-scaled.jpg' },
  { slug: 'silage-clamp-walls',          title: 'Silage Clamp Walls.',                               image: '/images/products/concrete-panels/wccp-concrete-panels-prestressed-concrete-panels.jpg' },
  { slug: 'milking-robot-bases',         title: 'Milking Robot Bases.',                              image: '/images/products/lely-milking-robot-bases/wccp-lely-milking-robot-bases-lely-a4-sump-base-and-surround.png' },
  { slug: 'retaining-walls',             title: 'Retaining Walls.',                                  image: '/images/products/retaining-walls/wccp-retaining-walls-l-t-wall-1024x732.jpg' },
  { slug: 'prestressed-panels',          title: 'Prestressed Wall Panels.',                          image: '/images/products/concrete-panels/wccp-concrete-panels-prestressed-concrete-panels.jpg' },
  { slug: 'culverts',                    title: 'Box Culverts.',                                     image: '/images/products/culverts/wccp-culverts-20240308-121028-reduced-1024x768.jpg' },
  { slug: 'king-post-walls',             title: 'King Post Walls.',                                  image: '/images/products/home/wccp-home-20140615-193135-1024x768.jpg' },
  { slug: 'l-blocks',                    title: 'L-Block Walls.',                                    image: '/images/products/home/wccp-home-img-20260414-162319990-comp-1024x1024.jpg' },
  { slug: 'cantilever-walls',            title: 'Cantilever Walls.',                                 image: '/images/products/retaining-walls/wccp-retaining-walls-l-t-wall-1024x732.jpg' },
  { slug: 'padstones',                   title: 'Padstones & Bearings.',                             image: '/images/products/home/wccp-home-padstones.jpg' },
  { slug: 'vehicle-pits',                title: 'Vehicle Inspection Pits.',                          image: '/images/products/automotive-work-pit/wccp-automotive-work-pit-auto-pit-1-sqr-1-1024x1024.jpg' },
  { slug: 'cubicle-end-walls',           title: 'Cubicle End Walls.',                                image: '/images/products/cubicles/wccp-cubicles-portable-cubicles-1024x768.jpg' },
  { slug: 'sand-channels',               title: 'V-Section Sand Channels.',                          image: '/images/products/slurry-handling/wccp-slurry-handling-channel.jpg' },
  { slug: 'heelstone-coping',            title: 'Heelstone Coping.',                                 image: '/images/products/home/wccp-home-padstones.jpg' },
  { slug: 'clean-rooms',                 title: 'Clean Rooms.',                                      image: '/images/products/clean-rooms.jpg' },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSvgOverlay(title) {
  // Forest-green gradient overlay + title + brand marks.
  const t = escapeXml(title);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1F3D2E" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#1F3D2E" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0A2014" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <!-- WCCP heritage stamp top-left -->
  <g transform="translate(56, 56)">
    <circle cx="40" cy="40" r="38" fill="#F6F1E7" stroke="#B85C38" stroke-width="2"/>
    <circle cx="40" cy="40" r="32" fill="none" stroke="#B85C38" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>
    <text x="40" y="36" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="14" font-weight="700" font-style="italic" fill="#1F3D2E">WCCP</text>
    <text x="40" y="52" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#B85C38" letter-spacing="1">SINCE 1971</text>
  </g>
  <!-- Title bottom-left -->
  <text x="56" y="${H - 110}" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="500" font-size="64" fill="#F6F1E7" letter-spacing="-1.5">${t}</text>
  <text x="56" y="${H - 56}" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="600" fill="#F6F1E7" opacity="0.85" letter-spacing="2">PRECAST · NORTH DEVON · SINCE 1971</text>
  <!-- wordmark bottom-right -->
  <text x="${W - 56}" y="${H - 56}" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="700" fill="#F6F1E7" letter-spacing="0.5">wccp.co.uk</text>
</svg>`;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function buildCard(card) {
  const imgPath = join(PUBLIC, card.image.replace(/^\//, ''));
  const fallback = join(PUBLIC, 'og-default.png');
  const src = (await exists(imgPath)) ? imgPath : fallback;

  const base = sharp(src)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.85 });

  const overlaySvg = Buffer.from(buildSvgOverlay(card.title));
  const out = await base.composite([{ input: overlaySvg, top: 0, left: 0 }]).png().toBuffer();

  const dest = join(OUT, `${card.slug}.png`);
  await writeFile(dest, out);
  console.log('  ✓', `og/${card.slug}.png`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`Generating ${cards.length} OG cards →`, OUT);
  for (const c of cards) {
    try {
      await buildCard(c);
    } catch (err) {
      console.error('  ✗', c.slug, err.message);
    }
  }
  console.log('Done.');
}

main().catch((e) => { console.error(e); process.exit(1); });
