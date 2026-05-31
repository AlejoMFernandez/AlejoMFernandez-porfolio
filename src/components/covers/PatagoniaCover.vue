<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const rootRef = ref(null)
let tweens = []

onMounted(() => {
  const root = rootRef.value
  if (!root) return

  const stars      = root.querySelectorAll('.pat-star')
  const moon       = root.querySelector('.pat-moon')
  const winLeft    = root.querySelector('.pat-win-left')
  const winRight   = root.querySelector('.pat-win-right')
  const emberGlow  = root.querySelector('.pat-ember')
  const smoke      = root.querySelector('.pat-smoke')
  const mtBack     = root.querySelector('.pat-mt-back')

  // ── Estrellas: cada una titila con duración y delay distintos
  stars.forEach((s, i) => {
    const dur = 1.2 + (i % 5) * 0.4
    tweens.push(gsap.fromTo(s,
      { opacity: parseFloat(s.getAttribute('opacity') || '0.7') * 0.3 },
      { opacity: parseFloat(s.getAttribute('opacity') || '0.7'),
        duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1,
        delay: (i * 0.27) % 3.5 }
    ))
  })

  // ── Luna: halo suave que pulsa
  if (moon) {
    tweens.push(gsap.fromTo(moon,
      { opacity: 0.07 },
      { opacity: 0.14, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }

  // ── Ventanas: parpadeo muy sutil como fuego interior
  if (winLeft) {
    tweens.push(gsap.fromTo(winLeft,
      { opacity: 0.82 },
      { opacity: 0.98, duration: 0.18, ease: 'none', yoyo: true, repeat: -1,
        repeatDelay: () => 0.8 + Math.random() * 2 }
    ))
  }
  if (winRight) {
    tweens.push(gsap.fromTo(winRight,
      { opacity: 0.78 },
      { opacity: 0.95, duration: 0.22, ease: 'none', yoyo: true, repeat: -1,
        repeatDelay: () => 1.0 + Math.random() * 2, delay: 0.35 }
    ))
  }

  // ── Glow de brasa (desde las ventanas): pulso cálido
  if (emberGlow) {
    tweens.push(gsap.fromTo(emberGlow,
      { opacity: 0.55 },
      { opacity: 0.85, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }

  // ── Humo: sube continuamente y reinicia desde abajo (loop unidireccional)
  if (smoke) {
    tweens.push(gsap.fromTo(smoke,
      { y: 0, opacity: 0.35 },
      { y: -55, opacity: 0, duration: 3.8, ease: 'power1.out', repeat: -1, repeatDelay: 0.2 }
    ))
  }

  // ── Estrella fugaz: aparece y cruza el cielo cada ~8 segundos
  const shootingStar = root.querySelector('.pat-shooting-star')
  if (shootingStar) {
    const runShootingStar = () => {
      gsap.fromTo(shootingStar,
        { x: 0, y: 0, opacity: 0 },
        {
          keyframes: [
            { x: 0,    y: 0,   opacity: 0,   duration: 0    },
            { x: 20,   y: 10,  opacity: 0.9, duration: 0.12 },
            { x: 180,  y: 90,  opacity: 0.7, duration: 0.45 },
            { x: 240,  y: 120, opacity: 0,   duration: 0.18 }
          ],
          duration: 0.75,
          ease: 'none',
          onComplete: () => {
            gsap.delayedCall(6 + Math.random() * 5, runShootingStar)
          }
        }
      )
    }
    gsap.delayedCall(2.5 + Math.random() * 4, runShootingStar)
  }

  // ── Montañas traseras: drift lateral muy sutil (efecto paralaje)
  if (mtBack) {
    tweens.push(gsap.fromTo(mtBack,
      { x: 0 },
      { x: -6, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    ))
  }

  // Wordmark + subtitle: sin animación (texto quieto)
})

onUnmounted(() => {
  tweens.forEach(t => t.kill())
  tweens = []
})
</script>

<template>
  <div ref="rootRef" class="pat-cover">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" class="pat-svg"
         role="img" aria-label="Refugio del Cóndor mountain lodge preview">
      <defs>
        <linearGradient id="pat-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#050810"/>
          <stop offset="45%"  stop-color="#0C1422"/>
          <stop offset="100%" stop-color="#14202E"/>
        </linearGradient>
        <radialGradient id="pat-ember-glow" cx="0.34" cy="0.74" r="0.38">
          <stop offset="0%"   stop-color="#E08D3C" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#E08D3C" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="pat-moon-halo" cx="0.82" cy="0.13" r="0.14">
          <stop offset="0%"   stop-color="#D8ECF5" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#D8ECF5" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="pat-vignette" cx="0.5" cy="0.5" r="0.72">
          <stop offset="55%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
        </radialGradient>
        <filter id="pat-blur-stars"><feGaussianBlur stdDeviation="0.6"/></filter>
        <filter id="pat-blur-smoke"><feGaussianBlur stdDeviation="2"/></filter>
        <radialGradient id="pat-rg-right" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%"   stop-color="#E08D3C" stop-opacity="0.07"/>
          <stop offset="100%" stop-color="#E08D3C" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- LEFT PANEL -->
      <clipPath id="pat-left-clip"><rect width="800" height="1000"/></clipPath>
      <g clip-path="url(#pat-left-clip)">
        <rect width="800" height="1000" fill="url(#pat-sky)"/>

        <!-- Moon -->
        <circle class="pat-moon" cx="655" cy="118" r="38" fill="#E8F2F8" opacity="0.07"/>
        <circle cx="655" cy="118" r="30" fill="#EDF4F9" opacity="0.10"/>
        <rect width="800" height="1000" fill="url(#pat-moon-halo)"/>

        <!-- Stars (cada una con clase para titilar) -->
        <g filter="url(#pat-blur-stars)">
          <circle class="pat-star" cx="38"  cy="72"  r="1.1" fill="white" opacity="0.75"/>
          <circle class="pat-star" cx="95"  cy="40"  r="0.8" fill="white" opacity="0.90"/>
          <circle class="pat-star" cx="178" cy="98"  r="1.0" fill="white" opacity="0.60"/>
          <circle class="pat-star" cx="288" cy="55"  r="1.3" fill="white" opacity="0.80"/>
          <circle class="pat-star" cx="345" cy="28"  r="0.9" fill="white" opacity="0.70"/>
          <circle class="pat-star" cx="430" cy="82"  r="1.2" fill="white" opacity="0.85"/>
          <circle class="pat-star" cx="510" cy="22"  r="0.7" fill="white" opacity="0.65"/>
          <circle class="pat-star" cx="598" cy="65"  r="1.0" fill="white" opacity="0.80"/>
          <circle class="pat-star" cx="720" cy="44"  r="0.9" fill="white" opacity="0.90"/>
          <circle class="pat-star" cx="760" cy="105" r="1.1" fill="white" opacity="0.70"/>
          <circle class="pat-star" cx="68"  cy="175" r="0.9" fill="white" opacity="0.55"/>
          <circle class="pat-star" cx="155" cy="195" r="1.0" fill="white" opacity="0.65"/>
          <circle class="pat-star" cx="240" cy="148" r="0.7" fill="white" opacity="0.60"/>
          <circle class="pat-star" cx="418" cy="162" r="1.0" fill="white" opacity="0.75"/>
          <circle class="pat-star" cx="560" cy="135" r="0.8" fill="white" opacity="0.70"/>
          <circle class="pat-star" cx="690" cy="182" r="1.2" fill="white" opacity="0.60"/>
          <circle class="pat-star" cx="490" cy="210" r="0.7" fill="white" opacity="0.50"/>
          <circle class="pat-star" cx="120" cy="260" r="0.9" fill="white" opacity="0.45"/>
          <circle class="pat-star" cx="330" cy="232" r="0.8" fill="white" opacity="0.50"/>
        </g>

        <!-- Estrella fugaz (aparece ocasionalmente, parte desde x=180 y=80) -->
        <g class="pat-shooting-star" transform="translate(180 80)" opacity="0" filter="url(#pat-blur-stars)">
          <line x1="0" y1="0" x2="-38" y2="-19" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <line x1="0" y1="0" x2="-65" y2="-33" stroke="white" stroke-width="0.9" stroke-linecap="round" opacity="0.35"/>
        </g>

        <!-- Far mountains (back layer, con parallax sutil) -->
        <path class="pat-mt-back"
              d="M0 820 L70 580 L160 640 L240 510 L360 620 L430 490 L520 580 L620 500 L700 550 L800 520 L800 1000 L0 1000 Z"
              fill="#0C1520" opacity="0.95"/>

        <!-- Mid mountains -->
        <path d="M80 1000 L255 345 L430 1000 Z" fill="#192030"/>
        <path d="M255 345 L220 430 L255 412 L290 430 Z" fill="#D2E4EE" opacity="0.80"/>
        <path d="M360 1000 L510 438 L660 1000 Z" fill="#141C2A"/>
        <path d="M510 438 L482 508 L510 492 L538 508 Z" fill="#D2E4EE" opacity="0.72"/>
        <path d="M-60 1000 L55 598 L175 1000 Z" fill="#111820"/>
        <path d="M680 1000 L780 530 L880 1000 Z" fill="#141C2A" opacity="0.85"/>

        <!-- Forest treeline -->
        <path d="M0 838 L18 792 L36 838 L50 778 L68 838 L82 768 L100 838 L116 780 L134 838
                 L148 770 L166 838 L182 775 L200 838 L218 762 L238 838 L256 774 L274 838
                 L292 764 L312 838 L332 778 L350 838 L368 765 L386 838 L404 772 L422 838
                 L440 762 L458 838 L476 775 L494 838 L512 768 L530 838 L548 778 L566 838
                 L584 762 L602 838 L620 775 L638 838 L656 765 L674 838 L692 778 L710 838
                 L728 766 L746 838 L764 772 L782 838 L800 838 L800 1000 L0 1000 Z"
              fill="#0C1A10" opacity="0.97"/>

        <!-- Lodge -->
        <g transform="translate(268, 616)">
          <rect x="-8" y="122" width="210" height="12" fill="#0E0A06" rx="1"/>
          <rect x="0" y="0" width="193" height="125" fill="#1E1208" rx="2"/>
          <path d="M-18 2 L96 -72 L210 2 Z" fill="#140E08"/>
          <path d="M-18 2 L96 -72 L210 2" stroke="#2A1C0E" stroke-width="1.5" fill="none"/>
          <rect x="148" y="-78" width="18" height="38" fill="#1C1208" rx="1"/>
          <rect x="144" y="-80" width="26" height="5" fill="#241810" rx="1"/>
          <!-- Humo (animado) -->
          <g class="pat-smoke" filter="url(#pat-blur-smoke)" opacity="0.28">
            <path d="M157 -84 Q163 -98 157 -114 Q151 -128 159 -144" stroke="#9AA8A8" stroke-width="3" fill="none"/>
            <path d="M162 -86 Q170 -102 163 -118 Q156 -132 165 -150" stroke="#9AA8A8" stroke-width="2.5" fill="none"/>
          </g>
          <!-- Ventanas (animadas) -->
          <rect class="pat-win-left"  x="18"  y="22" width="42" height="34" fill="#F2B060" opacity="0.92" rx="2"/>
          <line x1="39" y1="22" x2="39" y2="56" stroke="#1E1208" stroke-width="1.5"/>
          <line x1="18" y1="39" x2="60" y2="39" stroke="#1E1208" stroke-width="1.5"/>
          <rect class="pat-win-right" x="133" y="22" width="42" height="34" fill="#F0AA58" opacity="0.88" rx="2"/>
          <line x1="154" y1="22" x2="154" y2="56" stroke="#1E1208" stroke-width="1.5"/>
          <line x1="133" y1="39" x2="175" y2="39" stroke="#1E1208" stroke-width="1.5"/>
          <!-- Puerta -->
          <rect x="80" y="58" width="32" height="52" fill="#E8A040" opacity="0.70" rx="2"/>
          <circle cx="107" cy="84" r="2.5" fill="#F2B060" opacity="0.8"/>
          <!-- Nieve en techo -->
          <path d="M-18 2 L25 -26 L96 -72 L167 -26 L210 2" stroke="#D5E8F2" stroke-width="2" fill="none" opacity="0.65"/>
          <!-- Deck -->
          <rect x="70" y="110" width="52" height="8" fill="#2A1C0E" rx="1"/>
          <line x1="78" y1="110" x2="78" y2="122" stroke="#341F0A" stroke-width="1.5"/>
          <line x1="113" y1="110" x2="113" y2="122" stroke="#341F0A" stroke-width="1.5"/>
        </g>

        <!-- Snow patches -->
        <ellipse cx="350" cy="748" rx="90" ry="10" fill="#C5D8E8" opacity="0.12"/>
        <ellipse cx="520" cy="755" rx="60" ry="8"  fill="#C5D8E8" opacity="0.09"/>
        <ellipse cx="210" cy="758" rx="50" ry="7"  fill="#C5D8E8" opacity="0.10"/>

        <!-- Ember glow (animado) -->
        <rect class="pat-ember" width="800" height="1000" fill="url(#pat-ember-glow)" opacity="0.55"/>
        <rect width="800" height="1000" fill="url(#pat-vignette)"/>
        <line x1="800" y1="0" x2="800" y2="1000" stroke="#E08D3C" stroke-width="1" opacity="0.25"/>
      </g>

      <!-- RIGHT PANEL -->
      <rect x="800" y="0" width="800" height="1000" fill="#08090D"/>
      <rect x="800" y="0" width="800" height="1000" fill="url(#pat-rg-right)"/>

      <text class="pat-wordmark" x="1528" y="468" text-anchor="end"
            font-family="Georgia,'Times New Roman',serif" font-style="italic"
            font-weight="300" font-size="130" letter-spacing="-2" fill="#F5F0E8">Refugio</text>
      <text class="pat-subtitle" x="1528" y="604" text-anchor="end"
            font-family="Georgia,'Times New Roman',serif" font-style="italic"
            font-weight="300" font-size="130" letter-spacing="-2" fill="#F5F0E8">del Cóndor</text>

      <line x1="840" y1="648" x2="1528" y2="648" stroke="#E08D3C" stroke-width="1.5" opacity="0.55"/>
      <text x="1528" y="690" text-anchor="end" font-family="'Inter','Helvetica Neue',sans-serif"
            font-weight="600" font-size="17" letter-spacing="10" fill="#6B6B6B">PATAGONIA · BARILOCHE · ARGENTINA</text>
    </svg>
  </div>
</template>

<style scoped>
.pat-cover { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
.pat-svg   { width: 100%; height: 100%; display: block; }
</style>
