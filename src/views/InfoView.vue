<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocalized } from '../composables/useLocalized.js'
import personal from '../data/personal.json'
import Footer from '../components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const { l } = useLocalized()

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr === 'Actualidad' || dateStr === 'Present') {
    return t('common.present')
  }
  // Si solo es un año
  if (dateStr.length === 4) return dateStr
  
  const [year, month] = dateStr.split('-')
  const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const months = locale.value === 'es' ? monthsEs : monthsEn
  return `${months[parseInt(month) - 1]} ${year}`
}

onMounted(() => {
  // Hero animation
  gsap.from('.info-hero-content > *', {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out'
  })

  // Reveal animations on scroll
  gsap.utils.toArray('.reveal-section').forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  })

  // Parallax images
  gsap.utils.toArray('.parallax-image').forEach((img) => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -50,
      ease: 'none'
    })
  })

  // Text reveal with stagger
  gsap.utils.toArray('.stagger-reveal').forEach((container) => {
    gsap.from(container.children, {
      scrollTrigger: {
        trigger: container,
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="info-view">
    <!-- Hero Section - Large name -->
    <section class="info-hero">
      <div class="info-hero-content">
        <h1 class="hero-name">
          <span class="name-line">{{ personal.nombre }}</span>
          <span class="name-line">{{ personal.apellido }}</span>
        </h1>
        <div class="hero-meta">
          <span class="meta-item role">{{ personal.titulo }}</span>
          <span class="meta-divider">—</span>
          <span class="meta-item location">{{ personal.ubicacion }}</span>
        </div>
      </div>
    </section>

    <!-- About Section with Image -->
    <section class="content-section">
      <div class="section-container">
        <div class="about-grid reveal-section">
          <div class="about-text">
            <h2 class="section-eyebrow">{{ t('info.aboutMe') }}</h2>
            <p class="large-text">{{ l(personal.bio) }}</p>
          </div>
          <div class="about-image">
            <div class="image-wrapper parallax-image">
              <img :src="personal.imagenes.perfil" :alt="personal.nombre" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section - Perry Wang style -->
    <section class="content-section gallery-section" v-if="personal.imagenes.galeria?.length">
      <div class="section-container">
        <h2 class="section-eyebrow reveal-section">{{ t('info.gallery') }}</h2>
        <div class="gallery-grid reveal-section">
          <div 
            v-for="(foto, index) in personal.imagenes.galeria" 
            :key="index"
            class="gallery-item"
            :class="`gallery-item-${index + 1}`"
          >
            <div class="image-wrapper parallax-image">
              <img :src="foto" :alt="`Gallery photo ${index + 1}`" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Aspirations -->
    <section class="content-section alt-bg">
      <div class="section-container">
        <div class="about-grid reverse reveal-section">
          <div class="about-image">
            <div class="image-wrapper parallax-image" v-if="personal.imagenes.galeria?.[0]">
              <img :src="personal.imagenes.galeria[0]" alt="Foto personal" />
            </div>
          </div>
          <div class="about-text">
            <h2 class="section-eyebrow">{{ t('info.aspirations') }}</h2>
            <p class="large-text">{{ l(personal.aspiraciones) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="content-section">
      <div class="section-container">
        <div class="experience-section reveal-section">
          <h2 class="section-title-large">{{ t('info.experience') }}</h2>
          <div class="experience-timeline stagger-reveal">
            <div 
              v-for="(exp, index) in personal.experiencia" 
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-date">
                <span class="date-range">
                  {{ formatDate(exp.fechaInicio) }} — {{ formatDate(exp.fechaFin) }}
                </span>
                <span class="date-location" v-if="exp.ubicacion">{{ l(exp.ubicacion) }}</span>
              </div>
              <div class="timeline-content">
                <h3 class="timeline-company">{{ exp.empresa }}</h3>
                <p class="timeline-role">{{ l(exp.puesto) }}</p>
                <p class="timeline-description">{{ l(exp.descripcion) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="content-section alt-bg">
      <div class="section-container">
        <div class="two-column-grid reveal-section">
          <!-- Education -->
          <div class="column">
            <h2 class="section-title-medium">{{ t('info.education') }}</h2>
            <div class="stagger-reveal">
              <div 
                v-for="(edu, index) in personal.educacion" 
                :key="index"
                class="edu-item"
              >
                <span class="edu-date">{{ edu.fechaInicio }} — {{ edu.fechaFin === 'Actualidad' ? t('common.present') : edu.fechaFin }}</span>
                <h4 class="edu-title">{{ l(edu.titulo) }}</h4>
                <p class="edu-institution">{{ edu.institucion }}</p>
              </div>
            </div>
          </div>
          <!-- Courses -->
          <div class="column">
            <h2 class="section-title-medium">{{ t('info.courses') }}</h2>
            <div class="stagger-reveal">
              <div 
                v-for="(curso, index) in personal.cursos" 
                :key="index"
                class="edu-item"
              >
                <h4 class="edu-title">{{ l(curso.nombre) }}</h4>
                <p class="edu-institution">{{ curso.institucion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="content-section">
      <div class="section-container">
        <div class="skills-section reveal-section">
          <h2 class="section-title-large">{{ t('info.skills') }}</h2>
          <div class="skills-categories stagger-reveal">
            <!-- Desarrollo -->
            <div class="skill-category">
              <h3 class="category-title">{{ t('info.skillsDev') }}</h3>
              <div class="skills-list">
                <span v-for="skill in personal.habilidades.desarrollo" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
            <!-- Infraestructura -->
            <div class="skill-category">
              <h3 class="category-title">{{ t('info.skillsInfra') }}</h3>
              <div class="skills-list">
                <span v-for="skill in l(personal.habilidades.infraestructura)" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="contact-section">
      <div class="section-container">
        <div class="contact-content reveal-section">
          <h2 class="contact-title">{{ t('info.contact') }}</h2>
          <p class="contact-subtitle">{{ t('info.contactSubtitle') }}</p>
          
          <RouterLink 
            v-magnetic="{ strength: 0.2, scale: 1.03 }"
            to="/contacto" 
            class="contact-cta magnetic-btn"
          >
            {{ t('nav.contact') }}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.info-view {
  min-height: 100vh;
}

/* Hero */
.info-hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px 24px 80px;
}

.info-hero-content {
  text-align: center;
}

.hero-name {
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
}

.name-line {
  display: block;
}

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.meta-item.role {
  color: var(--accent-color);
  font-weight: 500;
}

.meta-divider {
  opacity: 0.4;
}

/* Content Sections */
.content-section {
  padding: 100px 24px;
}

.content-section.alt-bg {
  background: var(--bg-secondary);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* About Grid - Perry Wang style */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-grid.reverse {
  direction: rtl;
}

.about-grid.reverse > * {
  direction: ltr;
}

/* Gallery Grid - Perry Wang style */
.gallery-section {
  padding-top: 40px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 32px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 16px;
  background: var(--bg-tertiary);
}

.gallery-item-1 {
  grid-column: span 2;
  aspect-ratio: 16 / 10;
}

.gallery-item-2 {
  aspect-ratio: 3 / 4;
}

.gallery-item-3 {
  aspect-ratio: 3 / 4;
}

.gallery-item .image-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.gallery-item .image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover .image-wrapper img {
  transform: scale(1.03);
}

.section-eyebrow {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  margin-bottom: 24px;
}

.large-text {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.6;
  color: var(--text-secondary);
}

.image-wrapper {
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 4/5;
  background: var(--bg-tertiary);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Section Titles */
.section-title-large {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 60px;
}

.section-title-medium {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
}

/* Experience Timeline */
.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border-color);
}

.timeline-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline-date {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-range {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.date-location {
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.timeline-company {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-role {
  font-size: 1.1rem;
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 12px;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Two Column Grid */
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

.edu-item {
  margin-bottom: 32px;
}

.edu-item:last-child {
  margin-bottom: 0;
}

.edu-date {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
}

.edu-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.edu-institution {
  color: var(--accent-color);
  font-weight: 500;
}

/* Skills */
.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-tertiary);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: var(--bg-secondary);
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.alt-bg .skill-tag {
  background: var(--bg-primary);
}

.skill-tag:hover {
  background: var(--accent-color);
  color: white;
  transform: translateY(-3px);
}

/* Languages */
.languages-grid {
  display: flex;
  gap: 48px;
}

.language-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.language-name {
  font-size: 1.25rem;
  font-weight: 600;
}

.language-level {
  color: var(--text-tertiary);
  font-size: 0.95rem;
}

/* Contact */
.contact-section {
  padding: 120px 24px;
  background: var(--text-primary);
  color: var(--bg-primary);
}

.contact-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.contact-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.contact-subtitle {
  font-size: 1.2rem;
  opacity: 0.7;
  margin-bottom: 48px;
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  padding: 18px 36px;
  border: 2px solid currentColor;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-cta:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
  transform: translateY(-3px);
}

.contact-cta svg {
  transition: transform 0.3s ease;
}

.contact-cta:hover svg {
  transform: translate(3px, -3px);
}

/* Mobile */
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .about-grid.reverse {
    direction: ltr;
  }

  .about-grid .about-image {
    order: -1;
  }

  .image-wrapper {
    aspect-ratio: 16/10;
    max-height: 400px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .two-column-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .gallery-grid {
    grid-template-columns: 1fr 1fr;
  }

  .gallery-item-1 {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .info-hero {
    padding: 120px 20px 60px;
    min-height: auto;
  }

  .hero-meta {
    flex-direction: column;
    gap: 8px;
  }

  .meta-divider {
    display: none;
  }

  .content-section {
    padding: 60px 20px;
  }

  .contact-section {
    padding: 80px 20px;
  }

  .languages-grid {
    flex-direction: column;
    gap: 24px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-item-1 {
    grid-column: span 1;
  }
}
</style>
