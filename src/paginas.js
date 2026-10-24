/* Páginas de servicio. Cada entrada devuelve { slug, title, desc, url, image, body, jsonld }.
   Para agregar otra (cafeterías, hamburgueserías, alojamientos…), copiá la de restaurantes y cambiá
   textos, proyectos y preguntas. Corré `node build.js` después. */
module.exports = ({ P, L, esc, attr, WA, exists, caseUrl, crumbs, breadcrumbLd, PERSON, arrowOut }) => {
  const byId = id => P.find(p => p.id === id);
  const proof = ids => `<ul class="svc__proof">${ids.map(byId).filter(Boolean).map(p => {
    const media = p.poster && exists(p.poster)
      ? `<img src="/${p.poster}" alt="Web de ${attr(p.name)} en celular" loading="lazy" width="720" height="900">`
      : `<div class="brand${p.round ? ' is-round' : ''}" style="--brand:${p.brand}" data-ink="${p.ink}">${p.logo ? `<img src="/${p.logo}" alt="" loading="lazy">` : `<span>${esc(p.name)}</span>`}</div>`;
    return `<li><a href="${caseUrl(p)}"><figure style="margin:0">${media}<figcaption>${esc(p.name)}<small>${esc(L(p.kind))} · ${esc(L(p.place))}</small></figcaption></figure></a></li>`;
  }).join('')}</ul>`;
  const faqHTML = qs => `<ul class="faq">${qs.map(([q, a]) => `<li><details><summary>${esc(q)}</summary><p>${a}</p></details></li>`).join('')}</ul>`;
  const faqLd = qs => ({ '@type': 'FAQPage', mainEntity: qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });
  const waT = s => `${WA}?text=${encodeURIComponent(s)}`;

  /* ---------------- Restaurantes ---------------- */
  const restoFaq = [
    ['¿Cuánto cuesta una página web para un restaurante?', 'Desde USD 390 una web con tu identidad, carta para mostrar y botón de WhatsApp. Desde USD 690 si querés que reciba reservas o pedidos con Mercado Pago. Es un solo pago, sin mensualidades: la web es tuya.'],
    ['¿Cuánto tarda?', 'Una web de presentación suele estar lista en 1 o 2 semanas. Con reservas, pedidos o carta editable, entre 3 y 5 semanas según el contenido. Seguís el avance en un link en vivo desde el primer día.'],
    ['¿Puedo cambiar la carta y los precios yo mismo?', 'Sí. En los planes Funcional y Completa tenés una carta editable: cambiás precios, platos y fotos desde un panel simple, sin tocar código ni depender de nadie.'],
    ['¿Sirve si ya tengo Instagram?', 'Instagram trae gente; la web la convierte. Cuando alguien busca en Google "restaurante en Devoto" o toca el link de tu bio, necesita ver la carta, la ubicación, los horarios y reservar en dos toques. Eso Instagram no lo hace.'],
    ['¿Qué pasa con las reservas y los pedidos?', 'Entran a un panel tuyo y te llega un aviso por WhatsApp o mail en cada reserva o pedido. Los pedidos se pueden cobrar con Mercado Pago, sin comisión por pedido como en las apps de delivery.'],
    ['¿Incluye dominio y hosting?', 'Te ayudo a registrar tu dominio (.com.ar o .com) y la web queda publicada. El hosting arranca gratis para negocios chicos.'],
    ['¿Trabajás con restaurantes de Brasil?', 'Sí. Hice demos para Maceió y Salvador. Trabajo por escrito, en español o portugués, como te quede más cómodo.']
  ];
  const restaurantes = {
    slug: 'diseno-web-restaurantes',
    url: '/diseno-web-restaurantes',
    title: 'Diseño web para restaurantes: carta, reservas y pedidos | Alejo Martín Fernández',
    desc: 'Páginas web a medida para restaurantes y casas de comida en Argentina y Brasil. Carta editable, reservas online y pedidos con Mercado Pago en una web con tu identidad. Un solo pago, desde USD 390.',
    image: 'video/maravela.jpg',
    body: `
  <div class="pg">
    ${crumbs([['Inicio', '/'], ['Servicios'], ['Diseño web para restaurantes']])}
    <div class="svc__hero">
      <div>
        <p class="pg__eyebrow">Diseño web · Restaurantes y casas de comida</p>
        <h1 class="pg__title">Páginas web para restaurantes que se ven como tu cocina</h1>
        <p class="pg__lead">Una web con <strong>tu identidad</strong>, la <strong>carta siempre actualizada</strong>, <strong>reservas</strong> y <strong>pedidos</strong> adentro. Sin plantillas, sin mensualidades: pagás una vez y es tuya.</p>
        <div class="caso__ctas">
          <a class="btn btn--light" href="${waT('Hola Alejo! Tengo un restaurante y quiero ver cómo podría ser su web.')}" target="_blank" rel="noopener">Contame de tu restaurante</a>
          <a class="btn btn--ghost" href="#ejemplos">Ver ejemplos</a>
        </div>
      </div>
      <div>${proof(['maravela'])}</div>
    </div>

    <h2>Lo que un cliente busca en 10 segundos</h2>
    <p>Alguien te encontró en Instagram o en Google Maps, está con el celular en la mano y quiere decidir. Si la web no responde rápido, se va al de al lado. Por eso cada sitio que hago para un restaurante resuelve esto arriba de todo:</p>
    <ul>
      <li><strong>La carta, con precios, legible en el celular</strong>, no un PDF que hay que hacer zoom.</li>
      <li><strong>Dónde estás, cuándo abrís y cómo llegar</strong>, con un toque a Maps.</li>
      <li><strong>Reservar o pedir</strong> sin salir de la web ni esperar a que alguien conteste el WhatsApp.</li>
      <li><strong>Fotos y tipografía de tu marca</strong>: que al entrar se sienta tu lugar, no una plantilla de restaurante genérico.</li>
    </ul>

    <h2 id="ejemplos">Webs de restaurantes que diseñé</h2>
    <p>Algunas son clientes y otras son demos que armé por iniciativa propia para negocios reales que me gustan. En cada caso vas a ver qué hice y cómo se ve en el celular.</p>
    ${proof(['maravela', 'bodega', 'pepe', 'alacena', 'lpr', 'meat'])}
    <p><a class="link-arrow" href="/proyectos">Ver todos los proyectos ${arrowOut}</a></p>

    <h2>Qué incluye, según lo que necesite tu restaurante</h2>
    <ul class="plans-inline">
      <li><small>Identidad</small><b>desde USD 390</b><p>Diseño a medida con tu marca, hasta 5 secciones, carta o menú para mostrar, botón de WhatsApp y publicación con tu dominio.</p></li>
      <li><small>Funcional · el más elegido</small><b>desde USD 690</b><p>Todo lo anterior más reservas online o pedidos con carrito y Mercado Pago, panel para ver lo que entra y aviso en cada reserva o pedido.</p></li>
      <li><small>Completa</small><b>desde USD 990</b><p>Reservas y pedidos, carta editable para cambiar precios vos, panel de administración propio y carga de hasta 40 productos.</p></li>
    </ul>
    <p style="color:var(--muted);font-size:14px">Un solo pago. Hoy un restaurante suele pagar aparte una tienda online, un sistema de reservas y una carta QR, todos los meses. Acá las tres cosas viven en tu propio sitio, sin comisiones por pedido. <a class="inl" href="/#precios">Ver el detalle de los planes</a>.</p>

    <h2>Cómo trabajamos</h2>
    <ol class="steps">
      <li><b>Charlamos</b><span>Me contás qué querés, qué no, y cómo es tu marca. Por WhatsApp o por escrito, como prefieras.</span></li>
      <li><b>Propuesta</b><span>Alcance, etapas por semana y precio, por escrito, antes de empezar.</span></li>
      <li><b>Diseño y desarrollo</b><span>Seguís el avance en un link en vivo. Primero la versión para celular.</span></li>
      <li><b>Prueba y entrega</b><span>Una semana de prueba con tu equipo y la web queda online con tu dominio.</span></li>
    </ol>

    <h2>Preguntas frecuentes</h2>
    ${faqHTML(restoFaq)}

    <section class="cta-band">
      <h2>¿Querés ver cómo se vería la web de tu restaurante?</h2>
      <p>Mandame el Instagram de tu local y te respondo con ideas concretas. Sin compromiso.</p>
      <a class="btn btn--light" href="${waT('Hola Alejo! Tengo un restaurante y quiero ver cómo podría ser su web.')}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn btn--ghost" href="mailto:fernandezmalejo@gmail.com">Mail</a>
    </section>
  </div>`,
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Diseño web para restaurantes',
          serviceType: 'Diseño y desarrollo de sitios web para restaurantes',
          description: 'Páginas web a medida para restaurantes: carta editable, reservas online y pedidos con Mercado Pago en una web con identidad propia. Un solo pago.',
          provider: PERSON,
          areaServed: [{ '@type': 'Country', name: 'Argentina' }, { '@type': 'Country', name: 'Brasil' }],
          url: 'https://alejomfernandez.com.ar/diseno-web-restaurantes',
          offers: [
            { '@type': 'Offer', name: 'Identidad', price: '390', priceCurrency: 'USD' },
            { '@type': 'Offer', name: 'Funcional', price: '690', priceCurrency: 'USD' },
            { '@type': 'Offer', name: 'Completa', price: '990', priceCurrency: 'USD' }
          ]
        },
        faqLd(restoFaq),
        breadcrumbLd([['Inicio', '/'], ['Diseño web para restaurantes', '/diseno-web-restaurantes']])
      ]
    }
  };

  return [restaurantes];
};
