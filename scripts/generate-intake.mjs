// One-shot generator for src/data/intake-questions.ts.
// Re-run with `node scripts/generate-intake.mjs` if intake list grows.
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'src', 'data', 'intake-questions.ts');

const products = [
  ['ad-plant-components', 'AD Plant Components'],
  ['ad-plant-tanks', 'AD Plant Tanks'],
  ['architectural-panels', 'Architectural Panels'],
  ['bespoke', 'Bespoke (catch-all)'],
  ['bridge-beams', 'Bridge Beams'],
  ['cantilever-walls', 'Cantilever Walls'],
  ['cattle-cubicles', 'Cattle Cubicles'],
  ['cattle-drinkers', 'Cattle Drinkers'],
  ['cattle-grids', 'Cattle Grids'],
  ['cattle-slats', 'Cattle Slats / Gang Slats'],
  ['clean-rooms', 'Clean Room Enclosures'],
  ['cubicle-end-walls', 'Cubicle End Walls'],
  ['culverts', 'Box Culverts'],
  ['custom-plinths', 'Custom Plinths / Equipment Bases'],
  ['dish-channels', 'Dish Channels'],
  ['feed-stop-walling', 'Feed-Stop Walling'],
  ['feed-troughs', 'Feed Troughs'],
  ['footbaths', 'Footbaths'],
  ['grain-store-walls', 'Grain Store Walls'],
  ['headwalls-wing-walls', 'Headwalls & Wing Walls'],
  ['heelstone-coping', 'Heelstone Coping'],
  ['interlocking-blocks', 'Interlocking / Betonblocks'],
  ['kerbs', 'Kerbs (half-batter, bullnose)'],
  ['king-post-walls', 'King Post Walls'],
  ['l-blocks', 'L-Blocks'],
  ['lintels', 'Lintels'],
  ['milking-robot-bases', 'Milking Robot Bases'],
  ['padstones', 'Padstones & Bearings'],
  ['parlour-bases', 'Parlour Bases'],
  ['pipe-culverts', 'Pipe Culverts'],
  ['portable-cubicles', 'Portable Cubicles'],
  ['prestressed-panels', 'Prestressed Panels'],
  ['rapid-fit-blocks', 'Rapid Fit Retaining Blocks'],
  ['retaining-walls', 'Retaining Walls (general)'],
  ['sand-channels', 'Sand Channels (V-section)'],
  ['silage-clamp-walls', 'Silage Clamp Walls'],
  ['slatted-lids', 'Slatted Lids'],
  ['slurry-channels', 'Slurry Channels'],
  ['slurry-storage', 'Slurry Storage'],
  ['soakaways-chambers', 'Soakaways & Chambers'],
  ['tetrapods', 'Tetrapods (coastal armour)'],
  ['vehicle-pits', 'Vehicle Inspection Pits'],
  ['ventilated-floors', 'Ventilated Drying Floors'],
  ['water-troughs', 'Water Troughs'],
  ['weighbridge-bases', 'Weighbridge Bases'],
];

const galleryAngles = [
  ['hero', 'Hero — product in situ on a finished job, front-quarter, working scale visible'],
  ['detail-texture', 'Detail / texture close-up — surface finish, edge detail, or interlocking joint'],
  ['stack-yard', 'Stack in the yard — multiple units stacked, ready for despatch'],
  ['in-manufacture', 'In manufacture — being cast or de-moulded at Chilsworthy'],
  ['loaded-delivery', 'Loaded for delivery — on the back of the WCCP lorry'],
  ['drawing-profile', 'Drawing / profile — technical illustration or dimensioned line drawing'],
  ['end-use-scenario', 'End-use scenario — long shot of the working environment'],
  ['people-interaction', 'People interaction — operator, farmer, or contractor working with the product'],
  ['secondary-angle', 'Secondary angle / variant — alternative size, finish or configuration'],
];

const caseStudies = [
  ['trewartha-farm-dairy', 'Trewartha Farm dairy', true],
  ['boscastle-beef-shed', 'Boscastle beef shed', true],
  ['ashford-estate-civils', 'Ashford Estate civils', true],
  ['higgins-civils-roundabout', 'Higgins civils roundabout', true],
  ['henley-railway-footbridge', 'Henley railway footbridge', true],
  ['wessex-ad-plant', 'Wessex AD plant', true],
  ['example-dairy-farm', 'Example dairy farm (placeholder template)', true],
  ['manor-farm-dairy', 'Manor Farm Dairy', false],
  ['higher-beara-farm', 'Higher Beara Farm', false],
  ['trewithen-barton', 'Trewithen Barton', false],
  ['a30-highway-works', 'A30 highway works', false],
  ['polmorla-ad-plant', 'Polmorla AD plant', false],
];

const items = [];

// =============================================================
// 1. Team
// =============================================================
const teamMembers = [
  ['kim', 'Kim Rumsam', false, 'Managing Director'],
  ['matthew', 'Matthew', true, 'Co-director — Operations'],
  ['mark', 'Mark', true, 'Co-director — Engineering'],
  ['claire', 'Claire Mumford', false, 'Office & Operations'],
  ['paige', 'Paige', true, 'Sales & Customer Liaison'],
  ['yard-foreman', '[Name to confirm] Yard Foreman', true, 'Yard Foreman'],
  ['production-manager', '[Name to confirm] Production Manager', true, 'Production Manager'],
  ['jake', 'Jake', true, 'HIAB Driver / Logistics Lead'],
  ['qs-estimator', '[Name to confirm] QS / Estimator', true, 'QS / Estimator'],
];

for (const [slug, name, isPlaceholder, currentRole] of teamMembers) {
  items.push({
    id: `team-${slug}-surname`,
    category: 'team',
    subcategory: `team — ${name}`,
    question: `Confirm full surname for ${name}`,
    type: 'text',
    priority: 1,
    currentValue: name,
    sourceFiles: ['src/pages/team.astro', 'src/pages/about.astro'],
  });
  items.push({
    id: `team-${slug}-role`,
    category: 'team',
    subcategory: `team — ${name}`,
    question: `Confirm exact job title / role for ${name}`,
    type: 'text',
    priority: 1,
    currentValue: currentRole,
    sourceFiles: ['src/pages/team.astro'],
  });
  items.push({
    id: `team-${slug}-pronouns`,
    category: 'team',
    subcategory: `team — ${name}`,
    question: `Preferred pronouns for ${name}`,
    type: 'text',
    priority: 2,
    currentValue: slug === 'kim' ? 'he/him' : '',
    sourceFiles: ['src/pages/team.astro'],
  });
  items.push({
    id: `team-${slug}-bio`,
    category: 'team',
    subcategory: `team — ${name}`,
    question: `Sign off short bio / tagline for ${name}`,
    type: 'longtext',
    priority: 2,
    currentValue: '(see /team page for current draft)',
    sourceFiles: ['src/pages/team.astro'],
  });
  items.push({
    id: `team-${slug}-show-publicly`,
    category: 'team',
    subcategory: `team — ${name}`,
    question: `Should ${name} be shown publicly on the website?`,
    type: 'confirm',
    priority: 1,
    currentValue: 'yes (assumed)',
    sourceFiles: ['src/pages/team.astro'],
  });
  items.push({
    id: `team-${slug}-portrait`,
    category: 'team',
    subcategory: `team — ${name}`,
    question: `Head-and-shoulders portrait of ${name} (plain background, daylight)`,
    type: 'photo',
    priority: 2,
    currentValue: '',
    sourceFiles: ['src/pages/team.astro', 'PHOTOGRAPHY_SHOT_LIST.md'],
  });
}

items.push({
  id: 'team-kim-title-preference',
  category: 'team',
  subcategory: 'team — Kim',
  question: "Kim's preferred title (Director? MD? Owner?)",
  type: 'text',
  priority: 1,
  currentValue: 'Managing Director',
  sourceFiles: ['MEETING_AGENDA_THURSDAY.md'],
});

items.push({
  id: 'team-group-shot',
  category: 'team',
  subcategory: 'team — group',
  question: 'Whole-team group photo in front of yard signage or finished product stack',
  type: 'photo',
  priority: 1,
  currentValue: '',
  sourceFiles: ['src/pages/about.astro', 'src/pages/factory.astro', 'PHOTOGRAPHY_SHOT_LIST.md'],
});

items.push({
  id: 'team-anyone-not-public',
  category: 'team',
  subcategory: 'team — privacy',
  question: 'Is there anyone on the team we should NOT show publicly?',
  type: 'longtext',
  priority: 1,
  currentValue: '',
  sourceFiles: ['MEETING_AGENDA_THURSDAY.md'],
});

// =============================================================
// 2. Factory specs
// =============================================================
const factoryFields = [
  ['silo-count', 'Exact silo count at Chilsworthy', 'text', 1],
  ['water-tower-count', 'Water tower count and capacity', 'text', 1],
  ['workshop-count', 'Workshop count / dimensions', 'text', 1],
  ['batching-capacity', 'Concrete batching capacity (m³/day or tonnes/day)', 'text', 1],
  ['casting-bed-count', 'Casting bed count at the new yard', 'text', 1],
  ['crane-capacity', 'Crane capacity (HIAB / overhead)', 'text', 1],
  ['fleet-size', 'Fleet size — how many delivery lorries?', 'text', 1],
  ['yard-footprint', 'Yard footprint — total acreage of Chilsworthy site', 'text', 1],
  ['move-in-month', 'When did WCCP move into Chilsworthy (we have 2023, need month)?', 'text', 2],
  ['hiab-spec', 'HIAB lorry specification (reach, lift)', 'text', 2],
  ['mould-count', 'Approx number of moulds in the bay', 'text', 3],
  ['qc-lab-equipment', 'QC lab equipment list (cube test, slump test, etc.)', 'longtext', 2],
  ['biogas-link', "Severn Trent biogas circular-economy story — confirm details for /factory and news", 'longtext', 2],
];
for (const [slug, q, type, priority] of factoryFields) {
  items.push({
    id: `factory-${slug}`,
    category: 'factory',
    subcategory: 'factory — capacity & specs',
    question: q,
    type,
    priority,
    currentValue: '',
    sourceFiles: ['src/pages/factory.astro', 'MEETING_AGENDA_THURSDAY.md'],
  });
}

// =============================================================
// 3. Accreditations
// =============================================================
const accreds = [
  ['ce-ukca-cert', 'CE/UKCA — supply current cert numbers (for footer/legal pages)', 'text', 1, 'currently shown as live'],
  ['bs-en-14992', 'BS EN 14992 — confirm live, supply cert reference', 'text', 1, 'currently shown as live'],
  ['bs-8500-2023', 'BS 8500-1:2023 — confirm live, supply cert reference', 'text', 1, 'currently shown as live'],
  ['eurocode-2', 'BS EN 1992 (Eurocode 2) — confirm live', 'confirm', 1, 'currently shown as live'],
  ['iso-9001', 'ISO 9001 — what is the timeline? (currently pending)', 'text', 1, 'pending'],
  ['iso-14001', 'ISO 14001 — what is the timeline? (currently pending)', 'text', 1, 'pending'],
  ['iso-45001', 'ISO 45001 — what is the timeline? (currently pending)', 'text', 1, 'pending'],
  ['bes-6001', 'BES 6001 — what is the timeline? (currently pending)', 'text', 2, 'pending'],
  ['mpa-precast', 'MPA Precast — applying for membership, or drop?', 'decision', 1, 'placeholder on site'],
  ['made-in-britain', 'Made in Britain — applying, or drop?', 'decision', 1, 'placeholder on site'],
  ['ffa-vcs', 'FFA-VCS — accredited?', 'confirm', 2, ''],
  ['constructionline', 'ConstructionLine — accredited? Tier?', 'confirm', 2, ''],
  ['achilles', 'Achilles — accredited?', 'confirm', 2, ''],
  ['chas', 'CHAS — accredited?', 'confirm', 2, ''],
  ['other-accreds', 'Any other accreditations we are missing?', 'longtext', 2, ''],
];
for (const [slug, q, type, priority, currentValue] of accreds) {
  items.push({
    id: `accred-${slug}`,
    category: 'accreditations',
    subcategory: 'accreditations',
    question: q,
    type,
    priority,
    currentValue,
    sourceFiles: ['src/config/site.ts', 'src/components/AccreditationBadges.astro', 'src/pages/standards.astro', 'MEETING_AGENDA_THURSDAY.md'],
  });
}

// =============================================================
// 4. Contact details
// =============================================================
const contact = [
  ['phone-office', 'Confirm office phone number', 'text', 1, '01409 281437'],
  ['phone-mobile', 'Confirm mobile number', 'text', 1, '07970 520123'],
  ['whatsapp-number', 'Confirm WhatsApp Business number', 'text', 1, '+447970520123'],
  ['whatsapp-verified', 'Has the WhatsApp Business account been verified?', 'confirm', 1, 'whatsappVerified: false'],
  ['email-info', 'Confirm general email address', 'text', 1, 'info@wccp.co.uk'],
  ['email-quotes', 'Confirm quotes email address', 'text', 1, 'quotes@wccp.co.uk'],
  ['email-engineering', 'Confirm engineering email address', 'text', 1, 'engineering@wccp.co.uk'],
  ['email-accounts', 'Confirm accounts email address', 'text', 1, 'accounts@wccp.co.uk'],
  ['address-street', 'Confirm street line of yard address', 'text', 1, 'Off Andigestion Lane'],
  ['address-locality', 'Confirm locality', 'text', 1, 'Chilsworthy'],
  ['address-town', 'Confirm post town', 'text', 1, 'Holsworthy'],
  ['address-postcode', 'Confirm postcode', 'text', 1, 'EX22 7HH'],
  ['address-geo', 'Confirm exact geo coordinates (currently approximate)', 'text', 2, '50.8120, -4.3540'],
  ['secondary-yard', 'Any secondary yard / depot we should list?', 'text', 3, ''],
];
for (const [slug, q, type, priority, currentValue] of contact) {
  items.push({
    id: `contact-${slug}`,
    category: 'contact',
    subcategory: 'contact details',
    question: q,
    type,
    priority,
    currentValue,
    sourceFiles: ['src/config/site.ts', 'MEETING_AGENDA_THURSDAY.md'],
  });
}

// =============================================================
// 5. Hours
// =============================================================
const hours = [
  ['weekday', 'Confirm Mon-Fri opening hours', 'text', 1, '07:30–17:00'],
  ['saturday', 'Saturday morning opening?', 'decision', 1, 'Currently closed'],
  ['sunday', 'Sunday opening?', 'decision', 2, 'Currently closed'],
  ['bank-holidays', 'How should bank holidays be handled?', 'text', 2, ''],
  ['shutdown-dates', 'Holiday shutdown dates (Christmas, summer)?', 'text', 2, ''],
];
for (const [slug, q, type, priority, currentValue] of hours) {
  items.push({
    id: `hours-${slug}`,
    category: 'hours',
    subcategory: 'opening hours',
    question: q,
    type,
    priority,
    currentValue,
    sourceFiles: ['src/config/site.ts', 'MEETING_AGENDA_THURSDAY.md'],
  });
}

// =============================================================
// 6. Companies House / brand identity
// =============================================================
const brand = [
  ['company-number', 'Confirm Companies House number', 'text', 1, '06987338', 'src/config/site.ts'],
  ['legal-name', 'Confirm registered legal name', 'text', 1, 'West Country Concrete Products Limited', 'src/config/site.ts'],
  ['founded-year', 'Confirm founded year', 'text', 1, '1971', 'src/config/site.ts'],
  ['previous-name', 'Confirm previous trading name; any active legacy searches?', 'confirm', 2, 'South Molton Concrete Products Limited', 'src/config/site.ts'],
  ['logo-vector', 'Vector / SVG version of current logo', 'file', 1, 'currently rendered as rounded navy square + yellow text', 'src/components/Logo.astro'],
  ['logo-current', 'Confirm current logo design is correct', 'confirm', 1, 'rounded navy square + yellow text', 'src/components/Logo.astro'],
  ['palette-navy', 'Confirm primary navy hex', 'confirm', 2, '#3a5cb5', 'tailwind.config.mjs'],
  ['palette-yellow', 'Confirm vivid yellow hex', 'confirm', 2, '#fff005', 'tailwind.config.mjs'],
  ['palette-offwhite', 'Confirm off-white hex', 'confirm', 2, '#FBFAF7', 'tailwind.config.mjs'],
  ['typography', 'Confirm typography choice (Newsreader serif headlines, Inter body)', 'confirm', 2, 'Newsreader + Inter', 'src/styles/global.css'],
  ['brand-guidelines', 'Existing brand guidelines document (if any)', 'file', 3, '', '—'],
  ['linkedin', 'LinkedIn company page URL (currently empty)', 'text', 2, '', 'src/config/site.ts'],
  ['youtube', 'YouTube channel URL (currently empty)', 'text', 3, '', 'src/config/site.ts'],
  ['facebook-confirm', 'Confirm Facebook URL still correct', 'confirm', 2, 'https://www.facebook.com/westcountryconcreteproducts', 'src/config/site.ts'],
  ['instagram', 'Instagram handle (if any)', 'text', 3, '', 'src/components/Footer.astro'],
];
for (const [slug, q, type, priority, currentValue, source] of brand) {
  items.push({
    id: `brand-${slug}`,
    category: 'brand',
    subcategory: 'brand identity & schema',
    question: q,
    type,
    priority,
    currentValue,
    sourceFiles: [source].filter(Boolean),
  });
}

// =============================================================
// 7. Photo briefs — Priority 1 core brand
// =============================================================
const priority1Photos = [
  ['yard-aerial', 'Wide aerial of Chilsworthy yard (drone ~80m, cast beds + stockyard) — confirm existing shot is not AI', 'src/pages/index.astro'],
  ['sector-card-agri', 'Sector card photo — Agricultural (cubicle row in working dairy shed, cows in shot)', 'src/pages/index.astro'],
  ['sector-card-civils', 'Sector card photo — Civils (retaining wall install or culvert lift on contractor site)', 'src/pages/index.astro'],
  ['sector-card-bespoke', 'Sector card photo — Bespoke (one-off cast: heritage piece, panel, plant base)', 'src/pages/index.astro'],
  ['sector-hero-agri', 'Agricultural sector hero — finished dairy installation (slurry tank, cubicles, feed passage)', 'src/pages/sectors/agricultural.astro'],
  ['sector-hero-civils', 'Civils sector hero — highway / drainage / retaining wall job, finished and cleaned up', 'src/pages/sectors/civils.astro'],
  ['sector-hero-bespoke', 'Bespoke sector hero — architectural panel or unusual cast in situ', 'src/pages/sectors/bespoke.astro'],
  ['atmosphere-dairy', 'Atmosphere — dairy context (wide farm shot, cattle foreground, WCCP concrete in shot)', 'reused — agri pages'],
  ['atmosphere-loading', 'Atmosphere — WCCP delivery lorry being loaded at the yard', 'reused — factory page, news'],
];
for (const [slug, desc, source] of priority1Photos) {
  items.push({
    id: `photo-p1-${slug}`,
    category: 'photo',
    subcategory: 'photo — priority 1 core brand',
    question: desc,
    type: 'photo',
    priority: 1,
    currentValue: '',
    sourceFiles: [source, 'PHOTOGRAPHY_SHOT_LIST.md'],
  });
}

// =============================================================
// 8. Photo briefs — Priority 2 factory & facility
// =============================================================
const facilityPhotos = [
  ['silos-batching', 'Factory — silos & batching plant (silos, water tower, batching infrastructure)'],
  ['workshop-mould-bay', 'Factory — workshop / mould bay (mould being prepped or cast curing)'],
  ['casting-progress', 'Factory — casting in progress (a pour happening, hi-viz, action)'],
  ['finishing-work', 'Factory — finishing work (trowelling, edge work, attention-to-detail close-up)'],
  ['qc-lab', 'Factory — QC lab (cube test, slump test, lab equipment)'],
  ['biogas-circular', 'Factory — circular economy / Severn Trent biogas neighbour visual'],
  ['yard-panorama', 'Yard panorama — wide stockyard (stacks of finished panels, blocks, troughs)'],
  ['lorry-loading-detail', 'Detail of lorry loading sequence — HIAB lift, strapping down'],
  ['signage-yard-entrance', 'Yard entrance signage / branded gateway shot'],
];
for (const [slug, desc] of facilityPhotos) {
  items.push({
    id: `photo-facility-${slug}`,
    category: 'photo',
    subcategory: 'photo — factory / facility',
    question: desc,
    type: 'photo',
    priority: 1,
    currentValue: '',
    sourceFiles: ['src/pages/factory.astro', 'PHOTOGRAPHY_SHOT_LIST.md'],
  });
}

// =============================================================
// 9. Photo briefs — News articles
// =============================================================
const newsPhotos = [
  ['sig-r4-deadline', 'Aerial drone shot of completed slurry storage tank on a Devon dairy farm', 'src/pages/news/index.astro'],
  ['chilsworthy-modernisation', 'Wide of Chilsworthy yard from above (casting beds, batching plant, stockyard)', 'src/pages/news/chilsworthy-yard-modernisation.astro'],
  ['46-job-yard-opens', 'Group photo of WCCP team in front of new Chilsworthy yard signage on opening day', 'src/pages/news/example-post.astro'],
  ['dairy-tech-2026', 'WCCP stand at Dairy-Tech 2026 with cubicle and trough display, team talking to visitors', 'src/data/news.ts'],
  ['sig-r4-confirmed', 'Close-up of finished slurry channel installation with prestressed wall panels behind', 'src/data/news.ts'],
  ['lamma-2026', 'WCCP team at LAMMA stand 4.730 with branded backdrop and product samples', 'src/data/news.ts'],
  ['280mm-panel-launch', 'Stack of 280mm prestressed panels in Chilsworthy yard with crane in background', 'src/data/news.ts'],
  ['county-shows', 'Photo from a previous county show — WCCP stand with footbath display and team in branded polos', 'src/data/news.ts'],
  ['fetf-2026', 'DEFRA-eligible product (feed trough or footbath) in situ on a working farm', 'src/data/news.ts'],
  ['jake-c-and-e', 'Driver Jake with C+E pass certificate, ideally beside one of the WCCP delivery lorries', 'src/data/news.ts'],
  ['chilsworthy-yard-modernisation-secondary', 'Secondary photo for Chilsworthy yard modernisation news article', 'src/pages/news/chilsworthy-yard-modernisation.astro'],
];
for (const [slug, desc, source] of newsPhotos) {
  items.push({
    id: `photo-news-${slug}`,
    category: 'photo',
    subcategory: 'photo — news articles',
    question: desc,
    type: 'photo',
    priority: 2,
    currentValue: '',
    sourceFiles: [source, 'src/data/news.ts'],
  });
}

// =============================================================
// 10. Photo briefs — Product detail pages (45 products × 9 angles)
// =============================================================
for (const [slug, label] of products) {
  for (const [angle, angleDesc] of galleryAngles) {
    items.push({
      id: `photo-product-${slug}-${angle}`,
      category: 'photo',
      subcategory: `photo — products — ${label}`,
      question: `${label}: ${angleDesc}`,
      type: 'photo',
      priority: angle === 'hero' ? 1 : 2,
      currentValue: '',
      sourceFiles: [`src/pages/products/${slug}.astro`, 'PHOTOGRAPHY_SHOT_LIST.md'],
    });
  }
}

// =============================================================
// 11. Case studies — confirmation + permission + photos
// =============================================================
for (const [slug, name, exists] of caseStudies) {
  items.push({
    id: `case-study-${slug}-real`,
    category: 'case-study',
    subcategory: `case study — ${name}`,
    question: `Is this a real WCCP project? Can we publish details?`,
    type: 'confirm',
    priority: 1,
    currentValue: exists ? 'page exists on site' : 'mentioned in agenda only',
    sourceFiles: exists ? [`src/pages/case-studies/${slug}.astro`, 'MEETING_AGENDA_THURSDAY.md'] : ['MEETING_AGENDA_THURSDAY.md'],
  });
  items.push({
    id: `case-study-${slug}-permission`,
    category: 'case-study',
    subcategory: `case study — ${name}`,
    question: `Customer permission obtained to feature ${name} as a case study?`,
    type: 'confirm',
    priority: 1,
    currentValue: '',
    sourceFiles: ['MEETING_AGENDA_THURSDAY.md'],
  });
  items.push({
    id: `case-study-${slug}-content-signoff`,
    category: 'case-study',
    subcategory: `case study — ${name}`,
    question: `Sign off written copy for ${name} (challenge, solution, outcome, products supplied)`,
    type: 'longtext',
    priority: 2,
    currentValue: '',
    sourceFiles: exists ? [`src/pages/case-studies/${slug}.astro`] : [],
  });
  items.push({
    id: `case-study-${slug}-testimonial`,
    category: 'case-study',
    subcategory: `case study — ${name}`,
    question: `Testimonial quote from ${name} customer`,
    type: 'longtext',
    priority: 2,
    currentValue: '',
    sourceFiles: exists ? [`src/pages/case-studies/${slug}.astro`] : [],
  });
  for (const [angle, angleDesc] of [
    ['hero', 'Hero shot of finished installation'],
    ['mid-build', 'Mid-build progress shot'],
    ['detail', 'Detail of one specific element'],
    ['wide-context', 'Wide context shot showing scale'],
  ]) {
    items.push({
      id: `photo-case-${slug}-${angle}`,
      category: 'photo',
      subcategory: `photo — case study — ${name}`,
      question: `${name}: ${angleDesc}`,
      type: 'photo',
      priority: 2,
      currentValue: '',
      sourceFiles: [exists ? `src/pages/case-studies/${slug}.astro` : 'MEETING_AGENDA_THURSDAY.md', 'PHOTOGRAPHY_SHOT_LIST.md'],
    });
  }
}

// =============================================================
// 12. Content sign-off
// =============================================================
const contentSignoffs = [
  ['homepage-hero', 'Homepage hero copy: "Cast in Devon. Made to last a generation." — happy with this?', 'src/pages/index.astro'],
  ['homepage-stats-55-years', 'Homepage stat — "55 years" — accurate?', 'src/pages/index.astro'],
  ['homepage-stats-46-team', 'Homepage stat — "46 team members" — accurate?', 'src/pages/index.astro'],
  ['homepage-stats-500-farms', 'Homepage stat — "500+ farms" — accurate?', 'src/pages/index.astro'],
  ['homepage-testimonials', 'Three placeholder testimonials currently on homepage — replace with real customer quotes', 'src/pages/index.astro'],
  ['sectors-agri-message', 'Agricultural sector messaging — does it land for dairy + beef?', 'src/pages/sectors/agricultural.astro'],
  ['sectors-civils-message', 'Civils sector messaging — happy with highways/rail focus?', 'src/pages/sectors/civils.astro'],
  ['sectors-bespoke-message', 'Bespoke sector messaging — is "if it\'s precast we\'ll cast it" the right pitch?', 'src/pages/sectors/bespoke.astro'],
  ['about-page-copy', 'About page copy — sign off entire narrative', 'src/pages/about.astro'],
  ['factory-page-copy', 'Factory page copy — sign off (depends on specs above)', 'src/pages/factory.astro'],
  ['careers-page-copy', 'Careers page copy — current vacancies, what to send', 'src/pages/careers.astro'],
  ['community-page-copy', 'Community page copy — sponsorships, local engagement', 'src/pages/community.astro'],
  ['sustainability-page-copy', 'Sustainability page copy — biogas, circular economy claims', 'src/pages/sustainability.astro'],
  ['our-safety-page-copy', 'Our Safety page copy — RIDDOR record, safety claims, training', 'src/pages/our-safety.astro'],
  ['standards-page-copy', 'Standards page copy — sign off (depends on accred status)', 'src/pages/standards.astro'],
  ['standards-explained-copy', 'Standards explained copy — plain-English BS EN explainers', 'src/pages/standards-explained.astro'],
  ['conformity-page-copy', 'Conformity / Declaration of Performance page', 'src/pages/standards/conformity.astro'],
  ['products-list-46', 'Walk through the 46-product list — anything missing? anything to remove?', 'src/pages/products/index.astro'],
  ['products-discontinued', 'Any products currently listed that have been discontinued?', 'src/pages/products/index.astro'],
  ['products-top-sellers', 'Top 5 sellers — should they be more prominent on the site?', 'src/pages/products/index.astro'],
  ['areas-served-uk', 'Confirm 14 UK regions areas-served list', 'src/config/site.ts'],
  ['areas-served-europe', 'Confirm Europe presence (Germany, Netherlands, France, Belgium, Ireland) — how recent? How regular?', 'src/config/site.ts'],
  ['grants-fetf', 'FETF 2026 page — messaging accurate?', 'src/pages/grants'],
  ['grants-sig', 'SIG Round 4 page — messaging accurate?', 'src/pages/grants'],
  ['grants-slurry', 'Slurry Grant page — messaging accurate?', 'src/pages/grants'],
  ['grants-additional', 'Additional grants to add (Improving Farm Productivity, etc.)?', 'src/pages/grants'],
  ['guide-slurry-thickness', 'Slurry wall thickness (SSAFO 2018) guide — accurate?', 'src/pages/guides'],
  ['guide-cubicle-sizing', 'Cubicle sizing (AHDB 2024) guide — accurate?', 'src/pages/guides'],
  ['guide-retaining-types', 'Retaining wall types guide — accurate?', 'src/pages/guides'],
  ['guide-concrete-grades', 'Concrete grades guide — accurate?', 'src/pages/guides'],
  ['guide-prestressed-vs-reinforced', 'Prestressed vs reinforced guide — accurate?', 'src/pages/guides'],
  ['guide-fetf-2026', 'FETF 2026 guide — accurate?', 'src/pages/guides'],
  ['guide-sig-2026', 'SIG 2026 guide — accurate?', 'src/pages/guides'],
  ['guide-l-block-vs-cantilever', 'L-block vs cantilever guide — accurate?', 'src/pages/guides/l-block-vs-cantilever.astro'],
  ['guide-king-post', 'King post retaining walls guide — accurate?', 'src/pages/guides/king-post-retaining-walls.astro'],
  ['guide-padstone', 'Padstone sizing UK guide — accurate?', 'src/pages/guides/padstone-sizing-uk.astro'],
  ['guide-vehicle-pit', 'Vehicle inspection pit HSE guide — accurate?', 'src/pages/guides/vehicle-inspection-pit-hse.astro'],
  ['guide-bespoke-process', 'Bespoke precast process guide — accurate?', 'src/pages/guides/bespoke-precast-process.astro'],
  ['guides-additional', 'Any additional guides to commission?', 'src/pages/guides'],
  ['shows-list', 'Show appearances — confirm list (Royal Cornwall, Devon County, Bath & West, North Devon, Great Yorkshire, Royal Welsh, LAMMA, Dairy-Tech)', 'src/pages/news'],
  ['shows-stand-numbers', 'Stand numbers for each 2026 show', 'src/pages/news'],
  ['shows-2026-dates', '2026 confirmed dates for each show appearance', 'src/pages/news'],
  ['faqs-content', 'FAQs page — sign off questions and answers', 'src/pages/faqs.astro'],
  ['ai-information-page', '/ai-information page — sign off content for AI search', 'src/pages/ai-information.astro'],
  ['accessibility-page', 'Accessibility statement — confirm wording, contact for issues', 'src/pages/accessibility.astro'],
  ['complaints-procedure', 'Complaints procedure page — sign off', 'src/pages/complaints.astro'],
  ['privacy-policy', 'Privacy policy — sign off', 'src/pages/privacy.astro'],
  ['cookies-policy', 'Cookies policy — depends on CMP decision', 'src/pages/cookies.astro'],
  ['terms-conditions', 'Terms & conditions — supply company T&Cs PDF or text', 'src/pages/terms.astro'],
  ['warranty-statement', 'Standard warranty statement (currently on product pages)', 'src/components/ProductWarrantyLine.astro'],
  ['lead-time-default', 'Confirm default lead time copy ("4 weeks ahead")', 'src/config/site.ts'],
  ['reach-page-copy', '/reach page — confirm delivery range narrative', 'src/pages/reach.astro'],
  ['downloads-page-copy', '/downloads page — confirm CAD/BIM/spec sheets list', 'src/pages/downloads.astro'],
  ['quote-page-copy', '/quote page (multi-step quote builder) — confirm question set', 'src/pages/quote.astro'],
  ['contact-page-copy', '/contact page (multi-step wizard) — confirm intent options', 'src/pages/contact.astro'],
  ['press-strip-logos', 'PressStrip — confirm publications/clients shown', 'src/components/PressStrip.astro'],
  ['trust-strip', 'TrustStrip — confirm trust signals and stats', 'src/components/TrustStrip.astro'],
  ['cta-strip-copy', 'CTAStrip — confirm calls-to-action wording', 'src/components/CTAStrip.astro'],
];
for (const [slug, q, source] of contentSignoffs) {
  items.push({
    id: `signoff-${slug}`,
    category: 'content-signoff',
    subcategory: 'content sign-off',
    question: q,
    type: 'longtext',
    priority: 2,
    currentValue: '(see source page)',
    sourceFiles: [source, 'MEETING_AGENDA_THURSDAY.md'],
  });
}

// Per-product copy sign-off
for (const [slug, label] of products) {
  items.push({
    id: `signoff-product-${slug}`,
    category: 'content-signoff',
    subcategory: `content sign-off — products`,
    question: `Sign off product detail copy for ${label} (description, specs, dimensions, lead times)`,
    type: 'longtext',
    priority: 2,
    currentValue: '',
    sourceFiles: [`src/pages/products/${slug}.astro`],
  });
  items.push({
    id: `signoff-product-${slug}-specs`,
    category: 'content-signoff',
    subcategory: `content sign-off — products`,
    question: `Confirm technical specs / dimensions table for ${label}`,
    type: 'longtext',
    priority: 2,
    currentValue: '',
    sourceFiles: [`src/pages/products/${slug}.astro`],
  });
  items.push({
    id: `signoff-product-${slug}-cad`,
    category: 'content-signoff',
    subcategory: `content sign-off — products`,
    question: `CAD / BIM / PDF spec sheet for ${label}`,
    type: 'file',
    priority: 3,
    currentValue: '',
    sourceFiles: [`src/pages/products/${slug}.astro`, 'src/components/SpecDownloads.astro'],
  });
}

// Per-area page sign-off
const areas = ['cornwall', 'devon', 'somerset', 'dorset', 'wiltshire'];
for (const a of areas) {
  items.push({
    id: `signoff-area-${a}`,
    category: 'content-signoff',
    subcategory: 'content sign-off — area pages',
    question: `Sign off /areas/${a} copy and confirm 2-3 local case studies / customer types`,
    type: 'longtext',
    priority: 3,
    currentValue: '',
    sourceFiles: [`src/pages/areas/${a}.astro`],
  });
}

// Per-city concrete-supplier-* page sign-off
const cities = ['cornwall', 'devon', 'dorset', 'exeter', 'plymouth', 'salisbury', 'somerset', 'taunton', 'truro', 'yeovil'];
for (const c of cities) {
  items.push({
    id: `signoff-supplier-${c}`,
    category: 'content-signoff',
    subcategory: 'content sign-off — local SEO pages',
    question: `Sign off /concrete-supplier-${c} landing copy`,
    type: 'longtext',
    priority: 3,
    currentValue: '',
    sourceFiles: [`src/pages/concrete-supplier-${c}.astro`],
  });
}

// =============================================================
// 13. Operations — launch decisions
// =============================================================
const ops = [
  ['cookie-cmp-choice', 'CMP decision: CookieYes (~£10/m), Cookiebot (~£15/m), or build our own?', 'decision', 1, 'placeholder banner', 'src/components/CookieBanner.astro'],
  ['cookie-cmp-account', 'Action: Kim creates CMP account and supplies embed code', 'text', 1, '', 'src/components/CookieBanner.astro'],
  ['ga4-decision', 'Set up Google Analytics 4? (Free, requires consent management)', 'decision', 1, 'not configured', 'MEETING_AGENDA_THURSDAY.md'],
  ['ga4-measurement-id', 'Action: Kim creates GA4 property and supplies measurement ID (G-XXXXXX)', 'text', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['ms-clarity', 'Microsoft Clarity (free heatmaps) — yes or no?', 'decision', 3, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['gsc-verification', 'Google Search Console — supply verification meta tag from Kim\'s Google account', 'text', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['sentry-decision', 'Set up Sentry for production error monitoring? (Free tier OK)', 'decision', 2, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['sentry-dsn', 'Action: Kim creates Sentry project and supplies DSN', 'text', 2, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['domain-ownership', 'Confirm domain westcountryconcreteproducts.co.uk is registered to WCCP, with renewal dates', 'confirm', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['email-platform', 'Email provider: Microsoft 365? Google Workspace? Self-hosted?', 'decision', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['dns-access', 'DNS — who manages it? We need access to add Netlify records.', 'text', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['hosting-netlify-confirm', 'Confirm Netlify hosting OK', 'confirm', 1, 'currently planned for Netlify', 'netlify.toml'],
  ['domain-pointing-date', 'When do we point the domain to the new site?', 'text', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['launch-style', 'Soft launch (invite-only) or hard launch?', 'decision', 1, '', 'MEETING_AGENDA_THURSDAY.md'],
  ['form-recipient', 'Confirm primary inbox for Netlify form submissions', 'text', 1, '', 'src/pages/contact.astro, src/pages/quote.astro'],
  ['form-cc-agency', 'CC Peake Management on form submissions during retainer?', 'decision', 2, '', '—'],
];
for (const [slug, q, type, priority, currentValue, source] of ops) {
  items.push({
    id: `ops-${slug}`,
    category: 'operations',
    subcategory: 'operations & infrastructure',
    question: q,
    type,
    priority,
    currentValue,
    sourceFiles: [source].filter(Boolean),
  });
}

// =============================================================
// 14. Launch
// =============================================================
const launch = [
  ['target-launch-date', 'Target go-live date', 'text', 1, ''],
  ['announcement-newsletter', 'Newsletter announcement to existing customer list?', 'decision', 2, ''],
  ['announcement-social', 'Social media announcement plan (Facebook, LinkedIn)', 'longtext', 2, ''],
  ['announcement-email-blast', 'Customer email blast — list source and consent?', 'decision', 2, ''],
  ['post-launch-sla', 'Post-launch support SLA expected', 'text', 2, ''],
  ['retainer-decision', 'Monthly retainer for ongoing support after launch?', 'decision', 2, ''],
  ['post-launch-news-cadence', 'News article cadence post-launch (weekly, monthly?)', 'decision', 3, ''],
  ['google-business-profile', 'Google Business Profile claimed and up to date?', 'confirm', 2, ''],
  ['old-site-redirects', 'Old site URLs that need redirecting to new site (sitemap or list)', 'file', 2, ''],
];
for (const [slug, q, type, priority, currentValue] of launch) {
  items.push({
    id: `launch-${slug}`,
    category: 'launch',
    subcategory: 'launch planning',
    question: q,
    type,
    priority,
    currentValue,
    sourceFiles: ['MEETING_AGENDA_THURSDAY.md'],
  });
}

// =============================================================
// Emit TS file
// =============================================================
const header = `// Auto-generated by scripts/generate-intake.mjs.
// Source of truth for the /intake hub. Re-generate after content edits.

export type QuestionCategory =
  | 'team'
  | 'factory'
  | 'accreditations'
  | 'contact'
  | 'hours'
  | 'brand'
  | 'photo'
  | 'case-study'
  | 'content-signoff'
  | 'operations'
  | 'launch';

export type QuestionType =
  | 'text'
  | 'longtext'
  | 'photo'
  | 'video'
  | 'file'
  | 'decision'
  | 'confirm';

export interface Question {
  /** Unique slug, e.g. 'team-kim-title' */
  id: string;
  category: QuestionCategory;
  /** Sub-grouping for the intake UI, e.g. 'team — Kim'. */
  subcategory: string;
  /** Plain-English question / item the client must action. */
  question: string;
  type: QuestionType;
  /** 1 = blocking, 2 = important, 3 = nice-to-have. */
  priority: 1 | 2 | 3;
  /** Existing placeholder / current value the client can confirm or replace. */
  currentValue: string;
  /** Files where this placeholder/question surfaces. */
  sourceFiles: string[];
}

`;

const body = `export const intakeQuestions: Question[] = ${JSON.stringify(items, null, 2)};\n`;

writeFileSync(out, header + body, 'utf8');
console.log(`Wrote ${items.length} intake questions to ${out}`);

// counts
const byCat = items.reduce((acc, q) => { acc[q.category] = (acc[q.category] || 0) + 1; return acc; }, {});
console.log(JSON.stringify(byCat, null, 2));
