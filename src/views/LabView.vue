<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const particleBg = ref('')
const activePost = ref(null)

const statusLabels = {
  'posteado':      '✓ Posteado',
  'programado':    '⏰ Programado',
  'desarrollado':  '✔ Desarrollado',
  'en-desarrollo': '⚒ En desarrollo',
  'borrador':      '○ Borrador',
}

const posts = ['01 · Sobre Mí', '02 · Tipos de Web', '03 · ¿Cómo trabajo?', '04 · 5 Errores', '05 · Caso: FRANZA', '06 · Plantilla vs Medida']

const services = [
  'Sitios web a medida',
  'Sistemas de gestión',
  'Progressive Web Apps',
  'Integración de APIs',
  'Infraestructura IT',
]

const serviceCards = [
  { icon: '🌐', title: 'Web a medida' },
  { icon: '⚙️', title: 'Sistemas ABM' },
  { icon: '📱', title: 'PWA' },
  { icon: '🔌', title: 'APIs REST' },
  { icon: '☁️', title: 'Infra & Cloud' },
  { icon: '🛡️', title: 'Seguridad IT' },
]

const stackCategories = [
  { label: 'FRONT', color: '#38bdf8', items: ['Vue.js', 'Vite', 'Tailwind CSS', 'JavaScript'] },
  { label: 'BACK',  color: '#22c55e', items: ['PHP', 'Laravel', 'Node.js'] },
  { label: 'DATOS', color: '#a78bfa', items: ['Supabase', 'MySQL', 'PostgreSQL'] },
]

const techTags = ['Vue.js', 'Vite', 'Tailwind', 'JavaScript', 'PHP', 'Laravel', 'Supabase', 'MySQL', 'Git', 'Azure', 'PowerShell']

function generateParticleBg() {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1350
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, 1080, 1350)
  for (let i = 0; i < 160; i++) {
    const x = Math.random() * 1080
    const y = Math.random() * 1350
    const r = (Math.random() * 2.5 + 1.5) / 2
    const o = Math.random() * 0.5 + 0.25
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(136,136,136,${o})`
    ctx.fill()
  }
  particleBg.value = canvas.toDataURL('image/png')
}

const cardScale = ref(0.6)
function updateCardScale() {
  const availableWidth = window.innerWidth - 400  // arrows + left panel + padding
  const heightScale = (window.innerHeight - 80) / 1350
  const widthScale = Math.max(availableWidth, 400) / 1080
  cardScale.value = Math.min(0.82, heightScale, widthScale)
}

onMounted(() => {
  generateParticleBg()
  updateCardScale()
  updateStoryScale()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', updateCardScale)
  window.addEventListener('resize', updateStoryScale)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', updateCardScale)
  window.removeEventListener('resize', updateStoryScale)
})

const watermark = 'alejomfernandez.com.ar'

const carouselSlides = [
  { id: 'cover',    label: 'Portada',              type: 'cover'    },
  { id: 'intro',    label: '01 · Quién soy',        type: 'intro'    },
  { id: 'projects', label: '02 · Proyectos',        type: 'projects' },
  { id: 'stack',    label: '03 · Mi Stack',         type: 'stack'    },
  { id: 'personal', label: '04 · Fuera del código', type: 'personal' },
  { id: 'cta',      label: '05 · CTA',              type: 'cta'      },
]

const carouselProjects = [
  {
    name: 'GOALDEMY',
    desc: 'App de minijuegos de fútbol gamificada',
    url: 'goaldemy.vercel.app',
    tag: null,
  },
  {
    name: 'FRANZA',
    desc: 'Sistema web para constructora con panel admin',
    url: 'franza.com.ar',
    tag: null,
  },
  {
    name: 'PURAA',
    desc: 'Plataforma digital de contenido y comunidad',
    url: 'puraa.com.ar',
    tag: null,
  },
  {
    name: 'ARIANA DE VIAJE',
    desc: 'Blog personal de viajes y experiencias',
    url: null,
    tag: 'En desarrollo',
  },
]

const activeSlide = ref(0)

// ===== TIPOS DE WEB =====
const activeSlidePages = ref(0)
const paginasSlides = [
  { id: 'cover',     label: 'Portada'      },
  { id: 'landing',   label: 'Landing Page' },
  { id: 'ecommerce', label: 'E-Commerce'   },
  { id: 'webapp',    label: 'WebApp'       },
  { id: 'gestion',   label: 'Gestión'      },
  { id: 'cierre',    label: 'Cierre'       },
  { id: 'cta',       label: 'CTA'          },
]
const pageTypes = [
  {
    type: 'LANDING PAGE',
    iconPath: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46',
    headline: 'Una página. Un objetivo.',
    desc: 'Diseñada para convertir visitantes en clientes. Directa, visual y con un llamado a la acción claro.',
    use: 'Ideal para lanzar un servicio, campaña o producto.',
    url: 'italnet.com.ar',
    urlLabel: 'VER EJEMPLO HECHO POR MÍ',
    counter: '02',
  },
  {
    type: 'E-COMMERCE',
    iconPath: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z',
    headline: 'Tu tienda, abierta 24/7.',
    desc: 'Catálogo online, carrito de compras y pagos integrados. Vendé sin límites de horario ni geografía.',
    use: 'Ideal para vender productos físicos o digitales.',
    url: 'puraa.com.ar',
    urlLabel: 'VER EJEMPLO HECHO POR MÍ',
    counter: '03',
  },
  {
    type: 'WEB APP',
    iconPath: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25',
    headline: 'Software a medida.',
    desc: 'Una aplicación web personalizada para tu negocio. Gestioná datos, automatizá tareas y escalá con vos.',
    use: 'Ideal para plataformas, SaaS y sistemas internos.',
    url: 'goaldemy.vercel.app',
    urlLabel: 'VER EJEMPLO HECHO POR MÍ',
    counter: '04',
  },
  {
    type: 'SISTEMA DE GESTIÓN',
    iconPath: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z',
    headline: 'Control total de tu negocio.',
    desc: 'Panel admin, carga de datos, reportes y usuarios. Todo en un solo lugar, adaptado a tu empresa.',
    use: 'Ideal para empresas, constructoras y comercios.',
    url: 'franza.com.ar',
    urlLabel: 'VER EJEMPLO HECHO POR MÍ',
    counter: '05',
  },
]

// ===== CÓMO TRABAJO =====
const activeSlideProceso = ref(0)
const procesoSlides = [
  { id: 'cover',  label: 'Portada'        },
  { id: 'aviso',  label: 'Aviso'          },
  { id: 's1',     label: '01 · Contacto'  },
  { id: 's2',     label: '02 · Propuesta' },
  { id: 's3',     label: '03 · Diseño'    },
  { id: 's4',     label: '04 · Entrega'   },
  { id: 'cta',    label: 'CTA'            },
]
const procesoSteps = [
  { num: '01', title: 'Me contactás',              desc: 'Tenemos una primera llamada para entender qué necesitás: objetivos, referencias, alcance y presupuesto aproximado.', counter: '03' },
  { num: '02', title: 'Te presento una propuesta', desc: 'Preparo un plan detallado con alcance, tecnologías, tiempos estimados y precio final. Sin sorpresas.',             counter: '04' },
  { num: '03', title: 'Diseño y desarrollo',       desc: 'Wireframes, maqueta visual y construcción. Tenés acceso a una versión de prueba en todo momento para ver el progreso.', counter: '05' },
  { num: '04', title: 'Entrega y lanzamiento',     desc: 'Revisamos juntos, hacemos los últimos ajustes y lanzamos. Con soporte post-entrega incluido.',                         counter: '06' },
]

// ===== CASO REAL: FRANZA =====
const activeSlideFranza = ref(0)
const franzaSlides = [
  { id: 'cover',     label: 'Portada'      },
  { id: 'problema',  label: 'El problema'  },
  { id: 'solucion',  label: 'La solución'  },
  { id: 'screen1',   label: 'Panel admin'  },
  { id: 'screen2',   label: 'Formulario'   },
  { id: 'resultado', label: 'El resultado' },
  { id: 'cta',       label: 'CTA'          },
]

// ===== ¿CUÁNTO CUESTA UNA WEB? =====
const activeSlideCosto = ref(0)
const costoSlides = [
  { id: 'cover',    label: 'Portada'         },
  { id: 'honesta',  label: 'La respuesta'    },
  { id: 'option1',  label: 'Plantilla'       },
  { id: 'option2',  label: 'A medida'        },
  { id: 'factores', label: '¿Qué afecta el precio?' },
  { id: 'error',    label: 'El error común'  },
  { id: 'cta',      label: 'CTA'             },
]

// ===== HOSTING =====
const activeSlideHosting = ref(0)
const hostingSlides = [
  { id: 'cover',      label: 'Portada'        },
  { id: 'que',        label: '¿Qué es?'         },
  { id: 'compartido', label: 'Compartido'     },
  { id: 'vps',        label: 'VPS'            },
  { id: 'cloud',      label: 'Cloud'          },
  { id: 'cual',       label: '¿Cuál elegir?'   },
  { id: 'ojo',        label: 'Ojo con esto'   },
  { id: 'cta',        label: 'CTA'            },
]

// ===== 4 TIPOS DE WEB (carrusel) =====
const activeSlideTipos = ref(0)
const tiposSlides = [
  { id: 'cover',         label: 'Portada'         },
  { id: 'landing',       label: 'Landing Page'    },
  { id: 'institucional', label: 'Institucional'   },
  { id: 'ecommerce',     label: 'E-Commerce'      },
  { id: 'webapp',        label: 'Web App'         },
  { id: 'cta',           label: 'CTA'             },
]

// ===== CHECKLIST DEV =====
const activeSlideChecklist = ref(0)
const checklistSlides = [
  { id: 'cover', label: 'Portada'       },
  { id: 'p1',    label: 'Portfolio'     },
  { id: 'p2',    label: 'Proceso'       },
  { id: 'p3',    label: 'Qué incluye'   },
  { id: 'p4',    label: 'Propiedad'     },
  { id: 'p5',    label: 'Comunicación'  },
  { id: 'cta',   label: 'CTA'           },
]

// ===== WEB QUE NO VENDE =====
const activeSlideNoVende = ref(0)
const noVendeSlides = [
  { id: 'cover', label: 'Portada'       },
  { id: 'r1',    label: 'Sin CTA'       },
  { id: 'r2',    label: 'Carga lento'   },
  { id: 'r3',    label: 'No mobile'     },
  { id: 'r4',    label: 'Sin tráfico'   },
  { id: 'r5',    label: 'Sin confianza' },
  { id: 'cta',   label: 'CTA'           },
]

// ===== CLIENTE TE GOOGLEA =====
const activeSlideGooglea = ref(0)
const googleaSlides = [
  { id: 'cover', label: 'Portada' },
  { id: 'd1',    label: 'El dato' },
  { id: 'd2',    label: 'Sin web' },
  { id: 'd3',    label: 'Qué hace' },
  { id: 'cta',   label: 'CTA'    },
]

// ===== WEB BONITA ≠ CONVIERTE =====
const activeSlideBonita = ref(0)
const bonitaSlides = [
  { id: 'cover', label: 'Portada'    },
  { id: 'c1',    label: 'Velocidad'  },
  { id: 'c2',    label: 'Fotos'      },
  { id: 'c3',    label: 'Navegación' },
  { id: 'cta',   label: 'CTA'        },
]

// ===== MINI-GUÍA QUÉ WEB =====
const activeSlideMiniGuia = ref(0)
const miniGuiaSlides = [
  { id: 'cover',         label: 'Portada'     },
  { id: 'landing',       label: 'Emprendedor' },
  { id: 'institucional', label: 'Empresa'     },
  { id: 'ecommerce',     label: 'Productos'   },
  { id: 'webapp',        label: 'Procesos'    },
  { id: 'cta',           label: 'CTA'         },
]

// ===== SEO =====
const activeSlideSeo = ref(0)
const seoSlides = [
  { id: 'cover',  label: 'Portada'       },
  { id: 'que',    label: '¿Qué es?'        },
  { id: 'como',   label: 'Cómo funciona' },
  { id: 'claves', label: '3 claves'      },
  { id: 'tiempo', label: '¿Cuánto tarda?' },
  { id: 'cta',    label: 'CTA'           },
]

// ===== ¿NECESITO WEB O ALCANZA CON INSTAGRAM? =====
const activeSlideInsta = ref(0)
const instaSlides = [
  { id: 'cover',  label: 'Portada'        },
  { id: 'redes',  label: 'Redes Sociales' },
  { id: 'web',    label: 'Tu web'         },
  { id: 'comp',   label: 'Comparación'    },
  { id: 'answer', label: 'La respuesta'   },
  { id: 'cta',    label: 'CTA'            },
]

// ===== 5 PREGUNTAS =====
const activeSlidePreguntas = ref(0)
const preguntasSlides = [
  { id: 'cover', label: 'Portada'     },
  { id: 'p1',    label: 'Pregunta 01' },
  { id: 'p2',    label: 'Pregunta 02' },
  { id: 'p3',    label: 'Pregunta 03' },
  { id: 'p4',    label: 'Pregunta 04' },
  { id: 'p5',    label: 'Pregunta 05' },
  { id: 'cta',   label: 'CTA'         },
]

const preguntas = [
  {
    num: '01',
    q: '¿Qué incluye el precio y qué queda afuera?',
    why: 'Muchos presupuestos son "solo el diseño". Preguntá si incluye dominio, hosting, carga de contenido, adaptación mobile y correcciones. Lo que no está en el contrato, lo pagás después.',
  },
  {
    num: '02',
    q: '¿Puedo editar el contenido yo mismo después?',
    why: 'Si para cambiar una foto o un texto tenés que llamar al dev y pagarle, perdiste autonomía. Preguntá si viene con panel de administración o si el código es tuyo.',
  },
  {
    num: '03',
    q: '¿La web va a aparecer en Google?',
    why: 'El SEO básico debe estar incluido desde el día uno: título, descripción, velocidad y estructura. Pero aparcer en Google también requiere registrar tu URL en Google Search Console — algo que tu dev debería configurarte o enseñarte a hacer.',
  },
  {
    num: '04',
    q: '¿Qué pasa si el sitio falla después de la entrega?',
    why: 'El soporte post-entrega separa a un profesional de alguien que desaparece. Preguntá cuánto tiempo tiene garantía y qué tiene costo extra.',
  },
  {
    num: '05',
    q: '¿El diseño va a ser único o es una plantilla?',
    why: 'Muchos devs venden "diseño web" pero usan Wix, WordPress con tema comprado o un template de $29. Preguntarlo te ahorra la sorpresa de ver tu web duplicada en otros lados.',
  },
]

// ===== PLANTILLA VS A MEDIDA =====
const activeSlidePlantilla = ref(0)
const plantillaSlides = [
  { id: 'cover',     label: 'Portada'      },
  { id: 'plantilla', label: 'La plantilla' },
  { id: 'medida',    label: 'A medida'     },
  { id: 'comp',      label: 'Comparación'  },
  { id: 'pregunta',  label: 'Preg. clave'  },
  { id: 'cta',       label: 'CTA'          },
]

// ===== 5 ERRORES =====
const activeSlideErrores = ref(0)
const erroresSlides = [
  { id: 'cover', label: 'Portada'  },
  { id: 'e1p',   label: 'Error 01' },
  { id: 'e1s',   label: 'Fix 01'   },
  { id: 'e2p',   label: 'Error 02' },
  { id: 'e2s',   label: 'Fix 02'   },
  { id: 'e3p',   label: 'Error 03' },
  { id: 'e3s',   label: 'Fix 03'   },
  { id: 'e4p',   label: 'Error 04' },
  { id: 'e4s',   label: 'Fix 04'   },
  { id: 'e5p',   label: 'Error 05' },
  { id: 'e5s',   label: 'Fix 05'   },
  { id: 'cta',   label: 'CTA'      },
]
const errores = [
  {
    num: '01',
    title: 'Carga lenta',
    stat: '53% abandona si tarda más de 3 segundos.',
    desc: 'Una web lenta no solo frustra al usuario — Google te penaliza en el ranking. Velocidad es plata.',
    fix: 'Lazy loading + imágenes optimizadas.',
    fixDetail: [
      'Comprimí imágenes a WebP, menos de 200kb c/u.',
      'Activá lazy loading en imágenes y secciones pesadas.',
      'Una buena hosting + CDN corta el tiempo a la mitad.',
    ],
    solutionIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>',
  },
  {
    num: '02',
    title: 'Sin versión mobile',
    stat: 'Más del 70% del tráfico viene del celu.',
    desc: 'Si tu web se ve rota en el teléfono, ya perdiste a la mayoría de tus visitantes antes de que lean una línea.',
    fix: 'Diseño responsive desde el primer píxel.',
    fixDetail: [
      'Diseñá "mobile first": pensá en el celu antes que la PC.',
      'Probá siempre en dispositivo real antes de publicar.',
      'Los breakpoints de Tailwind hacen esto en minutos.',
    ],
    solutionIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3"/>',
  },
  {
    num: '03',
    title: 'Sin llamado a la acción',
    stat: '¿Qué tenía que hacer el visitante?',
    desc: 'El usuario entra, ve info, no sabe qué hacer y se va. Sin un botón claro, un formulario o un WhatsApp visible, perdés clientes sin darte cuenta.',
    fix: 'Un CTA claro y visible en cada pantalla.',
    fixDetail: [
      'Poné un botón de WhatsApp visible en todas las páginas.',
      'Usá verbos de acción: "Consultame", "Pedí precio".',
      'Un solo CTA claro convierte más que cinco opciones.',
    ],
    solutionIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    num: '04',
    title: 'Diseño desactualizado',
    stat: 'Entraron, vieron, se fueron.',
    desc: 'Una web vieja transmite descuido. El diseño es la primera impresión de tu marca — y las primeras impresiones no tienen segunda oportunidad.',
    fix: 'Rediseñar puede ser más barato de lo que pensás.',
    fixDetail: [
      'Una paleta de 2-3 colores consistentes ya transforma una web.',
      'Tipografía moderna + espaciado generoso = profesional.',
      'No necesitás rehacer todo: header y colores nuevos ya impactan.',
    ],
    solutionIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    num: '05',
    title: 'Sin dominio propio',
    stat: 'tuempresa.wix.com no transmite confianza.',
    desc: 'Un dominio propio cuesta menos de $10 USD al año. No tenerlo es la señal más clara de que el negocio no se toma en serio.',
    fix: 'Registrá tu dominio hoy.',
    fixDetail: [
      'Registrá en Namecheap o NIC Argentina (menos de $10/año).',
      'Lo ideal: tunegocio.com.ar — corto, memorable y local.',
      'Tu email también: vos@tunegocio.com vale oro en credibilidad.',
    ],
    solutionIcon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
]

const STORAGE_KEY = 'lab-post-statuses'

function loadStatuses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return {}
}

function saveStatuses() {
  const data = {}
  postsMeta.forEach(p => { data[p.num] = p.status.value })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ===== POST TYPES & ACCENT COLORS =====
const postTypes = {
  'personal':    { label: 'Personal',    color: '#38bdf8' }, // celeste — marca / sobre mí
  'informativo': { label: 'Informativo', color: '#a78bfa' }, // violeta — educativos / tips
  'caso':        { label: 'Caso real',   color: '#22c55e' }, // verde   — ejemplos / experiencias
  'comparacion': { label: 'Comparación', color: '#f59e0b' }, // amber   — comparaciones / vs
}

// ===== POST META + NAVIGATION =====
const savedStatuses = loadStatuses()
const postsMeta = [
  { num: '01', name: 'Sobre Mí',           type: 'personal',    status: ref(savedStatuses['01'] ?? 'en-desarrollo'), slides: carouselSlides,    slideRef: activeSlide          },
  { num: '02', name: 'Tipos de Web',        type: 'informativo', status: ref(savedStatuses['02'] ?? 'en-desarrollo'), slides: paginasSlides,     slideRef: activeSlidePages     },
  { num: '03', name: '¿Cómo trabajo?',      type: 'personal',    status: ref(savedStatuses['03'] ?? 'en-desarrollo'), slides: procesoSlides,     slideRef: activeSlideProceso   },
  { num: '04', name: '5 Errores',           type: 'informativo', status: ref(savedStatuses['04'] ?? 'en-desarrollo'), slides: erroresSlides,     slideRef: activeSlideErrores   },
  { num: '05', name: 'Caso: FRANZA',        type: 'caso',        status: ref(savedStatuses['05'] ?? 'borrador'),      slides: franzaSlides,      slideRef: activeSlideFranza    },
  { num: '06', name: 'Plantilla vs Medida', type: 'comparacion', status: ref(savedStatuses['06'] ?? 'borrador'),      slides: plantillaSlides,   slideRef: activeSlidePlantilla },
  { num: '07', name: '¿Cuánto cuesta una web?',               type: 'informativo', status: ref(savedStatuses['07'] ?? 'borrador'), slides: costoSlides,       slideRef: activeSlideCosto      },
  { num: '08', name: '5 preguntas antes de contratar un dev', type: 'informativo', status: ref(savedStatuses['08'] ?? 'borrador'), slides: preguntasSlides,   slideRef: activeSlidePreguntas  },
  { num: '09', name: '¿Necesito web o me alcanza con las redes?', type: 'comparacion', status: ref(savedStatuses['09'] ?? 'borrador'), slides: instaSlides, slideRef: activeSlideInsta },
  { num: '10', name: 'Hosting: qué es y cuál elegir',            type: 'informativo', status: ref(savedStatuses['10'] ?? 'borrador'), slides: hostingSlides, slideRef: activeSlideHosting },
  { num: '11', name: 'SEO: por qué tu web no aparece en Google', type: 'informativo', status: ref(savedStatuses['11'] ?? 'borrador'), slides: seoSlides,     slideRef: activeSlideSeo     },
  { num: '12', name: '4 tipos de web — ¿cuál necesitás?',          type: 'informativo', status: ref(savedStatuses['12'] ?? 'borrador'), slides: tiposSlides,     slideRef: activeSlideTipos     },
  { num: '13', name: 'Checklist: 5 preguntas antes de contratar dev', type: 'informativo', status: ref(savedStatuses['13'] ?? 'borrador'), slides: checklistSlides, slideRef: activeSlideChecklist },
  { num: '14', name: 'Pagaste una web y no te trajo un cliente',       type: 'informativo', status: ref(savedStatuses['14'] ?? 'borrador'), slides: noVendeSlides,   slideRef: activeSlideNoVende   },
  { num: '15', name: 'Tu cliente te googlea antes de llamarte',        type: 'informativo', status: ref(savedStatuses['15'] ?? 'borrador'), slides: googleaSlides,   slideRef: activeSlideGooglea   },
  { num: '16', name: 'Web bonita ≠ web que trae clientes',             type: 'comparacion', status: ref(savedStatuses['16'] ?? 'borrador'), slides: bonitaSlides,    slideRef: activeSlideBonita    },
  { num: '17', name: 'Mini-guía: ¿qué web necesita tu negocio?',       type: 'informativo', status: ref(savedStatuses['17'] ?? 'borrador'), slides: miniGuiaSlides,  slideRef: activeSlideMiniGuia  },
]

const statusCycle = ['borrador', 'en-desarrollo', 'desarrollado', 'programado', 'posteado']

// Dropdown abierto: { kind: 'post'|'story', idx: number } | null
const openStatusDropdown = ref(null)

function setStatus(i, val) {
  postsMeta[i].status.value = val
  saveStatuses()
  openStatusDropdown.value = null
}
function setStoryStatus(i, val) {
  storiesMeta[i].status.value = val
  saveStoryStatuses()
  openStatusDropdown.value = null
}
function toggleDropdown(kind, idx, e) {
  e.stopPropagation()
  const same = openStatusDropdown.value?.kind === kind && openStatusDropdown.value?.idx === idx
  openStatusDropdown.value = same ? null : { kind, idx }
}
function closeDropdown() { openStatusDropdown.value = null }

// ===== NOTAS POR POST =====
const NOTES_KEY = 'lab-post-notes'
function loadNotes() {
  try { const s = localStorage.getItem(NOTES_KEY); if (s) return JSON.parse(s) } catch {}
  return {}
}
const postNotes = ref(loadNotes()) // { '01': 'texto...', '07': 'texto...' }
function saveNote(num, text) {
  if (text.trim()) postNotes.value[num] = text
  else delete postNotes.value[num]
  localStorage.setItem(NOTES_KEY, JSON.stringify(postNotes.value))
}

// ===== IDEAS BACKLOG =====
const IDEAS_KEY = 'lab-ideas'
const defaultIdeas = [
  // ── Carruseles del calendario (semana 12-18 mayo) ──
  { id: 1,  title: '4 tipos de web — ¿cuál necesitás?',              type: 'informativo', desc: 'Carrusel: Landing / Web institucional / E-commerce / Web app. Cada slide = un tipo con cuándo usarlo. Meta: alcance (replica patrón ganador).', done: false },
  { id: 2,  title: 'Checklist antes de contratar un developer',       type: 'informativo', desc: 'Carrusel checklist: 5 preguntas que el dueño DEBE hacerle al dev antes de firmar. Meta: guardados.', done: false },
  { id: 3,  title: 'Pagaste una web y no te trajo un cliente',        type: 'informativo', desc: 'Carrusel: 5 razones por las que una web no convierte aunque esté "bien hecha". Sin tecnicismos. Meta: comentarios — terminar con "¿A vos te pasó esto?"', done: false },
  { id: 4,  title: 'Tu cliente te googlea antes de llamarte',         type: 'informativo', desc: 'Carrusel con datos de comportamiento del consumidor argentino. El cliente te busca aunque llegue por recomendación. Meta: guardados.', done: false },
  { id: 5,  title: 'Web bonita ≠ web que trae clientes',             type: 'comparacion', desc: 'Carrusel: diseño decorativo vs. diseño que convierte. Casos concretos. Meta: comentarios — toca el ego de quienes invirtieron en diseño.', done: false },
  { id: 6,  title: 'Mini-guía: qué web necesita tu negocio',          type: 'informativo', desc: 'Carrusel resumen: 4 tipos + cuánto cuesta cada una + cuál necesitás según tu negocio. El más completo de la semana. Meta: guardados.', done: false },
  // ── Ideas de posts futuros ──
  { id: 7,  title: 'Domínio propio vs .wix/.negocio',                type: 'comparacion', desc: '¿Tu web es tunegocio.wix.com o tunegocio.com? Qué diferencia hace en serio.',                       done: false },
  { id: 8,  title: '5 cosas que hacen lenta tu web',                 type: 'informativo', desc: 'Imágenes pesadas, hosting barato, plugins, etc. Muy compartible.',                                   done: false },
  { id: 9,  title: '¿Necesito tienda online o alcanza con catálogo?', type: 'comparacion', desc: 'Muchos negocios no necesitan Mercado Shops. Cuándo sí y cuándo no.',                              done: false },
  { id: 10, title: '¿Qué es el SSL y por qué tu web lo necesita?',   type: 'informativo', desc: 'El candadito verde. Qué es, cómo se consigue y qué pasa si no lo tenés.',                           done: false },
  { id: 11, title: 'Caso: [próximo cliente]',                        type: 'caso',        desc: 'Otro caso real con antes/después.',                                                                  done: false },
]
const savedIdeas = JSON.parse(localStorage.getItem(IDEAS_KEY) || 'null')
const ideas = ref(savedIdeas || defaultIdeas.map(i => ({ ...i })))
const showDoneIdeas = ref(false)
const newIdeaText = ref('')
const newIdeaType = ref('informativo')
const pendingIdeaId = ref(null)
const activeIdeas = computed(() => ideas.value.filter(i => !i.done))
const doneIdeas = computed(() => ideas.value.filter(i => i.done))
function saveIdeas() { localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas.value)) }
function toggleIdeaDone(id) {
  const idea = ideas.value.find(i => i.id === id)
  if (idea) { idea.done = !idea.done; saveIdeas() }
}
function deleteIdea(id) {
  ideas.value = ideas.value.filter(i => i.id !== id)
  saveIdeas()
}
function addIdea() {
  if (!newIdeaText.value.trim()) return
  const newId = ideas.value.length ? Math.max(...ideas.value.map(i => i.id)) + 1 : 1
  ideas.value.push({ id: newId, title: newIdeaText.value.trim(), type: newIdeaType.value, desc: '', done: false })
  newIdeaText.value = ''
  saveIdeas()
}

// ===== PRÓXIMO A PUBLICAR =====
const nextScheduled = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const entries = Object.entries(postDates.value)
    .map(([key, dateStr]) => ({ key, date: new Date(dateStr + 'T00:00:00') }))
    .filter(e => e.date >= today)
    .sort((a, b) => a.date - b.date)
  if (!entries.length) return null
  const { key, date } = entries[0]
  const isPost = key.startsWith('post-')
  const num = key.replace('post-', '').replace('story-', '')
  const meta = isPost
    ? postsMeta.find(p => p.num === num)
    : storiesMeta.find(s => s.num === num)
  if (!meta) return null
  const diffDays = Math.round((date - today) / 86400000)
  return { key, date, meta, isPost, diffDays }
})

// ===== FECHA EN CARDS (días hasta publicación) =====
function daysUntilPost(num, kind) {
  const key = kind === 'post' ? `post-${num}` : `story-${num}`
  const dateStr = postDates.value[key]
  if (!dateStr) return null
  const today = new Date(); today.setHours(0,0,0,0)
  const d = new Date(dateStr + 'T00:00:00')
  const diff = Math.round((d - today) / 86400000)
  return diff
}

// ===== GRID FILTERS =====
const gridFilter = ref('activos')

const filteredPosts = computed(() => {
  if (gridFilter.value === 'todos')    return postsMeta
  if (gridFilter.value === 'activos')  return postsMeta.filter(p => p.status.value !== 'posteado')
  return postsMeta.filter(p => p.status.value === gridFilter.value)
})

const filteredStories = computed(() => {
  if (gridFilter.value === 'todos')    return storiesMeta
  if (gridFilter.value === 'activos')  return storiesMeta.filter(s => s.status.value !== 'posteado')
  return storiesMeta.filter(s => s.status.value === gridFilter.value)
})

const statsPost = computed(() => ({
  total:       postsMeta.length,
  posteado:    postsMeta.filter(p => p.status.value === 'posteado').length,
  programado:  postsMeta.filter(p => p.status.value === 'programado').length,
  desarrollado:postsMeta.filter(p => p.status.value === 'desarrollado').length,
  enDesarrollo:postsMeta.filter(p => p.status.value === 'en-desarrollo').length,
  borrador:    postsMeta.filter(p => p.status.value === 'borrador').length,
}))
const postsCopy = {
  '01': {
    tiktokTitle: 'Soy el dev detrás del código. Conóceme en 60 segundos.',
    caption: `¿Quién está detrás del código? 👇\n\nSoy Alejo, desarrollador web freelance de Buenos Aires.\nTrabajo con dueños de negocios que quieren una web que realmente les sirva — que aparezca en Google, convierta visitantes en clientes y no sea una plantilla más.\n\nLo que me diferencia:\n→ Diseño 100% a medida\n→ Atención directa (sin intermediarios)\n→ Resultados medibles\n\nSi llegaste hasta acá, ya sabés cómo encontrarme. 👀\n\n—\nalejomfernandez.com`,
  },
  '02': {
    tiktokTitle: '¿Qué tipo de web necesita tu negocio?',
    caption: `No todas las webs son iguales. ¿Sabés cuál necesita tu negocio? 👇\n\nHay un tipo para cada etapa:\n→ Landing page: cuando querés una sola página que venda\n→ Web institucional: cuando necesitás mostrar todo lo que hacés\n→ Portafolio: cuando tu trabajo es lo que vende\n→ E-commerce: cuando vendés productos online\n\nEl error más común: pedir una web sin saber qué tipo necesitás.\n\nGuardá este carrusel para cuando estés listo para dar el paso 🔖\n\n—\n¿Preguntas? Escribime por DM o entrá a alejomfernandez.com`,
  },
  '03': {
    tiktokTitle: 'Así es trabajar conmigo. Sin sorpresas.',
    caption: `¿Cómo es el proceso de trabajar conmigo? Te lo cuento sin vueltas 👇\n\nMuchos me preguntan cómo arranca un proyecto desde cero.\n\nMi proceso, en 5 pasos:\n→ Consulta inicial (gratis)\n→ Propuesta y presupuesto\n→ Diseño + desarrollo\n→ Revisión y ajustes\n→ Entrega y lanzamiento\n\nSin sorpresas. Sin tiempos eternos. Sin intermediarios.\n\n¿Tenés un proyecto en mente? Escribime 🚀\n\n—\nalejomfernandez.com`,
  },
  '04': {
    tiktokTitle: '5 errores que arruinan una web (y cómo evitarlos)',
    caption: `5 errores que arruinan una web antes de que nadie la vea 👇\n\nLos vi repetirse en casi todos los clientes que vienen a rehacerla después.\n\n❌ Texto copiado de la competencia\n❌ Sin versión mobile\n❌ Sin llamado a la acción claro\n❌ Imágenes de stock genéricas\n❌ Sin Google Analytics ni SEO básico\n\nSi tu web tiene 2 o más de estos, es momento de actuar.\n\n¿Cuál te parece el peor? Comentalo 👇\n\n—\nalejomfernandez.com · DM abierto`,
  },
  '05': {
    tiktokTitle: 'Le hice la web a una barbería. Así quedó.',
    caption: `Caso real: FRANZA Barbería 🪒\n\nEl desafío: una barbería con personalidad fuerte que necesitaba una web que lo mostrara.\n\nLo que hice:\n→ Diseño a medida con identidad visual propia\n→ Sección de servicios y precios\n→ Sistema de turnos integrado\n→ Optimizado para aparecer en Google Maps y búsquedas locales\n\nEl resultado: una web que parece ellos, no una plantilla.\n\nSi tenés un negocio local y querés algo así, escribime 📩\n\n—\nalejomfernandez.com`,
  },
  '06': {
    tiktokTitle: 'Plantilla vs web a medida: ¿cuál te conviene?',
    caption: `La pregunta que más me hacen: ¿plantilla o web a medida? 👇\n\nLa respuesta honesta: depende de dónde estás parado.\n\nPLANTILLA ✓ si:\nRecién arrancás, tenés presupuesto ajustado o necesitás algo rápido\n\nA MEDIDA ✓ si:\nQuerés diferenciarte, tenés un negocio establecido o necesitás funciones específicas\n\nLo que sí te digo: la plantilla tiene techo. La web a medida crece con vos.\n\n¿En cuál estás? Comentalo 👇\n\n—\nalejomfernandez.com · DM para consultas`,
  },
  '07': {
    tiktokTitle: '¿Cuánto cuesta una web en Argentina? Te lo digo sin filtros.',
    caption: `La pregunta que me hacen más seguido 👇\n\n"Alejo, ¿cuánto cuesta una web?"\n\nY la respuesta honesta es: depende.\n\nNo es para esquivar la pregunta — es que el precio cambia según qué necesitás. Una landing simple no es lo mismo que un e-commerce con pasarela de pago.\n\nEn este carrusel te explico:\n→ Las dos opciones principales (plantilla vs a medida)\n→ Los 6 factores que determinan el precio\n→ El error que comete la mayoría al elegir al más barato\n\nGuardalo para cuando lo necesites 🔖\n\n—\n¿Tenés un proyecto en mente? Escribime por DM o entrá a alejomfernandez.com`,
  },
  '08': {
    tiktokTitle: 'Antes de contratar un dev, hacé estas 5 preguntas.',
    caption: `Antes de contratar un desarrollador web, hacé estas 5 preguntas 👇\n\nNo para ponerlo en aprietos — para no llevarte sorpresas después.\n\n01. ¿Qué incluye el precio y qué queda afuera?\n02. ¿Puedo editar el contenido yo mismo después?\n03. ¿La web va a aparecer en Google?\n04. ¿Qué pasa si el sitio falla después de la entrega?\n05. ¿El diseño va a ser único o es una plantilla?\n\nSi el dev no puede responder alguna con claridad, ya tenés tu respuesta.\n\nGuardalo antes de tu próxima reunión 🔖\n\n—\n¿Querés que yo sí te las responda? DM abierto.\nalejomfernandez.com`,
  },
  '09': {
    tiktokTitle: '¿Necesito web o me alcanza con las redes? La respuesta que nadie te da.',
    caption: `La pregunta del millón: ¿necesito web o me alcanza con las redes? 👇\n\nSpoiler: no es una o la otra.\n\nInstagram, TikTok, Facebook te dan visibilidad inmediata.\nTu web convierte esa visibilidad en clientes.\n\nUn like dura un segundo.\nUna web trabaja las 24hs aunque vos no estés.\n\nEl que arranca solo con redes siempre llega al mismo punto: necesito una web.\n\n¿En qué etapa estás vos? Comentalo 👇\n\n—\nalejomfernandez.com · DM para consultas`,
  },
  '10': {
    tiktokTitle: 'Hosting: qué es y cuál elegir para tu negocio.',
    caption: `Tu web vive en algún lugar. Ese lugar se llama hosting. 👇\n\n¿Sabés qué es exactamente? ¿Y si estás pagando por el correcto?\n\nExisten 3 tipos:\n→ Compartido: económico, ideal para empezar\n→ VPS: más velocidad, para negocios en crecimiento\n→ Cloud: máxima disponibilidad, para proyectos grandes\n\nLo que casi nadie te dice:\nUn hosting lento hace que tu web tarde en cargar. Google penaliza eso. Perdés visitas antes de que alguien te conozca.\n\nVelocidad + uptime + soporte valen más que el precio mensual.\n\nGuardalo para cuando estés eligiendo 🔖\n\n—\n¿Necesitás ayuda para elegir? Escribime por DM o entrá a alejomfernandez.com`,
  },
}

const activeCopyPanel = ref(null) // 'ig' | 'tiktok' | null
const copied = ref(false)

function copyCopy(platform) {
  const copy = postsCopy[postsMeta[activePost.value].num]
  if (!copy) return
  const text = platform === 'tiktok'
    ? `TÍTULO:\n${copy.tiktokTitle}\n\nCAPTION:\n${copy.caption}`
    : copy.caption
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// ===== TABS =====
const activeTab = ref('calendario') // 'posts' | 'historias' | 'calendario'

// ===== CALENDARIO =====
const DATES_STORAGE_KEY = 'lab-post-dates'
function loadDates() {
  try { const s = localStorage.getItem(DATES_STORAGE_KEY); if (s) return JSON.parse(s) } catch {}
  return {}
}
function saveDates() {
  localStorage.setItem(DATES_STORAGE_KEY, JSON.stringify(postDates.value))
}
const postDates = ref(loadDates()) // { 'post-01': '2026-05-03', 'story-H01': '2026-05-10', ... }

function setPostDate(key, date) {
  if (date) postDates.value[key] = date
  else delete postDates.value[key]
  saveDates()
}

const calendarMonth = ref(new Date().getMonth())   // 0-11
const calendarYear  = ref(new Date().getFullYear())

function prevMonth() {
  if (calendarMonth.value === 0) { calendarMonth.value = 11; calendarYear.value-- }
  else calendarMonth.value--
}
function nextMonth() {
  if (calendarMonth.value === 11) { calendarMonth.value = 0; calendarYear.value++ }
  else calendarMonth.value++
}

const calendarDays = computed(() => {
  const year = calendarYear.value
  const month = calendarMonth.value
  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  // leading empty cells (Mon-based: shift Sun to end)
  const startOffset = (firstDay + 6) % 7
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  return days
})

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

// Returns array of {key, name, num, type, kind} scheduled on a given day
function itemsOnDay(day) {
  if (!day) return []
  const dateStr = `${calendarYear.value}-${String(calendarMonth.value + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
  const result = []
  postsMeta.forEach(p => {
    if (postDates.value[`post-${p.num}`] === dateStr) result.push({ key: `post-${p.num}`, name: p.name, num: p.num, type: p.type, kind: 'post', status: p.status.value, slidesCount: p.slides.length })
  })
  storiesMeta.forEach(s => {
    if (postDates.value[`story-${s.num}`] === dateStr) result.push({ key: `story-${s.num}`, name: s.name, num: s.num, type: s.type, kind: 'story', status: s.status.value, slidesCount: s.slides.length })
  })
  return result
}

// All items without a date assigned
const unscheduledItems = computed(() => {
  const result = []
  postsMeta.forEach(p => { if (!postDates.value[`post-${p.num}`]) result.push({ key: `post-${p.num}`, name: p.name, num: p.num, type: p.type, kind: 'post' }) })
  storiesMeta.forEach(s => { if (!postDates.value[`story-${s.num}`]) result.push({ key: `story-${s.num}`, name: s.name, num: s.num, type: s.type, kind: 'story' }) })
  return result
})

// Quick-assign: clicking a calendar day with a selected item assigns it
const pendingAssign = ref(null) // key or null
function selectForAssign(key, e) { e.stopPropagation(); pendingAssign.value = pendingAssign.value === key ? null : key }
function assignToDay(day) {
  if (!pendingAssign.value || !day) return
  const dateStr = `${calendarYear.value}-${String(calendarMonth.value + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
  setPostDate(pendingAssign.value, dateStr)
  pendingAssign.value = null
}
function removeDate(key, e) { e.stopPropagation(); setPostDate(key, null) }

function chipMiddleClick(item, e) {
  if (e.button === 1) { e.preventDefault(); e.stopPropagation(); removeDate(item.key, e) }
}

function openItemFromCalendar(item, e) {
  e.stopPropagation()
  if (item.kind === 'post') {
    const idx = postsMeta.findIndex(p => p.num === item.num)
    if (idx !== -1) { activeTab.value = 'posts'; activePost.value = idx }
  } else {
    const idx = storiesMeta.findIndex(s => s.num === item.num)
    if (idx !== -1) { activeTab.value = 'historias'; activeStory.value = idx; activeStorySlide.value = 0 }
  }
}

const today = new Date()
function isToday(day) {
  return day === today.getDate() && calendarMonth.value === today.getMonth() && calendarYear.value === today.getFullYear()
}

// ===== STORIES =====
const STORY_STORAGE_KEY = 'lab-story-statuses'
function loadStoryStatuses() {
  try { const s = localStorage.getItem(STORY_STORAGE_KEY); if (s) return JSON.parse(s) } catch {}
  return {}
}
function saveStoryStatuses() {
  const data = {}
  storiesMeta.forEach(s => { data[s.num] = s.status.value })
  localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(data))
}
const savedStoryStatuses = loadStoryStatuses()

// Story slides data
const activeStory      = ref(null)
const activeStorySlide = ref(0)

const storyColores = [
  { num: 1, color: '#38bdf8', label: 'Celeste', type: 'personal',    desc: 'Posts personales\ny de marca' },
  { num: 2, color: '#a78bfa', label: 'Violeta', type: 'informativo', desc: 'Posts informativos\ny educativos' },
  { num: 3, color: '#22c55e', label: 'Verde',   type: 'caso',        desc: 'Casos reales\ny experiencias' },
  { num: 4, color: '#f59e0b', label: 'Amber',   type: 'comparacion', desc: 'Posts comparativos' },
]

const faqItems = [
  { num: '01', q: '¿Cuánto tarda en estar lista mi web?',         a: 'Depende del proyecto. Una web simple puede estar en 2–3 semanas. Una tienda o sistema a medida puede llevar 4–8 semanas.' },
  { num: '02', q: '¿Qué necesito tener listo para arrancar?',      a: 'Logo (o idea de marca), textos de tu negocio e imágenes. Si no tenés todo, lo armamos juntos antes de empezar.' },
  { num: '03', q: '¿Podés modificarla después de entregada?',      a: 'Sí. Te entrego acceso completo. También ofrezco soporte y mantenimiento mensual si preferís que lo maneje yo.' },
  { num: '04', q: '¿El precio incluye dominio y hosting?',         a: 'No están incluidos, pero te ayudo a contratarlos. Dominio ~$10/año, hosting desde $5/mes — muy accesible.' },
  { num: '05', q: '¿Cómo es el proceso de pago?',                  a: '50% para arrancar y 50% al entregar. Acepto transferencia, MercadoPago y PayPal para clientes del exterior.' },
  { num: '06', q: '¿Trabajás con clientes de otros países?',       a: 'Sí, trabajo 100% remoto. Me he coordinado con clientes de Argentina, Uruguay, México y España.' },
]

const storiesSlides = {
  colores: [
    { id: 'intro' },
    { id: 'c1' },
    { id: 'c2' },
    { id: 'c3' },
    { id: 'c4' },
    { id: 'cta' },
  ],
  faq: [
    { id: 'intro' },
    { id: 'faq1' },
    { id: 'faq2' },
    { id: 'faq3' },
    { id: 'faq4' },
    { id: 'faq5' },
    { id: 'faq6' },
    { id: 'cta' },
  ],
}

const storiesMeta = [
  {
    num: 'H01',
    name: '¿Qué significan los colores?',
    type: 'personal',
    status: ref(savedStoryStatuses['H01'] ?? 'en-desarrollo'),
    slides: storiesSlides.colores,
    slideRef: activeStorySlide,
    storyKey: 'colores',
  },
  {
    num: 'H02',
    name: 'FAQ — Dudas frecuentes',
    type: 'personal',
    status: ref(savedStoryStatuses['H02'] ?? 'borrador'),
    slides: storiesSlides.faq,
    slideRef: activeStorySlide,
    storyKey: 'faq',
  },
]

function cycleStoryStatus(i) {
  const cur = storiesMeta[i].status.value
  const idx = statusCycle.indexOf(cur)
  storiesMeta[i].status.value = statusCycle[(idx + 1) % statusCycle.length]
  saveStoryStatuses()
}

const currentStorySlideIdx = computed(() => activeStory.value === null ? 0 : storiesMeta[activeStory.value].slideRef.value)
const currentStorySlideMax = computed(() => activeStory.value === null ? 0 : storiesMeta[activeStory.value].slides.length)

function navigateStorySlide(dir) {
  if (activeStory.value === null) return
  const meta = storiesMeta[activeStory.value]
  meta.slideRef.value = Math.max(0, Math.min(meta.slides.length - 1, meta.slideRef.value + dir))
}

// ===== STORY SCALE =====
const storyScale = ref(0.4)
function updateStoryScale() {
  const h = (window.innerHeight - 80) / 1920
  const w = (window.innerWidth * 0.55) / 1080
  storyScale.value = Math.min(0.55, h, w)
}

const currentSlideIdx = computed(() => {
  if (activePost.value === null) return 0
  return postsMeta[activePost.value].slideRef.value
})
const currentSlideMax = computed(() => {
  if (activePost.value === null) return 0
  return postsMeta[activePost.value].slides.length
})

function navigateSlide(dir) {
  if (activePost.value === null) return
  const meta = postsMeta[activePost.value]
  meta.slideRef.value = Math.max(0, Math.min(meta.slides.length - 1, meta.slideRef.value + dir))
}

function onKeydown(e) {
  if (activePost.value !== null) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navigateSlide(1) }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); navigateSlide(-1) }
    else if (e.key === 'Escape') { activePost.value = null }
  } else if (activeStory.value !== null) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navigateStorySlide(1) }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); navigateStorySlide(-1) }
    else if (e.key === 'Escape') { activeStory.value = null }
  }
}
</script>

<template>
  <div class="lab">

    <!-- ============================= GRID VIEW ============================= -->
    <div v-if="activePost === null && activeStory === null" class="lab-grid-view">
      <div class="lab-grid-topbar">
        <div>
          <p class="lab-grid-eyebrow">⚗ AMF.DEV · LABORATORIO</p>
          <h1 class="lab-grid-title">Instagram</h1>
        </div>
        <div class="lab-grid-topbar-right">
          <div class="status-legend">
            <span class="legend-item"><span class="legend-dot ld-posteado"></span>Posteado</span>
            <span class="legend-item"><span class="legend-dot ld-programado"></span>Programado</span>
            <span class="legend-item"><span class="legend-dot ld-desarrollado"></span>Desarrollado</span>
            <span class="legend-item"><span class="legend-dot ld-en-desarrollo"></span>En desarrollo</span>
            <span class="legend-item"><span class="legend-dot ld-borrador"></span>Borrador</span>
          </div>
          <button class="regen-btn-sm" @click="generateParticleBg">↺ Regenerar fondo</button>
        </div>
      </div>

      <!-- TABS -->
      <div class="lab-tabs">
        <button :class="['lab-tab', { active: activeTab === 'calendario' }]" @click="activeTab = 'calendario'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
          Calendario
        </button>
        <button :class="['lab-tab', { active: activeTab === 'posts' }]" @click="activeTab = 'posts'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"/></svg>
          Carruseles
          <span class="lab-tab-count">{{ postsMeta.length }}</span>
        </button>
        <button :class="['lab-tab', { active: activeTab === 'historias' }]" @click="activeTab = 'historias'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6M9 11h6M9 15h4"/></svg>
          Historias
          <span class="lab-tab-count">{{ storiesMeta.length }}</span>
        </button>
        <button :class="['lab-tab', { active: activeTab === 'kanban' }]" @click="activeTab = 'kanban'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"/></svg>
          Kanban
        </button>
        <button :class="['lab-tab', { active: activeTab === 'ideas' }]" @click="activeTab = 'ideas'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
          Ideas
          <span class="lab-tab-count">{{ activeIdeas.length }}</span>
        </button>
        <button :class="['lab-tab', { active: activeTab === 'portadas' }]" @click="activeTab = 'portadas'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/></svg>
          Portadas
        </button>

      </div>

      <!-- PORTADAS HIGHLIGHTS -->
      <div v-if="activeTab === 'portadas'" class="portadas-wrap">
        <p class="portadas-hint">Hacé screenshot del cuadrado para usar como portada de destacado en Instagram.</p>
        <div class="portadas-grid">

          <!-- FAQ -->
          <div class="portada-item">
            <p class="portada-label">FAQ</p>
            <div class="portada-sq">
              <div class="portada-glow" style="background: #38bdf8"></div>
              <span class="portada-icon-q">?</span>
            </div>
          </div>

          <!-- COLORES -->
          <div class="portada-item">
            <p class="portada-label">Colores</p>
            <div class="portada-sq">
              <div class="portada-dots">
                <span class="portada-dot" style="background:#38bdf8"></span>
                <span class="portada-dot" style="background:#a78bfa"></span>
                <span class="portada-dot" style="background:#22c55e"></span>
                <span class="portada-dot" style="background:#f59e0b"></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- IDEAS BACKLOG -->
      <div v-if="activeTab === 'ideas'" class="ideas-wrap">

        <!-- Add new -->
        <div class="ideas-add-row">
          <select v-model="newIdeaType" class="ideas-type-sel">
            <option value="informativo">Informativo</option>
            <option value="comparacion">Comparación</option>
            <option value="caso">Caso real</option>
            <option value="personal">Personal</option>
          </select>
          <input v-model="newIdeaText" class="ideas-add-input" placeholder="Nueva idea de post..." @keydown.enter="addIdea" />
          <button class="ideas-add-btn" @click="addIdea">+ Agregar</button>
        </div>

        <!-- Pending ideas -->
        <div class="ideas-list">
          <div v-for="idea in activeIdeas" :key="idea.id" class="idea-card" :style="{ '--ic': postTypes[idea.type].color }">
            <div class="idea-card-left">
              <span class="idea-type-dot"></span>
              <div class="idea-card-body">
                <p class="idea-title">{{ idea.title }}</p>
                <p class="idea-desc" v-if="idea.desc">{{ idea.desc }}</p>
              </div>
            </div>
            <div class="idea-card-actions">
              <button class="idea-btn idea-btn-done" @click="toggleIdeaDone(idea.id)" title="Marcar como hecha">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              </button>
              <button class="idea-btn idea-btn-del" @click="deleteIdea(idea.id)" title="Eliminar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="idea-accent-bar"></div>
          </div>
          <p v-if="activeIdeas.length === 0" class="ideas-empty">No hay ideas pendientes. ¡Agregá una!</p>
        </div>

        <!-- Done ideas toggle -->
        <div v-if="doneIdeas.length > 0">
          <button class="ideas-show-done" @click="showDoneIdeas = !showDoneIdeas">
            {{ showDoneIdeas ? 'Ocultar' : 'Ver' }} hechas ({{ doneIdeas.length }})
          </button>
          <div v-if="showDoneIdeas" class="ideas-list ideas-list-done">
            <div v-for="idea in doneIdeas" :key="idea.id" class="idea-card idea-card-done">
              <div class="idea-card-left">
                <svg class="idea-done-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                <p class="idea-title">{{ idea.title }}</p>
              </div>
              <button class="idea-btn" @click="toggleIdeaDone(idea.id)" title="Restaurar">↩</button>
            </div>
          </div>
        </div>

      </div>

      <!-- KANBAN (removed) -->

      <div v-if="activeTab === 'calendario'" class="cal-layout">

        <!-- Panel izquierdo: sin fecha -->
        <div class="cal-sidebar">
          <p class="cal-sidebar-title">Sin programar</p>
          <p class="cal-sidebar-hint" v-if="unscheduledItems.length">Seleccioná uno y tocá el día del calendario</p>
          <p class="cal-sidebar-empty" v-if="unscheduledItems.length === 0">Todo programado.</p>
          <div v-for="item in unscheduledItems" :key="item.key"
            :class="['cal-unscheduled-item', { selected: pendingAssign === item.key }]"
            :style="{ '--item-color': postTypes[item.type].color }"
            @click="selectForAssign(item.key, $event)">
            <span class="cal-item-num">{{ item.num }}</span>
            <span class="cal-item-name">{{ item.name }}</span>
            <span class="cal-item-kind">{{ item.kind === 'story' ? 'Historia' : 'Post' }}</span>
            <div class="cal-item-bar"></div>
          </div>
        </div>

        <!-- Panel derecho: grilla mensual -->
        <div class="cal-main" @click="pendingAssign = null">
          <div class="cal-header">
            <button class="cal-nav-btn" @click.stop="prevMonth">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
            </button>
            <span class="cal-month-label">{{ MONTH_NAMES[calendarMonth] }} {{ calendarYear }}</span>
            <button class="cal-nav-btn" @click.stop="nextMonth">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
            </button>
          </div>
          <div class="cal-weekdays">
            <span v-for="d in ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']" :key="d">{{ d }}</span>
          </div>
          <div class="cal-grid">
            <div v-for="(day, di) in calendarDays" :key="di"
              :class="['cal-day', { empty: !day, today: isToday(day), 'has-items': itemsOnDay(day).length > 0, 'pending-target': pendingAssign && day }]"
              @click.stop="day && (pendingAssign ? assignToDay(day) : null)">
              <span class="cal-day-num" v-if="day">{{ day }}</span>
              <div class="cal-day-items">
                <div v-for="item in itemsOnDay(day)" :key="item.key"
                  class="cal-day-chip"
                  :style="{ '--chip-color': postTypes[item.type].color, background: postTypes[item.type].color + '22', color: postTypes[item.type].color, borderColor: postTypes[item.type].color + '55' }"
                  @click.stop="openItemFromCalendar(item, $event)"
                  @contextmenu.stop.prevent="removeDate(item.key, $event)"
                  @mousedown.stop="chipMiddleClick(item, $event)">
                  <span>{{ item.num }}</span>
                  <div class="cal-chip-tooltip">
                    <div class="cal-chip-tooltip-header">
                      <span class="cal-chip-tooltip-kind">{{ item.kind === 'story' ? 'Historia' : 'Post' }}</span>
                      <span class="cal-chip-tooltip-type">{{ postTypes[item.type].label }}</span>
                    </div>
                    <p class="cal-chip-tooltip-name">{{ item.name }}</p>
                    <div class="cal-chip-tooltip-footer">
                      <span :class="['cal-chip-tooltip-status', 'status-' + item.status]">{{ statusLabels[item.status] }}</span>
                      <span class="cal-chip-tooltip-slides">{{ item.slidesCount }} slides</span>
                    </div>
                    <p class="cal-chip-tooltip-hint">Clic der. / ruedita para borrar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /calendario -->

      <!-- POSTS GRID -->
      <div v-if="activeTab === 'posts'" class="posts-tab-wrap" @click="closeDropdown">
        <!-- Próximo a publicar -->
        <div v-if="nextScheduled" class="next-banner" @click.stop="nextScheduled.isPost ? (activePost = postsMeta.indexOf(nextScheduled.meta)) : (activeStory = storiesMeta.indexOf(nextScheduled.meta), activeStorySlide = 0)">
          <div class="next-banner-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
            <span class="next-banner-tag">{{ nextScheduled.diffDays === 0 ? 'HOY' : nextScheduled.diffDays === 1 ? 'MAÑANA' : 'PRÓXIMO' }}</span>
            <span class="next-banner-name">{{ nextScheduled.meta.name }}</span>
            <span class="next-banner-kind">{{ nextScheduled.isPost ? 'Post' : 'Historia' }}</span>
          </div>
          <div class="next-banner-right">
            <span class="next-banner-date">{{ nextScheduled.date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) }}</span>
            <span class="next-banner-days" v-if="nextScheduled.diffDays !== 0">en {{ nextScheduled.diffDays }} días</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
          </div>
        </div>
        <!-- Stats -->
        <div class="stats-bar">
          <button :class="['stat-chip', { active: gridFilter === 'activos' }]" @click="gridFilter = 'activos'">
            <span class="stat-chip-num">{{ statsPost.total - statsPost.posteado }}</span>
            <span class="stat-chip-label">Activos</span>
          </button>
          <button :class="['stat-chip', 'sc-posteado', { active: gridFilter === 'posteado' }]" @click="gridFilter = gridFilter === 'posteado' ? 'activos' : 'posteado'">
            <span class="stat-chip-num">{{ statsPost.posteado }}</span>
            <span class="stat-chip-label">Posteados</span>
          </button>
          <button :class="['stat-chip', 'sc-programado', { active: gridFilter === 'programado' }]" @click="gridFilter = gridFilter === 'programado' ? 'activos' : 'programado'">
            <span class="stat-chip-num">{{ statsPost.programado }}</span>
            <span class="stat-chip-label">Programados</span>
          </button>
          <button :class="['stat-chip', 'sc-desarrollado', { active: gridFilter === 'desarrollado' }]" @click="gridFilter = gridFilter === 'desarrollado' ? 'activos' : 'desarrollado'">
            <span class="stat-chip-num">{{ statsPost.desarrollado }}</span>
            <span class="stat-chip-label">Desarrollados</span>
          </button>
          <button :class="['stat-chip', 'sc-en-desarrollo', { active: gridFilter === 'en-desarrollo' }]" @click="gridFilter = gridFilter === 'en-desarrollo' ? 'activos' : 'en-desarrollo'">
            <span class="stat-chip-num">{{ statsPost.enDesarrollo }}</span>
            <span class="stat-chip-label">En desarrollo</span>
          </button>
          <button :class="['stat-chip', 'sc-borrador', { active: gridFilter === 'borrador' }]" @click="gridFilter = gridFilter === 'borrador' ? 'activos' : 'borrador'">
            <span class="stat-chip-num">{{ statsPost.borrador }}</span>
            <span class="stat-chip-label">Borradores</span>
          </button>
          <button :class="['stat-chip', 'sc-todos', { active: gridFilter === 'todos' }]" @click="gridFilter = 'todos'" style="margin-left:auto">
            <span class="stat-chip-label">Ver todos</span>
          </button>
        </div>
        <!-- Grid -->
        <div class="lab-grid">
          <div v-for="(p, i) in filteredPosts" :key="p.num" class="grid-card" :style="{ '--post-accent': postTypes[p.type].color }" @click="activePost = postsMeta.indexOf(p)">
            <div class="grid-card-top">
              <div class="status-dropdown-wrap">
                <button
                  :class="['status-badge', 'status-' + p.status.value]"
                  @click.stop="toggleDropdown('post', postsMeta.indexOf(p), $event)"
                >{{ statusLabels[p.status.value] }} <svg style="width:14px;height:14px;display:inline;margin-left:4px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg></button>
                <div v-if="openStatusDropdown?.kind === 'post' && openStatusDropdown?.idx === postsMeta.indexOf(p)" class="status-dropdown" @click.stop>
                  <button v-for="s in statusCycle" :key="s"
                    :class="['status-dropdown-item', 'status-' + s, { active: p.status.value === s }]"
                    @click="setStatus(postsMeta.indexOf(p), s)">{{ statusLabels[s] }}</button>
                </div>
              </div>
            </div>
            <div class="grid-card-body">
              <h2 class="grid-card-name">{{ p.name }}</h2>
              <p class="grid-card-meta">{{ p.slides.length }} slides</p>
            </div>
            <div class="grid-card-footer">
              <span>Abrir carrusel</span>
              <svg class="grid-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </div>
            <span v-if="p.status.value !== 'posteado' && daysUntilPost(p.num, 'post') !== null"
              :class="['grid-card-date-pill', daysUntilPost(p.num, 'post') === 0 ? 'gdp-today' : daysUntilPost(p.num, 'post') === 1 ? 'gdp-tomorrow' : 'gdp-soon']"
            >{{ daysUntilPost(p.num, 'post') === 0 ? 'HOY' : daysUntilPost(p.num, 'post') === 1 ? 'MAÑANA' : 'EN ' + daysUntilPost(p.num, 'post') + ' DÍAS' }}</span>
            <span class="grid-card-type-tag" :style="{ color: postTypes[p.type].color, borderColor: postTypes[p.type].color + '44' }">{{ postTypes[p.type].label }}</span>
            <div class="grid-card-accent-bar" :style="{ background: postTypes[p.type].color }"></div>
            <span class="grid-card-num">{{ p.num }}</span>
          </div>
          <p v-if="filteredPosts.length === 0" class="grid-empty">No hay posts en este estado.</p>
        </div>
      </div>

      <!-- STORIES GRID -->
      <div v-if="activeTab === 'historias'" class="lab-grid lab-stories-grid" @click="closeDropdown">
        <div v-for="(s, i) in storiesMeta" :key="i" class="grid-card grid-card-story" :style="{ '--post-accent': postTypes[s.type].color }" @click="activeStory = i; activeStorySlide = 0">
          <div class="grid-card-top">
            <div class="status-dropdown-wrap">
              <button
                :class="['status-badge', 'status-' + s.status.value]"
                @click.stop="toggleDropdown('story', i, $event)"
              >{{ statusLabels[s.status.value] }} <svg style="width:14px;height:14px;display:inline;margin-left:4px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg></button>
              <div v-if="openStatusDropdown?.kind === 'story' && openStatusDropdown?.idx === i" class="status-dropdown" @click.stop>
                <button v-for="opt in statusCycle" :key="opt"
                  :class="['status-dropdown-item', 'status-' + opt, { active: s.status.value === opt }]"
                  @click="setStoryStatus(i, opt)">{{ statusLabels[opt] }}</button>
              </div>
            </div>
          </div>
          <div class="grid-card-body">
            <h2 class="grid-card-name">{{ s.name }}</h2>
            <p class="grid-card-meta">{{ s.slides.length }} slides · Historia</p>
          </div>
          <div class="grid-card-footer">
            <span>Abrir historia</span>
            <svg class="grid-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
          </div>
          <span v-if="s.status.value !== 'posteado' && daysUntilPost(s.num, 'story') !== null"
            :class="['grid-card-date-pill', daysUntilPost(s.num, 'story') === 0 ? 'gdp-today' : daysUntilPost(s.num, 'story') === 1 ? 'gdp-tomorrow' : 'gdp-soon']"
          >{{ daysUntilPost(s.num, 'story') === 0 ? 'HOY' : daysUntilPost(s.num, 'story') === 1 ? 'MAÑANA' : 'EN ' + daysUntilPost(s.num, 'story') + ' DÍAS' }}</span>
          <span class="grid-card-type-tag" :style="{ color: postTypes[s.type].color, borderColor: postTypes[s.type].color + '44' }">{{ postTypes[s.type].label }}</span>
          <div class="grid-card-accent-bar" :style="{ background: postTypes[s.type].color }"></div>
          <span class="grid-card-num">{{ s.num }}</span>
        </div>
      </div>
    </div>

    <!-- ============================= DETAIL VIEW ============================= -->
    <div v-else-if="activePost !== null" class="lab-detail-view" :style="{ '--card-scale': cardScale, '--post-accent': postTypes[postsMeta[activePost].type].color }">

      <div class="detail-header">
        <button class="detail-back" @click="activePost = null">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          Inicio
        </button>
        <div class="detail-title-area">
          <span class="detail-post-name">{{ postsMeta[activePost].name }}</span>
          <span :class="['status-badge', 'status-' + postsMeta[activePost].status.value]">{{ statusLabels[postsMeta[activePost].status.value] }}</span>
        </div>
        <div class="detail-header-right">
          <span class="detail-counter">{{ currentSlideIdx + 1 }} / {{ currentSlideMax }}</span>
          <button class="regen-btn-sm" @click="generateParticleBg">↺ Fondo</button>
        </div>
      </div>

      <div class="detail-stage">
        <button class="detail-arrow" @click="navigateSlide(-1)" :disabled="currentSlideIdx === 0" aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
        </button>
        <div class="detail-sections">

          <!-- ============================= 01 · SOBRE MÍ ============================= -->
          <section v-if="activePost === 0" class="carousel-section">

      <!-- Selector de slide -->
      <div class="slide-nav">
        <button
          v-for="(s, i) in carouselSlides"
          :key="s.id"
          :class="['slide-btn', { active: activeSlide === i }]"
          @click="activeSlide = i"
        >{{ s.label }}</button>
      </div>

      <!-- Barra de progreso visual -->
      <div class="progress-bar">
        <div
          v-for="(s, i) in carouselSlides"
          :key="s.id"
          :class="['progress-dot', { active: activeSlide === i, past: i < activeSlide }]"
        ></div>
      </div>

      <!-- === PORTADA === -->
      <div v-if="activeSlide === 0" class="single-card-wrap">
        <p class="single-label">PORTADA — El primero que se ve en el feed</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main carousel-cover-main">
              <div class="cover-text-block">
                <p class="cover-eyebrow">¿Quién está detrás del código?</p>
                <h2 class="cover-title">SOBRE<br>MÍ.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Desarrollador Web · Buenos Aires 🇦🇷</p>
              </div>
              <img class="sticker-cover" src="/images/stickercontento.png" alt="Alejo" />
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- === SLIDE 01: QUIÉN SOY === -->
      <div v-if="activeSlide === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — Quién soy</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 06</span>
            </div>
            <div class="card-main">
              <p class="section-tag">QUIÉN SOY</p>
              <h2 class="slide-title">Hola,<br>soy <span class="text-accent">Alejo</span>.</h2>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                  </span>
                  <span class="info-text">Villa Bosch, Buenos Aires</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/></svg>
                  </span>
                  <span class="info-text">Desarrollador Web Full-Stack</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></svg>
                  </span>
                  <span class="info-text">Da Vinci · CoderHouse · CS50 Harvard</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
                  </span>
                  <span class="info-text">Me apasiona construir cosas que se ven bien y funcionan todavía mejor</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- === SLIDE 02: PROYECTOS === -->
      <div v-if="activeSlide === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — Proyectos</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 06</span>
            </div>
            <div class="card-main">
              <p class="section-tag">LO QUE CONSTRUYO</p>
              <h2 class="slide-title-sm">Proyectos<br><span class="text-accent">destacados</span>.</h2>
              <div class="project-list">
                <div class="project-row" v-for="p in carouselProjects" :key="p.name">
                  <div class="project-dot"></div>
                  <div class="project-info">
                    <div class="project-name-row">
                      <p class="project-name">{{ p.name }}</p>
                      <span v-if="p.tag" class="project-tag">{{ p.tag }}</span>
                    </div>
                    <p class="project-desc">{{ p.desc }}</p>
                    <p v-if="p.url" class="project-url">
                      <svg class="url-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
                      {{ p.url }}
                    </p>
                  </div>
                </div>
              </div>
              <p class="portfolio-cta">Ver todos → <span class="text-accent">{{ watermark }}</span></p>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- === SLIDE 03: MI STACK === -->
      <div v-if="activeSlide === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — Mi Stack</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 06</span>
            </div>
            <div class="card-main">
              <p class="section-tag">MI STACK</p>
              <h2 class="slide-title">Con qué<br><span class="text-accent">construyo</span>.</h2>
              <div class="tech-grid">
                <div class="tech-section" v-for="cat in stackCategories" :key="cat.label" :style="{ '--tc': cat.color }">
                  <span class="tech-section-label" :style="{ color: cat.color }">{{ cat.label }}</span>
                  <div class="tech-pills">
                    <span class="tech-pill" v-for="item in cat.items" :key="item">{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- === SLIDE 04: FUERA DEL CÓDIGO === -->
      <div v-if="activeSlide === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — Fuera del código</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 06</span>
            </div>
            <div class="card-main">
              <p class="section-tag">FUERA DEL CÓDIGO</p>
              <h2 class="slide-title">Más allá<br>del <span class="text-accent">código</span>.</h2>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"/></svg>
                  </span>
                  <span class="info-text">Toco el piano. El único instrumento que me banqué aprender.</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"/></svg>
                  </span>
                  <span class="info-text">Fanático del fútbol. El otro lenguaje que entiendo sin manual.</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                  </span>
                  <span class="info-text">Gran Buenos Aires. Nací y crecí en el conurbano bonaerense.</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>
                  </span>
                  <span class="info-text">Con mi pareja, que es gran parte de mi vida cotidiana.</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- === SLIDE 05: CTA === -->
      <div v-if="activeSlide === 5" class="single-card-wrap">
        <p class="single-label">SLIDE 05 — CTA final</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 06</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿TRABAJAMOS JUNTOS?</p>
                <h2 class="cta-big-title">¿Tenés un<br>proyecto<br>en <span class="text-accent">mente</span>?</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
                    </span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                    </span>
                    <span class="cta-link-text">fernandezmalejo@gmail.com</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============================= 02 · TIPOS DE WEB ============================= -->
    <section v-if="activePost === 1" class="carousel-section">

      <div class="slide-nav">
        <button
          v-for="(s, i) in paginasSlides"
          :key="s.id"
          :class="['slide-btn', { active: activeSlidePages === i }]"
          @click="activeSlidePages = i"
        >{{ s.label }}</button>
      </div>

      <div class="progress-bar">
        <div
          v-for="(s, i) in paginasSlides"
          :key="s.id"
          :class="['progress-dot', { active: activeSlidePages === i, past: i < activeSlidePages }]"
        ></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlidePages === 0" class="single-card-wrap">
        <p class="single-label">PORTADA — Primer slide del carrusel</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">¿Sabés cuál es la tuya?</p>
                <h2 class="cover-title">TIPOS<br>DE WEB.</h2>
                <div class="cover-divider"></div>
                <div class="cover-pills">
                  <span class="cover-pill">Landing</span>
                  <span class="cover-pill">E-Commerce</span>
                  <span class="cover-pill">WebApp</span>
                  <span class="cover-pill">Gestión</span>
                </div>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- TYPE SLIDES (slides 1-4) -->
      <div v-if="activeSlidePages >= 1 && activeSlidePages <= 4" class="single-card-wrap">
        <p class="single-label">{{ pageTypes[activeSlidePages - 1].type }}</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">{{ pageTypes[activeSlidePages - 1].counter }} / 07</span>
            </div>
            <div class="card-main">
              <div class="pagetype-header">
                <div class="pagetype-icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="pageTypes[activeSlidePages - 1].iconPath"/>
                  </svg>
                </div>
                <h2 class="pagetype-type-hero">{{ pageTypes[activeSlidePages - 1].type }}</h2>
              </div>
              <div class="pagetype-hero-divider"></div>
              <p class="pagetype-headline">{{ pageTypes[activeSlidePages - 1].headline }}</p>
              <p class="pagetype-desc">{{ pageTypes[activeSlidePages - 1].desc }}</p>
              <div class="pagetype-use">
                <svg class="pagetype-use-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <span>{{ pageTypes[activeSlidePages - 1].use }}</span>
              </div>
              <div class="pagetype-url">
                <p class="pagetype-url-label">{{ pageTypes[activeSlidePages - 1].urlLabel }}</p>
                <div class="pagetype-url-row">
                  <svg class="url-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                  </svg>
                  <span class="pagetype-url-text">{{ pageTypes[activeSlidePages - 1].url }}</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CIERRE -->
      <div v-if="activeSlidePages === 5" class="single-card-wrap">
        <p class="single-label">CIERRE — ¿No sabés cuál es la tuya?</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 07</span>
            </div>
            <div class="card-main cierre-layout">
              <p class="section-tag">TRANQUILO/A</p>
              <h2 class="cierre-title">¿No sabés<br>todavía<br>cuál es<br>la tuya?</h2>
              <div class="cierre-box">
                <p class="cierre-box-text">Normal. Lo importante es que tenés <span class="text-accent">la idea</span>. El resto lo resolvemos juntos.</p>
              </div>
              <div class="cierre-checks">
                <div class="cierre-check-row">
                  <svg class="cierre-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                  <span>Sin tecnicismos</span>
                </div>
                <div class="cierre-check-row">
                  <svg class="cierre-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                  <span>Sin compromisos</span>
                </div>
                <div class="cierre-check-row">
                  <svg class="cierre-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                  <span>Solo hablamos</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlidePages === 6" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">07 / 07</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿CUÁL ES LA TUYA?</p>
                <h2 class="cta-big-title">Contame<br>tu idea.<br>La hacemos <span class="text-accent">realidad</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
                    </span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                    </span>
                    <span class="cta-link-text">fernandezmalejo@gmail.com</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============================= 03 · ¿CÓMO TRABAJO? ============================= -->
    <section v-if="activePost === 2" class="carousel-section">

      <div class="slide-nav">
        <button
          v-for="(s, i) in procesoSlides"
          :key="s.id"
          :class="['slide-btn', { active: activeSlideProceso === i }]"
          @click="activeSlideProceso = i"
        >{{ s.label }}</button>
      </div>

      <div class="progress-bar">
        <div
          v-for="(s, i) in procesoSlides"
          :key="s.id"
          :class="['progress-dot', { active: activeSlideProceso === i, past: i < activeSlideProceso }]"
        ></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideProceso === 0" class="single-card-wrap">
        <p class="single-label">PORTADA — Primer slide del carrusel</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">De la idea al producto</p>
                <h2 class="cover-title">¿CÓMO<br>TRABAJO?</h2>
                <div class="cover-divider"></div>
                <div class="cover-steps-preview">
                  <div class="cover-step-item">
                    <span class="cover-step-num">01</span>
                    <span class="cover-step-name">Contacto</span>
                  </div>
                  <div class="cover-step-sep">→</div>
                  <div class="cover-step-item">
                    <span class="cover-step-num">02</span>
                    <span class="cover-step-name">Propuesta</span>
                  </div>
                  <div class="cover-step-sep">→</div>
                  <div class="cover-step-item">
                    <span class="cover-step-num">03</span>
                    <span class="cover-step-name">Diseño</span>
                  </div>
                  <div class="cover-step-sep">→</div>
                  <div class="cover-step-item">
                    <span class="cover-step-num">04</span>
                    <span class="cover-step-name">Entrega</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-counter">01 / 07</div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- AVISO/DISCLAIMER -->
      <div v-if="activeSlideProceso === 1" class="single-card-wrap">
        <p class="single-label">AVISO — Antes de empezar</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 07</span>
            </div>
            <div class="card-main aviso-layout">
              <!-- Icono + label -->
              <div class="aviso-icon-row">
                <div class="aviso-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                  </svg>
                </div>
                <span class="aviso-label">AVISO</span>
              </div>
              <!-- Título -->
              <h2 class="aviso-title">Antes de<br>arrancar.</h2>
              <!-- Callout box -->
              <div class="aviso-box">
                <p class="aviso-box-text">Esto es mi proceso <span class="text-accent">base</span>. Cada proyecto es distinto y la forma de trabajar se adapta siempre a lo que vos necesitás.</p>
              </div>
              <!-- Sub -->
              <p class="aviso-sub">Si querés algo más rápido, más pausado o completamente distinto al proceso que muestro acá, <span class="text-accent">lo hablamos</span>.</p>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- PASOS (slides 2-5 = steps 0-3) -->
      <div v-if="activeSlideProceso >= 2 && activeSlideProceso <= 5" class="single-card-wrap">
        <p class="single-label">PASO {{ procesoSteps[activeSlideProceso - 2].num }}</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">{{ procesoSteps[activeSlideProceso - 2].counter }} / 07</span>
            </div>
            <div class="card-main step-layout">
              <p class="section-tag">EL PROCESO</p>
              <div class="step-num-block">
                <span class="step-big-num">{{ procesoSteps[activeSlideProceso - 2].num }}</span>
                <div class="step-num-divider"></div>
              </div>
              <h2 class="step-title">{{ procesoSteps[activeSlideProceso - 2].title }}</h2>
              <p class="step-desc">{{ procesoSteps[activeSlideProceso - 2].desc }}</p>
              <div class="step-progress-dots">
                <div
                  v-for="(st, i) in procesoSteps"
                  :key="i"
                  :class="['step-pdot', { 'step-pdot-active': i === activeSlideProceso - 2, 'step-pdot-past': i < activeSlideProceso - 2 }]"
                ></div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA FINAL -->
      <div v-if="activeSlideProceso === 6" class="single-card-wrap">
        <p class="single-label">CTA — ¿Empezamos?</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">07 / 07</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿EMPEZAMOS?</p>
                <h2 class="cta-big-title">Tu proyecto<br>empieza<br>con un <span class="text-accent">hola</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
                    </span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                    </span>
                    <span class="cta-link-text">fernandezmalejo@gmail.com</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============================= 04 · 5 ERRORES ============================= -->
    <section v-if="activePost === 3" class="carousel-section">

      <div class="slide-nav">
        <button
          v-for="(s, i) in erroresSlides"
          :key="s.id"
          :class="['slide-btn', { active: activeSlideErrores === i }]"
          @click="activeSlideErrores = i"
        >{{ s.label }}</button>
      </div>

      <div class="progress-bar">
        <div
          v-for="(s, i) in erroresSlides"
          :key="s.id"
          :class="['progress-dot', { active: activeSlideErrores === i, past: i < activeSlideErrores }]"
        ></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideErrores === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">¿Cuál estás cometiendo?</p>
                <h2 class="cover-title">5 ERRORES<br>que matan<br>tu web.</h2>
                <div class="cover-divider"></div>
              </div>
            </div>
            <div class="carousel-counter">01 / 12</div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- PROBLEM SLIDES (odd indices 1,3,5,7,9) -->
      <div v-if="activeSlideErrores % 2 === 1 && activeSlideErrores <= 9" class="single-card-wrap">
        <p class="single-label">EL PROBLEMA — Error {{ errores[Math.floor((activeSlideErrores - 1) / 2)].num }}</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">{{ (activeSlideErrores + 1).toString().padStart(2, '0') }} / 12</span>
            </div>
            <div class="card-main error-layout">
              <div class="error-num-row">
                <span class="error-label">ERROR</span>
                <span class="error-big-num">{{ errores[Math.floor((activeSlideErrores - 1) / 2)].num }}</span>
              </div>
              <h2 class="error-title">{{ errores[Math.floor((activeSlideErrores - 1) / 2)].title }}</h2>
              <div class="error-stat-box">
                <svg class="error-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                </svg>
                <p class="error-stat-text">{{ errores[Math.floor((activeSlideErrores - 1) / 2)].stat }}</p>
              </div>
              <p class="error-desc">{{ errores[Math.floor((activeSlideErrores - 1) / 2)].desc }}</p>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- SOLUTION SLIDES (even indices 2,4,6,8,10) -->
      <div v-if="activeSlideErrores % 2 === 0 && activeSlideErrores >= 2 && activeSlideErrores <= 10" class="single-card-wrap">
        <p class="single-label">LA SOLUCIÓN — Error {{ errores[Math.floor((activeSlideErrores - 1) / 2)].num }}</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter" style="color: #22c55e;">{{ (activeSlideErrores + 1).toString().padStart(2, '0') }} / 12</span>
            </div>
            <div class="card-main solution-layout">
              <div class="solution-icon-wrap">
                <svg class="solution-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" v-html="errores[Math.floor((activeSlideErrores - 1) / 2)].solutionIcon"></svg>
              </div>
              <div class="solution-content">
                <span class="solution-tag">LA SOLUCIÓN</span>
                <h2 class="solution-headline">{{ errores[Math.floor((activeSlideErrores - 1) / 2)].fix }}</h2>
                <div class="solution-details">
                  <div class="solution-detail-item" v-for="d in errores[Math.floor((activeSlideErrores - 1) / 2)].fixDetail" :key="d">
                    <svg class="solution-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                    <span class="solution-detail-text">{{ d }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideErrores === 11" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">12 / 12</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿TU WEB TIENE ALGUNO?</p>
                <h2 class="cta-big-title">Lo<br>resolvemos<br><span class="text-accent">juntos</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
                    </span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                    </span>
                    <span class="cta-link-text">fernandezmalejo@gmail.com</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer">
              <span class="watermark">{{ watermark }}</span>
              <div class="blue-line"></div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============================= 05 · CASO REAL: FRANZA ============================= -->
    <section v-if="activePost === 4" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in franzaSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlideFranza === i }]"
          @click="activeSlideFranza = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in franzaSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlideFranza === i, past: i < activeSlideFranza }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideFranza === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main franza-cover-main">
              <div class="franza-cover-logo-wrap">
                <img class="franza-cover-logo" src="/franzapost/franzalogo.png" alt="FRANZA logo" />
              </div>
              <div class="cover-text-block">
                <p class="cover-eyebrow">Caso real de trabajo</p>
                <h2 class="cover-title">FRANZA.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Cómo construí el sistema web de una constructora.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 07</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- EL PROBLEMA -->
      <div v-if="activeSlideFranza === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — El problema</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 07</span>
            </div>
            <div class="card-main franza-layout">
              <p class="section-tag">EL PROBLEMA</p>
              <h2 class="franza-title">Todo en papel<br>y Excel.</h2>
              <div class="franza-box">
                <p class="franza-box-text">Una constructora con obras activas, presupuestos, empleados y materiales. Todo manejado en planillas. Sin control centralizado, sin historial, sin acceso remoto.</p>
              </div>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap ic-neg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Sin panel de control centralizado</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-neg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Sin historial de obras y presupuestos</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-neg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Sin acceso remoto desde el campo</span>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- LA SOLUCIÓN -->
      <div v-if="activeSlideFranza === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — La solución</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 07</span>
            </div>
            <div class="card-main franza-layout">
              <p class="section-tag">LA SOLUCIÓN</p>
              <h2 class="franza-title">Un sistema<br>a medida.</h2>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Panel admin completo con dashboard</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Gestión de obras y presupuestos</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">ABM de empleados y materiales</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Acceso por roles: admin y operador</span>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- SCREEN 1 -->
      <div v-if="activeSlideFranza === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — Panel admin</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 07</span>
            </div>
            <div class="card-main screen-layout">
              <p class="section-tag">EL PANEL ADMIN</p>
              <p class="screen-caption">Vista principal con todas las obras activas y su estado en tiempo real.</p>
              <div class="franza-screen-wrap">
                <img src="/franzapost/adminFranza.png" alt="Panel admin FRANZA" class="franza-screen-img" />
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- SCREEN 2 -->
      <div v-if="activeSlideFranza === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — Formulario</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 07</span>
            </div>
            <div class="card-main screen-layout">
              <p class="section-tag">CARGA DE DATOS</p>
              <p class="screen-caption">Formulario de carga de obras, materiales y presupuestos.</p>
              <div class="franza-screen-wrap">
                <img src="/franzapost/ABMFranza2.png" alt="Formulario FRANZA" class="franza-screen-img" />
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- EL RESULTADO -->
      <div v-if="activeSlideFranza === 5" class="single-card-wrap">
        <p class="single-label">SLIDE 05 — El resultado</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 07</span>
            </div>
            <div class="card-main franza-layout">
              <p class="section-tag">EL RESULTADO</p>
              <h2 class="franza-title">Control total<br>desde el<br>primer día.</h2>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Historial completo de obras y presupuestos</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Gestión sin papeles ni planillas</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Acceso desde cualquier dispositivo</span>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideFranza === 6" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">07 / 07</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿TU EMPRESA NECESITA ALGO ASÍ?</p>
                <h2 class="cta-big-title">Hablemos<br>de tu<br><span class="text-accent">proyecto</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">Ver en vivo: franza.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section>

    <!-- ============================= 06 · ¿PLANTILLA O A MEDIDA? ============================= -->
    <section v-if="activePost === 5" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in plantillaSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlidePlantilla === i }]"
          @click="activeSlidePlantilla = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in plantillaSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlidePlantilla === i, past: i < activeSlidePlantilla }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlidePlantilla === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">La respuesta honesta.</p>
                <h2 class="cover-title-sm">PLANTILLA<br>VS<br>MEDIDA.</h2>
                <div class="cover-divider"></div>
                <div class="cover-pills">
                  <span class="cover-pill">Wix</span>
                  <span class="cover-pill">WordPress</span>
                  <span class="cover-pill">A medida</span>
                </div>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- LA PLANTILLA -->
      <div v-if="activeSlidePlantilla === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — La plantilla</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 06</span>
            </div>
            <div class="card-main tipo-layout">
              <p class="section-tag">PLANTILLA</p>
              <h2 class="tipo-title">Rápida<br>y económica.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text">Wix, WordPress, Shopify. Usás una base ya construida y la personalizás con las herramientas de la plataforma. Lista para lanzar en días.</p>
              </div>
              <div class="tipo-cuando">
                <svg class="tipo-cuando-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <span>Cuándo conviene: Validar una idea rápido, presupuesto muy limitado, primeros pasos en internet.</span>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- A MEDIDA -->
      <div v-if="activeSlidePlantilla === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — A medida</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 06</span>
            </div>
            <div class="card-main tipo-layout">
              <p class="section-tag">A MEDIDA</p>
              <h2 class="tipo-title">Diseñada<br>para vos.</h2>
              <div class="tipo-box is-medida">
                <p class="tipo-box-text">Tu diseño, tu lógica, tu stack. Construida desde cero según las necesidades de tu negocio. Sin los límites de ninguna plataforma.</p>
              </div>
              <div class="tipo-cuando">
                <svg class="tipo-cuando-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <span>Cuándo conviene: Tu web es tu herramienta de ventas, necesidades específicas, querés escalar en serio.</span>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- COMPARACIÓN -->
      <div v-if="activeSlidePlantilla === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — Comparación</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 06</span>
            </div>
            <div class="card-main comp-slide-layout">
              <p class="section-tag">COMPARACIÓN</p>
              <div class="comp-grid">
                <div class="comp-col">
                  <div class="comp-col-head is-plantilla">PLANTILLA</div>
                  <div class="comp-col-body">
                    <div class="comp-item is-negative"><span class="comp-item-dot">·</span><span>Inversión inicial baja</span></div>
                    <div class="comp-item is-negative"><span class="comp-item-dot">·</span><span>Diseño limitado</span></div>
                    <div class="comp-item is-negative"><span class="comp-item-dot">·</span><span>Difícil de escalar</span></div>
                    <div class="comp-item is-negative"><span class="comp-item-dot">·</span><span>Dependés de la plataforma</span></div>
                  </div>
                </div>
                <div class="comp-col">
                  <div class="comp-col-head is-medida">A MEDIDA</div>
                  <div class="comp-col-body">
                    <div class="comp-item is-positive"><span class="comp-item-dot">·</span><span>Mayor inversión inicial</span></div>
                    <div class="comp-item is-positive"><span class="comp-item-dot">·</span><span>Diseño 100% libre</span></div>
                    <div class="comp-item is-positive"><span class="comp-item-dot">·</span><span>Crece con tu negocio</span></div>
                    <div class="comp-item is-positive"><span class="comp-item-dot">·</span><span>Independencia total</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- PREGUNTA CLAVE -->
      <div v-if="activeSlidePlantilla === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — La pregunta clave</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 06</span>
            </div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">LA PREGUNTA CLAVE</p>
              <h2 class="pregunta-title">¿Qué tan en<br>serio tomás<br>tu presencia<br>online?</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">Si tu web es tu principal herramienta de ventas, <span class="text-accent">una plantilla no alcanza</span>. Si estás empezando a validar una idea, puede ser el primer paso.</p>
              </div>
              <p class="pregunta-sub">El que empieza con plantilla y le va bien, siempre termina pidiendo algo a medida.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlidePlantilla === 5" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 06</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿CUÁL ES LA TUYA?</p>
                <h2 class="cta-big-title">Contame<br>tu idea.<br>La evaluamos <span class="text-accent">juntos</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg></span>
                    <span class="cta-link-text">fernandezmalejo@gmail.com</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section>

        </div><!-- /detail-sections -->
        <button class="detail-arrow" @click="navigateSlide(1)" :disabled="currentSlideIdx === currentSlideMax - 1" aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
        </button>
      </div><!-- /detail-stage -->

      <p class="detail-hint">Usá <kbd>←</kbd> <kbd>→</kbd> para navegar entre slides · <kbd>ESC</kbd> para volver al inicio</p>

      <!-- COPY PANEL -->
      <div v-if="postsCopy[postsMeta[activePost].num]" class="copy-panel">
        <div class="copy-panel-btns">
          <button :class="['copy-plat-btn', 'copy-plat-ig', { active: activeCopyPanel === 'ig' }]" @click="activeCopyPanel = activeCopyPanel === 'ig' ? null : 'ig'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            Instagram
          </button>
          <button :class="['copy-plat-btn', 'copy-plat-tt', { active: activeCopyPanel === 'tiktok' }]" @click="activeCopyPanel = activeCopyPanel === 'tiktok' ? null : 'tiktok'">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.84 4.84 0 0 1-1.01-.07Z"/></svg>
            TikTok
          </button>
        </div>

        <div v-if="activeCopyPanel" class="copy-content">
          <div v-if="activeCopyPanel === 'tiktok'" class="copy-field">
            <label class="copy-field-label">TITLE</label>
            <div class="copy-field-text copy-field-title">{{ postsCopy[postsMeta[activePost].num].tiktokTitle }}</div>
          </div>
          <div class="copy-field">
            <label class="copy-field-label">CAPTION</label>
            <pre class="copy-field-text">{{ postsCopy[postsMeta[activePost].num].caption }}</pre>
          </div>
          <button :class="['copy-clipboard-btn', { copied }]" @click="copyCopy(activeCopyPanel)">
            <svg v-if="!copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            {{ copied ? '¡Copiado!' : 'Copiar al portapapeles' }}
          </button>
        </div>
      </div>

      <!-- NOTAS -->
      <div class="notes-panel">
        <div class="notes-panel-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/></svg>
          Notas
          <span v-if="postNotes[postsMeta[activePost].num]" class="notes-saved-dot"></span>
        </div>
        <textarea
          class="notes-textarea"
          placeholder="Ideas, hashtags, referencias, cambios pendientes..."
          :value="postNotes[postsMeta[activePost].num] || ''"
          @input="saveNote(postsMeta[activePost].num, $event.target.value)"
        ></textarea>
      </div>

    </div><!-- /detail-view -->

    <!-- ============================= 07 · ¿CUÁNTO CUESTA UNA WEB? ============================= -->
    <section v-if="activePost === 6" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in costoSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlideCosto === i }]"
          @click="activeSlideCosto = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in costoSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlideCosto === i, past: i < activeSlideCosto }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideCosto === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">La pregunta más frecuente</p>
                <h2 class="cover-title" style="font-size:150px">¿Cuánto cuesta una web?</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Te lo explico sin vueltas.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 07</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- LA RESPUESTA HONESTA -->
      <div v-if="activeSlideCosto === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — La respuesta</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 07</span>
            </div>
            <div class="card-main costo-layout">
              <p class="section-tag">LA RESPUESTA HONESTA</p>
              <h2 class="costo-title">Depende.<br>Pero te explico<br>por qué.</h2>
              <div class="franza-box">
                <p class="franza-box-text">No existe un precio fijo porque cada web es distinta. Lo que sí puedo decirte es qué factores lo determinan — y darte rangos reales para que no te sorprendas.</p>
              </div>
              <p class="costo-hint">En las próximas slides te desgloso todo.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- OPCIÓN 1: PLANTILLA -->
      <div v-if="activeSlideCosto === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — Plantilla</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 07</span>
            </div>
            <div class="card-main costo-layout">
              <p class="section-tag">OPCIÓN 1</p>
              <h2 class="costo-title">Web con<br>plantilla.</h2>
              <div class="costo-price-tag">$150.000 – $400.000 ARS</div>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Rápida de implementar</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Diseño probado y responsive</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-neg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Limitada en personalización</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-neg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Puede verse igual a otras webs</span>
                </div>
              </div>
              <p class="costo-para-quien">✦ Ideal para negocios chicos que recién arrancan</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- OPCIÓN 2: A MEDIDA -->
      <div v-if="activeSlideCosto === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — A medida</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 07</span>
            </div>
            <div class="card-main costo-layout">
              <p class="section-tag">OPCIÓN 2</p>
              <h2 class="costo-title">Web a<br>medida.</h2>
              <div class="costo-price-tag">$500.000 – $2.000.000+ ARS</div>
              <div class="info-block">
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">100% adaptada a tu negocio</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Funciones y diseño únicos</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-pos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Escala con tu empresa</span>
                </div>
                <div class="info-row">
                  <span class="ic-wrap ic-neg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg></span>
                  <span class="info-text">Mayor inversión inicial</span>
                </div>
              </div>
              <p class="costo-para-quien">✦ Ideal para negocios que necesitan algo único</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- ¿QUÉ AFECTA EL PRECIO? -->
      <div v-if="activeSlideCosto === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — Factores</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 07</span>
            </div>
            <div class="card-main costo-layout">
              <p class="section-tag">¿QUÉ AFECTA EL PRECIO?</p>
              <h2 class="costo-title">6 factores<br>clave.</h2>
              <div class="costo-factors-grid">
                <div class="costo-factor">
                  <span class="costo-factor-num">01</span>
                  <span class="costo-factor-label">Cantidad de páginas</span>
                </div>
                <div class="costo-factor">
                  <span class="costo-factor-num">02</span>
                  <span class="costo-factor-label">Diseño personalizado</span>
                </div>
                <div class="costo-factor">
                  <span class="costo-factor-num">03</span>
                  <span class="costo-factor-label">Funciones especiales</span>
                </div>
                <div class="costo-factor">
                  <span class="costo-factor-num">04</span>
                  <span class="costo-factor-label">Integraciones</span>
                </div>
                <div class="costo-factor">
                  <span class="costo-factor-num">05</span>
                  <span class="costo-factor-label">Horas de trabajo</span>
                </div>
                <div class="costo-factor">
                  <span class="costo-factor-num">06</span>
                  <span class="costo-factor-label">Urgencia / plazo</span>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- EL ERROR MÁS COMÚN -->
      <div v-if="activeSlideCosto === 5" class="single-card-wrap">
        <p class="single-label">SLIDE 05 — El error común</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 07</span>
            </div>
            <div class="card-main costo-layout">
              <p class="section-tag">EL ERROR MÁS COMÚN</p>
              <h2 class="costo-title">El más barato<br>no siempre es<br>el mejor.</h2>
              <div class="costo-box">
                <p class="costo-box-text">Una web mal hecha te cuesta más a largo plazo: la rehacés, perdés clientes, pagás dos veces. La inversión inicial importa menos que el resultado final.</p>
              </div>
              <div class="franza-box">
                <p class="franza-box-text">Preguntá qué incluye, cuántas horas de trabajo lleva y qué pasa después de entregado.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideCosto === 6" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">07 / 07</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿TENÉS UN PROYECTO EN MENTE?</p>
                <h2 class="cta-big-title">Hablemos<br>de tu<br><span class="text-accent">presupuesto</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span>
                    <span class="cta-link-text">Escribime por DM</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section><!-- /post 07 -->

    <!-- ============================= 08 · 5 PREGUNTAS ANTES DE CONTRATAR ============================= -->
    <section v-if="activePost === 7" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in preguntasSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlidePreguntas === i }]"
          @click="activeSlidePreguntas = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in preguntasSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlidePreguntas === i, past: i < activeSlidePreguntas }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlidePreguntas === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Antes de firmar</p>
                <h2 class="cover-title" style="font-size:120px; line-height:0.88">5 preguntas antes de contratar un desarrollador.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Para no arrepentirte después.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 07</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- PREGUNTAS 1-5 -->
      <template v-for="(p, pi) in preguntas" :key="p.num">
        <div v-if="activeSlidePreguntas === pi + 1" class="single-card-wrap">
          <p class="single-label">PREGUNTA {{ p.num }}</p>
          <div class="card-wrapper card-wrapper-lg">
            <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
              <div class="slide-topbar">
                <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                <span class="slide-counter accent-counter">0{{ pi + 2 }} / 07</span>
              </div>
              <div class="card-main preg-layout">
                <div class="preg-num-row">
                  <span class="preg-big-num">{{ p.num }}</span>
                  <span class="section-tag" style="margin-bottom:0">PREGUNTA</span>
                </div>
                <h2 class="preg-question">{{ p.q }}</h2>
                <div class="preg-why-wrap">
                  <p class="preg-why-label">¿Por qué importa?</p>
                  <div class="franza-box">
                    <p class="franza-box-text">{{ p.why }}</p>
                  </div>
                </div>
              </div>
              <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
            </div>
          </div>
        </div>
      </template>

      <!-- CTA -->
      <div v-if="activeSlidePreguntas === 6" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">07 / 07</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿YA TENÉS TUS RESPUESTAS?</p>
                <h2 class="cta-big-title">Yo te las<br>doy <span class="text-accent">todas</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span>
                    <span class="cta-link-text">Escribime por DM</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section><!-- /post 08 -->

    <!-- ============================= 09 · ¿NECESITO WEB O ME ALCANZA CON LAS REDES? ============================= -->
    <section v-if="activePost === 8" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in instaSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlideInsta === i }]"
          @click="activeSlideInsta = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in instaSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlideInsta === i, past: i < activeSlideInsta }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideInsta === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">La pregunta del millón.</p>
                <h2 class="cover-title" style="font-size:88px; line-height:0.9">¿Necesito web o me alcanza con las redes?</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Respuesta directa y sin rodeos.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- REDES SOCIALES -->
      <div v-if="activeSlideInsta === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — Redes Sociales</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 06</span>
            </div>
            <div class="card-main tipo-layout">
              <p class="section-tag">REDES SOCIALES</p>
              <h2 class="tipo-title">Rápido,<br>gratis y<br>con gente.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text">Instagram, TikTok, Facebook — te dan visibilidad inmediata y comunidad sin costo inicial. Son perfectas para construir marca y estar presente en el día a día.</p>
              </div>
              <div class="tipo-cuando">
                <svg class="tipo-cuando-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <span>Cuándo alcanza: estás empezando, tu negocio es local o vendés productos muy visuales.</span>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- TU WEB -->
      <div v-if="activeSlideInsta === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — Tu web</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 06</span>
            </div>
            <div class="card-main tipo-layout">
              <p class="section-tag">TU WEB</p>
              <h2 class="tipo-title">Tuya.<br>Para<br>siempre.</h2>
              <div class="tipo-box is-medida">
                <p class="tipo-box-text">Las redes pueden cambiar el algoritmo, bloquearte o desaparecer. Tu web es propiedad tuya: la controlás, la personalizás y nadie te la quita.</p>
              </div>
              <div class="tipo-cuando">
                <svg class="tipo-cuando-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <span>Cuándo conviene: querés escalar, captar leads o vender servicios profesionales.</span>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- COMPARACIÓN -->
      <div v-if="activeSlideInsta === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — Comparación</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 06</span>
            </div>
            <div class="card-main vs-layout">
              <div class="vs-header-legend">
                <span class="vs-legend-bad">✕ REDES</span>
                <span class="vs-legend-sep">vs</span>
                <span class="vs-legend-good">✓ TU WEB</span>
              </div>
              <div class="vs-pairs">
                <div class="vs-pair">
                  <div class="vs-bad"><span class="vs-x">✕</span><span>Dependés del algoritmo</span></div>
                  <div class="vs-good"><span class="vs-chk">✓</span><span>Vos tenés el control</span></div>
                </div>
                <div class="vs-pair">
                  <div class="vs-bad"><span class="vs-x">✕</span><span>No aparecés en Google</span></div>
                  <div class="vs-good"><span class="vs-chk">✓</span><span>Aparecés en Google</span></div>
                </div>
                <div class="vs-pair">
                  <div class="vs-bad"><span class="vs-x">✕</span><span>La cuenta no es tuya</span></div>
                  <div class="vs-good"><span class="vs-chk">✓</span><span>La web es tuya para siempre</span></div>
                </div>
                <div class="vs-pair">
                  <div class="vs-bad"><span class="vs-x">✕</span><span>El algoritmo decide tu alcance</span></div>
                  <div class="vs-good"><span class="vs-chk">✓</span><span>Visible las 24hs, sin depender de nadie</span></div>
                </div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- LA RESPUESTA -->
      <div v-if="activeSlideInsta === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — La respuesta</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 06</span>
            </div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">LA RESPUESTA</p>
              <h2 class="pregunta-title">No es<br>una o la<br>otra.<br>Son las dos.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">Las redes traen tráfico. Tu web lo <span class="text-accent">convierte</span>. Un like dura un segundo. Una web trabaja las 24hs aunque vos no estés.</p>
              </div>
              <p class="pregunta-sub">El que arranca solo con redes siempre llega al mismo punto: necesito una web.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideInsta === 5" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 06</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿LISTO PARA EL SIGUIENTE PASO?</p>
                <h2 class="cta-big-title">La web que<br>potencia tus<br><span class="text-accent">redes</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span>
                    <span class="cta-link-text">Escribime por DM</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section><!-- /post 09 -->

    <!-- ============================= 10 · HOSTING: QUÉ ES Y CUÁL ELEGIR ============================= -->
    <section v-if="activePost === 9" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in hostingSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlideHosting === i }]"
          @click="activeSlideHosting = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in hostingSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlideHosting === i, past: i < activeSlideHosting }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideHosting === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Tu web vive en algún lugar.</p>
                <h2 class="cover-title" style="font-size:130px; line-height:0.9">¿QUÉ ES EL HOSTING?</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Qué es, qué tipos hay y cuál te conviene.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- ¿QUÉ ES? -->
      <div v-if="activeSlideHosting === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — ¿Qué es?</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 08</span>
            </div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">¿QUÉ ES EL HOSTING?</p>
              <h2 class="pregunta-title">El lugar<br>donde<br>vive tu<br>web.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">Cada página web ocupa espacio en un servidor — una computadora conectada a internet las 24hs. Ese espacio de alquiler es el <span class="text-accent">hosting</span>.</p>
              </div>
              <p class="pregunta-sub">Sin hosting, tu web no existe en internet.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- COMPARTIDO -->
      <div v-if="activeSlideHosting === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — Compartido</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 08</span>
            </div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">HOSTING COMPARTIDO</p>
              <h2 class="ht-slide-title">El más popular<br>para arrancar.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">Tu web vive en el mismo servidor que otras cientos de webs. Los recursos se comparten — barato, pero con límites.</p>
              </div>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✔ Precio mínimo (~$3-8/mes)</div>
                <div class="ht-detail-chip ht-chip-good">✔ Fácil de configurar</div>
                <div class="ht-detail-chip ht-chip-bad">✘ Lento si hay mucho tráfico</div>
                <div class="ht-detail-chip ht-chip-bad">✘ Sin control del servidor</div>
              </div>
              <div class="ht-examples">
                <span class="ht-example-label">Ejemplos:</span>
                <span class="ht-brand">Hostinger</span>
                <span class="ht-brand">DonWeb</span>
                <span class="ht-brand">SiteGround</span>
                <span class="ht-brand">Bluehost</span>
              </div>
              <p class="pregunta-sub">Ideal para: páginas nuevas, portfolios, negocios locales.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- VPS -->
      <div v-if="activeSlideHosting === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — VPS</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 08</span>
            </div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">VPS — VIRTUAL PRIVATE SERVER</p>
              <h2 class="ht-slide-title">Tu propio<br>espacio.<br>Tu control.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">Un servidor físico dividido en máquinas virtuales. Cada una con recursos propios — no dependés de nadie más.</p>
              </div>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✔ Recursos dedicados</div>
                <div class="ht-detail-chip ht-chip-good">✔ Configurable a medida</div>
                <div class="ht-detail-chip ht-chip-bad">✘ Requiere saber más técnica</div>
                <div class="ht-detail-chip ht-chip-bad">✘ Más caro (~$10-40/mes)</div>
              </div>
              <div class="ht-examples">
                <span class="ht-example-label">Ejemplos:</span>
                <span class="ht-brand">DigitalOcean</span>
                <span class="ht-brand">Linode</span>
                <span class="ht-brand">Contabo</span>
                <span class="ht-brand">Vultr</span>
              </div>
              <p class="pregunta-sub">Ideal para: tiendas online, apps, negocios en crecimiento.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CLOUD -->
      <div v-if="activeSlideHosting === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — Cloud</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 08</span>
            </div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">CLOUD HOSTING</p>
              <h2 class="ht-slide-title">Sin límite.<br>Sin caídas.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">Tu web se distribuye en muchos servidores a la vez. Si uno falla, otro toma el control — automáticamente.</p>
              </div>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✔ Alta disponibilidad (99.9%)</div>
                <div class="ht-detail-chip ht-chip-good">✔ Escala según el tráfico</div>
                <div class="ht-detail-chip ht-chip-bad">✘ Costo variable según uso</div>
                <div class="ht-detail-chip ht-chip-bad">✘ Más complejo de gestionar</div>
              </div>
              <div class="ht-examples">
                <span class="ht-example-label">Ejemplos:</span>
                <span class="ht-brand">AWS</span>
                <span class="ht-brand">Google Cloud</span>
                <span class="ht-brand">Vercel</span>
                <span class="ht-brand">Netlify</span>
              </div>
              <p class="pregunta-sub">Ideal para: proyectos grandes, apps con picos de tráfico.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- ¿CUÁL ELEGIR? -->
      <div v-if="activeSlideHosting === 5" class="single-card-wrap">
        <p class="single-label">SLIDE 05 — ¿Cuál elegir?</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 08</span>
            </div>
            <div class="card-main tipo-layout">
              <p class="section-tag">¿CUÁL TE CONVIENE?</p>
              <h2 class="tipo-title">Depende<br>de tu<br>etapa.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text"><strong style="color:#f5f5f7">Recién empiezás</strong> → Compartido. Barato, suficiente, fácil de manejar.</p>
              </div>
              <div class="tipo-box is-medida" style="margin-top: 0">
                <p class="tipo-box-text"><strong style="color:#f5f5f7">Negocio establecido</strong> → VPS o Cloud. Más velocidad, mejor experiencia de usuario.</p>
              </div>
              <div class="tipo-cuando">
                <svg class="tipo-cuando-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <span>Yo elijo el hosting para cada proyecto según sus necesidades reales.</span>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- OJO CON ESTO -->
      <div v-if="activeSlideHosting === 6" class="single-card-wrap">
        <p class="single-label">SLIDE 06 — Ojo con esto</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">07 / 08</span>
            </div>
            <div class="card-main costo-layout">
              <p class="section-tag">OJO CON ESTO</p>
              <h2 class="costo-title">El hosting<br>barato<br>sale caro.</h2>
              <div class="costo-box">
                <p class="costo-box-text">Un hosting lento hace que tu web tarde en cargar. Google penaliza eso en el SEO. Perdés visitas antes de que alguien te conozca.</p>
              </div>
              <div class="franza-box">
                <p class="franza-box-text">✔ Velocidad de carga — ✔ Uptime (disponibilidad) — ✔ Soporte ante caídas</p>
              </div>
              <p class="costo-hint">Estos tres factores valen más que el precio mensual.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideHosting === 7" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">08 / 08</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿NO SABÉS CUÁL ELEGIR?</p>
                <h2 class="cta-big-title">Yo elijo<br>el hosting<br><span class="text-accent">por vos</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span>
                    <span class="cta-link-text">Escribime por DM</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section><!-- /post 10 -->

    <!-- ============================= 11 · SEO: POR QUÉ TU WEB NO APARECE EN GOOGLE ============================= -->
    <section v-if="activePost === 10" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in seoSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlideSeo === i }]"
          @click="activeSlideSeo = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in seoSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlideSeo === i, past: i < activeSlideSeo }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideSeo === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Tu web existe. Pero nadie la encuentra.</p>
                <h2 class="cover-title" style="font-size:118px; line-height:0.9">SEO: CÓMO APARECER EN GOOGLE.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Qué es, cómo funciona y qué podés hacer hoy.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- ¿QUÉ ES EL SEO? -->
      <div v-if="activeSlideSeo === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — ¿Qué es?</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 06</span>
            </div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">¿QUÉ ES EL SEO?</p>
              <h2 class="pregunta-title">Que<br>Google<br>te<br>encuentre.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text"><span class="text-accent">SEO</span> (Search Engine Optimization) es el conjunto de acciones que hacen que tu web aparezca en los primeros resultados de Google cuando alguien busca lo que vos ofrecés.</p>
              </div>
              <p class="pregunta-sub">Sin SEO, tu web existe — pero nadie la ve.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CÓMO FUNCIONA -->
      <div v-if="activeSlideSeo === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — Cómo funciona</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 06</span>
            </div>
            <div class="card-main tipo-layout">
              <p class="section-tag">CÓMO FUNCIONA</p>
              <h2 class="tipo-title">Google<br>lee<br>tu web.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text">Google manda robots que recorren tu web, leen el contenido y deciden si es relevante para las búsquedas de las personas.</p>
              </div>
              <div class="tipo-box is-medida" style="margin-top:0">
                <p class="tipo-box-text">Si tu web es rápida, clara y habla del tema correcto — Google la muestra. Si no, la ignora.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- 3 CLAVES -->
      <div v-if="activeSlideSeo === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — 3 Claves</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 06</span>
            </div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">3 CLAVES DEL SEO</p>
              <h2 class="ht-slide-title">Lo que<br>Google<br>valora.</h2>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">&#128269; Palabras clave</div>
                <div class="ht-detail-chip ht-chip-good">&#9889; Velocidad de carga</div>
                <div class="ht-detail-chip ht-chip-good">&#128241; Diseño responsive</div>
                <div class="ht-detail-chip ht-chip-good">&#128279; Links que apuntan a vos</div>
              </div>
              <p class="pregunta-sub">Estos 4 factores determinan tu posición en Google.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- ¿CUÁNTO TARDA? -->
      <div v-if="activeSlideSeo === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — ¿Cuánto tarda?</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 06</span>
            </div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">¿CUÁNTO TARDA EN VER RESULTADOS?</p>
              <h2 class="pregunta-title">Meses,<br>no días.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">El SEO es una inversión a largo plazo. Los primeros resultados se ven entre <span class="text-accent">3 y 6 meses</span>. Pero una vez que posicionás, el tráfico llega solo, sin pagar publicidad.</p>
              </div>
              <p class="pregunta-sub">Google Ads te da visibilidad instantánea — el SEO te da visibilidad permanente.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideSeo === 5" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 06</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿TU WEB NO APARECE EN GOOGLE?</p>
                <h2 class="cta-big-title">Yo lo<br>analizo<br><span class="text-accent">gratis</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span>
                    <span class="cta-link-text">Escribime por DM</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section><!-- /post 11 seo -->

    <!-- ============================= 12 · 4 TIPOS DE WEB ============================= -->
    <section v-if="activePost === 11" class="carousel-section">

      <div class="slide-nav">
        <button v-for="(s, i) in tiposSlides" :key="s.id"
          :class="['slide-btn', { active: activeSlideTipos === i }]"
          @click="activeSlideTipos = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in tiposSlides" :key="s.id"
          :class="['progress-dot', { active: activeSlideTipos === i, past: i < activeSlideTipos }]"></div>
      </div>

      <!-- PORTADA -->
      <div v-if="activeSlideTipos === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">¿Sabés cuál necesitás?</p>
                <h2 class="cover-title" style="font-size:126px; line-height:0.88">4 TIPOS DE WEB.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Landing · Institucional · E-commerce · Web App. Cuál es cuál y cuándo usarla.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- LANDING PAGE -->
      <div v-if="activeSlideTipos === 1" class="single-card-wrap">
        <p class="single-label">SLIDE 01 — Landing Page</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">02 / 06</span>
            </div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
                <span style="font-size:48px; font-weight:900; color:#a78bfa; letter-spacing:0.12em; text-transform:uppercase;">01</span>
                <span style="font-size:34px; font-weight:700; color:#4a4a4f; letter-spacing:0.16em; text-transform:uppercase;">Landing Page</span>
              </div>
              <h2 class="ht-slide-title" style="font-size:100px;">Una página.<br>Un objetivo.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">Diseñada para convertir visitas en clientes. Sin distracciones — todo apunta a una sola acción.</p>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✓ Lanzar un servicio</div>
                <div class="ht-detail-chip ht-chip-good">✓ Campaña puntual</div>
                <div class="ht-detail-chip ht-chip-good">✓ Captar contactos</div>
                <div class="ht-detail-chip ht-chip-good">✓ Costo más bajo</div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- WEB INSTITUCIONAL -->
      <div v-if="activeSlideTipos === 2" class="single-card-wrap">
        <p class="single-label">SLIDE 02 — Web Institucional</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">03 / 06</span>
            </div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
                <span style="font-size:48px; font-weight:900; color:#a78bfa; letter-spacing:0.12em; text-transform:uppercase;">02</span>
                <span style="font-size:34px; font-weight:700; color:#4a4a4f; letter-spacing:0.16em; text-transform:uppercase;">Web Institucional</span>
              </div>
              <h2 class="ht-slide-title" style="font-size:100px;">Tu empresa<br>en la web.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">Múltiples secciones: quiénes somos, servicios, portfolio, contacto. Tu presencia digital completa.</p>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✓ Empresas y estudios</div>
                <div class="ht-detail-chip ht-chip-good">✓ Portfolio de trabajos</div>
                <div class="ht-detail-chip ht-chip-good">✓ Genera confianza</div>
                <div class="ht-detail-chip ht-chip-good">✓ Aparece en Google</div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- E-COMMERCE -->
      <div v-if="activeSlideTipos === 3" class="single-card-wrap">
        <p class="single-label">SLIDE 03 — E-Commerce</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">04 / 06</span>
            </div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
                <span style="font-size:48px; font-weight:900; color:#a78bfa; letter-spacing:0.12em; text-transform:uppercase;">03</span>
                <span style="font-size:34px; font-weight:700; color:#4a4a4f; letter-spacing:0.16em; text-transform:uppercase;">E-Commerce</span>
              </div>
              <h2 class="ht-slide-title" style="font-size:100px;">Tu tienda,<br>abierta 24/7.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">Catálogo, carrito y pagos online. Vendé sin límites de horario ni de ubicación.</p>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✓ Productos físicos</div>
                <div class="ht-detail-chip ht-chip-good">✓ Pagos integrados</div>
                <div class="ht-detail-chip ht-chip-good">✓ Stock y envíos</div>
                <div class="ht-detail-chip ht-chip-bad">✗ Mayor inversión</div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- WEB APP -->
      <div v-if="activeSlideTipos === 4" class="single-card-wrap">
        <p class="single-label">SLIDE 04 — Web App</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">05 / 06</span>
            </div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;">
                <span style="font-size:48px; font-weight:900; color:#a78bfa; letter-spacing:0.12em; text-transform:uppercase;">04</span>
                <span style="font-size:34px; font-weight:700; color:#4a4a4f; letter-spacing:0.16em; text-transform:uppercase;">Web App</span>
              </div>
              <h2 class="ht-slide-title" style="font-size:100px;">Software<br>a medida.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">Sistema personalizado para tu negocio. Gestión de datos, automatización y flujos a tu medida.</p>
              <div class="ht-detail-grid">
                <div class="ht-detail-chip ht-chip-good">✓ Plataformas / SaaS</div>
                <div class="ht-detail-chip ht-chip-good">✓ Sistemas internos</div>
                <div class="ht-detail-chip ht-chip-good">✓ Automatizaciones</div>
                <div class="ht-detail-chip ht-chip-bad">✗ Mayor complejidad</div>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="activeSlideTipos === 5" class="single-card-wrap">
        <p class="single-label">CTA — Último slide</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar">
              <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
              <span class="slide-counter accent-counter">06 / 06</span>
            </div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿CUÁL NECESITÁS VOS?</p>
                <h2 class="cta-big-title">Te ayudo<br>a elegir<br><span class="text-accent">la correcta</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span>
                    <span class="cta-link-text">alejomfernandez.com.ar</span>
                  </div>
                  <div class="cta-link-row">
                    <span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span>
                    <span class="cta-link-text">Escribime por DM</span>
                  </div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo apuntando" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>

    </section><!-- /post 12 tipos web -->

    <!-- ===== 13 · CHECKLIST ANTES DE CONTRATAR UN DEV ===== -->
    <section v-if="activePost === 12" class="carousel-section">
      <div class="slide-nav">
        <button v-for="(s, i) in checklistSlides" :key="s.id" :class="['slide-btn', { active: activeSlideChecklist === i }]" @click="activeSlideChecklist = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in checklistSlides" :key="s.id" :class="['progress-dot', { active: activeSlideChecklist === i, past: i < activeSlideChecklist }]"></div>
      </div>
      <!-- PORTADA -->
      <div v-if="activeSlideChecklist === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Antes de contratar un developer</p>
                <h2 class="cover-title" style="font-size:112px; line-height:0.9">5 PREGUNTAS QUE TENÉS QUE HACER.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Guardá este checklist para cuando lo necesites.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 07</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- P1 -->
      <div v-if="activeSlideChecklist === 1" class="single-card-wrap">
        <p class="single-label">PREGUNTA 01 — Portfolio</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">02 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">PREGUNTA 01 / 05</p>
              <h2 class="ht-slide-title">¿Tiene<br>portfolio<br>real?</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">No maquetas ni templates. Pedí el link a un proyecto real que haya entregado a un cliente.</p>
              <div class="ht-detail-chip ht-chip-bad" style="font-size:28px;">Sin portfolio → no seguís.</div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- P2 -->
      <div v-if="activeSlideChecklist === 2" class="single-card-wrap">
        <p class="single-label">PREGUNTA 02 — Proceso</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">03 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">PREGUNTA 02 / 05</p>
              <h2 class="ht-slide-title">¿Cómo<br>trabaja y<br>cuánto<br>tarda?</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">Un dev serio te da etapas claras y fechas estimadas. Si no puede explicarlo, va a tardar el doble.</p>
              <div class="ht-detail-chip ht-chip-good" style="font-size:28px;">Pedí el proceso por escrito.</div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- P3 -->
      <div v-if="activeSlideChecklist === 3" class="single-card-wrap">
        <p class="single-label">PREGUNTA 03 — Qué incluye</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">04 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">PREGUNTA 03 / 05</p>
              <h2 class="ht-slide-title">¿Qué<br>incluye<br>y qué no?</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">Revisiones, hosting, dominio, mantenimiento. Que todo quede por escrito antes de empezar. Las sorpresas siempre cuestan más.</p>
              <div class="ht-detail-chip ht-chip-bad" style="font-size:28px;">Sin contrato escrito → riesgo.</div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- P4 -->
      <div v-if="activeSlideChecklist === 4" class="single-card-wrap">
        <p class="single-label">PREGUNTA 04 — Propiedad</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">05 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">PREGUNTA 04 / 05</p>
              <h2 class="ht-slide-title">¿Quién<br>es dueño<br>de la web?</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">El código, el dominio, el hosting — tiene que ser <span style="color:#a78bfa; font-weight:700;">tuyo</span>. Si el dev se va, tu web no puede desaparecer con él.</p>
              <div class="ht-detail-chip ht-chip-good" style="font-size:28px;">Si no es tuyo, es un alquiler.</div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- P5 -->
      <div v-if="activeSlideChecklist === 5" class="single-card-wrap">
        <p class="single-label">PREGUNTA 05 — Comunicación</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">06 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">PREGUNTA 05 / 05</p>
              <h2 class="ht-slide-title">¿Cómo<br>se comu-<br>nica?</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45; margin-bottom:28px;">¿Por dónde te actualiza? ¿Cada cuánto? ¿Hay versión de prueba para ver el avance? Sin comunicación, el proyecto se pierde.</p>
              <div class="ht-detail-chip ht-chip-good" style="font-size:28px;">Pedí updates semanales mínimo.</div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- CTA -->
      <div v-if="activeSlideChecklist === 6" class="single-card-wrap">
        <p class="single-label">CTA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">07 / 07</span></div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">GUARDÁ ESTO</p>
                <h2 class="cta-big-title">Yo sí<br>te doy<br><span class="text-accent">todo eso</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span><span class="cta-link-text">Escribime por DM</span></div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
    </section><!-- /post 13 checklist -->

    <!-- ===== 14 · PAGASTE UNA WEB Y NO TRAJO CLIENTES ===== -->
    <section v-if="activePost === 13" class="carousel-section">
      <div class="slide-nav">
        <button v-for="(s, i) in noVendeSlides" :key="s.id" :class="['slide-btn', { active: activeSlideNoVende === i }]" @click="activeSlideNoVende = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in noVendeSlides" :key="s.id" :class="['progress-dot', { active: activeSlideNoVende === i, past: i < activeSlideNoVende }]"></div>
      </div>
      <!-- PORTADA -->
      <div v-if="activeSlideNoVende === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Pagaste una web y no te trajo un cliente.</p>
                <h2 class="cover-title" style="font-size:108px; line-height:0.9">5 RAZONES POR LAS QUE TU WEB NO VENDE.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">¿A vos te pasó esto?</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 07</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- R1 -->
      <div v-if="activeSlideNoVende === 1" class="single-card-wrap">
        <p class="single-label">RAZÓN 01 — Sin CTA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">02 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">RAZÓN 01 / 05</p>
              <h2 class="ht-slide-title">No hay<br>botón de<br>contacto.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45;">El visitante llega y no sabe qué hacer. Si no hay un CTA obvio, se van sin contactarte. Nunca te enterás que estuvieron.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- R2 -->
      <div v-if="activeSlideNoVende === 2" class="single-card-wrap">
        <p class="single-label">RAZÓN 02 — Carga lento</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">03 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">RAZÓN 02 / 05</p>
              <h2 class="ht-slide-title">Carga<br>en más<br>de 3 seg.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45;">La mitad de la gente se va si tarda más de 3 segundos. Tu hosting barato te está costando clientes reales.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- R3 -->
      <div v-if="activeSlideNoVende === 3" class="single-card-wrap">
        <p class="single-label">RAZÓN 03 — No mobile</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">04 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">RAZÓN 03 / 05</p>
              <h2 class="ht-slide-title">Se ve mal<br>en el<br>celular.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45;">El <span style="color:#a78bfa; font-weight:700;">80%</span> entra desde el teléfono. Si en mobile se ve roto o con texto chiquito, perdiste ese cliente.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- R4 -->
      <div v-if="activeSlideNoVende === 4" class="single-card-wrap">
        <p class="single-label">RAZÓN 04 — Sin tráfico</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">05 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">RAZÓN 04 / 05</p>
              <h2 class="ht-slide-title">Nadie<br>la visita.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45;">Una web sin visitas no vende nada. Necesitás SEO, redes o publicidad para que la gente llegue. La web sola no alcanza.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- R5 -->
      <div v-if="activeSlideNoVende === 5" class="single-card-wrap">
        <p class="single-label">RAZÓN 05 — Sin confianza</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">06 / 07</span></div>
            <div class="card-main ht-slide-layout">
              <p class="section-tag">RAZÓN 05 / 05</p>
              <h2 class="ht-slide-title">No<br>genera<br>confianza.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:34px; color:#a1a1a6; line-height:1.45;">Sin reseñas, sin fotos reales, sin ejemplos de trabajo. La gente compra a quienes conoce. Tu web tiene que demostrarlo.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- CTA -->
      <div v-if="activeSlideNoVende === 6" class="single-card-wrap">
        <p class="single-label">CTA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">07 / 07</span></div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿A VOS TE PASÓ ESTO?</p>
                <h2 class="cta-big-title">Lo<br>revisamos<br><span class="text-accent">juntos</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span><span class="cta-link-text">Contame tu caso por DM</span></div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
    </section><!-- /post 14 no vende -->

    <!-- ===== 15 · TU CLIENTE TE GOOGLEA ===== -->
    <section v-if="activePost === 14" class="carousel-section">
      <div class="slide-nav">
        <button v-for="(s, i) in googleaSlides" :key="s.id" :class="['slide-btn', { active: activeSlideGooglea === i }]" @click="activeSlideGooglea = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in googleaSlides" :key="s.id" :class="['progress-dot', { active: activeSlideGooglea === i, past: i < activeSlideGooglea }]"></div>
      </div>
      <!-- PORTADA -->
      <div v-if="activeSlideGooglea === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Siempre. Sin excepción.</p>
                <h2 class="cover-title" style="font-size:104px; line-height:0.9">TU CLIENTE TE GOOGLEA ANTES DE LLAMARTE.</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">Lo que ven en esa búsqueda define si te contactan o no.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 05</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- D1 -->
      <div v-if="activeSlideGooglea === 1" class="single-card-wrap">
        <p class="single-label">DATO 01 — El número</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">02 / 05</span></div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">EL DATO</p>
              <h2 class="pregunta-title" style="font-size:200px; line-height:0.85;">81%</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">de los consumidores busca online antes de comprar — <span class="text-accent">incluso si van a comprar en persona</span> o llegaron por recomendación de alguien.</p>
              </div>
              <p class="pregunta-sub">Tu reputación online es el paso 1 de cualquier venta.</p>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- D2 -->
      <div v-if="activeSlideGooglea === 2" class="single-card-wrap">
        <p class="single-label">DATO 02 — Sin web</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">03 / 05</span></div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">LO QUE PASA SI NO APARECÉS</p>
              <h2 class="pregunta-title">Le da<br>confianza<br>al que<br>sí aparece.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">No importa que seas mejor. Si no tenés web o la que tenés está desactualizada, tu competidor que sí aparece se lleva el cliente.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- D3 -->
      <div v-if="activeSlideGooglea === 3" class="single-card-wrap">
        <p class="single-label">DATO 03 — Qué hace una buena web</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">04 / 05</span></div>
            <div class="card-main pregunta-layout">
              <p class="section-tag">LO QUE HACE UNA BUENA WEB</p>
              <h2 class="pregunta-title">Responde<br>antes de<br>que<br>pregunten.</h2>
              <div class="pregunta-box">
                <p class="pregunta-box-text">¿Qué hacés? ¿Cuánto cuesta? ¿Hay ejemplos de tu trabajo? Una web bien hecha convierte la duda en contacto, sin que tengas que estar presente.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- CTA -->
      <div v-if="activeSlideGooglea === 4" class="single-card-wrap">
        <p class="single-label">CTA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">05 / 05</span></div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿QUÉ VEN CUANDO GOOGLEAR TU NEGOCIO?</p>
                <h2 class="cta-big-title">Que<br>aparezca<br><span class="text-accent">lo mejor</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span><span class="cta-link-text">alejomfernandez.com.ar</span></div>
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span><span class="cta-link-text">Escribime por DM</span></div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
    </section><!-- /post 15 googlea -->

    <!-- ===== 16 · WEB BONITA ≠ WEB QUE VENDE ===== -->
    <section v-if="activePost === 15" class="carousel-section">
      <div class="slide-nav">
        <button v-for="(s, i) in bonitaSlides" :key="s.id" :class="['slide-btn', { active: activeSlideBonita === i }]" @click="activeSlideBonita = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in bonitaSlides" :key="s.id" :class="['progress-dot', { active: activeSlideBonita === i, past: i < activeSlideBonita }]"></div>
      </div>
      <!-- PORTADA -->
      <div v-if="activeSlideBonita === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow" style="color:#f59e0b;">Diseño vs. conversión</p>
                <h2 class="cover-title" style="font-size:110px; line-height:0.9">WEB BONITA ≠ WEB QUE TRAE CLIENTES.</h2>
                <div class="cover-divider" style="background:#f59e0b;"></div>
                <p class="cover-sub">3 creencias que le cuestan ventas a tu negocio.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 05</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line" style="background:#f59e0b;"></div></div>
          </div>
        </div>
      </div>
      <!-- C1 -->
      <div v-if="activeSlideBonita === 1" class="single-card-wrap">
        <p class="single-label">COMPARACIÓN 01 — Velocidad</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter" style="color:#f59e0b;">02 / 05</span></div>
            <div class="card-main tipo-layout">
              <p class="section-tag" style="color:#f59e0b;">ANIMACIONES vs. VELOCIDAD</p>
              <h2 class="tipo-title">Efectos 3D<br>y parallax.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text">Web con animaciones pesadas y efectos visuales → tarda <strong style="color:#f87171;">8 segundos</strong> en cargar. La mitad de la gente ya se fue.</p>
              </div>
              <div class="tipo-box is-medida" style="margin-top:0;">
                <p class="tipo-box-text" style="color:#f59e0b;">Una web limpia que carga en 1.2 seg convierte <strong>3 veces más</strong> que una "bonita" que tarda 5.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line" style="background:#f59e0b;"></div></div>
          </div>
        </div>
      </div>
      <!-- C2 -->
      <div v-if="activeSlideBonita === 2" class="single-card-wrap">
        <p class="single-label">COMPARACIÓN 02 — Fotos</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter" style="color:#f59e0b;">03 / 05</span></div>
            <div class="card-main tipo-layout">
              <p class="section-tag" style="color:#f59e0b;">FOTOS DE STOCK vs. FOTOS REALES</p>
              <h2 class="tipo-title">Imágenes<br>perfectas<br>de banco.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text">Fotos genéricas de personas sonriendo que claramente no son del negocio → nadie cree que sos vos. Se genera desconfianza.</p>
              </div>
              <div class="tipo-box is-medida" style="margin-top:0;">
                <p class="tipo-box-text" style="color:#f59e0b;">Una foto real tuya o de tu local vale más que 10 imágenes perfectas de stock. La gente compra personas, no diseños.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line" style="background:#f59e0b;"></div></div>
          </div>
        </div>
      </div>
      <!-- C3 -->
      <div v-if="activeSlideBonita === 3" class="single-card-wrap">
        <p class="single-label">COMPARACIÓN 03 — Navegación</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter" style="color:#f59e0b;">04 / 05</span></div>
            <div class="card-main tipo-layout">
              <p class="section-tag" style="color:#f59e0b;">MENÚ COMPLEJO vs. NAVEGACIÓN CLARA</p>
              <h2 class="tipo-title">8 opciones<br>en el menú.</h2>
              <div class="tipo-box">
                <p class="tipo-box-text">Home, Nosotros, Servicios, Portfolio, Blog, Equipo, FAQ, Contacto... El visitante no sabe a dónde ir y se va.</p>
              </div>
              <div class="tipo-box is-medida" style="margin-top:0;">
                <p class="tipo-box-text" style="color:#f59e0b;">3 acciones claras + 1 CTA visible = más contactos. Menos opciones, más decisiones.</p>
              </div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line" style="background:#f59e0b;"></div></div>
          </div>
        </div>
      </div>
      <!-- CTA -->
      <div v-if="activeSlideBonita === 4" class="single-card-wrap">
        <p class="single-label">CTA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter" style="color:#f59e0b;">05 / 05</span></div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag" style="color:#f59e0b;">¿ESTÁS DE ACUERDO?</p>
                <h2 class="cta-big-title">Yo diseño<br>para<br><span style="color:#f59e0b;">vender</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span><span class="cta-link-text">Escribime por DM</span></div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line" style="background:#f59e0b;"></div></div>
          </div>
        </div>
      </div>
    </section><!-- /post 16 bonita -->

    <!-- ===== 17 · MINI-GUÍA: QUÉ WEB NECESITA TU NEGOCIO ===== -->
    <section v-if="activePost === 16" class="carousel-section">
      <div class="slide-nav">
        <button v-for="(s, i) in miniGuiaSlides" :key="s.id" :class="['slide-btn', { active: activeSlideMiniGuia === i }]" @click="activeSlideMiniGuia = i">{{ s.label }}</button>
      </div>
      <div class="progress-bar">
        <div v-for="(s, i) in miniGuiaSlides" :key="s.id" :class="['progress-dot', { active: activeSlideMiniGuia === i, past: i < activeSlideMiniGuia }]"></div>
      </div>
      <!-- PORTADA -->
      <div v-if="activeSlideMiniGuia === 0" class="single-card-wrap">
        <p class="single-label">PORTADA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="af-logo"><img src="/logoAFwhite.png" alt="AF" /></div>
            <div class="card-main cover-bottom">
              <div class="cover-text-block">
                <p class="cover-eyebrow">Mini-guía completa</p>
                <h2 class="cover-title" style="font-size:108px; line-height:0.9">¿QUÉ WEB NECESITA TU NEGOCIO?</h2>
                <div class="cover-divider"></div>
                <p class="cover-sub">4 tipos, cuándo usar cada uno. Guardá esto.</p>
              </div>
            </div>
            <div class="carousel-counter">01 / 06</div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- LANDING -->
      <div v-if="activeSlideMiniGuia === 1" class="single-card-wrap">
        <p class="single-label">TIPO 01 — Landing Page</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">02 / 06</span></div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;"><span style="font-size:48px; font-weight:900; color:#a78bfa;">01</span><span style="font-size:30px; font-weight:700; color:#4a4a4f; letter-spacing:0.14em; text-transform:uppercase;">Landing Page</span></div>
              <h2 class="ht-slide-title" style="font-size:90px;">Emprendedor<br>con 1 servicio.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:33px; color:#a1a1a6; line-height:1.4; margin-bottom:22px;">Presentás tu servicio, mostrás por qué elegirte y cerrás con WhatsApp o formulario. Simple y efectivo.</p>
              <div class="ht-examples"><span class="ht-example-label">Inversión:</span><span class="ht-brand" style="background:rgba(167,139,250,0.1); color:#a78bfa;">Baja</span></div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- INSTITUCIONAL -->
      <div v-if="activeSlideMiniGuia === 2" class="single-card-wrap">
        <p class="single-label">TIPO 02 — Institucional</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">03 / 06</span></div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;"><span style="font-size:48px; font-weight:900; color:#a78bfa;">02</span><span style="font-size:30px; font-weight:700; color:#4a4a4f; letter-spacing:0.14em; text-transform:uppercase;">Web Institucional</span></div>
              <h2 class="ht-slide-title" style="font-size:90px;">Empresa con<br>múltiples<br>servicios.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:33px; color:#a1a1a6; line-height:1.4; margin-bottom:22px;">Quiénes somos, qué hacemos, portfolio, equipo y contacto. Genera confianza y aparece en Google.</p>
              <div class="ht-examples"><span class="ht-example-label">Inversión:</span><span class="ht-brand" style="background:rgba(167,139,250,0.1); color:#a78bfa;">Media</span></div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- ECOMMERCE -->
      <div v-if="activeSlideMiniGuia === 3" class="single-card-wrap">
        <p class="single-label">TIPO 03 — E-Commerce</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">04 / 06</span></div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;"><span style="font-size:48px; font-weight:900; color:#a78bfa;">03</span><span style="font-size:30px; font-weight:700; color:#4a4a4f; letter-spacing:0.14em; text-transform:uppercase;">E-Commerce</span></div>
              <h2 class="ht-slide-title" style="font-size:90px;">Vendés<br>productos<br>físicos.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:33px; color:#a1a1a6; line-height:1.4; margin-bottom:22px;">Catálogo, carrito, stock y pagos integrados. Vendé 24/7 sin depender de una persona que atienda.</p>
              <div class="ht-examples"><span class="ht-example-label">Inversión:</span><span class="ht-brand" style="background:rgba(167,139,250,0.1); color:#a78bfa;">Media-Alta</span></div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- WEBAPP -->
      <div v-if="activeSlideMiniGuia === 4" class="single-card-wrap">
        <p class="single-label">TIPO 04 — Web App</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">05 / 06</span></div>
            <div class="card-main ht-slide-layout">
              <div style="display:flex; align-items:center; gap:24px; margin-bottom:8px;"><span style="font-size:48px; font-weight:900; color:#a78bfa;">04</span><span style="font-size:30px; font-weight:700; color:#4a4a4f; letter-spacing:0.14em; text-transform:uppercase;">Web App</span></div>
              <h2 class="ht-slide-title" style="font-size:90px;">Necesitás<br>automatizar<br>procesos.</h2>
              <div class="ht-divider"></div>
              <p style="font-size:33px; color:#a1a1a6; line-height:1.4; margin-bottom:22px;">Panel de gestión, carga de datos, usuarios y reportes. Sistema hecho a medida de tu empresa.</p>
              <div class="ht-examples"><span class="ht-example-label">Inversión:</span><span class="ht-brand" style="background:rgba(167,139,250,0.1); color:#a78bfa;">Alta</span></div>
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
      <!-- CTA -->
      <div v-if="activeSlideMiniGuia === 5" class="single-card-wrap">
        <p class="single-label">CTA</p>
        <div class="card-wrapper card-wrapper-lg">
          <div class="ig-card" :style="{ backgroundImage: `url(${particleBg})` }">
            <div class="slide-topbar"><div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div><span class="slide-counter accent-counter">06 / 06</span></div>
            <div class="card-main carousel-cta-main">
              <div class="cta-text-block">
                <p class="section-tag">¿CUÁL ES LA TUYA?</p>
                <h2 class="cta-big-title">Te ayudo<br>a elegir<br><span class="text-accent">la correcta</span>.</h2>
                <div class="cta-links">
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></span><span class="cta-link-text">alejomfernandez.com.ar</span></div>
                  <div class="cta-link-row"><span class="ic-wrap ic-wrap-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg></span><span class="cta-link-text">Escribime por DM</span></div>
                </div>
              </div>
              <img class="sticker-cta-final" src="/images/stickerapuntando.png" alt="Alejo" />
            </div>
            <div class="card-footer"><span class="watermark">{{ watermark }}</span><div class="blue-line"></div></div>
          </div>
        </div>
      </div>
    </section><!-- /post 17 mini-guia -->

    <!-- ============================= STORY DETAIL VIEW ============================= -->
    <div v-if="activePost === null && activeStory !== null" class="lab-story-view" :style="{ '--story-scale': storyScale, '--post-accent': postTypes[storiesMeta[activeStory].type].color }">

      <div class="detail-header">
        <button class="detail-back" @click="activeStory = null">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          Historias
        </button>
        <div class="detail-title-area">
          <span class="detail-post-name">{{ storiesMeta[activeStory].name }}</span>
          <span :class="['status-badge', 'status-' + storiesMeta[activeStory].status.value]">{{ statusLabels[storiesMeta[activeStory].status.value] }}</span>
        </div>
        <div class="detail-header-right">
          <span class="detail-counter">{{ currentStorySlideIdx + 1 }} / {{ currentStorySlideMax }}</span>
          <button class="regen-btn-sm" @click="generateParticleBg">↺ Fondo</button>
        </div>
      </div>

      <div class="story-stage">
        <button class="detail-arrow" @click="navigateStorySlide(-1)" :disabled="currentStorySlideIdx === 0" aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
        </button>

        <!-- H01: ¿Qué significan los colores? -->
        <div v-if="storiesMeta[activeStory].storyKey === 'colores'" class="story-content">

          <!-- SLIDE 0 — INTRO -->
          <div v-if="activeStorySlide === 0" class="single-card-wrap">
            <p class="single-label">INTRO</p>
            <div class="story-card-wrapper">
              <div class="ig-story" :style="{ backgroundImage: `url(${particleBg})` }">
                <div class="story-topbar">
                  <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                  <span class="story-counter">01 / 06</span>
                </div>
                <div class="story-main story-main-center">
                  <p class="story-eyebrow">¿Viste la raya de color?</p>
                  <h2 class="story-big-title">Tiene<br>un<br><span style="color: #38bdf8">significado</span>.</h2>
                  <p class="story-sub">Cada publicación mía tiene una línea de color abajo. No es decorativa.</p>
                </div>
                <div class="story-footer">
                  <span class="watermark">{{ watermark }}</span>
                  <div class="blue-line"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- SLIDES 1-4: cada color -->
          <template v-for="(c, ci) in storyColores" :key="c.num">
            <div v-if="activeStorySlide === ci + 1" class="single-card-wrap">
              <p class="single-label">COLOR {{ c.num }}</p>
              <div class="story-card-wrapper">
                <div class="ig-story" :style="{ backgroundImage: `url(${particleBg})` }">
                  <div class="story-topbar">
                    <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                    <span class="story-counter">0{{ ci + 2 }} / 06</span>
                  </div>
                  <div class="story-main story-main-color">
                    <div class="color-swatch-big" :style="{ background: c.color }"></div>
                    <div class="color-info">
                      <span class="color-chip-label" :style="{ color: c.color }">{{ c.label }}</span>
                      <h2 class="color-title" :style="{ color: c.color }">{{ postTypes[c.type].label }}</h2>
                      <p class="color-desc">{{ c.desc }}</p>
                    </div>
                  </div>
                  <div class="story-footer">
                    <span class="watermark">{{ watermark }}</span>
                    <div class="blue-line" :style="{ background: c.color }"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- SLIDE 5 — CTA -->
          <div v-if="activeStorySlide === 5" class="single-card-wrap">
            <p class="single-label">CTA</p>
            <div class="story-card-wrapper">
              <div class="ig-story" :style="{ backgroundImage: `url(${particleBg})` }">
                <div class="story-topbar">
                  <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                  <span class="story-counter">06 / 06</span>
                </div>
                <div class="story-main story-main-center">
                  <p class="story-eyebrow">Ahora que sabés</p>
                  <h2 class="story-big-title">¿Cuál es<br>tu <span style="color: #38bdf8">favorito</span>?</h2>
                  <p class="story-sub">Lo voy a tener fijo en mis destacados — volvé cuando quieras.</p>
                  <div class="story-color-strip">
                    <div v-for="c in storyColores" :key="c.num" class="story-strip-block" :style="{ background: c.color }"></div>
                  </div>
                </div>
                <div class="story-footer">
                  <span class="watermark">{{ watermark }}</span>
                  <div class="blue-line"></div>
                </div>
              </div>
            </div>
          </div>

        </div><!-- /story colores -->

        <!-- H02: FAQ — Dudas frecuentes -->
        <div v-if="storiesMeta[activeStory].storyKey === 'faq'" class="story-content">

          <!-- SLIDE 0 — INTRO -->
          <div v-if="activeStorySlide === 0" class="single-card-wrap">
            <p class="single-label">INTRO</p>
            <div class="story-card-wrapper">
              <div class="ig-story" :style="{ backgroundImage: `url(${particleBg})` }">
                <div class="story-topbar">
                  <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                  <span class="story-counter">01 / 08</span>
                </div>
                <div class="story-main story-main-center">
                  <p class="story-eyebrow">Antes de escribirme</p>
                  <h2 class="story-big-title">Dudas<br><span style="color: #38bdf8">frecuentes</span>.</h2>
                  <p class="story-sub">Las preguntas que me hacen antes de arrancar — respondidas de una vez.</p>
                </div>
                <div class="story-footer">
                  <span class="watermark">{{ watermark }}</span>
                  <div class="blue-line"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- SLIDES 1-6: preguntas -->
          <template v-for="(f, fi) in faqItems" :key="f.num">
            <div v-if="activeStorySlide === fi + 1" class="single-card-wrap">
              <p class="single-label">PREGUNTA {{ f.num }}</p>
              <div class="story-card-wrapper">
                <div class="ig-story" :style="{ backgroundImage: `url(${particleBg})` }">
                  <div class="story-topbar">
                    <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                    <span class="story-counter">0{{ fi + 2 }} / 08</span>
                  </div>
                  <div class="story-main story-main-faq">
                    <div class="faq-top-row">
                      <span class="faq-eyebrow">PREGUNTA</span>
                      <span class="faq-big-num">{{ f.num }}</span>
                    </div>
                    <h2 class="faq-q">{{ f.q }}</h2>
                    <div class="faq-a-box">
                      <p class="faq-a-text">{{ f.a }}</p>
                    </div>
                  </div>
                  <div class="story-footer">
                    <span class="watermark">{{ watermark }}</span>
                    <div class="blue-line"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- SLIDE 7 — CTA -->
          <div v-if="activeStorySlide === 7" class="single-card-wrap">
            <p class="single-label">CTA</p>
            <div class="story-card-wrapper">
              <div class="ig-story" :style="{ backgroundImage: `url(${particleBg})` }">
                <div class="story-topbar">
                  <div class="af-logo-sm"><img src="/logoAFwhite.png" alt="AF" /></div>
                  <span class="story-counter">08 / 08</span>
                </div>
                <div class="story-main story-main-center">
                  <p class="story-eyebrow">¿Quedó alguna más?</p>
                  <h2 class="story-big-title">Escribime<br>sin <span style="color: #38bdf8">miedo</span>.</h2>
                  <p class="story-sub">Lo voy a tener fijo en mis destacados — volvé cuando quieras.</p>
                </div>
                <div class="story-footer">
                  <span class="watermark">{{ watermark }}</span>
                  <div class="blue-line"></div>
                </div>
              </div>
            </div>
          </div>

        </div><!-- /story faq -->

        <button class="detail-arrow" @click="navigateStorySlide(1)" :disabled="currentStorySlideIdx === currentStorySlideMax - 1" aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
        </button>
      </div>

      <p class="detail-hint">Usá <kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>ESC</kbd> para volver</p>

    </div><!-- /story-view -->

  </div>
</template>

<style scoped>
/* ===== LAB PAGE ===== */
.lab {
  min-height: 100vh;
  background: #080808;
  padding: 0;
  font-family: 'Inter', -apple-system, sans-serif;
}

/* ===== GRID VIEW ===== */
.lab-grid-view {
  padding: 48px 48px 80px;
  max-width: 1200px;
  margin: 0 auto;
}
.lab-grid-topbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 24px;
}
.lab-grid-topbar-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}
.lab-grid-eyebrow {
  font-size: 12px;
  color: #3a3a3f;
  letter-spacing: 0.18em;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.lab-grid-title {
  font-size: 36px;
  font-weight: 800;
  color: #f5f5f7;
  letter-spacing: -0.02em;
}
.status-legend {
  display: flex;
  gap: 20px;
  align-items: center;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #4a4a4f;
  font-weight: 500;
}
.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ld-posteado      { background: #f5f5f7; }
.ld-programado    { background: #f59e0b; }
.ld-desarrollado  { background: #4ade80; }
.ld-en-desarrollo { background: #38bdf8; }
.ld-borrador      { background: #4a4a4f; }

/* Status badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 4px 11px;
  border-radius: 100px;
  text-transform: uppercase;
  line-height: 1;
  cursor: pointer;
  border: none;
  font-family: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.status-badge:hover { opacity: 0.8; }
.status-badge.status-posteado      { background: rgba(255,255,255,0.08); color: #f5f5f7; outline: 1px solid rgba(255,255,255,0.25); }
.status-badge.status-programado    { background: rgba(245,158,11,0.15); color: #f59e0b; outline: 1px solid rgba(245,158,11,0.3); }
.status-badge.status-desarrollado  { background: rgba(74,222,128,0.10); color: #4ade80; outline: 1px solid rgba(74,222,128,0.25); }
.status-badge.status-en-desarrollo { background: rgba(56,189,248,0.12); color: #38bdf8; outline: 1px solid rgba(56,189,248,0.25); }
.status-badge.status-borrador      { background: rgba(255,255,255,0.05); color: #5a5a5f; outline: 1px solid rgba(255,255,255,0.08); }

/* ===== STATUS DROPDOWN ===== */
.status-dropdown-wrap {
  position: relative;
}
.status-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: #1c1c1e;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 100;
  min-width: 160px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.6);
}
.status-dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}
.status-dropdown-item:hover { background: rgba(255,255,255,0.06); }
.status-dropdown-item.active { background: rgba(255,255,255,0.05); }
.status-dropdown-item.status-posteado      { color: #f5f5f7; }
.status-dropdown-item.status-programado    { color: #f59e0b; }
.status-dropdown-item.status-desarrollado  { color: #4ade80; }
.status-dropdown-item.status-en-desarrollo { color: #38bdf8; }
.status-dropdown-item.status-borrador      { color: #5a5a5f; }

.lab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.posts-tab-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.grid-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #4a4a4f;
  font-size: 14px;
  padding: 40px 0;
}
/* Stats bar */
.stats-bar {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.stat-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: #111;
  border: 1px solid #1e1e22;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.stat-chip:hover { border-color: #38bdf8; }
.stat-chip.active { background: #0f2a38; border-color: #38bdf8; }
.stat-chip.active .stat-chip-num  { color: #38bdf8; }
.stat-chip.active .stat-chip-label { color: #38bdf8; }
.stat-chip-num {
  font-size: 16px;
  font-weight: 700;
  color: #f5f5f7;
  line-height: 1;
}
.stat-chip-label {
  font-size: 12px;
  color: #6e6e73;
  font-weight: 500;
  white-space: nowrap;
}
.sc-posteado.active      { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.25); }
.sc-posteado.active .stat-chip-num,
.sc-posteado.active .stat-chip-label { color: #f5f5f7; }
.sc-programado.active    { background: rgba(245,158,11,0.12); border-color: rgba(245,158,11,0.4); }
.sc-programado.active .stat-chip-num,
.sc-programado.active .stat-chip-label { color: #f59e0b; }
.sc-desarrollado.active  { background: rgba(74,222,128,0.10); border-color: rgba(74,222,128,0.35); }
.sc-desarrollado.active .stat-chip-num,
.sc-desarrollado.active .stat-chip-label { color: #4ade80; }
.sc-en-desarrollo.active { background: rgba(56,189,248,0.10); border-color: rgba(56,189,248,0.35); }
.sc-en-desarrollo.active .stat-chip-num,
.sc-en-desarrollo.active .stat-chip-label { color: #38bdf8; }
.sc-borrador.active      { background: rgba(255,255,255,0.04); border-color: #3a3a3f; }
.sc-borrador.active .stat-chip-num,
.sc-borrador.active .stat-chip-label { color: #8a8a8f; }
.grid-card {
  position: relative;
  background: #111111;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 28px 28px 24px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s;
  user-select: none;
}
.grid-card:hover {
  background: #141414;
  border-color: rgba(56,189,248,0.28);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.grid-card-top { display: flex; align-items: center; }
.grid-card-num {
  position: absolute;
  bottom: -20px;
  right: 12px;
  font-size: 130px;
  font-weight: 900;
  color: rgba(255,255,255,0.025);
  line-height: 1;
  user-select: none;
  pointer-events: none;
  letter-spacing: -0.04em;
}
.grid-card-accent-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 0 0 18px 18px;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.grid-card:hover .grid-card-accent-bar { opacity: 1; }
.grid-card-type-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 6px;
  padding: 2px 8px;
  display: inline-block;
  margin-bottom: 4px;
}
.grid-card-body { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.grid-card-name {
  font-size: 22px;
  font-weight: 700;
  color: #f5f5f7;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.grid-card-meta { font-size: 13px; color: #4a4a4f; }
.grid-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 13px;
  color: #3a3a3f;
  font-weight: 500;
  transition: color 0.2s;
}
.grid-card:hover .grid-card-footer { color: #6e6e73; }
.grid-cta-arrow { width: 16px; height: 16px; color: #38bdf8; transition: transform 0.2s; }
.grid-card:hover .grid-cta-arrow { transform: translateX(3px); }

/* ===== DETAIL VIEW ===== */
.lab-detail-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: rgba(8,8,8,0.97);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(16px);
  gap: 16px;
}
.detail-back {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #6e6e73;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  font-family: inherit;
  transition: all 0.15s;
}
.detail-back:hover { color: #f5f5f7; border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.04); }
.detail-back svg { width: 15px; height: 15px; }
.detail-title-area { display: flex; align-items: center; gap: 12px; flex: 1; justify-content: center; }
.detail-post-name { font-size: 16px; font-weight: 700; color: #f5f5f7; }
.detail-header-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.detail-counter { font-size: 13px; color: #4a4a4f; font-weight: 600; letter-spacing: 0.06em; }

.regen-btn-sm {
  padding: 6px 14px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 7px;
  color: #4a4a4f;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.regen-btn-sm:hover { color: #a1a1a6; border-color: rgba(255,255,255,0.18); }

.detail-stage {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  padding: 32px 0 16px;
  flex: 1;
}
.detail-arrow {
  position: sticky;
  top: calc(50vh - 28px);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  color: #f5f5f7;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  margin: 0 16px;
  align-self: flex-start;
}
.detail-arrow:hover:not(:disabled) {
  background: rgba(56,189,248,0.12);
  border-color: rgba(56,189,248,0.35);
  color: #38bdf8;
}
.detail-arrow:disabled { opacity: 0.18; cursor: not-allowed; pointer-events: none; }
.detail-arrow svg { width: 26px; height: 26px; }
.detail-sections { display: flex; flex-direction: column; align-items: stretch; flex: 1; }

/* Big card scale in detail view — adapts to viewport height */
.detail-stage .card-wrapper-lg {
  width: calc(1080px * var(--card-scale, 0.6));
  height: calc(1350px * var(--card-scale, 0.6));
}
.detail-stage .card-wrapper-lg .ig-card {
  transform: scale(var(--card-scale, 0.6));
}

.detail-hint {
  text-align: center;
  font-size: 12px;
  color: #2a2a2f;
  padding: 10px 0 28px;
}
.detail-hint kbd {
  display: inline-block;
  padding: 2px 7px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 4px;
  font-size: 11px;
  font-family: inherit;
  color: #4a4a4f;
}

.lab-header {
  text-align: center;
  margin-bottom: 48px;
}

.lab-badge {
  display: inline-block;
  padding: 4px 14px;
  border: 1px solid #38bdf8;
  color: #38bdf8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  border-radius: 20px;
  margin-bottom: 16px;
}

.lab-title {
  font-size: 28px;
  font-weight: 700;
  color: #f5f5f7;
  margin-bottom: 8px;
}

.lab-desc {
  font-size: 14px;
  color: #6e6e73;
  margin-bottom: 20px;
}

.regen-btn {
  background: transparent;
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38bdf8;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.regen-btn:hover { background: rgba(56, 189, 248, 0.08); }

/* ===== TABS ===== */
.tab-bar {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 48px;
}

.tab-btn {
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: #a1a1a6;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}
.tab-btn:hover { border-color: #38bdf8; color: #38bdf8; }
.tab-btn.active { background: #38bdf8; color: #0a0a0a; border-color: #38bdf8; font-weight: 700; }

/* ===== VARIANTS LAYOUT ===== */
.variants-section {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
}

.variant-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.variant-label {
  font-size: 12px;
  font-weight: 600;
  color: #6e6e73;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ===== CARD WRAPPER (clips scaled card to 4:5) ===== */
.card-wrapper {
  width: 360px;
  height: 450px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ===== IG CARD — Diseñado a 1080×1350, escalado 0.3333 ===== */
.ig-card {
  width: 1080px;
  height: 1350px;
  transform: scale(0.3333);
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 72px 72px 0 72px;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, sans-serif;
  color: #f5f5f7;
}

/* ===== SHARED CARD ELEMENTS ===== */
.af-logo {
  flex-shrink: 0;
  margin-bottom: 44px;
}
.af-logo img {
  height: 52px;
  width: auto;
  display: block;
}

.af-logo-sm {
  flex-shrink: 0;
}
.af-logo-sm img {
  height: 40px;
  width: auto;
  display: block;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-shrink: 0;
}

.card-num {
  font-size: 24px;
  color: #6e6e73;
  letter-spacing: 0.08em;
}

.topbar-title {
  font-size: 26px;
  color: #a1a1a6;
  font-weight: 500;
  letter-spacing: 0.15em;
}

.card-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-main.center-col {
  align-items: center;
  justify-content: center;
  gap: 48px;
  text-align: center;
}

.display-title {
  font-size: 190px;
  font-weight: 800;
  line-height: 0.88;
  color: #f5f5f7;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
}

.display-title.ta-center { text-align: center; }

.display-title-xl {
  font-size: 220px;
  font-weight: 900;
  line-height: 0.85;
  color: #f5f5f7;
  letter-spacing: -0.03em;
  margin-bottom: 48px;
}

.card-main.center-col .display-title { margin-bottom: 0; }

.pre-label {
  font-size: 44px;
  color: #a1a1a6;
  font-weight: 400;
  margin-bottom: 8px;
}

.hero-text-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

/* ===== STICKERS ===== */
.sticker-hero {
  width: 340px;
  height: 340px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
}

.sticker-side {
  width: 380px;
  height: 380px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
  align-self: flex-end;
}

.sticker-side-sm {
  width: 280px;
  height: 280px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
  align-self: flex-end;
}

.sticker-author {
  width: 120px;
  height: 120px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
}

.sticker-cta {
  width: 320px;
  height: 320px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
  align-self: flex-end;
}

.sticker-corner {
  width: 240px;
  height: 240px;
  object-fit: contain;
  align-self: flex-end;
  margin-top: auto;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
}

/* ===== LAYOUT ROWS WITH STICKERS ===== */
.side-sticker-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex: 1;
}

.cta-sticker-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-top: 20px;
}

.stack-sticker-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex: 1;
}

/* ===== STATEMENT LINES ===== */
.statement-lines {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-line {
  font-size: 52px;
  font-weight: 300;
  color: #a1a1a6;
  letter-spacing: 0.04em;
}

.stat-line.accent {
  color: #38bdf8;
  font-weight: 600;
}

.text-accent {
  color: #38bdf8;
}

.card-sub {
  font-size: 36px;
  color: #a1a1a6;
  font-weight: 400;
}

.card-footer {
  flex-shrink: 0;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.watermark {
  font-size: 26px;
  color: #38bdf8;
  font-weight: 300;
  letter-spacing: 0.08em;
  opacity: 0.65;
  margin-bottom: 8px;
}

.blue-line {
  position: absolute;
  bottom: 0;
  left: -72px;
  right: -72px;
  height: 6px;
  background: var(--post-accent, #38bdf8);
}

/* ===== SOBRE MÍ — Variant C ===== */
.quote-mark {
  font-size: 220px;
  color: #38bdf8;
  opacity: 0.2;
  line-height: 0.7;
  font-family: Georgia, serif;
  margin-bottom: -30px;
}
.quote-big {
  font-size: 64px;
  font-weight: 600;
  line-height: 1.35;
  color: #f5f5f7;
  margin-bottom: 60px;
}
.author-row {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-top: auto;
}
.author-name {
  font-size: 34px;
  font-weight: 600;
  color: #f5f5f7;
  margin-bottom: 8px;
}
.author-role {
  font-size: 28px;
  color: #a1a1a6;
}

/* ===== SERVICIOS — Variant A ===== */
.num-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.num-item {
  display: flex;
  align-items: center;
  gap: 36px;
}
.num-badge {
  font-size: 28px;
  font-weight: 700;
  color: #38bdf8;
  min-width: 72px;
  font-variant-numeric: tabular-nums;
}
.num-text {
  font-size: 38px;
  color: #f5f5f7;
  font-weight: 400;
}

/* ===== SERVICIOS — Variant B ===== */
.serv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}
.serv-card {
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 16px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(56, 189, 248, 0.03);
}
.serv-icon { font-size: 56px; }
.serv-name {
  font-size: 28px;
  font-weight: 500;
  color: #f5f5f7;
  text-align: center;
  line-height: 1.3;
}

/* ===== SERVICIOS — Variant C ===== */
.pre-label-old { display: none; } /* eliminado, usar .pre-label */
.dot-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.dot-list p {
  font-size: 38px;
  color: #a1a1a6;
}
.cta-badge {
  margin-top: 60px;
  display: inline-block;
  border: 2px solid #38bdf8;
  color: #38bdf8;
  padding: 24px 60px;
  border-radius: 60px;
  font-size: 40px;
  font-weight: 600;
  align-self: flex-start;
}

/* ===== STACK — Variant A ===== */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.tech-tag {
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  color: #38bdf8;
  padding: 14px 32px;
  border-radius: 40px;
  font-size: 30px;
  font-weight: 500;
  background: rgba(56, 189, 248, 0.04);
}

/* ===== STACK — Variant B ===== */
.stack-cats {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
}
.stack-cat {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 44px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.stack-cat:first-child { border-top: 1px solid rgba(255, 255, 255, 0.07); }
.cat-label {
  font-size: 22px;
  font-weight: 700;
  color: #38bdf8;
  letter-spacing: 0.2em;
}
.cat-items {
  font-size: 38px;
  color: #f5f5f7;
  font-weight: 400;
  line-height: 1.4;
}

/* ===== STACK — Tech Pills ===== */
.tech-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  gap: 52px;
}
.tech-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.tech-section-label {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.tech-pill {
  font-size: 28px;
  font-weight: 600;
  color: var(--tc);
  background: color-mix(in srgb, var(--tc) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--tc) 30%, transparent);
  border-radius: 100px;
  padding: 14px 36px;
  letter-spacing: 0.01em;
  line-height: 1;
  flex-shrink: 0;
}

/* ===== STACK — Variant C ===== */
.year-tag {
  font-size: 44px;
  color: #38bdf8;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}
.stack-simple-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.stack-simple-list p {
  font-size: 44px;
  color: #a1a1a6;
  font-weight: 300;
  letter-spacing: 0.04em;
}

/* ========================================
   CARRUSEL COMPLETO
   ======================================== */
.carousel-section {
  display: grid;
  grid-template-columns: 240px 1fr;
  column-gap: 40px;
  align-items: start;
  padding: 24px 32px;
  width: 100%;
  box-sizing: border-box;
}

/* Selector de slides — panel izquierdo vertical */
.slide-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: 1;
  grid-row: 1;
}

.slide-btn {
  padding: 9px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: #6e6e73;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.05em;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}
.slide-btn:hover  { border-color: #38bdf8; color: #38bdf8; }
.slide-btn.active { background: #38bdf8; color: #0a0a0a; border-color: #38bdf8; }

/* Progress dots — oculto, reemplazado por el panel lateral */
.progress-bar { display: none; }
.progress-dot { display: none; }

/* Single card layout — panel derecho */
.single-card-wrap {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.single-label {
  font-size: 11px;
  font-weight: 700;
  color: #3a3a3f;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Card grande para carrusel */
.card-wrapper-lg {
  width: 432px;
  height: 540px;
}
/* Escala 0.4 para que rellene exactamente 432×540 (1080×0.4=432, 1350×0.4=540) */
.card-wrapper-lg .ig-card {
  transform: scale(0.4);
  transform-origin: top left;
}

/* ===== PORTADA ===== */
.carousel-cover-main {
  flex-direction: row !important;
  align-items: flex-end !important;
  justify-content: space-between;
  gap: 0;
}
.cover-text-block {
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
  padding-bottom: 20px;
}
.cover-eyebrow {
  font-size: 32px;
  color: #a1a1a6;
  font-weight: 400;
  letter-spacing: 0.03em;
}
.cover-title {
  font-size: 210px;
  font-weight: 900;
  line-height: 0.85;
  color: #f5f5f7;
  letter-spacing: -0.03em;
}
.cover-divider {
  width: 120px;
  height: 5px;
  background: var(--post-accent, #38bdf8);
  border-radius: 3px;
}
.cover-sub {
  font-size: 34px;
  color: #a1a1a6;
  font-weight: 400;
}
.sticker-cover {
  width: 420px;
  height: 420px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 12px 32px rgba(0,0,0,0.6));
  margin-bottom: -20px;
}
.carousel-counter {
  flex-shrink: 0;
  font-size: 24px;
  color: var(--post-accent, #38bdf8);
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  text-align: right;
}

/* ===== TOPBAR SLIDES ===== */
.slide-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 36px;
}
.slide-counter {
  font-size: 24px;
  color: #6e6e73;
  letter-spacing: 0.08em;
}
.accent-counter { color: var(--post-accent, #38bdf8); font-weight: 700; }

/* ===== SLIDE TIPOGRAFÍA ===== */
.section-tag {
  font-size: 24px;
  font-weight: 700;
  color: var(--post-accent, #38bdf8);
  letter-spacing: 0.2em;
  margin-bottom: 20px;
  flex-shrink: 0;
}
.slide-title {
  font-size: 130px;
  font-weight: 800;
  line-height: 0.9;
  color: #f5f5f7;
  letter-spacing: -0.02em;
  margin-bottom: 44px;
}

/* ===== SLIDE 1: INTRO ===== */
.info-block {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.info-row {
  display: flex;
  align-items: flex-start;
  gap: 28px;
}
.info-icon {
  font-size: 36px;
  flex-shrink: 0;
  margin-top: 4px;
}
.info-text {
  font-size: 34px;
  color: #e0e0e5;
  line-height: 1.4;
}

/* ===== SLIDE 2: TRABAJO ===== */
.work-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.work-card {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 36px 40px;
  background: rgba(255,255,255,0.03);
}
.work-card-accent {
  border-color: rgba(56,189,248,0.3);
  background: rgba(56,189,248,0.04);
}
.work-card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}
.work-icon   { font-size: 40px; }
.work-company {
  font-size: 40px;
  font-weight: 700;
  color: #f5f5f7;
  letter-spacing: 0.04em;
}
.work-role {
  font-size: 30px;
  color: #38bdf8;
  font-weight: 500;
  margin-bottom: 10px;
}
.work-desc {
  font-size: 26px;
  color: #6e6e73;
}

/* ===== SLIDE 3: PROYECTOS ===== */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.project-row {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.project-row:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
.project-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #38bdf8;
  flex-shrink: 0;
  margin-top: 14px;
}
.project-name {
  font-size: 40px;
  font-weight: 700;
  color: #f5f5f7;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}
.project-tech {
  font-size: 26px;
  color: #6e6e73;
}

/* ===== SLIDE 4: PASIONES ===== */
.passion-grid {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
}
.passion-card {
  flex: 1;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 36px 32px;
  background: rgba(255,255,255,0.02);
}
.passion-emoji { font-size: 56px; display: block; margin-bottom: 16px; }
.passion-name  {
  font-size: 36px;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 14px;
}
.passion-desc  { font-size: 26px; color: #a1a1a6; line-height: 1.5; }
.sticker-passion {
  display: none; /* imagen de galería no tiene sticker, se oculta */
}

/* ===== SLIDE 5: CTA ===== */
.carousel-cta-main {
  flex-direction: row !important;
  align-items: flex-end !important;
  justify-content: space-between;
  gap: 0;
}
.cta-text-block {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  padding-bottom: 20px;
}
.cta-big-title {
  font-size: 140px;
  font-weight: 900;
  line-height: 0.88;
  color: #f5f5f7;
  letter-spacing: -0.025em;
}
.cta-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.cta-link-row {
  display: flex;
  align-items: center;
  gap: 24px;
}
.cta-link-icon { font-size: 32px; }
.cta-link-text {
  font-size: 30px;
  color: #a1a1a6;
  font-weight: 400;
}
.sticker-cta-final {
  width: 380px;
  height: 380px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 12px 32px rgba(0,0,0,0.6));
  margin-bottom: -20px;
}

/* ===== SVG ICONS ===== */
.ic-wrap {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  color: #38bdf8;
  margin-top: 4px;
}
.ic-wrap svg {
  width: 100%;
  height: 100%;
}
.ic-wrap-sm {
  width: 40px;
  height: 40px;
  margin-top: 2px;
}

/* ===== PROYECTOS (slide 02) ===== */
.slide-title-sm {
  font-size: 100px;
  font-weight: 800;
  line-height: 0.9;
  color: #f5f5f7;
  letter-spacing: -0.02em;
  margin-bottom: 36px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}
.project-row {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 28px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.project-row:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
.project-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #38bdf8;
  flex-shrink: 0;
  margin-top: 16px;
}
.project-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.project-name-row {
  display: flex;
  align-items: center;
  gap: 20px;
}
.project-name {
  font-size: 36px;
  font-weight: 700;
  color: #f5f5f7;
  letter-spacing: 0.04em;
}
.project-tag {
  font-size: 20px;
  font-weight: 600;
  color: #0a0a0a;
  background: #38bdf8;
  padding: 4px 18px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.project-desc {
  font-size: 26px;
  color: #a1a1a6;
  line-height: 1.4;
}
.project-url {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  color: #38bdf8;
  font-weight: 400;
}
.url-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}
.portfolio-cta {
  font-size: 28px;
  color: #6e6e73;
  margin-top: 28px;
  font-weight: 400;
}

/* ===== CTA links actualizados ===== */
.cta-link-row {
  display: flex;
  align-items: center;
  gap: 20px;
}
.cta-link-text {
  font-size: 28px;
  color: #a1a1a6;
  font-weight: 400;
}

/* ===== CIERRE SLIDE (Tipos de Web) ===== */
.cierre-layout {
  justify-content: space-between;
  gap: 44px;
}
.cierre-title {
  font-size: 120px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.88;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}
.cierre-box {
  border-left: 6px solid #38bdf8;
  background: rgba(56, 189, 248, 0.06);
  border-radius: 0 16px 16px 0;
  padding: 36px 44px;
  flex-shrink: 0;
}
.cierre-box-text {
  font-size: 36px;
  color: #e0e0e5;
  line-height: 1.6;
}
.cierre-checks {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.cierre-check-row {
  display: flex;
  align-items: center;
  gap: 28px;
}
.cierre-check-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  color: #38bdf8;
}
.cierre-check-row span {
  font-size: 34px;
  color: #a1a1a6;
  font-weight: 400;
}

/* ===== PORTADA SIN STICKER ===== */
.cover-bottom {
  justify-content: flex-end;
}

/* ===== FRANZA COVER ===== */
.franza-cover-main {
  justify-content: space-between;
}
.franza-cover-main .cover-text-block {
  flex: 0 0 auto;
  padding-bottom: 20px;
}
.franza-cover-logo-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.franza-cover-logo {
  width: 340px;
  height: auto;
  filter: drop-shadow(0 12px 48px rgba(0, 0, 0, 0.8));
}

/* ===== FRANZA SCREEN SLIDES ===== */
.franza-screen-wrap {
  flex: 1;
  min-height: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.franza-screen-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  display: block;
}

/* ===== 5 PREGUNTAS ===== */
.preg-layout {
  gap: 48px;
}
.preg-num-row {
  display: flex;
  align-items: center;
  gap: 28px;
}
.preg-big-num {
  font-size: 110px;
  font-weight: 900;
  line-height: 1;
  color: var(--post-accent, #a78bfa);
  letter-spacing: -0.04em;
}
.preg-question {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
  color: #f5f5f7;
  letter-spacing: -0.02em;
}
.preg-why-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.preg-why-label {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--post-accent, #a78bfa);
}

/* ===== ¿CUÁNTO CUESTA UNA WEB? ===== */
.costo-layout {
  gap: 40px;
}
.costo-title {
  font-size: 120px;
  font-weight: 900;
  line-height: 0.9;
  color: #f5f5f7;
  letter-spacing: -0.03em;
}
.costo-box {
  background: color-mix(in srgb, var(--post-accent, #a78bfa) 8%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--post-accent, #a78bfa) 25%, transparent);
  border-radius: 20px;
  padding: 44px 48px;
}
.costo-box-text {
  font-size: 34px;
  color: #a1a1a6;
  line-height: 1.5;
}
.costo-hint {
  font-size: 30px;
  color: #6e6e73;
}
.costo-price-tag {
  display: inline-block;
  background: color-mix(in srgb, var(--post-accent, #a78bfa) 12%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--post-accent, #a78bfa) 35%, transparent);
  color: var(--post-accent, #a78bfa);
  font-size: 38px;
  font-weight: 700;
  padding: 14px 40px;
  border-radius: 60px;
  letter-spacing: 0.02em;
  align-self: flex-start;
}
.costo-para-quien {
  font-size: 30px;
  color: var(--post-accent, #a78bfa);
  font-weight: 500;
}
.costo-factors-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
  margin-top: 8px;
}
.costo-factor {
  display: flex;
  align-items: center;
  gap: 20px;
}
.costo-factor-num {
  font-size: 28px;
  font-weight: 800;
  color: var(--post-accent, #a78bfa);
  letter-spacing: 0.05em;
  flex-shrink: 0;
  width: 56px;
}
.costo-factor-label {
  font-size: 30px;
  color: #d1d1d6;
  font-weight: 500;
  line-height: 1.3;
}

/* Pills para TIPOS DE WEB portada */
.cover-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 4px;
}
.cover-pill {
  border: 1.5px solid rgba(56, 189, 248, 0.5);
  color: #38bdf8;
  font-size: 28px;
  font-weight: 500;
  padding: 10px 32px;
  border-radius: 60px;
  letter-spacing: 0.04em;
  background: rgba(56, 189, 248, 0.05);
}

/* Steps preview para ¿CÓMO TRABAJO? portada */
.cover-steps-preview {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 4px;
  flex-wrap: nowrap;
}
.cover-step-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.cover-step-num {
  font-size: 40px;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: -0.02em;
  line-height: 1;
}
.cover-step-name {
  font-size: 22px;
  font-weight: 400;
  color: #6e6e73;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.cover-step-sep {
  font-size: 28px;
  color: rgba(56, 189, 248, 0.3);
  margin-bottom: 22px;
  flex-shrink: 0;
}

/* ===== TIPOS DE WEB ===== */
.pagetype-header {
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex-shrink: 0;
}
.pagetype-icon-circle {
  width: 84px;
  height: 84px;
  border: 2px solid rgba(56, 189, 248, 0.45);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 189, 248, 0.08);
  color: #38bdf8;
  flex-shrink: 0;
}
.pagetype-icon-circle svg {
  width: 48px;
  height: 48px;
}
.pagetype-type-hero {
  font-size: 105px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.88;
  letter-spacing: -0.025em;
  flex-shrink: 0;
  word-break: break-word;
}
.pagetype-hero-divider {
  width: 90px;
  height: 5px;
  background: #38bdf8;
  border-radius: 3px;
  margin-bottom: 32px;
  flex-shrink: 0;
}
.pagetype-badge {
  display: none; /* reemplazado por pagetype-type-hero */
}
.pagetype-headline {
  font-size: 40px;
  font-weight: 500;
  color: #a1a1a6;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
  flex-shrink: 0;
}
.pagetype-desc {
  font-size: 30px;
  color: #6e6e73;
  line-height: 1.55;
  margin-bottom: 32px;
}
.pagetype-use {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 0;
  flex: 1;
}
.pagetype-use-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  color: #38bdf8;
  margin-top: 2px;
}
.pagetype-use span {
  font-size: 28px;
  color: #f5f5f7;
  font-weight: 500;
  line-height: 1.4;
}
.pagetype-url {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.pagetype-url-label {
  font-size: 22px;
  font-weight: 600;
  color: #6e6e73;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.pagetype-url-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.pagetype-url-text {
  font-size: 32px;
  color: #38bdf8;
  font-weight: 600;
}

/* ===== AVISO SLIDE ===== */
.aviso-layout {
  justify-content: space-between;
  gap: 48px;
}
.aviso-icon-row {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
}
.aviso-icon-wrap {
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border: 2px solid rgba(56, 189, 248, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 189, 248, 0.08);
  color: #38bdf8;
}
.aviso-icon-wrap svg {
  width: 52px;
  height: 52px;
}
.aviso-label {
  font-size: 32px;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.25em;
}
.aviso-title {
  font-size: 120px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.88;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}
.aviso-box {
  border-left: 6px solid #38bdf8;
  background: rgba(56, 189, 248, 0.06);
  border-radius: 0 16px 16px 0;
  padding: 40px 48px;
  flex-shrink: 0;
}
.aviso-box-text {
  font-size: 36px;
  color: #e0e0e5;
  line-height: 1.6;
}
.aviso-sub {
  font-size: 28px;
  color: #6e6e73;
  line-height: 1.65;
}

/* ===== CÓMO TRABAJO — PASOS ===== */
.step-layout {
  justify-content: space-between;
}
.step-layout .step-desc {
  flex: unset;
}
.step-num-block {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  flex-shrink: 0;
}
.step-big-num {
  font-size: 180px;
  font-weight: 900;
  color: #38bdf8;
  line-height: 1;
  letter-spacing: -0.04em;
  opacity: 0.9;
  flex-shrink: 0;
}
.step-num-divider {
  flex: 1;
  height: 3px;
  background: rgba(56,189,248,0.2);
  border-radius: 2px;
}
.step-title {
  font-size: 80px;
  font-weight: 800;
  color: #f5f5f7;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.step-desc {
  font-size: 36px;
  color: #a1a1a6;
  line-height: 1.55;
}
.step-progress-dots {
  display: flex;
  gap: 16px;
  align-items: center;
  padding-bottom: 8px;
}
.step-pdot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  transition: all 0.3s;
  flex-shrink: 0;
}
.step-pdot.step-pdot-past   { background: rgba(56,189,248,0.35); }
.step-pdot.step-pdot-active { background: #38bdf8; width: 48px; border-radius: 10px; }

/* ===== 5 ERRORES ===== */
.error-layout {
  justify-content: space-between;
  gap: 26px;
}
.error-num-row {
  display: flex;
  align-items: baseline;
  gap: 28px;
  flex-shrink: 0;
}
.error-label {
  font-size: 28px;
  font-weight: 700;
  color: #6e6e73;
  letter-spacing: 0.2em;
}
.error-big-num {
  font-size: 180px;
  font-weight: 900;
  color: #ef4444;
  line-height: 1;
  letter-spacing: -0.04em;
  opacity: 0.9;
}
.error-title {
  font-size: 78px;
  font-weight: 800;
  color: #f5f5f7;
  line-height: 1.0;
  letter-spacing: -0.025em;
  flex-shrink: 0;
}
.error-stat-box {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  background: rgba(239, 68, 68, 0.07);
  border-left: 6px solid #ef4444;
  border-radius: 0 16px 16px 0;
  padding: 36px 44px;
  flex-shrink: 0;
}
.error-stat-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  color: #ef4444;
  margin-top: 4px;
}
.error-stat-text {
  font-size: 34px;
  font-weight: 600;
  color: #f5f5f7;
  line-height: 1.45;
}
.error-desc {
  font-size: 30px;
  color: #a1a1a6;
  line-height: 1.55;
}
.error-fix-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px 36px;
  background: rgba(34, 197, 94, 0.07);
  border-left: 5px solid #22c55e;
  border-radius: 0 14px 14px 0;
  flex-shrink: 0;
}
.error-fix-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  color: #22c55e;
  margin-top: 6px;
}
.error-fix-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.error-fix-label {
  font-size: 18px;
  font-weight: 800;
  color: #22c55e;
  letter-spacing: 0.12em;
  opacity: 0.75;
}
.error-fix-text {
  font-size: 28px;
  font-weight: 500;
  color: #22c55e;
  line-height: 1.4;
}

/* ===== SOLUCIÓN SLIDE ===== */
.solution-layout {
  justify-content: center;
  gap: 48px;
}
.solution-icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: rgba(34, 197, 94, 0.07);
  border: 2px solid rgba(34, 197, 94, 0.18);
  border-radius: 50%;
  margin: 0 auto;
  flex-shrink: 0;
}
.solution-icon {
  width: 110px;
  height: 110px;
  color: #22c55e;
}
.solution-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 36px;
}
.solution-tag {
  font-size: 20px;
  font-weight: 800;
  color: #22c55e;
  letter-spacing: 0.18em;
  opacity: 0.75;
}
.solution-headline {
  font-size: 54px;
  font-weight: 800;
  color: #f5f5f7;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.solution-details {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.solution-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}
.solution-check-icon {
  width: 30px;
  height: 30px;
  color: #22c55e;
  flex-shrink: 0;
  margin-top: 5px;
}
.solution-detail-text {
  font-size: 26px;
  font-weight: 400;
  color: #a1a1a6;
  line-height: 1.45;
}

/* ===== CASO REAL: FRANZA ===== */
.ic-neg { color: #ef4444; }
.ic-pos { color: #22c55e; }
.franza-layout { justify-content: space-between; gap: 36px; }
.franza-title {
  font-size: 90px;
  font-weight: 800;
  color: #f5f5f7;
  line-height: 1.0;
  letter-spacing: -0.025em;
  flex-shrink: 0;
}
.franza-box {
  border-left: 6px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
  border-radius: 0 16px 16px 0;
  padding: 36px 44px;
  flex-shrink: 0;
}
.franza-box-text { font-size: 32px; color: #a1a1a6; line-height: 1.6; }
.screen-layout { gap: 32px; }
.screen-caption { font-size: 30px; color: #a1a1a6; line-height: 1.5; flex-shrink: 0; }
.screen-ph {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px dashed rgba(56,189,248,0.3);
  border-radius: 20px;
  overflow: hidden;
  min-height: 0;
}
.screen-ph-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.screen-ph-dot { width: 16px; height: 16px; border-radius: 50%; background: rgba(255,255,255,0.1); }
.screen-ph-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
.screen-ph-icon { width: 72px; height: 72px; color: rgba(56,189,248,0.35); }
.screen-ph-label { font-size: 28px; font-weight: 700; color: rgba(56,189,248,0.5); letter-spacing: 0.15em; }
.screen-ph-note { font-size: 22px; color: #6e6e73; }

/* ===== PLANTILLA VS A MEDIDA ===== */
.cover-title-sm {
  font-size: 160px;
  font-weight: 900;
  line-height: 0.85;
  color: #f5f5f7;
  letter-spacing: -0.03em;
  margin-bottom: 40px;
}
.tipo-layout { justify-content: space-between; gap: 40px; }

/* ===== HOSTING TYPES SLIDE ===== */
/* ===== HOSTING TYPES SLIDE ===== */
.ht-layout { justify-content: space-between; gap: 0; }
.ht-item {
  display: flex;
  align-items: flex-start;
  gap: 56px;
  flex: 1;
  padding: 28px 0;
  border-left: 5px solid rgba(56,189,248,0.25);
  padding-left: 44px;
}
.ht-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 240px;
  flex-shrink: 0;
}
.ht-num {
  font-size: 26px;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.1em;
  line-height: 1;
}
.ht-name {
  font-size: 72px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0;
}
.ht-right { display: flex; flex-direction: column; gap: 22px; flex: 1; padding-top: 8px; }
.ht-desc { font-size: 32px; color: #a1a1a6; line-height: 1.45; margin: 0; }
.ht-brands { display: flex; flex-wrap: wrap; gap: 16px; }
.ht-brand {
  font-size: 24px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 100px;
  background: rgba(255,255,255,0.05);
  color: #6e6e73;
  border: 1px solid rgba(255,255,255,0.09);
  letter-spacing: 0.02em;
}
.ht-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 0; flex-shrink: 0; }

/* ht detail chips (pros/contras) */
.ht-slide-layout { justify-content: space-between; gap: 32px; }
.ht-slide-title {
  font-size: 88px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.95;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}
.ht-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.ht-detail-chip {
  font-size: 26px;
  font-weight: 600;
  padding: 18px 24px;
  border-radius: 16px;
  line-height: 1.3;
}
.ht-chip-good { background: rgba(56,189,248,0.08); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); }
.ht-chip-bad  { background: rgba(255,255,255,0.04); color: #6e6e73; border: 1px solid rgba(255,255,255,0.07); }
.ht-examples { display: flex; align-items: center; flex-wrap: wrap; gap: 14px; }
.ht-example-label { font-size: 24px; font-weight: 700; color: #4a4a4f; letter-spacing: 0.05em; margin-right: 4px; }
.tipo-title {
  font-size: 100px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.9;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}
.tipo-box {
  border-left: 6px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
  border-radius: 0 16px 16px 0;
  padding: 36px 44px;
  flex-shrink: 0;
}
.tipo-box.is-medida { border-left-color: #38bdf8; background: rgba(56,189,248,0.06); }
.tipo-box-text { font-size: 34px; color: #e0e0e5; line-height: 1.6; }
.tipo-cuando { display: flex; align-items: flex-start; gap: 24px; }
.tipo-cuando-icon { width: 44px; height: 44px; flex-shrink: 0; color: #38bdf8; margin-top: 4px; }
.tipo-cuando span { font-size: 30px; color: #a1a1a6; line-height: 1.5; }
.comp-slide-layout { gap: 36px; }
.comp-grid { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; min-height: 0; }

/* ===== VS PAIRS LAYOUT (post 09 comparación) ===== */
.vs-layout { display: flex; flex-direction: column; padding: 60px 80px; gap: 36px; justify-content: center; height: 100%; }
.vs-header-legend { display: flex; align-items: center; gap: 24px; }
.vs-legend-bad { font-size: 22px; font-weight: 700; letter-spacing: 0.12em; color: #4a4a4f; }
.vs-legend-sep { font-size: 18px; color: #4a4a4f; }
.vs-legend-good { font-size: 22px; font-weight: 700; letter-spacing: 0.12em; color: #38bdf8; }
.vs-pairs { display: flex; flex-direction: column; gap: 18px; }
.vs-pair { display: flex; flex-direction: column; gap: 6px; }
.vs-bad, .vs-good { display: flex; align-items: center; gap: 20px; padding: 20px 28px; border-radius: 10px; font-size: 27px; line-height: 1.25; }
.vs-bad { background: rgba(255,255,255,0.03); border-left: 3px solid #2a2a2e; color: #6e6e73; }
.vs-good { background: rgba(56,189,248,0.07); border-left: 3px solid #38bdf8; color: #f5f5f7; }
.vs-x { font-size: 22px; font-weight: 700; color: #4a4a4f; flex-shrink: 0; line-height: 1; }
.vs-chk { font-size: 22px; font-weight: 700; color: #38bdf8; flex-shrink: 0; line-height: 1; }
.comp-col {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
}
.comp-col-head { padding: 24px 32px; font-size: 24px; font-weight: 700; letter-spacing: 0.15em; text-align: center; }
.comp-col-head.is-plantilla { background: rgba(255,255,255,0.05); color: #a1a1a6; border-bottom: 1px solid rgba(255,255,255,0.07); }
.comp-col-head.is-medida { background: rgba(56,189,248,0.1); color: #38bdf8; border-bottom: 1px solid rgba(56,189,248,0.15); }
.comp-col-body { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 28px 32px; gap: 24px; }
.comp-item { display: flex; align-items: flex-start; gap: 16px; font-size: 26px; line-height: 1.35; }
.comp-item-dot { font-size: 32px; flex-shrink: 0; line-height: 1.1; }
.comp-item.is-negative { color: #a1a1a6; }
.comp-item.is-negative .comp-item-dot { color: #6e6e73; }
.comp-item.is-positive { color: #f5f5f7; }
.comp-item.is-positive .comp-item-dot { color: #38bdf8; }
.pregunta-layout { justify-content: space-between; gap: 40px; }
.pregunta-title {
  font-size: 95px;
  font-weight: 900;
  color: #f5f5f7;
  line-height: 0.9;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}
.pregunta-box {
  border-left: 6px solid #38bdf8;
  background: rgba(56,189,248,0.06);
  border-radius: 0 16px 16px 0;
  padding: 36px 44px;
  flex-shrink: 0;
}
.pregunta-box-text { font-size: 34px; color: #e0e0e5; line-height: 1.6; }
.pregunta-sub { font-size: 28px; color: #6e6e73; line-height: 1.6; }

/* ===== TABS ===== */
.lab-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding-bottom: 0;
}
.lab-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #4a4a4f;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  margin-bottom: -1px;
}
.lab-tab svg { width: 16px; height: 16px; }
.lab-tab:hover { color: #a1a1a6; }
.lab-tab.active { color: #f5f5f7; border-bottom-color: #38bdf8; }
.lab-tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: rgba(255,255,255,0.07);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
}
.lab-tab.active .lab-tab-count { background: rgba(56,189,248,0.15); color: #38bdf8; }

/* ===== CALENDARIO ===== */
.cal-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}
.cal-sidebar {
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cal-sidebar-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4a4a4f;
  margin-bottom: 4px;
}
.cal-sidebar-hint {
  font-size: 12px;
  color: #4a4a4f;
  line-height: 1.4;
  margin-bottom: 8px;
}
.cal-sidebar-empty {
  font-size: 13px;
  color: #3a3a3f;
  padding: 12px 0;
  text-align: center;
}
.cal-unscheduled-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  transition: background 0.15s, border-color 0.15s;
  overflow: hidden;
}
.cal-unscheduled-item:hover { background: rgba(255,255,255,0.04); }
.cal-unscheduled-item.selected {
  border-color: var(--item-color, #38bdf8);
  background: color-mix(in srgb, var(--item-color, #38bdf8) 10%, transparent);
}
.cal-item-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--item-color, #38bdf8);
  border-radius: 3px 0 0 3px;
}
.cal-item-num {
  font-size: 11px;
  font-weight: 800;
  color: var(--item-color, #38bdf8);
  letter-spacing: 0.05em;
  flex-shrink: 0;
}
.cal-item-name {
  font-size: 12px;
  color: #d1d1d6;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cal-item-kind {
  font-size: 10px;
  color: #4a4a4f;
  flex-shrink: 0;
}
.cal-main {
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 24px;
}
.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.cal-month-label {
  font-size: 16px;
  font-weight: 700;
  color: #f5f5f7;
  letter-spacing: 0.02em;
}
.cal-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  cursor: pointer;
  color: #a1a1a6;
  transition: all 0.15s;
}
.cal-nav-btn:hover { background: rgba(255,255,255,0.09); color: #f5f5f7; }
.cal-nav-btn svg { width: 16px; height: 16px; }
.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 6px;
}
.cal-weekdays span {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #4a4a4f;
  letter-spacing: 0.06em;
  padding: 4px 0;
}
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.cal-day {
  min-height: 72px;
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 8px 6px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.15s;
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.04);
}
.cal-day.empty { background: transparent; border-color: transparent; }
.cal-day.today { border-color: rgba(56,189,248,0.4); background: rgba(56,189,248,0.04); }
.cal-day.today .cal-day-num { color: #38bdf8; font-weight: 800; }
.cal-day.has-items { background: rgba(255,255,255,0.03); }
.cal-day.pending-target { cursor: pointer; }
.cal-day.pending-target:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15); }
.cal-day-num {
  font-size: 12px;
  font-weight: 600;
  color: #6e6e73;
  line-height: 1;
}
.cal-day-items {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.cal-day-chip {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px solid;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  gap: 4px;
  z-index: 0;
  cursor: pointer;
}
.cal-day-chip:hover { z-index: 100; }
.cal-chip-tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  min-width: 210px;
  background: #141416;
  border: 1px solid var(--chip-color, #38bdf8);
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 10px 32px rgba(0,0,0,0.7);
  pointer-events: none;
  white-space: normal;
  text-align: left;
  color: #f5f5f7;
}
.cal-chip-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--chip-color, #38bdf8);
}
.cal-day-chip:hover .cal-chip-tooltip { display: block; }
.cal-chip-tooltip-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.cal-chip-tooltip-kind {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--chip-color, #38bdf8);
}
.cal-chip-tooltip-type {
  font-size: 10px;
  font-weight: 600;
  background: rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 2px 8px;
  color: #a1a1a6;
}
.cal-chip-tooltip-name {
  font-size: 13px;
  font-weight: 700;
  color: #f5f5f7;
  line-height: 1.3;
  margin: 0 0 10px;
}
.cal-chip-tooltip-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding-top: 8px;
}
.cal-chip-tooltip-status {
  font-size: 11px;
  font-weight: 600;
}
.cal-chip-tooltip-slides {
  font-size: 11px;
  color: #4a4a4f;
  font-weight: 500;
}
.cal-chip-tooltip-hint {
  font-size: 10px;
  color: #3a3a3f;
  margin: 8px 0 0;
  text-align: center;
  letter-spacing: 0.03em;
}

/* ===== STORIES GRID — cards taller (portrait ratio) ===== */
.lab-stories-grid { grid-template-columns: repeat(4, 1fr); }
.grid-card-story { aspect-ratio: 9 / 10; }

/* ===== STORY DETAIL VIEW ===== */
.lab-story-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.story-stage {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 32px 0 16px;
  flex: 1;
}
.story-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Story card 1080×1920 scaled */
.story-card-wrapper {
  width: calc(1080px * var(--story-scale, 0.4));
  height: calc(1920px * var(--story-scale, 0.4));
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.ig-story {
  width: 1080px;
  height: 1920px;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(var(--story-scale, 0.4));
  transform-origin: top left;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
}
.story-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 72px 72px 0;
}
.story-counter {
  font-size: 28px;
  font-weight: 600;
  color: #6e6e73;
  letter-spacing: 0.06em;
}
.story-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 60px 72px;
}
.story-main-center {
  justify-content: center;
  gap: 48px;
}
.story-eyebrow {
  font-size: 30px;
  font-weight: 600;
  color: #6e6e73;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.story-big-title {
  font-size: 120px;
  font-weight: 800;
  color: #f5f5f7;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.story-sub {
  font-size: 36px;
  font-weight: 400;
  color: #a1a1a6;
  line-height: 1.5;
  max-width: 800px;
}
.story-footer {
  padding: 0 72px 72px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* FAQ Story slides */
.story-main-faq {
  justify-content: space-between;
  gap: 48px;
  padding-top: 48px;
  padding-bottom: 48px;
}
.faq-top-row {
  display: flex;
  align-items: baseline;
  gap: 32px;
}
.faq-eyebrow {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4a4a4f;
}
.faq-big-num {
  font-size: 100px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--post-accent, #38bdf8);
}
.faq-q {
  font-size: 62px;
  font-weight: 800;
  color: #f5f5f7;
  line-height: 1.15;
  letter-spacing: -0.02em;
  flex: 1;
}
.faq-a-box {
  background: rgba(255,255,255,0.04);
  border-left: 5px solid var(--post-accent, #38bdf8);
  border-radius: 0 16px 16px 0;
  padding: 40px 48px;
}
.faq-a-text {
  font-size: 38px;
  font-weight: 400;
  color: #a1a1a6;
  line-height: 1.55;
}

.story-main-color {
  justify-content: center;
  align-items: center;
  gap: 80px;
}
.color-swatch-big {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 120px rgba(255,255,255,0.12);
}
.color-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}
.color-chip-label {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.75;
}
.color-title {
  font-size: 88px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}
.color-desc {
  font-size: 38px;
  font-weight: 400;
  color: #a1a1a6;
  line-height: 1.5;
  white-space: pre-line;
}

/* CTA color strip */
.story-color-strip {
  display: flex;
  height: 16px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}
.story-strip-block {
  flex: 1;
}

/* ===== NOTAS ===== */
.notes-panel {
  margin-top: 16px;
  width: 100%;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.notes-panel-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4a4a4f;
}
.notes-saved-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  flex-shrink: 0;
}
.notes-textarea {
  width: 100%;
  min-height: 90px;
  background: #0d0d10;
  border: 1px solid #1e1e22;
  border-radius: 10px;
  padding: 12px 14px;
  color: #d1d1d6;
  font-size: 13px;
  line-height: 1.6;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.notes-textarea:focus {
  outline: none;
  border-color: #38bdf8;
}
.notes-textarea::placeholder { color: #3a3a3f; }

/* ===== COPY PANEL ===== */
.copy-panel {
  margin-top: 24px;
  width: 100%;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}
.copy-panel-btns {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.copy-plat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid #2a2a2e;
  background: #131316;
  color: #a1a1a6;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.copy-plat-btn:hover {
  border-color: #38bdf8;
  color: #fff;
}
.copy-plat-btn.active {
  background: #0f2a38;
  border-color: #38bdf8;
  color: #38bdf8;
}
.copy-content {
  background: #0d0d10;
  border: 1px solid #1e1e22;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.copy-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.copy-field-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #38bdf8;
  text-transform: uppercase;
}
.copy-field-text {
  background: #17171b;
  border: 1px solid #1e1e22;
  border-radius: 6px;
  padding: 10px 12px;
  color: #d1d1d6;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  font-family: inherit;
  margin: 0;
}
.copy-field-title {
  font-weight: 600;
  color: #fff;
}
.copy-clipboard-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-end;
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid #38bdf8;
  background: transparent;
  color: #38bdf8;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.copy-clipboard-btn:hover {
  background: #0f2a38;
}
.copy-clipboard-btn.copied {
  border-color: #22c55e;
  color: #22c55e;
}

/* ===== BANNER PRÓXIMO A PUBLICAR ===== */
.next-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.03) 100%);
  border: 1px solid rgba(56,189,248,0.2);
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: border-color 0.15s;
  gap: 16px;
}
.next-banner:hover { border-color: rgba(56,189,248,0.45); }
.next-banner-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  color: #a1a1a6;
}
.next-banner-tag {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #38bdf8;
  background: rgba(56,189,248,0.12);
  padding: 3px 8px;
  border-radius: 100px;
  flex-shrink: 0;
}
.next-banner-name {
  font-size: 14px;
  font-weight: 600;
  color: #f5f5f7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.next-banner-kind {
  font-size: 12px;
  color: #4a4a4f;
  flex-shrink: 0;
}
.next-banner-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  color: #4a4a4f;
}
.next-banner-date { font-size: 13px; font-weight: 600; color: #a1a1a6; }
.next-banner-days { font-size: 12px; color: #4a4a4f; }

/* ===== KANBAN ===== */
.kanban-board {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  align-items: flex-start;
}
.kanban-board::-webkit-scrollbar { height: 4px; }
.kanban-board::-webkit-scrollbar-track { background: transparent; }
.kanban-board::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 4px; }
.kanban-col {
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 120px;
}
.kanban-col-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 4px;
  border-bottom: 1px solid #1e1e22;
  margin-bottom: 4px;
}
.kanban-col-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.kd-borrador      { background: #4a4a4f; }
.kd-en-desarrollo { background: #38bdf8; }
.kd-desarrollado  { background: #4ade80; }
.kd-programado    { background: #f59e0b; }
.kd-posteado      { background: #f5f5f7; }
.kanban-col-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #6e6e73;
  text-transform: uppercase;
  flex: 1;
}
.kanban-col-count {
  font-size: 12px;
  font-weight: 600;
  color: #3a3a3f;
  background: #1a1a1e;
  border-radius: 100px;
  padding: 1px 7px;
}
.kanban-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kanban-card {
  position: relative;
  background: #111;
  border: 1px solid #1e1e22;
  border-radius: 10px;
  padding: 12px 14px 10px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.15s;
  border-left: 3px solid var(--kc-accent, #38bdf8);
}
.kanban-card:hover { border-color: var(--kc-accent, #38bdf8); background: #161616; }
.kanban-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.kanban-card-num {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--kc-accent, #38bdf8);
}
.kanban-card-kind {
  font-size: 10px;
  color: #4a4a4f;
  font-weight: 500;
}
.kanban-card-name {
  font-size: 12px;
  color: #d1d1d6;
  line-height: 1.4;
  margin: 0 0 8px;
}
.kanban-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.kanban-move-btn {
  font-size: 10px;
  padding: 3px 7px;
  border-radius: 6px;
  border: 1px solid #1e1e22;
  background: #0d0d10;
  color: #6e6e73;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.12s;
  white-space: nowrap;
}
.kanban-move-btn:hover { border-color: #38bdf8; color: #38bdf8; background: #0f2a38; }
.kanban-empty {
  font-size: 12px;
  color: #2a2a2e;
  text-align: center;
  padding: 20px 0;
}

/* ===== IDEAS BACKLOG ===== */
.ideas-wrap { display: flex; flex-direction: column; gap: 20px; }
.ideas-add-row { display: flex; gap: 10px; align-items: center; }
.ideas-type-sel {
  background: #111;
  border: 1px solid rgba(255,255,255,0.1);
  color: #a1a1a6;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
}
.ideas-add-input {
  flex: 1;
  background: #111;
  border: 1px solid rgba(255,255,255,0.1);
  color: #f5f5f7;
  font-size: 13px;
  padding: 8px 14px;
  border-radius: 8px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}
.ideas-add-input:focus { border-color: #38bdf8; }
.ideas-add-input::placeholder { color: #4a4a4f; }
.ideas-add-btn {
  background: rgba(56,189,248,0.1);
  border: 1px solid rgba(56,189,248,0.25);
  color: #38bdf8;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
  white-space: nowrap;
}
.ideas-add-btn:hover { background: rgba(56,189,248,0.18); }
.ideas-list { display: flex; flex-direction: column; gap: 8px; }
.ideas-list-done { margin-top: 8px; opacity: 0.5; }
.idea-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #111;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 14px 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s;
}
.idea-card:hover { border-color: rgba(255,255,255,0.13); }
.idea-accent-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--ic, #38bdf8);
  border-radius: 3px 0 0 3px;
}
.idea-card-left { display: flex; align-items: flex-start; gap: 12px; flex: 1; min-width: 0; }
.idea-type-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--ic, #38bdf8);
  flex-shrink: 0;
  margin-top: 5px;
}
.idea-card-body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.idea-title { font-size: 14px; font-weight: 600; color: #f5f5f7; margin: 0; }
.idea-desc { font-size: 12px; color: #6e6e73; margin: 0; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.idea-card-actions { display: flex; gap: 6px; flex-shrink: 0; }
.idea-btn {
  width: 28px; height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: #6e6e73;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  transition: all 0.15s;
}
.idea-btn svg { width: 14px; height: 14px; }
.idea-btn-done:hover { background: rgba(34,197,94,0.15); border-color: rgba(34,197,94,0.3); color: #22c55e; }
.idea-btn-del:hover  { background: rgba(239,68,68,0.1);  border-color: rgba(239,68,68,0.25); color: #f87171; }
.idea-card-done { border-radius: 10px; }
.idea-done-check { width: 14px; height: 14px; color: #22c55e; flex-shrink: 0; margin-top: 2px; }
.ideas-empty { font-size: 13px; color: #4a4a4f; padding: 20px 0; text-align: center; }
.ideas-show-done {
  background: none; border: none; color: #4a4a4f;
  font-size: 12px; cursor: pointer; font-family: inherit;
  padding: 4px 0;
  transition: color 0.15s;
}
.ideas-show-done:hover { color: #a1a1a6; }

/* ===== PORTADAS HIGHLIGHTS ===== */
.portadas-wrap { display: flex; flex-direction: column; gap: 24px; }
.portadas-hint { font-size: 13px; color: #4a4a4f; margin: 0; }
.portadas-grid { display: flex; flex-wrap: wrap; gap: 32px; }
.portada-item { display: flex; flex-direction: column; gap: 12px; align-items: center; }
.portada-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; color: #6e6e73; text-transform: uppercase; }
.portada-sq {
  width: 300px;
  height: 300px;
  background: #080808;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.portada-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(40px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.portada-icon-q {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 220px;
  font-weight: 900;
  color: #38bdf8;
  line-height: 1;
  position: relative;
  z-index: 1;
  user-select: none;
}
.portada-dots {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  padding: 20px;
}
.portada-dot {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
}

/* ===== FECHA EN CARDS ===== */
.grid-card-date-pill {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 3px 8px;
  border-radius: 100px;
  pointer-events: none;
  z-index: 2;
}
.gdp-today {
  background: rgba(239,68,68,0.18);
  color: #f87171;
  border: 1px solid rgba(239,68,68,0.35);
}
.gdp-tomorrow {
  background: rgba(245,158,11,0.18);
  color: #fbbf24;
  border: 1px solid rgba(245,158,11,0.35);
}
.gdp-soon {
  background: rgba(56,189,248,0.12);
  color: #38bdf8;
  border: 1px solid rgba(56,189,248,0.25);
}
</style>
