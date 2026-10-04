/* Escena de entrada "Tres notas": el AF toca sus tres teclas y vuela al header.
   Se muestra una vez por sesión; un clic, tecla o scroll la saltea. */
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('intro-on')) return;
  const intro = document.getElementById('intro');
  const af = intro.querySelector('.intro__af');
  const target = document.querySelector('.hdr__af');
  const keys = [...af.querySelectorAll('.af__wk .k')];
  const timers = [];
  const anims = [];
  let done = false, flown = false;
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const ease = 'cubic-bezier(.22,1,.36,1)', io = 'cubic-bezier(.76,0,.24,1)';
  try { sessionStorage.setItem('intro-seen', '1'); } catch (e) {}

  const skip = document.createElement('span');
  skip.className = 'intro__skip';
  skip.textContent = ({ es: 'Tocá para saltar', pt: 'Toque para pular', en: 'Tap to skip' })[window.siteLang] || 'Tocá para saltar';
  intro.appendChild(skip);

  /* tamaño y posición inicial: centrado */
  const W = Math.min(280, innerWidth * 0.46);
  const H = W * 230 / 300;
  const x0 = (innerWidth - W) / 2, y0 = (innerHeight - H) / 2;
  Object.assign(af.style, { width: W + 'px', left: x0 + 'px', top: y0 + 'px' });

  const play = (el, kf, o) => { const a = el.animate(kf, { fill: 'forwards', easing: ease, ...o }); anims.push(a); return a; };

  function ring(i) {
    const r = document.createElement('span');
    r.className = 'intro__ring';
    r.style.left = (x0 + (168 + i * 24) * W / 300) + 'px';
    r.style.top = (y0 + 236 * W / 300) + 'px';
    intro.appendChild(r);
    play(r, [{ opacity: .55, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(5.5)' }], { duration: 950 }).finished.then(() => r.remove()).catch(() => {});
  }
  const press = (k, ms = 200) => { k.classList.add('on'); later(() => k.classList.remove('on'), ms); };

  function fly(duration) {
    if (flown) return; flown = true;
    const t = target.getBoundingClientRect();
    const s = t.width / W;
    play(af, [{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${t.left - x0}px, ${t.top - y0}px) scale(${s})` }], { duration, easing: io });
    play(intro, [{ backgroundColor: getComputedStyle(intro).backgroundColor }, { backgroundColor: 'transparent' }], { duration: duration * 0.85, delay: duration * 0.2 });
    skip.remove();
    later(() => document.dispatchEvent(new CustomEvent('introdone')), duration * 0.28);
    later(finish, duration + 40);
  }

  function finish() {
    if (done) return; done = true;
    timers.forEach(clearTimeout);
    root.classList.remove('intro-on');
    intro.remove();
    document.dispatchEvent(new CustomEvent('introdone'));
    removeEventListener('keydown', onSkip); removeEventListener('wheel', onSkip); removeEventListener('touchmove', onSkip);
  }

  /* saltar: vuela rápido */
  function onSkip() { if (!flown) { timers.forEach(clearTimeout); keys.forEach(k => k.classList.remove('on')); fly(550); } }
  intro.addEventListener('click', onSkip);
  addEventListener('keydown', onSkip);
  addEventListener('wheel', onSkip, { passive: true });
  addEventListener('touchmove', onSkip, { passive: true });

  /* línea de tiempo */
  play(af, [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 700 });
  keys.forEach((k, i) => later(() => { ring(i); press(k); }, 800 + i * 230));
  later(() => { keys.forEach(k => press(k, 170)); }, 1560);
  later(() => fly(900), 1780);
  /* red de seguridad */
  later(finish, 4500);
})();
