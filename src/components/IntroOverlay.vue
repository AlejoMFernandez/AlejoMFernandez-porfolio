<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const visible = ref(true)

const overlayRef = ref(null)
const greetRef = ref(null)
const brandRef = ref(null)
const barRef = ref(null)

let tl = null
let safety = null

// Saludos en los tres idiomas del sitio (ES / EN / PT), rápidos
const greetings = ['Hola', 'Hello', 'Olá']

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lockScroll = () => { document.body.style.overflow = 'hidden' }
const unlockScroll = () => { document.body.style.overflow = '' }

const finish = () => {
  if (safety) { clearTimeout(safety); safety = null }
  unlockScroll()
  visible.value = false
}

onMounted(() => {
  lockScroll()

  // Red de seguridad: si GSAP/rAF se traba (p. ej. pestaña en segundo plano),
  // igual liberamos el sitio para no dejarlo bloqueado.
  safety = setTimeout(finish, 5000)

  // Accesibilidad: sin secuencia de movimiento, solo un fundido corto
  if (prefersReduced()) {
    if (brandRef.value) gsap.set(brandRef.value, { opacity: 1, y: 0, filter: 'none' })
    tl = gsap.to(overlayRef.value, {
      opacity: 0,
      duration: 0.25,
      delay: 0.25,
      ease: 'power1.out',
      onComplete: finish
    })
    return
  }

  tl = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: finish })

  // ── Fase 1: saludos rápidos (primera mitad de la carga)
  const STEP = 0.28
  let t = 0
  greetings.forEach((word) => {
    tl.add(() => { if (greetRef.value) greetRef.value.textContent = word }, t)
    tl.fromTo(greetRef.value, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.14 }, t)
    tl.to(greetRef.value, { opacity: 0, y: -14, duration: 0.11, ease: 'power2.in' }, t + 0.17)
    t += STEP
  })

  // ── Fase 2: la marca (logo + nombre) aparece a MITAD de la carga
  const brandAt = t + 0.02            // justo después de los saludos (~50%)
  const brandDur = 0.5
  const hold = 0.3
  const curtainAt = brandAt + brandDur + hold

  tl.fromTo(brandRef.value,
    { opacity: 0, y: 24, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: brandDur, ease: 'power3.out' },
    brandAt)

  // Barra de progreso: se llena hasta el momento de abrir (marca = ~50%)
  tl.fromTo(barRef.value, { scaleX: 0 }, { scaleX: 1, duration: curtainAt, ease: 'none' }, 0)

  // ── Fase 3: la cortina se abre hacia arriba para revelar el sitio
  tl.to(overlayRef.value,
    { yPercent: -100, duration: 0.85, ease: 'expo.inOut' },
    curtainAt)
})

onUnmounted(() => {
  if (tl) { tl.kill(); tl = null }
  if (safety) { clearTimeout(safety); safety = null }
  unlockScroll()
})
</script>

<template>
  <div v-if="visible" ref="overlayRef" class="intro-overlay" aria-label="Intro">
    <div class="intro-inner">
      <p class="intro-greet">
        <span class="intro-dot" aria-hidden="true"></span>
        <span ref="greetRef" class="intro-greet-text">Hola</span>
      </p>

      <div ref="brandRef" class="intro-brand">
        <picture>
          <source srcset="/logoAFwhite.png" media="(prefers-color-scheme: dark)" />
          <img src="/logoAFblack.png" alt="Alejo Martín Fernández" class="intro-logo" />
        </picture>
        <h1 class="intro-name">Alejo Martín Fernández</h1>
        <p class="intro-role">Desarrollador Web</p>
      </div>
    </div>

    <div class="intro-progress" aria-hidden="true">
      <span ref="barRef" class="intro-progress-fill"></span>
    </div>
  </div>
</template>

<style scoped>
.intro-overlay {
  position: fixed;
  inset: 0;
  /* Por debajo del cursor custom (99998/99999) y del grain (99997)
     para que el cursor siga visible durante la intro; por encima de todo lo demás. */
  z-index: 99990;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  overflow: hidden;
  will-change: transform;
}

.intro-inner {
  position: relative;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 24px;
}

/* ── Saludos ── */
.intro-greet {
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  gap: 0.6em;
  opacity: 0;
}

.intro-dot {
  width: 0.42em;
  height: 0.42em;
  border-radius: 50%;
  background: var(--accent-color);
  flex-shrink: 0;
}

.intro-greet-text {
  font-size: clamp(2.4rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
}

/* ── Marca ── */
.intro-brand {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  opacity: 0;
}

.intro-logo {
  height: clamp(40px, 7vw, 60px);
  width: auto;
}

.intro-name {
  font-size: clamp(1.5rem, 5vw, 2.6rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.05;
  color: var(--text-primary);
}

.intro-role {
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-tertiary);
}

/* ── Barra de progreso ── */
.intro-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--border-color);
}

.intro-progress-fill {
  display: block;
  height: 100%;
  width: 100%;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: 0% 50%;
}
</style>
