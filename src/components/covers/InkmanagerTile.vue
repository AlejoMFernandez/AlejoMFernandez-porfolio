<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const body       = root.querySelector('.ink-body')
  const floorOuter = root.querySelector('.ink-floor-outer')
  const floorInner = root.querySelector('.ink-floor-inner')
  const scanline   = root.querySelector('.ink-scanline')
  const markers    = root.querySelectorAll('.ink-marker-core')

  if (body) {
    tweens.push(gsap.fromTo(body,
      { scale: 0.98, transformOrigin: '800px 480px' },
      { scale: 1.01, transformOrigin: '800px 480px', duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
  if (floorOuter) {
    tweens.push(gsap.fromTo(floorOuter, { opacity: 0.3 }, { opacity: 0.55, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
  if (floorInner) {
    tweens.push(gsap.fromTo(floorInner, { opacity: 0.1 }, { opacity: 0.25, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.4 }))
  }
  if (scanline) {
    tweens.push(gsap.fromTo(scanline,
      { y: -320, opacity: 0 },
      { keyframes: [
          { y: -320, opacity: 0,   duration: 0    },
          { y: -300, opacity: 0.9, duration: 0.25 },
          { y:  400, opacity: 0.9, duration: 2.5  },
          { y:  420, opacity: 0,   duration: 0.25 }
        ], duration: 3, ease: 'none', repeat: -1, repeatDelay: 1.5 }))
  }
  markers.forEach((m, i) => {
    tweens.push(gsap.fromTo(m,
      { scale: 0.9, transformOrigin: 'center' },
      { scale: 1.1, transformOrigin: 'center', duration: 0.6 + i * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.5 }))
  })
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="400 120 800 800" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="InkManager body map">
      <defs>
        <radialGradient id="inkt-vignette" cx="50%" cy="45%" r="70%">
          <stop offset="0%"  stop-color="#1a0606"/>
          <stop offset="60%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#000000"/>
        </radialGradient>
        <linearGradient id="inkt-bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#2a2050"/>
          <stop offset="100%" stop-color="#19172a"/>
        </linearGradient>
        <pattern id="inkt-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(220,38,38,0.06)" stroke-width="1"/>
        </pattern>
        <filter id="inkt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect x="400" y="120" width="800" height="800" fill="url(#inkt-vignette)"/>
      <rect x="400" y="120" width="800" height="800" fill="url(#inkt-grid)" opacity="0.5"/>

      <ellipse class="ink-floor-outer" cx="800" cy="880" rx="280" ry="40" fill="#3a0000" opacity="0.4"/>
      <ellipse class="ink-floor-inner" cx="800" cy="880" rx="180" ry="22" fill="#ef4444" opacity="0.15"/>

      <g class="ink-body" transform="translate(800, 480)" stroke="rgba(255,255,255,0.12)" stroke-width="2">
        <ellipse cx="0" cy="-260" rx="55" ry="65" fill="url(#inkt-bodyGrad)"/>
        <ellipse cx="0" cy="-200" rx="38" ry="22" fill="url(#inkt-bodyGrad)"/>
        <rect x="-22" y="-175" width="44" height="35" rx="10" fill="url(#inkt-bodyGrad)"/>
        <path d="M -130 -140 L 130 -140 L 145 80 L -145 80 Z" fill="url(#inkt-bodyGrad)"/>
        <path d="M -145 80 L 145 80 L 130 130 L -130 130 Z" fill="url(#inkt-bodyGrad)"/>
        <path d="M -130 -130 L -200 100 L -175 130 L -120 -100 Z" fill="url(#inkt-bodyGrad)"/>
        <path d="M -200 100 L -240 280 L -215 295 L -175 130 Z" fill="url(#inkt-bodyGrad)"/>
        <ellipse cx="-230" cy="305" rx="22" ry="28" fill="url(#inkt-bodyGrad)"/>
        <path d="M 130 -130 L 200 100 L 175 130 L 120 -100 Z" fill="url(#inkt-bodyGrad)"/>
        <path d="M 200 100 L 240 280 L 215 295 L 175 130 Z" fill="url(#inkt-bodyGrad)"/>
        <ellipse cx="230" cy="305" rx="22" ry="28" fill="url(#inkt-bodyGrad)"/>
        <path d="M -115 130 L -135 320 L -85 330 L -55 140 Z" fill="url(#inkt-bodyGrad)"/>
        <path d="M -135 320 L -125 380 L -75 390 L -85 330 Z" fill="url(#inkt-bodyGrad)"/>
        <ellipse cx="-100" cy="395" rx="38" ry="14" fill="url(#inkt-bodyGrad)"/>
        <path d="M 115 130 L 135 320 L 85 330 L 55 140 Z" fill="url(#inkt-bodyGrad)"/>
        <path d="M 135 320 L 125 380 L 75 390 L 85 330 Z" fill="url(#inkt-bodyGrad)"/>
        <ellipse cx="100" cy="395" rx="38" ry="14" fill="url(#inkt-bodyGrad)"/>

        <line class="ink-scanline" x1="-200" y1="-320" x2="200" y2="-320"
              stroke="#ef4444" stroke-width="2.5" opacity="0" stroke-dasharray="6 3"/>
      </g>

      <g filter="url(#inkt-glow)">
        <g transform="translate(700, 360)">
          <circle r="20" fill="#ef4444" opacity="0.25">
            <animate attributeName="r" values="14;24;14" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle class="ink-marker-core" r="9" fill="#ef4444"/>
          <circle r="4" fill="#fee2e2"/>
        </g>
        <g transform="translate(990, 600)">
          <circle r="20" fill="#ef4444" opacity="0.25">
            <animate attributeName="r" values="14;24;14" dur="2.7s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.7s" repeatCount="indefinite"/>
          </circle>
          <circle class="ink-marker-core" r="9" fill="#ef4444"/>
          <circle r="4" fill="#fee2e2"/>
        </g>
        <g transform="translate(810, 420)">
          <circle r="20" fill="#ef4444" opacity="0.25">
            <animate attributeName="r" values="14;24;14" dur="1.9s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0;0.4" dur="1.9s" repeatCount="indefinite"/>
          </circle>
          <circle class="ink-marker-core" r="9" fill="#ef4444"/>
          <circle r="4" fill="#fee2e2"/>
        </g>
        <g transform="translate(740, 720)">
          <circle r="20" fill="#ef4444" opacity="0.25">
            <animate attributeName="r" values="14;24;14" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle class="ink-marker-core" r="9" fill="#ef4444"/>
          <circle r="4" fill="#fee2e2"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
