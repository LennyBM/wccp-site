// Map of product slugs to imported image assets.
// Used by ProductIllustration component (preferred), product page hero blocks,
// and grid cards. If a slug has no entry here, the SVG illustration fallback
// from ProductIllustration.astro is rendered instead.
//
// Images live under `src/assets/images/` so that Astro's `astro:assets`
// pipeline can optimise them (AVIF/WebP/JPEG, responsive sources, intrinsic
// width/height to prevent CLS).
//
// As of 2026-05-10, ALL previously-mapped images have been quarantined as
// AI-generated pending real WCCP yard photography. Slugs now fall back to the
// hand-drawn SVG architectural-section diagram in ProductIllustration.astro.

import type { ImageMetadata } from 'astro';

export const productImages: Record<string, ImageMetadata> = {};

// Sector-level hero images — currently no real WCCP photo available; pages
// fall back to placeholders or to product-yard photos.
export const sectorImages: Record<string, ImageMetadata> = {};

// Sector card images — placeholders until real WCCP yard photography lands.
export const sectorCardImages: Record<string, ImageMetadata> = {};

// Product short captions (alt text + visible labels)
export const productCaptions: Record<string, string> = {
  'cattle-cubicles':     'Holstein-Friesian dairy cows resting in precast concrete cubicles',
  'slurry-storage':      'Aerial view of a circular precast concrete slurry store on a Devon dairy farm',
  'milking-robot-bases': 'Stainless steel robotic milking unit on a precast concrete plinth',
  'prestressed-panels':  'WCCP prestressed precast concrete wall panels stacked at the Holsworthy yard, North Devon',
  'retaining-walls':     'King post precast concrete retaining wall under construction',
  'king-post-walls':     'Steel I-beam king posts with precast concrete panels installed between',
  'l-blocks':            'Stacked L-shaped precast concrete blocks holding back grain on a Devon farm',
  'cantilever-walls':    'Cantilever precast concrete retaining wall on a UK earthworks site',
  'silage-clamp-walls':  'Aerial view of a precast concrete silage clamp with green silage and tractor',
  'feed-troughs':        'Holstein dairy cattle feeding at a WCCP precast concrete feed trough on a Devon farm',
  'water-troughs':       '500-gallon WCCP precast concrete drinking trough — 3930 × 1285 × 800mm, 2,340kg',
  'footbaths':           'Holstein cows walking through a fresh blue copper-sulphate footbath at the parlour exit',
  'culverts':            'WCCP precast concrete box culvert sections on-site, ready for installation',
  'bespoke':             'Cured precast concrete posts and lintels stacked on pallets at the WCCP Holsworthy yard',
  'cubicle-end-walls':   '3-row precast concrete cubicle bed with end-wall water trough installed in a South West dairy shed',
  'clean-rooms':         'Stainless steel robotic milking unit on a precast concrete plinth',
};
