import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * ── Sections ────────────────────────────────────────────────────────────────
 * Each locale's home is an ORDERED list of sections. ES and EN can have
 * different sections in different order (that's the whole point of FASE 2).
 * A discriminated union keeps each section type's shape validated.
 */
const heroSection = z.object({
  type: z.literal('hero'),
  chip: z.string().optional(),
  title: z.string(),
  titleAccent: z.string().optional(),
  lead: z.string(),
  ctaPrimary: z.object({ label: z.string(), href: z.string() }),
  ctaSecondary: z.object({ label: z.string(), href: z.string() }).optional(),
});

const aboutSection = z.object({
  type: z.literal('about'),
  eyebrow: z.string().optional(),
  heading: z.string(),
  body: z.array(z.string()),
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
});

const projectsSection = z.object({
  type: z.literal('projects'),
  heading: z.string(),
  subtitle: z.string().optional(),
});

const contactSection = z.object({
  type: z.literal('contact'),
  heading: z.string(),
  lead: z.string().optional(),
  ctaPrimary: z.object({ label: z.string(), href: z.string() }),
});

/** EN-exclusive: timezone overlap with US East/West coast (above the fold). */
const timezoneSection = z.object({
  type: z.literal('timezone'),
  heading: z.string(),
  subtitle: z.string().optional(),
  note: z.string().optional(),
});

/** EN-exclusive: how I work with agencies (white-label, comms, handoff). */
const howIWorkSection = z.object({
  type: z.literal('howiwork'),
  heading: z.string(),
  items: z.array(z.object({ title: z.string(), body: z.string() })),
});

/** EN-exclusive: scannable stack. */
const stackSection = z.object({
  type: z.literal('stack'),
  heading: z.string(),
  groups: z.array(z.object({ label: z.string(), items: z.array(z.string()) })),
});

/** EN-exclusive: weekly availability + start date. */
const availabilitySection = z.object({
  type: z.literal('availability'),
  heading: z.string(),
  body: z.string(),
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
});

const sectionSchema = z.discriminatedUnion('type', [
  heroSection,
  aboutSection,
  projectsSection,
  contactSection,
  timezoneSection,
  howIWorkSection,
  stackSection,
  availabilitySection,
]);

/**
 * ── home collection ─────────────────────────────────────────────────────────
 * One entry per locale (id = filename: "es", "en"). pt-br has no file yet →
 * not published. Add src/content/home/pt-br.json later, no refactor needed.
 */
const home = defineCollection({
  loader: glob({ base: './src/content/home', pattern: '**/*.json' }),
  schema: z.object({
    locale: z.enum(['es', 'en', 'pt-BR']),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogLocale: z.string(), // es_AR | en_US
      ogImage: z.string(), // absolute-from-root path, e.g. /images/og-es.jpg
    }),
    sections: z.array(sectionSchema),
  }),
});

/**
 * ── projects collection ─────────────────────────────────────────────────────
 * One shared array file. Each project carries BOTH framings:
 *  - es: business outcome (more inquiries, fewer calls)
 *  - en: what was delivered, timeframe, stack, handoff
 * Populated fully in FASE 3; schema is ready now.
 */
const projects = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    order: z.number(),
    // Which published audiences see this project. ES = business owners,
    // EN = agencies/dev leads. Defaults to both.
    locales: z.array(z.enum(['es', 'en'])).default(['es', 'en']),
    type: z.string(),
    client: z.string().nullable().optional(),
    inProgress: z.boolean().optional().default(false),
    url: z.string().nullable().optional(),
    repo: z.string().nullable().optional(),
    tech: z.array(z.string()),
    image: z.string(), // /images/projects/*.svg for now (real screenshots in FASE 3)
    bg: z.string().optional(),
    // Business framing (ES)
    es: z.object({
      summary: z.string(),
      outcome: z.string().optional(),
    }),
    // Agency framing (EN)
    en: z.object({
      summary: z.string(),
      delivered: z.string().optional(),
      timeframe: z.string().optional(),
      handoff: z.string().optional(),
    }),
  }),
});

export const collections = { home, projects };
