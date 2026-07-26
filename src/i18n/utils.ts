import { getRelativeLocaleUrl, getAbsoluteLocaleUrl } from 'astro:i18n';

/** Locales that are actually PUBLISHED (have pages). pt-BR is declared but not here. */
export const PUBLISHED_LOCALES = ['es', 'en'] as const;
export type Locale = (typeof PUBLISHED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_META: Record<Locale, { ogLocale: string; hreflang: string; label: string }> = {
  es: { ogLocale: 'es_AR', hreflang: 'es', label: 'ES' },
  en: { ogLocale: 'en_US', hreflang: 'en', label: 'EN' },
};

/** Which published locale a pathname belongs to. */
export function getCurrentLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

/**
 * Strip the locale prefix so we get the shared "page path" across locales.
 * "/en/about" → "/about", "/en" → "/", "/" → "/".
 */
export function getPagePath(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|pt-br)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

function toRel(pagePath: string): string {
  return pagePath === '/' ? '' : pagePath.replace(/^\//, '');
}

/** URL for the SAME page in another locale (used by the language switcher). */
export function localizedPath(locale: Locale, pagePath: string): string {
  return getRelativeLocaleUrl(locale, toRel(pagePath));
}

/**
 * hreflang alternates for the current page: one per published locale + x-default.
 * pt-BR is intentionally excluded until it has content.
 */
export function getAlternates(pagePath: string) {
  const rel = toRel(pagePath);
  const links = PUBLISHED_LOCALES.map((loc) => ({
    hreflang: LOCALE_META[loc].hreflang,
    href: getAbsoluteLocaleUrl(loc, rel),
  }));
  links.push({ hreflang: 'x-default', href: getAbsoluteLocaleUrl(DEFAULT_LOCALE, rel) });
  return links;
}

/** Absolute canonical URL for the current locale + page. */
export function getCanonical(locale: Locale, pagePath: string): string {
  return getAbsoluteLocaleUrl(locale, toRel(pagePath));
}
