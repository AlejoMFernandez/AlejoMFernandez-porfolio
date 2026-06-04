<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const bottle    = root.querySelector('.pra-bottle')
  const leafL     = root.querySelector('.pra-leaf-l')
  const leafR     = root.querySelector('.pra-leaf-r')
  const leafBotL  = root.querySelector('.pra-leaf-bot-l')
  const leafBotR  = root.querySelector('.pra-leaf-bot-r')
  const stem      = root.querySelector('.pra-stem')
  const petals    = root.querySelectorAll('.pra-petal')
  const dots      = root.querySelectorAll('.pra-dot')
  const ringOuter = root.querySelector('.pra-ring-outer')

  if (bottle) {
    tweens.push(gsap.fromTo(bottle,
      { y: 0 },
      { y: -12, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
  if (leafL) {
    tweens.push(gsap.fromTo(leafL,
      { rotation: -3, transformOrigin: '100% 90%' },
      { rotation: 2, transformOrigin: '100% 90%', duration: 4.0, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
  if (leafR) {
    tweens.push(gsap.fromTo(leafR,
      { rotation: 2.5, transformOrigin: '0% 90%' },
      { rotation: -2, transformOrigin: '0% 90%', duration: 4.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5 }
    ))
  }
  if (leafBotL) {
    tweens.push(gsap.fromTo(leafBotL,
      { rotation: -2, transformOrigin: '80% 80%' },
      { rotation: 2, transformOrigin: '80% 80%', duration: 5.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.0 }
    ))
  }
  if (leafBotR) {
    tweens.push(gsap.fromTo(leafBotR,
      { rotation: 2, transformOrigin: '20% 80%' },
      { rotation: -2, transformOrigin: '20% 80%', duration: 5.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4 }
    ))
  }
  if (stem) {
    tweens.push(gsap.fromTo(stem,
      { rotation: -1, transformOrigin: '50% 100%' },
      { rotation: 1, transformOrigin: '50% 100%', duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
  petals.forEach((p, i) => {
    const dx = (i % 2 === 0 ? 1 : -1) * (5 + i * 1.8)
    const dy = -3 - i * 1.2
    tweens.push(gsap.fromTo(p,
      { x: 0, y: 0 },
      { x: dx, y: dy, duration: 2.8 + i * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4 }
    ))
  })
  dots.forEach((d, i) => {
    tweens.push(gsap.fromTo(d,
      { x: 0, y: 0, opacity: 0.4 },
      { x: (i % 2 === 0 ? 4 : -4), y: -7, opacity: 0.85,
        duration: 2.2 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.6 }
    ))
  })
  if (ringOuter) {
    tweens.push(gsap.fromTo(ringOuter,
      { opacity: 0.12 },
      { opacity: 0.28, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="-60 67 900 900" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Puraa botanical composition">
      <defs>
        <linearGradient id="prat-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#1e3d28"/>
          <stop offset="55%"  stop-color="#152c1e"/>
          <stop offset="100%" stop-color="#0c1c12"/>
        </linearGradient>
        <radialGradient id="prat-halo" cx="0.28" cy="0.52" r="0.45">
          <stop offset="0%"   stop-color="#4a8c5c" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#4a8c5c" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="prat-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#000000" stop-opacity="0.28"/>
          <stop offset="50%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.32"/>
        </linearGradient>
        <linearGradient id="prat-bottle-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#d8c9a8"/>
          <stop offset="50%"  stop-color="#f0e8d4"/>
          <stop offset="100%" stop-color="#c4b490"/>
        </linearGradient>
        <linearGradient id="prat-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#6dbf82" stop-opacity="0.90"/>
          <stop offset="100%" stop-color="#3a7a4d" stop-opacity="0.98"/>
        </linearGradient>
      </defs>

      <rect x="-200" width="1800" height="1000" fill="url(#prat-bg)"/>
      <rect x="-200" width="1800" height="1000" fill="url(#prat-halo)"/>
      <rect x="-200" width="1800" height="1000" fill="url(#prat-vignette)"/>

      <!-- ── Composición botánica ── -->
      <g transform="translate(50 60)">

        <!-- Círculo decorativo de fondo -->
        <circle class="pra-ring-outer"
                cx="340" cy="465" r="290"
                fill="rgba(100,180,120,0.04)"
                stroke="#6abf80" stroke-width="1.2"
                opacity="0.22"/>
        <circle cx="340" cy="465" r="308"
                fill="none" stroke="#6abf80"
                stroke-width="0.7" stroke-dasharray="3 9"
                opacity="0.16"/>

        <!-- Hoja izquierda grande -->
        <g class="pra-leaf-l" transform="translate(55 390)">
          <path d="M 0 0 Q -70 -50 -100 -150 Q -75 -175 -40 -155 Q 0 -120 22 -40 Z"
                fill="rgba(80,148,70,0.82)" stroke="#5aad40" stroke-width="1.5"/>
          <path d="M -8 -10 Q -55 -65 -85 -130"
                stroke="rgba(140,210,100,0.4)" stroke-width="1.1" fill="none"/>
          <path d="M -25 -28 L -55 -75"
                stroke="rgba(140,210,100,0.35)" stroke-width="0.9" fill="none"/>
          <path d="M -42 -16 L -72 -60"
                stroke="rgba(140,210,100,0.35)" stroke-width="0.9" fill="none"/>
        </g>

        <!-- Hoja derecha grande -->
        <g class="pra-leaf-r" transform="translate(625 370)">
          <path d="M 0 0 Q 70 -50 100 -150 Q 75 -175 40 -155 Q 0 -120 -22 -40 Z"
                fill="rgba(80,148,70,0.82)" stroke="#5aad40" stroke-width="1.5"/>
          <path d="M 8 -10 Q 55 -65 85 -130"
                stroke="rgba(140,210,100,0.4)" stroke-width="1.1" fill="none"/>
          <path d="M 25 -28 L 55 -75"
                stroke="rgba(140,210,100,0.35)" stroke-width="0.9" fill="none"/>
        </g>

        <!-- Hoja inferior izquierda -->
        <g class="pra-leaf-bot-l" transform="translate(120 720)">
          <path d="M 0 0 Q 55 -60 130 -40 Q 135 5 90 40 Q 40 42 0 0 Z"
                fill="rgba(100,162,75,0.70)" stroke="#5aad40" stroke-width="1.2"/>
          <path d="M 10 5 Q 70 -25 118 -20"
                stroke="rgba(140,210,100,0.35)" stroke-width="0.9" fill="none"/>
        </g>

        <!-- Hoja inferior derecha -->
        <g class="pra-leaf-bot-r" transform="translate(556 732)">
          <path d="M 0 0 Q -55 -60 -130 -40 Q -135 5 -90 40 Q -40 42 0 0 Z"
                fill="rgba(100,162,75,0.70)" stroke="#5aad40" stroke-width="1.2"/>
          <path d="M -10 5 Q -70 -25 -118 -20"
                stroke="rgba(140,210,100,0.35)" stroke-width="0.9" fill="none"/>
        </g>

        <!-- Tallo central con pequeña flor -->
        <g class="pra-stem">
          <line x1="340" y1="740" x2="340" y2="640"
                stroke="rgba(140,200,100,0.5)" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="340" cy="635" r="7"
                  fill="rgba(160,220,130,0.7)" stroke="#8ddf80" stroke-width="1"/>
          <circle cx="340" cy="635" r="3"
                  fill="rgba(120,200,110,0.9)"/>
        </g>

        <!-- Pétalos flotantes -->
        <g fill="rgba(180,240,140,0.55)" stroke="#a0cf70" stroke-width="0.9">
          <ellipse class="pra-petal" cx="105"  cy="230" rx="16" ry="7"  transform="rotate(28 105 230)"/>
          <ellipse class="pra-petal" cx="580"  cy="255" rx="16" ry="7"  transform="rotate(-22 580 255)"/>
          <ellipse class="pra-petal" cx="95"   cy="790" rx="13" ry="5.5" transform="rotate(18 95 790)"/>
          <ellipse class="pra-petal" cx="600"  cy="800" rx="13" ry="5.5" transform="rotate(-14 600 800)"/>
          <ellipse class="pra-petal" cx="340"  cy="140" rx="11" ry="5"  transform="rotate(5 340 140)"/>
        </g>

        <!-- Puntitos flotantes -->
        <circle class="pra-dot" cx="65"  cy="550" r="5" fill="#8ddf80" opacity="0.55"/>
        <circle class="pra-dot" cx="640" cy="530" r="5" fill="#8ddf80" opacity="0.55"/>
        <circle class="pra-dot" cx="340" cy="95"  r="4" fill="#8ddf80" opacity="0.50"/>
        <circle class="pra-dot" cx="175" cy="815" r="4" fill="#8ddf80" opacity="0.45"/>
        <circle class="pra-dot" cx="510" cy="820" r="4" fill="#8ddf80" opacity="0.45"/>

        <!-- ── BOTELLA (hero) ── -->
        <g class="pra-bottle" transform="translate(195 175) scale(2.6)">
          <!-- Tapa -->
          <rect x="44" y="0"   width="28" height="22" rx="3"  fill="#2a1e10" stroke="#1a1208" stroke-width="1"/>
          <!-- Cuello -->
          <rect x="50" y="-7"  width="16" height="9"  rx="2"  fill="#382610" stroke="#1a1208" stroke-width="0.8"/>
          <!-- Conector cuello-cuerpo -->
          <rect x="51" y="22"  width="14" height="10" fill="url(#prat-bottle-body)" stroke="#a08868" stroke-width="0.8"/>
          <!-- Hombro + cuerpo -->
          <path d="M 28 32 L 88 32 L 94 52 L 94 222 Q 94 244 56 244 Q 18 244 18 222 L 18 52 Z"
                fill="url(#prat-bottle-body)" stroke="#a08868" stroke-width="1.4"/>
          <!-- Líquido serum -->
          <path d="M 20 128 L 92 128 L 92 222 Q 92 242 56 242 Q 20 242 20 222 Z"
                fill="url(#prat-liquid)"/>
          <!-- Etiqueta -->
          <rect x="28" y="90"  width="56" height="90" rx="3"
                fill="rgba(255,255,255,0.90)" stroke="#b09a78" stroke-width="0.8"/>
          <rect x="40" y="110" width="32" height="5" rx="1.5" fill="#162a1a" opacity="0.85"/>
          <line x1="34" y1="121" x2="78" y2="121" stroke="#5aad40" stroke-width="0.6"/>
          <line x1="38" y1="138" x2="74" y2="138" stroke="#2a5c1a" stroke-width="1.8" opacity="0.7"/>
          <line x1="44" y1="150" x2="68" y2="150" stroke="#3a6a2a" stroke-width="1.4" opacity="0.6"/>
          <!-- Reflejo lateral (cristal) -->
          <line x1="23" y1="40" x2="23" y2="215"
                stroke="rgba(255,255,255,0.38)" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Reflejo pequeño -->
          <line x1="30" y1="38" x2="30" y2="80"
                stroke="rgba(255,255,255,0.18)" stroke-width="1.5" stroke-linecap="round"/>
        </g>

      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
