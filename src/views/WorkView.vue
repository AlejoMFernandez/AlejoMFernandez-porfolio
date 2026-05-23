<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import Footer from '../components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const { l } = useLocalized()

const workRef = ref(null)

const allProjects = computed(() =>
  [...projects].sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // ─── Section label reveal (whole element, no SplitText) ───────────────
    const labelEl = workRef.value?.querySelector('.section-divider-label')
    if (labelEl) {
      gsap.from(labelEl, {
        autoAlpha: 0,
        y: 12,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.1
      })
      gsap.from(workRef.value.querySelectorAll('.section-divider-line'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.inOut',
        delay: 0.1
      })
    }

    // ─── Project rows: ScrollTrigger.batch stagger reveal ─────────────────
    ScrollTrigger.batch('.project-row', {
      onEnter: (batch) => gsap.fromTo(batch,
        { autoAlpha: 0, x: -40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: true
        }
      ),
      start: 'top 92%',
      once: true
    })

    // ─── Progress line on each row hover ─────────────────────────────────
    workRef.value.querySelectorAll('.project-link').forEach(link => {
      const line = link.querySelector('.row-progress-line')
      if (!line) return
      link.addEventListener('mouseenter', () => {
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' })
      })
      link.addEventListener('mouseleave', () => {
        gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power3.in', transformOrigin: 'right center' })
      })
    })

  }, workRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="workRef" class="work-view">
    <div class="work-inner">

      <section class="projects-section">
        <div class="section-divider">
          <span class="section-divider-line"></span>
          <span class="section-divider-label">{{ t('nav.work').toUpperCase() }}</span>
          <span class="section-divider-line"></span>
        </div>

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
              </div>
              <div class="project-meta">
                <span class="project-tipo">{{ project.tipo }}</span>
                <div class="project-techs">
                  <span v-for="tech in project.tecnologias.slice(0, 3)" :key="tech">{{ tech }}</span>
                </div>
              </div>
              <svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
              <!-- Animated progress line on hover -->
              <span class="row-progress-line"></span>
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 48px 80px;
}

/* ---- Section divider (matches HomeView) ---- */
.section-divider {
  display: flex;
  align-items: center;
  gap: 20px;
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

/* ---- Project list (typographic minimalist) ---- */
.projects-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.project-row {
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}
.project-row:last-child {
  border-bottom: none;
}

.project-link {
  display: grid;
  grid-template-columns: 48px 1fr auto 30px;
  align-items: center;
  gap: 32px;
  padding: 32px 0;
  text-decoration: none;
  color: var(--text-primary);
  transition: gap 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.project-link:hover {
  gap: 44px;
}
.project-link:hover .project-name {
  color: var(--accent-color);
}
.project-link:hover .project-arrow {
  transform: translateX(6px);
  color: var(--accent-color);
}

.project-index {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  line-height: 1;
}

.project-center {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.project-name {
  font-size: clamp(1.8rem, 3.2vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  transition: color 0.2s;
}

.project-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
}

.project-tipo {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-color);
}

.project-techs {
  display: flex;
  gap: 10px;
}
.project-techs span {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-weight: 500;
}
.project-techs span + span::before {
  content: '/';
  margin-right: 10px;
  opacity: 0.35;
}

.project-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.25s;
}

/* Animated hover line */
.row-progress-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-color), #818cf8);
  transform: scaleX(0);
  transform-origin: left center;
  pointer-events: none;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .work-inner { padding: 120px 32px 60px; }
  .project-link { gap: 24px; }
  .project-link:hover { gap: 32px; }
}

@media (max-width: 768px) {
  .project-link {
    grid-template-columns: 36px 1fr 26px;
    gap: 18px;
    padding: 24px 0;
  }
  .project-link:hover { gap: 24px; }
  .project-meta { display: none; }
  .project-name { font-size: clamp(1.4rem, 5vw, 2rem); }
}

@media (max-width: 480px) {
  .work-inner { padding: 90px 20px 48px; }
  .project-link { grid-template-columns: 32px 1fr 22px; gap: 14px; }
  .project-index { font-size: 0.72rem; }
}
</style>
