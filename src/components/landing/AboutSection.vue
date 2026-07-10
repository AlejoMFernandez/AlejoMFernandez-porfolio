<script setup>
import personal from '../../data/personal.json'
import { t, l } from '../../i18n'
</script>

<template>
  <section id="sobre-mi" class="section about">
    <div class="container about__inner">
      <div class="about__photo">
        <img
          src="/images/aboutme/profilephoto.webp"
          alt="Foto de Alejo Fernández"
          width="900"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="about__text">
        <span class="about__eyebrow">{{ t('about_eyebrow') }}</span>
        <h2>{{ t('about_h2') }}</h2>
        <p>{{ l(personal.about.whoAmI) }}</p>
        <p>{{ t('about_p2') }}</p>
        <a :href="personal.redes.whatsapp" target="_blank" rel="noopener" class="about__cta">
          {{ t('about_cta') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  border-top: 1px solid var(--border-color);
}
.about__inner {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  align-items: center;
  gap: clamp(2rem, 6vw, 4.5rem);
}
.about__photo {
  position: relative;
  aspect-ratio: 4 / 5;
}
.about__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid var(--border-color);
}
.about__eyebrow {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin-bottom: 1rem;
}
.about__text h2 {
  font-size: clamp(1.75rem, 4vw, 2.6rem);
  max-width: 16ch;
}
.about__text p {
  margin-top: 1.25rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 52ch;
}
.about__cta {
  display: inline-block;
  margin-top: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 2px;
  transition: opacity 0.18s var(--ease-out);
}
.about__cta:hover {
  opacity: 0.7;
}

@media (max-width: 760px) {
  .about__inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .about__photo {
    max-width: 320px;
  }
}
</style>
