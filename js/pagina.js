/* Subpáginas (/proyectos, casos, servicios): mismas micro-animaciones que la home. */
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.documentElement.classList.add('js');
  if (!fine) document.documentElement.classList.add('touch');

  /* aparición al scrollear (igual que en la home) */
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduce) els.forEach(el => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(el => {
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty('--d', Math.min(sib, 8) * 70 + 'ms');
      io.observe(el);
    });
  }
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));

  /* botones magnéticos */
  if (fine && !reduce) $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  /* el celular acompaña el scroll (parallax suave) */
  const ph = document.querySelector('.caso__hero .phone');
  if (ph && fine && !reduce) {
    let y = 0, cur = 0;
    const loop = () => { y = Math.min(scrollY, 700) * 0.08; cur += (y - cur) * 0.1; ph.style.transform = `translateY(${cur.toFixed(1)}px) rotate(${(cur * 0.01).toFixed(2)}deg)`; requestAnimationFrame(loop); };
    loop();
  }

  /* header: se esconde al bajar */
  const hdr = document.getElementById('hdr'); let lastY = scrollY;
  addEventListener('scroll', () => { const y = scrollY; hdr.classList.toggle('is-hidden', y > 300 && y > lastY); lastY = y; }, { passive: true });

  /* reloj */
  const c = document.getElementById('clock');
  if (c) { const f = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Argentina/Buenos_Aires' }); const k = () => { c.textContent = f.format(new Date()) + ' GMT-3'; }; k(); setInterval(k, 20000); }

  /* videos: arrancar silenciados; tocar para sonido */
  $$('video[autoplay]').forEach(v => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
  $$('.phone__sound').forEach(b => {
    const v = b.closest('.caso__phonewrap, .caso__hero, body').querySelector('video');
    const on = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
    const off = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
    const ui = () => { b.innerHTML = v.muted ? off : on; b.setAttribute('aria-label', v.muted ? 'Activar sonido' : 'Silenciar'); };
    ui(); b.addEventListener('click', () => { v.muted = !v.muted; ui(); if (v.paused) v.play().catch(() => {}); });
  });
})();
