<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'
import personal from '../data/personal.json'
import ProjectCard from '../components/ProjectCard.vue'
import Footer from '../components/Footer.vue'

const { t } = useI18n()
const { l } = useLocalized()

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => a.orden - b.orden)
})

const featuredProjects = computed(() => {
  return sortedProjects.value.filter(p => p.destacado)
})

const otherProjects = computed(() => {
  return sortedProjects.value.filter(p => !p.destacado)
})

const heroRef = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const projectsRef = ref(null)

onMounted(() => {
  // Animación de entrada del hero
  const tl = gsap.timeline()
  
  tl.from(titleRef.value, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from(subtitleRef.value, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .fromTo('.project-card', {
    y: 80,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'transform'
  }, '-=0.3')
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section ref="heroRef" class="hero">
      <div class="hero-content">
        <h1 ref="titleRef" class="hero-title">
          {{ personal.nombre }} {{ personal.apellido }}
        </h1>
        <p ref="subtitleRef" class="hero-subtitle">
          {{ l(personal.subtitulo) }}
        </p>
        <div class="hero-info">
          <span class="hero-role">{{ l(personal.titulo) }}</span>
          <span class="hero-divider">•</span>
          <span class="hero-location">{{ personal.ubicacion }}</span>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section ref="projectsRef" class="projects-section">
      <div class="section-header">
        <h2 class="section-title">{{ t('home.featuredTitle') }}</h2>
        <p class="section-subtitle">{{ t('home.featuredSubtitle') }}</p>
      </div>
      
      <div class="projects-grid featured">
        <ProjectCard 
          v-for="project in featuredProjects" 
          :key="project.id" 
          :project="project"
          class="project-card"
        />
      </div>
    </section>

    <!-- Other Projects Section -->
    <section v-if="otherProjects.length > 0" class="projects-section other">
      <div class="section-header">
        <h2 class="section-title">{{ t('home.moreTitle') }}</h2>
      </div>
      
      <div class="projects-grid">
        <ProjectCard 
          v-for="project in otherProjects" 
          :key="project.id" 
          :project="project"
          class="project-card"
        />
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
}

.hero-content {
  text-align: center;
  max-width: 900px;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 15px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--text-secondary);
  font-weight: 400;
  margin-bottom: 0px;
  line-height: 1.5;
}

.hero-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1rem;
  color: var(--text-tertiary);
}

.hero-divider {
  opacity: 0.5;
}

.projects-section {
  padding: 80px 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.projects-section.other {
  padding-top: 40px;
}

.section-header {
  margin-bottom: 28px;
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.projects-grid.featured {
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .hero {
    min-height: 60vh;
    padding: 100px 20px 60px;
  }

  .hero-info {
    flex-direction: column;
    gap: 8px;
  }

  .hero-divider {
    display: none;
  }

  .projects-section {
    padding: 60px 20px;
  }

  .projects-grid,
  .projects-grid.featured {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
