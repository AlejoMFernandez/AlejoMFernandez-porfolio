<script setup>
import { t, l } from '../../i18n'

defineProps({
  project: { type: Object, required: true }
})
</script>

<template>
  <article
    class="card"
    :class="{ 'card--clickable': project.linkDemo }"
  >
    <div class="card__media" :style="{ background: project.colorFondo }">
      <img
        :src="project.imagenPrincipal"
        :alt="`Vista del proyecto ${project.nombre}`"
        width="1600"
        height="1000"
        loading="lazy"
        decoding="async"
      />
      <span v-if="project.enDesarrollo" class="card__badge">{{ t('card_dev') }}</span>
    </div>

    <div class="card__body">
      <div class="card__meta">
        <span class="card__tag">{{ t('tipo_' + project.tipo) }}</span>
        <span v-if="project.cliente" class="card__client">· {{ project.cliente }}</span>
      </div>

      <h3 class="card__title">{{ project.nombre }}</h3>
      <p class="card__desc">{{ l(project.descripcionCorta) }}</p>

      <ul class="card__tech">
        <li v-for="t in project.tecnologias.slice(0, 5)" :key="t">{{ t }}</li>
      </ul>

      <div class="card__links">
        <a
          v-if="project.linkDemo"
          :href="project.linkDemo"
          target="_blank"
          rel="noopener"
          class="card__link card__link--primary card__stretched"
          :aria-label="`${t('card_visit')} — ${project.nombre}`"
        >
          {{ t('card_visit') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
        <a
          v-if="project.linkGithub"
          :href="project.linkGithub"
          target="_blank"
          rel="noopener"
          class="card__link card__link--above"
        >
          {{ t('card_code') }}
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-primary);
  transition: transform 0.28s var(--ease-out), box-shadow 0.28s var(--ease-out),
    border-color 0.28s var(--ease-out);
}
.card--clickable {
  cursor: pointer;
}
.card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 2;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
}
.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
}
.card__meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.card__tag {
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.card__client {
  color: var(--text-tertiary);
}
.card__title {
  font-size: 1.45rem;
}
.card__desc {
  margin-top: 0.6rem;
  color: var(--text-secondary);
  font-size: 0.97rem;
}
.card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.1rem;
}
.card__tech li {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
}
.card__links {
  display: flex;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1.5rem;
}
.card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  transition: transform 0.16s var(--ease-out), border-color 0.16s var(--ease-out),
    background-color 0.16s var(--ease-out), opacity 0.16s var(--ease-out);
}
.card__link:active {
  transform: scale(0.96);
}
.card__link:hover {
  border-color: var(--text-tertiary);
}
.card__link--primary {
  background: var(--text-primary);
  color: var(--bg-primary);
  border-color: var(--text-primary);
}
.card__link--primary:hover {
  opacity: 0.88;
}
/* Stretched link: the whole card navigates to the demo */
.card__stretched::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}
/* "Código" sits above the stretched overlay so it stays clickable */
.card__link--above {
  position: relative;
  z-index: 2;
}

@media (hover: hover) and (pointer: fine) {
  .card--clickable:hover {
    transform: translateY(-4px);
    border-color: var(--text-tertiary);
    box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.35);
  }
}
</style>
