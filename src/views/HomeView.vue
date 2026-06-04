<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import personal from '../data/personal.json'
import Footer from '../components/Footer.vue'
import FranzaCover     from '../components/covers/FranzaCover.vue'
import ArianaCover     from '../components/covers/ArianaCover.vue'
import GoaldemyCover   from '../components/covers/GoaldemyCover.vue'
import PatagoniaCover  from '../components/covers/PatagoniaCover.vue'
import InkmanagerCover from '../components/covers/InkmanagerCover.vue'
import PuraaCover      from '../components/covers/PuraaCover.vue'
import PolyfuseCover   from '../components/covers/PolyfuseCover.vue'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const { l } = useLocalized()

const sortedProjects = computed(() =>
  [...projects].sort((a, b) => a.orden - b.orden)
)
const featuredProjects = computed(() =>
  sortedProjects.value.filter(p => p.destacado)
)

const formatYear = (d) => d ? String(d).slice(0, 4) : ''

const stats = [
  { number: projects.length + '+', label: { es: 'proyectos',           en: 'projects',           pt: 'projetos' } },
  { number: '3+',                  label: { es: 'años de experiencia', en: 'years of experience', pt: 'anos de experiência' } },
  { number: '16+',                 label: { es: 'tecnologías',         en: 'technologies',       pt: 'tecnologias' } },
]

// ── Code Rain columns ──
// Characters doubled so translateY(-50% → 0) loops seamlessly downward
const charset = '{}()[];=<>!*/01_:.@#$&|~'.split('')
const rainCols = Array.from({ length: 24 }, (_, i) => {
  const half = Array.from({ length: 72 }, (_, j) =>
    charset[(i * 11 + j * 7) % charset.length]
  )
  return {
    id: i,
    content: [...half, ...half].join('\n'),
    style: {
      left:              `${((i + 0.5) / 24) * 100}%`,
      animationDuration: `${12 + (i % 9) * 1.8}s`,
      animationDelay:    `-${((i * 2.3) % 16).toFixed(1)}s`,
      opacity:           (0.032 + (i % 8) * 0.011).toFixed(3),
    },
  }
})

// ── Name typewriter ──
const nameLine1    = ref('')
const nameLine2    = ref('')
const cursorLine   = ref(0)   // 1 = on line 1 | 2 = on line 2 | 0 = hidden
const nameComplete = ref(false)
const heroRef      = ref(null)
const nameTimers   = []

const FULL1   = 'ALEJO M.'
const FULL2   = 'FERNANDEZ'
const CHAR_MS = 82

const typeName = () => {
  let t = 260
  cursorLine.value = 1

  for (let i = 1; i <= FULL1.length; i++) {
    const idx = i
    nameTimers.push(setTimeout(() => { nameLine1.value = FULL1.slice(0, idx) }, t))
    t += CHAR_MS
  }

  t += 230
  nameTimers.push(setTimeout(() => { cursorLine.value = 2 }, t))

  for (let i = 1; i <= FULL2.length; i++) {
    const idx = i
    nameTimers.push(setTimeout(() => { nameLine2.value = FULL2.slice(0, idx) }, t))
    t += CHAR_MS
  }

  t += 460
  nameTimers.push(setTimeout(() => {
    cursorLine.value = 0
    nameComplete.value = true
    gsap.to('.h-role', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
  }, t))
}

// ── Sticker peek mechanic ──
let peekY    = 0
let wiggleTl = null

const onHeroEnter = () => {
  if (window.matchMedia('(hover: none)').matches) return
  gsap.to('.h-sticker-outer', { y: 0, duration: 0.85, ease: 'back.out(1.3)' })
}

const onHeroLeave = () => {
  if (window.matchMedia('(hover: none)').matches) return
  gsap.to('.h-sticker-outer', { y: peekY, duration: 1.0, ease: 'elastic.out(1, 0.3)' })
}

onMounted(() => {
  const isTouch = window.matchMedia('(hover: none)').matches

  if (!isTouch) {
    // Compute peek offset: push sticker mostly below fold, leave ~185px head visible
    const stickerH = Math.min(window.innerHeight * 0.68, 620)
    peekY = stickerH - 185
    gsap.set('.h-sticker-outer', { y: peekY })

    // Continuous mischievous wiggle loop
    wiggleTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5, delay: 2.8 })
      .to('.h-sticker-wiggle', { x: -9, rotation: -4, duration: 0.15, ease: 'power2.in' })
      .to('.h-sticker-wiggle', { x: 10, rotation:  5, duration: 0.20, ease: 'power2.out' })
      .to('.h-sticker-wiggle', { x: -6, rotation: -2.5, duration: 0.12, ease: 'power2.in' })
      .to('.h-sticker-wiggle', { x:  0, rotation:  0,   duration: 0.18, ease: 'back.out(1.2)' })
  } else {
    // Mobile: sticker sits fully visible at bottom-right, no peek
    gsap.set('.h-sticker-outer', { y: 0 })
  }

  // Role starts invisible — typewriter reveals it
  gsap.set('.h-role', { opacity: 0, y: 10 })

  typeName()

  // Scroll-triggered sections
  gsap.from('.wk-card', {
    scrollTrigger: { trigger: '.work-inner', start: 'top 85%', once: true },
    y: 48, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
  })
  gsap.from('.stat-item', {
    scrollTrigger: { trigger: '.stats-band', start: 'top 92%', once: true },
    opacity: 0, y: 12, duration: 0.5, stagger: 0.09, ease: 'power3.out',
  })
  gsap.from('.cta-inner > *', {
    scrollTrigger: { trigger: '.cta-section', start: 'top 88%', once: true },
    opacity: 0, y: 24, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  nameTimers.forEach(t => clearTimeout(t))
})
</script>

<template>
  <div class="home">

    <!-- ===== HERO ===== -->
    <section
      class="h-hero"
      ref="heroRef"
      aria-label="Introducción"
      @mouseenter="onHeroEnter"
      @mouseleave="onHeroLeave"
    >

      <!-- Code rain background -->
      <div class="h-rain-bg" aria-hidden="true">
        <div
          v-for="col in rainCols"
          :key="col.id"
          class="h-rain-col"
          :style="col.style"
        >{{ col.content }}</div>
      </div>

      <!-- Sticker: absolute, peeks from bottom-right, clipped by hero overflow:hidden -->
      <div class="h-sticker-outer" aria-hidden="true">
        <div class="h-sticker-wiggle">
          <img
            src="/images/stickerapuntando.png"
            alt=""
            class="h-sticker-img"
          />
        </div>
      </div>

      <!-- Content: flex-column, text pushed to bottom-left -->
      <div class="h-inner">
        <div class="h-left">

          <h1 class="h-name" :aria-label="`${FULL1} ${FULL2}`">
            <span class="h-name-line">
              {{ nameLine1 }}<span v-if="cursorLine === 1" class="h-cursor" aria-hidden="true">|</span>
            </span>
            <span class="h-name-line">
              {{ nameLine2 }}<span v-if="cursorLine === 2" class="h-cursor" aria-hidden="true">|</span>
            </span>
          </h1>

          <p class="h-role">{{ l(personal.titulo) }} &middot; {{ personal.ubicacion }}</p>

        </div>
      </div>

      <!-- Scroll line hint -->
      <div class="h-scroll-hint" aria-hidden="true">
        <span class="h-scroll-line"></span>
      </div>

    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== SELECTED WORK ===== -->
    <section class="work-section" aria-label="Selected work">
      <div class="work-inner">

        <div class="work-header">
          <span class="work-label">{{ t('home.featuredTitle') }}</span>
          <RouterLink to="/proyectos" class="work-see-all">
            {{ t('home.seeAll') }} &rarr;
          </RouterLink>
        </div>

        <div class="work-row work-row--grid">
          <RouterLink
            v-for="project in featuredProjects"
            :key="project.id"
            :to="`/proyecto/${project.id}`"
            class="cover-card wk-card"
            :style="{ background: project.colorFondo }"
          >
            <span class="cover-type-tag">{{ project.tipo }}</span>
            <FranzaCover      v-if="project.id === 'franza'" />
            <PolyfuseCover    v-else-if="project.id === 'polyfuse'" />
            <ArianaCover      v-else-if="project.id === 'arianadeviaje'" />
            <GoaldemyCover    v-else-if="project.id === 'goaldemy'" />
            <PatagoniaCover   v-else-if="project.id === 'patagonia-refugio'" />
            <InkmanagerCover  v-else-if="project.id === 'inkmanager'" />
            <PuraaCover       v-else-if="project.id === 'puraa'" />
            <div class="cover-bottom">
              <span class="cover-year">{{ formatYear(project.fechaInicio) }}</span>
              <span class="cover-cta">
                <span class="cover-cta-text">{{ t('home.viewProject') }}</span>
                <span class="cover-cta-arrow">&rarr;</span>
              </span>
            </div>
          </RouterLink>
        </div>

      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== STATS BAND ===== -->
    <div class="stats-band" aria-label="Stats">
      <template v-for="(stat, i) in stats" :key="i">
        <span class="stat-item">
          <strong class="stat-num">{{ stat.number }}</strong>
          <span class="stat-label">{{ l(stat.label) }}</span>
        </span>
        <span v-if="i < stats.length - 1" class="stat-sep" aria-hidden="true">/</span>
      </template>
    </div>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== CTA ===== -->
    <section class="cta-section">
      <div class="cta-inner">
        <p class="cta-kicker">{{ t('home.ctaEyebrow') }}</p>
        <h2 class="cta-headline">
          <span class="cta-line cta-outline">{{ t('home.ctaLine1') }}</span>
          <span class="cta-line">{{ t('home.ctaLine2') }}</span>
        </h2>
        <div class="cta-foot">
          <p class="cta-sub">{{ t('home.ctaSubtitle') }}</p>
          <RouterLink to="/contacto" class="cta-btn">
            {{ t('home.ctaBtn') }} &rarr;
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
/* ===== HOME ===== */
.home { min-height: 100vh; }

/* ===== HERO ===== */
.h-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: default;
}

/* Code rain background */
.h-rain-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.h-rain-col {
  position: absolute;
  top: 0;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.72rem;
  line-height: 1.85;
  white-space: pre;
  text-align: center;
  color: var(--accent-color);
  will-change: transform;
  animation: h-rain-fall linear infinite;
  pointer-events: none;
}

/* Seamless vertical fall: content is doubled, move -50% of own height = one copy */
@keyframes h-rain-fall {
  from { transform: translateY(-50%); }
  to   { transform: translateY(0); }
}

/* Inner layout: flex-column, text at bottom-left */
.h-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 48px 64px;
  position: relative;
  z-index: 1;
}

/* ── Left: identity block ── */
.h-left {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 55%;
}

/* Name — types itself */
.h-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(4.2rem, 8.5vw, 8.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.88;
  text-transform: uppercase;
  color: var(--text-primary);
  user-select: none;
  margin: 0;
}

/* Pre-reserve line height so layout doesn't shift */
.h-name-line {
  display: block;
  min-height: 0.92em;
}

/* Block cursor */
.h-cursor {
  display: inline-block;
  color: var(--accent-color);
  font-weight: 200;
  margin-left: 3px;
  animation: h-cur-blink 0.75s step-end infinite;
}

@keyframes h-cur-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Role */
.h-role {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  font-weight: 400;
}

/* ── Sticker: absolute bottom-right, peeks via overflow:hidden on .h-hero ── */
.h-sticker-outer {
  position: absolute;
  right: 48px;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
  /* GSAP controls y: peekY (peeking) → 0 (fully revealed) */
}

/* Inner wrapper: GSAP controls x/rotation for wiggle */
.h-sticker-wiggle {
  display: block;
}

.h-sticker-img {
  height: 68vh;
  max-height: 620px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 36px 64px rgba(0, 0, 0, 0.28));
  transform-origin: bottom center;
  user-select: none;
  pointer-events: none;
}

/* Scroll hint */
.h-scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.h-scroll-line {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, var(--text-tertiary), transparent);
  animation: h-hint-drop 2.2s ease-in-out infinite;
  transform-origin: top center;
}

@keyframes h-hint-drop {
  0%   { transform: scaleY(0); opacity: 1; }
  55%  { transform: scaleY(1); opacity: 1; }
  56%  { transform-origin: bottom center; }
  100% { transform: scaleY(0); transform-origin: bottom center; opacity: 0; }
}

/* ===== RULES ===== */
.full-rule {
  border-top: 1px solid var(--border-color);
  margin: 0 48px;
}

/* ===== WORK SECTION ===== */
.work-section {
  padding: 48px 48px 80px;
}

.work-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.work-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.work-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-tertiary);
}

.work-see-all {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .work-see-all:hover { color: var(--accent-color); }
}

/* ===== COVER CARDS ===== */
.cover-card {
  position: relative;
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform  0.32s var(--ease-out),
    box-shadow 0.32s var(--ease-out);
  isolation: isolate;
  will-change: transform;
}

@media (hover: hover) and (pointer: fine) {
  .cover-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px -8px rgba(0, 0, 0, 0.3);
  }
  .cover-card:hover .cover-bottom {
    opacity: 1;
    transform: translateY(0);
  }
  .cover-card:hover .cover-cta-arrow {
    transform: translateX(4px);
  }
}

.cover-card:active {
  transform: scale(0.99);
  transition-duration: 0.1s;
}

.wk-card { aspect-ratio: 16 / 10; }

.work-row { display: grid; gap: 14px; }
.work-row--grid { grid-template-columns: 1fr 1fr; }

.cover-type-tag {
  position: absolute;
  top: 18px; right: 20px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 4px 10px;
  border-radius: 50px;
  z-index: 3;
  pointer-events: none;
}

.cover-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 3;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity   0.22s var(--ease-out),
    transform 0.22s var(--ease-out);
  pointer-events: none;
}

.cover-year {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.8);
  font-variant-numeric: tabular-nums;
}

.cover-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 7px 14px 7px 16px;
  border-radius: 50px;
}

.cover-cta-arrow {
  display: inline-block;
  transition: transform 0.18s var(--ease-out);
}

/* ===== STATS BAND ===== */
.stats-band {
  display: flex;
  align-items: center;
  padding: 32px 48px;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  row-gap: 12px;
}

.stat-item { display: inline-flex; align-items: baseline; gap: 8px; }

.stat-num {
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.stat-sep {
  color: var(--text-tertiary);
  font-size: 1.4rem;
  font-weight: 200;
  margin: 0 20px;
  opacity: 0.4;
}

/* ===== CTA SECTION ===== */
.cta-section { padding: 80px 48px 100px; }

.cta-inner { max-width: 1400px; margin: 0 auto; }

.cta-kicker {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-tertiary);
  margin-bottom: 20px;
}

.cta-headline {
  display: flex;
  flex-direction: column;
  font-size: clamp(2.8rem, 5.5vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.92;
  margin-bottom: 40px;
}

.cta-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-primary);
  transition: color 0.25s var(--ease-out), -webkit-text-stroke-color 0.25s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .cta-headline:hover .cta-outline {
    color: var(--text-primary);
    -webkit-text-stroke-color: transparent;
  }
}

.cta-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.cta-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 440px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  border-radius: 10px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  flex-shrink: 0;
  transition:
    transform    0.2s var(--ease-out),
    box-shadow   0.2s var(--ease-out),
    background   0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .cta-btn:hover {
    background: var(--accent-color);
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  }
}

.cta-btn:active {
  transform: scale(0.97);
  transition-duration: 0.1s;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 960px) {
  .h-inner {
    padding: 0 24px 52px;
  }
  .h-left {
    max-width: 100%;
    gap: 18px;
  }
  .h-sticker-img {
    height: 44vh;
    max-height: 360px;
  }
  .h-sticker-outer { right: 24px; }
  .h-name { font-size: clamp(3.2rem, 9vw, 5.5rem); }

  .full-rule { margin: 0 24px; }
  .work-section { padding: 40px 24px 60px; }
  .stats-band { padding: 28px 24px; }
  .cta-section { padding: 60px 24px 80px; }

  .cover-bottom {
    opacity: 1;
    transform: none;
    background: linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%);
  }
}

@media (max-width: 600px) {
  .h-inner { padding: 0 20px 44px; }
  .h-left { gap: 14px; }
  .h-sticker-img { height: 36vh; max-height: 260px; }
  .h-sticker-outer { right: 16px; }
  .h-name { font-size: clamp(3rem, 11vw, 4.2rem); }

  .full-rule { margin: 0 20px; }
  .work-section { padding: 32px 20px 48px; }
  .work-row--grid { grid-template-columns: 1fr; }
  .wk-card { aspect-ratio: 4 / 3; }
  .cover-cta-text { display: none; }
  .stats-band { padding: 24px 20px; }
  .stat-sep { margin: 0 14px; }
  .cta-section { padding: 48px 20px 64px; }
  .cta-foot { flex-direction: column; align-items: flex-start; }
  .cta-headline { font-size: clamp(2.2rem, 10vw, 3rem); }
}
</style>
