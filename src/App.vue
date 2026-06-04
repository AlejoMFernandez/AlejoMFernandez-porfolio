<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { gsap } from 'gsap'
import NavBar from './components/NavBar.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import CustomCursor from './components/CustomCursor.vue'
import IntroOverlay from './components/IntroOverlay.vue'

const route = useRoute()

// El header se oculta solo en la vista de detalle del proyecto
const showNavBar = computed(() => {
  return !route.path.startsWith('/proyecto/')
})

// ===== Transiciones de página (cambios de ruta) con GSAP =====
// A propósito usamos hooks JS (:css="false") en lugar de clases CSS:
// main.css tiene un bloque global "prefers-reduced-motion: reduce" que pone
// TODAS las transiciones CSS en 0.01ms !important -> se vuelven invisibles.
// GSAP no se ve afectado por ese bloque, asi que la transicion se ve siempre
// (que es justo lo que se pidio). El :key="route.path" del <component> es lo
// que garantiza que los hooks se disparen en cada cambio de ruta.
const log = (msg) =>
  console.log(
    `%c[PAGE-TX] ${msg}`,
    'background:#38bdf8;color:#000;padding:2px 6px;border-radius:3px;font-weight:700'
  )

const onPageBeforeEnter = (el) => {
  gsap.set(el, { opacity: 0, y: 30, filter: 'blur(8px)' })
}

const onPageEnter = (el, done) => {
  log(`enter  -> ${el.className || el.tagName}`)
  gsap.to(el, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.55,
    ease: 'power3.out',
    onComplete: done
  })
}

const onPageLeave = (el, done) => {
  log(`leave  -> ${el.className || el.tagName}`)
  gsap.to(el, {
    opacity: 0,
    y: -20,
    filter: 'blur(8px)',
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done
  })
}
</script>

<template>
  <!-- Intro / opening sequence (plays once on full page load) -->
  <IntroOverlay />

  <!-- Custom cursor (desktop only via CSS media query) -->
  <CustomCursor />

  <!-- Fondo de particulas sutil -->
  <ParticlesBackground />

  <!-- NavBar persistente (excepto en detalle de proyecto) -->
  <NavBar v-if="showNavBar" />

  <RouterView v-slot="{ Component, route }">
    <Transition
      :css="false"
      mode="out-in"
      @before-enter="onPageBeforeEnter"
      @enter="onPageEnter"
      @leave="onPageLeave"
    >
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>
