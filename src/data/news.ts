// News posts — single source of truth used by /news index, the RSS feed, and
// any cross-linking on the site. Add posts here; both views pick them up.

export type NewsPost = {
  slug: string;          // route slug; '#' for stub posts that don't yet have a body page
  category: 'Company news' | 'Trade show' | 'Industry update' | 'Product launch';
  date: string;          // human-readable, e.g. '15 April 2026'
  iso: string;           // ISO date, e.g. '2026-04-15'
  title: string;
  excerpt: string;
  imageDescription: string; // brief — used in 📷 Photo needed placeholder until real photography lands
};

export const newsPosts: NewsPost[] = [
  {
    slug: 'sig-round-4-deadline-2026',
    category: 'Industry update',
    date: '15 April 2026',
    iso: '2026-04-15',
    title: 'SIG Round 4 — what farmers need to know before 30 September 2026.',
    excerpt:
      'The Slurry Infrastructure Grant Round 4 is open — £74 million on the table, deadline 30 September 2026. Here is what to look at first if you might apply.',
    imageDescription: 'Aerial drone shot of a completed slurry storage tank on a Devon dairy farm — WCCP installed.',
  },
  {
    slug: 'chilsworthy-yard-modernisation',
    category: 'Company news',
    date: '1 March 2026',
    iso: '2026-03-01',
    title: 'Inside our 2023 move to Chilsworthy.',
    excerpt:
      '46 jobs, modern plant, a new circular-economy footprint — and the Severn Trent biogas neighbour that helps make it work. The story of the move from Shebbear.',
    imageDescription: 'Wide shot of the Chilsworthy yard from above showing the casting beds, batching plant and stockyard.',
  },
  {
    slug: 'example-post',
    category: 'Company news',
    date: '12 March 2026',
    iso: '2026-03-12',
    title: 'New 46-job yard opens at Holsworthy.',
    excerpt:
      'After two years of planning and a winter of fit-out, the new yard near Chilsworthy is open. Better moulds, better cranes, more capacity — and 46 new jobs for North Devon.',
    imageDescription: 'Group photo of the WCCP team in front of the new Chilsworthy yard signage on opening day.',
  },
  {
    slug: '#',
    category: 'Trade show',
    date: '04 March 2026',
    iso: '2026-03-04',
    title: 'Dairy-Tech 2026 — what we saw and showed.',
    excerpt:
      'Three days at the NAEC Stoneleigh. Highlights: more interest than ever in slurry covers, plenty of robot-base questions, and a steady queue at the cubicle stand.',
    imageDescription: 'WCCP stand at Dairy-Tech 2026 with cubicle and trough display, team members talking to visitors.',
  },
  {
    slug: '#',
    category: 'Industry update',
    date: '20 February 2026',
    iso: '2026-02-20',
    title: 'SIG Round 4 confirmed — £74m, closes 30 September.',
    excerpt:
      "DEFRA have confirmed the Slurry Infrastructure Grant Round 4 details. We've updated our guide and our calculator to match the new eligibility rules.",
    imageDescription: 'Close-up shot of a finished slurry channel installation with prestressed wall panels behind.',
  },
  {
    slug: '#',
    category: 'Trade show',
    date: '15 January 2026',
    iso: '2026-01-15',
    title: 'LAMMA 2026 — see us on Stand 4.730.',
    excerpt:
      "We're back at LAMMA at the NEC. Cubicles, troughs, and the full slurry range on display. Bring your drawings and we'll quote on the stand.",
    imageDescription: 'WCCP team at LAMMA stand 4.730 with branded backdrop and product samples.',
  },
  {
    slug: '#',
    category: 'Product launch',
    date: '08 January 2026',
    iso: '2026-01-08',
    title: 'New 280mm prestressed panel — proven for deep slurry.',
    excerpt:
      'Our new 280mm prestressed panel is now in stock. Engineered for slurry depths to 4.5m, with the same lifting and joint detail as the rest of the range.',
    imageDescription: 'Stack of 280mm prestressed panels in the Chilsworthy yard with crane in background, showing scale.',
  },
  {
    slug: '#',
    category: 'Trade show',
    date: '02 December 2025',
    iso: '2025-12-02',
    title: 'Royal Cornwall, Devon County, Bath & West — 2026 dates.',
    excerpt:
      "Show season is back. Here's where you'll find us: Royal Cornwall, Devon County, Bath & West, North Devon, Great Yorkshire and the Royal Welsh.",
    imageDescription: 'Photo from a previous county show — WCCP stand with footbath display and team in branded polos.',
  },
  {
    slug: '#',
    category: 'Industry update',
    date: '14 November 2025',
    iso: '2025-11-14',
    title: 'FETF 2026 — the items we expect to be eligible.',
    excerpt:
      "DEFRA hasn't published the FETF 2026 list yet, but here's our read on which of our products are likely to qualify based on the 2024 and 2025 rounds.",
    imageDescription: 'Photo of a DEFRA-eligible product such as a feed trough or footbath in situ on a working farm.',
  },
  {
    slug: '#',
    category: 'Company news',
    date: '28 October 2025',
    iso: '2025-10-28',
    title: 'Jake passed his C+E — and other yard wins.',
    excerpt:
      "Driver Jake passed his C+E ticket this month. We sponsored the training because he's the right person and the right person is worth investing in.",
    imageDescription: 'Photo of driver Jake with his C+E pass certificate, ideally beside one of the WCCP delivery lorries.',
  },
];
