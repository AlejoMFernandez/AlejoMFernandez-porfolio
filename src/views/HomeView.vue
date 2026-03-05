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
          <p class="hero-role-label">{{ l(personal.titulo) }}</p>
          <h1 ref="nameRef" class="hero-name">
            <span class="name-line">ALEJO M.</span>
            <span class="name-line">FERNANDEZ</span>
          </h1>
        </div>
      </div>
    </section>

    <!-- ===== PROYECTOS DESTACADOS ===== -->
    <section class="featured-section">
      <div class="section-divider">
        <span class="section-divider-line"></span>
        <span class="section-divider-label">{{ t('home.featuredTitle').toUpperCase() }}</span>
        <span class="section-divider-line"></span>
      </div>

      <div class="featured-list">
        <RouterLink
          v-for="(project) in featuredProjects"
          :key="project.id"
          :to="`/proyecto/${project.id}`"
          class="featured-card"
        >
          <!-- Visual: landscape image -->
          <div class="feat-visual" :style="{ background: project.colorFondo }">
            <img
              v-if="project.imagenPrincipal"
              :src="project.imagenPrincipal"
              :alt="project.nombre"
              class="feat-image"
            />
            <span class="feat-badge">{{ project.tipo }}</span>
          </div>

          <!-- Info: centered below, overlapping image -->
          <div class="feat-info">
            <h3 class="feat-name">{{ project.nombre }}</h3>
            <p class="feat-desc">{{ l(project.descripcionCorta) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ===== MÁS PROYECTOS ===== -->
    <section v-if="otherProjects.length > 0" class="other-section">
      <div class="section-divider">
        <span class="section-divider-line"></span>
        <span class="section-divider-label">+ {{ t('home.moreTitle').toUpperCase() }}</span>
        <span class="section-divider-line"></span>
      </div>

      <div class="other-grid">
        <RouterLink
          v-for="project in otherProjects"
          :key="project.id"
          :to="`/proyecto/${project.id}`"
          class="other-card"
        >
          <div class="other-image-wrap" :style="{ background: project.colorFondo }">
            <img
              v-if="project.imagenPrincipal"
              :src="project.imagenPrincipal"
              :alt="project.nombre"
              class="other-image"
            />
            <span class="other-badge">{{ project.tipo }}</span>
          </div>
          <div class="other-info">
            <h4 class="other-name">{{ project.nombre }}</h4>
            <p class="other-desc">{{ l(project.descripcionCorta) }}</p>
          </div>
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

.hero-dot {
  opacity: 0.4;
}

.hero-bottom {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-role-label {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  opacity: 0.55;
  padding-left: 4px;
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
  margin-bottom: 32px;
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
  padding-top: 100px;
  padding-bottom: 80px;
}

.featured-list {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.featured-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 0 80px;
  border-bottom: 1px solid var(--border-color);
  text-decoration: none;
  color: inherit;
  transition: opacity 0.35s ease;
}

.featured-card:last-child {
  border-bottom: none;
}

.featured-card:hover {
  opacity: 0.75;
}

/* Info: centered, overlaps image bottom */
.feat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  width: 100%;
  margin-top: -56px;
  position: relative;
  z-index: 2;
}

.feat-name {
  font-size: clamp(3.5rem, 7vw, 9rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.88;
  color: var(--text-primary);
  text-transform: uppercase;
}

.feat-desc {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 520px;
}

/* Visual: wide landscape */
.feat-visual {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 7;
}

.feat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover .feat-image {
  transform: scale(1.03);
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

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .hero {
    padding: 110px 24px 48px;
  }

  .section-divider {
    padding: 0 24px;
  }

  .featured-list {
    padding: 0 20px;
  }

  .featured-card {
    padding: 40px 0 56px;
  }

  .feat-info {
    margin-top: -36px;
  }

  .feat-name {
    font-size: clamp(2.4rem, 10vw, 4rem);
  }

  .feat-visual {
    aspect-ratio: 16/9;
    border-radius: 14px;
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
