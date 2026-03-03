<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalized } from '../composables/useLocalized.js'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  reverse: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()
const { l } = useLocalized()
</script>

<template>
  <RouterLink
    :to="`/proyecto/${project.id}`"
    class="project-row"
    :class="{ reverse }"
  >
    <!-- Image side -->
    <div class="project-image-side">
      <div class="project-image-wrapper">
        <img
          v-if="project.imagenPrincipal"
          :src="project.imagenPrincipal"
          :alt="project.nombre"
          class="project-image"
        />
      </div>
    </div>

    <!-- Info side -->
    <div class="project-info-side">
      <div class="project-info-content">
        <div class="project-name-row">
          <h3 class="project-name">{{ project.nombre }}</h3>
          <div class="project-links-icons">
            <span v-if="project.linkGithub" class="link-icon" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span v-if="project.linkDemo" class="link-icon" title="Demo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
          </div>
        </div>

        <p class="project-description">{{ l(project.descripcionCorta) }}</p>

        <div class="project-techs">
          <span class="techs-label">{{ t('project.technologies') }}:</span>
          <div class="techs-list">
            <span
              v-for="tech in project.tecnologias"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.project-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.project-row.reverse {
  direction: rtl;
}

.project-row.reverse > * {
  direction: ltr;
}

/* Image side */
.project-image-side {
  position: relative;
}

.project-image-wrapper {
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--bg-secondary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-row:hover .project-image-wrapper {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.25);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-row:hover .project-image {
  transform: scale(1.04);
}

/* Info side */
.project-info-side {
  display: flex;
  align-items: center;
}

.project-info-content {
  width: 100%;
}

.project-name-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.project-name {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.project-links-icons {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.link-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  transition: all 0.3s ease;
  cursor: pointer;
}

.link-icon:hover {
  background: var(--accent-color);
  color: white;
  transform: translateY(-2px);
}

.project-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.project-techs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.techs-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.techs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: var(--bg-secondary);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.project-row:hover .tech-tag {
  color: var(--text-primary);
}

/* Mobile */
@media (max-width: 900px) {
  .project-row {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .project-row.reverse {
    direction: ltr;
  }

  .project-image-wrapper {
    aspect-ratio: 16 / 9;
  }

  .project-name {
    font-size: 1.4rem;
  }

  .project-description {
    font-size: 0.95rem;
  }
}
</style>
