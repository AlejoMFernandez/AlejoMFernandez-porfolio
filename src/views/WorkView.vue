<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import Footer from '../components/Footer.vue'

const { t } = useI18n()
const { l } = useLocalized()

const allProjects = computed(() =>
  [...projects].sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
)

const isCoverSvg = (p) => Boolean(p?.imagenPrincipal?.endsWith('.svg'))
const isLogoMain = (p) => Boolean(p?.logo && p?.imagenPrincipal === p.logo)

const formatYear = (dateStr) => {
  if (!dateStr) return ''
  return String(dateStr).slice(0, 4)
}

onMounted(() => {
  gsap.from('.project-row', { y: 32, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.15 })
})
</script>

<template>
  <div class="work-view">
    <div class="work-inner">

      <!-- Page header -->
      <header class="work-header">
        <span class="work-eyebrow">{{ t('nav.work').toUpperCase() }}</span>
        <h1 class="work-title">Selected work.</h1>
        <p class="work-sub">{{ allProjects.length }} {{ t('work.totalProjects') }}</p>
      </header>

      <section class="projects-section">
        <ul class="projects-list">
          <li
            v-for="(project, i) in allProjects"
            :key="project.id"
            class="project-row"
          >
            <RouterLink :to="`/proyecto/${project.id}`" class="project-link">

              <!-- Index -->
              <span class="project-index">{{ String(i + 1).padStart(2, '0') }}</span>

              <!-- Center: name + desc -->
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

              <!-- Cover thumbnail (the new graphic protagonist) -->
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

              <!-- Arrow -->
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
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 64px;
}

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
}

@media (max-width: 768px) {
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
  .project-cover {
    /* On very small screens, hide the thumbnail to keep readability */
    display: none;
  }
  .project-index { font-size: 0.7rem; }
  .project-meta-row { font-size: 0.65rem; }
}
</style>
