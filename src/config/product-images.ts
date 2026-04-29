// Map of product slugs to imported image assets.
// Used by ProductIllustration component (preferred), product page hero blocks,
// and grid cards. If a slug has no entry here, the SVG illustration fallback
// from ProductIllustration.astro is rendered instead.
//
// Images live under `src/assets/images/` so that Astro's `astro:assets`
// pipeline can optimise them (AVIF/WebP/JPEG, responsive sources, intrinsic
// width/height to prevent CLS).

import type { ImageMetadata } from 'astro';

import cattleCubicles      from '@/assets/images/products/cattle-cubicles.jpg';
import slurryStorage       from '@/assets/images/products/slurry-storage.jpg';
import milkingRobotBases   from '@/assets/images/products/milking-robot-bases.jpg';
import prestressedPanels   from '@/assets/images/products/prestressed-panels.jpg';
import retainingWalls      from '@/assets/images/products/retaining-walls.jpg';
import kingPostWalls       from '@/assets/images/products/king-post-walls.jpg';
import lBlocks             from '@/assets/images/products/l-blocks.jpg';
import cantileverWalls     from '@/assets/images/products/cantilever-walls.jpg';
import silageClampWalls    from '@/assets/images/products/silage-clamp-walls.jpg';
import feedTroughs         from '@/assets/images/products/feed-troughs.jpg';
import waterTroughs        from '@/assets/images/products/water-troughs.jpg';
import footbaths           from '@/assets/images/products/footbaths.jpg';
import culverts            from '@/assets/images/products/culverts.jpg';
import bespoke             from '@/assets/images/products/bespoke.jpg';
import cubicleEndWalls     from '@/assets/images/products/cubicle-end-walls.jpg';
import cleanRooms          from '@/assets/images/products/clean-rooms.jpg';

import sectorAgricultural  from '@/assets/images/sector-agricultural.jpg';
import sectorCivils        from '@/assets/images/sector-civils.jpg';
import sectorBespoke       from '@/assets/images/sector-bespoke.jpg';

import agriculturalCard    from '@/assets/images/cards/agricultural-card.jpg';
import civilsCard          from '@/assets/images/cards/civils-card.jpg';
import bespokeCard         from '@/assets/images/cards/bespoke-card.jpg';

export const productImages: Record<string, ImageMetadata> = {
  'cattle-cubicles':         cattleCubicles,
  'slurry-storage':          slurryStorage,
  'milking-robot-bases':     milkingRobotBases,
  'prestressed-panels':      prestressedPanels,
  'retaining-walls':         retainingWalls,
  'king-post-walls':         kingPostWalls,
  'l-blocks':                lBlocks,
  'cantilever-walls':        cantileverWalls,
  'silage-clamp-walls':      silageClampWalls,
  'feed-troughs':            feedTroughs,
  'water-troughs':           waterTroughs,
  'footbaths':               footbaths,
  'culverts':                culverts,
  'bespoke':                 bespoke,
  'cubicle-end-walls':       cubicleEndWalls,
  'clean-rooms':             cleanRooms,
};

// Sector-level hero images
export const sectorImages: Record<string, ImageMetadata> = {
  'agricultural': sectorAgricultural,
  'civils':       sectorCivils,
  'bespoke':      sectorBespoke,
};

// Sector card images (shown on homepage 4:3 cards)
export const sectorCardImages: Record<string, ImageMetadata> = {
  'agricultural': agriculturalCard,
  'civils':       civilsCard,
  'bespoke':      bespokeCard,
};

// Product short captions (alt text + visible labels)
export const productCaptions: Record<string, string> = {
  'cattle-cubicles':     'Holstein-Friesian dairy cows resting in precast concrete cubicles',
  'slurry-storage':      'Aerial view of a circular precast concrete slurry store on a Devon dairy farm',
  'milking-robot-bases': 'Stainless steel robotic milking unit on a precast concrete plinth',
  'prestressed-panels':  'Stack of prestressed precast concrete wall panels with strand ends visible',
  'retaining-walls':     'King post precast concrete retaining wall under construction',
  'king-post-walls':     'Steel I-beam king posts with precast concrete panels installed between',
  'l-blocks':            'Stacked L-shaped precast concrete blocks holding back grain on a Devon farm',
  'cantilever-walls':    'Cantilever precast concrete retaining wall on a UK earthworks site',
  'silage-clamp-walls':  'Aerial view of a precast concrete silage clamp with green silage and tractor',
  'feed-troughs':        'Holstein cows feeding from precast concrete feed troughs in a Devon dairy shed',
  'water-troughs':       'Cattle drinking from a precast concrete water trough at golden hour',
  'footbaths':           'Holstein cows walking through a fresh blue copper-sulphate footbath at the parlour exit',
  'culverts':            'Two large precast concrete box culverts being installed by a crawler crane',
  'bespoke':             'Worker demoulding a bespoke architectural precast concrete element at the WCCP factory',
  'cubicle-end-walls':   'Close-up of a Holstein-Friesian cow at a precast concrete feed trough',
  'clean-rooms':         'Stainless steel robotic milking unit on a precast concrete plinth',
};
