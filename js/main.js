(() => {
  const P = window.PROJECTS, T = window.I18N;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) document.documentElement.classList.add('touch');
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- idioma ---------- */
  const qsLang = new URLSearchParams(location.search).get('lang');
  const navLang = (navigator.language || 'es').slice(0, 2);
  let lang = [qsLang, store.get('lang'), navLang].find(l => l && T[l]) || 'es';
  const t = k => (T[lang] && T[lang][k]) || T.es[k] || k;
  const L = o => (o && (o[lang] || o.es)) || '';
  const statusText = p => p.status.map(s => t('st.' + s)).join(' · ');

  /* ---------- render ---------- */
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function tileHTML(p) {
    const mono = p.mono || p.logo;
    return `<button type="button" class="tile${p.group === 'featured' ? ' tile--wide' : ''} reveal" data-id="${p.id}" style="--brand:${p.brand}" data-ink="${p.ink}">
      <span class="tile__fill" aria-hidden="true"></span>
      <span class="tile__top"><span class="tile__kind">${p.group === 'featured' ? t('tile.featured') : L(p.kind)}</span><span class="tile__status">${statusText(p)}</span></span>
      <span class="tile__logos${p.round ? ' is-round' : ''}" aria-hidden="true">
        <img class="tile__logo tile__logo--mono" src="${mono}" alt="" loading="lazy">
        <img class="tile__logo tile__logo--color" src="${p.logo}" alt="" loading="lazy">
      </span>
      <span class="tile__name">${p.name}</span>
      <span class="tile__cta"><span>${t('tile.view')}</span>${arrow}</span>
    </button>`;
  }

  function rowHTML(p) {
    const logo = p.logo
      ? `<img src="${p.logo}" alt="" loading="lazy">`
      : `<span class="row__textlogo">${p.name}</span>`;
    return `<li class="reveal"><button type="button" class="row" data-id="${p.id}">
      <span class="row__logo" aria-hidden="true">${logo}</span>
      <span class="row__name">${p.name}${p.highlight ? `<em>${t('row.highlight')}</em>` : ''}</span>
      <span class="row__kind">${L(p.kind)}</span>
      <span class="row__status">${statusText(p)}</span>
      <span class="row__arrow">${arrow}</span>
    </button></li>`;
  }

  function ribbonHTML() {
    const items = (window.RIBBON || []).map(id => P.find(p => p.id === id)).filter(p => p && p.logo);
    const one = (p, dup) => `<button type="button" class="ribbon__item" data-id="${p.id}" ${dup ? 'aria-hidden="true" tabindex="-1"' : `aria-label="${p.name}"`}><img src="${p.ribbon || p.mono || p.logo}" alt="" loading="lazy"></button>`;
    return items.map(p => one(p)).join('') + items.map(p => one(p, true)).join('');
  }

  function render() {
    const wall = P.filter(p => p.group === 'featured' || p.group === 'new');
    const clients = P.filter(p => p.group === 'client');
    const lab = P.filter(p => p.group === 'lab');
    $('#wall').innerHTML = wall.map(tileHTML).join('');
    $('#clients').innerHTML = clients.map(rowHTML).join('');
    $('#lab').innerHTML = lab.map(rowHTML).join('');
    const rib = $('#ribbon');
    if (rib && !rib.children.length) {
      rib.innerHTML = ribbonHTML();
      $$('.ribbon__item img', rib).forEach(img => {
        const tag = () => { const r = img.naturalWidth / (img.naturalHeight || 1); const it = img.parentElement; it.classList.toggle('is-square', r < 1.3); it.classList.toggle('is-tall', r >= 1.3 && r < 2.2); };
        img.complete ? tag() : img.addEventListener('load', tag);
      });
      $$('.ribbon__item', rib).forEach(b => b.addEventListener('click', () => openPanel(b.dataset.id, b)));
    }
    const rw = $('#ribbon-wrap'); if (rw) rw.setAttribute('aria-label', t('hero.ribbon'));
    $('#proj-count').textContent = wall.length;
    $('#cli-count').textContent = clients.length;
    $('#lab-count').textContent = lab.length;
    const posts = $('#posts');
    if (posts) posts.innerHTML = (window.POSTS || []).map(po => `<a class="post" href="${po.url}" target="_blank" rel="noopener" style="--brand:${po.brand || '#1a1a1e'}" aria-label="${t('social.post')}">${po.img ? `<img class="post__img" src="${po.img}" alt="" loading="lazy">` : `<img class="post__logo" src="${po.logo}" alt="" loading="lazy">`}<span class="post__ig" aria-hidden="true"></span></a>`).join('');
    bindTiles();
    observeReveals();
  }

  function applyLang(next, animate) {
    lang = next;
    window.siteLang = lang;
    document.dispatchEvent(new CustomEvent('langchange'));
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    const swap = () => {
      $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
      $$('[data-i18n-lines]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nLines).split('|')
          .map((ln, i) => `<span class="line"><span style="--i:${i}">${ln}</span></span>`).join(' ');
      });
      render();
      if (typeof giant !== 'undefined' && giant) fitGiant();
      if (current) fillPanel(current);
    };
    if (animate && !reduce) {
      document.body.classList.add('is-swapping');
      setTimeout(() => { swap(); document.body.classList.remove('is-swapping'); }, 220);
    } else swap();
  }

  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    store.set('lang', b.dataset.lang);
    applyLang(b.dataset.lang, true);
  }));

  /* ---------- tiles: relleno desde el cursor ---------- */
  function bindTiles() {
    $$('.tile').forEach(tile => {
      const pos = e => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        tile.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      };
      tile.addEventListener('pointerenter', e => { if (e.pointerType !== 'mouse') return; pos(e); requestAnimationFrame(() => tile.classList.add('is-on')); });
      tile.addEventListener('pointerleave', e => { if (e.pointerType !== 'mouse') return; pos(e); tile.classList.remove('is-on'); });
      tile.addEventListener('click', () => openPanel(tile.dataset.id, tile));
    });
    $$('.row').forEach(row => row.addEventListener('click', () => openPanel(row.dataset.id, row)));
  }

  /* ---------- aparición al scrollear ---------- */
  let io;
  function observeReveals() {
    if (!('IntersectionObserver' in window) || reduce) { $$('.reveal').forEach(el => el.classList.add('is-in')); return; }
    io = io || new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    $$('.reveal:not(.is-in)').forEach((el, i) => {
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty('--d', Math.min(sib, 8) * 60 + 'ms');
      io.observe(el);
    });
  }

  /* ---------- panel lateral ---------- */
  const panel = $('#panel'), scrim = $('#scrim');
  let current = null, opener = null;
  const order = P.map(p => p.id);

  function fillPanel(id) {
    const p = P.find(x => x.id === id); if (!p) return;
    current = id;
    panel.style.setProperty('--brand', p.brand);
    panel.dataset.ink = p.ink;
    const logo = $('#panel-logo'), tl = $('#panel-textlogo');
    if (p.logo) { logo.src = p.logo; logo.alt = p.name; logo.hidden = false; logo.classList.toggle('is-round', !!p.round); tl.hidden = true; }
    else { logo.hidden = true; tl.textContent = p.name; tl.hidden = false; }
    $('#panel-eyebrow').textContent = [statusText(p), p.year].filter(Boolean).join(' · ');
    $('#panel-name').textContent = p.name;
    $('#panel-desc').textContent = L(p.desc);
    $('#panel-kind').textContent = L(p.kind);
    $('#panel-place').textContent = L(p.place);
    $('#panel-did').innerHTML = (L(p.did) || []).map(d => `<li>${d}</li>`).join('');
    $('#panel-stackwrap').hidden = !p.stack;
    $('#panel-stack').innerHTML = (p.stack || []).map(s => `<li>${s}</li>`).join('');
    const visit = $('#panel-visit');
    visit.hidden = !p.url; $('#panel-soon').hidden = !!p.url;
    if (p.url) visit.href = p.url;
    const i = order.indexOf(id);
    const prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    $('#panel-prev').dataset.id = prev.id; $('#panel-prev-name').textContent = prev.name;
    $('#panel-next').dataset.id = next.id; $('#panel-next-name').textContent = next.name;
    const body = $('.panel__body');
    body.classList.remove('is-in'); void body.offsetWidth; body.classList.add('is-in');
    body.scrollTop = 0;
    panel.scrollTop = 0; $('#panel-main').scrollTop = 0;
    setMedia(p);
  }

  function openPanel(id, from) {
    opener = from || document.activeElement;
    fillPanel(id);
    scrim.hidden = false; panel.hidden = false;
    requestAnimationFrame(() => { document.body.classList.add('panel-open'); });
    history.replaceState(null, '', '#proyecto-' + id);
    setTimeout(() => $('#panel-close').focus({ preventScroll: true }), reduce ? 0 : 120);
  }

  /* reel del proyecto (si tiene video): panel ancho con celular */
  const media = $('#panel-media'), video = $('#panel-video'), soundBtn = $('#panel-sound'), igLink = $('#panel-ig');
  const icoMuted = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
  const icoSound = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
  function soundUI() { soundBtn.innerHTML = video.muted ? icoMuted : icoSound; soundBtn.setAttribute('aria-label', t(video.muted ? 'panel.soundOn' : 'panel.soundOff')); }
  function setMedia(p) {
    const has = !!(p && p.video);
    panel.classList.toggle('has-video', has);
    media.hidden = !has;
    if (!has) { video.pause(); video.removeAttribute('src'); video.load(); return; }
    if (video.getAttribute('src') !== p.video) {
      video.muted = true;
      if (p.poster) video.poster = p.poster; else video.removeAttribute('poster');
      video.src = p.video;
    }
    igLink.hidden = !p.ig; if (p.ig) igLink.href = p.ig;
    soundUI();
    foldUI();
    if (folded && innerWidth >= 900) return;
    const pl = video.play(); if (pl && pl.catch) pl.catch(() => {});
  }
  /* esconder / mostrar el reel (queda recordado) */
  const fold = $('#panel-fold');
  let folded = store.get('reel-folded') === '1';
  function foldUI() {
    panel.classList.toggle('is-folded', folded);
    fold.setAttribute('aria-expanded', String(!folded));
    fold.setAttribute('aria-label', t(folded ? 'panel.showReel' : 'panel.hideReel'));
    if (panel.classList.contains('has-video') && innerWidth >= 900) { if (folded) video.pause(); else video.play().catch(() => {}); }
  }
  fold.addEventListener('click', () => { folded = !folded; store.set('reel-folded', folded ? '1' : '0'); foldUI(); });

  soundBtn.addEventListener('click', () => { video.muted = !video.muted; soundUI(); if (video.paused) video.play().catch(() => {}); });

  function closePanel() {
    if (!current) return;
    document.body.classList.remove('panel-open');
    current = null;
    history.replaceState(null, '', location.pathname + location.search);
    video.pause();
    setTimeout(() => { panel.hidden = true; scrim.hidden = true; setMedia(null); }, reduce ? 0 : 520);
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  }

  window.openProject = id => openPanel(id);
  $('#panel-close').addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);
  $('#panel-prev').addEventListener('click', e => fillPanel(e.currentTarget.dataset.id));
  $('#panel-next').addEventListener('click', e => fillPanel(e.currentTarget.dataset.id));
  document.addEventListener('keydown', e => {
    if (!current) return;
    if (e.key === 'Escape') closePanel();
    if (e.key === 'ArrowRight') $('#panel-next').click();
    if (e.key === 'ArrowLeft') $('#panel-prev').click();
    if (e.key === 'Tab') {
      const f = $$('button, a[href]', panel).filter(el => !el.hidden && el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- hero: ALEJO a todo el ancho + parallax ---------- */
  const giant = $('.hero__giant'), giantIn = $('.hero__giant-in'), heroPhoto = $('.hero__photo');
  const mobileHero = matchMedia('(max-width: 820px)');
  /* ALEJO ocupa todo el ancho, pero nunca baja hasta los textos del hero (pantallas bajas/anchas) */
  function fitGiant() {
    if (!giant) return;
    giant.style.fontSize = '100px';
    const box = giantIn.getBoundingClientRect();
    const target = innerWidth * (mobileHero.matches ? 0.96 : 0.94);
    let size = 100 * target / box.width;
    if (!mobileHero.matches) {
      const hero = giant.parentElement;
      const blocks = [$('.hero__left'), $('.hero__right')].filter(Boolean);
      const blocksTop = Math.min(...blocks.map(b => b.offsetTop));
      const avail = blocksTop - giant.offsetTop - 28;
      if (avail > 0) size = Math.min(size, 100 * avail / box.height);
    }
    giant.style.fontSize = Math.max(Math.min(size, 620), 60).toFixed(1) + 'px';
  }
  fitGiant();
  addEventListener('resize', fitGiant);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitGiant);
  let mouseX = 0, gx = 0;
  if (finePointer && !reduce) addEventListener('pointermove', e => { mouseX = (e.clientX / innerWidth - 0.5); }, { passive: true });
  (function heroLoop() {
    if (giant && scrollY < innerHeight * 1.2) {
      const target = reduce ? 0 : (-scrollY * 0.45 + mouseX * -40);
      gx += (target - gx) * 0.12;
      giant.style.setProperty('--gx', gx.toFixed(1) + 'px');
      if (!mobileHero.matches && !reduce) heroPhoto.style.setProperty('--py', (scrollY * 0.12).toFixed(1) + 'px');
    }
    requestAnimationFrame(heroLoop);
  })();

  /* ---------- header: se esconde al bajar ---------- */
  const hdr = $('#hdr'); let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    hdr.classList.toggle('is-scrolled', y > 10);
    hdr.classList.toggle('is-hidden', y > 300 && y > lastY && !current);
    lastY = y;
  }, { passive: true });

  /* ---------- botones magnéticos ---------- */
  if (finePointer && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- brillo del hero con los colores de las marcas ---------- */
  const glow = $('.hero__glow');
  const glowColors = ['#3b5bdb', '#B14F36', '#EE8FA4', '#144D22', '#1E3669', '#C8881F'];
  let gi = 0;
  if (glow && !reduce) setInterval(() => { glow.style.setProperty('--glow', glowColors[gi++ % glowColors.length]); }, 3800);

  /* ---------- copiar mail ---------- */
  $('#copy-mail').addEventListener('click', e => {
    const btn = e.currentTarget;
    const done = () => { btn.textContent = t('contact.copied'); btn.classList.add('is-done'); setTimeout(() => { btn.textContent = t('contact.copy'); btn.classList.remove('is-done'); }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText('fernandezmalejo@gmail.com').then(done).catch(() => {});
  });

  /* ---------- reloj de Buenos Aires ---------- */
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Argentina/Buenos_Aires' });
  const tick = () => { clock.textContent = fmt.format(new Date()) + ' GMT-3'; };
  tick(); setInterval(tick, 20000);

  /* ---------- inicio ---------- */
  applyLang(lang, false);
  const startHero = () => requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  if (document.documentElement.classList.contains('intro-on')) document.addEventListener('introdone', startHero, { once: true });
  else startHero();
  const m = location.hash.match(/^#proyecto-([\w-]+)/);
  if (m && P.some(p => p.id === m[1])) setTimeout(() => openPanel(m[1]), 400);
})();
