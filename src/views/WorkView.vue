<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import Footer from '../components/Footer.vue'

// Square graphic-only animated tiles for the grid view
import InkmanagerTile from '../components/covers/InkmanagerTile.vue'
import PolyfuseTile from '../components/covers/PolyfuseTile.vue'
import PatagoniaTile from '../components/covers/PatagoniaTile.vue'
import GoaldemyTile from '../components/covers/GoaldemyTile.vue'
import FranzaTile from '../components/covers/FranzaTile.vue'
import ArianaTile from '../components/covers/ArianaTile.vue'
import PuraaTile from '../components/covers/PuraaTile.vue'
import TramaTile from '../components/covers/TramaTile.vue'
import CaleidoTile from '../components/covers/CaleidoTile.vue'
import HearthTile from '../components/covers/HearthTile.vue'
import ChampionsTile from '../components/covers/ChampionsTile.vue'
import ItalnetTile from '../components/covers/ItalnetTile.vue'
import FenalixTile from '../components/covers/FenalixTile.vue'
import HardlabTile from '../components/covers/HardlabTile.vue'

const { t } = useI18n()
const { l } = useLocalized()

// 'grid' = square-graphic view | 'list' = default list view
const viewMode = ref('list')

// 'desc' = newest year first | 'asc' = oldest year first
const sortOrder = ref('desc')

const allProjects = computed(() =>
  [...projects].sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
)

// Group projects by year (from fechaInicio), year buckets sorted by sortOrder.
// Within each year, items keep their orden ranking.
const groupedProjects = computed(() => {
  const byYear = new Map()
  for (const p of allProjects.value) {
    const year = String(p.fechaInicio || '').slice(0, 4) || '----'
    if (!byYear.has(year)) byYear.set(year, [])
    byYear.get(year).push(p)
  }
  const years = [...byYear.keys()].sort((a, b) =>
    sortOrder.value === 'desc' ? Number(b) - Number(a) : Number(a) - Number(b)
  )
  return years.map((year) => ({ year, items: byYear.get(year) }))
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

// Map project id -> animated square tile (image fallback when none)
const tileMap = {
  inkmanager: InkmanagerTile,
  polyfuse: PolyfuseTile,
  'patagonia-refugio': PatagoniaTile,
  goaldemy: GoaldemyTile,
  franza: FranzaTile,
  arianadeviaje: ArianaTile,
  puraa: PuraaTile,
  'trama-estudio': TramaTile,
  caleido: CaleidoTile,
  'hearth-and-hall': HearthTile,
  'champions-dle': ChampionsTile,
  italnet: ItalnetTile,
  fenalix: FenalixTile,
  hardlab: HardlabTile
}
const tileFor = (id) => tileMap[id] || null

const isCoverSvg = (p) => Boolean(p?.imagenPrincipal?.endsWith('.svg'))
const isLogoMain = (p) => Boolean(p?.logo && p?.imagenPrincipal === p.logo)

// Respect the user's reduced-motion preference for all JS-driven motion
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Staggered reveal of the current layout's items
const staggerIn = (items, isGrid) => {
  if (!items || !items.length || prefersReduced()) return
  gsap.from(items, {
    y: isGrid ? 14 : 32,
    opacity: 0,
    duration: isGrid ? 0.5 : 0.7,
    stagger: isGrid ? 0.04 : 0.08,
    ease: 'power3.out'
  })
}

// List <-> grid swap: CSS handles the leave fade; the incoming layout
// staggers in here. Firing from the Transition @enter hook guarantees the
// new section is in the DOM (pre-paint) under mode="out-in", so no flash.
const onViewEnter = (el, done) => {
  const isGrid = viewMode.value === 'grid'
  staggerIn(el.querySelectorAll(isGrid ? '.grid-card' : '.project-row'), isGrid)
  done()
}

// Sort flips keep the same section mounted, so re-stagger in place
const runEntrance = () => {
  requestAnimationFrame(() => {
    const isGrid = viewMode.value === 'grid'
    const root = document.querySelector(isGrid ? '.projects-grid-section' : '.projects-section')
    if (root) staggerIn(root.querySelectorAll(isGrid ? '.grid-card' : '.project-row'), isGrid)
  })
}

watch(sortOrder, runEntrance)

onMounted(() => {
  staggerIn(document.querySelectorAll('.project-row'), false)
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

          <div class="header-controls">
            <!-- Sort by year toggle -->
            <button
              class="sort-btn"
              @click="toggleSort"
              :aria-label="sortOrder === 'desc' ? t('work.sortNewest') : t('work.sortOldest')"
            >
              <svg
                class="sort-icon"
                :class="{ 'is-asc': sortOrder === 'asc' }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
              <span class="sort-label">
                {{ sortOrder === 'desc' ? t('work.sortNewest') : t('work.sortOldest') }}
              </span>
            </button>

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
        </div>
      </header>

      <Transition name="view" mode="out-in" @enter="onViewEnter">

        <!-- ── GRID VIEW ── -->
        <section v-if="viewMode === 'grid'" key="grid" class="projects-grid-section">
          <div
            v-for="group in groupedProjects"
            :key="group.year"
            class="year-group"
          >
            <header class="year-header">
              <h2 class="year-title">{{ group.year }}</h2>
              <span class="year-count">{{ group.items.length }} {{ t('work.projects') }}</span>
            </header>
            <div class="grid-3">
              <RouterLink
                v-for="project in group.items"
                :key="project.id"
                :to="`/proyecto/${project.id}`"
                class="grid-card"
                :style="{ background: project.colorFondo }"
              >
                <div v-if="tileFor(project.id)" class="grid-tile">
                  <component :is="tileFor(project.id)" />
                </div>
                <img
                  v-else-if="project.imagenPrincipal"
                  :src="project.imagenPrincipal"
                  :alt="project.nombre"
                  class="grid-cover"
                  loading="lazy"
                />
                <div class="grid-overlay">
                  <span class="grid-name">{{ project.nombre }}</span>
                  <span class="grid-tipo">{{ project.tipo }}</span>
                </div>
              </RouterLink>
            </div>
          </div>
        </section>

        <!-- ── LIST VIEW ── -->
        <section v-else key="list" class="projects-section">
          <div
            v-for="group in groupedProjects"
            :key="group.year"
            class="year-group"
          >
            <header class="year-header">
              <h2 class="year-title">{{ group.year }}</h2>
              <span class="year-count">{{ group.items.length }} {{ t('work.projects') }}</span>
            </header>
            <ul class="projects-list">
              <li
                v-for="(project, i) in group.items"
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
          </div>
        </section>

      </Transition>

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
  margin-bottom: 64px;
}

.work-header-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-bottom: 6px;
}

/* ---- Sort by year toggle ---- */
.sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 14px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.12s var(--ease-out);
}

.sort-icon {
  flex-shrink: 0;
  color: var(--accent-color);
  transition: transform 0.34s cubic-bezier(0.4, 0, 0.2, 1);
}

.sort-icon.is-asc {
  transform: rotate(180deg);
}

.sort-label {
  display: inline-block;
}

.sort-btn:active {
  transform: scale(0.96);
}

@media (hover: hover) and (pointer: fine) {
  .sort-btn:hover {
    color: var(--text-primary);
    border-color: var(--text-secondary);
  }
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
  transition: background 0.18s ease, color 0.18s ease, transform 0.12s var(--ease-out);
}

.toggle-btn.is-active {
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.toggle-btn:active {
  transform: scale(0.94);
}

@media (hover: hover) and (pointer: fine) {
  .toggle-btn:not(.is-active):hover {
    color: var(--text-secondary);
    background: var(--bg-secondary);
  }
}

/* ---- Page header text ---- */
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

/* ---- Year group ---- */
.year-group {
  margin-bottom: 72px;
}

.year-group:last-child {
  margin-bottom: 0;
}

.year-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.year-title {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.year-count {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
}

/* ---- List / grid view swap ---- */
.view-leave-active {
  transition: opacity 0.2s var(--ease-out), transform 0.2s var(--ease-out);
}
.view-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ---- Grid view ---- */
.projects-grid-section {
  margin-top: 0;
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
  object-position: 0% 50%;
  transition: transform 0.40s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.grid-tile {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
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
  .grid-card:hover .grid-cover,
  .grid-card:hover .grid-tile {
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

@media (hover: none) {
  .grid-overlay {
    opacity: 1;
    background: linear-gradient(to top, rgba(0,0,0,0.65), transparent 60%);
    justify-content: flex-end;
    padding-bottom: 16px;
  }
  .grid-tipo { display: none; }
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

.project-cover.is-svg img {
  object-fit: cover;
}

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
  .work-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .header-controls { margin-bottom: 0; }

  .year-group { margin-bottom: 56px; }
  .year-header { margin-bottom: 22px; }
  .year-title { font-size: clamp(2rem, 7vw, 2.6rem); }

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

  .sort-btn { padding: 0 12px; height: 38px; font-size: 0.62rem; }
  .sort-label { display: none; }
  .year-group { margin-bottom: 44px; }
}
</style>
