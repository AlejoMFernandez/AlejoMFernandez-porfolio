<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocalized } from '../composables/useLocalized.js'
import personal from '../data/personal.json'
import Footer from '../components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const { l } = useLocalized()

// ---- Audio player ----
const audioEl = ref(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const togglePlay = () => {
  if (!audioEl.value) return
  if (isPlaying.value) { audioEl.value.pause(); isPlaying.value = false }
  else { audioEl.value.play(); isPlaying.value = true }
}
const toggleMute = () => {
  if (!audioEl.value) return
  isMuted.value = !isMuted.value
  audioEl.value.muted = isMuted.value
}

// ---- Photo mosaic ----
const photos = personal.fotosAboutMe.galeria

// ---- Helpers ----
const formatDateRange = (inicio, fin) => {
  const start = inicio ? String(inicio).split('-')[0] : ''
  const end = fin && fin !== 'Actualidad' ? String(fin).split('-')[0] : t('common.present')
  return `${start} → ${end}`
}

// ---- Infra skills picked by current locale (data: { es:[...], en:[...], pt:[...] }) ----
const infraSkills = computed(() =>
  personal.habilidades.infraestructura[locale.value] ||
  personal.habilidades.infraestructura.es
)

// ---- Sticker peek (parity with HomeView) ----
let peekY = 0

const onHeroEnter = () => {
  if (window.matchMedia('(hover: none)').matches) return
  gsap.to('.ih-sticker-outer', { y: 0, duration: 0.85, ease: 'back.out(1.3)' })
}

const onHeroLeave = () => {
  if (window.matchMedia('(hover: none)').matches) return
  gsap.to('.ih-sticker-outer', { y: peekY, duration: 1.0, ease: 'elastic.out(1, 0.3)' })
}

onMounted(() => {
  const isTouch = window.matchMedia('(hover: none)').matches

  if (!isTouch) {
    const stickerH = Math.min(window.innerHeight * 0.56, 520)
    peekY = stickerH - 165
    gsap.set('.ih-sticker-outer', { y: peekY })
  } else {
    gsap.set('.ih-sticker-outer', { y: 0 })
  }

  // Hero entrance
  gsap.from('.ih-eyebrow', { opacity: 0, y: 14, duration: 0.55, ease: 'power3.out', delay: 0.1 })
  gsap.from('.ih-name-line', { opacity: 0, y: 60, duration: 0.95, ease: 'power3.out', stagger: 0.12, delay: 0.2 })
  gsap.from('.ih-meta > *', { opacity: 0, y: 14, duration: 0.55, ease: 'power2.out', stagger: 0.06, delay: 0.75 })

  // Scroll-triggered reveals
  gsap.from('.bio-prose p', {
    scrollTrigger: { trigger: '.bio-section', start: 'top 80%', once: true },
    opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out',
  })
  gsap.from('.exp-section .tl-item', {
    scrollTrigger: { trigger: '.exp-section', start: 'top 82%', once: true },
    opacity: 0, y: 18, duration: 0.6, stagger: 0.08, ease: 'power3.out',
  })
  gsap.from('.edu-section .tl-item', {
    scrollTrigger: { trigger: '.edu-section', start: 'top 82%', once: true },
    opacity: 0, y: 18, duration: 0.6, stagger: 0.08, ease: 'power3.out',
  })
  gsap.from('.skills-block .skill-tag', {
    scrollTrigger: { trigger: '.skills-block', start: 'top 85%', once: true },
    opacity: 0, y: 12, duration: 0.4, stagger: 0.025, ease: 'power3.out',
  })
  gsap.from('.gallery-tile', {
    scrollTrigger: { trigger: '.personal-section', start: 'top 80%', once: true },
    opacity: 0, y: 22, duration: 0.6, stagger: 0.08, ease: 'power3.out',
  })
  gsap.from('.cta-inner > *', {
    scrollTrigger: { trigger: '.info-cta', start: 'top 85%', once: true },
    opacity: 0, y: 24, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  if (audioEl.value) { audioEl.value.pause(); audioEl.value.src = '' }
})
</script>

<template>
  <div class="info-view">

    <!-- ===== HERO MASTHEAD ===== -->
    <section
      class="ih-hero"
      @mouseenter="onHeroEnter"
      @mouseleave="onHeroLeave"
      aria-label="Sobre mí"
    >
      <!-- Subtle dotted-grid background (differentiates from HomeView's code rain) -->
      <div class="ih-grid-bg" aria-hidden="true"></div>

      <!-- Sticker peeking from bottom-right -->
      <div class="ih-sticker-outer" aria-hidden="true">
        <img src="/images/stickersaludando.png" alt="" class="ih-sticker-img" />
      </div>

      <div class="ih-inner">
        <div class="ih-content">
          <span class="ih-eyebrow">{{ t('info.aboutMe') }}</span>
          <h1 class="ih-name">
            <span class="ih-name-line">{{ personal.nombre }}</span>
            <span class="ih-name-line">{{ personal.apellido }}</span>
          </h1>
          <div class="ih-meta">
            <span class="ih-role">{{ l(personal.titulo) }}</span>
            <span class="ih-dot" aria-hidden="true">·</span>
            <span class="ih-place">{{ personal.ubicacion }}</span>
            <span class="ih-status">
              <span class="ih-pulse" aria-hidden="true"></span>
              {{ t('home.available') }}
            </span>
          </div>
        </div>
      </div>

      <div class="ih-scroll-hint" aria-hidden="true">
        <span class="ih-scroll-line"></span>
      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== BIO PROSE ===== -->
    <section class="bio-section">
      <div class="bio-inner">
        <span class="section-label">{{ t('info.whoAmI') }}</span>
        <div class="bio-prose">
          <p>{{ l(personal.about.whoAmI) }}</p>
          <p>{{ l(personal.about.whereImFrom) }}</p>
          <p>{{ l(personal.about.hobbies) }}</p>
          <p>{{ l(personal.about.whatIDoNow) }}</p>
          <p>{{ l(personal.about.whatImLookingFor) }}</p>
        </div>
      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== EXPERIENCE ===== -->
    <section class="section-block exp-section">
      <div class="block-inner">
        <span class="section-label">{{ t('info.experience') }}</span>
        <div class="timeline">
          <div
            v-for="job in personal.experiencia"
            :key="job.empresa + job.fechaInicio"
            class="tl-item"
          >
            <div class="tl-head">
              <span class="tl-company">{{ job.empresa }}</span>
              <span class="tl-dates">{{ formatDateRange(job.fechaInicio, job.fechaFin) }}</span>
            </div>
            <p class="tl-role">
              {{ l(job.puesto) }}
              <span class="tl-sep" aria-hidden="true">·</span>
              {{ typeof job.ubicacion === 'object' ? l(job.ubicacion) : job.ubicacion }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== EDUCATION ===== -->
    <section class="section-block edu-section">
      <div class="block-inner">
        <span class="section-label">{{ t('info.education') }}</span>
        <div class="timeline">
          <div
            v-for="edu in personal.educacion"
            :key="edu.institucion"
            class="tl-item"
          >
            <div class="tl-head">
              <span class="tl-company">{{ edu.institucion }}</span>
              <span class="tl-dates">{{ formatDateRange(edu.fechaInicio, edu.fechaFin) }}</span>
            </div>
            <p class="tl-role">{{ l(edu.titulo) }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== SKILLS + LANGUAGES ===== -->
    <section class="section-block skills-block">
      <div class="block-inner skills-stack">
        <div class="skill-row">
          <span class="section-label">{{ t('info.skillsDev') }}</span>
          <div class="skills-list">
            <span
              v-for="skill in personal.habilidades.desarrollo"
              :key="skill"
              class="skill-tag"
            >{{ skill }}</span>
          </div>
        </div>
        <div class="skill-row">
          <span class="section-label">{{ t('info.skillsTools') }}</span>
          <div class="skills-list">
            <span
              v-for="skill in personal.habilidades.herramientas"
              :key="skill"
              class="skill-tag"
            >{{ skill }}</span>
          </div>
        </div>
        <div class="skill-row">
          <span class="section-label">{{ t('info.skillsInfra') }}</span>
          <div class="skills-list">
            <span
              v-for="skill in infraSkills"
              :key="skill"
              class="skill-tag skill-tag-muted"
            >{{ skill }}</span>
          </div>
        </div>
      </div>
      <div class="block-inner langs-block">
        <span class="section-label">{{ t('info.languages') }}</span>
        <div class="langs-row">
          <template v-for="(lang, i) in personal.idiomas" :key="i">
            <span class="lang-item">
              {{ l(lang.idioma) }}
              <span class="lang-level">{{ l(lang.nivel) }}</span>
            </span>
            <span v-if="i < personal.idiomas.length - 1" class="lang-sep" aria-hidden="true">·</span>
          </template>
        </div>
      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== PERSONAL: music + gallery mosaic ===== -->
    <section class="section-block personal-section">
      <div class="block-inner personal-inner">

        <div class="personal-music">
          <span class="section-label">{{ t('info.favoriteTrack') }}</span>
          <div class="music-widget">
            <audio ref="audioEl" :src="personal.cancionFavorita.mp3" preload="none" />
            <div class="mw-art-row">
              <img
                :src="personal.cancionFavorita.portada"
                :alt="personal.cancionFavorita.album"
                class="mw-art"
              />
              <div class="mw-text">
                <p class="mw-track">{{ personal.cancionFavorita.titulo }}</p>
                <p class="mw-artist">{{ personal.cancionFavorita.artista }}</p>
                <p class="mw-album">{{ personal.cancionFavorita.album }}</p>
              </div>
            </div>
            <div class="mw-controls">
              <button class="mw-btn mw-play" @click="togglePlay" :aria-label="isPlaying ? 'Pause' : 'Play'">
                <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <div class="mw-progress">
                <div class="mw-progress-bar" :class="{ active: isPlaying }"></div>
              </div>
              <button class="mw-btn mw-mute" @click="toggleMute" :aria-label="isMuted ? 'Unmute' : 'Mute'">
                <svg v-if="isMuted" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              </button>
              <a :href="personal.cancionFavorita.applemusic" target="_blank" class="mw-btn mw-apple" aria-label="Apple Music">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="personal-gallery">
          <span class="section-label">{{ t('info.gallery') }}</span>
          <div class="gallery-mosaic">
            <figure
              v-for="(photo, i) in photos"
              :key="i"
              class="gallery-tile"
            >
              <img
                :src="photo.src"
                :alt="l(photo.label)"
                class="gallery-img"
                loading="lazy"
              />
              <figcaption class="gallery-caption">{{ l(photo.label) }}</figcaption>
            </figure>
          </div>
        </div>

      </div>
    </section>

    <div class="full-rule" aria-hidden="true"></div>

    <!-- ===== CV + CTA (mirrors HomeView's CTA structure) ===== -->
    <section class="info-cta">
      <div class="cta-inner">
        <p class="cta-kicker">{{ t('info.contact') }}</p>
        <h2 class="cta-headline">
          <span class="cta-line cta-outline">{{ t('home.ctaLine1') }}</span>
          <span class="cta-line">{{ t('home.ctaLine2') }}</span>
        </h2>
        <div class="cta-foot">
          <p class="cta-sub">{{ t('info.contactSubtitle') }}</p>
          <div class="cta-actions">
            <a
              href="/images/aboutme/Alejo-Martin-Fernandez-CV.pdf"
              download
              class="cta-btn cta-btn-secondary"
            >
              {{ t('info.downloadCV') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
            <RouterLink to="/contacto" class="cta-btn">
              {{ t('home.ctaBtn') }} →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SOCIAL STRIP ===== -->
    <section class="info-social">
      <div class="social-inner">
        <a :href="personal.redes.github" target="_blank" rel="noopener" class="soc-link">
          GitHub <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
        <a :href="personal.redes.linkedin" target="_blank" rel="noopener" class="soc-link">
          LinkedIn <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
        <a :href="personal.redes.instagram" target="_blank" rel="noopener" class="soc-link">
          Instagram <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
        <a v-if="personal.redes.tiktok" :href="personal.redes.tiktok" target="_blank" rel="noopener" class="soc-link">
          TikTok <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
        <a :href="personal.redes.whatsapp" target="_blank" rel="noopener" class="soc-link">
          WhatsApp <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
/* ===== ROOT ===== */
.info-view { min-height: 100vh; }

/* ===== HERO MASTHEAD (parity with HomeView language) ===== */
.ih-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: default;
}

/* Subtle dotted-grid background, faded with radial mask */
.ih-grid-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(circle, var(--text-tertiary) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.09;
  mask-image: radial-gradient(ellipse at 28% 62%, #000 35%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 28% 62%, #000 35%, transparent 75%);
}

/* Sticker (bottom-right peek) */
.ih-sticker-outer {
  position: absolute;
  right: 48px;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.ih-sticker-img {
  height: 56vh;
  max-height: 520px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 30px 56px rgba(0, 0, 0, 0.24));
  transform-origin: bottom center;
  user-select: none;
  pointer-events: none;
}

/* Inner: content pushed to bottom-left, like HomeView */
.ih-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 48px 72px;
  position: relative;
  z-index: 1;
}

.ih-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 70%;
}

.ih-eyebrow {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.ih-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(4rem, 8.4vw, 8.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-transform: uppercase;
  color: var(--text-primary);
  user-select: none;
  margin: 0;
}

.ih-name-line { display: block; }

/* Meta: role · place · status pill */
.ih-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.92rem;
  color: var(--text-tertiary);
  font-weight: 400;
}

.ih-role {
  color: var(--text-secondary);
  font-weight: 500;
}

.ih-dot { color: var(--text-tertiary); user-select: none; }
.ih-place { color: var(--text-tertiary); }

.ih-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
  padding: 5px 12px 5px 10px;
  border-radius: 50px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.ih-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  animation: ih-pulse 1.8s ease-out infinite;
}

@keyframes ih-pulse {
  0%   { box-shadow: 0 0 0 0   rgba(34, 197, 94, 0.55); }
  70%  { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);    }
  100% { box-shadow: 0 0 0 0   rgba(34, 197, 94, 0);    }
}

/* Scroll hint (same pattern as HomeView) */
.ih-scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.ih-scroll-line {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, var(--text-tertiary), transparent);
  animation: ih-hint-drop 2.2s ease-in-out infinite;
  transform-origin: top center;
}

@keyframes ih-hint-drop {
  0%   { transform: scaleY(0); opacity: 1; }
  55%  { transform: scaleY(1); opacity: 1; }
  56%  { transform-origin: bottom center; }
  100% { transform: scaleY(0); transform-origin: bottom center; opacity: 0; }
}

/* ===== RULES ===== */
.full-rule {
  border-top: 1px solid var(--border-color);
  margin: 0 48px;
}

/* ===== SHARED SECTION BLOCKS ===== */
.section-block { padding: 80px 48px; }

.block-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.section-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 28px;
}

/* ===== BIO PROSE ===== */
.bio-section {
  padding: 96px 48px 88px;
}

.bio-inner {
  max-width: 880px;
  margin: 0 auto;
}

.bio-prose {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.bio-prose p {
  font-size: clamp(1.05rem, 1.4vw, 1.28rem);
  line-height: 1.65;
  color: var(--text-secondary);
  font-weight: 400;
}

/* Lead paragraph: bigger, primary color */
.bio-prose p:first-child {
  font-size: clamp(1.32rem, 1.85vw, 1.7rem);
  line-height: 1.45;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* ===== TIMELINE (experience + education) ===== */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.tl-item {
  position: relative;
  padding-left: 22px;
  border-left: 1px solid var(--border-color);
  transition: border-color 0.25s var(--ease-out);
}

.tl-item::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 8px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-tertiary);
  transition: background 0.25s var(--ease-out), transform 0.25s var(--ease-out);
}

.tl-item:first-child::before { background: var(--accent-color); }

@media (hover: hover) and (pointer: fine) {
  .tl-item:hover { border-left-color: var(--text-primary); }
  .tl-item:hover::before {
    background: var(--text-primary);
    transform: scale(1.25);
  }
}

.tl-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 4px;
}

.tl-company {
  font-size: clamp(1.05rem, 1.25vw, 1.25rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.tl-dates {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  white-space: nowrap;
}

.tl-role {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.tl-sep { color: var(--text-tertiary); margin: 0 4px; }

/* ===== SKILLS ===== */
.skills-stack {
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 48px;
}

/* Each skill-row reuses .section-label spacing for the eyebrow */
.skill-row .section-label {
  margin-bottom: 16px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  font-size: 0.84rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 6px 14px;
  border-radius: 50px;
  font-weight: 500;
  transition:
    color 0.18s var(--ease-out),
    background 0.18s var(--ease-out),
    border-color 0.18s var(--ease-out),
    transform 0.18s var(--ease-out);
}

/* Infra skills slightly muted to indicate it's "background" rather than current focus */
.skill-tag-muted {
  background: transparent;
  color: var(--text-tertiary);
}

@media (hover: hover) and (pointer: fine) {
  .skill-tag:hover {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
    transform: translateY(-2px);
  }
}

/* Languages */
.langs-block {
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
}

.langs-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.lang-item {
  font-size: 0.92rem;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.lang-level {
  color: var(--text-tertiary);
  font-size: 0.84rem;
}

.lang-sep {
  color: var(--border-color);
  user-select: none;
}

/* ===== PERSONAL (music + gallery) ===== */
.personal-inner {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 64px;
  align-items: start;
}

.personal-music .section-label,
.personal-gallery .section-label {
  margin-bottom: 18px;
}

/* Music widget */
.music-widget {
  background: #111;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: #fff;
}

@media (prefers-color-scheme: dark) {
  .music-widget {
    background: #1c1c1e;
    border: 1px solid rgba(255, 255, 255, 0.07);
  }
}

.mw-art-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.mw-art {
  width: 54px;
  height: 54px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
}

.mw-text { flex: 1; min-width: 0; }

.mw-track {
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.mw-artist {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mw-album {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: italic;
}

.mw-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mw-progress {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  overflow: hidden;
}

.mw-progress-bar {
  height: 100%;
  width: 0%;
  background: var(--accent-color);
  border-radius: 2px;
}

.mw-progress-bar.active {
  animation: mw-play 240s linear forwards;
}

@keyframes mw-play {
  from { width: 0%; }
  to   { width: 100%; }
}

.mw-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  flex-shrink: 0;
  text-decoration: none;
  transition: color 0.18s var(--ease-out), background 0.18s var(--ease-out);
}

.mw-btn:active {
  transform: scale(0.9);
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .mw-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
}

.mw-play {
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  color: #fff;
}

@media (hover: hover) and (pointer: fine) {
  .mw-play:hover { background: rgba(255, 255, 255, 0.24); }
}

/* Gallery mosaic (replaces single carousel) */
.gallery-mosaic {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.gallery-tile {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 10px;
  background: var(--bg-secondary);
  margin: 0;
  cursor: default;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s var(--ease-out), filter 0.3s var(--ease-out);
  filter: saturate(0.85);
}

@media (hover: hover) and (pointer: fine) {
  .gallery-tile:hover .gallery-img {
    transform: scale(1.05);
    filter: saturate(1);
  }
  .gallery-tile:hover .gallery-caption {
    opacity: 1;
    transform: translateY(0);
  }
}

.gallery-caption {
  position: absolute;
  bottom: 10px;
  left: 12px;
  font-size: 0.74rem;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 3px 8px;
  border-radius: 4px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out);
}

/* ===== CTA (parity with HomeView's CTA) ===== */
.info-cta { padding: 96px 48px 96px; }

.cta-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.cta-kicker {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-tertiary);
  margin-bottom: 20px;
}

.cta-headline {
  display: flex;
  flex-direction: column;
  font-size: clamp(2.8rem, 5.5vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.92;
  margin-bottom: 40px;
}

.cta-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-primary);
  transition: color 0.25s var(--ease-out), -webkit-text-stroke-color 0.25s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .cta-headline:hover .cta-outline {
    color: var(--text-primary);
    -webkit-text-stroke-color: transparent;
  }
}

.cta-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.cta-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 440px;
}

.cta-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 10px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  flex-shrink: 0;
  transition:
    transform  0.2s var(--ease-out),
    box-shadow 0.2s var(--ease-out),
    background 0.2s var(--ease-out),
    color      0.2s var(--ease-out),
    border-color 0.2s var(--ease-out);
}

.cta-btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

@media (hover: hover) and (pointer: fine) {
  .cta-btn:hover {
    background: var(--accent-color);
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  }
  .cta-btn-secondary:hover {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }
}

.cta-btn:active {
  transform: scale(0.97);
  transition-duration: 0.1s;
}

/* ===== SOCIAL STRIP ===== */
.info-social {
  padding: 0 48px 96px;
}

.social-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  border-top: 1px solid var(--border-color);
  padding-top: 32px;
}

.soc-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.18s var(--ease-out);
}

.soc-link:active {
  opacity: 0.55;
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .soc-link:hover { color: var(--accent-color); }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 960px) {
  .ih-inner { padding: 0 24px 56px; }
  .ih-content { max-width: 100%; gap: 16px; }
  .ih-name { font-size: clamp(3rem, 9vw, 5.5rem); }
  .ih-sticker-img { height: 42vh; max-height: 320px; }
  .ih-sticker-outer { right: 24px; }

  .full-rule { margin: 0 24px; }

  .bio-section { padding: 72px 24px 64px; }
  .bio-prose p { font-size: 1rem; }
  .bio-prose p:first-child { font-size: 1.2rem; }

  .section-block { padding: 64px 24px; }
  .skills-stack { gap: 28px; }
  .personal-inner { grid-template-columns: 1fr; gap: 48px; }

  .info-cta { padding: 64px 24px 72px; }
  .cta-foot { flex-direction: column; align-items: flex-start; }

  .info-social { padding: 0 24px 64px; }
}

@media (max-width: 600px) {
  .ih-inner { padding: 0 20px 48px; }
  .ih-name { font-size: clamp(2.8rem, 12vw, 4rem); }
  .ih-content { gap: 12px; }
  .ih-sticker-img { height: 34vh; max-height: 240px; }
  .ih-sticker-outer { right: 14px; }
  .ih-meta { gap: 8px; font-size: 0.85rem; }
  .ih-status { margin-left: 0; }

  .full-rule { margin: 0 20px; }

  .bio-section { padding: 56px 20px 48px; }

  .section-block { padding: 48px 20px; }
  .tl-head { flex-direction: column; gap: 2px; }
  .tl-dates { font-size: 0.78rem; }

  .gallery-mosaic { grid-template-columns: 1fr; gap: 10px; }

  .info-cta { padding: 48px 20px 56px; }
  .cta-headline { font-size: clamp(2.2rem, 10vw, 3rem); }
  .cta-actions { width: 100%; }
  .cta-btn { flex: 1; justify-content: center; }

  .info-social { padding: 0 20px 48px; }
  .social-inner { gap: 18px; }
}
</style>
