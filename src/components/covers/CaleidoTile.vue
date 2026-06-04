<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const petalsA = root.querySelector('.clt-petalsA')
  const petalsB = root.querySelector('.clt-petalsB')
  const ticks   = root.querySelector('.clt-ticks')
  const glow    = root.querySelector('.clt-glow')
  const core    = root.querySelector('.clt-core')

  // Two petal layers counter-rotate: the living kaleidoscope.
  if (petalsA) tweens.push(gsap.to(petalsA, { rotation: 360,  svgOrigin: '500 500', duration: 50, ease: 'none', repeat: -1 }))
  if (petalsB) tweens.push(gsap.to(petalsB, { rotation: -360, svgOrigin: '500 500', duration: 38, ease: 'none', repeat: -1 }))
  if (ticks)   tweens.push(gsap.to(ticks,   { rotation: 360,  svgOrigin: '500 500', duration: 60, ease: 'none', repeat: -1 }))

  // Glow and core breathe gently around the center.
  if (glow) tweens.push(gsap.fromTo(glow,
    { opacity: 0.35, scale: 0.92, svgOrigin: '500 500' },
    { opacity: 0.6,  scale: 1.08, svgOrigin: '500 500', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }
  ))
  if (core) tweens.push(gsap.fromTo(core,
    { scale: 0.85, svgOrigin: '500 500' },
    { scale: 1.15, svgOrigin: '500 500', duration: 1.9, ease: 'sine.inOut', yoyo: true, repeat: -1 }
  ))
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="clt-cover">
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" class="clt-svg"
         role="img" aria-label="Caleido — mandala generativo">
      <defs>
        <radialGradient id="clt-bg" cx="50%" cy="50%" r="72%">
          <stop offset="0%"   stop-color="#1A2030"/>
          <stop offset="55%"  stop-color="#0E1119"/>
          <stop offset="100%" stop-color="#07090D"/>
        </radialGradient>
        <radialGradient id="clt-glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="#B0E660" stop-opacity="0.55"/>
          <stop offset="60%"  stop-color="#B0E660" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#B0E660" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="clt-limeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#E2FBAE"/>
          <stop offset="50%"  stop-color="#B0E660"/>
          <stop offset="100%" stop-color="#74A634"/>
        </linearGradient>
        <linearGradient id="clt-violetGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#C7BEFC"/>
          <stop offset="50%"  stop-color="#9A8CF5"/>
          <stop offset="100%" stop-color="#6354C9"/>
        </linearGradient>
        <path id="clt-petalA" d="M 500 70 C 432 270 432 405 500 500 C 568 405 568 270 500 70 Z"/>
        <path id="clt-petalB" d="M 500 205 C 452 335 452 425 500 500 C 548 425 548 335 500 205 Z"/>
      </defs>

      <rect width="1000" height="1000" fill="url(#clt-bg)"/>

      <!-- Radial glow that breathes behind the mandala -->
      <circle class="clt-glow" cx="500" cy="500" r="360" fill="url(#clt-glowGrad)"/>

      <!-- Concentric construction rings -->
      <g fill="none" stroke="#F6F7F9" stroke-opacity="0.1" stroke-width="1.5">
        <circle cx="500" cy="500" r="120"/>
        <circle cx="500" cy="500" r="210"/>
        <circle cx="500" cy="500" r="300"/>
        <circle cx="500" cy="500" r="390"/>
        <circle cx="500" cy="500" r="450"/>
      </g>

      <!-- Lime petal layer (12, every 30°) -->
      <g class="clt-petalsA" fill="url(#clt-limeGrad)" fill-opacity="0.62">
        <use href="#clt-petalA" transform="rotate(0 500 500)"/>
        <use href="#clt-petalA" transform="rotate(30 500 500)"/>
        <use href="#clt-petalA" transform="rotate(60 500 500)"/>
        <use href="#clt-petalA" transform="rotate(90 500 500)"/>
        <use href="#clt-petalA" transform="rotate(120 500 500)"/>
        <use href="#clt-petalA" transform="rotate(150 500 500)"/>
        <use href="#clt-petalA" transform="rotate(180 500 500)"/>
        <use href="#clt-petalA" transform="rotate(210 500 500)"/>
        <use href="#clt-petalA" transform="rotate(240 500 500)"/>
        <use href="#clt-petalA" transform="rotate(270 500 500)"/>
        <use href="#clt-petalA" transform="rotate(300 500 500)"/>
        <use href="#clt-petalA" transform="rotate(330 500 500)"/>
      </g>

      <!-- Violet petal layer (12, offset 15°) -->
      <g class="clt-petalsB" fill="url(#clt-violetGrad)" fill-opacity="0.6">
        <use href="#clt-petalB" transform="rotate(15 500 500)"/>
        <use href="#clt-petalB" transform="rotate(45 500 500)"/>
        <use href="#clt-petalB" transform="rotate(75 500 500)"/>
        <use href="#clt-petalB" transform="rotate(105 500 500)"/>
        <use href="#clt-petalB" transform="rotate(135 500 500)"/>
        <use href="#clt-petalB" transform="rotate(165 500 500)"/>
        <use href="#clt-petalB" transform="rotate(195 500 500)"/>
        <use href="#clt-petalB" transform="rotate(225 500 500)"/>
        <use href="#clt-petalB" transform="rotate(255 500 500)"/>
        <use href="#clt-petalB" transform="rotate(285 500 500)"/>
        <use href="#clt-petalB" transform="rotate(315 500 500)"/>
        <use href="#clt-petalB" transform="rotate(345 500 500)"/>
      </g>

      <!-- Flower-of-life rosette at the heart -->
      <g fill="none" stroke="#B0E660" stroke-opacity="0.45" stroke-width="1.5">
        <circle cx="500" cy="500" r="58"/>
        <circle cx="558" cy="500" r="58"/>
        <circle cx="529" cy="550" r="58"/>
        <circle cx="471" cy="550" r="58"/>
        <circle cx="442" cy="500" r="58"/>
        <circle cx="471" cy="450" r="58"/>
        <circle cx="529" cy="450" r="58"/>
      </g>

      <!-- Dashed tick ring (slow counter-rotation) -->
      <circle class="clt-ticks" cx="500" cy="500" r="468" fill="none"
              stroke="#9A8CF5" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="2 26"/>

      <!-- Pulsing core -->
      <g class="clt-core">
        <circle cx="500" cy="500" r="32" fill="none" stroke="#B0E660" stroke-opacity="0.7" stroke-width="2"/>
        <circle cx="500" cy="500" r="20" fill="#B0E660"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.clt-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.clt-svg   { width: 100%; height: 100%; display: block; }
</style>
