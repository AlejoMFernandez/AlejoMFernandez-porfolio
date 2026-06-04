<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const shapes = root.querySelectorAll('.pft-shape')
  const glow   = root.querySelector('.pft-goal-glow')
  const ring   = root.querySelector('.pft-goal-ring')

  // Each shape breathes, staggered, building toward the goal
  shapes.forEach((s, i) => {
    tweens.push(gsap.fromTo(s,
      { scale: 1, transformOrigin: '50% 50%' },
      { scale: 1.08, transformOrigin: '50% 50%',
        duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.28 }
    ))
  })

  if (glow) {
    tweens.push(gsap.fromTo(glow,
      { opacity: 0.22, scale: 0.9, transformOrigin: '50% 50%' },
      { opacity: 0.5, scale: 1.14, transformOrigin: '50% 50%',
        duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }

  if (ring) {
    tweens.push(gsap.to(ring, { rotation: 360, transformOrigin: '50% 50%', duration: 24, ease: 'none', repeat: -1 }))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="pft-cover">
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" class="pft-svg"
         role="img" aria-label="POLYFUSE polygon fusion">
      <defs>
        <radialGradient id="pft-bg" cx="50%" cy="44%" r="78%">
          <stop offset="0%"   stop-color="#1A1240"/>
          <stop offset="60%"  stop-color="#120C2C"/>
          <stop offset="100%" stop-color="#08060F"/>
        </radialGradient>
        <radialGradient id="pft-gold" cx="50%" cy="38%" r="68%">
          <stop offset="0%"   stop-color="#FFE9A8"/>
          <stop offset="55%"  stop-color="#F6C84B"/>
          <stop offset="100%" stop-color="#DFA32B"/>
        </radialGradient>
        <filter id="pft-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
        </filter>
        <filter id="pft-blur" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="30"/>
        </filter>
      </defs>

      <rect width="1000" height="1000" fill="url(#pft-bg)"/>

      <!-- Board wells -->
      <g fill="#FFFFFF" fill-opacity="0.035" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="2">
        <rect x="180" y="180" width="300" height="300" rx="40"/>
        <rect x="520" y="180" width="300" height="300" rx="40"/>
        <rect x="180" y="520" width="300" height="300" rx="40"/>
        <rect x="520" y="520" width="300" height="300" rx="40"/>
      </g>

      <!-- Polygons -->
      <g filter="url(#pft-shadow)">
        <polygon class="pft-shape" points="330,210 434,390 226,390" fill="#6366F1"/>
        <polygon class="pft-shape" points="670,210 784,293 741,427 599,427 556,293" fill="#9450EC"/>
        <polygon class="pft-shape" points="330,550 434,610 434,730 330,790 226,730 226,610" fill="#C13CC0"/>
      </g>

      <!-- Side-count numerals -->
      <g font-family="'Arial', sans-serif" font-weight="700" font-size="62" fill="#FFFFFF" fill-opacity="0.92" text-anchor="middle">
        <text x="330" y="352">3</text>
        <text x="670" y="354">5</text>
        <text x="330" y="692">6</text>
      </g>

      <!-- Goal circle (infinity) -->
      <circle class="pft-goal-glow" cx="670" cy="670" r="150" fill="#F6C84B" opacity="0.3" filter="url(#pft-blur)"/>
      <circle cx="670" cy="670" r="120" fill="url(#pft-gold)"/>
      <circle class="pft-goal-ring" cx="670" cy="670" r="138" fill="none" stroke="#FFE9A8" stroke-width="3" stroke-dasharray="5 18" opacity="0.6"/>
      <circle cx="670" cy="670" r="120" fill="none" stroke="#FFF0C2" stroke-width="3" opacity="0.7"/>
      <text x="670" y="700" font-family="'Arial', sans-serif" font-weight="700" font-size="86" fill="#2A1550" text-anchor="middle">&#8734;</text>
    </svg>
  </div>
</template>

<style scoped>
.pft-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.pft-svg   { width: 100%; height: 100%; display: block; }
</style>
