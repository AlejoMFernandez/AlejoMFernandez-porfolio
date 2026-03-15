<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import galleries from '../data/galleries.json'
import Footer from '../components/Footer.vue'

const { t, locale } = useI18n()
const { l } = useLocalized()
const route = useRoute()
const router = useRouter()

const project = computed(() => {
  return projects.find(p => p.id === route.params.id)
})

// Galería: usa imagenes del JSON si están definidas, si no auto-carga desde galleries.json
const projectGallery = computed(() => {
  if (!project.value) return []
  const manual = project.value.imagenes
  if (manual && manual.length > 0) return manual
  return galleries[project.value.id] || []
})

// Si no existe el proyecto, redirigir a home
watch(project, (newProject) => {
  if (!newProject) {
    router.push('/')
  }
}, { immediate: true })

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr === 'Actualidad' || dateStr === 'Present') {
    return t('common.present')
  }
  const [year, month] = dateStr.split('-')
  const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const months = locale.value === 'es' ? monthsEs : monthsEn
  return `${months[parseInt(month) - 1]} ${year}`
}

const selectedIndex = ref(null)
const selectedImage = computed(() =>
  selectedIndex.value !== null ? projectGallery.value[selectedIndex.value] : null
)

const openLightbox = (index) => { selectedIndex.value = index }
const closeLightbox = () => { selectedIndex.value = null }

const prevImage = () => {
  if (selectedIndex.value === null) return
  selectedIndex.value = (selectedIndex.value - 1 + projectGallery.value.length) % projectGallery.value.length
}
const nextImage = () => {
  if (selectedIndex.value === null) return
  selectedIndex.value = (selectedIndex.value + 1) % projectGallery.value.length
}

const handleKey = (e) => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

const goBack = () => {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.push('/proyectos')
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})

onMounted(() => {
  window.addEventListener('keydown', handleKey)
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
    <!-- Back button fijo -->
    <button @click="goBack" class="back-button-fixed">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      {{ t('project.back') }}
    </button>
    
    <!-- Bento Dashboard Layout -->
    <div class="bento-container">
      <div class="bento-wrap">

        <!-- Grid bento superior -->
        <div class="bento-grid">

          <!-- Celda nombre + tipo: col 1, rows 1+2 -->
          <div class="b-cell b-name-cell" :style="{ background: project.colorFondo }">
            <span class="b-tipo" :style="{ color: project.colorTexto }">
              {{ String(project.orden).padStart(2, '0') }} — {{ project.tipo }}
            </span>
            <h1 class="b-title" :style="{ color: project.colorTexto }">{{ project.nombre }}</h1>
            <p class="b-tagline" :style="{ color: project.colorTexto }">{{ l(project.descripcionCorta) }}</p>
            <div class="b-links">
              <a v-if="project.linkDemo" :href="project.linkDemo" target="_blank" :style="{ color: project.colorTexto }">{{ t('project.viewSite') }} ↗</a>
              <a v-if="project.linkGithub" :href="project.linkGithub" target="_blank" :style="{ color: project.colorTexto }">GitHub ↗</a>
            </div>
          </div>

          <!-- Celda imagen: col 2, rows 1+2 -->
          <div class="b-cell b-img-cell" :style="{ background: project.colorFondo }">
            <img v-if="project.imagenPrincipal" :src="project.imagenPrincipal" :alt="project.nombre" />
          </div>

          <!-- Celda meta: col 3, row 1 -->
          <div class="b-cell b-meta-cell">
            <div v-if="project.cliente">
              <p class="b-ml">{{ t('project.client') }}</p>
              <p class="b-mv">{{ project.cliente }}</p>
            </div>
            <div>
              <p class="b-ml" :style="project.cliente ? 'margin-top:16px' : ''">Período</p>
              <p class="b-mv">{{ formatDate(project.fechaInicio) }} — {{ formatDate(project.fechaFin) }}</p>
            </div>
            <div>
              <p class="b-ml" style="margin-top:16px">Rol</p>
              <p class="b-mv">{{ l(project.rol) }}</p>
            </div>
          </div>

          <!-- Celda tecnologías: col 3, row 2 -->
          <div class="b-cell b-tech-cell">
            <p class="b-ml">Stack</p>
            <div class="b-techs">
              <span v-for="tech in project.tecnologias" :key="tech">{{ tech }}</span>
            </div>
          </div>

          <!-- Celda features: full width row 3 -->
          <div class="b-cell b-feat-cell" v-if="l(project.features)?.length">
            <p class="b-ml">{{ t('project.features') }}</p>
            <ul class="b-features">
              <li v-for="feature in l(project.features)" :key="feature">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>

        </div>

        <!-- Descripción -->
        <div class="b-desc-section">
          <h3 class="b-block-title">{{ t('project.about') }}</h3>
          <p class="b-desc">{{ l(project.descripcionLarga) }}</p>
        </div>

        <!-- Galería masonry -->
        <div v-if="projectGallery.length">
          <h3 class="b-block-title">{{ t('project.gallery') }}</h3>
          <div class="b-gallery">
            <div
              v-for="(img, index) in projectGallery"
              :key="index"
              class="b-gallery-item"
              @click="openLightbox(index)"
            >
              <img :src="img" :alt="`Screenshot ${index + 1}`" />
            </div>
          </div>
        </div>

      </div>
    </div><!-- end bento-container -->

    <Footer />

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="selectedImage" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="lightbox-prev" @click="prevImage">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <img :src="selectedImage" @click.stop />
        <button class="lightbox-next" @click="nextImage">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <div class="lightbox-counter">{{ selectedIndex + 1 }} / {{ projectGallery.length }}</div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.project-view {
  min-height: 100vh;
}

/* ─── Back button fijo ─── */
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

/* ─── Bento Dashboard ─── */
.bento-container {
  padding: 100px 48px 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.bento-wrap {
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-primary);
  padding: 32px;
}

.bento-grid {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
  margin-bottom: 12px;
}

.b-cell {
  border-radius: 14px;
  padding: 28px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* col 1, rows 1+2 */
.b-name-cell {
  grid-column: 1;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* col 2, rows 1+2 */
.b-img-cell {
  grid-column: 2;
  grid-row: 1 / 3;
  padding: 0;
  overflow: hidden;
}

.b-img-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

/* col 3, row 1 */
.b-meta-cell {
  grid-column: 3;
  grid-row: 1;
}

/* col 3, row 2 */
.b-tech-cell {
  grid-column: 3;
  grid-row: 2;
}

/* row 3: full width */
.b-feat-cell {
  grid-column: 1 / 4;
  padding: 20px 28px;
}

.b-tipo {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.65;
}

.b-title {
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 4px 0 8px;
}

.b-tagline {
  font-size: 0.85rem;
  opacity: 0.75;
  line-height: 1.55;
  flex: 1;
}

.b-links {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.b-links a {
  flex: 1;
  text-align: center;
  padding: 9px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.2s;
}

.b-links a:hover {
  background: rgba(255, 255, 255, 0.25);
}

.b-ml {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 3px;
}

.b-mv {
  font-size: 0.88rem;
  color: var(--text-primary);
  font-weight: 500;
}

.b-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.b-techs span {
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 3px 10px;
  border-radius: 50px;
}

.b-features {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}

.b-features li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.b-features svg {
  color: var(--accent-color);
  flex-shrink: 0;
}

.b-desc-section {
  padding: 32px 0 24px;
  border-top: 1px solid var(--border-color);
  margin-top: 20px;
}

.b-block-title {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 14px;
}

.b-desc {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 760px;
}

/* Galería masonry */
.b-gallery {
  columns: 4;
  column-gap: 8px;
  margin-top: 12px;
  margin-bottom: 8px;
}

.b-gallery-item {
  break-inside: avoid;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  cursor: zoom-in;
  background: var(--bg-secondary);
}

.b-gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s, filter 0.4s;
}

.b-gallery-item:hover img {
  transform: scale(1.03);
  filter: brightness(1.08);
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .bento-container {
    padding: 80px 24px 60px;
  }

  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }

  .b-name-cell {
    grid-column: 1;
    grid-row: auto;
  }

  .b-img-cell {
    grid-column: 2;
    grid-row: auto;
    height: 280px;
  }

  .b-meta-cell,
  .b-tech-cell {
    grid-column: auto;
    grid-row: auto;
  }

  .b-feat-cell {
    grid-column: 1 / 3;
  }

  .b-gallery {
    columns: 3;
  }
}

@media (max-width: 640px) {
  .bento-container {
    padding: 70px 16px 48px;
  }

  .bento-wrap {
    padding: 16px;
  }

  .bento-grid {
    grid-template-columns: 1fr;
  }

  .b-img-cell {
    grid-column: auto;
    height: 200px;
  }

  .b-img-cell img {
    object-position: center;
  }

  .b-feat-cell {
    grid-column: auto;
  }

  .b-gallery {
    columns: 2;
  }
}

/* ─── Lightbox ─── */
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
  z-index: 10;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 14px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-prev { left: 24px; }
.lightbox-next { right: 24px; }

.lightbox-prev:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) translateX(-2px);
}

.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) translateX(2px);
}

.lightbox-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}
</style>
