<script setup>
import { computed } from 'vue'
import projects from '../../data/projects.json'
import ProjectCard from './ProjectCard.vue'
import { t } from '../../i18n'

const ordered = computed(() =>
  [...projects].sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
)
</script>

<template>
  <section id="proyectos" class="section projects">
    <div class="container">
      <header class="projects__head">
        <h2>{{ t('projects_title') }}</h2>
        <p>{{ t('projects_subtitle') }}</p>
      </header>

      <div class="projects__grid">
        <ProjectCard v-for="p in ordered" :key="p.id" :project="p" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects__head {
  max-width: 620px;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}
.projects__head h2 {
  font-size: clamp(2rem, 5vw, 3rem);
}
.projects__head p {
  margin-top: 1rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
}
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: clamp(1.25rem, 3vw, 2rem);
}
@media (max-width: 400px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
