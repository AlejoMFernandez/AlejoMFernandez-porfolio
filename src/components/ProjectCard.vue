<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const cardRef = ref(null)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  return `${month}/${year}`
}

const handleMouseMove = (e) => {
  if (!cardRef.value) return
  
  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  gsap.to(cardRef.value, {
    rotateX: rotateX,
    rotateY: rotateY,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const handleMouseLeave = () => {
  if (!cardRef.value) return
  
  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: 'power2.out'
  })
}
</script>

<template>
  <RouterLink 
    :to="`/proyecto/${project.id}`" 
    class="project-card-link"
  >
    <article 
      ref="cardRef"
      class="project-card"
      :style="{ '--card-bg': project.colorFondo, '--card-text': project.colorTexto }"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="card-content">
        <div class="card-header">
          <span class="card-date">
            {{ formatDate(project.fechaInicio) }} — {{ formatDate(project.fechaFin) }}
          </span>
          <div class="card-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </div>

        <div class="card-body">
          <h3 class="card-title">{{ project.nombre }}</h3>
          <p class="card-description">{{ project.descripcionCorta }}</p>
        </div>

        <div class="card-footer">
          <div class="card-techs">
            <span 
              v-for="tech in project.tecnologias.slice(0, 3)" 
              :key="tech" 
              class="tech-badge"
            >
              {{ tech }}
            </span>
            <span v-if="project.tecnologias.length > 3" class="tech-badge more">
              +{{ project.tecnologias.length - 3 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Imagen de fondo opcional -->
      <div 
        v-if="project.imagenPrincipal" 
        class="card-image"
      >
        <img :src="project.imagenPrincipal" :alt="project.nombre" />
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
.project-card-link {
  text-decoration: none;
  display: block;
  perspective: 1000px;
}

.project-card {
  position: relative;
  background: var(--card-bg, var(--bg-secondary));
  color: var(--card-text, var(--text-primary));
  border-radius: 24px;
  padding: 28px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.project-card:hover {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: auto;
}

.card-date {
  font-size: 0.85rem;
  opacity: 0.8;
  font-weight: 500;
}

.card-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.project-card:hover .card-arrow {
  background: rgba(255, 255, 255, 0.3);
  transform: translate(4px, -4px);
}

.card-body {
  margin-top: auto;
  padding-top: 60px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.card-description {
  font-size: 0.95rem;
  opacity: 0.85;
  line-height: 1.5;
  margin-bottom: 20px;
}

.card-footer {
  margin-top: auto;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.tech-badge.more {
  background: rgba(255, 255, 255, 0.1);
}

.card-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  opacity: 0.15;
  pointer-events: none;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));
}

@media (max-width: 768px) {
  .project-card {
    min-height: 280px;
    padding: 24px;
  }

  .card-title {
    font-size: 1.35rem;
  }

  .card-image {
    display: none;
  }
}
</style>
