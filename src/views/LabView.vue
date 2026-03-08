<script setup>
import { computed } from 'vue'
import { useLocalized } from '../composables/useLocalized.js'
import projects from '../data/projects.json'

const { l } = useLocalized()

const sorted = computed(() =>
  [...projects].sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99))
)
</script>

<template>
  <div class="lab">
    <div class="lab-header">
      <span class="lab-badge">🧪 LAB</span>
      <h1 class="lab-title">Playground de cards</h1>
      <p class="lab-sub">Probá distintos modelos antes de decidir. URL: <code>/lab</code> · <RouterLink to="/lab/proyecto">Lab Detalle de Proyecto →</RouterLink></p>
    </div>

    <!-- ════════════════════════════════════════════════════════
         MODELO 1 — BENTO MAGAZINE
         Primer card doble ancho + doble alto, resto equitativas
    ═══════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">01</span>
        <span class="model-name">Bento Magazine</span>
        <span class="model-desc">Primer proyecto destacado grande, el resto cuadrados</span>
      </div>

      <div class="bento-grid">
        <RouterLink
          v-for="(p, i) in sorted"
          :key="p.id"
          :to="`/proyecto/${p.id}`"
          class="bento-card"
          :class="{ 'bento-featured': i === 0 }"
        >
          <div class="bento-img-wrap" :style="{ background: p.colorFondo }">
            <img :src="p.imagenPrincipal" :alt="p.nombre" class="bento-img" />
            <span class="bento-badge">{{ p.tipo }}</span>
          </div>
          <div class="bento-info">
            <h3 class="bento-name">{{ p.nombre }}</h3>
            <p class="bento-desc">{{ l(p.descripcionCorta) }}</p>
            <div class="bento-techs">
              <span v-for="t in p.tecnologias.slice(0, 3)" :key="t" class="bento-tech">{{ t }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════
         MODELO 2 — LISTA NUMERADA (Editorial)
         Número grande + línea separadora + info compacta
    ═══════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">02</span>
        <span class="model-name">Lista Editorial</span>
        <span class="model-desc">Número grande, imagen pequeña a la derecha, información densa</span>
      </div>

      <ul class="list-grid">
        <li v-for="(p, i) in sorted" :key="p.id" class="list-item">
          <RouterLink :to="`/proyecto/${p.id}`" class="list-link">
            <span class="list-index">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="list-body">
              <div class="list-top">
                <h3 class="list-name">{{ p.nombre }}</h3>
                <span class="list-badge">{{ p.tipo }}</span>
              </div>
              <p class="list-desc">{{ l(p.descripcionCorta) }}</p>
              <div class="list-techs">
                <span v-for="t in p.tecnologias.slice(0, 4)" :key="t" class="list-tech">{{ t }}</span>
              </div>
            </div>
            <div class="list-thumb" :style="{ background: p.colorFondo }">
              <img :src="p.imagenPrincipal" :alt="p.nombre" />
            </div>
            <svg class="list-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="20" height="20">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </RouterLink>
        </li>
      </ul>
    </section>

    <!-- ════════════════════════════════════════════════════════
         MODELO 3 — CINE / WIDESCREEN
         Cards 21:9 full-width, info en overlay al hover
    ═══════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">03</span>
        <span class="model-name">Cine / Widescreen</span>
        <span class="model-desc">Cards 21:9 full-width, info aparece al hover</span>
      </div>

      <div class="cinema-grid">
        <RouterLink
          v-for="p in sorted"
          :key="p.id"
          :to="`/proyecto/${p.id}`"
          class="cinema-card"
        >
          <div class="cinema-img-wrap" :style="{ background: p.colorFondo }">
            <img :src="p.imagenPrincipal" :alt="p.nombre" class="cinema-img" />
          </div>
          <div class="cinema-overlay">
            <div class="cinema-left">
              <span class="cinema-badge">{{ p.tipo }}</span>
              <h3 class="cinema-name">{{ p.nombre }}</h3>
              <p class="cinema-desc">{{ l(p.descripcionCorta) }}</p>
            </div>
            <div class="cinema-right">
              <div class="cinema-techs">
                <span v-for="t in p.tecnologias.slice(0, 4)" :key="t" class="cinema-tech">{{ t }}</span>
              </div>
              <span class="cinema-cta">Ver proyecto →</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════
         MODELO 4 — POLAROID
         Cards con borde blanco, leve rotación aleatoria, estilo foto impresa
    ═══════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">04</span>
        <span class="model-name">Polaroid</span>
        <span class="model-desc">Estética de foto impresa, ligera rotación por card</span>
      </div>

      <div class="polaroid-grid">
        <RouterLink
          v-for="(p, i) in sorted"
          :key="p.id"
          :to="`/proyecto/${p.id}`"
          class="polaroid-card"
          :style="`--rot: ${[-2, 1.5, -1, 2.5, -1.8, 1][i % 6]}deg`"
        >
          <div class="polaroid-img" :style="{ background: p.colorFondo }">
            <img :src="p.imagenPrincipal" :alt="p.nombre" />
            <span class="polaroid-type">{{ p.tipo }}</span>
          </div>
          <div class="polaroid-caption">
            <span class="polaroid-name">{{ p.nombre }}</span>
            <div class="polaroid-techs">
              <span v-for="t in p.tecnologias.slice(0, 2)" :key="t">{{ t }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════
         MODELO 5 — MINIMALISTA TIPOGRÁFICO
         Sin imágenes, solo nombre grande, líneas, hover accent
    ═══════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">05</span>
        <span class="model-name">Tipográfico Minimalista</span>
        <span class="model-desc">Sin imágenes, énfasis total en el texto</span>
      </div>

      <ul class="typo-grid">
        <li v-for="(p, i) in sorted" :key="p.id" class="typo-item">
          <RouterLink :to="`/proyecto/${p.id}`" class="typo-link">
            <span class="typo-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="typo-center">
              <h3 class="typo-name">{{ p.nombre }}</h3>
              <p class="typo-desc">{{ l(p.descripcionCorta) }}</p>
            </div>
            <div class="typo-right">
              <span class="typo-type">{{ p.tipo }}</span>
              <div class="typo-techs">
                <span v-for="t in p.tecnologias.slice(0, 3)" :key="t">{{ t }}</span>
              </div>
            </div>
            <svg class="typo-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </li>
      </ul>
    </section>

  </div>
</template>

<style scoped>
.lab {
  min-height: 100vh;
  padding: 100px 48px 80px;
  max-width: 1300px;
  margin: 0 auto;
}

/* ── Lab header ── */
.lab-header {
  margin-bottom: 80px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-color);
}
.lab-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  border-radius: 100px;
  padding: 4px 12px;
  margin-bottom: 16px;
}
.lab-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 10px;
}
.lab-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
}
.lab-sub a {
  color: var(--accent-color);
  text-decoration: none;
}
.lab-sub a:hover {
  text-decoration: underline;
}
.lab-sub code {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 1px 7px;
  border-radius: 5px;
  font-size: 0.88em;
}

/* ── Section wrapper ── */
.lab-section {
  margin-bottom: 100px;
}

.model-label {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}
.model-num {
  font-size: 3rem;
  font-weight: 900;
  color: var(--border-color);
  line-height: 1;
  letter-spacing: -0.05em;
}
.model-name {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
.model-desc {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  margin-left: auto;
}

/* ══════════════════════════════════════════
   MODELO 1 — BENTO MAGAZINE
══════════════════════════════════════════ */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  gap: 14px;
}

.bento-card {
  border-radius: 18px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s;
}
.bento-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.22);
  border-color: rgba(56,189,248,0.3);
}

.bento-card.bento-featured {
  grid-column: span 2;
  grid-row: span 2;
}
.bento-card.bento-featured .bento-img-wrap {
  flex: 1;
}
.bento-card.bento-featured .bento-name {
  font-size: 1.8rem;
}
.bento-card.bento-featured .bento-desc {
  display: block;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}

.bento-img-wrap {
  position: relative;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
}
.bento-card.bento-featured .bento-img-wrap { height: auto; flex: 1; }

.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s ease;
}
.bento-card:hover .bento-img { transform: scale(1.04); }

.bento-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(0,0,0,0.55);
  color: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  padding: 3px 9px;
  border-radius: 6px;
}

.bento-info {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bento-name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.bento-desc {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bento-techs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
}
.bento-tech {
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-tertiary);
  padding: 2px 8px;
  border-radius: 50px;
}

/* ══════════════════════════════════════════
   MODELO 2 — LISTA EDITORIAL
══════════════════════════════════════════ */
.list-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.list-item {
  border-bottom: 1px solid var(--border-color);
}
.list-item:first-child {
  border-top: 1px solid var(--border-color);
}

.list-link {
  display: grid;
  grid-template-columns: 64px 1fr 140px 28px;
  align-items: center;
  gap: 24px;
  padding: 22px 8px;
  text-decoration: none;
  color: var(--text-primary);
  transition: background 0.2s;
}
.list-link:hover {
  background: var(--bg-secondary);
}
.list-link:hover .list-name { color: var(--accent-color); }
.list-link:hover .list-arrow { transform: translate(3px,-3px); color: var(--accent-color); }

.list-index {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: var(--border-color);
  line-height: 1;
  flex-shrink: 0;
}

.list-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.list-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-name {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  transition: color 0.2s;
}

.list-badge {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-tertiary);
  padding: 2px 8px;
  border-radius: 50px;
}

.list-desc {
  font-size: 0.83rem;
  color: var(--text-secondary);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list-techs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.list-tech {
  font-size: 0.67rem;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: 0.04em;
}
.list-tech + .list-tech::before {
  content: '·';
  margin-right: 6px;
}

.list-thumb {
  width: 140px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
.list-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.list-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: transform 0.25s, color 0.25s;
}

/* ══════════════════════════════════════════
   MODELO 3 — CINE / WIDESCREEN
══════════════════════════════════════════ */
.cinema-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cinema-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  display: block;
}

.cinema-img-wrap {
  aspect-ratio: 21 / 6;
  overflow: hidden;
}

.cinema-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s ease, filter 0.4s ease;
  filter: brightness(0.65);
}

.cinema-card:hover .cinema-img {
  transform: scale(1.04);
  filter: brightness(0.4);
}

.cinema-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 24px 32px;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%);
  transition: background 0.4s;
}
.cinema-card:hover .cinema-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.2) 100%);
}

.cinema-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cinema-badge {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin-bottom: 2px;
}

.cinema-name {
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.cinema-desc {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.7);
  max-width: 480px;
  line-height: 1.4;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s, transform 0.35s;
}
.cinema-card:hover .cinema-desc {
  opacity: 1;
  transform: none;
}

.cinema-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.cinema-techs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s 0.05s, transform 0.35s 0.05s;
}
.cinema-card:hover .cinema-techs {
  opacity: 1;
  transform: none;
}
.cinema-tech {
  font-size: 0.67rem;
  font-weight: 600;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 2px 9px;
  border-radius: 50px;
}

.cinema-cta {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-color);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s 0.1s, transform 0.35s 0.1s;
}
.cinema-card:hover .cinema-cta {
  opacity: 1;
  transform: none;
}

/* ══════════════════════════════════════════
   MODELO 4 — POLAROID
══════════════════════════════════════════ */
.polaroid-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  padding: 20px 0 40px;
}

.polaroid-card {
  text-decoration: none;
  color: var(--text-primary);
  background: #fff;
  padding: 12px 12px 48px;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.18);
  width: 220px;
  transform: rotate(var(--rot));
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s;
}
.polaroid-card:hover {
  transform: rotate(0deg) scale(1.06) translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.28);
  z-index: 10;
}

.polaroid-img {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 2px;
}
.polaroid-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.polaroid-type {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(0,0,0,0.55);
  color: rgba(255,255,255,0.9);
  backdrop-filter: blur(6px);
  padding: 2px 7px;
  border-radius: 4px;
}

.polaroid-caption {
  padding-top: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.polaroid-name {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #111;
  font-family: 'Courier New', monospace;
}

.polaroid-techs {
  display: flex;
  gap: 6px;
  justify-content: center;
}
.polaroid-techs span {
  font-size: 0.62rem;
  color: #666;
  font-family: 'Courier New', monospace;
}
.polaroid-techs span + span::before {
  content: '·';
  margin-right: 6px;
}

/* ══════════════════════════════════════════
   MODELO 5 — TIPOGRÁFICO MINIMALISTA
══════════════════════════════════════════ */
.typo-grid {
  list-style: none;
  margin: 0;
  padding: 0;
}

.typo-item {
  border-bottom: 1px solid var(--border-color);
}
.typo-item:first-child {
  border-top: 1px solid var(--border-color);
}

.typo-link {
  display: grid;
  grid-template-columns: 40px 1fr auto 28px;
  align-items: center;
  gap: 28px;
  padding: 28px 0;
  text-decoration: none;
  color: var(--text-primary);
  transition: gap 0.3s;
}
.typo-link:hover { gap: 36px; }
.typo-link:hover .typo-name { color: var(--accent-color); }
.typo-link:hover .typo-arrow { transform: translateX(6px); color: var(--accent-color); }

.typo-num {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
}

.typo-center {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.typo-name {
  font-size: clamp(1.6rem, 3vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  transition: color 0.2s;
}

.typo-desc {
  font-size: 0.83rem;
  color: var(--text-secondary);
  max-width: 440px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.typo-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.typo-type {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-color);
}

.typo-techs {
  display: flex;
  gap: 8px;
}
.typo-techs span {
  font-size: 0.72rem;
  color: var(--text-tertiary);
  font-weight: 500;
}
.typo-techs span + span::before {
  content: '/';
  margin-right: 8px;
  opacity: 0.4;
}

.typo-arrow {
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: transform 0.25s, color 0.25s;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .lab { padding: 80px 24px 60px; }
  .bento-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 240px; }
  .bento-card.bento-featured { grid-column: span 2; }
  .list-link { grid-template-columns: 48px 1fr 28px; }
  .list-thumb { display: none; }
  .model-desc { display: none; }
  .typo-link { grid-template-columns: 32px 1fr 24px; gap: 16px; }
  .typo-right { display: none; }
}

@media (max-width: 600px) {
  .lab { padding: 70px 16px 48px; }
  .bento-grid { grid-template-columns: 1fr; }
  .bento-card.bento-featured { grid-column: auto; grid-row: auto; }
  .polaroid-grid { gap: 16px; }
  .polaroid-card { width: 160px; }
  .cinema-img-wrap { aspect-ratio: 16 / 7; }
}
</style>
