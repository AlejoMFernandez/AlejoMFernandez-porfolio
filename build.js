#!/usr/bin/env node
/* =========================================================
   build.js — genera el HTML estático del sitio a partir de js/data.js
   (+ textos de js/precios.js) y de las páginas en src/paginas.js.

   Correr antes de cada commit:   node build.js
   Qué hace:
     1. index.html: pre-renderiza el muro de proyectos, clientes, laboratorio y la cinta
        de logos, y completa los textos data-i18n vacíos en español. Así Google (y quien
        no ejecute JS) ve el contenido real y enlaces <a href> a cada proyecto.
     2. proyectos/index.html y proyectos/<id>/index.html: una página por proyecto.
     3. Páginas de servicio definidas en src/paginas.js (ej. diseno-web-restaurantes).
     4. 404.html con el diseño del sitio.
     5. sitemap.xml con todas las URLs.
   No necesita dependencias: Node ≥ 18.
   ========================================================= */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SITE = 'https://alejomfernandez.com.ar';
const WA = 'https://wa.me/5491125237915';
const TODAY = new Date().toISOString().slice(0, 10);

/* ---------- cargar data.js y precios.js sin navegador ---------- */
function loadData() {
  const noop = () => {};
  const el = { addEventListener: noop, setAttribute: noop, classList: { add: noop, remove: noop, toggle: noop }, style: { setProperty: noop }, dataset: {}, textContent: '', innerHTML: '' };
  const document = { addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createElement: () => el, body: el, documentElement: el, head: el };
  const window = { document, addEventListener: noop, matchMedia: () => ({ matches: false, addEventListener: noop }), localStorage: { getItem: () => null, setItem: noop }, location: { search: '', hash: '' }, requestAnimationFrame: noop, setTimeout: noop, navigator: { language: 'es' } };
  window.window = window;
  const ctx = vm.createContext(Object.assign({}, window, { window }));
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/precios.js'), 'utf8'), ctx);
  return { P: ctx.window.PROJECTS, T: ctx.window.I18N.es, RIBBON: ctx.window.RIBBON || [] };
}
const { P, T, RIBBON } = loadData();
const t = k => T[k] || k;
const L = o => (o && (o.es || '')) || '';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const attr = esc;
const statusText = p => p.status.map(s => t('st.' + s)).join(' · ');
const isDemo = p => p.status.includes('proposal');
const restStatus = p => p.status.filter(s => s !== 'proposal').map(s => t('st.' + s)).join(' · ');
const caseUrl = p => `/proyectos/${p.id}`;
const abs = u => (u.startsWith('http') ? u : SITE + (u.startsWith('/') ? u : '/' + u));
const exists = rel => fs.existsSync(path.join(ROOT, rel));
const trunc = (s, n = 155) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
const write = (rel, html) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); console.log('  ✓', rel); };

const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const arrowOut = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const AF = '<svg class="af hdr__af" viewBox="0 0 300 230" aria-hidden="true"><path class="af__a" fill-rule="evenodd" d="M99 1H146V176H70L48 227H0Z M121 56L146 113V134H88Z"/><path class="af__f" d="M156 1H299V44H200V93H280V136H156Z"/><g class="af__wk"><path class="k" d="M156 136h24v89a3 3 0 0 1-3 3h-18a3 3 0 0 1-3-3Z"/><path class="k" d="M182 136h22v89a3 3 0 0 1-3 3h-16a3 3 0 0 1-3-3Z"/><path class="k" d="M206 136h24v89a3 3 0 0 1-3 3h-18a3 3 0 0 1-3-3Z"/></g><g class="af__bk"><path class="k" d="M174 136h14v52a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2Z"/><path class="k" d="M198 136h14v52a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2Z"/></g></svg>';

/* ---------- 1. HOME pre-renderizada (mismo markup que main.js) ---------- */
function tileHTML(p) {
  const mono = p.mono || p.logo;
  return `<a class="tile${p.group === 'featured' ? ' tile--wide' : ''}${isDemo(p) ? ' tile--demo' : ''} reveal" href="${caseUrl(p)}" data-id="${p.id}" style="--brand:${p.brand}" data-ink="${p.ink}">
      <span class="tile__fill" aria-hidden="true"></span>
      <span class="tile__top"><span class="tile__kind">${p.group === 'featured' ? t('tile.featured') : esc(L(p.kind))}</span><span class="tile__status${isDemo(p) ? ' is-demo' : ''}">${isDemo(p) ? `<span class="demo-badge">${t('st.proposal')}</span>` + (restStatus(p) ? ` <span class="tile__substatus">${restStatus(p)}</span>` : '') : statusText(p)}</span></span>
      <span class="tile__logos${p.round ? ' is-round' : ''}" aria-hidden="true">
        <img class="tile__logo tile__logo--mono" src="${mono}" alt="" loading="lazy">
        <img class="tile__logo tile__logo--color" src="${p.logo}" alt="" loading="lazy">
      </span>
      <span class="tile__name">${esc(p.name)}</span>
      <span class="tile__cta"><span>${t('tile.view')}</span>${arrow}</span>
    </a>`;
}
function rowHTML(p) {
  const logo = p.logo ? `<img src="${p.logo}" alt="" loading="lazy">` : `<span class="row__textlogo">${esc(p.name)}</span>`;
  return `<li class="reveal"><a class="row" href="${caseUrl(p)}" data-id="${p.id}">
      <span class="row__logo" aria-hidden="true">${logo}</span>
      <span class="row__name">${esc(p.name)}${p.highlight ? `<em>${t('row.highlight')}</em>` : ''}</span>
      <span class="row__kind">${esc(L(p.kind))}</span>
      <span class="row__status">${statusText(p)}</span>
      <span class="row__arrow">${arrow}</span>
    </a></li>`;
}
function ribbonHTML() {
  const items = RIBBON.map(id => P.find(p => p.id === id)).filter(p => p && p.logo);
  const one = (p, dup) => `<a class="ribbon__item" href="${caseUrl(p)}" data-id="${p.id}" ${dup ? 'aria-hidden="true" tabindex="-1"' : `aria-label="${attr(p.name)}"`}><img src="${p.ribbon || p.mono || p.logo}" alt="" loading="lazy"></a>`;
  return items.map(p => one(p)).join('') + items.map(p => one(p, true)).join('');
}
function fillInner(html, openTagRe, inner) {
  const m = html.match(openTagRe); if (!m) throw new Error('No encuentro ' + openTagRe);
  const start = m.index + m[0].length;
  const tag = m[0].match(/^<(\w+)/)[1];
  // buscar el cierre correspondiente (los contenedores no se anidan entre sí)
  const closeRe = new RegExp(`</${tag}>`, 'g'); closeRe.lastIndex = start;
  let depth = 1, pos = start;
  const openRe = new RegExp(`<${tag}[\\s>]`, 'g');
  while (depth > 0) {
    closeRe.lastIndex = pos; const c = closeRe.exec(html);
    openRe.lastIndex = pos; const o = openRe.exec(html);
    if (!c) throw new Error('Sin cierre para ' + tag);
    if (o && o.index < c.index) { depth++; pos = o.index + 1; } else { depth--; pos = c.index + (depth === 0 ? 0 : c[0].length); }
  }
  return html.slice(0, start) + '\n' + inner + '\n    ' + html.slice(pos);
}
function buildHome() {
  let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const wall = P.filter(p => p.group === 'featured' || p.group === 'new');
  const clients = P.filter(p => p.group === 'client');
  const lab = P.filter(p => p.group === 'lab');
  html = fillInner(html, /<div class="wall" id="wall">/, wall.map(tileHTML).join('\n'));
  html = fillInner(html, /<ul class="rows" id="clients">/, clients.map(rowHTML).join('\n'));
  html = fillInner(html, /<ul class="rows rows--lab" id="lab">/, lab.map(rowHTML).join('\n'));
  html = fillInner(html, /<div class="ribbon__track" id="ribbon">/, ribbonHTML());
  html = html.replace(/<sup id="proj-count">\d*<\/sup>/, `<sup id="proj-count">${wall.length}</sup>`)
             .replace(/<sup id="cli-count">\d*<\/sup>/, `<sup id="cli-count">${clients.length}</sup>`)
             .replace(/<sup id="lab-count">\d*<\/sup>/, `<sup id="lab-count">${lab.length}</sup>`);
  // textos data-i18n vacíos → español (Google no debería depender del JS para leer los precios)
  html = html.replace(/(<(\w+)([^>]*)\sdata-i18n="([\w.]+)"([^>]*)>)([^<]*)(<\/\2>)/g, (m, open, tag, a, key, b, cur, close) => {
    const v = T[key]; return v ? open + esc(v) + close : m;
  });
  write('index.html', html);
}

/* ---------- 2. Cascarón de subpágina ---------- */
function shell({ title, desc, url, image, body, jsonld, bodyClass = '', lang = 'es' }) {
  const img = image ? abs(image) : abs('img/og.jpg') + '?v=2';
  const imgMeta = image ? '' : `\n  <meta property="og:image:type" content="image/jpeg">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">`;
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(desc)}">
  <meta name="theme-color" content="#0c0c0e">
  <meta name="author" content="Alejo Martín Fernández">
  <link rel="canonical" href="${abs(url)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Alejo Martín Fernández">
  <meta property="og:locale" content="es_AR">
  <meta property="og:url" content="${abs(url)}">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(desc)}">
  <meta property="og:image" content="${img}">${imgMeta}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:description" content="${attr(desc)}">
  <meta name="twitter:image" content="${img}">
  <link rel="icon" type="image/png" href="/img/favicon.png">
  <link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="/css/style.css?v=15">
  <link rel="stylesheet" href="/css/pagina.css?v=2">
${jsonld ? `  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n` : ''}</head>
<body class="${bodyClass}">
  <a class="skip" href="#contenido">Saltar al contenido</a>
  <header class="hdr is-scrolled" id="hdr">
    <a class="hdr__brand" href="/" aria-label="Alejo Martín Fernández, inicio">${AF}<span class="hdr__name"><span>Alejo Martín Fernández</span></span></a>
    <nav class="hdr__nav" aria-label="Principal">
      <a href="/proyectos">Proyectos</a>
      <a href="/#precios">Precios</a>
      <a href="/#sobre-mi">Sobre mí</a>
      <a href="/#contacto">Contacto</a>
    </nav>
    <div class="hdr__end"><a class="hdr__cta" href="${WA}" target="_blank" rel="noopener">Hablemos</a></div>
  </header>
  <main id="contenido">
${body}
  </main>
  <footer class="ftr">
    <div class="ftr__col"><span class="ftr__label">Hora en Buenos Aires</span><span class="ftr__val" id="clock">--:-- GMT-3</span></div>
    <div class="ftr__col"><span class="ftr__label">© ${new Date().getFullYear()}</span><span class="ftr__val">Villa del Parque, Buenos Aires</span></div>
    <p class="ftr__credit">Sitio desarrollado por <a href="https://alejomfernandez.com.ar">Alejo Martín Fernández</a></p>
  </footer>
  <script src="/js/pagina.js?v=1" defer></script>
</body>
</html>
`;
}
const crumbs = items => `<ol class="crumbs">${items.map(([n, u]) => (u ? `<li><a href="${u}">${esc(n)}</a></li>` : `<li>${esc(n)}</li>`)).join('')}</ol>`;
const breadcrumbLd = items => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, ...(u ? { item: abs(u) } : {}) })) });
const PERSON = { '@id': SITE + '/#alejo' };

/* ---------- 3. Página de cada proyecto ---------- */
function caseTitle(p) {
  const kind = L(p.kind);
  if (p.group === 'lab' || p.group === 'featured') return `${p.name}: ${kind.toLowerCase()} | Proyecto de Alejo Martín Fernández`;
  return `Web para ${p.name} (${kind.toLowerCase()}) | Alejo Martín Fernández`;
}
function brandBlock(p, cls) {
  const inner = p.logo ? `<img src="/${p.logo}" alt="Logo de ${attr(p.name)}" loading="lazy">` : `<span class="${cls}__textlogo">${esc(p.name)}</span>`;
  return `<div class="${cls}__brand${p.round ? ' is-round' : ''}" style="--brand:${p.brand}" data-ink="${p.ink}">${inner}</div>`;
}
function buildCase(p, i) {
  const prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
  const url = caseUrl(p);
  const desc = L(p.desc) || `${p.name}: ${L(p.kind)}. ${L(p.place)}.`;
  const image = p.poster && exists(p.poster) ? p.poster : 'img/og.jpg';
  const eyebrow = [isDemo(p) ? 'Demo web' : statusText(p), L(p.place), p.year].filter(Boolean).join(' · ');
  const waText = encodeURIComponent(`Hola Alejo! Vi el proyecto de ${p.name} en tu portfolio y quiero algo así para mi negocio. ¿Podemos hablar?`);
  const hasVideo = !!(p.video && exists(p.video));
  const heroRight = hasVideo
    ? `<div class="caso__phonewrap">
        ${p.logo ? `<img class="caso__logo" src="/${p.logo}" alt="" aria-hidden="true">` : ''}
        <div class="phone" style="--brand:${p.brand}"><div class="phone__screen"><video src="/${p.video}" ${p.poster ? `poster="/${p.poster}"` : ''} muted loop playsinline autoplay preload="metadata" aria-label="Recorrido por la web de ${attr(p.name)} en celular"></video></div></div>
        <button type="button" class="phone__sound" aria-label="Activar sonido"></button>
      </div>`
    : brandBlock(p, 'caso');
  const body = `
  <article class="pg caso" style="--brand:${p.brand}">
    <div class="caso__glow" aria-hidden="true"></div>
    ${crumbs([['Inicio', '/'], ['Proyectos', '/proyectos'], [p.name]])}
    <div class="caso__hero">
      <div>
        <p class="pg__eyebrow">${esc(eyebrow)}</p>
        <h1 class="pg__title">${esc(p.name)}</h1>
        <p class="pg__lead">${esc(desc)}</p>
        <div class="caso__ctas">
          ${p.url ? `<a class="btn btn--light magnetic" href="${attr(p.url)}" target="_blank" rel="noopener"><span>Ver web en vivo</span>${arrowOut}</a>` : `<span class="btn btn--ghost" aria-disabled="true">Todavía no está online</span>`}
          <a class="btn btn--ghost magnetic" href="${WA}?text=${waText}" target="_blank" rel="noopener">Quiero una web así</a>
        </div>
        ${p.ig ? `<a class="link-arrow" href="${attr(p.ig)}" target="_blank" rel="noopener">Ver el reel en Instagram ${arrowOut}</a>` : ''}
      </div>
      ${heroRight}
    </div>
    ${isDemo(p) ? `<p class="demo-note reveal"><span class="demo-badge">Demo web</span><span>${esc(t('panel.demoNote'))} Si sos de ${esc(p.name)} y te interesa, <a class="inl" href="${WA}" target="_blank" rel="noopener">escribime</a>: la web ya está diseñada.</span></p>` : ''}
    <dl class="meta reveal">
      <div><dt>Rubro</dt><dd>${esc(L(p.kind))}</dd></div>
      <div><dt>Lugar</dt><dd>${esc(L(p.place))}</dd></div>
      <div><dt>Estado</dt><dd>${statusText(p)}</dd></div>
      ${p.year ? `<div><dt>Año</dt><dd>${p.year}</dd></div>` : ''}
      ${p.stack ? `<div><dt>Tecnología</dt><dd>${p.stack.map(esc).join(', ')}</dd></div>` : ''}
    </dl>
    ${(L(p.did) || []).length ? `<h2 class="reveal">Qué hice</h2><ul class="panel__did">${L(p.did).map(d => `<li class="reveal">${esc(d)}</li>`).join('')}</ul>` : ''}
    ${hasVideo ? `<p class="reveal" style="color:var(--muted);max-width:60ch">La mayoría de los clientes de un negocio llegan desde Instagram o Google Maps, con el celular en la mano. Por eso cada web la diseño primero para esa pantalla: lo que ves arriba es la versión real en un teléfono.</p>` : ''}
    <nav class="prevnext" aria-label="Otros proyectos">
      <a class="reveal" href="${caseUrl(prev)}"><small>Anterior</small><b>${esc(prev.name)}</b></a>
      <a class="reveal" href="${caseUrl(next)}"><small>Siguiente</small><b>${esc(next.name)}</b></a>
    </nav>
    <section class="cta-band reveal">
      <h2>¿Tenés un negocio con identidad? Armemos su web.</h2>
      <p>Contame qué hacés y te respondo a la brevedad. Un solo pago, sin mensualidades, desde USD 390.</p>
      <a class="btn btn--light magnetic" href="${WA}?text=${waText}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn btn--ghost magnetic" href="/#precios">Ver precios</a>
    </section>
  </article>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isDemo(p) || p.group === 'lab' ? 'CreativeWork' : 'WebSite',
        name: `${p.name} · ${L(p.kind)}`,
        headline: `Web para ${p.name}`,
        description: desc,
        url: p.url || abs(url),
        image: abs(image),
        inLanguage: 'es',
        ...(p.year ? { dateCreated: String(p.year) } : {}),
        genre: L(p.kind),
        locationCreated: { '@type': 'Place', name: L(p.place) },
        author: PERSON, creator: PERSON,
        ...(p.stack ? { keywords: p.stack.join(', ') } : {}),
        mainEntityOfPage: abs(url)
      },
      breadcrumbLd([['Inicio', '/'], ['Proyectos', '/proyectos'], [p.name, url]])
    ]
  };
  write(`proyectos/${p.id}/index.html`, shell({ title: caseTitle(p), desc: trunc(desc), url, image, body, jsonld, bodyClass: 'pg-caso' }));
  return url;
}

/* ---------- 4. Listado /proyectos ---------- */
function cardHTML(p) {
  return `<li class="reveal"><a class="card" href="${caseUrl(p)}">
    <div class="card__brand${p.round ? ' is-round' : ''}" style="--brand:${p.brand}" data-ink="${p.ink}">${p.logo ? `<img src="/${p.logo}" alt="" loading="lazy">` : `<span>${esc(p.name)}</span>`}</div>
    <div class="card__body"><span class="card__kind">${esc(L(p.kind))}</span><span class="card__name">${esc(p.name)}</span><span class="card__status">${statusText(p)} · ${esc(L(p.place))}</span></div>
  </a></li>`;
}
function buildIndex() {
  const groups = [
    ['Demos y proyectos propios', 'Webs que diseñé por iniciativa propia para negocios reales, para mostrarles cómo podría verse su sitio, más mis proyectos destacados.', P.filter(p => p.group === 'featured' || p.group === 'new')],
    ['Clientes', 'Sitios en producción para negocios reales.', P.filter(p => p.group === 'client')],
    ['Laboratorio', 'Proyectos propios para probar ideas: animación, juegos y apps.', P.filter(p => p.group === 'lab')]
  ];
  const body = `
  <div class="pg">
    ${crumbs([['Inicio', '/'], ['Proyectos']])}
    <p class="pg__eyebrow">${P.length} proyectos · Argentina y Brasil</p>
    <h1 class="pg__title">Webs para restaurantes, cafés, hoteles y marcas con identidad</h1>
    <p class="pg__lead">Cada sitio nace de la marca, no de una plantilla. Acá están los que hice para clientes, las demos que diseñé para negocios que me gustan y los experimentos propios. Tocá uno para ver qué hice y cómo se ve en el celular.</p>
    ${groups.map(([h, lead, list]) => `<h2>${h} <sup style="font-family:var(--mono);font-size:13px;font-weight:400;color:var(--muted)">${list.length}</sup></h2><p style="color:var(--muted);margin-top:-6px">${lead}</p><ul class="grid">${list.map(cardHTML).join('')}</ul>`).join('')}
    <section class="cta-band reveal">
      <h2>¿Querés ver cómo se vería la web de tu negocio?</h2>
      <p>Contame el rubro y te muestro ejemplos parecidos. Sin compromiso.</p>
      <a class="btn btn--light" href="${WA}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn btn--ghost" href="/#precios">Ver precios</a>
    </section>
  </div>`;
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', name: 'Proyectos web de Alejo Martín Fernández', url: abs('/proyectos'), author: PERSON, inLanguage: 'es',
      hasPart: P.map(p => ({ '@type': 'CreativeWork', name: p.name, url: abs(caseUrl(p)) })) },
    breadcrumbLd([['Inicio', '/'], ['Proyectos', '/proyectos']]) ] };
  write('proyectos/index.html', shell({ title: `Proyectos: ${P.length} webs para restaurantes, cafés, hoteles y marcas | Alejo Martín Fernández`, desc: 'Portfolio de sitios web a medida: clientes reales en Argentina, demos para negocios de Buenos Aires, Salvador y Maceió, y proyectos propios. Mirá cómo se ven en el celular.', url: '/proyectos', body, jsonld }));
}

/* ---------- 5. Páginas de servicio (src/paginas.js) ---------- */
function buildServicePages() {
  const file = path.join(ROOT, 'src/paginas.js');
  if (!fs.existsSync(file)) return [];
  const pages = require(file)({ P, T, L, esc, attr, WA, SITE, exists, caseUrl, crumbs, breadcrumbLd, PERSON, arrowOut, statusText });
  return pages.map(pg => { write(`${pg.slug}/index.html`, shell(pg)); return '/' + pg.slug; });
}

/* ---------- 6. 404 ---------- */
function build404() {
  const body = `
  <div class="pg nf">
    <div>
      <img src="/img/sticker.webp" alt="" width="420" height="420">
      <p class="nf__code">ERROR 404</p>
      <h1 class="pg__title" style="margin:0 auto 14px">Esta página no existe.</h1>
      <p class="pg__lead" style="margin:0 auto 28px">Puede que el link esté viejo o mal escrito. Lo que sí existe:</p>
      <p><a class="btn btn--light" href="/">Ir al inicio</a> <a class="btn btn--ghost" href="/proyectos">Ver proyectos</a> <a class="btn btn--ghost" href="${WA}" target="_blank" rel="noopener">Escribirme</a></p>
    </div>
  </div>`;
  const html = shell({ title: 'Página no encontrada | Alejo Martín Fernández', desc: 'La página que buscás no existe. Volvé al inicio o mirá los proyectos.', url: '/404', body }).replace('<link rel="canonical"', '<meta name="robots" content="noindex">\n  <link rel="canonical"');
  write('404.html', html);
}

/* ---------- 7. sitemap ---------- */
function buildSitemap(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u, pr]) => `  <url><loc>${abs(u)}</loc><lastmod>${TODAY}</lastmod><priority>${pr}</priority></url>`).join('\n')}\n</urlset>\n`;
  write('sitemap.xml', xml);
}

/* ---------- go ---------- */
console.log('build:');
buildHome();
buildIndex();
const caseUrls = P.map((p, i) => buildCase(p, i));
const svcUrls = buildServicePages();
build404();
buildSitemap([['/', '1.0'], ...svcUrls.map(u => [u, '0.9']), ['/proyectos', '0.8'], ...caseUrls.map(u => [u, '0.6'])]);
console.log('listo.');
