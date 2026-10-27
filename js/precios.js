/* Secciones nuevas (Precios, Laboratorio desplegable, Sobre mí, Redes): textos (ES/PT/EN) + vistas previas al pasar el mouse.
   Se carga después de data.js y antes de main.js, así main.js traduce los data-i18n. */
(() => {
  Object.assign(window.I18N.es, {
    'lab.open': 'Ver', 'lab.close': 'Ocultar',
    'ab.big': 'Soy Alejo.|Hago webs que se ven como tu marca|y trabajan para tu negocio.',
    'ab.piano': 'Toco el piano', 'ab.racing': 'Hincha de Racing',
    'ab.s1': 'años programando', 'ab.s2': 'webs hechas', 'ab.s3': 'clientes en 2 países', 'ab.s4': 'te atiendo en tu idioma',
    'ab.how': 'Cómo trabajo',
    'ab.h1': 'Charlamos', 'ab.h1d': 'Me contás qué querés, qué no y cómo es tu marca.',
    'ab.h2': 'Propuesta', 'ab.h2d': 'Alcance, etapas por semana y precio, por escrito.',
    'ab.h3': 'Diseño y desarrollo', 'ab.h3d': 'Seguís el avance en un link en vivo.',
    'ab.h4': 'Prueba y entrega', 'ab.h4d': 'Una semana de prueba y queda online.',
    'ab.edu': 'Técnico Superior en Diseño y Programación Web · Escuela Da Vinci',
    'so.title': 'Mirá cómo|armo cada web.',
    'pr.wa': 'Hola Alejo! Vi tu portfolio y me interesa la web {plan} ({price}). ¿Podemos hablar?',
    'nav.prices': 'Precios',
    'pr.title': 'Precios', 'pr.lead': 'Pago inicial + abono mensual.',
    'pr.slogan1': 'No pagues tres sistemas.', 'pr.slogan2': 'Pagá una web que hace todo.',
    'pr.intro': 'Reservas, pedidos con pago y tu carta editable, adentro de una web con tu identidad. Un pago inicial y un solo abono que la mantiene andando.',
    'pr.today': 'Lo que se paga hoy, todos los meses',
    'pr.c1': 'Tienda online', 'pr.c1v': 'desde $27.999/mes',
    'pr.c2': 'Sistema de reservas', 'pr.c2v': 'abono mensual',
    'pr.c3': 'Carta QR', 'pr.c3v': '$13.582/mes',
    'pr.cy': 'En un año', 'pr.cyv': 'más de $500.000',
    'pr.with': 'Con tu web', 'pr.once': 'Un abono, no tres.', 'pr.onceTxt': 'Las tres cosas en tu propio sitio, con un solo abono y sin comisiones por pedido.',
    'pr.hint': 'Pasá el mouse (o tocá) cada punto para verlo funcionando.',
    'pr.from': 'desde', 'pr.want': 'Quiero esta', 'pr.popular': 'El más elegido',
    'pr.p1': 'Identidad', 'pr.p1d': 'Para dejar de vivir solo en Instagram, con una web que se ve como tu marca.',
    'pr.p2': 'Funcional', 'pr.p2d': 'Tu web empieza a trabajar: recibe reservas o vende sola.',
    'pr.p3': 'Completa', 'pr.p3d': 'Todo el negocio en un lugar, y lo manejás vos sin depender de nadie.',
    'pr.allP1': 'Todo lo de Identidad', 'pr.allP2': 'Todo lo de Funcional',
    'pr.f.identidad': 'Diseño a medida con tu identidad', 'pr.f.secciones': 'Hasta 5 secciones',
    'pr.f.carta': 'Carta o catálogo para mostrar', 'pr.f.whatsapp': 'Botón de WhatsApp para consultas',
    'pr.f.dominio': 'Publicada con tu dominio',
    'pr.f.reservas': 'Un módulo a elección: reservas online…', 'pr.f.pedidos': '…o pedidos con carrito y Mercado Pago',
    'pr.f.panel': 'Panel para ver lo que entra', 'pr.f.aviso': 'Aviso en cada reserva o pedido',
    'pr.f.ambos': 'Reservas y pedidos, los dos', 'pr.f.editable': 'Carta editable: cambiás precios vos',
    'pr.f.admin': 'Panel de administración propio', 'pr.f.productos': 'Te cargo hasta 40 productos',
    'pr.n1': 'Abono mensual', 'pr.n1d': 'Incluye hosting, base de datos y mantenimiento, para que tu web siga andando.',
    'pr.n2': 'Funciones nuevas a medida', 'pr.n2d': 'Cambios grandes o funciones nuevas se cotizan aparte, solo si los necesitás.',
    'pr.n3': '¿Cadena o franquicia?', 'pr.n3d': 'Varias sucursales o idiomas: cotización a medida.',
    'pr.price1': 'USD 390', 'pr.price2': 'USD 690', 'pr.price3': 'USD 990',
    'pr.foot': 'Precios del pago inicial en USD, octubre 2026. Costos de referencia: precios publicados por plataformas conocidas.'
  });
  Object.assign(window.I18N.pt, {
    'lab.open': 'Ver', 'lab.close': 'Ocultar',
    'ab.big': 'Sou o Alejo.|Faço sites com a cara da sua marca|que trabalham pelo seu negócio.',
    'ab.piano': 'Toco piano', 'ab.racing': 'Torcedor do Racing',
    'ab.s1': 'anos programando', 'ab.s2': 'sites feitos', 'ab.s3': 'clientes em 2 países', 'ab.s4': 'atendo no seu idioma',
    'ab.how': 'Como eu trabalho',
    'ab.h1': 'Conversamos', 'ab.h1d': 'Você me conta o que quer, o que não quer e como é a sua marca.',
    'ab.h2': 'Proposta', 'ab.h2d': 'Escopo, etapas semanais e preço, por escrito.',
    'ab.h3': 'Design e desenvolvimento', 'ab.h3d': 'Você acompanha tudo por um link ao vivo.',
    'ab.h4': 'Teste e entrega', 'ab.h4d': 'Uma semana de testes e o site vai ao ar.',
    'ab.edu': 'Técnico Superior em Design e Programação Web · Escuela Da Vinci',
    'so.title': 'Veja como|eu crio cada site.',
    'pr.wa': 'Oi Alejo! Vi seu portfólio e tenho interesse no site {plan} ({price}). Podemos conversar?',
    'nav.prices': 'Preços',
    'pr.title': 'Preços', 'pr.lead': 'Pagamento inicial + mensalidade.',
    'pr.slogan1': 'Não pague três sistemas.', 'pr.slogan2': 'Pague um site que faz tudo.',
    'pr.intro': 'Reservas, pedidos com pagamento e seu cardápio editável, dentro de um site com a sua identidade. Um pagamento inicial e uma única mensalidade que mantém tudo funcionando.',
    'pr.today': 'O que se paga hoje, todo mês',
    'pr.c1': 'Loja online', 'pr.c1v': 'mensalidade',
    'pr.c2': 'Sistema de reservas', 'pr.c2v': 'mensalidade',
    'pr.c3': 'Cardápio QR', 'pr.c3v': 'mensalidade',
    'pr.cy': 'Em um ano', 'pr.cyv': '12 mensalidades × 3',
    'pr.with': 'Com o seu site', 'pr.once': 'Uma mensalidade, não três.', 'pr.onceTxt': 'As três coisas no seu próprio site, com uma única mensalidade e sem comissão por pedido.',
    'pr.hint': 'Passe o mouse (ou toque) em cada item para vê-lo funcionando.',
    'pr.from': 'a partir de', 'pr.want': 'Quero este', 'pr.popular': 'O mais escolhido',
    'pr.p1': 'Identidade', 'pr.p1d': 'Para deixar de existir só no Instagram, com um site com a cara da sua marca.',
    'pr.p2': 'Funcional', 'pr.p2d': 'Seu site começa a trabalhar: recebe reservas ou vende sozinho.',
    'pr.p3': 'Completo', 'pr.p3d': 'O negócio inteiro num lugar só, e você mesmo administra.',
    'pr.allP1': 'Tudo do Identidade', 'pr.allP2': 'Tudo do Funcional',
    'pr.f.identidad': 'Design sob medida com a sua identidade', 'pr.f.secciones': 'Até 5 seções',
    'pr.f.carta': 'Cardápio ou catálogo para mostrar', 'pr.f.whatsapp': 'Botão de WhatsApp para contato',
    'pr.f.dominio': 'No ar com o seu domínio',
    'pr.f.reservas': 'Um módulo à escolha: reservas online…', 'pr.f.pedidos': '…ou pedidos com carrinho e pagamento online',
    'pr.f.panel': 'Painel para ver o que chega', 'pr.f.aviso': 'Aviso a cada reserva ou pedido',
    'pr.f.ambos': 'Reservas e pedidos, os dois', 'pr.f.editable': 'Cardápio editável: você muda os preços',
    'pr.f.admin': 'Painel de administração próprio', 'pr.f.productos': 'Eu cadastro até 40 produtos',
    'pr.n1': 'Mensalidade', 'pr.n1d': 'Inclui hospedagem, banco de dados e manutenção, para o seu site continuar funcionando.',
    'pr.n2': 'Funções novas sob medida', 'pr.n2d': 'Mudanças grandes ou funções novas são orçadas à parte, só se precisar.',
    'pr.n3': 'Rede ou franquia?', 'pr.n3d': 'Várias unidades ou idiomas: orçamento sob medida.',
    'pr.price1': 'R$ 1.990', 'pr.price2': 'R$ 3.490', 'pr.price3': 'R$ 4.990',
    'pr.foot': 'Preços do pagamento inicial em reais, outubro de 2026.'
  });
  Object.assign(window.I18N.en, {
    'lab.open': 'Show', 'lab.close': 'Hide',
    'ab.big': "I'm Alejo.|I build sites that look like your brand|and work for your business.",
    'ab.piano': 'I play the piano', 'ab.racing': 'Racing Club fan',
    'ab.s1': 'years coding', 'ab.s2': 'websites built', 'ab.s3': 'clients in 2 countries', 'ab.s4': 'I speak your language',
    'ab.how': 'How I work',
    'ab.h1': 'We talk', 'ab.h1d': "You tell me what you want, what you don't, and what your brand is like.",
    'ab.h2': 'Proposal', 'ab.h2d': 'Scope, weekly stages and price, in writing.',
    'ab.h3': 'Design and build', 'ab.h3d': 'You follow progress on a live link.',
    'ab.h4': 'Testing and launch', 'ab.h4d': 'One week of testing, then it goes live.',
    'ab.edu': 'Web Design and Programming degree · Escuela Da Vinci',
    'so.title': 'See how|I build every site.',
    'pr.wa': "Hi Alejo! I saw your portfolio and I'm interested in the {plan} website ({price}). Can we talk?",
    'nav.prices': 'Pricing',
    'pr.title': 'Pricing', 'pr.lead': 'Upfront payment + monthly plan.',
    'pr.slogan1': "Don't pay for three systems.", 'pr.slogan2': 'Pay for one site that does it all.',
    'pr.intro': 'Bookings, paid orders and an editable menu, inside a site with your identity. One upfront payment and a single monthly plan that keeps it running.',
    'pr.today': 'What businesses pay today, every month',
    'pr.c1': 'Online store', 'pr.c1v': 'monthly fee',
    'pr.c2': 'Booking system', 'pr.c2v': 'monthly fee',
    'pr.c3': 'QR menu', 'pr.c3v': 'monthly fee',
    'pr.cy': 'In a year', 'pr.cyv': '12 fees × 3',
    'pr.with': 'With your site', 'pr.once': 'One plan, not three.', 'pr.onceTxt': 'All three on your own site, with a single monthly plan and no per-order commission.',
    'pr.hint': 'Hover (or tap) each item to see it in action.',
    'pr.from': 'from', 'pr.want': 'I want this', 'pr.popular': 'Most popular',
    'pr.p1': 'Identity', 'pr.p1d': 'Stop living only on Instagram, with a site that looks like your brand.',
    'pr.p2': 'Functional', 'pr.p2d': 'Your site starts working: it takes bookings or sells on its own.',
    'pr.p3': 'Complete', 'pr.p3d': 'Your whole business in one place, and you run it yourself.',
    'pr.allP1': 'Everything in Identity', 'pr.allP2': 'Everything in Functional',
    'pr.f.identidad': 'Custom design with your identity', 'pr.f.secciones': 'Up to 5 sections',
    'pr.f.carta': 'Menu or catalog to show', 'pr.f.whatsapp': 'WhatsApp button for enquiries',
    'pr.f.dominio': 'Live on your own domain',
    'pr.f.reservas': 'One module of your choice: online bookings…', 'pr.f.pedidos': '…or orders with cart and online payment',
    'pr.f.panel': 'Dashboard to see what comes in', 'pr.f.aviso': 'Alert on every booking or order',
    'pr.f.ambos': 'Bookings and orders, both', 'pr.f.editable': 'Editable menu: you change the prices',
    'pr.f.admin': 'Your own admin dashboard', 'pr.f.productos': 'I load up to 40 products for you',
    'pr.n1': 'Monthly plan', 'pr.n1d': 'Includes hosting, database and maintenance, so your site keeps running.',
    'pr.n2': 'Custom new features', 'pr.n2d': 'Big changes or new features are quoted separately, only if you need them.',
    'pr.n3': 'Chain or franchise?', 'pr.n3d': 'Several locations or languages: custom quote.',
    'pr.price1': 'USD 390', 'pr.price2': 'USD 690', 'pr.price3': 'USD 990',
    'pr.foot': 'Upfront prices in USD, October 2026.'
  });

  /* ---------- vistas previas ---------- */
  const ico = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
    pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z"/></svg>'
  };
  const line = (a, b) => `<div class="pv__line"><span>${a}</span><b>${b}</b></div>`;
  const PV = {
    identidad: ['tunegocio.com.ar', `<div class="pv__brand"><span class="pv__logo">TU MARCA</span><span class="pv__menu"><i>Carta</i><i>Nosotros</i><i>Contacto</i></span></div>
      <div class="pv__heroimg"><b>Tu esencia,<br>en tu web.</b><span>Ver la carta</span></div>
      <div class="pv__swatch"><i style="background:#9a3412"></i><i style="background:#fdba74"></i><i style="background:#1c1917"></i><small>Tus colores y tipografías</small></div>`],
    secciones: ['tunegocio.com.ar', `<div class="pv__grid"><span class="is-dark">01 · Inicio</span><span>02 · Carta</span><span>03 · Nosotros</span><span>04 · Galería</span><span>05 · Contacto</span></div>`],
    carta: ['tunegocio.com.ar/carta', `<small class="pv__cap">ENTRADAS</small>${line('Provoleta a la plancha', '$9.800')}${line('Empanadas de carne (2)', '$6.400')}<small class="pv__cap">PRINCIPALES</small>${line('Bife de chorizo', '$24.500')}${line('Sorrentinos de calabaza', '$15.900')}`],
    whatsapp: ['WhatsApp', `<div class="pv__wa"><p class="me">Hola! Vi la web, ¿tienen lugar el sábado para 4?</p><p>¡Hola! Sí, a las 21 h tenemos mesa.</p><span class="pv__wabtn">${ico.chat}Escribinos</span></div>`],
    dominio: ['', `<div class="pv__domain"><span>${ico.lock}tunegocio.com.ar</span><small>Online, segura y rápida.<br>Se ve bien en el celular.</small></div>`],
    reservas: ['tunegocio.com.ar/reservar', `<b class="pv__h">Reservá tu mesa</b>
      <div class="pv__days"><i>Ma</i><i>Mi</i><i>Ju</i><i>Vi</i><i class="on">Sá</i><i>Do</i><i class="off">Lu</i></div>
      <div class="pv__slots"><i>20:00</i><i class="on">21:00</i><i>21:30</i><i class="off">22:00</i></div>
      <div class="pv__foot"><small>4 personas · Sáb 21:00</small><span class="pv__go">Confirmar</span></div>`],
    pedidos: ['tunegocio.com.ar/pedido', `<div class="pv__line pv__line--h"><b>Tu pedido</b><small>2 productos</small></div>
      <div class="pv__line"><span>Docena de empanadas</span><b><em>− 1 +</em>$28.000</b></div>
      <div class="pv__line"><span>Flan casero</span><b><em>− 1 +</em>$5.500</b></div>
      <div class="pv__line pv__line--total"><b>Total</b><b>$33.500</b></div>
      <span class="pv__mp">${ico.card}Pagar con Mercado Pago</span>`],
    panel: ['tunegocio.com.ar/panel', `<div class="pv__line pv__line--h"><b>Hoy · sábado</b><small>12 reservas · 7 pedidos</small></div>
      <div class="pv__row"><code>20:30</code><span>Martina · 2 pers.</span><i class="ok">Confirmada</i></div>
      <div class="pv__row"><code>21:00</code><span>Lucas · 4 pers.</span><i class="wait">Pendiente</i></div>
      <div class="pv__row"><code>#0418</code><span>Pedido · $33.500</span><i class="paid">Pagado</i></div>`],
    aviso: ['Notificaciones', `<div class="pv__notis"><div><span class="b1">${ico.bell}</span><p><b>Nueva reserva</b><small>Lucas · 4 personas · Sáb 21:00</small></p></div>
      <div><span class="b2">${ico.check}</span><p><b>Pedido pagado · $33.500</b><small>Retira a las 20:15</small></p></div></div>`],
    editable: ['tunegocio.com.ar/panel/carta', `<div class="pv__line pv__line--h"><b>Editar carta</b><span class="pv__go">+ Agregar plato</span></div>
      <div class="pv__row pv__row--ed"><span>Bife de chorizo</span><code class="edit">$26.000|</code>${ico.pen}</div>
      <div class="pv__row pv__row--ed"><span>Sorrentinos de calabaza</span><code>$15.900</code>${ico.pen}</div>
      <div class="pv__row pv__row--ed is-off"><span>Flan casero</span><i class="wait">Sin stock</i></div>`],
    productos: ['tunegocio.com.ar/carta', `<div class="pv__tiles">${['#fed7aa', '', '#fde68a', '', '', '#bbf7d0', '', '#fecaca', '#bfdbfe', '', '#fed7aa'].map(c => `<i${c ? ` style="background:${c}"` : ''}></i>`).join('')}<i class="more">+28</i></div>`]
  };
  PV.ambos = PV.pedidos;
  PV.admin = PV.panel;

  const build = () => {
    document.querySelectorAll('.feat[data-pv]').forEach(li => {
      if (li.querySelector('.pv')) return;
      const [url, body] = PV[li.dataset.pv] || [];
      if (!body) return;
      const pv = document.createElement('div');
      pv.className = 'pv'; pv.setAttribute('aria-hidden', 'true');
      pv.innerHTML = `<div class="pv__win"><div class="pv__bar"><i></i><i></i><i></i>${url ? `<span>${url}</span>` : ''}</div><div class="pv__body">${body}</div></div>`;
      li.appendChild(pv);
    });
  };

  /* en pantallas táctiles: tocar abre / cierra */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.feat__btn');
    document.querySelectorAll('.feat.is-open').forEach(f => { if (!btn || f !== btn.parentElement) f.classList.remove('is-open'); });
    if (btn) btn.parentElement.classList.toggle('is-open');
  });

  /* ---------- "Quiero esta" → WhatsApp con el plan elegido ---------- */
  const tr = k => { const L = window.I18N[window.siteLang] || window.I18N.es; return L[k] || window.I18N.es[k] || ''; };
  const setWa = () => document.querySelectorAll('a[data-plan]').forEach(a => {
    const n = a.dataset.plan;
    const msg = tr('pr.wa').replace('{plan}', tr('pr.p' + n)).replace('{price}', tr('pr.from') + ' ' + tr('pr.price' + n));
    a.href = 'https://wa.me/5491125237915?text=' + encodeURIComponent(msg);
  });
  document.addEventListener('langchange', setWa);

  /* ---------- laboratorio desplegable ---------- */
  const initLab = () => {
    const btn = document.getElementById('labx-toggle'), body = document.getElementById('labx-body');
    if (!btn || !body) return;
    const set = open => {
      btn.setAttribute('aria-expanded', String(open));
      btn.parentElement.classList.toggle('is-open', open);
      if (open) body.removeAttribute('inert'); else body.setAttribute('inert', '');
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    if (/^#proyecto-/.test(location.hash) || location.hash === '#laboratorio') set(true);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { build(); initLab(); setWa(); }); else { build(); initLab(); setWa(); }
})();
