<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  // ── Self-drawing blueprint: every stroke draws itself, holds, then redraws
  const strokes = root.querySelectorAll(
    '.trama-blueprint line, .trama-blueprint rect, .trama-blueprint polyline, .trama-blueprint circle, .trama-blueprint ellipse, .trama-blueprint path'
  )
  const lenOf = (el) => { try { return el.getTotalLength() } catch (e) { return 0 } }

  gsap.set(strokes, {
    strokeDasharray: (i, el) => lenOf(el),
    strokeDashoffset: (i, el) => lenOf(el)
  })
  tweens.push(gsap.to(strokes, {
    strokeDashoffset: 0,
    duration: 1.9,
    ease: 'power1.inOut',
    stagger: { each: 0.035, from: 'start' },
    yoyo: true,
    repeat: -1,
    repeatDelay: 1.6
  }))

  // ── Terracota glow breathes
  const glow = root.querySelector('.trama-glow')
  if (glow) {
    tweens.push(gsap.fromTo(glow,
      { opacity: 0.5 },
      { opacity: 1, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="0 145 760 760" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Trama architectural section">
      <defs>
        <linearGradient id="trt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#1A1A1A"/>
          <stop offset="100%" stop-color="#2D2520"/>
        </linearGradient>
        <linearGradient id="trt-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#000000" stop-opacity="0.4"/>
          <stop offset="50%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </linearGradient>
        <radialGradient id="trt-glow" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%"   stop-color="#D4634A" stop-opacity="0.16"/>
          <stop offset="100%" stop-color="#D4634A" stop-opacity="0"/>
        </radialGradient>
        <filter id="trt-sketch-blur">
          <feGaussianBlur stdDeviation="0.4"/>
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#trt-bg)"/>
      <rect class="trama-glow" width="1600" height="1000" fill="url(#trt-glow)"/>
      <rect width="1600" height="1000" fill="url(#trt-vignette)"/>

      <!-- Grid paper texture (subtle, static) -->
      <g opacity="0.04" stroke="#F5F1EA" stroke-width="0.8">
        <line x1="0" y1="100" x2="700" y2="100"/><line x1="0" y1="160" x2="700" y2="160"/>
        <line x1="0" y1="220" x2="700" y2="220"/><line x1="0" y1="280" x2="700" y2="280"/>
        <line x1="0" y1="340" x2="700" y2="340"/><line x1="0" y1="400" x2="700" y2="400"/>
        <line x1="0" y1="460" x2="700" y2="460"/><line x1="0" y1="520" x2="700" y2="520"/>
        <line x1="0" y1="580" x2="700" y2="580"/><line x1="0" y1="640" x2="700" y2="640"/>
        <line x1="0" y1="700" x2="700" y2="700"/><line x1="0" y1="760" x2="700" y2="760"/>
        <line x1="0" y1="820" x2="700" y2="820"/><line x1="0" y1="880" x2="700" y2="880"/>
        <line x1="60"  y1="0" x2="60"  y2="1000"/><line x1="120" y1="0" x2="120" y2="1000"/>
        <line x1="180" y1="0" x2="180" y2="1000"/><line x1="240" y1="0" x2="240" y2="1000"/>
        <line x1="300" y1="0" x2="300" y2="1000"/><line x1="360" y1="0" x2="360" y2="1000"/>
        <line x1="420" y1="0" x2="420" y2="1000"/><line x1="480" y1="0" x2="480" y2="1000"/>
        <line x1="540" y1="0" x2="540" y2="1000"/><line x1="600" y1="0" x2="600" y2="1000"/>
        <line x1="660" y1="0" x2="660" y2="1000"/>
      </g>

      <!-- Architectural section drawing (graphic only, no callouts/cartouche) -->
      <g class="trama-blueprint" transform="translate(90 130)" stroke="#C4C4C4" stroke-width="1.5" fill="none" filter="url(#trt-sketch-blur)" opacity="0.95">
        <!-- Ground line -->
        <line x1="20" y1="670" x2="560" y2="670" stroke="#C4C4C4" stroke-width="2"/>
        <!-- Ground hatch -->
        <g stroke="#C4C4C4" stroke-width="0.8" opacity="0.5">
          <line x1="20"  y1="670" x2="0"   y2="695"/><line x1="60"  y1="670" x2="40"  y2="695"/>
          <line x1="100" y1="670" x2="80"  y2="695"/><line x1="140" y1="670" x2="120" y2="695"/>
          <line x1="180" y1="670" x2="160" y2="695"/><line x1="220" y1="670" x2="200" y2="695"/>
          <line x1="260" y1="670" x2="240" y2="695"/><line x1="300" y1="670" x2="280" y2="695"/>
          <line x1="340" y1="670" x2="320" y2="695"/><line x1="380" y1="670" x2="360" y2="695"/>
          <line x1="420" y1="670" x2="400" y2="695"/><line x1="460" y1="670" x2="440" y2="695"/>
          <line x1="500" y1="670" x2="480" y2="695"/><line x1="540" y1="670" x2="520" y2="695"/>
          <line x1="580" y1="670" x2="560" y2="695"/>
        </g>
        <!-- Foundation -->
        <rect x="40" y="640" width="480" height="30" stroke="#C4C4C4" stroke-width="1.5"/>
        <!-- Ground floor walls -->
        <rect x="60" y="380" width="440" height="260"/>
        <!-- Floor slab -->
        <rect x="50" y="370" width="460" height="14" fill="#1A1A1A" stroke="#C4C4C4" stroke-width="1"/>
        <!-- Upper floor walls -->
        <rect x="80" y="160" width="400" height="210"/>
        <!-- Roof -->
        <polyline points="60,160 280,60 500,160" stroke="#C4C4C4" stroke-width="2"/>
        <polyline points="70,160 280,68 490,160" stroke="#C4C4C4" stroke-width="0.6" stroke-dasharray="4 3"/>

        <!-- Ground floor — window left -->
        <rect x="100" y="450" width="100" height="130" stroke="#C4C4C4"/>
        <line x1="150" y1="450" x2="150" y2="580"/>
        <line x1="100" y1="515" x2="200" y2="515"/>
        <!-- Ground floor — door -->
        <rect x="220" y="480" width="80" height="160" stroke="#C4C4C4"/>
        <path d="M220,480 Q260,460 300,480" stroke="#C4C4C4" stroke-width="0.8" stroke-dasharray="3 2"/>
        <!-- Ground floor — window right -->
        <rect x="340" y="450" width="120" height="120" stroke="#C4C4C4"/>
        <line x1="400" y1="450" x2="400" y2="570"/>
        <line x1="340" y1="510" x2="460" y2="510"/>

        <!-- Upper floor — window left -->
        <rect x="110" y="210" width="100" height="100" stroke="#C4C4C4"/>
        <line x1="160" y1="210" x2="160" y2="310"/>
        <line x1="110" y1="260" x2="210" y2="260"/>
        <!-- Upper floor — window right -->
        <rect x="350" y="210" width="100" height="100" stroke="#C4C4C4"/>
        <line x1="400" y1="210" x2="400" y2="310"/>
        <line x1="350" y1="260" x2="450" y2="260"/>

        <!-- Dimension lines (terracota accents, no text) -->
        <line x1="60"  y1="730" x2="500" y2="730" stroke="#D4634A" stroke-width="1"/>
        <line x1="60"  y1="724" x2="60"  y2="736" stroke="#D4634A" stroke-width="1"/>
        <line x1="500" y1="724" x2="500" y2="736" stroke="#D4634A" stroke-width="1"/>
        <line x1="580" y1="160" x2="580" y2="640" stroke="#D4634A" stroke-width="1"/>
        <line x1="574" y1="160" x2="586" y2="160" stroke="#D4634A" stroke-width="1"/>
        <line x1="574" y1="640" x2="586" y2="640" stroke="#D4634A" stroke-width="1"/>

        <!-- Person for scale -->
        <g stroke="#6B6B6B" stroke-width="1.2">
          <circle cx="510" cy="530" r="12"/>
          <line x1="510" y1="542" x2="510" y2="610"/>
          <line x1="485" y1="565" x2="535" y2="565"/>
          <line x1="510" y1="610" x2="490" y2="640"/>
          <line x1="510" y1="610" x2="530" y2="640"/>
        </g>
        <!-- Tree -->
        <g stroke="#6B6B6B" stroke-width="1.2">
          <ellipse cx="140" cy="120" rx="42" ry="55"/>
          <line x1="140" y1="175" x2="140" y2="200"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
