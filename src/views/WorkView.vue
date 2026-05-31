<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import Footer from '../components/Footer.vue'

const { t } = useI18n()
const { l } = useLocalized()

// 'grid' = new default square-graphic view | 'list' = original list view
const viewMode = ref('list')

const allProjects = computed(() =>
  [...projects].sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
)

const isCoverSvg = (p) => Boolean(p?.imagenPrincipal?.endsWith('.svg'))
const isLogoMain = (p) => Boolean(p?.logo && p?.imagenPrincipal === p.logo)

const formatYear = (dateStr) => {
  if (!dateStr) return ''
  return String(dateStr).slice(0, 4)
}

const animateList = () => {
  gsap.from('.project-row', { y: 32, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 })
}

const animateGrid = () => {
  gsap.from('.grid-card', { scale: 0.94, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.05 })
}

watch(viewMode, (v) => {
  if (v === 'list') {
    requestAnimationFrame(() => animateList())
  } else {
    requestAnimationFrame(() => animateGrid())
  }
})

onMounted(() => {
  animateList()
})
</script>

<template>
  <div class="work-view">
    <div class="work-inner">

      <!-- Page header -->
      <header class="work-header">
        <div class="work-header-top">
          <div>
            <span class="work-eyebrow">{{ t('nav.work').toUpperCase() }}</span>
            <h1 class="work-title">Selected work.</h1>
            <p class="work-sub">{{ allProjects.length }} {{ t('work.totalProjects') }}</p>
          </div>
          <!-- View toggle -->
          <div class="view-toggle" role="group" aria-label="View mode">
            <button
              class="toggle-btn"
              :class="{ 'is-active': viewMode === 'grid' }"
              @click="viewMode = 'grid'"
              aria-label="Grid view"
            >
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <rect x="2"  y="2"  width="7" height="7" rx="1.5"/>
                <rect x="11" y="2"  width="7" height="7" rx="1.5"/>
                <rect x="2"  y="11" width="7" height="7" rx="1.5"/>
                <rect x="11" y="11" width="7" height="7" rx="1.5"/>
              </svg>
            </button>
            <button
              class="toggle-btn"
              :class="{ 'is-active': viewMode === 'list' }"
              @click="viewMode = 'list'"
              aria-label="List view"
            >
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <rect x="2" y="4"  width="16" height="2.5" rx="1.2"/>
                <rect x="2" y="9"  width="16" height="2.5" rx="1.2"/>
                <rect x="2" y="14" width="16" height="2.5" rx="1.2"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- ── GRID VIEW (default) ── -->
      <section v-if="viewMode === 'grid'" class="projects-grid-section">
        <div class="grid-3">
          <RouterLink
            v-for="project in allProjects"
            :key="project.id"
            :to="`/proyecto/${project.id}`"
            class="grid-card"
            :style="{ background: project.colorFondo }"
          >
            <img
              v-if="project.imagenPrincipal"
              :src="project.imagenPrincipal"
              :alt="project.nombre"
              class="grid-cover"
              loading="lazy"
            />
            <!-- Hover overlay: project name -->
            <div class="grid-overlay">
              <span class="grid-name">{{ project.nombre }}</span>
              <span class="grid-tipo">{{ project.tipo }}</span>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- ── LIST VIEW ── -->
      <section v-else class="projects-section">
        <ul class="projects-list">
          <li
            v-for="(project, i) in allProjects"
            :key="project.id"
            class="project-row"
          >
            <RouterLink :to="`/proyecto/${project.id}`" class="project-link">
              <span class="project-index">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="project-center">
                <h3 class="project-name">{{ project.nombre }}</h3>
                <p class="project-desc">{{ l(project.descripcionCorta) }}</p>
                <div class="project-meta-row">
                  <span class="project-tipo">{{ project.tipo }}</span>
                  <span class="project-sep">·</span>
                  <span class="project-year">{{ formatYear(project.fechaInicio) }}</span>
                  <span class="project-sep">·</span>
                  <span class="project-techs">{{ project.tecnologias.slice(0, 3).join(' / ') }}</span>
                </div>
              </div>
              <div
                class="project-cover"
                :class="{ 'is-svg': isCoverSvg(project), 'is-logo': isLogoMain(project) && !isCoverSvg(project) }"
                :style="{ background: project.colorFondo }"
              >
                <img
                  v-if="project.imagenPrincipal"
                  :src="project.imagenPrincipal"
                  :alt="project.nombre"
                  loading="lazy"
                />
              </div>
              <svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
          </li>
        </ul>
      </section>

    </div>
    <Footer />
  </div>
</template>

<style scoped>
.work-view {
  min-height: 100vh;
}

.work-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 130px 48px 80px;
}

/* ---- Page header ---- */
.work-header {
  margin-bottom: 48px;
}

.work-header-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

/* ---- View toggle ---- */
.view-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 4px;
  flex-shrink: 0;
  margin-bottom: 6px; /* align with sub text baseline */
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
}

.toggle-btn.is-active {
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

@media (hover: hover) and (pointer: fine) {
  .toggle-btn:not(.is-active):hover {
    color: var(--text-secondary);
    background: var(--bg-secondary);
  }
}

/* ---- Grid view ---- */
.projects-grid-section {
  margin-top: 8px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.grid-card {
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--border-color);
  transition: transform 0.30s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.30s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.grid-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Show the left (graphic) half of each 1600×1000 SVG cover */
  object-position: 0% 50%;
  transition: transform 0.40s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.22s ease;
  padding: 20px;
}

.grid-name {
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  text-align: center;
  line-height: 1.1;
}

.grid-tipo {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

@media (hover: hover) and (pointer: fine) {
  .grid-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 48px -8px rgba(0, 0, 0, 0.35);
  }
  .grid-card:hover .grid-cover {
    transform: scale(1.05);
  }
  .grid-card:hover .grid-overlay {
    opacity: 1;
  }
}

.grid-card:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
}

/* Mobile: always show overlay label */
@media (hover: none) {
  .grid-overlay {
    opacity: 1;
    background: linear-gradient(to top, rgba(0,0,0,0.65), transparent 60%);
    justify-content: flex-end;
    padding-bottom: 16px;
  }
  .grid-tipo { display: none; }
}

/* ---- Page header continued ---- */

.work-eyebrow {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--accent-color);
}

.work-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--text-primary);
}

.work-sub {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
}

/* ---- Project list ---- */
.projects-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--border-color);
}

.project-row {
  border-bottom: 1px solid var(--border-color);
}

.project-link {
  display: grid;
  grid-template-columns: 56px 1fr 220px 30px;
  align-items: center;
  gap: 36px;
  padding: 28px 0;
  text-decoration: none;
  color: var(--text-primary);
  transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-link:hover {
  padding-left: 12px;
}

.project-link:hover .project-name {
  color: var(--accent-color);
}

.project-link:hover .project-arrow {
  transform: translateX(6px);
  color: var(--accent-color);
}

.project-link:hover .project-cover {
  transform: scale(1.04);
  border-color: rgba(56, 189, 248, 0.35);
}

.project-link:hover .project-cover img {
  transform: scale(1.08);
}

.project-index {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.project-center {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.project-name {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  transition: color 0.3s ease;
}

.project-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 540px;
}

.project-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
}

.project-tipo {
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-color);
  font-size: 0.65rem;
}

.project-sep {
  opacity: 0.35;
}

.project-year {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.project-techs {
  font-weight: 500;
}

/* ---- Cover thumbnail (the protagonist) ---- */
.project-cover {
  position: relative;
  width: 220px;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition:
    transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s ease,
    box-shadow 0.4s ease;
  will-change: transform;
}

.project-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* SVG covers: fill perfectly */
.project-cover.is-svg img {
  object-fit: cover;
}

/* Logo-as-main (legacy): show centered with padding */
.project-cover.is-logo img {
  object-fit: contain;
  padding: 12%;
}

.project-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .work-inner { padding: 120px 32px 60px; }
  .project-link {
    grid-template-columns: 48px 1fr 180px 28px;
    gap: 28px;
  }
  .project-cover { width: 180px; }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .work-header-top { flex-direction: column; align-items: flex-start; gap: 16px; }
  .view-toggle { margin-bottom: 0; }
  .project-link {
    grid-template-columns: 40px 1fr 130px 24px;
    gap: 20px;
    padding: 24px 0;
  }
  .project-cover { width: 130px; }
  .project-name { font-size: clamp(1.4rem, 5vw, 1.9rem); }
  .project-desc { display: none; }
}

@media (max-width: 540px) {
  .work-inner { padding: 100px 20px 48px; }
  .project-link {
    grid-template-columns: 32px 1fr 22px;
    gap: 16px;
  }
  .project-cover { display: none; }
  .project-index { font-size: 0.7rem; }
  .project-meta-row { font-size: 0.65rem; }
  .grid-3 { gap: 8px; }
}
</style>
