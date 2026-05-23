<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const bar = document.querySelector('.scroll-progress-bar')
  if (!bar) return

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  })
})
</script>

<template>
  <div class="scroll-progress-track">
    <div class="scroll-progress-bar" />
  </div>
</template>

<style scoped>
.scroll-progress-track {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 9999;
  background: transparent;
  pointer-events: none;
}

.scroll-progress-bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, var(--accent-color), #818cf8, #c084fc);
  transform-origin: left center;
  transform: scaleX(0);
}
</style>
