<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  // Respect reduced-motion: leave the static composition untouched
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const shapes = root.querySelectorAll('.pfc-shape')
  const chevs  = root.querySelectorAll('.pfc-chev')
  const glow   = root.querySelector('.pfc-goal-glow')
  const ring   = root.querySelector('.pfc-goal-ring')

  // Polygons: staggered "breathing" pulse — a wave running toward the goal
  shapes.forEach((s, i) => {
    tweens.push(gsap.fromTo(s,
      { scale: 1, transformOrigin: '50% 50%' },
      { scale: 1.07, transformOrigin: '50% 50%',
        duration: 1.7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.22 }
    ))
  })

  // Chevrons: gentle shimmer pulling the eye rightward
  chevs.forEach((c, i) => {
    tweens.push(gsap.fromTo(c,
      { opacity: 0.25 },
      { opacity: 0.62, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 + i * 0.2 }
    ))
  })

  // Goal glow: warm pulse around the gold circle
  if (glow) {
    tweens.push(gsap.fromTo(glow,
      { opacity: 0.2, scale: 0.9, transformOrigin: '50% 50%' },
      { opacity: 0.48, scale: 1.12, transformOrigin: '50% 50%',
        duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }

  // Goal ring: slow continuous rotation
  if (ring) {
    tweens.push(gsap.to(ring, { rotation: 360, transformOrigin: '50% 50%', duration: 26, ease: 'none', repeat: -1 }))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="pfc-cover">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" class="pfc-svg"
         role="img" aria-label="POLYFUSE — polygon fusion puzzle preview">
      <defs>
        <linearGradient id="pfc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="#0A0A14"/>
          <stop offset="55%"  stop-color="#181038"/>
          <stop offset="100%" stop-color="#2A1556"/>
        </linearGradient>
        <radialGradient id="pfc-vignette" cx="50%" cy="44%" r="72%">
          <stop offset="0%"   stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </radialGradient>
        <radialGradient id="pfc-gold" cx="50%" cy="38%" r="68%">
          <stop offset="0%"   stop-color="#FFE9A8"/>
          <stop offset="55%"  stop-color="#F6C84B"/>
          <stop offset="100%" stop-color="#DFA32B"/>
        </radialGradient>
        <linearGradient id="pfc-word" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#FFD66B"/>
          <stop offset="60%"  stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#E9E2FF"/>
        </linearGradient>
        <filter id="pfc-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.35"/>
        </filter>
        <filter id="pfc-blur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="26"/>
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#pfc-bg)"/>
      <rect width="1600" height="1000" fill="url(#pfc-vignette)"/>

      <g stroke="#6366F1" stroke-width="2" fill="none" opacity="0.5">
        <path d="M 40 40 L 84 40 M 40 40 L 40 84"/>
        <path d="M 1560 40 L 1516 40 M 1560 40 L 1560 84"/>
        <path d="M 40 960 L 84 960 M 40 960 L 40 916"/>
        <path d="M 1560 960 L 1516 960 M 1560 960 L 1560 916"/>
      </g>

      <text x="120" y="98" font-family="'Courier New', monospace" font-size="18" fill="#7D78C4" letter-spacing="7">// POLYGON FUSION PUZZLE</text>

      <g fill="#FFFFFF" fill-opacity="0.03" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1.5">
        <rect x="157"  y="422" width="156" height="156" rx="22"/>
        <rect x="407"  y="422" width="156" height="156" rx="22"/>
        <rect x="657"  y="422" width="156" height="156" rx="22"/>
        <rect x="907"  y="422" width="156" height="156" rx="22"/>
        <rect x="1157" y="422" width="156" height="156" rx="22"/>
        <rect x="1397" y="422" width="156" height="156" rx="22"/>
      </g>

      <g stroke="#7C77DA" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path class="pfc-chev" d="M 351 486 L 369 500 L 351 514" opacity="0.45"/>
        <path class="pfc-chev" d="M 601 486 L 619 500 L 601 514" opacity="0.45"/>
        <path class="pfc-chev" d="M 851 486 L 869 500 L 851 514" opacity="0.45"/>
        <path class="pfc-chev" d="M 1101 486 L 1119 500 L 1101 514" opacity="0.45"/>
        <path class="pfc-chev" d="M 1346 486 L 1364 500 L 1346 514" opacity="0.45"/>
      </g>

      <g filter="url(#pfc-shadow)">
        <polygon class="pfc-shape" points="235,422 303,539 167,539" fill="#6366F1"/>
        <polygon class="pfc-shape" points="485,422 563,500 485,578 407,500" fill="#7A57F0"/>
        <polygon class="pfc-shape" points="735,422 809,476 781,563 689,563 661,476" fill="#9450EC"/>
        <polygon class="pfc-shape" points="985,422 1053,461 1053,539 985,578 917,539 917,461" fill="#B248D9"/>
        <polygon class="pfc-shape" points="1235,422 1296,451 1311,517 1269,570 1201,570 1159,517 1174,451" fill="#D23FA0"/>
      </g>

      <g font-family="'Arial', sans-serif" font-weight="700" font-size="40" fill="#FFFFFF" fill-opacity="0.92" text-anchor="middle">
        <text x="235"  y="512">3</text>
        <text x="485"  y="514">4</text>
        <text x="735"  y="514">5</text>
        <text x="985"  y="514">6</text>
        <text x="1235" y="514">7</text>
      </g>

      <circle class="pfc-goal-glow" cx="1475" cy="500" r="118" fill="#F6C84B" opacity="0.28" filter="url(#pfc-blur)"/>
      <circle cx="1475" cy="500" r="86" fill="url(#pfc-gold)"/>
      <circle class="pfc-goal-ring" cx="1475" cy="500" r="100" fill="none" stroke="#FFE9A8" stroke-width="2" stroke-dasharray="4 14" opacity="0.55"/>
      <circle cx="1475" cy="500" r="86" fill="none" stroke="#FFF0C2" stroke-width="2" opacity="0.7"/>
      <text x="1475" y="518" font-family="'Arial', sans-serif" font-weight="700" font-size="58" fill="#2A1550" text-anchor="middle">&#8734;</text>

      <text x="118" y="858" font-family="'Arial Black', Impact, sans-serif" font-size="116" font-weight="900" letter-spacing="2" fill="url(#pfc-word)">POLYFUSE</text>
      <line x1="124" y1="888" x2="690" y2="888" stroke="#F6C84B" stroke-width="2" opacity="0.7"/>
      <text x="126" y="922" font-family="'Courier New', monospace" font-size="19" fill="#9C97D6" letter-spacing="6">GEOMETRIC MERGE GAME · PURE SVG</text>
    </svg>
  </div>
</template>

<style scoped>
.pfc-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.pfc-svg   { width: 100%; height: 100%; display: block; }
</style>
