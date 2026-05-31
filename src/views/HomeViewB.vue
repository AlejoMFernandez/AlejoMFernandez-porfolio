<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
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

// ── Terminal build log ──
const buildLines = [
  { text: '> alejo-portfolio@2.0.0 build',                                   type: 'cmd'     },
  { text: '> vite build --mode production',                                   type: 'cmd'     },
  { text: '',                                                                  type: 'empty'   },
  { text: 'vite v5.4.19  building for production...',                         type: 'info'    },
  { text: 'transforming (32) node_modules/gsap/ScrollTrigger.js',             type: 'dim'     },
  { text: '✓  32 modules transformed.',                                   type: 'ok'      },
  { text: '',                                                                  type: 'empty'   },
  { text: 'rendering chunks...',                                               type: 'dim'     },
  { text: 'computing gzip size...',                                            type: 'dim'     },
  { text: '',                                                                  type: 'empty'   },
  { text: 'dist/index.html                       0.51 kB │ gzip:  0.32 kB', type: 'file' },
  { text: 'dist/assets/index-C4tNVpxH.css       32.14 kB │ gzip: 10.68 kB', type: 'file' },
  { text: 'dist/assets/index-Dv3LFvSg.js       184.23 kB │ gzip: 60.47 kB', type: 'file' },
  { text: '',                                                                  type: 'empty'   },
  { text: '✓  built in 6.44s',                                            type: 'success' },
  { text: '',                                                                  type: 'empty'   },
  { text: '●  ready · open for collaboration',                       type: 'ready'   },
]

// Gaps (ms) BETWEEN consecutive lines
const lineGaps = [90, 70, 55, 280, 130, 65, 240, 150, 55, 420, 170, 145, 55, 680, 70, 360]

const visibleLines = ref([])
const buildDone    = ref(false)
const terminalRef  = ref(null)
let buildTimers    = []

const scheduleLines = () => {
  let cumulative = 520

  buildLines.forEach((line, i) => {
    const t = setTimeout(() => {
      visibleLines.value.push(line)
      nextTick(() => {
        if (terminalRef.value) {
          terminalRef.value.scrollTop = terminalRef.value.scrollHeight
        }
      })
    }, cumulative)
    buildTimers.push(t)
    cumulative += lineGaps[i] ?? 100
  })

  // After last line + pause → spring in sticker
  const doneT = setTimeout(() => {
    buildDone.value = true
    gsap.fromTo('.b-sticker',
      { x: -64, opacity: 0, scale: 0.78, rotate: -11 },
      { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.4)' }
    )
  }, cumulative + 800)
  buildTimers.push(doneT)
}

onMounted(() => {
  gsap.from('.b-clip', {
    yPercent: 112, duration: 1.05, stagger: 0.12, ease: 'power4.out', delay: 0.2,
  })
  gsap.from(['.b-badge', '.b-role'], {
    opacity: 0, y: 12, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.5,
  })
  gsap.from('.b-terminal', {
    opacity: 0, y: 28, duration: 0.7, ease: 'power3.out', delay: 0.35,
  })

  scheduleLines()

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
  buildTimers.forEach(t => clearTimeout(t))
})
</script>

<template>
  <div class="home">

    <!-- ===== HERO B: Terminal Build Log ===== -->
    <section class="b-hero" aria-label="Introducción">

      <div class="b-noise" aria-hidden="true"></div>

      <div class="b-inner">

        <!-- Left: identity + sticker springs in after build -->
        <div class="b-left">
          <div class="b-badge">
            <span class="b-dot"></span>
            {{ t('home.available') }}
          </div>

          <h1 class="b-name">
            <span class="b-name-line"><span class="b-clip">ALEJO M.</span></span>
            <span class="b-name-line"><span class="b-clip">FERNANDEZ</span></span>
          </h1>

          <p class="b-role">{{ l(personal.titulo) }} &middot; {{ personal.ubicacion }}</p>

          <img
            src="/images/stickerapuntando.png"
            alt=""
            class="b-sticker"
            aria-hidden="true"
          />
        </div>

        <!-- Right: terminal window -->
        <div class="b-right">
          <div class="b-terminal" role="log" aria-label="Build terminal output">

            <!-- macOS chrome -->
            <div class="b-term-chrome">
              <span class="b-dot-r"></span>
              <span class="b-dot-y"></span>
              <span class="b-dot-g"></span>
              <span class="b-term-title">bash &mdash; alejo-portfolio</span>
            </div>

            <!-- Log body -->
            <div class="b-term-body" ref="terminalRef">
              <div
                v-for="(line, i) in visibleLines"
                :key="i"
                class="b-term-line"
                :class="`b-term-line--${line.type}`"
              >{{ line.text || ' ' }}</div>
              <span class="b-term-cursor" v-if="!buildDone" aria-hidden="true">&block;</span>
            </div>

          </div>
        </div>

      </div>

      <div class="b-scroll-hint" aria-hidden="true">
        <span class="b-scroll-line"></span>
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

/* ===== HERO B ===== */
.b-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.b-noise {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    ellipse 80% 60% at 20% 100%,
    rgba(120, 120, 120, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* Inner: two-column grid */
.b-inner {
  flex: 1;
  display: grid;
  grid-template-columns: 46% 54%;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 48px;
  align-items: center;
  gap: 48px;
  position: relative;
  z-index: 1;
}

/* Left: identity */
.b-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 0;
}

.b-badge {
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

.b-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  flex-shrink: 0;
  animation: b-dot-pulse 2.5s ease-in-out infinite;
}

@keyframes b-dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  50%       { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0); }
}

.b-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-transform: uppercase;
  color: var(--text-primary);
  user-select: none;
}

.b-name-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.05em;
}

.b-clip { display: block; }

.b-role {
  font-size: 0.88rem;
  color: var(--text-tertiary);
  font-weight: 400;
}

/* Sticker: GSAP springs it in from left after build completes */
.b-sticker {
  height: 38vh;
  max-height: 300px;
  width: auto;
  object-fit: contain;
  object-position: bottom left;
  display: block;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.16));
  transform-origin: bottom left;
  user-select: none;
  opacity: 0; /* GSAP reveals */
  margin-top: 4px;
}

/* Right: terminal */
.b-right {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.b-terminal {
  width: 100%;
  max-width: 540px;
  background: #0d1117;
  border-radius: 12px;
  border: 1px solid rgba(48, 54, 61, 0.9);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 8px 24px rgba(0, 0, 0, 0.3);
}

.b-term-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #161b22;
  border-bottom: 1px solid rgba(48, 54, 61, 0.8);
  user-select: none;
}

.b-dot-r, .b-dot-y, .b-dot-g {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.b-dot-r { background: #ff5f57; }
.b-dot-y { background: #febc2e; }
.b-dot-g { background: #28c840; }

.b-term-title {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.32);
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  margin-left: 6px;
  letter-spacing: 0.01em;
}

.b-term-body {
  padding: 18px 20px 22px;
  min-height: 260px;
  max-height: 340px;
  overflow-y: auto;
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.74rem;
  line-height: 1.75;
  scrollbar-width: none;
}
.b-term-body::-webkit-scrollbar { display: none; }

.b-term-line         { display: block; white-space: pre; }
.b-term-line--cmd    { color: #e6edf3; }
.b-term-line--info   { color: #58a6ff; }
.b-term-line--dim    { color: #484f58; }
.b-term-line--ok     { color: #3fb950; }
.b-term-line--file   { color: #8b949e; }
.b-term-line--empty  { min-height: 1.5em; }
.b-term-line--success { color: #3fb950; font-weight: 700; }
.b-term-line--ready  { color: #f0b429; font-weight: 600; }

.b-term-cursor {
  color: #3fb950;
  animation: b-cur-blink 0.85s step-end infinite;
}

@keyframes b-cur-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Scroll hint */
.b-scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.b-scroll-line {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, var(--text-tertiary), transparent);
  animation: b-hint-drop 2.2s ease-in-out infinite;
  transform-origin: top center;
}
@keyframes b-hint-drop {
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
@media (max-width: 960px) {
  .b-inner {
    grid-template-columns: 1fr;
    padding: 0 24px;
    gap: 0;
    align-items: flex-start;
  }
  .b-left { padding: 80px 0 40px; }
  .b-right { padding-bottom: 64px; }
  .b-name { font-size: clamp(3rem, 9vw, 5rem); }
  .b-sticker { height: 26vh; max-height: 200px; }
  .b-terminal { max-width: 100%; }

  .full-rule { margin: 0 24px; }
  .work-section { padding: 40px 24px 60px; }
  .stats-band { padding: 28px 24px; }
  .cta-section { padding: 60px 24px 80px; }
  .cover-bottom { opacity: 1; transform: none; background: linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%); }
}

@media (max-width: 600px) {
  .b-inner { padding: 0 20px; }
  .b-left { gap: 16px; }
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
