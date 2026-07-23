import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    label: z.string(),
    title: z.string(),
    intro: z.string(),
    date: z.date().optional(), // fallback only; real "updated" date is derived from git history at build time
  }),
});

// Paid directory listings for tour operators — shown on /operators and
// can be surfaced as "featured" cards elsewhere on the site.
const operators = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    logo: z.string().optional(),
    website: z.string().url(),
    tier: z.enum(['featured', 'standard']).default('standard'),
    active: z.boolean().default(true),
    // Paid listing window — lets Janvier see at a glance who's still current.
    startDate: z.date(),
    endDate: z.date().optional(),
    order: z.number().default(100),
  }),
});

// Banner ad slots sold directly to local businesses (separate from Google AdSense).
const sponsors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bannerImage: z.string(),
    website: z.string().url(),
    // Where this banner is allowed to appear.
    placement: z.enum(['homepage', 'guides', 'tours', 'sitewide']).default('sitewide'),
    active: z.boolean().default(true),
    startDate: z.date(),
    endDate: z.date().optional(),
    order: z.number().default(100),
  }),
});

// Destination pages (/destinations/[slug]). Also used to drive the
// homepage route section and map popups for anything with onRoute: true.
const destinations = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    label: z.string(), // small category tag, e.g. "Safari", "Lake Kivu"
    tag: z.string().optional(), // route-day badge, e.g. "DAY 1-2", "START/END"
    heroImage: z.string(),
    intro: z.string(),
    highlights: z.array(z.string()).default([]),
    bestTimeTitle: z.string().optional(),
    bestTimeText: z.string().optional(),
    infoBoxTitle: z.string().optional(),
    infoBoxText: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    onRoute: z.boolean().default(false), // shown in the classic 7-day loop on the homepage
    order: z.number().default(100),
  }),
});

// Tour packages (/tours).
const tours = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagPill: z.string(),
    description: z.string(),
    duration: z.string(),
    price: z.string(),
    image: z.string(),
    order: z.number().default(100),
  }),
});

// YouTube videos (/videos) — links out to the Jenzzly channel content.
const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    youtubeUrl: z.string().url(),
    description: z.string().optional(),
    publishedDate: z.date().optional(),
    order: z.number().default(100),
  }),
});

// Singleton, per-page editable content. Each entry is one file (see
// src/content/pages/*.yaml) with only the fields that page uses.
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    label: z.string().optional(),
    heading: z.string().optional(),
    subheading: z.string().optional(),
    intro: z.array(z.string()).optional(),

    // home
    heroLabel: z.string().optional(),
    heroTitle: z.string().optional(),
    heroSub: z.string().optional(),
    introLabel: z.string().optional(),
    introHeading: z.string().optional(),
    servicesLabel: z.string().optional(),
    servicesHeading: z.string().optional(),
    stats: z.array(z.object({ number: z.string(), suffix: z.string().optional(), label: z.string() })).optional(),
    services: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string(), link: z.string(), linkText: z.string() })).optional(),
    testimonialQuote: z.string().optional(),
    testimonialAuthor: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHeading: z.string().optional(),
    ctaButtons: z.array(z.object({ label: z.string(), link: z.string() })).optional(),

    // visa
    visaTypes: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string(), fee: z.string(), processing: z.string() })).optional(),
    requirementGroups: z.array(z.object({ icon: z.string(), title: z.string(), intro: z.string(), items: z.array(z.string()), footnote: z.string() })).optional(),
    steps: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string() })).optional(),
    notes: z.array(z.string()).optional(),

    // contact
    supportOptions: z.array(z.object({ amount: z.string(), label: z.string() })).optional(),
    contactChannels: z.array(z.object({ icon: z.string(), title: z.string(), detail: z.string(), url: z.string() })).optional(),

    // free-form markdown body (privacy policy, etc.)
    body: z.string().optional(),
  }),
});

export const collections = { guides, operators, sponsors, destinations, tours, videos, pages };
