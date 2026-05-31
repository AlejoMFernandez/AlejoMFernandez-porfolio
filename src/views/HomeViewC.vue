<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
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
  { number: '7+',  label: { es: 'proyectos',           en: 'projects',           pt: 'projetos' } },
  { number: '2+',  label: { es: 'años de experiencia', en: 'years of experience', pt: 'anos de experiência' } },
  { number: '16+', label: { es: 'tecnologías',         en: 'technologies',       pt: 'tecnologias' } },
]

// ── Code Rain columns ──
// Single chars, each column doubled for seamless vertical loop
// Animation: translateY(-50%) → translateY(0) = falls downward
const charset = '{}()[];=<>!*/01_:.@#$&|~'.split('')

const rainCols = Array.from({ length: 24 }, (_, i) => {
  // Deterministic char sequence per column
  const half = Array.from({ length: 72 }, (_, j) =>
    charset[(i * 11 + j * 7) % charset.length]
  )
  // Double for seamless loop
  const content = [...half, ...half].join('\n')

  return {
    id: i,
    content,
    style: {
      left:              `${((i + 0.5) / 24) * 100}%`,
      animationDuration: `${12 + (i % 9) * 1.8}s`,
      animationDelay:    `-${((i * 2.3) % 16).toFixed(1)}s`,
      opacity:           (0.035 + (i % 8) * 0.011).toFixed(3),
    },
  }
})

onMounted(() => {
  // Name clip up
  gsap.from('.c-clip', {
    yPercent: 112, duration: 1.1, stagger: 0.13, ease: 'power4.out', delay: 0.15,
  })
  // Badge + role
  gsap.from(['.c-badge', '.c-role'], {
    opacity: 0, y: 14, duration: 0.55, stagger: 0.1, ease: 'power3.out', delay: 0.55,
  })
  // Sticker: fade up, then CSS bob takes over
  gsap.from('.c-sticker-wrap', {
    opacity: 0, y: 36, duration: 1.05, ease: 'power3.out', delay: 0.4,
  })

  // Scroll animations
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
})
</script>

<template>
  <div class="home">

    <!-- ===== HERO C: Code Rain ===== -->
    <section class="c-hero" aria-label="Introducción">

      <!-- Code rain columns -->
      <div class="c-rain-bg" aria-hidden="true">
        <div
          v-for="col in rainCols"
          :key="col.id"
          class="c-rain-col"
          :style="col.style"
        >{{ col.content }}</div>
      </div>

      <!-- Sticker: floating right, CSS bob animation -->
      <div class="c-sticker-wrap" aria-hidden="true">
        <img
          src="/images/stickerapuntando.png"
          alt=""
          class="c-sticker-img"
        />
      </div>

      <!-- Main content: name + identity -->
      <div class="c-inner">

        <div class="c-content">
          <div class="c-badge">
            <span class="c-dot"></span>
            {{ t('home.available') }}
          </div>

          <h1 class="c-name">
            <span class="c-name-line"><span class="c-clip">ALEJO M.</span></span>
            <span class="c-name-line"><span class="c-clip">FERNANDEZ</span></span>
          </h1>

          <p class="c-role">{{ l(personal.titulo) }} &middot; {{ personal.ubicacion }}</p>
        </div>

      </div>

      <div class="c-scroll-hint" aria-hidden="true">
        <span class="c-scroll-line"></span>
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

    <!-- ===== STATS ===== -->
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
/* ===== BASE ===== */
.home { min-height: 100vh; }

/* ===== HERO C: Code Rain ===== */
.c-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Rain background */
.c-rain-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.c-rain-col {
  position: absolute;
  top: 0;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.72rem;
  line-height: 1.85;
  white-space: pre;
  text-align: center;
  color: var(--accent-color);
  will-change: transform;
  animation: c-rain-fall linear infinite;
  pointer-events: none;
  /* width is naturally 1 char wide via monospace */
}

/* Falls downward: content moves from above viewport into view */
@keyframes c-rain-fall {
  from { transform: translateY(-50%); }
  to   { transform: translateY(0); }
}

/* Sticker: large, floating right, CSS bob */
.c-sticker-wrap {
  position: absolute;
  right: 48px;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

.c-sticker-img {
  height: 68vh;
  max-height: 620px;
  width: auto;
  object-fit: contain;
  object-position: bottom right;
  display: block;
  filter: drop-shadow(0 32px 60px rgba(0, 0, 0, 0.18));
  user-select: none;
  animation: c-bob 5s ease-in-out infinite;
  transform-origin: bottom center;
}

@keyframes c-bob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  30%       { transform: translateY(-18px) rotate(-0.5deg); }
  65%       { transform: translateY(-9px) rotate(-3deg); }
}

/* Main content */
.c-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 48px;
  position: relative;
  z-index: 3;
}

.c-content {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-bottom: 80px;
  /* Only takes up the left ~55% so sticker has room on right */
  max-width: 58%;
}

.c-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  padding: 5px 14px 5px 10px;
  width: fit-content;
}

.c-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  flex-shrink: 0;
  animation: c-dot-pulse 2.5s ease-in-out infinite;
}

@keyframes c-dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  50%       { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0); }
}

/* Name: enormous, clips in from below */
.c-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(4rem, 8.5vw, 8.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.88;
  text-transform: uppercase;
  color: var(--text-primary);
  user-select: none;
}

.c-name-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.04em;
}

.c-clip { display: block; }

.c-role {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  font-weight: 400;
}

/* Scroll hint */
.c-scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
}
.c-scroll-line {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, var(--text-tertiary), transparent);
  animation: c-hint-drop 2.2s ease-in-out infinite;
  transform-origin: top center;
}
@keyframes c-hint-drop {
  0%   { transform: scaleY(0); opacity: 1; }
  55%  { transform: scaleY(1); opacity: 1; }
  56%  { transform-origin: bottom center; }
  100% { transform: scaleY(0); transform-origin: bottom center; opacity: 0; }
}

/* ===== SHARED: rules ===== */
.full-rule {
  border-top: 1px solid var(--border-color);
  margin: 0 48px;
}

/* ===== SHARED: Work ===== */
.work-section { padding: 48px 48px 80px; }
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
.work-label { font-size: 0.8rem; font-weight: 600; color: var(--text-tertiary); }
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

.cover-card {
  position: relative;
  display: block;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.32s var(--ease-out), box-shadow 0.32s var(--ease-out);
  isolation: isolate;
  will-change: transform;
}
@media (hover: hover) and (pointer: fine) {
  .cover-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px -8px rgba(0, 0, 0, 0.3);
  }
  .cover-card:hover .cover-bottom { opacity: 1; transform: translateY(0); }
  .cover-card:hover .cover-cta-arrow { transform: translateX(4px); }
}
.cover-card:active { transform: scale(0.99); transition-duration: 0.1s; }

.wk-card { aspect-ratio: 16 / 10; }
.work-row { display: grid; gap: 14px; }
.work-row--grid { grid-template-columns: 1fr 1fr; }

.cover-type-tag {
  position: absolute;
  top: 18px; right: 20px;
  font-size: 0.6rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
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
  transition: opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out);
  pointer-events: none;
}
.cover-year {
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.8);
  font-variant-numeric: tabular-nums;
}
.cover-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 7px 14px 7px 16px;
  border-radius: 50px;
}
.cover-cta-arrow { display: inline-block; transition: transform 0.18s var(--ease-out); }

/* ===== SHARED: Stats ===== */
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
.stat-label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 400; }
.stat-sep {
  color: var(--text-tertiary);
  font-size: 1.4rem; font-weight: 200;
  margin: 0 20px;
  opacity: 0.4;
}

/* ===== SHARED: CTA ===== */
.cta-section { padding: 80px 48px 100px; }
.cta-inner { max-width: 1400px; margin: 0 auto; }
.cta-kicker { font-size: 0.8rem; font-weight: 500; color: var(--text-tertiary); margin-bottom: 20px; }
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
.cta-sub { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.65; max-width: 440px; }
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  border-radius: 10px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.9rem; font-weight: 700;
  text-decoration: none;
  flex-shrink: 0;
  transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out), background 0.2s var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .cta-btn:hover {
    background: var(--accent-color);
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  }
}
.cta-btn:active { transform: scale(0.97); transition-duration: 0.1s; }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .c-sticker-wrap { right: 20px; }
  .c-sticker-img { height: 52vh; max-height: 440px; }
  .c-content { max-width: 65%; }
  .c-name { font-size: clamp(3.2rem, 8vw, 5.5rem); }

  .full-rule { margin: 0 24px; }
  .work-section { padding: 40px 24px 60px; }
  .stats-band { padding: 28px 24px; }
  .cta-section { padding: 60px 24px 80px; }
  .cover-bottom { opacity: 1; transform: none; background: linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%); }
}

@media (max-width: 600px) {
  .c-sticker-wrap { right: 0; }
  .c-sticker-img { height: 40vh; max-height: 300px; }
  .c-inner { padding: 0 20px; }
  .c-content { max-width: 75%; padding-bottom: 60px; gap: 16px; }
  .c-name { font-size: clamp(3rem, 10vw, 4rem); }

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
