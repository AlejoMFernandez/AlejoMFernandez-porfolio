<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import personal from '../../data/personal.json'
import { t, locale, setLocale, LOCALES } from '../../i18n'

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 60
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'header--visible': scrolled }">
    <div class="container header__inner">
      <a href="#top" class="header__brand" aria-label="Alejo Fernández — inicio">
        <img class="header__logo header__logo--dark" src="/logoAFwhite.png" alt="Alejo Fernández" />
        <img class="header__logo header__logo--light" src="/logoAFblack.png" alt="Alejo Fernández" />
      </a>

      <nav class="header__nav">
        <a href="#sobre-mi">{{ t('nav_about') }}</a>
        <a href="#proyectos">{{ t('nav_projects') }}</a>
        <a href="#contacto">{{ t('nav_contact') }}</a>

        <div class="header__lang" role="group" aria-label="Idioma">
          <button
            v-for="lng in LOCALES"
            :key="lng"
            type="button"
            class="header__lang-btn"
            :class="{ 'is-active': locale === lng }"
            :aria-pressed="locale === lng"
            @click="setLocale(lng)"
          >
            {{ lng.toUpperCase() }}
          </button>
        </div>

        <a class="header__cta" :href="personal.redes.whatsapp" target="_blank" rel="noopener">
          {{ t('nav_cta') }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  background: color-mix(in srgb, var(--bg-primary) 82%, transparent);
  backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid var(--border-color);
  transition: transform 0.35s var(--ease-out), opacity 0.35s var(--ease-out);
}
.header--visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}
.header__brand {
  display: inline-flex;
  align-items: center;
}
.header__logo {
  height: 30px;
  width: auto;
}
.header__logo--light {
  display: none;
}
@media (prefers-color-scheme: light) {
  .header__logo--dark {
    display: none;
  }
  .header__logo--light {
    display: block;
  }
}
.header__nav {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 1.9rem);
  font-size: 0.95rem;
  font-weight: 600;
}
.header__nav > a:not(.header__cta) {
  color: var(--text-secondary);
  transition: color 0.18s var(--ease-out);
}
.header__nav > a:not(.header__cta):hover {
  color: var(--text-primary);
}
.header__lang {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 0.2rem;
}
.header__lang-btn {
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  font-family: inherit;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  transition: color 0.16s var(--ease-out), background-color 0.16s var(--ease-out);
}
.header__lang-btn:hover {
  color: var(--text-secondary);
}
.header__lang-btn.is-active {
  color: var(--bg-primary);
  background: var(--text-primary);
}
.header__cta {
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  transition: opacity 0.18s var(--ease-out), transform 0.18s var(--ease-out);
}
.header__cta:hover {
  opacity: 0.88;
}
.header__cta:active {
  transform: scale(0.96);
}
@media (max-width: 640px) {
  .header__nav > a:not(.header__cta) {
    display: none;
  }
}
@media (max-width: 460px) {
  .header__cta {
    display: none;
  }
}
</style>
