<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import projects from '../data/projects.json'
import Footer from '../components/Footer.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const project = computed(() => {
  return projects.find(p => p.id === route.params.id)
})

// Si no existe el proyecto, redirigir a home
watch(project, (newProject) => {
  if (!newProject) {
    router.push('/')
  }
}, { immediate: true })

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const months = locale.value === 'es' ? monthsEs : monthsEn
  return `${months[parseInt(month) - 1]} ${year}`
}

const selectedImage = ref(null)

const openLightbox = (img) => {
  selectedImage.value = img
}

const closeLightbox = () => {
  selectedImage.value = null
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  // Animación de entrada
  gsap.from('.back-button-fixed', {
    opacity: 0,
    x: -20,
    duration: 0.5,
    ease: 'power3.out'
  })
  
  gsap.from('.project-hero', {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.1
  })
  
  gsap.from('.project-content > *', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.3
  })
})
</script>

<template>
  <div class="project-view" v-if="project">
    <!-- Botón Back fijo estilo Perry Wang -->
    <button @click="goBack" class="back-button-fixed">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      {{ t('project.back') }}
    </button>
    
    <!-- Hero del proyecto -->
    <section 
      class="project-hero" 
      :style="{ backgroundColor: project.colorFondo }"
    >
      <div class="hero-content">
        <h1 class="project-title" :style="{ color: project.colorTexto }">
          {{ project.nombre }}
        </h1>
        
        <p class="project-tagline" :style="{ color: project.colorTexto }">
          {{ project.descripcionCorta }}
        </p>
        
        <div class="project-meta" :style="{ color: project.colorTexto }">
          <span class="meta-item">
            {{ formatDate(project.fechaInicio) }} — {{ formatDate(project.fechaFin) }}
          </span>
          <span class="meta-divider">|</span>
          <span class="meta-item">{{ project.rol }}</span>
        </div>
      </div>
    </section>

    <!-- Contenido del proyecto -->
    <section class="project-content">
      <div class="content-grid">
        <!-- Columna principal -->
        <div class="main-content">
          <!-- Descripción -->
          <div class="content-block">
            <h2 class="block-title">{{ t('project.about') }}</h2>
            <p class="description">{{ project.descripcionLarga }}</p>
          </div>

          <!-- Imágenes -->
          <div class="content-block" v-if="project.imagenes?.length">
            <h2 class="block-title">{{ t('project.gallery') }}</h2>
            <div class="gallery">
              <div 
                v-for="(img, index) in project.imagenes" 
                :key="index"
                class="gallery-item"
                @click="openLightbox(img)"
              >
                <img :src="img" :alt="`Screenshot ${index + 1} de ${project.nombre}`" />
                <div class="gallery-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Video -->
          <div class="content-block" v-if="project.video">
            <h2 class="block-title">{{ t('project.demo') }}</h2>
            <div class="video-container">
              <video :src="project.video" controls></video>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
          <!-- Links -->
          <div class="sidebar-block">
            <h3 class="sidebar-title">{{ t('project.links') }}</h3>
            <div class="links">
              <a 
                v-if="project.linkDemo" 
                :href="project.linkDemo" 
                target="_blank" 
                class="link-button primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {{ t('project.viewSite') }}
              </a>
              <a 
                v-if="project.linkGithub" 
                :href="project.linkGithub" 
                target="_blank" 
                class="link-button secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {{ t('project.viewCode') }}
              </a>
            </div>
          </div>

          <!-- Cliente -->
          <div class="sidebar-block" v-if="project.cliente">
            <h3 class="sidebar-title">{{ t('project.client') }}</h3>
            <p class="sidebar-text">{{ project.cliente }}</p>
          </div>

          <!-- Tecnologías -->
          <div class="sidebar-block">
            <h3 class="sidebar-title">{{ t('project.technologies') }}</h3>
            <div class="tech-tags">
              <span v-for="tech in project.tecnologias" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Features -->
          <div class="sidebar-block" v-if="project.features?.length">
            <h3 class="sidebar-title">{{ t('project.features') }}</h3>
            <ul class="features-list">
              <li v-for="feature in project.features" :key="feature" class="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <Footer />

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="selectedImage" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <img :src="selectedImage" @click.stop />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.project-view {
  min-height: 100vh;
}

/* Fixed Back Button - Perry Wang Style */
.back-button-fixed {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 12px 20px;
  border-radius: 50px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.back-button-fixed:hover {
  background: var(--bg-secondary);
  transform: translateX(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.back-button-fixed svg {
  transition: transform 0.3s ease;
}

.back-button-fixed:hover svg {
  transform: translateX(-3px);
}

.project-hero {
  padding: 140px 24px 80px;
  min-height: 50vh;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px 16px;
  border-radius: 50px;
  color: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
}

.project-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -0.03em;
}

.project-tagline {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  opacity: 0.9;
  margin-bottom: 24px;
  line-height: 1.5;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.95rem;
  opacity: 0.8;
}

.meta-divider {
  opacity: 0.5;
}

.project-content {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 60px;
}

.content-block {
  margin-bottom: 48px;
}

.block-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16/10;
  background: var(--bg-secondary);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.video-container {
  border-radius: 16px;
  overflow: hidden;
}

.video-container video {
  width: 100%;
  display: block;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-block {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-block:last-child {
  border-bottom: none;
}

.sidebar-title {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.sidebar-text {
  color: var(--text-secondary);
}

.links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-button.primary {
  background: var(--accent-color);
  color: white;
}

.link-button.primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.link-button.secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.link-button.secondary:hover {
  background: var(--bg-tertiary);
  transform: translateY(-2px);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: var(--bg-secondary);
  padding: 8px 14px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.feature-item svg {
  color: var(--accent-color);
  flex-shrink: 0;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  cursor: zoom-out;
}

.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 12px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }

  .sidebar-block {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}

@media (max-width: 768px) {
  .project-hero {
    padding: 120px 20px 60px;
    min-height: auto;
  }

  .project-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .meta-divider {
    display: none;
  }

  .project-content {
    padding: 60px 20px;
  }

  .sidebar {
    grid-template-columns: 1fr;
  }

  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>
