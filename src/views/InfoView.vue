<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useLocalized } from '../composables/useLocalized.js'
import personal from '../data/personal.json'
import Footer from '../components/Footer.vue'

const { t } = useI18n()
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

// ---- Photo carousel ----
const carouselIndex = ref(0)
const photos = personal.fotosAboutMe.galeria
const prevPhoto = () => { carouselIndex.value = (carouselIndex.value - 1 + photos.length) % photos.length }
const nextPhoto = () => { carouselIndex.value = (carouselIndex.value + 1) % photos.length }

// ---- Date range formatter ----
const formatDateRange = (inicio, fin) => {
  const start = inicio ? inicio.split('-')[0] : ''
  const end = fin && fin !== 'Actualidad' ? fin.split('-')[0] : t('common.present')
  return `${start} → ${end}`
}

onMounted(() => {
  gsap.from('.ih-name', { opacity: 0, y: 32, duration: 0.85, ease: 'power3.out', delay: 0.1 })
  gsap.from('.ih-meta',  { opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.45 })
  gsap.from('.ib-left',  { opacity: 0, x: -20, duration: 0.8, ease: 'power3.out', delay: 0.3 })
  gsap.from(['.bio-prose', '.exp-section', '.edu-section', '.skills-section', '.langs-row'], {
    opacity: 0, y: 18, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.45
  })
})

onUnmounted(() => {
  if (audioEl.value) { audioEl.value.pause(); audioEl.value.src = '' }
})
</script>

<template>
  <div class="info-view">

    <!-- ===== MASTHEAD ===== -->
    <section class="info-masthead">
      <div class="ih-inner">
        <div class="ih-rule"></div>
        <div class="ih-head">
          <h1 class="ih-name">{{ personal.nombre }}<br>{{ personal.apellido }}</h1>
          <p class="ih-meta">{{ l(personal.titulo) }} · {{ personal.ubicacion }}</p>
        </div>
        <div class="ih-rule"></div>
      </div>
    </section>

    <!-- ===== BIO GRID ===== -->
    <section class="info-body">
      <div class="ib-grid">

        <!-- LEFT: photo + music + cv -->
        <aside class="ib-left">

          <div class="profile-photo-wrap">
            <img
              :src="personal.fotosAboutMe.perfil"
              :alt="personal.nombre + ' ' + personal.apellido"
              class="profile-photo"
            />
          </div>

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

          <a href="/images/aboutme/Alejo-Martin-Fernandez-CV.pdf" download class="cv-link">
            <span>{{ t('info.downloadCV') }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>

        </aside>

        <!-- RIGHT: bio + experience + education + skills -->
        <div class="ib-right">

          <div class="bio-prose">
            <p>{{ l(personal.about.whoAmI) }}</p>
            <p>{{ l(personal.about.whereImFrom) }}</p>
            <p>{{ l(personal.about.hobbies) }}</p>
            <p>{{ l(personal.about.whatIDoNow) }}</p>
            <p>{{ l(personal.about.whatImLookingFor) }}</p>
          </div>

          <div class="info-rule"></div>

          <div class="exp-section">
            <p class="section-label">{{ t('info.experience') }}</p>
            <div class="timeline">
              <div v-for="job in personal.experiencia" :key="job.empresa + job.fechaInicio" class="tl-item">
                <div class="tl-head">
                  <span class="tl-company">{{ job.empresa }}</span>
                  <span class="tl-dates">{{ formatDateRange(job.fechaInicio, job.fechaFin) }}</span>
                </div>
                <p class="tl-role">{{ l(job.puesto) }} · {{ typeof job.ubicacion === 'object' ? l(job.ubicacion) : job.ubicacion }}</p>
              </div>
            </div>
          </div>

          <div class="info-rule"></div>

          <div class="edu-section">
            <p class="section-label">{{ t('info.education') }}</p>
            <div class="timeline">
              <div v-for="edu in personal.educacion" :key="edu.institucion" class="tl-item">
                <div class="tl-head">
                  <span class="tl-company">{{ edu.institucion }}</span>
                  <span class="tl-dates">{{ formatDateRange(edu.fechaInicio, edu.fechaFin) }}</span>
                </div>
                <p class="tl-role">{{ l(edu.titulo) }}</p>
              </div>
            </div>
          </div>

          <div class="info-rule"></div>

          <div class="skills-section">
            <p class="section-label">{{ t('info.skillsDev') }}</p>
            <div class="skills-list">
              <span v-for="skill in personal.habilidades.desarrollo" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
          </div>

          <div class="langs-row">
            <template v-for="(lang, i) in personal.idiomas" :key="i">
              <span class="lang-item">{{ l(lang.idioma) }} <span class="lang-level">{{ l(lang.nivel) }}</span></span>
              <span v-if="i < personal.idiomas.length - 1" class="lang-sep">·</span>
            </template>
          </div>

        </div>
      </div>
    </section>

    <!-- ===== GALLERY ===== -->
    <section class="gallery-section">
      <div class="gallery-stage-wrap">
        <div class="gallery-stage">
          <transition name="gfade" mode="out-in">
            <img
              :key="carouselIndex"
              :src="photos[carouselIndex].src"
              :alt="l(photos[carouselIndex].label)"
              class="gallery-img"
            />
          </transition>
          <span class="gallery-caption">{{ l(photos[carouselIndex].label) }}</span>
        </div>
        <div class="gallery-nav">
          <button class="gnav-btn" @click="prevPhoto" aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="gallery-dots">
            <button
              v-for="(_, i) in photos"
              :key="i"
              class="gdot"
              :class="{ active: i === carouselIndex }"
              @click="carouselIndex = i"
              :aria-label="`Foto ${i + 1}`"
            />
          </div>
          <button class="gnav-btn" @click="nextPhoto" aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ===== SOCIAL + CONTACT ===== -->
    <section class="social-section">
      <div class="ss-inner">

        <div class="social-strip">
          <a :href="personal.redes.github"    target="_blank" rel="noopener" class="soc-link">
            GitHub <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
          <a :href="personal.redes.linkedin"  target="_blank" rel="noopener" class="soc-link">
            LinkedIn <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
          <a :href="personal.redes.instagram" target="_blank" rel="noopener" class="soc-link">
            Instagram <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
          <a v-if="personal.redes.tiktok" :href="personal.redes.tiktok" target="_blank" rel="noopener" class="soc-link">
            TikTok <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
          <a :href="personal.redes.whatsapp"  target="_blank" rel="noopener" class="soc-link">
            WhatsApp <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>

        <RouterLink to="/contacto" class="contact-block">
          <img src="/images/stickerapuntando.png" alt="" class="contact-sticker" aria-hidden="true" />
          <div class="contact-text">
            <p class="contact-heading">{{ t('info.letsConnect') }}</p>
            <p class="contact-sub">{{ t('info.contactSubtitle') }}</p>
          </div>
          <svg class="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>

      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.info-view {
  min-height: 100vh;
}

/* ===== MASTHEAD ===== */
.info-masthead {
  padding: 118px 48px 0;
}

.ih-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.ih-rule {
  width: 100%;
  height: 1px;
  background: var(--border-color);
}

.ih-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 28px 0 24px;
  gap: 24px;
}

.ih-name {
  font-size: clamp(2.8rem, 5vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--text-primary);
}

.ih-meta {
  font-size: 0.88rem;
  color: var(--text-tertiary);
  font-weight: 400;
  text-align: right;
  flex-shrink: 0;
  padding-bottom: 6px;
}

/* ===== BIO GRID ===== */
.info-body {
  padding: 64px 48px 72px;
}

.ib-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 72px;
  align-items: start;
}

/* ---- LEFT COLUMN ---- */
.ib-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 96px;
}

.profile-photo-wrap {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 6px;
  background: var(--bg-secondary);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.55s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .profile-photo-wrap:hover .profile-photo {
    transform: scale(1.04);
  }
}

/* Music widget */
.music-widget {
  background: #111;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  gap: 12px;
}

.mw-art {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.mw-text {
  flex: 1;
  min-width: 0;
}

.mw-track {
  font-size: 0.86rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.mw-artist {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mw-album {
  font-size: 0.7rem;
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
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  color: #fff;
}

@media (hover: hover) and (pointer: fine) {
  .mw-play:hover { background: rgba(255, 255, 255, 0.24); }
}

/* CV link */
.cv-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.86rem;
  font-weight: 500;
  padding: 12px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  transition: color 0.2s var(--ease-out);
}

.cv-link:active {
  opacity: 0.6;
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .cv-link:hover { color: var(--text-primary); }
}

/* ---- RIGHT COLUMN ---- */
.ib-right {
  display: flex;
  flex-direction: column;
}

.bio-prose {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 40px;
}

.bio-prose p {
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.75;
  color: var(--text-secondary);
}

.info-rule {
  width: 100%;
  height: 1px;
  background: var(--border-color);
  margin: 36px 0;
}

/* Section label — small, clean, not all-caps */
.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-tertiary);
  margin-bottom: 20px;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tl-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 3px;
}

.tl-company {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.tl-dates {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.tl-role {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Skills */
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
  padding: 5px 14px;
  border-radius: 50px;
  font-weight: 500;
  transition:
    color 0.18s var(--ease-out),
    background 0.18s var(--ease-out),
    border-color 0.18s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .skill-tag:hover {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }
}

/* Languages */
.langs-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.lang-item {
  font-size: 0.86rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 5px;
}

.lang-level {
  color: var(--text-tertiary);
}

.lang-sep {
  color: var(--border-color);
  user-select: none;
}

/* ===== GALLERY ===== */
.gallery-section {
  padding: 0 48px 72px;
}

.gallery-stage-wrap {
  max-width: 1400px;
  margin: 0 auto;
}

.gallery-stage {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background: var(--bg-secondary);
  margin-bottom: 18px;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.gallery-caption {
  position: absolute;
  bottom: 14px;
  left: 18px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 4px;
}

.gallery-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.gnav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    background 0.2s var(--ease-out),
    color 0.2s var(--ease-out),
    border-color 0.2s var(--ease-out);
}

.gnav-btn:active {
  transform: scale(0.9);
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .gnav-btn:hover {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }
}

.gallery-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gdot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  background: var(--border-color);
  cursor: pointer;
  padding: 0;
  transition:
    background 0.2s var(--ease-out),
    transform 0.2s var(--ease-spring);
}

.gdot.active {
  background: var(--text-primary);
  transform: scale(1.4);
}

/* Gallery transition */
.gfade-enter-active,
.gfade-leave-active { transition: opacity 0.28s var(--ease-out); }
.gfade-enter-from,
.gfade-leave-to { opacity: 0; }

/* ===== SOCIAL + CONTACT ===== */
.social-section {
  padding: 0 48px 80px;
}

.ss-inner {
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.social-strip {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
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
  .soc-link:hover { color: var(--text-primary); }
}

/* Contact block */
.contact-block {
  display: flex;
  align-items: center;
  gap: 24px;
  text-decoration: none;
  color: var(--text-primary);
  padding: 28px;
  background: var(--bg-secondary);
  border-radius: 12px;
  transition:
    background 0.22s var(--ease-out),
    transform 0.22s var(--ease-out);
}

.contact-block:active {
  transform: scale(0.99);
  transition-duration: 0.08s;
}

@media (hover: hover) and (pointer: fine) {
  .contact-block:hover { background: var(--bg-tertiary); }
}

.contact-sticker {
  width: 76px;
  height: 76px;
  object-fit: contain;
  flex-shrink: 0;
  transition: transform 0.38s var(--ease-spring);
}

@media (hover: hover) and (pointer: fine) {
  .contact-block:hover .contact-sticker {
    transform: scale(1.1) rotate(-5deg);
  }
}

.contact-text {
  flex: 1;
  min-width: 0;
}

.contact-heading {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.contact-sub {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.contact-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: transform 0.2s var(--ease-out), color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .contact-block:hover .contact-arrow {
    transform: translateX(5px);
    color: var(--text-primary);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .ib-grid {
    grid-template-columns: 260px 1fr;
    gap: 52px;
  }
}

@media (max-width: 768px) {
  .info-masthead { padding: 90px 24px 0; }
  .ih-head { flex-direction: column; align-items: flex-start; gap: 8px; }
  .ih-meta { text-align: left; }
  .info-body { padding: 48px 24px 64px; }
  .ib-grid { grid-template-columns: 1fr; gap: 40px; }
  .ib-left {
    position: static;
    display: grid;
    grid-template-columns: 140px 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
  .profile-photo-wrap {
    grid-row: 1 / 3;
    aspect-ratio: 3 / 4;
    height: auto;
  }
  .music-widget { grid-column: 2; }
  .cv-link { grid-column: 2; align-self: end; }
  .gallery-section { padding: 0 24px 60px; }
  .social-section { padding: 0 24px 60px; }
  .contact-block { gap: 16px; padding: 20px; }
}

@media (max-width: 520px) {
  .info-masthead { padding: 80px 16px 0; }
  .info-body { padding: 36px 16px 48px; }
  .ib-left {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .profile-photo-wrap {
    grid-row: auto;
    aspect-ratio: 4 / 3;
  }
  .music-widget { grid-column: auto; }
  .cv-link { grid-column: auto; }
  .gallery-section { padding: 0 16px 48px; }
  .gallery-stage { aspect-ratio: 4 / 3; }
  .social-section { padding: 0 16px 56px; }
  .social-strip { gap: 16px; }
  .contact-sticker { width: 56px; height: 56px; }
  .contact-heading { font-size: 1.1rem; }
}
</style>
