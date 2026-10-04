/* Mascota + chat de preguntas rápidas con respuestas automáticas.
   Para editar preguntas o respuestas, tocá CHAT más abajo. */
(() => {
  const WA = 'https://wa.me/5491125237915?text=';
  const CHAT = {
    es: {
      name: 'Alejo · bot', status: 'Respuestas automáticas', bubble: '¡Hola! ¿Te ayudo?',
      open: 'Abrir chat', close: 'Cerrar chat', soundOn: 'Activar sonido', soundOff: 'Silenciar',
      hello: ['¡Hola! Soy la versión automática de Alejo.', 'Tocá una pregunta y te respondo al toque.'],
      more: '¿Algo más?', waText: 'Hola Alejo, vengo de tu web y quiero consultarte por un proyecto.',
      projects: 'Ver proyectos', talk: 'Hablar con Alejo', moreQ: 'Más preguntas', lessQ: 'Ver menos',
      qs: [
        { id: 'precio', q: '¿Cuánto cuesta una web?', a: ['Depende de lo que necesite tu negocio: no es lo mismo una landing que una tienda online.', 'Cada web es a medida, así que te paso un presupuesto cerrado después de charlar unos minutos.'], act: { t: 'Pedir presupuesto', wa: true } },
        { id: 'tiempo', q: '¿Cuánto tarda?', a: ['Una landing suele estar lista en 1 o 2 semanas, y una web completa en 3 a 5, según el contenido.', 'Siempre te muestro avances antes de publicar.'] },
        { id: 'incluye', q: '¿Qué incluye?', a: ['Diseño a medida, desarrollo, versión para celular, animaciones y la puesta online.', 'También te ayudo con el dominio y el hosting.'] },
        { id: 'tienda', q: '¿Hacés tiendas online?', a: ['Sí. Armo e-commerce con pagos y gestión de productos.', 'Por ejemplo, PURAA vende cosmética natural y cursos online.'], act: { t: 'Ver PURAA', project: 'puraa' } },
        { id: 'brasil', q: '¿Trabajás con Brasil?', a: ['¡Sí! Hice proyectos para marcas de Salvador y Maceió.', 'Hablamos por escrito, en español o en portugués, como te quede más cómodo.'] },
        { id: 'mant', q: '¿Mantenés la web después?', a: ['Sí. Me puedo encargar de cambios, mejoras y actualizaciones una vez que la web está online.'] },
        { id: 'empezar', q: '¿Cómo empezamos?', a: ['Escribime por WhatsApp contándome qué hace tu negocio y qué necesitás.', 'Te respondo y armamos el plan juntos.'], act: { t: 'Escribir por WhatsApp', wa: true } }
      ]
    },
    pt: {
      name: 'Alejo · bot', status: 'Respostas automáticas', bubble: 'Oi! Posso ajudar?',
      open: 'Abrir chat', close: 'Fechar chat', soundOn: 'Ativar som', soundOff: 'Silenciar',
      hello: ['Oi! Sou a versão automática do Alejo.', 'Toque em uma pergunta e eu respondo na hora.'],
      more: 'Mais alguma coisa?', waText: 'Oi Alejo, vim do seu site e quero falar sobre um projeto.',
      projects: 'Ver projetos', talk: 'Falar com o Alejo', moreQ: 'Mais perguntas', lessQ: 'Ver menos',
      qs: [
        { id: 'precio', q: 'Quanto custa um site?', a: ['Depende do que o seu negócio precisa: uma landing page não é a mesma coisa que uma loja online.', 'Cada site é sob medida, então eu passo um orçamento fechado depois de conversarmos alguns minutos.'], act: { t: 'Pedir orçamento', wa: true } },
        { id: 'tiempo', q: 'Quanto tempo leva?', a: ['Uma landing page costuma ficar pronta em 1 ou 2 semanas, e um site completo em 3 a 5, dependendo do conteúdo.', 'Sempre mostro o andamento antes de publicar.'] },
        { id: 'incluye', q: 'O que está incluído?', a: ['Design sob medida, desenvolvimento, versão para celular, animações e publicação.', 'Também ajudo com o domínio e a hospedagem.'] },
        { id: 'tienda', q: 'Você faz lojas online?', a: ['Sim. Crio e-commerce com pagamentos e gestão de produtos.', 'Por exemplo, a PURAA vende cosmética natural e cursos online.'], act: { t: 'Ver PURAA', project: 'puraa' } },
        { id: 'brasil', q: 'Você trabalha com o Brasil?', a: ['Sim! Fiz projetos para marcas de Salvador e Maceió.', 'A gente conversa por escrito, em português ou espanhol, como for melhor para você.'] },
        { id: 'mant', q: 'Você cuida do site depois?', a: ['Sim. Posso cuidar de alterações, melhorias e atualizações depois que o site estiver no ar.'] },
        { id: 'empezar', q: 'Como começamos?', a: ['Me mande uma mensagem no WhatsApp contando o que o seu negócio faz e do que você precisa.', 'Eu respondo e montamos o plano juntos.'], act: { t: 'Escrever no WhatsApp', wa: true } }
      ]
    },
    en: {
      name: 'Alejo · bot', status: 'Automatic replies', bubble: 'Hi! Can I help?',
      open: 'Open chat', close: 'Close chat', soundOn: 'Turn sound on', soundOff: 'Mute',
      hello: ["Hi! I'm Alejo's automatic sidekick.", "Tap a question and I'll answer right away."],
      more: 'Anything else?', waText: "Hi Alejo, I found your website and I'd like to talk about a project.",
      projects: 'See projects', talk: 'Talk to Alejo', moreQ: 'More questions', lessQ: 'Show less',
      qs: [
        { id: 'precio', q: 'How much does a website cost?', a: ['It depends on what your business needs: a landing page is not the same as an online store.', 'Every site is custom, so I send you a fixed quote after a quick chat.'], act: { t: 'Ask for a quote', wa: true } },
        { id: 'tiempo', q: 'How long does it take?', a: ['A landing page is usually ready in 1 to 2 weeks, and a full website in 3 to 5, depending on the content.', 'I always show you progress before launch.'] },
        { id: 'incluye', q: "What's included?", a: ['Custom design, development, mobile version, animations and launch.', 'I also help you with the domain and hosting.'] },
        { id: 'tienda', q: 'Do you build online stores?', a: ['Yes. I build e-commerce sites with payments and product management.', 'For example, PURAA sells natural cosmetics and online courses.'], act: { t: 'See PURAA', project: 'puraa' } },
        { id: 'brasil', q: 'Do you work with Brazil?', a: ['Yes! I have built projects for brands in Salvador and Maceió.', 'We talk in writing, in Spanish or Portuguese, whatever works best for you.'] },
        { id: 'mant', q: 'Do you maintain the site afterwards?', a: ['Yes. I can take care of changes, improvements and updates once the site is live.'] },
        { id: 'empezar', q: 'How do we start?', a: ['Message me on WhatsApp telling me what your business does and what you need.', "I'll reply and we'll plan it together."], act: { t: 'Message on WhatsApp', wa: true } }
      ]
    }
  };

  const $ = s => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const lang = () => (CHAT[window.siteLang] ? window.siteLang : 'es');
  const C = () => CHAT[lang()];
  const waURL = () => WA + encodeURIComponent(C().waText);

  /* ---------- sonido (Web Audio, sin archivos) ---------- */
  let ctx = null, muted = store.get('chat-muted') === '1';
  function tone(freqs, dur = 0.09, gap = 0.07, vol = 0.07) {
    if (muted) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      freqs.forEach((f, i) => {
        const t0 = ctx.currentTime + i * gap;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, t0);
        o.frequency.exponentialRampToValueAtTime(f * 1.25, t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(ctx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      });
    } catch (e) {}
  }
  const sOpen = () => tone([520, 780]);
  const sPop = () => tone([880], 0.08, 0, 0.06);
  const sSend = () => tone([660], 0.06, 0, 0.045);

  /* ---------- markup ---------- */
  const sticker = 'img/sticker.webp';
  document.body.insertAdjacentHTML('beforeend', `
    <div class="pet" id="pet">
      <div class="pet__bubble" id="pet-bubble" hidden><span id="pet-bubble-text"></span><button type="button" id="pet-bubble-x" aria-label="×">×</button></div>
      <button type="button" class="pet__btn" id="pet-btn" aria-expanded="false" aria-controls="chat">
        <img src="${sticker}" alt="" width="420" height="420"><span class="pet__dot" aria-hidden="true"></span>
      </button>
    </div>
    <section class="chat" id="chat" role="dialog" aria-labelledby="chat-name" hidden>
      <header class="chat__head">
        <img src="${sticker}" alt="" width="420" height="420">
        <div class="chat__who"><b id="chat-name"></b><span><i aria-hidden="true"></i><span id="chat-status"></span></span></div>
        <button type="button" class="chat__icon" id="chat-sound"></button>
        <button type="button" class="chat__icon" id="chat-x"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </header>
      <div class="chat__log" id="chat-log" aria-live="polite"></div>
      <div class="chat__quick" id="chat-quick"></div>
    </section>`);

  const pet = $('#pet'), btn = $('#pet-btn'), chat = $('#chat'), log = $('#chat-log'), quick = $('#chat-quick');
  const bubble = $('#pet-bubble');
  let started = false, busy = false, asked = new Set(), open = false;

  const icoOn = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
  const icoOff = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';

  function labels() {
    const c = C();
    $('#chat-name').textContent = c.name;
    $('#chat-status').textContent = c.status;
    $('#pet-bubble-text').textContent = c.bubble;
    btn.setAttribute('aria-label', open ? c.close : c.open);
    $('#chat-x').setAttribute('aria-label', c.close);
    const s = $('#chat-sound');
    s.innerHTML = muted ? icoOff : icoOn;
    s.setAttribute('aria-label', muted ? c.soundOn : c.soundOff);
    s.setAttribute('aria-pressed', String(!muted));
  }

  /* el log queda siempre pegado al final mientras la persona no haya subido a leer */
  let pinned = true;
  const scrollDown = (smooth) => {
    pinned = true;
    requestAnimationFrame(() => log.scrollTo({ top: log.scrollHeight, behavior: smooth && !reduce ? 'smooth' : 'auto' }));
  };
  log.addEventListener('scroll', () => { pinned = log.scrollHeight - log.scrollTop - log.clientHeight < 48; }, { passive: true });
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => { if (pinned) log.scrollTop = log.scrollHeight; });
    ro.observe(log); ro.observe(quick);
  }

  function addMsg(text, who, act) {
    const m = document.createElement('div');
    m.className = 'msg msg--' + who;
    m.textContent = text;
    if (act) {
      const a = document.createElement(act.wa ? 'a' : 'button');
      a.className = 'msg__act';
      a.textContent = act.t + ' →';
      if (act.wa) { a.href = waURL(); a.target = '_blank'; a.rel = 'noopener'; }
      else { a.type = 'button'; a.addEventListener('click', () => { closeChat(); window.openProject && window.openProject(act.project); }); }
      m.appendChild(a);
    }
    log.appendChild(m);
    scrollDown(true);
    setTimeout(() => { if (pinned) log.scrollTop = log.scrollHeight; }, 450);
  }

  function typing() {
    const t = document.createElement('div');
    t.className = 'msg msg--bot msg--typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(t); scrollDown();
    return t;
  }

  async function botSay(lines, act) {
    for (let i = 0; i < lines.length; i++) {
      const t = typing();
      await new Promise(r => setTimeout(r, reduce ? 150 : Math.min(450 + lines[i].length * 14, 1500)));
      t.remove();
      addMsg(lines[i], 'bot', i === lines.length - 1 ? act : null);
      sPop();
    }
  }

  let expanded = false;
  const VISIBLE = 3;
  function renderQuick() {
    const c = C();
    quick.innerHTML = '';
    if (busy) return;
    const left = c.qs.filter(q => !asked.has(q.id));
    const shown = expanded ? left : left.slice(0, VISIBLE);
    const wrap = document.createElement('div'); wrap.className = 'chat__qs';
    shown.forEach((q, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'qr'; b.textContent = q.q; b.style.animationDelay = (i * 40) + 'ms';
      b.addEventListener('click', () => ask(q.id));
      wrap.appendChild(b);
    });
    if (left.length > VISIBLE) {
      const m = document.createElement('button');
      m.type = 'button'; m.className = 'qr qr--more'; m.setAttribute('aria-expanded', String(expanded));
      m.innerHTML = expanded ? `${c.lessQ} <span aria-hidden="true">↑</span>` : `${c.moreQ} <b>+${left.length - VISIBLE}</b>`;
      m.addEventListener('click', () => { expanded = !expanded; renderQuick(); });
      wrap.appendChild(m);
    }
    quick.appendChild(wrap);
    const foot = document.createElement('div'); foot.className = 'chat__foot';
    const w = document.createElement('a');
    w.className = 'qr qr--wa'; w.textContent = c.talk; w.href = waURL(); w.target = '_blank'; w.rel = 'noopener';
    const p = document.createElement('button');
    p.type = 'button'; p.className = 'qr qr--ghost'; p.textContent = c.projects;
    p.addEventListener('click', () => { closeChat(); document.getElementById('proyectos').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });
    foot.append(w, p);
    quick.appendChild(foot);
  }

  async function ask(id) {
    if (busy) return;
    const q = C().qs.find(x => x.id === id); if (!q) return;
    busy = true; expanded = false; asked.add(id); renderQuick();
    addMsg(q.q, 'me'); sSend();
    await new Promise(r => setTimeout(r, 250));
    await botSay(q.a, q.act);
    busy = false; renderQuick();
  }

  async function openChat() {
    open = true;
    chat.hidden = false; bubble.hidden = true;
    requestAnimationFrame(() => document.body.classList.add('chat-open'));
    btn.setAttribute('aria-expanded', 'true'); labels(); sOpen();
    pet.classList.remove('has-dot');
    if (!started) {
      started = true; busy = true; renderQuick();
      await botSay(C().hello);
      busy = false; renderQuick();
    }
    setTimeout(() => { const f = quick.querySelector('.qr'); f && f.focus({ preventScroll: true }); }, 300);
  }

  function closeChat() {
    if (!open) return;
    open = false;
    document.body.classList.remove('chat-open');
    btn.setAttribute('aria-expanded', 'false'); labels();
    setTimeout(() => { if (!open) chat.hidden = true; }, reduce ? 0 : 380);
  }

  btn.addEventListener('click', () => (open ? closeChat() : openChat()));
  $('#chat-x').addEventListener('click', () => { closeChat(); btn.focus(); });
  $('#chat-sound').addEventListener('click', () => { muted = !muted; store.set('chat-muted', muted ? '1' : '0'); labels(); if (!muted) sPop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) { closeChat(); btn.focus(); } });
  $('#pet-bubble-x').addEventListener('click', () => { bubble.hidden = true; });
  document.addEventListener('langchange', () => { labels(); renderQuick(); });

  /* la mascota aparece con el primer scroll; saluda una vez por visita */
  labels();
  let greeted = false; try { greeted = sessionStorage.getItem('pet-greeted') === '1'; } catch (e) {}
  const showPet = () => {
    if (scrollY < 40 || pet.classList.contains('is-visible')) return;
    removeEventListener('scroll', showPet);
    pet.classList.add('is-visible');
    if (greeted) return;
    setTimeout(() => {
      if (open) return;
      bubble.hidden = false; pet.classList.add('is-waving');
      try { sessionStorage.setItem('pet-greeted', '1'); } catch (e) {}
      setTimeout(() => { bubble.hidden = true; pet.classList.remove('is-waving'); }, 6000);
    }, 1200);
  };
  addEventListener('scroll', showPet, { passive: true });
  showPet();
  if (!reduce) setInterval(() => { if (!open) { pet.classList.add('is-waving'); setTimeout(() => pet.classList.remove('is-waving'), 1400); } }, 12000);
})();
