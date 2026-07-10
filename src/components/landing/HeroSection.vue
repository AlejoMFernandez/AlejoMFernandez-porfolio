<script setup>
import personal from '../../data/personal.json'
import { t } from '../../i18n'
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero__inner">
      <div class="hero__text">
        <span class="hero__chip">
          <span class="hero__dot"></span>
          {{ t('hero_chip') }}
        </span>

        <h1 class="hero__title">
          {{ t('hero_title_1') }}
          <span>{{ t('hero_title_2') }}</span>
        </h1>

        <p class="hero__lead">{{ t('hero_lead') }}</p>

        <div class="hero__actions">
          <a href="#proyectos" class="btn btn--primary">{{ t('hero_cta_projects') }}</a>
          <a :href="personal.redes.whatsapp" target="_blank" rel="noopener" class="btn btn--ghost">
            {{ t('hero_cta_whatsapp') }}
          </a>
        </div>
      </div>

      <div class="hero__art">
        <img
          src="/images/stickersaludando.webp"
          alt="Ilustración de Alejo saludando"
          width="1000"
          height="1000"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-block: clamp(1.5rem, 4vh, 3rem);
}
.hero__inner {
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
}
.hero__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
}
.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px color-mix(in srgb, #22c55e 22%, transparent);
}
.hero__title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  line-height: 1.05;
}
.hero__title span {
  color: var(--text-tertiary);
}
.hero__lead {
  margin-top: 1.35rem;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 540px;
}
.hero__actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.hero__art {
  display: flex;
  justify-content: center;
}
.hero__art img {
  width: auto;
  max-width: 100%;
  max-height: min(56vh, 500px);
  object-fit: contain;
  filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.25));
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  transition: transform 0.18s var(--ease-out), opacity 0.18s var(--ease-out),
    background-color 0.18s var(--ease-out), border-color 0.18s var(--ease-out);
}
.btn:active {
  transform: scale(0.97);
}
.btn--primary {
  background: var(--accent-color);
  color: #fff;
}
.btn--primary:hover {
  background: var(--accent-hover);
}
.btn--ghost {
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}
.btn--ghost:hover {
  border-color: var(--text-tertiary);
}

@media (max-width: 860px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .hero__art {
    order: -1;
    justify-content: flex-start;
  }
  .hero__art img {
    max-height: 28vh;
  }
}
</style>
