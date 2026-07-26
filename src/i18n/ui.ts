import type { Locale } from './utils';

/** UI micro-copy that isn't part of section content (nav, card labels, etc). */
export const ui = {
  es: {
    'skip': 'Saltar al contenido',
    'nav.cta': 'Trabajemos juntos',
    'card.visit': 'Ver sitio',
    'card.code': 'Código',
    'card.dev': 'En desarrollo',
    'type.WEBAPP': 'Aplicación web',
    'type.LANDING': 'Landing page',
    'type.FRONTEND': 'Frontend',
    'type.ABM': 'Sistema de gestión',
    'type.WORDPRESS': 'WordPress',
    'type.GAME': 'Juego',
    'footer.rights': 'Todos los derechos reservados.',
  },
  en: {
    'skip': 'Skip to content',
    'nav.cta': "Let's talk",
    'card.visit': 'Visit site',
    'card.code': 'Code',
    'card.dev': 'In progress',
    'type.WEBAPP': 'Web app',
    'type.LANDING': 'Landing page',
    'type.FRONTEND': 'Frontend',
    'type.ABM': 'Management system',
    'type.WORDPRESS': 'WordPress',
    'type.GAME': 'Game',
    'footer.rights': 'All rights reserved.',
  },
} as const;

type UIKey = keyof (typeof ui)['es'];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui.es[key] ?? key;
  };
}
