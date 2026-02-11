<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import personal from '../data/personal.json'
import { useLocalized } from '../composables/useLocalized.js'
import Footer from '../components/Footer.vue'

const { t } = useI18n()
const { l } = useLocalized()

onMounted(() => {
  gsap.from('.contact-hero > *', {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="contact-view">
    <section class="contact-hero">
      <span class="contact-eyebrow">
        <span class="eyebrow-dot"></span>
        {{ t('contact.eyebrow') }}
      </span>

      <h1 class="contact-heading">{{ t('contact.title') }}</h1>
      <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>

      <a
        v-magnetic="{ strength: 0.2, scale: 1.03 }"
        :href="`mailto:${personal.email}`"
        class="contact-email-btn magnetic-btn"
      >
        <span>{{ personal.email }}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      </a>

      <div class="contact-details">
        <div class="detail-group">
          <span class="detail-label">{{ t('contact.socials') }}</span>
          <div class="detail-links">
            <a
              v-if="personal.redes.github"
              v-magnetic="{ strength: 0.4, scale: 1.1 }"
              :href="personal.redes.github"
              target="_blank"
              class="social-link magnetic-btn"
            >GitHub</a>
            <a
              v-if="personal.redes.linkedin"
              v-magnetic="{ strength: 0.4, scale: 1.1 }"
              :href="personal.redes.linkedin"
              target="_blank"
              class="social-link magnetic-btn"
            >LinkedIn</a>
            <a
              v-if="personal.redes.instagram"
              v-magnetic="{ strength: 0.4, scale: 1.1 }"
              :href="personal.redes.instagram"
              target="_blank"
              class="social-link magnetic-btn"
            >Instagram</a>
          </div>
        </div>

        <div class="detail-group">
          <span class="detail-label">{{ t('contact.location') }}</span>
          <p class="detail-text">{{ l(personal.ubicacion) || personal.ubicacion }}</p>
        </div>

        <div class="detail-group">
          <span class="detail-label">{{ t('contact.phone') }}</span>
          <a :href="`tel:${personal.telefono}`" class="detail-text link">{{ personal.telefono }}</a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.contact-view {
  min-height: 100vh;
}

.contact-hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 160px 24px 100px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.contact-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  margin-bottom: 32px;
}

.eyebrow-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-color);
  border-radius: 50%;
  display: inline-block;
}

.contact-heading {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 20px;
}

.contact-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 48px;
  max-width: 520px;
}

.contact-email-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  padding: 18px 36px;
  border: 2px solid var(--border-color);
  border-radius: 60px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 64px;
}

.contact-email-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-email-btn svg {
  transition: transform 0.3s ease;
}

.contact-email-btn:hover svg {
  transform: translate(3px, -3px);
}

.contact-details {
  display: flex;
  gap: 56px;
  flex-wrap: wrap;
  justify-content: center;
}

.detail-group {
  text-align: center;
}

.detail-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.detail-links {
  display: flex;
  gap: 20px;
}

.social-link {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--accent-color);
}

.detail-text {
  color: var(--text-secondary);
  font-size: 1rem;
}

.detail-text.link {
  text-decoration: none;
  transition: color 0.3s ease;
}

.detail-text.link:hover {
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 120px 20px 80px;
    min-height: auto;
  }

  .contact-details {
    flex-direction: column;
    gap: 32px;
  }
}
</style>
