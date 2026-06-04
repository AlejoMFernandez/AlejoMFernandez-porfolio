<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  // ── Progress bars fill (loading rhythm)
  root.querySelectorAll('.fx-progress').forEach((p, i) => {
    tweens.push(gsap.fromTo(p, { scaleX: 0, transformOrigin: '0% 50%' },
      { scaleX: 1, transformOrigin: '0% 50%', duration: 1.6, ease: 'power1.inOut',
        yoyo: true, repeat: -1, delay: i * 0.25 }))
  })

  // ── Big play button pulses
  const play = root.querySelector('.fx-play')
  if (play) {
    tweens.push(gsap.fromTo(play, { scale: 1, opacity: 0.85, transformOrigin: '50% 50%' },
      { scale: 1.08, opacity: 1, transformOrigin: '50% 50%', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }

  // ── Anime eyes glow
  root.querySelectorAll('.fx-eye').forEach((e, i) => {
    tweens.push(gsap.fromTo(e, { opacity: 0.4 },
      { opacity: 1, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.18 }))
  })

  // ── Glow breathes
  const glow = root.querySelector('.fx-glow')
  if (glow) {
    tweens.push(gsap.fromTo(glow, { opacity: 0.6 },
      { opacity: 1, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="80 40 760 760" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Fenalix streaming interface">
      <defs>
        <linearGradient id="fxt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#000000"/>
          <stop offset="60%" stop-color="#0d0008"/>
          <stop offset="100%" stop-color="#1a000c"/>
        </linearGradient>
        <radialGradient id="fxt-glow" cx="0.35" cy="0.5" r="0.55">
          <stop offset="0%"  stop-color="#e50914" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#e50914" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="fxt-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#000000" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.7"/>
        </linearGradient>
        <linearGradient id="fxt-cardA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#3a1a1a"/>
          <stop offset="100%" stop-color="#1a0808"/>
        </linearGradient>
        <linearGradient id="fxt-cardB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#1a2540"/>
          <stop offset="100%" stop-color="#0a1020"/>
        </linearGradient>
        <linearGradient id="fxt-cardC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#2a1a3a"/>
          <stop offset="100%" stop-color="#100618"/>
        </linearGradient>
        <linearGradient id="fxt-cardD" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#3a3010"/>
          <stop offset="100%" stop-color="#181408"/>
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#fxt-bg)"/>
      <rect class="fx-glow" width="1600" height="1000" fill="url(#fxt-glow)"/>
      <rect width="1600" height="1000" fill="url(#fxt-vignette)"/>

      <!-- ── Streaming UI (graphic only) ── -->
      <g transform="translate(110 130)">

        <!-- Top nav bar -->
        <rect x="0" y="0" width="700" height="44" fill="rgba(0,0,0,0.5)" stroke="rgba(229,9,20,0.3)" stroke-width="1"/>
        <!-- Search icon -->
        <g transform="translate(660 22)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" fill="none">
          <circle cx="0" cy="0" r="6"/>
          <line x1="5" y1="5" x2="12" y2="12"/>
        </g>

        <!-- HERO featured card -->
        <g transform="translate(0 60)">
          <rect x="0" y="0" width="700" height="220" rx="6" fill="url(#fxt-cardA)" stroke="rgba(229,9,20,0.4)" stroke-width="1.2"/>
          <!-- Synopsis lines -->
          <line x1="30" y1="125" x2="380" y2="125" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <line x1="30" y1="138" x2="320" y2="138" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <line x1="30" y1="151" x2="280" y2="151" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <!-- Play button -->
          <g transform="translate(30 175)">
            <rect x="0" y="0" width="100" height="32" rx="3" fill="#ffffff"/>
            <polygon points="22,8 22,24 36,16" fill="#000000"/>
          </g>
          <g transform="translate(140 175)">
            <rect x="0" y="0" width="100" height="32" rx="3" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)"/>
          </g>
          <!-- Anime silhouette -->
          <g transform="translate(540 30)" fill="rgba(229,9,20,0.6)" stroke="#ffffff" stroke-width="1">
            <circle cx="60" cy="40" r="32"/>
            <polygon points="28,30 32,5 42,22 50,0 60,18 70,0 78,22 88,5 92,30 60,28"/>
            <path d="M 30 75 L 90 75 L 95 170 L 25 170 Z"/>
            <circle class="fx-eye" cx="50" cy="42" r="3" fill="#e50914"/>
            <circle class="fx-eye" cx="70" cy="42" r="3" fill="#e50914"/>
          </g>
        </g>

        <!-- Cards row 1 -->
        <g transform="translate(0 320)">
          <g>
            <rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardA)" stroke="rgba(255,255,255,0.1)"/>
            <rect x="8" y="88" width="144" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
            <rect class="fx-progress" x="8" y="88" width="98" height="3" rx="1.5" fill="#e50914"/>
          </g>
          <g transform="translate(178 0)">
            <rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardB)" stroke="rgba(255,255,255,0.1)"/>
            <rect x="8" y="88" width="144" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
            <rect class="fx-progress" x="8" y="88" width="60" height="3" rx="1.5" fill="#e50914"/>
          </g>
          <g transform="translate(356 0)">
            <rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardC)" stroke="rgba(255,255,255,0.1)"/>
            <rect x="8" y="88" width="144" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
            <rect class="fx-progress" x="8" y="88" width="130" height="3" rx="1.5" fill="#e50914"/>
          </g>
          <g transform="translate(534 0)">
            <rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardD)" stroke="rgba(255,255,255,0.1)"/>
            <rect x="8" y="88" width="144" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
            <rect class="fx-progress" x="8" y="88" width="38" height="3" rx="1.5" fill="#e50914"/>
          </g>
        </g>

        <!-- Cards row 2 -->
        <g transform="translate(0 480)">
          <g><rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardB)" stroke="rgba(255,255,255,0.1)"/></g>
          <g transform="translate(178 0)"><rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardC)" stroke="rgba(255,255,255,0.1)"/></g>
          <g transform="translate(356 0)"><rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardA)" stroke="rgba(255,255,255,0.1)"/></g>
          <g transform="translate(534 0)"><rect x="0" y="0" width="160" height="100" rx="4" fill="url(#fxt-cardD)" stroke="rgba(255,255,255,0.1)"/></g>
        </g>

        <!-- Big play button -->
        <g class="fx-play" transform="translate(580 200)" opacity="0.85">
          <circle cx="0" cy="0" r="42" fill="rgba(229,9,20,0.92)" stroke="#ffffff" stroke-width="2"/>
          <polygon points="-12,-16 -12,16 18,0" fill="#ffffff"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
