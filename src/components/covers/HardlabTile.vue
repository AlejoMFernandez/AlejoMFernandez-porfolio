<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  // ── Data flows along network links (switch to nodes)
  const links = root.querySelectorAll('.hl-link')
  if (links.length) {
    gsap.set(links, { strokeDasharray: '4 4' })
    tweens.push(gsap.to(links, { strokeDashoffset: -16, duration: 0.8, ease: 'none', repeat: -1 }))
  }

  // ── Node status dots blink
  root.querySelectorAll('.hl-status').forEach((s, i) => {
    tweens.push(gsap.fromTo(s, { opacity: 0.35 },
      { opacity: 1, duration: 0.7 + (i % 3) * 0.25, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 }))
  })

  // ── Switch LEDs flicker
  root.querySelectorAll('.hl-led').forEach((l, i) => {
    tweens.push(gsap.fromTo(l, { opacity: 0.3 },
      { opacity: 1, duration: 0.4 + (i % 4) * 0.18, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.12 }))
  })

  // ── Glow breathes
  const glow = root.querySelector('.hl-glow')
  if (glow) {
    tweens.push(gsap.fromTo(glow, { opacity: 0.55 },
      { opacity: 1, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="60 115 760 760" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Hardlab network diagram">
      <defs>
        <linearGradient id="hlt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#1a1a1a"/>
        </linearGradient>
        <radialGradient id="hlt-glow" cx="0.35" cy="0.5" r="0.55">
          <stop offset="0%"  stop-color="#a78bfa" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="hlt-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#0c1f30"/>
          <stop offset="100%" stop-color="#06121f"/>
        </linearGradient>
        <linearGradient id="hlt-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#000000" stop-opacity="0.4"/>
          <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#hlt-bg)"/>
      <rect class="hl-glow" width="1600" height="1000" fill="url(#hlt-glow)"/>
      <rect width="1600" height="1000" fill="url(#hlt-vignette)"/>

      <!-- Grid texture -->
      <g opacity="0.05" stroke="#a78bfa" stroke-width="0.5">
        <line x1="0" y1="100" x2="900" y2="100"/><line x1="0" y1="200" x2="900" y2="200"/>
        <line x1="0" y1="300" x2="900" y2="300"/><line x1="0" y1="400" x2="900" y2="400"/>
        <line x1="0" y1="500" x2="900" y2="500"/><line x1="0" y1="600" x2="900" y2="600"/>
        <line x1="0" y1="700" x2="900" y2="700"/><line x1="0" y1="800" x2="900" y2="800"/>
        <line x1="0" y1="900" x2="900" y2="900"/>
      </g>

      <!-- ── Network diagram (graphic only) ── -->
      <g transform="translate(110 180)">

        <!-- Central switch -->
        <g transform="translate(330 280)">
          <rect x="-60" y="-22" width="120" height="44" rx="6" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" stroke-width="2"/>
          <circle class="hl-led" cx="-44" cy="-12" r="2" fill="#22c55e"/>
          <circle class="hl-led" cx="-36" cy="-12" r="2" fill="#22c55e"/>
          <circle class="hl-led" cx="-28" cy="-12" r="2" fill="#22c55e"/>
          <circle class="hl-led" cx="-20" cy="-12" r="2" fill="#f59e0b"/>
          <circle class="hl-led" cx="-12" cy="-12" r="2" fill="#22c55e"/>
          <circle class="hl-led" cx="-4" cy="-12" r="2" fill="#ef4444"/>
        </g>

        <!-- Network links -->
        <g stroke="#a78bfa" stroke-width="1.2" fill="none" opacity="0.55" stroke-dasharray="4 4">
          <path class="hl-link" d="M 270 280 L 100 80"/>
          <path class="hl-link" d="M 270 280 L 100 280"/>
          <path class="hl-link" d="M 270 280 L 100 480"/>
          <path class="hl-link" d="M 390 280 L 560 80"/>
          <path class="hl-link" d="M 390 280 L 560 280"/>
          <path class="hl-link" d="M 390 280 L 560 480"/>
        </g>

        <!-- PC 01 -->
        <g transform="translate(50 50)">
          <rect x="0" y="0" width="100" height="68" rx="4" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1.5"/>
          <rect x="6" y="6" width="88" height="48" rx="2" fill="url(#hlt-screen)" stroke="#a78bfa" stroke-width="0.5"/>
          <line x1="10" y1="14" x2="60" y2="14" stroke="#22c55e" stroke-width="1"/>
          <line x1="10" y1="22" x2="78" y2="22" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="30" x2="48" y2="30" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="38" x2="70" y2="38" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="46" x2="34" y2="46" stroke="#22c55e" stroke-width="1"/>
          <rect x="38" y="54" width="24" height="6" fill="#0a0a0a" stroke="#a78bfa" stroke-width="0.8"/>
          <circle class="hl-status" cx="92" cy="-6" r="3" fill="#22c55e"/>
        </g>

        <!-- PC 02 -->
        <g transform="translate(50 250)">
          <rect x="0" y="0" width="100" height="68" rx="4" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1.5"/>
          <rect x="6" y="6" width="88" height="48" rx="2" fill="url(#hlt-screen)" stroke="#a78bfa" stroke-width="0.5"/>
          <line x1="10" y1="14" x2="60" y2="14" stroke="#22c55e" stroke-width="1"/>
          <line x1="10" y1="22" x2="78" y2="22" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="30" x2="48" y2="30" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="38" x2="70" y2="38" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="46" x2="50" y2="46" stroke="#22c55e" stroke-width="1"/>
          <rect x="38" y="54" width="24" height="6" fill="#0a0a0a" stroke="#a78bfa" stroke-width="0.8"/>
          <circle class="hl-status" cx="92" cy="-6" r="3" fill="#22c55e"/>
        </g>

        <!-- PC 03 (warning) -->
        <g transform="translate(50 450)">
          <rect x="0" y="0" width="100" height="68" rx="4" fill="#1a1a2e" stroke="#f59e0b" stroke-width="1.5"/>
          <rect x="6" y="6" width="88" height="48" rx="2" fill="url(#hlt-screen)" stroke="#f59e0b" stroke-width="0.5"/>
          <line x1="10" y1="14" x2="60" y2="14" stroke="#f59e0b" stroke-width="1"/>
          <line x1="10" y1="22" x2="78" y2="22" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="30" x2="48" y2="30" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="38" x2="40" y2="38" stroke="#f59e0b" stroke-width="1"/>
          <rect x="38" y="54" width="24" height="6" fill="#0a0a0a" stroke="#f59e0b" stroke-width="0.8"/>
          <circle class="hl-status" cx="92" cy="-6" r="3" fill="#f59e0b"/>
        </g>

        <!-- PC 04 -->
        <g transform="translate(510 50)">
          <rect x="0" y="0" width="100" height="68" rx="4" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1.5"/>
          <rect x="6" y="6" width="88" height="48" rx="2" fill="url(#hlt-screen)" stroke="#a78bfa" stroke-width="0.5"/>
          <line x1="10" y1="14" x2="60" y2="14" stroke="#22c55e" stroke-width="1"/>
          <line x1="10" y1="22" x2="78" y2="22" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="30" x2="48" y2="30" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="38" x2="70" y2="38" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="46" x2="56" y2="46" stroke="#22c55e" stroke-width="1"/>
          <rect x="38" y="54" width="24" height="6" fill="#0a0a0a" stroke="#a78bfa" stroke-width="0.8"/>
          <circle class="hl-status" cx="92" cy="-6" r="3" fill="#22c55e"/>
        </g>

        <!-- PC 05 (offline) -->
        <g transform="translate(510 250)" opacity="0.5">
          <rect x="0" y="0" width="100" height="68" rx="4" fill="#1a1a2e" stroke="#ef4444" stroke-width="1.5"/>
          <rect x="6" y="6" width="88" height="48" rx="2" fill="#0a0a0a" stroke="#ef4444" stroke-width="0.5"/>
          <line x1="10" y1="14" x2="20" y2="14" stroke="#ef4444" stroke-width="1"/>
          <rect x="38" y="54" width="24" height="6" fill="#0a0a0a" stroke="#ef4444" stroke-width="0.8"/>
          <circle class="hl-status" cx="92" cy="-6" r="3" fill="#ef4444"/>
        </g>

        <!-- PC 06 -->
        <g transform="translate(510 450)">
          <rect x="0" y="0" width="100" height="68" rx="4" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1.5"/>
          <rect x="6" y="6" width="88" height="48" rx="2" fill="url(#hlt-screen)" stroke="#a78bfa" stroke-width="0.5"/>
          <line x1="10" y1="14" x2="60" y2="14" stroke="#22c55e" stroke-width="1"/>
          <line x1="10" y1="22" x2="78" y2="22" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="30" x2="48" y2="30" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="38" x2="70" y2="38" stroke="#a78bfa" stroke-width="0.8" opacity="0.7"/>
          <line x1="10" y1="46" x2="62" y2="46" stroke="#22c55e" stroke-width="1"/>
          <rect x="38" y="54" width="24" height="6" fill="#0a0a0a" stroke="#a78bfa" stroke-width="0.8"/>
          <circle class="hl-status" cx="92" cy="-6" r="3" fill="#22c55e"/>
        </g>

        <!-- LAB badges (pills) -->
        <g>
          <rect x="60" y="-30" width="80" height="22" rx="11" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1"/>
          <rect x="520" y="-30" width="80" height="22" rx="11" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" stroke-width="1"/>
        </g>

        <!-- Spec panel (data-lines stand in for text) -->
        <g transform="translate(220 580)">
          <rect x="0" y="0" width="240" height="80" rx="4" fill="rgba(167,139,250,0.06)" stroke="#a78bfa" stroke-width="1"/>
          <line x1="12" y1="18" x2="120" y2="18" stroke="#a78bfa" stroke-width="2" opacity="0.7"/>
          <line x1="12" y1="26" x2="228" y2="26" stroke="#a78bfa" stroke-width="0.4" opacity="0.4"/>
          <line x1="12" y1="40" x2="150" y2="40" stroke="#c4b5fd" stroke-width="2" opacity="0.5"/>
          <line x1="12" y1="54" x2="170" y2="54" stroke="#c4b5fd" stroke-width="2" opacity="0.5"/>
          <line x1="12" y1="68" x2="140" y2="68" stroke="#c4b5fd" stroke-width="2" opacity="0.5"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
