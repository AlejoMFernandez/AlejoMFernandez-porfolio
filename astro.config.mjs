// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Absolute base for canonical URLs, OG tags and sitemap. Deploy target: Vercel.
  site: 'https://alejomfernandez.com.ar',

  // Static output: every route emits a real .html with content in <body>.
  output: 'static',

  // ── i18n ────────────────────────────────────────────────────────────────
  // Three locales declared so helpers/types know them all.
  // Only `es` (default, no prefix) and `en` are PUBLISHED (they have pages).
  // `pt-br` is declared but has no page yet → 404 until we add content.
  // NO `fallback`: we don't want pt-br serving Spanish (duplicate content).
  i18n: {
    locales: ['es', 'en', { path: 'pt-br', codes: ['pt-BR', 'pt'] }],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false, // ES lives at "/", not "/es"
      redirectToDefaultLocale: false,
    },
  },

  // ── Images ──────────────────────────────────────────────────────────────
  // Responsive images are stable in Astro 7 (were experimental in v5).
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  // ── Fonts ───────────────────────────────────────────────────────────────
  // Native Fonts API (stable in v7): downloads + self-hosts Manrope, no CDN,
  // font-display: swap by default. Served from /_astro/fonts.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [400, 600, 700, 800],
      styles: ['normal'],
      fallbacks: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
  ],

  // ── Integrations ──────────────────────────────────────────────────────────
  integrations: [
    sitemap({
      // Only the published locales go in the sitemap + hreflang.
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-AR', en: 'en-US' },
      },
    }),
  ],
});
