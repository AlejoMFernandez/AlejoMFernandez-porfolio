<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dot = ref(null)
const ring = ref(null)

let mouseX = 0, mouseY = 0
let lerpX = 0, lerpY = 0
let raf = null

function onMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (dot.value) {
    dot.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  }
}

function tick() {
  lerpX += (mouseX - lerpX) * 0.1
  lerpY += (mouseY - lerpY) * 0.1
  if (ring.value) {
    ring.value.style.transform = `translate(${lerpX}px, ${lerpY}px)`
  }
  raf = requestAnimationFrame(tick)
}

function onOver(e) {
  const el = e.target.closest('a, button, [role="button"], .featured-card, .other-card, .see-all-btn')
  if (el) ring.value?.classList.add('is-hover')
}

function onOut(e) {
  const el = e.target.closest('a, button, [role="button"], .featured-card, .other-card, .see-all-btn')
  if (el) ring.value?.classList.remove('is-hover')
}

onMounted(() => {
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)
  tick()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseout', onOut)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="dot" class="c-dot" aria-hidden="true"></div>
  <div ref="ring" class="c-ring" aria-hidden="true"></div>
</template>

<style>
@media (hover: hover) and (pointer: fine) {
  * { cursor: none !important; }

  .c-dot {
    position: fixed;
    top: -4px;
    left: -4px;
    width: 8px;
    height: 8px;
    background: var(--text-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    will-change: transform;
    mix-blend-mode: difference;
  }

  .c-ring {
    position: fixed;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
    border: 1px solid var(--text-tertiary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    will-change: transform;
    transition:
      width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      top 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.3s ease,
      background 0.3s ease;
  }

  .c-ring.is-hover {
    width: 64px;
    height: 64px;
    top: -32px;
    left: -32px;
    border-color: var(--accent-color);
    background: rgba(56, 189, 248, 0.07);
  }
}
</style>
