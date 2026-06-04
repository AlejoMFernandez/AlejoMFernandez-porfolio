<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  // ── Data flows along the circuit traces (marching current)
  const traces = root.querySelectorAll('.it-trace')
  if (traces.length) {
    gsap.set(traces, { strokeDasharray: '10 8' })
    tweens.push(gsap.to(traces, { strokeDashoffset: -36, duration: 1.1, ease: 'none', repeat: -1 }))
  }

  // ── Network port dots: sequential packets
  root.querySelectorAll('.it-dot').forEach((d, i) => {
    tweens.push(gsap.fromTo(d, { opacity: 0.25 },
      { opacity: 1, duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.22 }))
  })

  // ── LED indicators blink
  root.querySelectorAll('.it-led').forEach((l, i) => {
    tweens.push(gsap.fromTo(l, { opacity: 0.3 },
      { opacity: 1, duration: 0.6 + i * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.3 }))
  })

  // ── CPU breathes
  const cpu = root.querySelector('.it-cpu')
  if (cpu) {
    tweens.push(gsap.fromTo(cpu, { opacity: 0.85 },
      { opacity: 1, scale: 1.04, transformOrigin: '50% 50%', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }

  // ── Glow breathes
  const glow = root.querySelector('.it-glow')
  if (glow) {
    tweens.push(gsap.fromTo(glow, { opacity: 0.55 },
      { opacity: 1, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  }
})

onUnmounted(() => { tweens.forEach(t => t.kill()); tweens = [] })
</script>

<template>
  <div ref="rootRef" class="tile-cover">
    <svg viewBox="65 125 760 760" preserveAspectRatio="xMidYMid slice" class="tile-svg"
         role="img" aria-label="Italnet circuit board">
      <defs>
        <linearGradient id="itt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#050608"/>
          <stop offset="100%" stop-color="#0b0c11"/>
        </linearGradient>
        <radialGradient id="itt-glow" cx="0.35" cy="0.5" r="0.55">
          <stop offset="0%"  stop-color="#00ff88" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#00ff88" stop-opacity="0"/>
        </radialGradient>
        <filter id="itt-glow-line">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#itt-bg)"/>
      <rect class="it-glow" width="1600" height="1000" fill="url(#itt-glow)"/>

      <!-- PCB-style grid -->
      <g opacity="0.06" stroke="#00ff88">
        <line x1="0" y1="100" x2="700" y2="100" stroke-width="0.5"/>
        <line x1="0" y1="200" x2="700" y2="200" stroke-width="0.5"/>
        <line x1="0" y1="300" x2="700" y2="300" stroke-width="0.5"/>
        <line x1="0" y1="400" x2="700" y2="400" stroke-width="0.5"/>
        <line x1="0" y1="500" x2="700" y2="500" stroke-width="0.5"/>
        <line x1="0" y1="600" x2="700" y2="600" stroke-width="0.5"/>
        <line x1="0" y1="700" x2="700" y2="700" stroke-width="0.5"/>
        <line x1="0" y1="800" x2="700" y2="800" stroke-width="0.5"/>
        <line x1="100" y1="0" x2="100" y2="1000" stroke-width="0.5"/>
        <line x1="200" y1="0" x2="200" y2="1000" stroke-width="0.5"/>
        <line x1="300" y1="0" x2="300" y2="1000" stroke-width="0.5"/>
        <line x1="400" y1="0" x2="400" y2="1000" stroke-width="0.5"/>
        <line x1="500" y1="0" x2="500" y2="1000" stroke-width="0.5"/>
        <line x1="600" y1="0" x2="600" y2="1000" stroke-width="0.5"/>
      </g>

      <!-- ── Circuit board diagram (graphic only) ── -->
      <g transform="translate(100 200)" stroke="#00ff88" stroke-width="2" fill="none">

        <!-- Main CPU square -->
        <rect class="it-cpu" x="240" y="240" width="120" height="120" rx="6" fill="rgba(0,255,136,0.06)" stroke="#00ff88" stroke-width="2" filter="url(#itt-glow-line)"/>
        <!-- CPU pins -->
        <g stroke="#00ff88" stroke-width="1.5">
          <line x1="240" y1="270" x2="220" y2="270"/><line x1="240" y1="290" x2="220" y2="290"/>
          <line x1="240" y1="310" x2="220" y2="310"/><line x1="240" y1="330" x2="220" y2="330"/>
          <line x1="360" y1="270" x2="380" y2="270"/><line x1="360" y1="290" x2="380" y2="290"/>
          <line x1="360" y1="310" x2="380" y2="310"/><line x1="360" y1="330" x2="380" y2="330"/>
          <line x1="270" y1="240" x2="270" y2="220"/><line x1="290" y1="240" x2="290" y2="220"/>
          <line x1="310" y1="240" x2="310" y2="220"/><line x1="330" y1="240" x2="330" y2="220"/>
          <line x1="270" y1="360" x2="270" y2="380"/><line x1="290" y1="360" x2="290" y2="380"/>
          <line x1="310" y1="360" x2="310" y2="380"/><line x1="330" y1="360" x2="330" y2="380"/>
        </g>

        <!-- RAM module -->
        <rect x="120" y="100" width="180" height="50" rx="3" fill="rgba(0,255,136,0.04)" stroke="#00ff88" stroke-width="1.5"/>
        <g stroke="#00ff88" stroke-width="1">
          <line x1="135" y1="150" x2="135" y2="160"/><line x1="155" y1="150" x2="155" y2="160"/>
          <line x1="175" y1="150" x2="175" y2="160"/><line x1="195" y1="150" x2="195" y2="160"/>
          <line x1="215" y1="150" x2="215" y2="160"/><line x1="235" y1="150" x2="235" y2="160"/>
          <line x1="255" y1="150" x2="255" y2="160"/><line x1="275" y1="150" x2="275" y2="160"/>
        </g>
        <path class="it-trace" d="M 210 160 L 210 220 L 270 220" stroke="#00ff88" stroke-width="1.5"/>

        <!-- GPU -->
        <rect x="420" y="450" width="160" height="60" rx="4" fill="rgba(0,255,136,0.04)" stroke="#00ff88" stroke-width="1.5"/>
        <path class="it-trace" d="M 360 360 L 360 420 L 500 420 L 500 450" stroke="#00ff88" stroke-width="1.5"/>

        <!-- Storage -->
        <rect x="40" y="380" width="130" height="80" rx="4" fill="rgba(0,255,136,0.04)" stroke="#00ff88" stroke-width="1.5"/>
        <path class="it-trace" d="M 170 420 L 220 420 L 220 300" stroke="#00ff88" stroke-width="1.5"/>

        <!-- Network port -->
        <rect x="440" y="100" width="140" height="60" rx="4" fill="rgba(0,255,136,0.04)" stroke="#00ff88" stroke-width="1.5"/>
        <circle class="it-dot" cx="465" cy="148" r="3" fill="#00ff88"/>
        <circle class="it-dot" cx="485" cy="148" r="3" fill="#00ff88"/>
        <circle class="it-dot" cx="505" cy="148" r="3" fill="#00ff88"/>
        <path class="it-trace" d="M 510 160 L 510 220 L 330 220" stroke="#00ff88" stroke-width="1.5"/>

        <!-- Resistors -->
        <g fill="#00ff88" opacity="0.5">
          <rect x="195" y="216" width="14" height="8"/>
          <rect x="250" y="214" width="14" height="12"/>
        </g>

        <!-- Capacitors -->
        <g stroke="#00ff88" stroke-width="1.2" fill="rgba(0,255,136,0.1)">
          <circle cx="60" cy="240" r="14"/>
          <circle cx="60" cy="300" r="10"/>
        </g>

        <!-- LED indicators -->
        <g>
          <circle class="it-led" cx="600" cy="360" r="6" fill="#22c55e"/>
          <circle class="it-led" cx="600" cy="380" r="6" fill="#f59e0b"/>
          <circle class="it-led" cx="600" cy="400" r="6" fill="#ef4444" opacity="0.4"/>
        </g>

        <!-- Extra trace circuitry -->
        <g stroke="#00ff88" stroke-width="1" opacity="0.4">
          <path class="it-trace" d="M 580 200 L 660 200 L 660 360 L 600 360"/>
          <path d="M 30 100 L 30 300"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tile-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.tile-svg   { width: 100%; height: 100%; display: block; }
</style>
