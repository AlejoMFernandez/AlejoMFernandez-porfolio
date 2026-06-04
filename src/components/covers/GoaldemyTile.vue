<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const ball    = root.querySelector('.gdm-ball')
  const trail   = root.querySelector('.gdm-trail')
  const players = root.querySelectorAll('.gdm-player')

  // ── Pelota: secuencia de pases P4→P9→P10→P7→REMATE AL ARCO
  const TOTAL_DUR = 5.2
  tweens.push(gsap.fromTo(ball,
    { x: -110, y: 50 },
    {
      keyframes: [
        { x: -110, y: 50,   duration: 0.35 },
        { x: -170, y: -200, duration: 0.55 },
        { x: -170, y: -200, duration: 0.25 },
        { x: -10,  y: -160, duration: 0.5  },
        { x: -10,  y: -160, duration: 0.25 },
        { x: 140,  y: -210, duration: 0.5  },
        { x: 140,  y: -210, duration: 0.3  },
        { x: -10,  y: -370, duration: 0.6  },
        { x: -10,  y: -370, duration: 0.4  },
        { x: -110, y: 50,   duration: 0.5  }
      ],
      duration: TOTAL_DUR,
      ease: 'none',
      repeat: -1,
      repeatDelay: 1.0
    }
  ))

  // ── Trail: traza la ruta del pase final (P7 → Arco)
  if (trail) {
    const len = trail.getTotalLength()
    tweens.push(gsap.fromTo(trail,
      { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
      {
        keyframes: [
          { strokeDashoffset: len, opacity: 0,   duration: 3.5 },
          { strokeDashoffset: 0,   opacity: 0.8, duration: 0.6 },
          { strokeDashoffset: 0,   opacity: 0.8, duration: 0.4 },
          { strokeDashoffset: 0,   opacity: 0,   duration: 0.7 }
        ],
        duration: TOTAL_DUR,
        ease: 'none',
        repeat: -1,
        repeatDelay: 1.0
      }
    ))
  }

  // ── Players: pulso que se activa en el momento del pase
  const playerDelays = [0.9, 1.65, 2.4, 0.0, 3.8]
  players.forEach((p, i) => {
    tweens.push(gsap.fromTo(p,
      { scale: 1, transformOrigin: 'center' },
      { scale: 1.22, transformOrigin: 'center',
        duration: 0.25, ease: 'back.out(2)',
        repeat: -1, repeatDelay: TOTAL_DUR + 1.0 - 0.25,
        delay: playerDelays[i] }
    ))
  })
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="50 160 700 700" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Goaldemy football pitch">
      <defs>
        <linearGradient id="gdmt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#03081A"/>
          <stop offset="100%" stop-color="#162035"/>
        </linearGradient>
        <radialGradient id="gdmt-glow" cx="0.3" cy="0.55" r="0.55">
          <stop offset="0%"  stop-color="#22d3ee" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="gdmt-pitch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#0f3a1d"/>
          <stop offset="100%" stop-color="#0a2614"/>
        </linearGradient>
        <filter id="gdmt-blur"><feGaussianBlur stdDeviation="0.4"/></filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#gdmt-bg)"/>
      <rect width="1600" height="1000" fill="url(#gdmt-glow)"/>

      <!-- Grid -->
      <g opacity="0.05" stroke="#ffffff" stroke-width="0.6">
        <line x1="0" y1="120" x2="700" y2="120"/><line x1="0" y1="220" x2="700" y2="220"/>
        <line x1="0" y1="320" x2="700" y2="320"/><line x1="0" y1="420" x2="700" y2="420"/>
        <line x1="0" y1="520" x2="700" y2="520"/><line x1="0" y1="620" x2="700" y2="620"/>
        <line x1="0" y1="720" x2="700" y2="720"/><line x1="0" y1="820" x2="700" y2="820"/>
      </g>

      <!-- Football pitch -->
      <g transform="translate(120 200)" filter="url(#gdmt-blur)">
        <rect x="0" y="0" width="560" height="620" rx="6" fill="url(#gdmt-pitch)" stroke="#22d3ee" stroke-width="2" opacity="0.95"/>
        <line x1="0" y1="310" x2="560" y2="310" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <circle cx="280" cy="310" r="68" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <circle cx="280" cy="310" r="4" fill="#ffffff" opacity="0.7"/>
        <rect x="180" y="0"   width="200" height="80" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <rect x="230" y="0"   width="100" height="30" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <rect x="180" y="540" width="200" height="80" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <rect x="230" y="590" width="100" height="30" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>

        <!-- Players (animados) -->
        <g class="gdm-player"><circle cx="120" cy="180" r="14" fill="#22d3ee"/></g>
        <g class="gdm-player"><circle cx="280" cy="220" r="14" fill="#22d3ee"/></g>
        <g class="gdm-player"><circle cx="430" cy="170" r="14" fill="#22d3ee"/></g>
        <g class="gdm-player"><circle cx="180" cy="430" r="14" fill="#f59e0b"/></g>
        <g class="gdm-player"><circle cx="380" cy="450" r="14" fill="#f59e0b"/></g>

        <!-- Ball (animada) -->
        <g class="gdm-ball">
          <circle cx="290" cy="380" r="9" fill="#ffffff"/>
          <circle cx="290" cy="380" r="9" fill="none" stroke="#03081A" stroke-width="1.2"/>
        </g>

        <!-- Trail: disparo de P7(430,170) al arco top-center(280,15) -->
        <path class="gdm-trail" d="M 430 170 Q 350 90 280 15"
              fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-dasharray="6 4" opacity="0"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
