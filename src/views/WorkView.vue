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

onMounted(() => {
  gsap.from('.project-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.15 })
})
</script>

<template>
  <div class="work-view">
    <div class="work-inner">

      <section class="projects-section">
        <div class="section-divider">
          <span class="section-divider-line"></span>
          <span class="section-divider-label">{{ t('nav.work').toUpperCase() }}</span>
          <span class="section-divider-line"></span>
        </div>

        <div class="projects-grid">
          <RouterLink
            v-for="project in allProjects"
            :key="project.id"
            :to="`/proyecto/${project.id}`"
            class="project-card"
          >
            <div class="project-image-wrap" :style="{ background: project.colorFondo }">
              <img
                v-if="project.imagenPrincipal"
                :src="project.imagenPrincipal"
                :alt="project.nombre"
                class="project-image"
              />
              <span class="project-badge">{{ project.tipo }}</span>
            </div>
            <div class="project-info">
              <h3 class="project-name">{{ project.nombre }}</h3>
              <p class="project-desc">{{ l(project.descripcionCorta) }}</p>
              <div class="project-techs">
                <span v-for="tech in project.tecnologias.slice(0, 3)" :key="tech" class="project-tech">{{ tech }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
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

/* ---- Unified square project grid ---- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.project-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-primary);
  background: var(--bg-secondary);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.2);
}

.project-image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.45);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 6px;
}

.project-info {
  padding: 20px 22px 22px;
}

.project-name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.project-desc {
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-tech {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 3px 9px;
  border-radius: 50px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .work-inner { padding: 120px 32px 60px; }
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .work-inner { padding: 100px 16px 48px; }
  .projects-grid { grid-template-columns: 1fr; }
  .project-image-wrap { aspect-ratio: 4 / 3; }
}
</style>
