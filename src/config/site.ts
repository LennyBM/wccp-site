// Single source of truth for site-wide configuration.
// Used in <head> meta, schema.org, footer, contact pages, etc.

export const site = {
  name: 'West Country Concrete Products',
  shortName: 'WCCP',
  legalName: 'West Country Concrete Products Limited',
  companyNumber: '06987338',
  founded: '1971',
  url: 'https://westcountryconcreteproducts.co.uk',
  shortUrl: 'wccp.co.uk',
  description:
    'UK precast concrete manufacturer in Holsworthy, North Devon. Cattle cubicles, slurry storage, retaining walls, prestressed panels, milking robot bases, bespoke precast — delivered nationwide across the UK and into Europe.',
  tagline: 'Precast concrete, cast in North Devon. Made to last.',
  shortTagline: 'Made in North Devon since 1971',

  contact: {
    phone: '01409 281437',
    phoneIntl: '+441409281437',
    mobile: '07970 520123',
    mobileIntl: '+447970520123',
    whatsapp: '+447970520123', // confirm at meeting
    email: 'info@wccp.co.uk',
    quotesEmail: 'quotes@wccp.co.uk',
    accountsEmail: 'accounts@wccp.co.uk',
  },

  address: {
    street: 'Off Andigestion Lane',
    locality: 'Chilsworthy',
    town: 'Holsworthy',
    region: 'Devon',
    postcode: 'EX22 7HH',
    country: 'GB',
    countryName: 'United Kingdom',
    // Approximate; correct with exact coords post-meeting
    geo: { latitude: 50.8120, longitude: -4.3540 },
  },

  hours: {
    weekdays: '07:30–17:00',
    weekend: 'Closed',
    openingHoursSpec: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '17:00',
      },
    ],
  },

  socials: {
    facebook: 'https://www.facebook.com/westcountryconcreteproducts',
    linkedin: '', // create at launch
    youtube: '',  // create at launch
  },

  // Areas served — used in LocalBusiness schema and location-page generation.
  // WCCP delivers UK-wide and into Europe (recent jobs: Germany, Netherlands,
  // the Outer Hebrides). Cast in North Devon, but the lorries don't stop at
  // the Tamar.
  areasServed: [
    'United Kingdom',
    'Devon', 'Cornwall', 'Somerset', 'Dorset', 'Wiltshire',
    'Scotland', 'Wales', 'Northern Ireland',
    'Republic of Ireland',
    'Germany', 'Netherlands', 'France', 'Belgium',
  ],

  // Accreditations to confirm at meeting
  accreditations: [
    // { name: 'ISO 9001', body: 'BSI', valid: true },
    // { name: 'ISO 14001', body: 'BSI', valid: true },
    // { name: 'CHAS', body: 'CHAS', valid: true },
    // { name: 'Constructionline', body: 'Constructionline', tier: 'Gold', valid: true },
    // confirm at meeting
  ],
} as const;

export type SiteConfig = typeof site;
