<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  // ── Candle flames flicker (each its own rhythm)
  const flames = [
    { el: '.hh-flame-1', o: '800px 450px' },
    { el: '.hh-flame-2', o: '665px 502px' },
    { el: '.hh-flame-3', o: '935px 486px' }
  ]
  flames.forEach((f, i) => {
    const node = root.querySelector(f.el)
    if (!node) return
    tweens.push(gsap.fromTo(node,
      { scaleX: 1, scaleY: 1, x: 0, transformOrigin: f.o },
      {
        keyframes: [
          { scaleY: 1.08, scaleX: 0.94, x: -1.5, duration: 0.5 },
          { scaleY: 0.95, scaleX: 1.05, x: 1.5,  duration: 0.6 },
          { scaleY: 1.04, scaleX: 0.97, x: -1,   duration: 0.45 },
          { scaleY: 1.0,  scaleX: 1.0,  x: 0,    duration: 0.55 }
        ],
        transformOrigin: f.o,
        ease: 'sine.inOut',
        repeat: -1,
        delay: i * 0.27
      }
    ))
  })

  // ── Halos pulse with the flames
  root.querySelectorAll('.hh-glow').forEach((g, i) => {
    tweens.push(gsap.fromTo(g,
      { opacity: 0.5, scale: 0.96, transformOrigin: 'center' },
      { opacity: 0.85, scale: 1.05, transformOrigin: 'center',
        duration: 1.4 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.3 }
    ))
  })

  // ── Embers drift upward
  root.querySelectorAll('.hh-ember').forEach((e, i) => {
    tweens.push(gsap.fromTo(e,
      { y: 0, x: 0, opacity: 0 },
      {
        keyframes: [
          { opacity: 0,   y: 0,   x: 0,  duration: 0 },
          { opacity: 0.9, y: -30, x: 4,  duration: 1.4 },
          { opacity: 0,   y: -80, x: -6, duration: 1.8 }
        ],
        ease: 'sine.out',
        repeat: -1,
        delay: i * 0.9,
        repeatDelay: 0.6
      }
    ))
  })

  // ── Warm wash breathes
  const wash = root.querySelector('.hh-wash')
  if (wash) {
    tweens.push(gsap.fromTo(wash,
      { opacity: 0.85 },
      { opacity: 1, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="540 240 520 520" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Hearth and Hall candles">
      <defs>
        <linearGradient id="hht-wood" x1="0" y1="0" x2="1" y2="0.1">
          <stop offset="0%"   stop-color="#2A2520"/>
          <stop offset="50%"  stop-color="#3D2914"/>
          <stop offset="100%" stop-color="#2A2520"/>
        </linearGradient>
        <radialGradient id="hht-halo" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%"   stop-color="#F5C76A" stop-opacity="0.55"/>
          <stop offset="45%"  stop-color="#E8A04F" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#3D2914" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="hht-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#000000" stop-opacity="0.3"/>
          <stop offset="55%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
        </linearGradient>
        <radialGradient id="hht-flame" cx="0.5" cy="0.72" r="0.7">
          <stop offset="0%"   stop-color="#FFF6D8"/>
          <stop offset="40%"  stop-color="#F5C76A"/>
          <stop offset="80%"  stop-color="#E8A04F"/>
          <stop offset="100%" stop-color="#C2622E"/>
        </radialGradient>
        <linearGradient id="hht-wax" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#D8CBA8"/>
          <stop offset="45%"  stop-color="#F4EAD5"/>
          <stop offset="100%" stop-color="#C9BB95"/>
        </linearGradient>
        <linearGradient id="hht-shelf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#4A341F"/>
          <stop offset="100%" stop-color="#241810"/>
        </linearGradient>
      </defs>

      <!-- Deep wood plate + warm wash + vignette -->
      <rect width="1600" height="1000" fill="url(#hht-wood)"/>
      <rect class="hh-wash" width="1600" height="1000" fill="url(#hht-halo)"/>
      <rect width="1600" height="1000" fill="url(#hht-vignette)"/>

      <!-- Wood ledge (full bleed) -->
      <rect x="520" y="648" width="560" height="34" fill="url(#hht-shelf)"/>
      <rect x="520" y="648" width="560" height="3" fill="#6B4E2E" opacity="0.6"/>

      <!-- ── Halos behind each flame ── -->
      <circle class="hh-glow" cx="800" cy="402" r="132" fill="url(#hht-halo)"/>
      <circle class="hh-glow" cx="665" cy="470" r="96"  fill="url(#hht-halo)"/>
      <circle class="hh-glow" cx="935" cy="448" r="108" fill="url(#hht-halo)"/>

      <!-- ── LEFT candle (short) ── -->
      <g>
        <rect x="646" y="500" width="38" height="146" rx="5" fill="url(#hht-wax)"/>
        <rect x="646" y="500" width="9"  height="146" rx="4" fill="#FFFFFF" opacity="0.18"/>
        <rect x="640" y="642" width="50" height="14" rx="3" fill="#241810"/>
        <rect x="663" y="488" width="4"  height="14" fill="#3D2914"/>
        <path class="hh-flame-2"
              d="M 665 445 C 655 463 652 477 658 489 C 661 495 665 498 665 502 C 665 498 669 495 672 489 C 678 477 675 463 665 445 Z"
              fill="url(#hht-flame)"/>
      </g>

      <!-- ── RIGHT candle (medium) ── -->
      <g>
        <rect x="915" y="478" width="40" height="168" rx="5" fill="url(#hht-wax)"/>
        <rect x="915" y="478" width="9"  height="168" rx="4" fill="#FFFFFF" opacity="0.18"/>
        <rect x="909" y="642" width="52" height="14" rx="3" fill="#241810"/>
        <rect x="933" y="466" width="4"  height="14" fill="#3D2914"/>
        <path class="hh-flame-3"
              d="M 935 420 C 924 441 920 457 927 471 C 931 478 935 481 935 486 C 935 481 939 478 943 471 C 950 457 946 441 935 420 Z"
              fill="url(#hht-flame)"/>
      </g>

      <!-- ── CENTER candle (tall, hero) ── -->
      <g>
        <rect x="777" y="448" width="46" height="198" rx="6" fill="url(#hht-wax)"/>
        <rect x="777" y="448" width="11" height="198" rx="5" fill="#FFFFFF" opacity="0.2"/>
        <rect x="770" y="642" width="60" height="16" rx="3" fill="#241810"/>
        <rect x="797" y="436" width="6"  height="14" fill="#3D2914"/>
        <path class="hh-flame-1"
              d="M 800 368 C 786 396 781 418 790 434 C 795 442 800 446 800 452 C 800 446 805 442 810 434 C 819 418 814 396 800 368 Z"
              fill="url(#hht-flame)"/>
        <ellipse cx="800" cy="438" rx="5" ry="10" fill="#BFE2FF" opacity="0.5"/>
      </g>

      <!-- ── Rising embers ── -->
      <circle class="hh-ember" cx="760" cy="430" r="2.6" fill="#F5C76A"/>
      <circle class="hh-ember" cx="845" cy="410" r="2.2" fill="#F5C76A"/>
      <circle class="hh-ember" cx="690" cy="470" r="2"   fill="#E8A04F"/>
      <circle class="hh-ember" cx="915" cy="455" r="2.2" fill="#F5C76A"/>
      <circle class="hh-ember" cx="805" cy="390" r="1.8" fill="#FFF6D8"/>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
