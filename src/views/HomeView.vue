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

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const { l } = useLocalized()

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => a.orden - b.orden)
})

const featuredProjects = computed(() => {
  return sortedProjects.value.filter(p => p.destacado)
})

const otherProjects = computed(() => {
  return sortedProjects.value.filter(p => !p.destacado)
})

const heroRef = ref(null)
const nameRef = ref(null)
const descRef = ref(null)

onMounted(() => {
  // Hero animation
  const tl = gsap.timeline()
  tl.from(descRef.value, {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  })
  .from(nameRef.value.children, {
    y: 120,
    opacity: 0,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power4.out',
    clearProps: 'transform'
  }, '-=0.5')

  // Other cards scroll reveal
  gsap.from('.other-grid', {
    scrollTrigger: {
      trigger: '.other-grid',
      start: 'top 88%',
      toggleActions: 'play none none none'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
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
        <!-- Top: description + meta -->
        <div ref="descRef" class="hero-top">
          <p class="hero-desc">{{ l(personal.subtitulo) }}</p>
          <div class="hero-meta">
            <span class="hero-role">{{ l(personal.titulo) }}</span>
            <span class="hero-dot">·</span>
            <span class="hero-location">{{ personal.ubicacion }}</span>
          </div>
        </div>

        <!-- Bottom: massive name -->
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

    <!-- Scroll arrow -->
    <div class="scroll-hint">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="22" height="22">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <polyline points="19 12 12 19 5 12"/>
      </svg>
    </div>

    <!-- ===== PROYECTOS DESTACADOS ===== -->
    <section class="featured-section" style="margin-top: 120px;">
      <div class="section-divider">
        <span class="section-divider-line"></span>
        <span class="section-divider-label">{{ t('home.featuredTitle').toUpperCase() }}</span>
        <span class="section-divider-line"></span>
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
            <div class="feat-info-body">
              <h3 class="feat-name">{{ project.nombre }}</h3>
              <p class="feat-desc">{{ l(project.descripcionCorta) }}</p>
            </div>
            <div class="feat-info-foot">
              <div class="feat-techs">
                <span v-for="tech in project.tecnologias.slice(0, 4)" :key="tech" class="feat-tech">{{ tech }}</span>
              </div>
              <span class="feat-arrow">→</span>
            </div>
          </div>

          <!-- Visual side -->
          <div class="feat-visual" :style="{ background: project.colorFondo }">
            <img
              v-if="project.imagenPrincipal"
              :src="project.imagenPrincipal"
              :alt="project.nombre"
              class="feat-image"
            />
            <span class="feat-badge">{{ project.tipo }}</span>
          </div>
        </RouterLink>
      </div>

      <!-- Ver más CTA -->
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

    <!-- ===== CTA FINAL ===== -->
    <section class="cta-section">
      <div class="cta-inner">
        <span class="cta-eyebrow">{{ t('home.ctaEyebrow') }}</span>
        <h2 class="cta-title">{{ t('home.ctaTitle') }}</h2>
        <p class="cta-subtitle">{{ t('home.ctaSubtitle') }}</p>
        <RouterLink to="/contacto" class="cta-link">
          {{ t('home.ctaBtn') }}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
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

.hero-top {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-desc {
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.5;
  max-width: 540px;
  font-size: 0px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--text-tertiary);
  font-size: 0px;
}

.hero-carrer {
  margin-left: 10px;
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.5;
}

.hero-dot {
  opacity: 0.4;
}

.hero-bottom {
  overflow: visible;
  position: relative;
}

.hero-sticker {
  position: absolute;
  right: 0;
  bottom: 50px;
  width: clamp(520px, 12vw, 200px);
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.35));
  pointer-events: none;
  user-select: none;
  transform-origin: bottom right;
  z-index: -1;
}

@keyframes sticker-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-10px) rotate(2deg); }
}

/* Scroll hint arrow */
.scroll-hint {
  position: fixed;
  bottom: 32px;
  right: 40px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scroll-bounce 2s ease-in-out infinite;
  z-index: 10;
  pointer-events: none;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(7px); opacity: 1; }
}

.hero-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(5rem, 13.5vw, 15rem);
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

/* ===== SECTION DIVIDER ===== */
.section-divider {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 48px;
  margin-bottom: 45px;
}

.section-divider-line {
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.section-divider-label {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  white-space: nowrap;
}

/* ===== FEATURED SECTION ===== */
.featured-section {
  padding-bottom: 80px;
}

.featured-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 48px;
  max-width: 1080px;
  margin: 0 auto;
}

.featured-card {
  display: grid;
  grid-template-columns: 500px 1fr;
  height: 300px;
  border-radius: 22px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: inherit;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease;
  will-change: transform;
}

.featured-card.reverse {
  direction: rtl;
}

.featured-card.reverse > * {
  direction: ltr;
}

.featured-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.2);
  border-color: rgba(56, 189, 248, 0.28);
}

/* Info side */
.feat-info {
  display: flex;
  flex-direction: column;
  padding: 32px 36px;
  justify-content: space-between;
}

.feat-info-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feat-name {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
}

.feat-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 260px;
}

.feat-info-foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.feat-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.feat-tech {
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 50px;
  text-transform: uppercase;
}

.feat-arrow {
  font-size: 1.4rem;
  color: var(--text-tertiary);
  transition: transform 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
}

.featured-card:hover .feat-arrow {
  transform: translate(4px, -4px);
  color: var(--accent-color);
}

/* Visual side */
.feat-visual {
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.feat-image {
  position: absolute; 
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover .feat-image {
  transform: scale(1.05);
}

.feat-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* ===== OTHER PROJECTS ===== */
.other-section {
  padding-bottom: 40px;
}

.other-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 0 48px;
  max-width: 1080px;
  margin: 0 auto;
}

.other-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: inherit;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease;
}

.other-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(56, 189, 248, 0.2);
}

.other-image-wrap {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.other-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.other-card:hover .other-image {
  transform: scale(1.06);
}

.other-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 11px;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.other-info {
  padding: 20px 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.other-name {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.other-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== VER TODOS BOTÓN ===== */
.featured-cta {
  display: flex;
  justify-content: center;
  padding: 48px 48px 0;
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
}

.see-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 50px;
  border: 1.5px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease,
              background 0.3s ease;
}

.see-all-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateX(4px);
}

.see-all-btn svg {
  transition: transform 0.3s ease;
}
.see-all-btn:hover svg {
  transform: translateX(4px);
}

/* ===== CTA SECTION ===== */
.cta-section {
  padding: 120px 48px;
  border-top: 1px solid var(--border-color);
  margin-top: 80px;
}

.cta-inner {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.cta-eyebrow {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-color);
}

.cta-title {
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--text-primary);
}

.cta-subtitle {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 520px;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  padding: 16px 36px;
  border-radius: 14px;
  background: var(--accent-color);
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(56, 189, 248, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(56, 189, 248, 0.5);
}

.cta-link svg {
  transition: transform 0.3s ease;
}
.cta-link:hover svg {
  transform: translateX(4px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1100px) {
  .featured-card {
    grid-template-columns: 260px 1fr;
  }
}

@media (max-width: 900px) {
  .hero {
    padding: 110px 24px 48px;
  }

  .section-divider {
    padding: 0 24px;
  }

  .featured-list {
    padding: 0 24px;
  }

  .featured-card {
    grid-template-columns: 1fr;
  }

  .feat-visual {
    aspect-ratio: 16/9;
    min-height: 220px;
  }

  .feat-name {
    font-size: 2rem;
  }

  .other-grid {
    padding: 0 24px;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 100px 20px 40px;
    gap: 40px;
  }

  .hero-name {
    font-size: clamp(3.8rem, 16vw, 6rem);
  }

  .hero-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .hero-dot {
    display: none;
  }

  .other-grid {
    grid-template-columns: 1fr;
  }

  .feat-info {
    padding: 24px 24px;
  }
}
</style>
