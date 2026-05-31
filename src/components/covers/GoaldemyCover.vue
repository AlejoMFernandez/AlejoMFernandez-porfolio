<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const xpFill    = root.querySelector('.gdm-xp-fill')
  const ball      = root.querySelector('.gdm-ball')
  const trail     = root.querySelector('.gdm-trail')
  const players   = root.querySelectorAll('.gdm-player')
  const badges    = root.querySelectorAll('.gdm-badge')
  const badgeLock = root.querySelector('.gdm-badge-lock')

  // ── XP bar: se llena de 0 a máximo y reinicia (ganando XP)
  tweens.push(gsap.fromTo(xpFill,
    { attr: { width: 0 } },
    {
      attr: { width: 376 },
      duration: 4,
      ease: 'power1.inOut',
      repeat: -1,
      repeatDelay: 1.2,
      onRepeat: () => gsap.set(xpFill, { attr: { width: 0 } })
    }
  ))

  // xpText: sin animación (texto quieto)

  // ── Pelota: secuencia de pases P4→P9→P10→P7→REMATE AL ARCO
  // Posiciones relativas al natural del ball (cx=290,cy=380 en el pitch):
  // P4(180,430): dx=-110, dy=50 | P9(120,180): dx=-170,dy=-200
  // P10(280,220): dx=-10,dy=-160 | P7(430,170): dx=140,dy=-210
  // Arco top-center(280,15): dx=-10,dy=-365
  const TOTAL_DUR = 5.2
  tweens.push(gsap.fromTo(ball,
    { x: -110, y: 50 },
    {
      keyframes: [
        { x: -110, y: 50,   duration: 0.35 }, // P4 tiene la pelota
        { x: -170, y: -200, duration: 0.55 }, // pase a P9
        { x: -170, y: -200, duration: 0.25 }, // P9 controla
        { x: -10,  y: -160, duration: 0.5  }, // pase a P10
        { x: -10,  y: -160, duration: 0.25 }, // P10 controla
        { x: 140,  y: -210, duration: 0.5  }, // pase a P7
        { x: 140,  y: -210, duration: 0.3  }, // P7 acomoda
        { x: -10,  y: -370, duration: 0.6  }, // ¡REMATE AL ARCO!
        { x: -10,  y: -370, duration: 0.4  }, // GOL (pausa)
        { x: -110, y: 50,   duration: 0.5  }, // reset al saque
      ],
      duration: TOTAL_DUR,
      ease: 'none',
      repeat: -1,
      repeatDelay: 1.0
    }
  ))

  // ── Trail: traza la ruta del pase final (P7 → Arco)
  if (trail) {
    const len = trail.getTotalLength()
    tweens.push(gsap.fromTo(trail,
      { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
      {
        keyframes: [
          { strokeDashoffset: len, opacity: 0,   duration: 3.5 }, // espera hasta el remate
          { strokeDashoffset: 0,   opacity: 0.8, duration: 0.6 }, // dibuja el disparo
          { strokeDashoffset: 0,   opacity: 0.8, duration: 0.4 }, // visible
          { strokeDashoffset: 0,   opacity: 0,   duration: 0.7 }, // desaparece
        ],
        duration: TOTAL_DUR,
        ease: 'none',
        repeat: -1,
        repeatDelay: 1.0
      }
    ))
  }

  // ── Players: pulso que se activa en el momento del pase
  // P4(i=3) activa primero, P9(i=0) después, P10(i=1), P7(i=2), P8(i=4) idle lento
  const playerDelays = [0.9, 1.65, 2.4, 0.0, 3.8]
  players.forEach((p, i) => {
    tweens.push(gsap.fromTo(p,
      { scale: 1, transformOrigin: 'center' },
      { scale: 1.22, transformOrigin: 'center',
        duration: 0.25, ease: 'back.out(2)',
        repeat: -1, repeatDelay: TOTAL_DUR + 1.0 - 0.25,
        delay: playerDelays[i] }
    ))
  })

  // ── Badges 1-3: aparecen con pop escalonado, luego idle
  badges.forEach((b, i) => {
    tweens.push(gsap.fromTo(b,
      { scale: 0.75, opacity: 0.4, transformOrigin: 'center' },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)',
        repeat: -1, repeatDelay: 5.5, delay: i * 0.35 }
    ))
  })

  // ── Badge bloqueado: parpadea suavemente como "disponible pronto"
  if (badgeLock) {
    tweens.push(gsap.fromTo(badgeLock,
      { opacity: 0.25 },
      { opacity: 0.55, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 }
    ))
  }

  // Wordmark: sin animación (texto quieto)
})

onUnmounted(() => {
  tweens.forEach(t => t.kill())
  tweens = []
})
</script>

<template>
  <div ref="rootRef" class="gdm-cover">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" class="gdm-svg"
         role="img" aria-label="Goaldemy gamified football platform preview">
      <defs>
        <linearGradient id="gdm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#03081A"/>
          <stop offset="100%" stop-color="#162035"/>
        </linearGradient>
        <radialGradient id="gdm-glow" cx="0.3" cy="0.55" r="0.55">
          <stop offset="0%"  stop-color="#22d3ee" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="gdm-pitch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#0f3a1d"/>
          <stop offset="100%" stop-color="#0a2614"/>
        </linearGradient>
        <linearGradient id="gdm-xp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stop-color="#22d3ee"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
        <filter id="gdm-blur"><feGaussianBlur stdDeviation="0.4"/></filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#gdm-bg)"/>
      <rect width="1600" height="1000" fill="url(#gdm-glow)"/>

      <!-- Grid -->
      <g opacity="0.05" stroke="#ffffff" stroke-width="0.6">
        <line x1="0" y1="120" x2="700" y2="120"/><line x1="0" y1="220" x2="700" y2="220"/>
        <line x1="0" y1="320" x2="700" y2="320"/><line x1="0" y1="420" x2="700" y2="420"/>
        <line x1="0" y1="520" x2="700" y2="520"/><line x1="0" y1="620" x2="700" y2="620"/>
        <line x1="0" y1="720" x2="700" y2="720"/><line x1="0" y1="820" x2="700" y2="820"/>
      </g>

      <!-- Corner brackets -->
      <g stroke="#22d3ee" stroke-width="1.5" fill="none" opacity="0.55">
        <path d="M 40 40 L 80 40 M 40 40 L 40 80"/>
        <path d="M 1560 40 L 1520 40 M 1560 40 L 1560 80"/>
        <path d="M 40 960 L 80 960 M 40 960 L 40 920"/>
        <path d="M 1560 960 L 1520 960 M 1560 960 L 1560 920"/>
      </g>

      <!-- Football pitch -->
      <g transform="translate(120 200)" filter="url(#gdm-blur)">
        <rect x="0" y="0" width="560" height="620" rx="6" fill="url(#gdm-pitch)" stroke="#22d3ee" stroke-width="2" opacity="0.95"/>
        <line x1="0" y1="310" x2="560" y2="310" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <circle cx="280" cy="310" r="68" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <circle cx="280" cy="310" r="4" fill="#ffffff" opacity="0.7"/>
        <rect x="180" y="0"   width="200" height="80" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <rect x="230" y="0"   width="100" height="30" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <rect x="180" y="540" width="200" height="80" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
        <rect x="230" y="590" width="100" height="30" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>

        <!-- Players (animados) -->
        <g class="gdm-player"><circle cx="120" cy="180" r="14" fill="#22d3ee"/><text x="120" y="185" text-anchor="middle" font-family="'SF Mono',monospace" font-size="12" font-weight="700" fill="#03081A">9</text></g>
        <g class="gdm-player"><circle cx="280" cy="220" r="14" fill="#22d3ee"/><text x="280" y="225" text-anchor="middle" font-family="'SF Mono',monospace" font-size="12" font-weight="700" fill="#03081A">10</text></g>
        <g class="gdm-player"><circle cx="430" cy="170" r="14" fill="#22d3ee"/><text x="430" y="175" text-anchor="middle" font-family="'SF Mono',monospace" font-size="12" font-weight="700" fill="#03081A">7</text></g>
        <g class="gdm-player"><circle cx="180" cy="430" r="14" fill="#f59e0b"/><text x="180" y="435" text-anchor="middle" font-family="'SF Mono',monospace" font-size="12" font-weight="700" fill="#03081A">4</text></g>
        <g class="gdm-player"><circle cx="380" cy="450" r="14" fill="#f59e0b"/><text x="380" y="455" text-anchor="middle" font-family="'SF Mono',monospace" font-size="12" font-weight="700" fill="#03081A">8</text></g>

        <!-- Ball (animada) -->
        <g class="gdm-ball">
          <circle cx="290" cy="380" r="9" fill="#ffffff"/>
          <circle cx="290" cy="380" r="9" fill="none" stroke="#03081A" stroke-width="1.2"/>
        </g>

        <!-- Trail: disparo de P7(430,170) al arco top-center(280,15) -->
        <path class="gdm-trail" d="M 430 170 Q 350 90 280 15"
              fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-dasharray="6 4" opacity="0"/>
      </g>

      <!-- XP bar -->
      <g transform="translate(120 80)">
        <text font-family="'SF Mono','Fira Code',monospace" font-size="13" fill="#22d3ee" letter-spacing="5">LEVEL 12 · STRIKER</text>
        <rect x="0" y="14" width="380" height="14" rx="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)"/>
        <rect class="gdm-xp-fill" x="2" y="16" width="0" height="10" rx="5" fill="url(#gdm-xp)"/>
        <text class="gdm-xp-text" x="395" y="25" font-family="'SF Mono',monospace" font-size="12" fill="#94a3b8">2,470 / 3,500 XP</text>
      </g>

      <!-- Achievement badges -->
      <g transform="translate(120 870)">
        <g class="gdm-badge">
          <circle cx="22" cy="22" r="22" fill="#22d3ee" opacity="0.15" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="22" y="28" text-anchor="middle" font-size="20">⚽</text>
        </g>
        <g class="gdm-badge" transform="translate(60 0)">
          <circle cx="22" cy="22" r="22" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="22" y="28" text-anchor="middle" font-size="20">🏆</text>
        </g>
        <g class="gdm-badge" transform="translate(120 0)">
          <circle cx="22" cy="22" r="22" fill="#22c55e" opacity="0.15" stroke="#22c55e" stroke-width="1.5"/>
          <text x="22" y="28" text-anchor="middle" font-size="20">🔥</text>
        </g>
        <g class="gdm-badge-lock" transform="translate(180 0)">
          <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="22" y="28" text-anchor="middle" font-size="20" opacity="0.4">🔒</text>
        </g>
        <text x="240" y="28" font-family="'SF Mono',monospace" font-size="11" fill="#94a3b8" letter-spacing="3">3 / 4 ACHIEVEMENTS UNLOCKED</text>
      </g>

      <!-- RIGHT PANEL -->
      <text class="gdm-wordmark" x="1480" y="510" text-anchor="end" font-family="'Inter','Helvetica Neue',sans-serif" font-weight="900" font-size="180" letter-spacing="-5" fill="#ffffff">GOALDEMY</text>
      <circle cx="1480" cy="474" r="14" fill="#22d3ee"/>
      <line x1="830" y1="555" x2="1480" y2="555" stroke="#22d3ee" stroke-width="1.5" opacity="0.55"/>
      <text x="1480" y="595" text-anchor="end" font-family="'Inter','Helvetica Neue',sans-serif" font-weight="600" font-size="22" letter-spacing="8" fill="#94a3b8">GAMIFIED FOOTBALL LEARNING</text>
    </svg>
  </div>
</template>

<style scoped>
.gdm-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.gdm-svg   { width: 100%; height: 100%; display: block; }
</style>
