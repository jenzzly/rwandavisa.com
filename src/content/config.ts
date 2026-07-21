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

export const collections = { guides, operators, sponsors };
