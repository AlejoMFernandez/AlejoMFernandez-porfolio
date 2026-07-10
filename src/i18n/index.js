import { ref } from 'vue'

export const LOCALES = ['es', 'en', 'pt']

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null
export const locale = ref(LOCALES.includes(stored) ? stored : 'es')

if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
}

export function setLocale(l) {
  if (!LOCALES.includes(l)) return
  locale.value = l
  try {
    localStorage.setItem('locale', l)
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') document.documentElement.lang = l
}

/** Resolve a { es, en, pt } object (from data) to the current locale. */
export function l(value) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[locale.value] ?? value.es ?? Object.values(value)[0] ?? ''
}

const dict = {
  es: {
    nav_about: 'Sobre mí',
    nav_projects: 'Proyectos',
    nav_contact: 'Contacto',
    nav_cta: 'Trabajemos juntos',

    hero_chip: 'Disponible para nuevos proyectos',
    hero_title_1: 'Diseño y desarrollo sitios web',
    hero_title_2: 'que se ven bien y funcionan mejor.',
    hero_lead:
      'Construyo landing pages, tiendas online y aplicaciones a medida para marcas y negocios que quieren destacarse.',
    hero_cta_projects: 'Ver proyectos',
    hero_cta_whatsapp: 'Hablemos por WhatsApp',

    about_eyebrow: 'Sobre mí',
    about_h2: 'Detrás de cada proyecto hay una persona, no una plantilla.',
    about_p2:
      'Trabajo como freelance diseñando y desarrollando sitios y aplicaciones a medida. Cuido cada detalle y la experiencia de quien los usa, para que tu proyecto no sea uno más, sino uno que se recuerde.',
    about_cta: 'Trabajemos juntos →',

    projects_title: 'Proyectos',
    projects_subtitle:
      'Una selección de trabajos: sitios para clientes reales, aplicaciones y piezas donde exploro diseño y desarrollo.',

    card_visit: 'Ver sitio',
    card_code: 'Código',
    card_dev: 'En desarrollo',

    tipo_WEBAPP: 'Aplicación web',
    tipo_LANDING: 'Landing page',
    tipo_FRONTEND: 'Frontend',
    tipo_ABM: 'Sistema de gestión',
    tipo_WORDPRESS: 'WordPress',
    tipo_PWA: 'PWA',
    tipo_INTRANET: 'Intranet',

    contact_title: '¿Tenés un proyecto en mente?',
    contact_lead: 'Contame qué necesitás y armamos algo juntos. Respondo rápido.',
    contact_cta_whatsapp: 'Escribime por WhatsApp',
  },
  en: {
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    nav_cta: "Let's work together",

    hero_chip: 'Available for new projects',
    hero_title_1: 'I design and build websites',
    hero_title_2: 'that look great and work even better.',
    hero_lead:
      'I build landing pages, online stores and custom apps for brands and businesses that want to stand out.',
    hero_cta_projects: 'View projects',
    hero_cta_whatsapp: "Let's talk on WhatsApp",

    about_eyebrow: 'About me',
    about_h2: "Behind every project there's a person, not a template.",
    about_p2:
      'I work as a freelancer designing and building custom websites and apps. I care about every detail and the experience of whoever uses them, so your project is not just another one, but one that gets remembered.',
    about_cta: "Let's work together →",

    projects_title: 'Projects',
    projects_subtitle:
      'A selection of work: sites for real clients, apps and pieces where I explore design and development.',

    card_visit: 'Visit site',
    card_code: 'Code',
    card_dev: 'In progress',

    tipo_WEBAPP: 'Web app',
    tipo_LANDING: 'Landing page',
    tipo_FRONTEND: 'Frontend',
    tipo_ABM: 'Management system',
    tipo_WORDPRESS: 'WordPress',
    tipo_PWA: 'PWA',
    tipo_INTRANET: 'Intranet',

    contact_title: 'Have a project in mind?',
    contact_lead: "Tell me what you need and we'll build it together. I reply fast.",
    contact_cta_whatsapp: 'Message me on WhatsApp',
  },
  pt: {
    nav_about: 'Sobre mim',
    nav_projects: 'Projetos',
    nav_contact: 'Contato',
    nav_cta: 'Vamos trabalhar juntos',

    hero_chip: 'Disponível para novos projetos',
    hero_title_1: 'Desenho e desenvolvo sites',
    hero_title_2: 'que ficam ótimos e funcionam ainda melhor.',
    hero_lead:
      'Construo landing pages, lojas online e aplicações sob medida para marcas e negócios que querem se destacar.',
    hero_cta_projects: 'Ver projetos',
    hero_cta_whatsapp: 'Vamos falar no WhatsApp',

    about_eyebrow: 'Sobre mim',
    about_h2: 'Por trás de cada projeto há uma pessoa, não um template.',
    about_p2:
      'Trabalho como freelancer desenhando e desenvolvendo sites e aplicações sob medida. Cuido de cada detalhe e da experiência de quem os usa, para que seu projeto não seja só mais um, mas um que seja lembrado.',
    about_cta: 'Vamos trabalhar juntos →',

    projects_title: 'Projetos',
    projects_subtitle:
      'Uma seleção de trabalhos: sites para clientes reais, aplicações e peças onde exploro design e desenvolvimento.',

    card_visit: 'Ver site',
    card_code: 'Código',
    card_dev: 'Em desenvolvimento',

    tipo_WEBAPP: 'Aplicação web',
    tipo_LANDING: 'Landing page',
    tipo_FRONTEND: 'Frontend',
    tipo_ABM: 'Sistema de gestão',
    tipo_WORDPRESS: 'WordPress',
    tipo_PWA: 'PWA',
    tipo_INTRANET: 'Intranet',

    contact_title: 'Tem um projeto em mente?',
    contact_lead: 'Conta o que você precisa e criamos algo juntos. Respondo rápido.',
    contact_cta_whatsapp: 'Me escreve no WhatsApp',
  },
}

/** Translate a UI string key for the current locale. */
export function t(key) {
  const table = dict[locale.value] || dict.es
  return table[key] ?? dict.es[key] ?? key
}
