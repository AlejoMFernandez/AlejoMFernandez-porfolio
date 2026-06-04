<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const ball   = root.querySelector('.cdt-ball')
  const player = root.querySelector('.cdt-player')
  const trophy = root.querySelector('.cdt-trophy')
  const spot   = root.querySelector('.cdt-spot')
  const ucl    = root.querySelector('.cdt-ucl')
  const stars  = root.querySelectorAll('.cdt-star')

  if (ball) {
    tweens.push(gsap.to(ball, { rotation: 360, duration: 6, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }))
  }
  if (player) {
    tweens.push(gsap.fromTo(player, { y: 0 }, { y: -6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
  if (trophy) {
    tweens.push(gsap.fromTo(trophy, { y: 0 }, { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
  if (spot) {
    tweens.push(gsap.fromTo(spot, { opacity: 0.12, scaleX: 0.94, transformOrigin: 'center' },
      { opacity: 0.28, scaleX: 1.06, transformOrigin: 'center', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
  if (ucl) {
    tweens.push(gsap.to(ucl, { rotation: 360, duration: 70, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }))
  }
  stars.forEach((s, i) => {
    tweens.push(gsap.fromTo(s, { opacity: 0.15 },
      { opacity: 0.7, duration: 1.2 + (i % 4) * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: (i % 5) * 0.3 }))
  })
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="36 181 760 760" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Champions.dle player and trophy">
      <defs>
        <linearGradient id="cdt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#0a1224"/>
          <stop offset="100%" stop-color="#1a2636"/>
        </linearGradient>
        <radialGradient id="cdt-glow" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%"  stop-color="#3b82f6" stop-opacity="0.24"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cdt-trophy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
        <filter id="cdt-blur"><feGaussianBlur stdDeviation="0.3"/></filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#cdt-bg)"/>
      <rect width="1600" height="1000" fill="url(#cdt-glow)"/>

      <!-- Stadium stars (ambient, twinkle) -->
      <g fill="#ffffff">
        <circle class="cdt-star" cx="380" cy="240" r="1.6"/><circle class="cdt-star" cx="520" cy="300" r="1.3"/>
        <circle class="cdt-star" cx="640" cy="220" r="1.6"/><circle class="cdt-star" cx="700" cy="360" r="1.1"/>
        <circle class="cdt-star" cx="200" cy="340" r="1.2"/><circle class="cdt-star" cx="120" cy="420" r="1.4"/>
        <circle class="cdt-star" cx="720" cy="520" r="1.3"/><circle class="cdt-star" cx="160" cy="620" r="1.2"/>
        <circle class="cdt-star" cx="660" cy="700" r="1.5"/><circle class="cdt-star" cx="240" cy="760" r="1.2"/>
        <circle class="cdt-star" cx="540" cy="820" r="1.3"/><circle class="cdt-star" cx="320" cy="880" r="1.1"/>
      </g>

      <!-- UCL star pattern (faint, slow rotation) -->
      <g class="cdt-ucl" transform="translate(380 540)" opacity="0.06" stroke="#ffffff" fill="none" stroke-width="1.2">
        <path d="M 0 -180 L 12 -50 L 130 -45 L 30 30 L 60 160 L 0 80 L -60 160 L -30 30 L -130 -45 L -12 -50 Z" transform="rotate(0)"/>
        <path d="M 0 -180 L 12 -50 L 130 -45 L 30 30 L 60 160 L 0 80 L -60 160 L -30 30 L -130 -45 L -12 -50 Z" transform="rotate(45)"/>
        <path d="M 0 -180 L 12 -50 L 130 -45 L 30 30 L 60 160 L 0 80 L -60 160 L -30 30 L -130 -45 L -12 -50 Z" transform="rotate(90)"/>
        <path d="M 0 -180 L 12 -50 L 130 -45 L 30 30 L 60 160 L 0 80 L -60 160 L -30 30 L -130 -45 L -12 -50 Z" transform="rotate(135)"/>
      </g>

      <!-- ── Player + ball + trophy ── -->
      <g transform="translate(280 280)" filter="url(#cdt-blur)">
        <!-- Spotlight -->
        <ellipse class="cdt-spot" cx="100" cy="580" rx="120" ry="22" fill="#3b82f6" opacity="0.18"/>

        <!-- Player silhouette -->
        <g class="cdt-player" fill="#0a1224" stroke="#3b82f6" stroke-width="2.5">
          <circle cx="100" cy="60" r="34"/>
          <path d="M 64 90 L 136 90 L 150 240 L 50 240 Z"/>
          <path d="M 64 100 L 28 220 L 50 240 L 78 110 Z"/>
          <path d="M 136 100 L 200 60 L 215 80 L 150 130 Z"/>
          <path d="M 50 240 L 150 240 L 145 280 L 55 280 Z"/>
          <path d="M 55 280 L 35 470 L 80 480 L 95 290 Z"/>
          <path d="M 105 290 L 220 380 L 235 360 L 145 280 Z"/>
        </g>

        <!-- Ball (spins) -->
        <g class="cdt-ball" transform="translate(260 380)">
          <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#0a1224" stroke-width="1.5"/>
          <polygon points="0,-18 14,-6 9,12 -9,12 -14,-6" fill="#0a1224"/>
          <line x1="0" y1="-32" x2="0" y2="-18" stroke="#0a1224" stroke-width="1.5"/>
          <line x1="32" y1="0" x2="14" y2="-6" stroke="#0a1224" stroke-width="1.5"/>
          <line x1="20" y1="26" x2="9" y2="12" stroke="#0a1224" stroke-width="1.5"/>
          <line x1="-20" y1="26" x2="-9" y2="12" stroke="#0a1224" stroke-width="1.5"/>
          <line x1="-32" y1="0" x2="-14" y2="-6" stroke="#0a1224" stroke-width="1.5"/>
        </g>

        <!-- Trophy (floats) -->
        <g class="cdt-trophy" transform="translate(60 -60)">
          <path d="M 5 30 Q -18 30 -18 60 Q -18 80 5 80" fill="none" stroke="url(#cdt-trophy)" stroke-width="4"/>
          <path d="M 95 30 Q 118 30 118 60 Q 118 80 95 80" fill="none" stroke="url(#cdt-trophy)" stroke-width="4"/>
          <path d="M 5 20 L 95 20 L 88 90 Q 50 100 12 90 Z" fill="url(#cdt-trophy)" stroke="#475569" stroke-width="1"/>
          <rect x="35" y="98" width="30" height="10" fill="url(#cdt-trophy)" stroke="#475569"/>
          <rect x="25" y="108" width="50" height="8" fill="url(#cdt-trophy)" stroke="#475569"/>
          <polygon points="50,40 53.5,49 63,49 55.5,55 58.5,64 50,58.5 41.5,64 44.5,55 37,49 46.5,49" fill="#3b82f6"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
