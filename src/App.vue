<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavBar from './components/NavBar.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import { useCursor } from './composables/useCursor.js'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

const showNavBar = computed(() => {
  return !route.path.startsWith('/proyecto/') && route.path !== '/lab'
})

// Custom cursor (desktop only)
useCursor()

// GSAP page transition hooks
function onBeforeEnter(el) {
  gsap.set(el, { autoAlpha: 0, y: 40 })
}

function onEnter(el, done) {
  gsap.to(el, {
    autoAlpha: 1,
    y: 0,
    duration: 0.65,
    ease: 'power3.out',
    onComplete: done
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    autoAlpha: 0,
    y: -30,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: done
  })
}
</script>

<template>
  <!-- Custom cursor (hidden on touch devices via CSS) -->
  <div class="cursor-dot" />
  <div class="cursor-ring" />

  <!-- Scroll progress line -->
  <ScrollProgress />

  <!-- Fondo de partículas sutil -->
  <ParticlesBackground />

  <!-- NavBar persistente (excepto en detalle de proyecto) -->
  <NavBar v-if="showNavBar" />

  <RouterView v-slot="{ Component }">
    <Transition
      mode="out-in"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
/* ── Custom cursor ── */
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  will-change: transform;
  /* GSAP uses transform:translate so we offset to center */
  margin-left: -4px;
  margin-top: -4px;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--text-primary);
}

.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--text-primary);
  background: transparent;
  margin-left: -18px;
  margin-top: -18px;
  opacity: 0.8;
}

@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}

/* ── Hide default cursor on desktop ── */
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}
</style>
