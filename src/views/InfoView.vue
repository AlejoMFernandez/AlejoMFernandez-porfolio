<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocalized } from '../composables/useLocalized.js'
import personal from '../data/personal.json'
import Footer from '../components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const { l } = useLocalized()

const audioEl = ref(null)
const isPlaying = ref(false)

const togglePlay = () => {
  if (!audioEl.value) return
  if (isPlaying.value) {
    audioEl.value.pause()
    isPlaying.value = false
  } else {
    audioEl.value.play()
    isPlaying.value = true
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr === 'Actualidad' || dateStr === 'Present') return t('common.present')
  if (dateStr.length === 4) return dateStr
  const [year, month] = dateStr.split('-')
  const monthsEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const months = locale.value === 'es' ? monthsEs : monthsEn
  return `${months[parseInt(month) - 1]} ${year}`
}

onMounted(() => {
  gsap.from('.about-container > *', {
    y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.15
  })

  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
    })
  })

  gsap.utils.toArray('.stagger-reveal').forEach((container) => {
    gsap.from(container.children, {
      scrollTrigger: { trigger: container, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.src = ''
  }
})
</script>

<template>
  <div class="info-view">

    <!-- ===== ABOUT BENTO ===== -->
    <section class="about-section">
      <div class="about-container">

        <!-- Left: glass card with blurbs -->
        <div class="about-text-col">
          <div class="glass-card">
            <h2 class="about-heading">{{ t('info.aboutMe') }}</h2>
            <div class="blurb">
              <div class="blurbdivider">
                <span class="blurb-label">{{ t('info.whoAmI') }}</span>
                <span class="section-divider-line"></span>
              </div>
              <p class="blurb-text">{{ l(personal.about.whoAmI) }}</p>
            </div>
            <div class="blurb">
              <div class="blurbdivider">
                <span class="blurb-label">{{ t('info.whereImFrom') }}</span>
                <span class="section-divider-line"></span>
              </div>
              <p class="blurb-text">{{ l(personal.about.whereImFrom) }}</p>
            </div>
            <div class="blurb">
              <div class="blurbdivider">
                <span class="blurb-label">{{ t('info.hobbies') }}</span>
                <span class="section-divider-line"></span>
              </div>
              <p class="blurb-text">{{ l(personal.about.hobbies) }}</p>
            </div>
            <div class="blurb">
              <div class="blurbdivider">
                <span class="blurb-label">{{ t('info.whatIDoNow') }}</span>
                <span class="section-divider-line"></span>
              </div>
              <p class="blurb-text">{{ l(personal.about.whatIDoNow) }}</p>
            </div>
            <div class="blurb">
              <div class="blurbdivider">
                <span class="blurb-label">{{ t('info.whatImLookingFor') }}</span>
                <span class="section-divider-line"></span>
              </div>
              <p class="blurb-text">{{ l(personal.about.whatImLookingFor) }}</p>
            </div>
          </div>
        </div>

        <!-- Right: bento grid -->
        <div class="about-cards-col">
          <div class="bento-grid">

            <!-- Profile (square) -->
            <div class="bento-card profile-card">
              <img
                :src="personal.fotosAboutMe.perfil"
                :alt="personal.nombre"
                class="profile-img"
              />
            </div>

            <!-- Song card (square) - Apple Music style -->
            <div class="bento-card song-card">
              <!-- Hidden audio element -->
              <audio ref="audioEl" :src="personal.cancionFavorita.mp3" preload="none" />

              <!-- Badge links to Apple Music -->
              <a :href="personal.cancionFavorita.applemusic" target="_blank" class="am-badge" @click.stop>
                <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
                </svg>
              </a>

              <div class="song-art-wrap">
                <img
                  :src="personal.cancionFavorita.portada"
                  :alt="personal.cancionFavorita.album"
                  class="song-cover"
                />
              </div>
              <div class="song-info">
                <p class="song-title">{{ personal.cancionFavorita.titulo }}</p>
                <p class="song-artist">{{ personal.cancionFavorita.artista }} — <span class="song-album">{{ personal.cancionFavorita.album }}</span></p>
              </div>
              <div class="song-controls">
                <button class="song-ctrl" disabled>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                </button>
                <button class="song-ctrl" disabled>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button class="song-ctrl play" @click="togglePlay">
                  <!-- Pause icon -->
                  <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  <!-- Play icon -->
                  <svg v-else viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <button class="song-ctrl" disabled>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 18l8.5-6L6 6v12zm2.5-6l5.5 3.93V8.07L8.5 12zM16 6h2v12h-2z"/></svg>
                </button>
                <button class="song-ctrl" disabled>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                </button>
              </div>
            </div>

            <!-- Social card (full-width rectangular) -->
            <div class="bento-card social-card">
              <a :href="personal.redes.github" target="_blank" class="soc-link soc-github">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a :href="personal.redes.linkedin" target="_blank" class="soc-link soc-linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a :href="personal.redes.instagram" target="_blank" class="soc-link soc-instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
              <a :href="personal.redes.upwork" target="_blank" class="soc-link soc-upwork">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.917 2.37 5.295 5.281 5.295 2.913 0 5.283-2.378 5.283-5.295v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3.373 0 6.11-2.747 6.11-6.12-.001-3.373-2.738-6.12-6.11-6.12z"/></svg>
              </a>
              <a :href="personal.redes.whatsapp" target="_blank" class="soc-link soc-whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              </a>
            </div>

            <!-- 4 photos (squares) -->
            <div
              v-for="foto in personal.fotosAboutMe.galeria"
              :key="foto.src"
              class="bento-photo"
            >
              <img :src="foto.src" :alt="l(foto.label)" class="bento-photo-img" />
              <span class="bento-photo-label">{{ l(foto.label) }}</span>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- ===== EXPERIENCE ===== -->
    <section class="content-section">
      <div class="section-container">
        <div class="reveal-up">
          <h2 class="section-title-large">{{ t('info.experience') }}</h2>
          <div class="experience-timeline stagger-reveal">
            <div
              v-for="(exp, index) in personal.experiencia"
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-date">
                <span class="date-range">{{ formatDate(exp.fechaInicio) }} — {{ formatDate(exp.fechaFin) }}</span>
                <span class="date-location" v-if="exp.ubicacion">{{ l(exp.ubicacion) }}</span>
              </div>
              <div class="timeline-content">
                <h3 class="timeline-company">{{ exp.empresa }}</h3>
                <p class="timeline-role">{{ l(exp.puesto) }}</p>
                <p class="timeline-description">{{ l(exp.descripcion) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== EDUCATION + COURSES ===== -->
    <section class="content-section alt-bg">
      <div class="section-container">
        <div class="two-column-grid reveal-up">
          <div class="column">
            <h2 class="section-title-medium">{{ t('info.education') }}</h2>
            <div class="stagger-reveal">
              <div v-for="(edu, index) in personal.educacion" :key="index" class="edu-item">
                <span class="edu-date">{{ edu.fechaInicio }} — {{ edu.fechaFin === 'Actualidad' ? t('common.present') : edu.fechaFin }}</span>
                <h4 class="edu-title">{{ l(edu.titulo) }}</h4>
                <p class="edu-institution">{{ edu.institucion }}</p>
              </div>
            </div>
          </div>
          <div class="column">
            <h2 class="section-title-medium">{{ t('info.courses') }}</h2>
            <div class="stagger-reveal">
              <div v-for="(curso, index) in personal.cursos" :key="index" class="edu-item">
                <h4 class="edu-title">{{ l(curso.nombre) }}</h4>
                <p class="edu-institution">{{ curso.institucion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SKILLS ===== -->
    <section class="content-section">
      <div class="section-container">
        <div class="reveal-up">
          <h2 class="section-title-large">{{ t('info.skills') }}</h2>
          <div class="skills-categories stagger-reveal">
            <div class="skill-category">
              <h3 class="category-title">{{ t('info.skillsDev') }}</h3>
              <div class="skills-list">
                <span v-for="skill in personal.habilidades.desarrollo" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
            </div>
            <div class="skill-category">
              <h3 class="category-title">{{ t('info.skillsInfra') }}</h3>
              <div class="skills-list">
                <span v-for="skill in l(personal.habilidades.infraestructura)" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CONTACT CTA ===== -->
    <section class="contact-section">
      <div class="section-container">
        <div class="contact-content reveal-up">
          <h2 class="contact-title">{{ t('info.contact') }}</h2>
          <p class="contact-subtitle">{{ t('info.contactSubtitle') }}</p>
          <RouterLink
            v-magnetic="{ strength: 0.2, scale: 1.03 }"
            to="/contacto"
            class="contact-cta magnetic-btn"
          >
            {{ t('nav.contact') }}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.info-view {
  min-height: 100vh;
}

/* ===== ABOUT BENTO ===== */
.about-section {
  padding: 120px 48px 50px;
}

.about-container {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

/* ---- Left: glass card ---- */
.glass-card {
  background: rgba(245, 245, 247, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 22px;
  padding: 40px 36px;
  height: 100%;
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  .glass-card {
    background: rgba(22, 22, 23, 0.55);
    border-color: rgba(255, 255, 255, 0.07);
  }
}

.about-heading {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 36px;
  color: var(--text-primary);
}

.section-divider-line {
  width: 30%;
  height: 1.6px;
  background: var(--border-color);
}

.blurbdivider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 5px;
}

.blurb {
  margin-bottom: 20px;
}

.blurb:last-child {
  margin-bottom: 0;
}

.blurb-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-tertiary);
}

.blurb-text {
  font-size: 0.93rem;
  line-height: 1.45;
  color: var(--text-secondary);
}

/* ---- Right: bento grid ---- */
.about-cards-col {
  width: 100%;
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.bento-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* Profile card — square */
.profile-card {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: stretch;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* ---- Song card (square, Apple Music style) ---- */
.song-card {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.06);
  position: relative;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.song-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
}

.am-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  background: #fc3c44;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.am-badge:hover {
  opacity: 0.85;
}

.song-art-wrap {
  flex-shrink: 0;
}

.song-cover {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: block;
}

.song-info {
  flex: 1;
  min-height: 0;
}

.song-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-album {
  font-style: italic;
}

.song-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 5px 10px;
  gap: 2px;
}

.song-ctrl {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  background: none;
  border: none;
  cursor: default;
  padding: 4px 5px;
  transition: color 0.2s ease;
  line-height: 1;
}

.song-ctrl[disabled] {
  opacity: 0.55;
  cursor: default;
}

.song-card:hover .song-ctrl:not([disabled]) {
  color: #fff;
}

.song-ctrl.play {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  color: #fff;
  flex-shrink: 0;
  cursor: pointer;
}

.song-ctrl.play:hover {
  background: rgba(255, 255, 255, 0.28);
}

/* ---- Social card (full-width) ---- */
.social-card {
  grid-column: 1 / -1;
  display: flex;
  align-items: stretch;
  padding: 0;
  overflow: hidden;
  border-radius: 18px;
  background: transparent;
  border: none;
  gap: 0;
  height: 72px;
}

.soc-link {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: filter 0.2s ease, transform 0.2s ease;
  padding: 10px 6px;
}

.soc-link:first-child { border-radius: 18px 0 0 18px; }
.soc-link:last-child  { border-radius: 0 18px 18px 0; }

.soc-link:hover {
  filter: brightness(1.15);
  transform: translateY(-2px);
}

.soc-github    { background: #24292e; }
.soc-linkedin  { background: #0A66C2; }
.soc-instagram { background: linear-gradient(135deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888); }
.soc-upwork    { background: #108a00; }
.soc-whatsapp  { background: #25D366; }

/* ---- Photo squares ---- */
.bento-photo {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.bento-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.bento-photo:hover .bento-photo-img {
  transform: scale(1.06);
}

.bento-photo-label {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  padding: 3px 8px;
  border-radius: 5px;
}

/* ===== CONTENT SECTIONS ===== */
.content-section {
  padding: 50px 48px 100px;
}

.content-section.alt-bg {
  background: var(--bg-secondary);
}

.section-container {
  max-width: 1080px;
  margin: 0 auto;
}

.section-title-large {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 56px;
}

.section-title-medium {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 36px;
}

/* Experience Timeline */
.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border-color);
}

.timeline-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline-date {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-range {
  font-size: 0.88rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.date-location {
  font-size: 0.82rem;
  color: var(--text-tertiary);
}

.timeline-company {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.timeline-role {
  font-size: 1rem;
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 10px;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.93rem;
}

/* Education */
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
}

.edu-item {
  margin-bottom: 28px;
}

.edu-item:last-child {
  margin-bottom: 0;
}

.edu-date {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
}

.edu-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 3px;
}

.edu-institution {
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.9rem;
}

/* Skills */
.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.category-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-tertiary);
  margin-bottom: 18px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background: var(--bg-secondary);
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.alt-bg .skill-tag {
  background: var(--bg-primary);
}

.skill-tag:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
  transform: translateY(-2px);
}

/* Contact CTA */
.contact-section {
  padding: 120px 48px;
  background: var(--text-primary);
  color: var(--bg-primary);
}

.contact-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.contact-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
}

.contact-subtitle {
  font-size: 1.1rem;
  opacity: 0.65;
  margin-bottom: 44px;
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 1.15rem;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  padding: 16px 32px;
  border: 2px solid currentColor;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-cta:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
  transform: translateY(-3px);
}

.contact-cta svg {
  transition: transform 0.3s ease;
}

.contact-cta:hover svg {
  transform: translate(3px, -3px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .about-section {
    padding: 100px 24px 80px;
  }

  .about-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .glass-card {
    height: auto;
  }

  .content-section {
    padding: 72px 24px;
  }

  .contact-section {
    padding: 80px 24px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .two-column-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
}

@media (max-width: 600px) {
  .about-section {
    padding: 90px 16px 64px;
  }

  .glass-card {
    padding: 28px 22px;
  }

  .bento-grid {
    gap: 8px;
  }

  .social-card {
    height: 60px;
  }

  .soc-link span {
    display: none;
  }

  .content-section {
    padding: 56px 20px;
  }

  .contact-section {
    padding: 64px 20px;
  }
}
</style>
