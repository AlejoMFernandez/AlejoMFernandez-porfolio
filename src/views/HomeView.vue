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
import MarqueeStrip from '../components/MarqueeStrip.vue'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const { l } = useLocalized()

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => a.orden - b.orden)
})

const featuredProjects = computed(() => {
  return sortedProjects.value.filter(p => p.destacado)
})

const isLogoMain = (project) => {
  return Boolean(project?.logo && project?.imagenPrincipal && project.imagenPrincipal === project.logo)
}

const heroRef = ref(null)
const nameRef = ref(null)
const heroTopRef = ref(null)

const stats = [
  { number: '7+', label: { es: 'Proyectos', en: 'Projects', pt: 'Projetos' } },
  { number: '2+', label: { es: 'Años', en: 'Years', pt: 'Anos' } },
  { number: '16+', label: { es: 'Tecnologías', en: 'Technologies', pt: 'Tecnologias' } },
  { number: '3', label: { es: 'Idiomas', en: 'Languages', pt: 'Idiomas' } },
]

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.1 })

  tl.from(heroTopRef.value.children, {
    y: 20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  })
  .from(nameRef.value.children, {
    y: 130,
    opacity: 0,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power4.out',
    clearProps: 'transform'
  }, '-=0.4')
  .from('.hero-carrer', {
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.6')

  gsap.from('.featured-card', {
    scrollTrigger: { trigger: '.featured-list', start: 'top 88%', toggleActions: 'play none none none' },
    y: 80,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out'
  })

  gsap.from('.stat-item', {
    scrollTrigger: { trigger: '.stats-strip', start: 'top 90%', toggleActions: 'play none none none' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out'
  })

  gsap.from('.cta-inner > *', {
    scrollTrigger: { trigger: '.cta-section', start: 'top 85%', toggleActions: 'play none none none' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out'
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="home">

    <!-- ===== HERO ===== -->
    <section ref="heroRef" class="hero">
      <div class="hero-inner">

        <!-- Top: badge + meta -->
        <div ref="heroTopRef" class="hero-top">
          <div class="available-badge">
            <span class="badge-dot"></span>
            {{ t('home.available') }}
          </div>
          <div class="hero-meta">
            <span class="hero-role">{{ l(personal.titulo) }}</span>
            <span class="hero-sep">·</span>
            <span class="hero-location">{{ personal.ubicacion }}</span>
          </div>
        </div>

        <!-- Bottom: massive name + sticker -->
        <div class="hero-bottom">
          <h1 ref="nameRef" class="hero-name">
            <span class="name-line">ALEJO M.</span>
            <span class="name-line">FERNANDEZ</span>
          </h1>
          <span class="hero-carrer">{{ t('home.carrer') }}</span>
          <img src="/images/stickersaludando.png" alt="sticker" class="hero-sticker" />
        </div>
      </div>
    </section>

    <!-- Scroll hint -->
    <div class="scroll-hint" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="20" height="20">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <polyline points="19 12 12 19 5 12"/>
      </svg>
    </div>

    <!-- ===== MARQUEE ===== -->
    <MarqueeStrip :speed="28" />

    <!-- ===== PROYECTOS DESTACADOS ===== -->
    <section class="featured-section">
      <div class="section-header">
        <span class="section-index">01</span>
        <h2 class="section-title">{{ t('home.featuredTitle') }}</h2>
      </div>

      <div class="featured-list">
        <RouterLink
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          :to="`/proyecto/${project.id}`"
          class="featured-card"
          :class="{ reverse: index % 2 !== 0 }"
        >
          <!-- Info side -->
          <div class="feat-info">
            <span class="feat-type-badge">{{ project.tipo }}</span>
            <div class="feat-info-body">
              <h3 class="feat-name">{{ project.nombre }}</h3>
              <p class="feat-desc">{{ l(project.descripcionCorta) }}</p>
            </div>
            <div class="feat-info-foot">
              <div class="feat-techs">
                <span v-for="tech in project.tecnologias.slice(0, 4)" :key="tech" class="feat-tech">{{ tech }}</span>
              </div>
              <span class="feat-cta">{{ t('home.viewProject') }} →</span>
            </div>
          </div>

          <!-- Visual side -->
          <div class="feat-visual" :style="{ background: project.colorFondo }">
            <img
              v-if="project.imagenPrincipal"
              :src="project.imagenPrincipal"
              :alt="project.nombre"
              :class="['feat-image', { 'logo-main': isLogoMain(project) }]"
            />
            <div class="feat-visual-overlay">
              <span class="feat-view-label">VER PROYECTO →</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="featured-cta">
        <RouterLink to="/proyectos" class="see-all-btn">
          {{ t('home.seeAll') }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>
    </section>

    <!-- ===== STATS STRIP ===== -->
    <section class="stats-strip">
      <div class="stats-inner">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="stat-item"
        >
          <span class="stat-number">{{ stat.number }}</span>
          <span class="stat-label">{{ l(stat.label) }}</span>
        </div>
      </div>
    </section>

    <!-- ===== CTA FINAL ===== -->
    <section class="cta-section">
      <div class="cta-inner">
        <span class="cta-eyebrow">{{ t('home.ctaEyebrow') }}</span>
        <h2 class="cta-headline">
          <span class="cta-line cta-line--outline">{{ t('home.ctaLine1') }}</span>
          <span class="cta-line cta-line--fill">{{ t('home.ctaLine2') }}</span>
        </h2>
        <div class="cta-footer">
          <p class="cta-subtitle">{{ t('home.ctaSubtitle') }}</p>
          <RouterLink to="/contacto" class="cta-link">
            {{ t('home.ctaBtn') }}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

/* ===== HERO ===== */
.hero {
  min-height: 100vh;
  padding: 130px 48px 30px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.hero-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  gap: 80px;
}

/* Available badge */
.hero-top {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.available-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  padding: 6px 14px 6px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  width: fit-content;
  letter-spacing: 0.01em;
}

.badge-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  animation: pulse-badge 2.2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45); }
  50%       { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-tertiary);
  letter-spacing: 0.01em;
}

.hero-sep {
  opacity: 0.4;
}

.hero-carrer {
  margin-left: 6px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 400;
}

/* Name */
.hero-bottom {
  overflow: visible;
  position: relative;
}

.hero-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(5rem, 10.5vw, 13rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.88;
  text-transform: uppercase;
  color: var(--text-primary);
  user-select: none;
}

.name-line {
  display: block;
  overflow: hidden;
}

.hero-sticker {
  position: absolute;
  right: 0;
  bottom: 0;
  width: clamp(300px, 40vw, 660px);
  object-fit: contain;
  filter: drop-shadow(0 8px 28px rgba(0,0,0,0.3));
  pointer-events: none;
  user-select: none;
  transform-origin: bottom right;
  z-index: -1;
  animation: sticker-float 4s ease-in-out infinite;
}

@keyframes sticker-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-12px) rotate(1.5deg); }
}

/* Scroll hint */
.scroll-hint {
  position: fixed;
  bottom: 32px;
  right: 40px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scroll-bounce 2.2s ease-in-out infinite;
  z-index: 10;
  pointer-events: none;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.45; }
  50%       { transform: translateY(8px); opacity: 1; }
}

/* ===== SECTION HEADER ===== */
.section-header {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 0 48px;
  margin-bottom: 40px;
}

.section-index {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent-color);
  font-variant-numeric: tabular-nums;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

/* ===== FEATURED SECTION ===== */
.featured-section {
  padding: 80px 0 80px;
}

.featured-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr 480px;
  height: 340px;
  border-radius: 24px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s ease;
  will-change: transform;
}

.featured-card.reverse {
  grid-template-columns: 480px 1fr;
}

.featured-card.reverse .feat-info {
  order: 2;
}

.featured-card.reverse .feat-visual {
  order: 1;
}

.featured-card:hover {
  transform: translateY(-6px) scale(1.005);
  box-shadow: 0 32px 72px rgba(0, 0, 0, 0.22);
  border-color: rgba(56, 189, 248, 0.22);
}

/* Info side */
.feat-info {
  display: flex;
  flex-direction: column;
  padding: 32px 36px;
  justify-content: space-between;
}

.feat-type-badge {
  display: inline-block;
  width: fit-content;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-color);
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  padding: 4px 10px;
  border-radius: 50px;
}

.feat-info-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feat-name {
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
}

.feat-desc {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 280px;
}

.feat-info-foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.feat-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.feat-tech {
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 3px 9px;
  border-radius: 50px;
  text-transform: uppercase;
}

.feat-cta {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  white-space: nowrap;
  transition: color 0.3s ease, transform 0.3s ease;
  flex-shrink: 0;
}

.featured-card:hover .feat-cta {
  color: var(--accent-color);
  transform: translate(4px, -3px);
}

/* Visual side */
.feat-visual {
  position: relative;
  overflow: hidden;
}

.feat-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}

.feat-image.logo-main {
  object-fit: contain;
  object-position: center;
  padding: 32px;
}

.featured-card:hover .feat-image {
  transform: scale(1.07);
}

.feat-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 28px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.featured-card:hover .feat-visual-overlay {
  opacity: 1;
}

.feat-view-label {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 8px 18px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.25);
}

/* ===== VER TODOS ===== */
.featured-cta {
  display: flex;
  justify-content: center;
  padding: 48px 48px 0;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.see-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 30px;
  border-radius: 50px;
  border: 1.5px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition:
    border-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease,
    background 0.3s ease;
}

.see-all-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateX(4px);
  background: rgba(56, 189, 248, 0.05);
}

.see-all-btn svg {
  transition: transform 0.3s ease;
}
.see-all-btn:hover svg {
  transform: translateX(4px);
}

/* ===== STATS STRIP ===== */
.stats-strip {
  margin: 100px 0 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  padding: 60px 48px;
}

.stats-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 32px 0 0;
  border-right: 1px solid var(--border-color);
}

.stat-item:last-child {
  border-right: none;
  padding-right: 0;
}

.stat-number {
  font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
}

/* ===== CTA SECTION ===== */
.cta-section {
  padding: 120px 48px 100px;
}

.cta-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cta-eyebrow {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin-bottom: 28px;
}

.cta-headline {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.5rem, 8vw, 9rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.92;
  margin-bottom: 48px;
}

.cta-line--outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-primary);
  transition: color 0.3s ease;
}

.cta-headline:hover .cta-line--outline {
  color: var(--text-primary);
  -webkit-text-stroke: 1.5px transparent;
}

.cta-line--fill {
  color: var(--text-primary);
}

.cta-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 40px;
  border-top: 1px solid var(--border-color);
}

.cta-subtitle {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 480px;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding: 16px 36px;
  border-radius: 14px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.cta-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.22);
  background: var(--accent-color);
  color: #000;
}

.cta-link svg {
  transition: transform 0.3s ease;
}
.cta-link:hover svg {
  transform: translateX(4px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1100px) {
  .featured-card,
  .featured-card.reverse {
    grid-template-columns: 1fr 380px;
  }
  .featured-card.reverse {
    grid-template-columns: 380px 1fr;
  }
}

@media (max-width: 900px) {
  .hero {
    padding: 110px 24px 48px;
  }

  .section-header,
  .featured-list,
  .featured-cta {
    padding-left: 24px;
    padding-right: 24px;
  }

  .featured-card,
  .featured-card.reverse {
    grid-template-columns: 1fr;
    grid-template-rows: auto 240px;
    height: auto;
  }

  .featured-card.reverse .feat-info { order: 1; }
  .featured-card.reverse .feat-visual { order: 2; }

  .feat-visual {
    min-height: 240px;
  }

  .stats-strip {
    padding: 48px 24px;
  }

  .stats-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .stat-item {
    border-right: none;
    padding-right: 0;
  }

  .cta-section {
    padding: 80px 24px;
  }

  .cta-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 90px 20px 80px;
  }

  .hero-name {
    font-size: clamp(3rem, 13vw, 5rem);
  }

  .hero-sticker {
    position: relative;
    order: -1;
    right: auto;
    bottom: auto;
    width: 68vw;
    align-self: center;
    margin-top: 12px;
    margin-bottom: -60px;
    z-index: 0;
  }

  .hero-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .section-header {
    padding: 0 20px;
  }

  .featured-list,
  .featured-cta {
    padding-left: 20px;
    padding-right: 20px;
  }

  .feat-visual {
    display: none;
  }

  .featured-card {
    grid-template-rows: auto;
    height: auto;
  }

  .stats-inner {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .cta-headline {
    font-size: clamp(2.8rem, 12vw, 5rem);
  }

  .cta-line--outline {
    -webkit-text-stroke-width: 1px;
  }
}
</style>
