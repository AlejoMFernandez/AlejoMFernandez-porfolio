<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalized } from '../composables/useLocalized.js'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()
const { l } = useLocalized()

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr === 'Actualidad' || dateStr === 'Present') {
    return t('common.present')
  }
  const [year, month] = dateStr.split('-')
  return `${month}/${year}`
}
</script>

<template>
  <RouterLink 
    :to="`/proyecto/${project.id}`" 
    class="project-card-link"
  >
    <article 
      class="project-card"
      :style="{ '--card-bg': project.colorFondo, '--card-text': project.colorTexto }"
    >
      <!-- Image area -->
      <div class="card-image-container">
        <img 
          v-if="project.imagenPrincipal" 
          :src="project.imagenPrincipal" 
          :alt="project.nombre"
          class="card-image"
        />
        <div class="card-image-overlay"></div>
      </div>

      <!-- Info area -->
      <div class="card-info">
        <div class="card-info-top">
          <h3 class="card-title">{{ project.nombre }}</h3>
          <div class="card-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </div>

        <p class="card-description">{{ l(project.descripcionCorta) }}</p>

        <div class="card-footer">
          <div class="card-techs">
            <span 
              v-for="tech in project.tecnologias.slice(0, 3)" 
              :key="tech" 
              class="tech-badge"
            >
              {{ tech }}
            </span>
            <span v-if="project.tecnologias.length > 3" class="tech-badge more">
              +{{ project.tecnologias.length - 3 }}
            </span>
          </div>
          <span class="card-date">
            {{ formatDate(project.fechaInicio) }}
          </span>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
.project-card-link {
  text-decoration: none;
  display: block;
}

.project-card {
  position: relative;
  background: var(--card-bg, var(--bg-secondary));
  color: var(--card-text, var(--text-primary));
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
}

/* Image */
.card-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .card-image {
  transform: scale(1.05);
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--card-bg, var(--bg-secondary)) 0%, transparent 40%);
  pointer-events: none;
}

/* Info */
.card-info {
  padding: 20px 24px 24px;
}

.card-info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.card-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.project-card:hover .card-arrow {
  background: rgba(255, 255, 255, 0.25);
  transform: translate(2px, -2px);
}

.card-description {
  font-size: 0.9rem;
  opacity: 0.75;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-badge {
  background: rgba(255, 255, 255, 0.12);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.tech-badge.more {
  background: rgba(255, 255, 255, 0.08);
}

.card-date {
  font-size: 0.75rem;
  opacity: 0.6;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .card-info {
    padding: 16px 20px 20px;
  }

  .card-title {
    font-size: 1.2rem;
  }
}
</style>
