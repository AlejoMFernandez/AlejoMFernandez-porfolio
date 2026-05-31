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

const project = computed(() => projects.find(p => p.id === route.params.id))

const isCoverSvg = computed(() => Boolean(project.value?.imagenPrincipal?.endsWith('.svg')))
const isLogoMain = computed(() => {
  if (!project.value) return false
  return Boolean(project.value.logo && project.value.imagenPrincipal === project.value.logo)
})

const projectGallery = computed(() => {
  if (!project.value) return []
  const manual = project.value.imagenes
  if (manual && manual.length > 0) return manual
  return galleries[project.value.id] || []
})

watch(project, (p) => { if (!p) router.push('/') }, { immediate: true })

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr === 'Actualidad' || dateStr === 'Present') return t('common.present')
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const monthsEs = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const months = locale.value === 'es' ? monthsEs : monthsEn
  return `${months[parseInt(month) - 1]} ${year}`
}

const selectedIndex = ref(null)
const selectedImage = computed(() =>
  selectedIndex.value !== null ? projectGallery.value[selectedIndex.value] : null
)
const openLightbox  = (i) => { selectedIndex.value = i }
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
  if (e.key === 'Escape')      closeLightbox()
  if (e.key === 'ArrowLeft')   prevImage()
  if (e.key === 'ArrowRight')  nextImage()
}

const goBack = () => {
  window.history.state?.back ? router.back() : router.push('/proyectos')
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  gsap.from('.back-btn', { opacity: 0, x: -14, duration: 0.45, ease: 'power3.out' })
  gsap.from('.pv-cover', { opacity: 0, y: 36, duration: 0.9, ease: 'power3.out', delay: 0.05 })
  gsap.from('.pv-head',  { opacity: 0, y: 20, duration: 0.65, ease: 'power3.out', delay: 0.3 })
  gsap.from('.pv-tagline', { opacity: 0, y: 14, duration: 0.55, ease: 'power3.out', delay: 0.4 })
  gsap.from(['.pv-meta', '.pv-desc-col'], {
    opacity: 0, y: 22, duration: 0.65, stagger: 0.12, ease: 'power3.out', delay: 0.5
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <div class="project-view" v-if="project">

    <!-- ===== BACK BUTTON ===== -->
    <button @click="goBack" class="back-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      {{ t('project.back') }}
    </button>

    <!-- ===== COVER ===== -->
    <section class="pv-cover-wrap">
      <div
        class="pv-cover"
        :class="{ 'is-svg': isCoverSvg, 'is-logo': isLogoMain && !isCoverSvg }"
        :style="{ background: project.colorFondo }"
      >
        <img
          v-if="project.imagenPrincipal"
          :src="project.imagenPrincipal"
          :alt="project.nombre"
        />
        <div v-if="!isCoverSvg" class="pv-cover-name">{{ project.nombre }}</div>
      </div>
    </section>

    <!-- ===== MASTHEAD ===== -->
    <div class="pv-inner">
      <div class="pv-rule"></div>
      <div class="pv-head">
        <h1 class="pv-name">{{ project.nombre }}</h1>
        <span class="pv-tipo">{{ project.tipo }}</span>
      </div>
      <p class="pv-tagline">{{ l(project.descripcionCorta) }}</p>
      <div class="pv-rule"></div>
    </div>

    <!-- ===== BODY GRID: meta + description ===== -->
    <section class="pv-body">
      <div class="pv-inner">
        <div class="pv-body-grid">

          <!-- Meta sidebar -->
          <aside class="pv-meta">

            <div v-if="project.cliente" class="pv-meta-item">
              <p class="pv-meta-label">{{ t('project.client') }}</p>
              <p class="pv-meta-value">{{ project.cliente }}</p>
            </div>

            <div class="pv-meta-item">
              <p class="pv-meta-label">Período</p>
              <p class="pv-meta-value">
                {{ formatDate(project.fechaInicio) }}
                <span v-if="project.fechaFin"> → {{ formatDate(project.fechaFin) }}</span>
              </p>
            </div>

            <div class="pv-meta-item">
              <p class="pv-meta-label">{{ t('project.role') }}</p>
              <p class="pv-meta-value">{{ l(project.rol) }}</p>
            </div>

            <div class="pv-meta-item">
              <p class="pv-meta-label">Stack</p>
              <div class="pv-stack">
                <span v-for="tech in project.tecnologias" :key="tech" class="pv-tech">{{ tech }}</span>
              </div>
            </div>

            <div class="pv-links">
              <a
                v-if="project.linkDemo"
                :href="project.linkDemo"
                target="_blank"
                rel="noopener"
                class="pv-link pv-link--primary"
              >
                {{ t('project.viewSite') }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
              <a
                v-if="project.linkGithub"
                :href="project.linkGithub"
                target="_blank"
                rel="noopener"
                class="pv-link"
              >
                GitHub
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>

          </aside>

          <!-- Description -->
          <div class="pv-desc-col">
            <p class="pv-desc">{{ l(project.descripcionLarga) }}</p>

            <ul v-if="l(project.features)?.length" class="pv-features">
              <li v-for="feature in l(project.features)" :key="feature">
                <span class="pv-feature-dash" aria-hidden="true">—</span>
                {{ feature }}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- ===== GALLERY ===== -->
    <section v-if="projectGallery.length" class="pv-gallery-section">
      <div class="pv-inner">
        <div class="pv-rule"></div>
        <div class="pv-gallery">
          <div
            v-for="(img, i) in projectGallery"
            :key="i"
            class="pv-gallery-item"
            @click="openLightbox(i)"
            role="button"
            :aria-label="`Screenshot ${i + 1}`"
          >
            <img :src="img" :alt="`${project.nombre} screenshot ${i + 1}`" />
          </div>
        </div>
      </div>
    </section>

    <Footer />

    <!-- ===== LIGHTBOX ===== -->
    <Teleport to="body">
      <Transition name="lb">
        <div v-if="selectedImage !== null" class="lightbox" @click.self="closeLightbox">
          <button class="lb-close" @click="closeLightbox" aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <button v-if="projectGallery.length > 1" class="lb-nav lb-prev" @click="prevImage" aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <img :src="selectedImage" @click.stop />
          <button v-if="projectGallery.length > 1" class="lb-nav lb-next" @click="nextImage" aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <p class="lb-counter">{{ selectedIndex + 1 }} / {{ projectGallery.length }}</p>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped>
.project-view {
  min-height: 100vh;
}

/* ===== BACK BUTTON ===== */
.back-btn {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 200;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-primary-alpha);
  border: 1px solid var(--border-color);
  padding: 10px 18px;
  border-radius: 50px;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    color 0.2s var(--ease-out),
    background 0.2s var(--ease-out),
    border-color 0.2s var(--ease-out);
}

.back-btn:active {
  transform: scale(0.96);
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .back-btn:hover {
    color: var(--text-primary);
    background: var(--bg-secondary);
    border-color: var(--border-color);
  }
}

/* ===== COVER ===== */
.pv-cover-wrap {
  padding: 92px 48px 0;
}

.pv-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

.pv-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 8px;
  overflow: hidden;
  isolation: isolate;
}

.pv-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 1;
}

.pv-cover.is-logo img {
  object-fit: contain;
  padding: 8% 14%;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
}

.pv-cover-name {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  z-index: 2;
  pointer-events: none;
  text-align: center;
  padding: 0 24px;
}

/* ===== MASTHEAD ===== */
.pv-rule {
  width: 100%;
  height: 1px;
  background: var(--border-color);
}

.pv-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 0 16px;
  flex-wrap: wrap;
}

.pv-name {
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--text-primary);
}

.pv-tipo {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-tertiary);
  flex-shrink: 0;
  align-self: center;
}

.pv-tagline {
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 760px;
  padding-bottom: 28px;
}

/* ===== BODY GRID ===== */
.pv-body {
  padding: 56px 0 72px;
}

.pv-body-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 72px;
  align-items: start;
}

/* Meta sidebar */
.pv-meta {
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: sticky;
  top: 96px;
}

.pv-meta-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pv-meta-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-tertiary);
}

.pv-meta-value {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.pv-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}

.pv-tech {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 4px 12px;
  border-radius: 50px;
  transition:
    color 0.18s var(--ease-out),
    background 0.18s var(--ease-out);
}

.pv-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 8px;
}

.pv-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition:
    color 0.2s var(--ease-out),
    background 0.2s var(--ease-out),
    border-color 0.2s var(--ease-out);
}

.pv-link:active {
  transform: scale(0.97);
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .pv-link:hover {
    color: var(--text-primary);
    background: var(--bg-secondary);
  }
}

.pv-link--primary {
  background: var(--text-primary);
  color: var(--bg-primary);
  border-color: var(--text-primary);
}

@media (hover: hover) and (pointer: fine) {
  .pv-link--primary:hover {
    opacity: 0.85;
    background: var(--text-primary);
    color: var(--bg-primary);
  }
}

/* Description */
.pv-desc-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.pv-desc {
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.85;
  color: var(--text-secondary);
}

.pv-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  padding: 0;
  border-top: 1px solid var(--border-color);
  padding-top: 28px;
}

.pv-features li {
  display: flex;
  align-items: baseline;
  gap: 14px;
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.pv-feature-dash {
  color: var(--text-tertiary);
  flex-shrink: 0;
  font-weight: 300;
}

/* ===== GALLERY ===== */
.pv-gallery-section {
  padding: 0 0 72px;
}

.pv-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 36px;
}

.pv-gallery-item {
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg-secondary);
  cursor: zoom-in;
}

.pv-gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.45s var(--ease-out);
}

.pv-gallery-item:active {
  opacity: 0.85;
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .pv-gallery-item:hover img {
    transform: scale(1.03);
  }
}

/* ===== LIGHTBOX ===== */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.96);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  cursor: zoom-out;
}

.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  cursor: default;
}

.lb-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s var(--ease-out), color 0.18s var(--ease-out);
}

.lb-close:active { transform: scale(0.9); transition-duration: 0.08s; }

@media (hover: hover) and (pointer: fine) {
  .lb-close:hover { background: rgba(255, 255, 255, 0.18); color: #fff; }
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.18s var(--ease-out),
    color 0.18s var(--ease-out),
    transform 0.18s var(--ease-out);
}

.lb-nav:active { opacity: 0.7; transition-duration: 0.08s; }

@media (hover: hover) and (pointer: fine) {
  .lb-nav:hover { background: rgba(255, 255, 255, 0.18); color: #fff; }
}

.lb-prev { left: 20px; }
.lb-next { right: 20px; }

@media (hover: hover) and (pointer: fine) {
  .lb-prev:hover { transform: translateY(-50%) translateX(-2px); }
  .lb-next:hover { transform: translateY(-50%) translateX(2px); }
}

.lb-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
}

/* Lightbox transition */
.lb-enter-active,
.lb-leave-active { transition: opacity 0.22s var(--ease-out); }
.lb-enter-from,
.lb-leave-to { opacity: 0; }

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .pv-body-grid {
    grid-template-columns: 180px 1fr;
    gap: 48px;
  }
}

@media (max-width: 768px) {
  .pv-cover-wrap { padding: 88px 24px 0; }
  .pv-inner { padding: 0 24px; }
  .pv-body { padding: 40px 0 56px; }
  .pv-gallery-section { padding: 0 0 56px; }
  .pv-body-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .pv-meta { position: static; flex-direction: row; flex-wrap: wrap; gap: 20px 32px; }
  .pv-meta-item { min-width: 120px; }
  .pv-links { flex-direction: row; flex-wrap: wrap; }
}

@media (max-width: 520px) {
  .pv-cover-wrap { padding: 80px 16px 0; }
  .pv-inner { padding: 0 16px; }
  .pv-cover { aspect-ratio: 4 / 3; border-radius: 6px; }
  .pv-body { padding: 32px 0 48px; }
  .pv-gallery-section { padding: 0 0 48px; }
  .pv-gallery { grid-template-columns: 1fr; }
  .pv-meta { flex-direction: column; }
  .lb-prev { left: 10px; }
  .lb-next { right: 10px; }
  .lightbox { padding: 32px 12px; }
}
</style>
