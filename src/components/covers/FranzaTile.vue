<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const jib       = root.querySelector('.franza-crane-jib')
  const hook      = root.querySelector('.franza-hook-group')
  const load      = root.querySelector('.franza-load-box')
  const grid      = root.querySelector('.franza-grid')
  const skylights = root.querySelectorAll('.franza-skylight')
  const sparks    = root.querySelectorAll('.franza-spark')

  // ── Crane jib: balanceo izquierda↔derecha
  tweens.push(gsap.fromTo(jib,
    { rotation: -2, svgOrigin: '217.5 252' },
    { rotation:  2, svgOrigin: '217.5 252', duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }
  ))

  // ── Hook + carga: sube y baja (efecto winch), desfasado del jib
  tweens.push(gsap.fromTo(hook,
    { y: 0 },
    { y: 24, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5 }
  ))

  // ── Caja de carga: pulso de opacidad "activa"
  tweens.push(gsap.fromTo(load,
    { fillOpacity: 0.18 },
    { fillOpacity: 0.62, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.0 }
  ))

  // ── Grid blueprint: deriva lenta, muy sutil
  tweens.push(gsap.fromTo(grid,
    { x: 0,   opacity: 0.07 },
    { x: -22, opacity: 0.13, duration: 6.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }
  ))

  // ── Skylights: parpadeo solar asincrónico, aleatorio
  if (skylights.length) {
    tweens.push(gsap.fromTo(skylights,
      { opacity: 0.3 },
      { opacity: 0.9, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1,
        stagger: { each: 0.3, from: 'random' } }
    ))
  }

  // ── Chispas de soldadura: suben y se desvanecen en loop perfecto
  if (sparks.length) {
    sparks.forEach((s, i) => {
      tweens.push(gsap.fromTo(s,
        { y: 0, opacity: 0 },
        {
          y: -(28 + (i % 3) * 10),
          duration: 1.3 + i * 0.18,
          ease: 'power1.out',
          repeat: -1,
          delay: i * 0.42,
          keyframes: [
            { opacity: 0,    duration: 0    },
            { opacity: 0.85, duration: 0.22 },
            { opacity: 0,    duration: 0.78 }
          ]
        }
      ))
    })
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="70 180 650 650" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="FRANZA construction blueprint">
      <defs>
        <linearGradient id="fct-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#1a1208"/>
          <stop offset="60%" stop-color="#3a2a10"/>
          <stop offset="100%" stop-color="#5a3f15"/>
        </linearGradient>
        <radialGradient id="fct-glow" cx="0.35" cy="0.5" r="0.5">
          <stop offset="0%"  stop-color="#d4af37" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="fct-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#000000" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
        </linearGradient>
        <filter id="fct-blur"><feGaussianBlur stdDeviation="0.4"/></filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#fct-bg)"/>
      <rect width="1600" height="1000" fill="url(#fct-glow)"/>
      <rect width="1600" height="1000" fill="url(#fct-vignette)"/>

      <!-- Blueprint grid (deriva lentamente) -->
      <g class="franza-grid" stroke="#d4af37" stroke-width="0.6" opacity="0.07">
        <line x1="0" y1="100" x2="700" y2="100"/><line x1="0" y1="180" x2="700" y2="180"/>
        <line x1="0" y1="260" x2="700" y2="260"/><line x1="0" y1="340" x2="700" y2="340"/>
        <line x1="0" y1="420" x2="700" y2="420"/><line x1="0" y1="500" x2="700" y2="500"/>
        <line x1="0" y1="580" x2="700" y2="580"/><line x1="0" y1="660" x2="700" y2="660"/>
        <line x1="0" y1="740" x2="700" y2="740"/><line x1="0" y1="820" x2="700" y2="820"/>
        <line x1="80" y1="0" x2="80" y2="1000"/><line x1="160" y1="0" x2="160" y2="1000"/>
        <line x1="240" y1="0" x2="240" y2="1000"/><line x1="320" y1="0" x2="320" y2="1000"/>
        <line x1="400" y1="0" x2="400" y2="1000"/><line x1="480" y1="0" x2="480" y2="1000"/>
        <line x1="560" y1="0" x2="560" y2="1000"/><line x1="640" y1="0" x2="640" y2="1000"/>
      </g>

      <!-- LEFT BLUEPRINT -->
      <g transform="translate(90 160)" stroke="#e8c87a" stroke-width="1.5" fill="none" filter="url(#fct-blur)" opacity="0.92">
        <line x1="20" y1="640" x2="600" y2="640" stroke="#e8c87a" stroke-width="2"/>
        <g stroke="#e8c87a" stroke-width="0.7" opacity="0.5">
          <line x1="20" y1="640" x2="0" y2="666"/><line x1="60" y1="640" x2="40" y2="666"/>
          <line x1="100" y1="640" x2="80" y2="666"/><line x1="140" y1="640" x2="120" y2="666"/>
          <line x1="180" y1="640" x2="160" y2="666"/><line x1="220" y1="640" x2="200" y2="666"/>
          <line x1="260" y1="640" x2="240" y2="666"/><line x1="300" y1="640" x2="280" y2="666"/>
          <line x1="340" y1="640" x2="320" y2="666"/><line x1="380" y1="640" x2="360" y2="666"/>
          <line x1="420" y1="640" x2="400" y2="666"/><line x1="460" y1="640" x2="440" y2="666"/>
          <line x1="500" y1="640" x2="480" y2="666"/><line x1="540" y1="640" x2="520" y2="666"/>
          <line x1="580" y1="640" x2="560" y2="666"/>
        </g>

        <rect x="40" y="300" width="540" height="340" stroke="#e8c87a" stroke-width="1.5"/>
        <polyline points="40,300 100,240 100,300 160,240 160,300 220,240 220,300 280,240 280,300 340,240 340,300 400,240 400,300 460,240 460,300 520,240 520,300 580,240 580,300" stroke="#e8c87a" stroke-width="1.8" fill="none"/>

        <!-- Skylights (parpadeo solar) -->
        <line class="franza-skylight" x1="40"  y1="300" x2="100" y2="240" stroke="#e8c87a" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.35"/>
        <line class="franza-skylight" x1="160" y1="240" x2="220" y2="240" stroke="#e8c87a" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.35"/>
        <line class="franza-skylight" x1="280" y1="240" x2="340" y2="300" stroke="#e8c87a" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.35"/>
        <line class="franza-skylight" x1="400" y1="240" x2="460" y2="300" stroke="#e8c87a" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.35"/>

        <rect x="80"  y="510" width="100" height="130" fill="rgba(212,175,55,0.06)" stroke="#e8c87a"/>
        <line x1="80"  y1="575" x2="180" y2="575"/>
        <line x1="130" y1="510" x2="130" y2="640"/>
        <rect x="240" y="460" width="180" height="180" fill="rgba(212,175,55,0.04)" stroke="#e8c87a" stroke-width="1.8"/>
        <line x1="330" y1="460" x2="330" y2="640" stroke="#e8c87a" stroke-width="1.2"/>
        <line x1="240" y1="500" x2="420" y2="500" stroke="#e8c87a" stroke-width="0.8"/>
        <rect x="460" y="510" width="100" height="130" fill="rgba(212,175,55,0.06)" stroke="#e8c87a"/>
        <line x1="460" y1="575" x2="560" y2="575"/>
        <line x1="510" y1="510" x2="510" y2="640"/>

        <!-- Torre de la grúa (estática) -->
        <g stroke="#e8c87a" stroke-width="2" fill="none">
          <line x1="120" y1="640" x2="120" y2="100"/>
          <line x1="135" y1="640" x2="135" y2="100"/>
          <line x1="120" y1="180" x2="135" y2="220"/><line x1="120" y1="220" x2="135" y2="180"/>
          <line x1="120" y1="260" x2="135" y2="300"/><line x1="120" y1="300" x2="135" y2="260"/>
          <line x1="120" y1="340" x2="135" y2="380"/><line x1="120" y1="380" x2="135" y2="340"/>
          <line x1="120" y1="420" x2="135" y2="460"/><line x1="120" y1="460" x2="135" y2="420"/>
          <line x1="120" y1="500" x2="135" y2="540"/><line x1="120" y1="540" x2="135" y2="500"/>
          <line x1="120" y1="580" x2="135" y2="620"/><line x1="120" y1="620" x2="135" y2="580"/>
        </g>
      </g>

      <!-- ── JIB DE LA GRÚA (oscila en loop) ── -->
      <g class="franza-crane-jib" stroke="#e8c87a" stroke-width="2" fill="none" filter="url(#fct-blur)" opacity="0.92">
        <!-- Cabina -->
        <rect x="195" y="240" width="45" height="30" stroke="#e8c87a" stroke-width="1.5"/>
        <!-- Pluma horizontal -->
        <line x1="140" y1="240" x2="520" y2="240" stroke="#e8c87a" stroke-width="2"/>
        <line x1="140" y1="265" x2="520" y2="265" stroke="#e8c87a" stroke-width="2"/>
        <!-- Triangulación -->
        <line x1="140" y1="265" x2="240" y2="220"/>
        <line x1="240" y1="220" x2="340" y2="265"/>
        <line x1="340" y1="220" x2="440" y2="265"/>
        <line x1="440" y1="220" x2="520" y2="265"/>
        <line x1="240" y1="220" x2="240" y2="240"/>
        <line x1="340" y1="220" x2="340" y2="240"/>
        <line x1="440" y1="220" x2="440" y2="240"/>
        <!-- Contrajib -->
        <line x1="140" y1="240" x2="140" y2="220"/>
        <rect x="120" y="210" width="40" height="20" fill="#e8c87a" opacity="0.3" stroke="#e8c87a"/>

        <!-- Hook + carga (sube/baja en loop) -->
        <g class="franza-hook-group">
          <line x1="460" y1="265" x2="460" y2="540" stroke="#d4af37" stroke-width="1.5"/>
          <rect x="440" y="540" width="40" height="14" fill="#d4af37" opacity="0.7" stroke="#e8c87a"/>
          <rect class="franza-load-box" x="430" y="554" width="60" height="38" fill="#d4af37" fill-opacity="0.18" stroke="#e8c87a"/>

          <!-- Chispas de soldadura -->
          <circle class="franza-spark" cx="445" cy="555" r="1.8" fill="#ffd96b" opacity="0"/>
          <circle class="franza-spark" cx="460" cy="558" r="1.4" fill="#ffd96b" opacity="0"/>
          <circle class="franza-spark" cx="475" cy="553" r="1.6" fill="#ffd96b" opacity="0"/>
          <circle class="franza-spark" cx="452" cy="559" r="1.2" fill="#ffd96b" opacity="0"/>
          <circle class="franza-spark" cx="468" cy="556" r="1.5" fill="#ffd96b" opacity="0"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
