<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const flightPath = root.querySelector('.ac-flightpath')
  const plane      = root.querySelector('.ac-plane')
  const grid       = root.querySelector('.ac-grid')
  const radars     = root.querySelectorAll('.ac-radar')

  // ── Radar / sonar: cada pin expande y desvanece en loop
  radars.forEach((r, i) => {
    tweens.push(gsap.fromTo(r,
      { attr: { r: 7 }, opacity: 0.75 },
      { attr: { r: 48 }, opacity: 0,
        duration: 2.4, ease: 'power1.out', repeat: -1,
        delay: i * 0.6
      }
    ))
  })

  // ── Ruta: se dibuja y borra en loop
  if (flightPath) {
    const len = flightPath.getTotalLength()
    tweens.push(gsap.fromTo(flightPath,
      { strokeDasharray: len, strokeDashoffset: len, opacity: 0.4 },
      { strokeDashoffset: 0, opacity: 0.95,
        duration: 3.2, ease: 'power1.inOut',
        yoyo: true, repeat: -1, repeatDelay: 0.6 }
    ))
  }

  // ── Avión: sigue la ruta Buenos Aires → Florianópolis → Rio
  if (plane) {
    tweens.push(gsap.fromTo(plane,
      { x: 0, y: 0, opacity: 0 },
      {
        keyframes: [
          { x: 0,   y: 0,    opacity: 0,  duration: 0    },
          { x: 0,   y: 0,    opacity: 1,  duration: 0.3  },
          { x: 158, y: -112, opacity: 1,  duration: 1.4  },
          { x: 243, y: -188, opacity: 1,  duration: 0.9  },
          { x: 243, y: -188, opacity: 0,  duration: 0.4  }
        ],
        duration: 3.0,
        ease: 'none',
        repeat: -1,
        repeatDelay: 1.4
      }
    ))
  }

  // ── Grid lat/long: respiración muy sutil
  if (grid) {
    tweens.push(gsap.fromTo(grid,
      { opacity: 0.04 },
      { opacity: 0.12, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="-136 69 900 900" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Ariana de Viaje South America map">
      <defs>
        <linearGradient id="act-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#01201f"/>
          <stop offset="100%" stop-color="#023a38"/>
        </linearGradient>
        <radialGradient id="act-glow-ba" cx="0.25" cy="0.72" r="0.38">
          <stop offset="0%"   stop-color="#02b6b0" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#02b6b0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="act-glow-rio" cx="0.50" cy="0.50" r="0.35">
          <stop offset="0%"   stop-color="#fbbf24" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="act-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#000000" stop-opacity="0.45"/>
          <stop offset="50%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </linearGradient>
      </defs>

      <rect x="-200" width="1800" height="1000" fill="url(#act-bg)"/>
      <rect x="-200" width="1800" height="1000" fill="url(#act-glow-ba)"/>
      <rect x="-200" width="1800" height="1000" fill="url(#act-glow-rio)"/>
      <rect x="-200" width="1800" height="1000" fill="url(#act-vignette)"/>

      <!-- Grid lat/long -->
      <g class="ac-grid" opacity="0.06" stroke="#02b6b0" stroke-width="0.6" fill="none">
        <line x1="60" y1="130" x2="730" y2="130"/>
        <line x1="60" y1="254" x2="730" y2="254"/>
        <line x1="60" y1="378" x2="730" y2="378"/>
        <line x1="60" y1="502" x2="730" y2="502"/>
        <line x1="60" y1="626" x2="730" y2="626"/>
        <line x1="60" y1="750" x2="730" y2="750"/>
        <line x1="60" y1="874" x2="730" y2="874"/>
        <line x1="104" y1="80" x2="104" y2="940"/>
        <line x1="232" y1="80" x2="232" y2="940"/>
        <line x1="360" y1="80" x2="360" y2="940"/>
        <line x1="488" y1="80" x2="488" y2="940"/>
        <line x1="616" y1="80" x2="616" y2="940"/>
        <line x1="744" y1="80" x2="744" y2="940"/>
      </g>

      <!-- ── ARGENTINA ── -->
      <path
        d="M 188 454
           L 288 454
           Q 318 500 320 560
           Q 320 600 270 640
           L 233 659
           Q 218 692 222 738
           Q 208 800 178 862
           Q 152 900 130 888
           Q 96 858 68 812
           Q 42 760 48 692
           Q 52 624 62 558
           Q 72 494 88 455
           Z"
        fill="rgba(2,182,176,0.14)"
        stroke="#02b6b0"
        stroke-width="1.6"
      />

      <!-- ── BRASIL (costa este) ── -->
      <path
        d="M 288 454
           Q 310 436 345 430
           Q 380 440 372 529
           Q 415 498 459 454
           Q 500 400 539 294
           Q 552 245 545 185
           Q 528 148 482 138
           Q 422 148 368 182
           Q 318 218 298 290
           Q 282 356 285 420
           Q 286 440 288 454
           Z"
        fill="rgba(2,182,176,0.10)"
        stroke="#02b6b0"
        stroke-width="1.4"
        stroke-dasharray="6 3"
      />

      <!-- ── RUTA: Buenos Aires → Florianópolis → Rio ── -->
      <path class="ac-flightpath"
            d="M 233 659 Q 295 594 372 529 Q 415 492 459 454"
            fill="none" stroke="#fbbf24" stroke-width="2"
            stroke-dasharray="6 5" opacity="0.5"/>

      <!-- ── RADAR RINGS ── -->
      <circle class="ac-radar" cx="233" cy="659" r="7" fill="none" stroke="#02b6b0" stroke-width="1.8" opacity="0"/>
      <circle class="ac-radar" cx="233" cy="659" r="7" fill="none" stroke="#02b6b0" stroke-width="1"   opacity="0"/>
      <circle class="ac-radar" cx="372" cy="529" r="6" fill="none" stroke="#fbbf24" stroke-width="1.4" opacity="0"/>
      <circle class="ac-radar" cx="372" cy="529" r="6" fill="none" stroke="#fbbf24" stroke-width="0.8" opacity="0"/>
      <circle class="ac-radar" cx="459" cy="454" r="7" fill="none" stroke="#fbbf24" stroke-width="1.8" opacity="0"/>
      <circle class="ac-radar" cx="459" cy="454" r="7" fill="none" stroke="#fbbf24" stroke-width="1"   opacity="0"/>
      <circle class="ac-radar" cx="539" cy="294" r="6" fill="none" stroke="#fbbf24" stroke-width="1.4" opacity="0"/>
      <circle class="ac-radar" cx="539" cy="294" r="6" fill="none" stroke="#fbbf24" stroke-width="0.8" opacity="0"/>

      <!-- ── PINS DE DESTINO (sin texto) ── -->
      <g transform="translate(233 680)">
        <path d="M 0 0 Q -13 -18 0 -36 Q 13 -18 0 0 Z" fill="#02b6b0" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
        <circle cy="-24" r="5.5" fill="#01201f"/>
      </g>
      <g transform="translate(372 548)">
        <path d="M 0 0 Q -10 -14 0 -28 Q 10 -14 0 0 Z" fill="#fbbf24" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
        <circle cy="-18" r="4" fill="#01201f"/>
      </g>
      <g transform="translate(459 474)">
        <path d="M 0 0 Q -13 -18 0 -36 Q 13 -18 0 0 Z" fill="#fbbf24" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
        <circle cy="-24" r="5.5" fill="#01201f"/>
      </g>
      <g transform="translate(539 310)">
        <path d="M 0 0 Q -10 -14 0 -28 Q 10 -14 0 0 Z" fill="#fbbf24" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
        <circle cy="-18" r="4" fill="#01201f"/>
      </g>

      <!-- ── AVIÓN ── -->
      <g class="ac-plane" transform="translate(233 659) rotate(-37)" opacity="0">
        <path d="M 0 0 L 22 -4 L 30 0 L 22 4 L 0 0 Z
                 M 8 -3 L -5 -10 L -5 -2 L 8 -1 Z
                 M 8 3 L -5 10 L -5 2 L 8 1 Z"
              fill="#ffffff" stroke="#fbbf24" stroke-width="1.2"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
