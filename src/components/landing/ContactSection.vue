<script setup>
import personal from '../../data/personal.json'
import { t } from '../../i18n'

const socials = [
  { label: 'WhatsApp', href: personal.redes.whatsapp },
  { label: 'Instagram', href: personal.redes.instagram },
  { label: 'LinkedIn', href: personal.redes.linkedin },
  { label: 'GitHub', href: personal.redes.github }
]
</script>

<template>
  <section id="contacto" class="section contact">
    <div class="container contact__inner">
      <h2 class="contact__title">{{ t('contact_title') }}</h2>
      <p class="contact__lead">{{ t('contact_lead') }}</p>

      <div class="contact__actions">
        <a :href="personal.redes.whatsapp" target="_blank" rel="noopener" class="btn btn--primary">
          {{ t('contact_cta_whatsapp') }}
        </a>
        <a :href="`mailto:${personal.email}`" class="btn btn--ghost">
          {{ personal.email }}
        </a>
      </div>

      <div class="contact__socials">
        <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener">
          {{ s.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
  text-align: center;
}
.contact__inner {
  max-width: 700px;
}
.contact__title {
  font-size: clamp(2.25rem, 7vw, 4.25rem);
  line-height: 1.02;
}
.contact__lead {
  margin-top: 1.25rem;
  font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  color: var(--text-secondary);
}
.contact__actions {
  margin-top: 2.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
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
  background: var(--bg-primary);
}
.btn--ghost:hover {
  border-color: var(--text-tertiary);
}
.contact__socials {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(1rem, 4vw, 2.25rem);
  font-weight: 600;
  font-size: 0.95rem;
}
.contact__socials a {
  color: var(--text-secondary);
  transition: color 0.18s var(--ease-out);
}
.contact__socials a:hover {
  color: var(--text-primary);
}
</style>
