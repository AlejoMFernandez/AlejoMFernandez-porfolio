<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import personal from '../data/personal.json'
import Footer from '../components/Footer.vue'

const { t, locale } = useI18n()

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr === 'Actualidad' || dateStr === 'Present') {
    return t('common.present')
  }
  const [year, month] = dateStr.split('-')
  const monthsEs = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const months = locale.value === 'es' ? monthsEs : monthsEn
  return `${months[parseInt(month) - 1]} ${year}`
}

onMounted(() => {
  gsap.from('.info-hero-content > *', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  })

  gsap.from('.info-section', {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.4
  })
})
</script>

<template>
  <div class="info-view">
    <!-- Hero Section -->
    <section class="info-hero">
      <div class="info-hero-content">
        <div class="profile-image-container">
          <div class="profile-image">
            <img :src="personal.imagenes.perfil" :alt="personal.nombre" />
          </div>
        </div>
        
        <h1 class="info-title">{{ personal.nombre }} {{ personal.apellido }}</h1>
        <p class="info-role">{{ personal.titulo }}</p>
        <p class="info-location">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {{ personal.ubicacion }}
        </p>
      </div>
    </section>

    <!-- About Section -->
    <section class="info-section">
      <div class="section-container">
        <div class="section-grid">
          <div class="section-header-side">
            <h2 class="section-label">{{ t('info.aboutMe') }}</h2>
          </div>
          <div class="section-content">
            <p class="bio-text">{{ personal.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Aspiraciones Section -->
    <section class="info-section alt-bg">
      <div class="section-container">
        <div class="section-grid">
          <div class="section-header-side">
            <h2 class="section-label">{{ t('info.aspirations') }}</h2>
          </div>
          <div class="section-content">
            <p class="bio-text">{{ personal.aspiraciones }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="info-section gallery-section" v-if="personal.imagenes.galeria?.length">
      <div class="section-container">
        <div class="section-grid">
          <div class="section-header-side">
            <h2 class="section-label">{{ t('info.gallery') }}</h2>
          </div>
          <div class="section-content">
            <div class="image-gallery">
              <div 
                v-for="(img, index) in personal.imagenes.galeria" 
                :key="index"
                class="gallery-image"
              >
                <img :src="img" :alt="`Foto ${index + 1}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="info-section">
      <div class="section-container">
        <div class="section-grid">
          <div class="section-header-side">
            <h2 class="section-label">{{ t('info.skills') }}</h2>
          </div>
          <div class="section-content">
            <div class="skills-grid">
              <span v-for="skill in personal.habilidades" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="info-section alt-bg" v-if="personal.experiencia?.length">
      <div class="section-container">
        <div class="section-grid">
          <div class="section-header-side">
            <h2 class="section-label">{{ t('info.experience') }}</h2>
          </div>
          <div class="section-content">
            <div class="experience-list">
              <div 
                v-for="(exp, index) in personal.experiencia" 
                :key="index"
                class="experience-item"
              >
                <div class="exp-header">
                  <h3 class="exp-company">{{ exp.empresa }}</h3>
                  <span class="exp-dates">
                    {{ formatDate(exp.fechaInicio) }} — {{ formatDate(exp.fechaFin) }}
                  </span>
                </div>
                <p class="exp-role">{{ exp.puesto }}</p>
                <p class="exp-description">{{ exp.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="info-section contact-section">
      <div class="section-container">
        <div class="contact-content">
          <h2 class="contact-title">{{ t('info.contact') }}</h2>
          <p class="contact-subtitle">{{ t('info.contactSubtitle') }}</p>
          
          <div class="contact-links">
            <a :href="`mailto:${personal.email}`" class="contact-link primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {{ personal.email }}
            </a>
          </div>

          <div class="social-links">
            <a 
              v-if="personal.redes.github"
              :href="personal.redes.github" 
              target="_blank"
              class="social-link"
              title="GitHub"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              v-if="personal.redes.linkedin"
              :href="personal.redes.linkedin" 
              target="_blank"
              class="social-link"
              title="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              v-if="personal.redes.twitter"
              :href="personal.redes.twitter" 
              target="_blank"
              class="social-link"
              title="Twitter"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              v-if="personal.redes.instagram"
              :href="personal.redes.instagram" 
              target="_blank"
              class="social-link"
              title="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.info-view {
  min-height: 100vh;
}

.info-hero {
  padding: 160px 24px 80px;
  text-align: center;
}

.info-hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.profile-image-container {
  margin-bottom: 32px;
}

.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  background: var(--bg-secondary);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.03em;
}

.info-role {
  font-size: 1.25rem;
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 16px;
}

.info-location {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-tertiary);
  font-size: 1rem;
}

/* Sections */
.info-section {
  padding: 80px 24px;
}

.info-section.alt-bg {
  background: var(--bg-secondary);
}

.section-container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 60px;
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  position: sticky;
  top: 100px;
}

.bio-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

/* Gallery */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.gallery-image {
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-image:hover img {
  transform: scale(1.05);
}

/* Skills */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: var(--bg-secondary);
  padding: 12px 20px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.alt-bg .skill-tag {
  background: var(--bg-primary);
}

.skill-tag:hover {
  background: var(--accent-color);
  color: white;
  transform: translateY(-2px);
}

/* Experience */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.experience-item {
  padding-left: 24px;
  border-left: 2px solid var(--accent-color);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.exp-company {
  font-size: 1.25rem;
  font-weight: 600;
}

.exp-dates {
  color: var(--text-tertiary);
  font-size: 0.9rem;
}

.exp-role {
  color: var(--accent-color);
  font-weight: 500;
  margin-bottom: 8px;
}

.exp-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Contact */
.contact-section {
  background: linear-gradient(135deg, var(--accent-color) 0%, #8b5cf6 100%);
  color: white;
}

.contact-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.contact-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 16px;
}

.contact-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

.contact-links {
  margin-bottom: 32px;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.contact-link.primary {
  background: white;
  color: var(--accent-color);
}

.contact-link.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .info-hero {
    padding: 120px 20px 60px;
  }

  .profile-image {
    width: 140px;
    height: 140px;
  }

  .info-section {
    padding: 60px 20px;
  }

  .section-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-label {
    position: static;
  }

  .bio-text {
    font-size: 1.1rem;
  }

  .exp-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
