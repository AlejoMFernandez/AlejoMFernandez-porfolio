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

  // ── Avión: sigue la ruta Buenos Aires → Rio de Janeiro
  // Posición del g en SVG: translate(216 654) = Buenos Aires
  // Hasta Rio (459,466): Δx=+243, Δy=-188, via Floripa(374,542): Δx=+158, Δy=-112
  if (plane) {
    tweens.push(gsap.fromTo(plane,
      { x: 0, y: 0, opacity: 0 },
      {
        keyframes: [
          { x: 0,   y: 0,    opacity: 0,  duration: 0    },
          { x: 0,   y: 0,    opacity: 1,  duration: 0.3  },
          { x: 158, y: -112, opacity: 1,  duration: 1.4  }, // → Florianópolis
          { x: 243, y: -188, opacity: 1,  duration: 0.9  }, // → Rio de Janeiro
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

onUnmounted(() => {
  tweens.forEach(t => t.kill())
  tweens = []
})
</script>

<template>
  <div ref="rootRef" class="ac-cover">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" class="ac-svg"
         role="img" aria-label="Ariana de Viaje travel website preview">
      <defs>
        <linearGradient id="ac-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#01201f"/>
          <stop offset="100%" stop-color="#023a38"/>
        </linearGradient>
        <radialGradient id="ac-glow-ba" cx="0.25" cy="0.72" r="0.38">
          <stop offset="0%"   stop-color="#02b6b0" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#02b6b0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="ac-glow-rio" cx="0.50" cy="0.50" r="0.35">
          <stop offset="0%"   stop-color="#fbbf24" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="ac-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#000000" stop-opacity="0.45"/>
          <stop offset="50%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#ac-bg)"/>
      <rect width="1600" height="1000" fill="url(#ac-glow-ba)"/>
      <rect width="1600" height="1000" fill="url(#ac-glow-rio)"/>
      <rect width="1600" height="1000" fill="url(#ac-vignette)"/>

      <!-- ════ MAPA SUD-AMERICA ════
           Proyección: 16 px/grado
           Origen SVG: (380, 540) = lat -27, lon -50
           x = 380 + (lon + 50) × 16
           y = 540 − (lat + 27) × 16
           Ciudades:
             Buenos Aires  lat=-34.6 lon=-58.4  → (233, 659)
             Florianópolis lat=-27.6 lon=-48.5  → (372, 529)
             Rio de Janeiro lat=-22.9 lon=-43.2 → (459, 454)
             Salvador/Bahia lat=-13.0 lon=-38.5 → (539, 294)
      -->

      <!-- ── LEFT PANEL: clipped to x=[0,800], shifted 100px right ── -->
      <defs>
        <clipPath id="ac-left-clip">
          <rect width="800" height="1000"/>
        </clipPath>
      </defs>
      <g clip-path="url(#ac-left-clip)">
        <g transform="translate(100, 0)">

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

          <!-- ── PINS DE DESTINO ── -->
          <g transform="translate(233 680)">
            <path d="M 0 0 Q -13 -18 0 -36 Q 13 -18 0 0 Z" fill="#02b6b0" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
            <circle cy="-24" r="5.5" fill="#01201f"/>
            <text x="16" y="-13" font-family="'SF Mono',monospace" font-size="11" font-weight="700" fill="#02b6b0">BUENOS AIRES</text>
          </g>
          <g transform="translate(372 548)">
            <path d="M 0 0 Q -10 -14 0 -28 Q 10 -14 0 0 Z" fill="#fbbf24" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
            <circle cy="-18" r="4" fill="#01201f"/>
            <text x="14" y="-9" font-family="'SF Mono',monospace" font-size="9.5" fill="#fbbf24" opacity="0.9">FLORIANÓPOLIS</text>
          </g>
          <g transform="translate(459 474)">
            <path d="M 0 0 Q -13 -18 0 -36 Q 13 -18 0 0 Z" fill="#fbbf24" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
            <circle cy="-24" r="5.5" fill="#01201f"/>
            <text x="16" y="-13" font-family="'SF Mono',monospace" font-size="11" font-weight="700" fill="#fbbf24">RIO DE JANEIRO</text>
          </g>
          <g transform="translate(539 310)">
            <path d="M 0 0 Q -10 -14 0 -28 Q 10 -14 0 0 Z" fill="#fbbf24" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
            <circle cy="-18" r="4" fill="#01201f"/>
            <text x="14" y="-9" font-family="'SF Mono',monospace" font-size="9.5" fill="#fbbf24" opacity="0.9">SALVADOR / BAHIA</text>
          </g>

          <!-- ── AVIÓN ── -->
          <g class="ac-plane" transform="translate(233 659) rotate(-37)" opacity="0">
            <path d="M 0 0 L 22 -4 L 30 0 L 22 4 L 0 0 Z
                     M 8 -3 L -5 -10 L -5 -2 L 8 -1 Z
                     M 8 3 L -5 10 L -5 2 L 8 1 Z"
                  fill="#ffffff" stroke="#fbbf24" stroke-width="1.2"/>
          </g>

          <!-- ── TICKER TOP-LEFT ── -->
          <text x="80" y="88" font-family="'SF Mono','Fira Code',monospace"
                font-size="13" fill="#02b6b0" letter-spacing="5">
            / / ARGENTINA + BRASIL — DESTINOS
          </text>

        </g>
      </g>

      <!-- ── LÍNEA DIVISORIA ── -->
      <line x1="800" y1="0" x2="800" y2="1000" stroke="#02b6b0" stroke-width="1" opacity="0.22"/>

      <!-- ── RIGHT PANEL ── -->
      <text x="1520" y="474" text-anchor="end"
            font-family="'Inter','Helvetica Neue',sans-serif"
            font-weight="900" font-size="115" letter-spacing="-3"
            fill="#ffffff">ARIANA</text>
      <text x="1520" y="590" text-anchor="end"
            font-family="'Inter','Helvetica Neue',sans-serif"
            font-weight="700" font-style="italic"
            font-size="90" letter-spacing="-1"
            fill="#02b6b0">de viaje</text>
      <circle cx="1520" cy="438" r="15" fill="#02b6b0"/>
      <line x1="840" y1="640" x2="1520" y2="640" stroke="#02b6b0" stroke-width="1.5" opacity="0.5"/>
      <text x="1520" y="676" text-anchor="end"
            font-family="'Inter','Helvetica Neue',sans-serif"
            font-weight="600" font-size="19" letter-spacing="7"
            fill="#a7f3d0">TRAVEL · IDENTIDAD VISUAL</text>

      <!-- Corner brackets -->
      <g stroke="#02b6b0" stroke-width="1.5" fill="none" opacity="0.5">
        <path d="M 40 40 L 80 40 M 40 40 L 40 80"/>
        <path d="M 1560 40 L 1520 40 M 1560 40 L 1560 80"/>
        <path d="M 40 960 L 80 960 M 40 960 L 40 920"/>
        <path d="M 1560 960 L 1520 960 M 1560 960 L 1560 920"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.ac-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.ac-svg   { width: 100%; height: 100%; display: block; }
</style>
