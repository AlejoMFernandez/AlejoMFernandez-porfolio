<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const body      = root.querySelector('.ink-body')
  const floorOuter = root.querySelector('.ink-floor-outer')
  const floorInner = root.querySelector('.ink-floor-inner')
  const scanline  = root.querySelector('.ink-scanline')
  const markers   = root.querySelectorAll('.ink-marker-core')

  // ── Cuerpo: respiración muy sutil (escala desde el centro del torso)
  if (body) {
    tweens.push(gsap.fromTo(body,
      { scale: 0.98, transformOrigin: '800px 480px' },
      { scale: 1.01, transformOrigin: '800px 480px',
        duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }

  // ── Glow del piso: pulso de opacidad (efecto scan de piso)
  if (floorOuter) {
    tweens.push(gsap.fromTo(floorOuter,
      { opacity: 0.3 },
      { opacity: 0.55, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
  if (floorInner) {
    tweens.push(gsap.fromTo(floorInner,
      { opacity: 0.1 },
      { opacity: 0.25, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.4 }
    ))
  }

  // ── Línea de scan: baja por el cuerpo en loop (efecto scanner médico)
  if (scanline) {
    tweens.push(gsap.fromTo(scanline,
      { y: -320, opacity: 0 },
      {
        keyframes: [
          { y: -320, opacity: 0,   duration: 0    },
          { y: -300, opacity: 0.9, duration: 0.25 },
          { y:  400, opacity: 0.9, duration: 2.5  },
          { y:  420, opacity: 0,   duration: 0.25 }
        ],
        duration: 3,
        ease: 'none',
        repeat: -1,
        repeatDelay: 1.5
      }
    ))
  }

  // ── Markers (los puntos rojos): pulso independiente (GSAP complementa al SMIL)
  markers.forEach((m, i) => {
    tweens.push(gsap.fromTo(m,
      { scale: 0.9, transformOrigin: 'center' },
      { scale: 1.1, transformOrigin: 'center',
        duration: 0.6 + i * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.5 }
    ))
  })

  // Wordmark: sin animación (texto quieto)
})

onUnmounted(() => {
  tweens.forEach(t => t.kill())
  tweens = []
})
</script>

<template>
  <div ref="rootRef" class="ink-cover">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" class="ink-svg"
         role="img" aria-label="InkManager body map preview">
      <defs>
        <radialGradient id="ink-vignette" cx="50%" cy="40%" r="70%">
          <stop offset="0%"  stop-color="#1a0606"/>
          <stop offset="60%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#000000"/>
        </radialGradient>
        <linearGradient id="ink-bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#2a2050"/>
          <stop offset="100%" stop-color="#19172a"/>
        </linearGradient>
        <pattern id="ink-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(220,38,38,0.06)" stroke-width="1"/>
        </pattern>
        <filter id="ink-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#ink-vignette)"/>
      <rect width="1600" height="1000" fill="url(#ink-grid)" opacity="0.5"/>

      <!-- Corner brackets -->
      <g stroke="#ef4444" stroke-width="2" fill="none" opacity="0.55">
        <path d="M 40 40 L 80 40 M 40 40 L 40 80"/>
        <path d="M 1560 40 L 1520 40 M 1560 40 L 1560 80"/>
        <path d="M 40 960 L 80 960 M 40 960 L 40 920"/>
        <path d="M 1560 960 L 1520 960 M 1560 960 L 1560 920"/>
      </g>

      <!-- Label top-left -->
      <text x="80" y="100" font-family="'Courier New', monospace" font-size="14" fill="#6b7280" letter-spacing="6">
        / / 3D BODY MAP — STUDIO PREVIEW
      </text>

      <!-- Floor glow -->
      <ellipse class="ink-floor-outer" cx="800" cy="880" rx="280" ry="40" fill="#3a0000" opacity="0.4"/>
      <ellipse class="ink-floor-inner" cx="800" cy="880" rx="180" ry="22" fill="#ef4444" opacity="0.15"/>

      <!-- Body silhouette -->
      <g class="ink-body" transform="translate(800, 480)" stroke="rgba(255,255,255,0.12)" stroke-width="2">
        <ellipse cx="0" cy="-260" rx="55" ry="65" fill="url(#ink-bodyGrad)"/>
        <ellipse cx="0" cy="-200" rx="38" ry="22" fill="url(#ink-bodyGrad)"/>
        <rect x="-22" y="-175" width="44" height="35" rx="10" fill="url(#ink-bodyGrad)"/>
        <path d="M -130 -140 L 130 -140 L 145 80 L -145 80 Z" fill="url(#ink-bodyGrad)"/>
        <path d="M -145 80 L 145 80 L 130 130 L -130 130 Z" fill="url(#ink-bodyGrad)"/>
        <path d="M -130 -130 L -200 100 L -175 130 L -120 -100 Z" fill="url(#ink-bodyGrad)"/>
        <path d="M -200 100 L -240 280 L -215 295 L -175 130 Z" fill="url(#ink-bodyGrad)"/>
        <ellipse cx="-230" cy="305" rx="22" ry="28" fill="url(#ink-bodyGrad)"/>
        <path d="M 130 -130 L 200 100 L 175 130 L 120 -100 Z" fill="url(#ink-bodyGrad)"/>
        <path d="M 200 100 L 240 280 L 215 295 L 175 130 Z" fill="url(#ink-bodyGrad)"/>
        <ellipse cx="230" cy="305" rx="22" ry="28" fill="url(#ink-bodyGrad)"/>
        <path d="M -115 130 L -135 320 L -85 330 L -55 140 Z" fill="url(#ink-bodyGrad)"/>
        <path d="M -135 320 L -125 380 L -75 390 L -85 330 Z" fill="url(#ink-bodyGrad)"/>
        <ellipse cx="-100" cy="395" rx="38" ry="14" fill="url(#ink-bodyGrad)"/>
        <path d="M 115 130 L 135 320 L 85 330 L 55 140 Z" fill="url(#ink-bodyGrad)"/>
        <path d="M 135 320 L 125 380 L 75 390 L 85 330 Z" fill="url(#ink-bodyGrad)"/>
        <ellipse cx="100" cy="395" rx="38" ry="14" fill="url(#ink-bodyGrad)"/>

        <!-- Línea de scan (scanner médico) — más ancha y más visible -->
        <line class="ink-scanline" x1="-200" y1="-320" x2="200" y2="-320"
              stroke="#ef4444" stroke-width="2.5" opacity="0" stroke-dasharray="6 3"/>
      </g>

      <!-- Markers (pulsing — mantienen SMIL + se agrega GSAP) -->
      <g filter="url(#ink-glow)">
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

      <!-- TATTOO callout — brazo derecho del personaje (screen right) -->
      <g transform="translate(1050 510)" opacity="0.9">
        <!-- flecha apuntando al marcador del brazo -->
        <line x1="-55" y1="0" x2="-15" y2="16" stroke="#ef4444" stroke-width="1.2" stroke-linecap="round"/>
        <polygon points="-15,16 -22,8 -8,8" fill="#ef4444"/>
        <!-- etiqueta -->
        <rect x="-54" y="-18" width="60" height="22" rx="3" fill="rgba(10,10,10,0.75)" stroke="#ef4444" stroke-width="1"/>
        <text x="-24" y="-3" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="700" fill="#ef4444" letter-spacing="2">TATTOO</text>
      </g>

      <!-- Wordmark bottom-right -->
      <text class="ink-wordmark" x="1520" y="880" font-family="Impact, 'Arial Black', sans-serif"
            font-size="52" fill="#ffffff" text-anchor="end" letter-spacing="6">INKMANAGER</text>
      <line x1="1200" y1="895" x2="1520" y2="895" stroke="#ef4444" stroke-width="1" opacity="0.6"/>
      <text x="1520" y="920" font-family="'Courier New', monospace" font-size="12"
            fill="#9ca3af" text-anchor="end" letter-spacing="4">DIGITAL STUDIO SYSTEM</text>
    </svg>
  </div>
</template>

<style scoped>
.ink-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.ink-svg   { width: 100%; height: 100%; display: block; }
</style>
