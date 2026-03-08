<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// ── Datos mock de Franza (hardcoded para el lab) ──────────────────
const p = {
  id: 'franza',
  nombre: 'FRANZA',
  tipo: 'ABM',
  cliente: 'Franza Constructora',
  rol: 'Desarrollador Full-Stack',
  fechaInicio: 'Mar 2025',
  fechaFin: 'May 2025',
  descripcionCorta: 'Sitio moderno para una constructora con sistema automatizado de ABM.',
  descripcionLarga: 'Sitio moderno para una constructora con sistema automatizado que genera páginas índice y detalle de obras a partir de carpetas de un banco de fotos estandarizado. Facilita la actualización del portfolio y mantiene consistencia visual a lo largo de toda la plataforma.',
  tecnologias: ['PHP', 'Bootstrap', 'CSS', 'JavaScript', 'MySQL'],
  features: [
    'Generación automática de páginas',
    'Sistema de banco de fotos',
    'Portfolio de obras dinámico',
    'Panel de administración',
    'Diseño responsive'
  ],
  linkDemo: 'https://Franza.vercel.app/',
  linkGithub: 'https://github.com/AlejoMFernandez/Franza',
  colorFondo: '#b38839',
  colorTexto: '#ffffff',
  imagenPrincipal: '/images/projects/franzamain.png',
  logo: '/images/projects/franzalogo.png',
}

// Galería: encode cada ruta para manejar espacios y caracteres especiales
const rawGallery = [
  '/images/projects/franza/localhost_Franza_sitio_.png',
  '/images/projects/franza/localhost_Franza_sitio_ (1).png',
  '/images/projects/franza/localhost_Franza_sitio_ (2).png',
  '/images/projects/franza/localhost_Franza_sitio_index.php_seccion=obrasciviles.png',
  '/images/projects/franza/localhost_Franza_sitio_index.php_seccion=obra-ver&id=67.png',
  '/images/projects/franza/localhost_Franza_sitio_index.php_seccion=obra-ver&id=67 (1).png',
  '/images/projects/franza/localhost_Franza_sitio_admin_index.php_seccion=obras.png',
  '/images/projects/franza/localhost_Franza_sitio_admin_index.php_seccion=obras (1).png',
  '/images/projects/franza/localhost_Franza_sitio_admin_index.php_seccion=obras (2).png',
  '/images/projects/franza/localhost_Franza_sitio_admin_index.php_seccion=obras (3).png',
  '/images/projects/franza/localhost_Franza_sitio_admin_index.php_seccion=obras-agregar.png',
  '/images/projects/franza/localhost_Franza_sitio_admin_index.php_seccion=obras-agregar (1).png',
  '/images/projects/franza/localhost_Franza_sitio_index.php_seccion=iniciar-sesion.png',
  '/images/projects/franza/localhost_Franza_sitio_index.php_seccion=registrarse.png',
]
const gallery = rawGallery.map(p => encodeURI(p))

// Lightbox compartido entre modelos
const lightboxSrc = ref(null)
const openLb = (src) => { lightboxSrc.value = src }
const closeLb = () => { lightboxSrc.value = null }
</script>

<template>
  <div class="lab-proj">

    <!-- ── Lab header ──────────────────────────────────────────── -->
    <div class="lab-header">
      <RouterLink to="/lab" class="lab-back">← volver al lab</RouterLink>
      <span class="lab-badge">🧪 LAB — Detalle de Proyecto</span>
      <h1 class="lab-title">Modelos para la vista de proyecto</h1>
      <p class="lab-sub">Ejemplo con datos reales de <strong>FRANZA</strong>. Proyecto real: <RouterLink to="/proyecto/franza">/proyecto/franza →</RouterLink></p>
    </div>

    <!-- ══════════════════════════════════════════════════════════
         MODELO 1 — HERO PORTADA + SIDEBAR STICKY
    ══════════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">01</span>
        <span class="model-name">Hero Portada + Sidebar sticky</span>
        <span class="model-desc">Imagen principal a pantalla completa, info fija a la derecha al hacer scroll</span>
      </div>

      <div class="m1-wrap">
        <!-- Hero fullscreen -->
        <div class="m1-hero" :style="{ background: p.colorFondo }">
          <img :src="p.imagenPrincipal" alt="Franza" class="m1-hero-img" />
          <div class="m1-hero-overlay">
            <span class="m1-tipo">{{ p.tipo }}</span>
            <h2 class="m1-title">{{ p.nombre }}</h2>
            <p class="m1-tagline">{{ p.descripcionCorta }}</p>
          </div>
          <div class="m1-meta-bar">
            <span>{{ p.cliente }}</span>
            <span class="m1-meta-dot">·</span>
            <span>{{ p.fechaInicio }} — {{ p.fechaFin }}</span>
            <span class="m1-meta-dot">·</span>
            <span>{{ p.rol }}</span>
          </div>
        </div>

        <!-- Body: desc + sidebar -->
        <div class="m1-body">
          <div class="m1-main">
            <h3 class="m1-block-title">Sobre el proyecto</h3>
            <p class="m1-desc">{{ p.descripcionLarga }}</p>

            <h3 class="m1-block-title">Galería</h3>
            <div class="m1-gallery">
              <div v-for="(img, i) in gallery" :key="i" class="m1-gallery-item" @click="openLb(img)">
                <img :src="img" :alt="`Screenshot ${i + 1}`" />
              </div>
            </div>
          </div>

          <aside class="m1-sidebar">
            <div class="m1-sb-block">
              <p class="m1-sb-label">Cliente</p>
              <p class="m1-sb-val">{{ p.cliente }}</p>
            </div>
            <div class="m1-sb-block">
              <p class="m1-sb-label">Rol</p>
              <p class="m1-sb-val">{{ p.rol }}</p>
            </div>
            <div class="m1-sb-block">
              <p class="m1-sb-label">Período</p>
              <p class="m1-sb-val">{{ p.fechaInicio }} – {{ p.fechaFin }}</p>
            </div>
            <div class="m1-sb-block">
              <p class="m1-sb-label">Tecnologías</p>
              <div class="m1-techs">
                <span v-for="t in p.tecnologias" :key="t">{{ t }}</span>
              </div>
            </div>
            <div class="m1-sb-block">
              <p class="m1-sb-label">Features</p>
              <ul class="m1-features">
                <li v-for="f in p.features" :key="f">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ f }}
                </li>
              </ul>
            </div>
            <div class="m1-links">
              <a :href="p.linkDemo" target="_blank" class="m1-link-btn primary">Ver sitio ↗</a>
              <a :href="p.linkGithub" target="_blank" class="m1-link-btn secondary">GitHub ↗</a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         MODELO 2 — SPLIT SCREEN (panel fijo izq / scroll der)
    ══════════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">02</span>
        <span class="model-name">Split Screen</span>
        <span class="model-desc">Panel izquierdo con color del proyecto fijo, contenido scrolleable a la derecha</span>
      </div>

      <div class="m2-wrap">
        <!-- Panel izq fijo -->
        <div class="m2-panel" :style="{ background: p.colorFondo }">
          <div class="m2-panel-inner">
            <span class="m2-tipo">{{ p.tipo }}</span>
            <h2 class="m2-title">{{ p.nombre }}</h2>
            <p class="m2-tagline">{{ p.descripcionCorta }}</p>
            <div class="m2-divider"></div>
            <div class="m2-meta">
              <div><span class="m2-mlabel">Cliente</span><span class="m2-mval">{{ p.cliente }}</span></div>
              <div><span class="m2-mlabel">Período</span><span class="m2-mval">{{ p.fechaInicio }} – {{ p.fechaFin }}</span></div>
              <div><span class="m2-mlabel">Rol</span><span class="m2-mval">{{ p.rol }}</span></div>
            </div>
            <div class="m2-techs">
              <span v-for="t in p.tecnologias" :key="t">{{ t }}</span>
            </div>
            <div class="m2-links">
              <a :href="p.linkDemo" target="_blank" class="m2-link">Ver sitio ↗</a>
              <a :href="p.linkGithub" target="_blank" class="m2-link">GitHub ↗</a>
            </div>
          </div>
        </div>

        <!-- Scroll derecho -->
        <div class="m2-scroll">
          <img :src="p.imagenPrincipal" alt="Franza" class="m2-main-img" />
          
          <div class="m2-content">
            <h3 class="m2-block-title">Sobre el proyecto</h3>
            <p class="m2-desc">{{ p.descripcionLarga }}</p>

            <h3 class="m2-block-title">Características</h3>
            <ul class="m2-features">
              <li v-for="(f, i) in p.features" :key="f">
                <span class="m2-feat-num">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ f }}
              </li>
            </ul>

            <h3 class="m2-block-title">Galería</h3>
            <div class="m2-gallery">
              <div v-for="(img, i) in gallery" :key="i" class="m2-gallery-item" @click="openLb(img)">
                <img :src="img" :alt="`Screenshot ${i + 1}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         MODELO 3 — NARRATIVE SCROLL (secciones alternadas)
    ══════════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">03</span>
        <span class="model-name">Narrative Scroll</span>
        <span class="model-desc">Cabecera mínima, secciones texto/imagen alternadas, galería fullwidth al final</span>
      </div>

      <div class="m3-wrap">
        <!-- Cabecera mínima -->
        <div class="m3-header">
          <span class="m3-tipo">{{ p.tipo }}</span>
          <h2 class="m3-title">{{ p.nombre }}</h2>
          <div class="m3-meta-row">
            <span>{{ p.cliente }}</span>
            <span>{{ p.fechaInicio }} – {{ p.fechaFin }}</span>
            <span>{{ p.rol }}</span>
            <a :href="p.linkDemo" target="_blank">Ver sitio ↗</a>
            <a :href="p.linkGithub" target="_blank">GitHub ↗</a>
          </div>
        </div>

        <!-- Imagen principal fullwidth -->
        <div class="m3-full-img" :style="{ background: p.colorFondo }">
          <img :src="p.imagenPrincipal" alt="Franza" />
        </div>

        <!-- Sección: texto izq / imagen der -->
        <div class="m3-row">
          <div class="m3-text">
            <h3>Sobre el proyecto</h3>
            <p>{{ p.descripcionLarga }}</p>
            <div class="m3-techs">
              <span v-for="t in p.tecnologias" :key="t">{{ t }}</span>
            </div>
          </div>
          <div class="m3-img-side" @click="openLb(gallery[0])">
            <img :src="gallery[0]" alt="Screenshot" />
          </div>
        </div>

        <!-- Sección: imagen izq / features der -->
        <div class="m3-row m3-row-reverse">
          <div class="m3-img-side" @click="openLb(gallery[3])">
            <img :src="gallery[3]" alt="Screenshot" />
          </div>
          <div class="m3-text">
            <h3>Características</h3>
            <ul class="m3-features">
              <li v-for="(f, i) in p.features" :key="f">
                <span>{{ String(i + 1).padStart(2, '0') }}</span>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Galería fullwidth -->
        <h3 class="m3-gallery-title">Galería completa</h3>
        <div class="m3-gallery">
          <div v-for="(img, i) in gallery" :key="i" class="m3-gallery-item" @click="openLb(img)">
            <img :src="img" :alt="`Screenshot ${i + 1}`" />
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         MODELO 4 — BENTO DASHBOARD
    ══════════════════════════════════════════════════════════════ -->
    <section class="lab-section">
      <div class="model-label">
        <span class="model-num">04</span>
        <span class="model-name">Bento Dashboard</span>
        <span class="model-desc">Grid tipo bento arriba con imagen + meta + features, galería masonry abajo</span>
      </div>

      <div class="m4-wrap">
        <!-- Bento superior -->
        <div class="m4-bento">
          <!-- Celda: nombre + tipo (2 cols) -->
          <div class="m4-cell m4-name-cell" :style="{ background: p.colorFondo }">
            <span class="m4-tipo">{{ p.tipo }}</span>
            <h2 class="m4-title">{{ p.nombre }}</h2>
            <p class="m4-tagline">{{ p.descripcionCorta }}</p>
            <div class="m4-links">
              <a :href="p.linkDemo" target="_blank">Ver sitio ↗</a>
              <a :href="p.linkGithub" target="_blank">GitHub ↗</a>
            </div>
          </div>

          <!-- Celda: imagen principal (2 cols 2 rows) -->
          <div class="m4-cell m4-img-cell" :style="{ background: p.colorFondo }">
            <img :src="p.imagenPrincipal" alt="Franza" />
          </div>

          <!-- Celda: cliente/período -->
          <div class="m4-cell m4-meta-cell">
            <p class="m4-ml">Cliente</p>
            <p class="m4-mv">{{ p.cliente }}</p>
            <p class="m4-ml" style="margin-top:16px">Período</p>
            <p class="m4-mv">{{ p.fechaInicio }} – {{ p.fechaFin }}</p>
            <p class="m4-ml" style="margin-top:16px">Rol</p>
            <p class="m4-mv">{{ p.rol }}</p>
          </div>

          <!-- Celda: tecnologías -->
          <div class="m4-cell m4-tech-cell">
            <p class="m4-ml">Stack</p>
            <div class="m4-techs">
              <span v-for="t in p.tecnologias" :key="t">{{ t }}</span>
            </div>
          </div>

          <!-- Celda: features -->
          <div class="m4-cell m4-feat-cell">
            <p class="m4-ml">Features</p>
            <ul class="m4-features">
              <li v-for="f in p.features" :key="f">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Descripción -->
        <div class="m4-desc-section">
          <h3 class="m4-block-title">Sobre el proyecto</h3>
          <p class="m4-desc">{{ p.descripcionLarga }}</p>
        </div>

        <!-- Galería masonry -->
        <h3 class="m4-block-title">Galería</h3>
        <div class="m4-gallery">
          <div v-for="(img, i) in gallery" :key="i" class="m4-gallery-item" @click="openLb(img)">
            <img :src="img" :alt="`Screenshot ${i + 1}`" />
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox global -->
    <Teleport to="body">
      <div v-if="lightboxSrc" class="lab-lightbox" @click="closeLb">
        <button class="lb-close" @click="closeLb">✕</button>
        <img :src="lightboxSrc" @click.stop />
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
/* ── Lab shell ───────────────────────────────────────────────── */
.lab-proj {
  min-height: 100vh;
  padding: 100px 48px 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.lab-header {
  margin-bottom: 80px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-color);
}
.lab-back {
  display: inline-block;
  font-size: 0.82rem;
  color: var(--text-tertiary);
  text-decoration: none;
  margin-bottom: 12px;
  transition: color 0.2s;
}
.lab-back:hover { color: var(--accent-color); }

.lab-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  padding: 3px 12px;
  border-radius: 100px;
  margin-bottom: 14px;
}
.lab-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.lab-sub {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.lab-sub a { color: var(--accent-color); text-decoration: none; }
.lab-sub a:hover { text-decoration: underline; }

.lab-section { margin-bottom: 120px; }

.model-label {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
}
.model-num {
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--border-color);
  letter-spacing: -0.05em;
  line-height: 1;
}
.model-name {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
.model-desc {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  margin-left: auto;
}

/* ── Lightbox ────────────────────────────────────────────────── */
.lab-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  cursor: zoom-out;
}
.lab-lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  cursor: default;
}
.lb-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
}
.lb-close:hover { opacity: 1; }

/* ══════════════════════════════════════════════════════════════
   MODELO 1 — HERO PORTADA + SIDEBAR STICKY
══════════════════════════════════════════════════════════════ */
.m1-wrap {
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-primary);
}

.m1-hero {
  position: relative;
  height: 520px;
  overflow: hidden;
}
.m1-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0.35;
}
.m1-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
}
.m1-tipo {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-bottom: 12px;
}
.m1-title {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  color: #fff;
  line-height: 0.9;
  margin-bottom: 20px;
}
.m1-tagline {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  max-width: 540px;
  line-height: 1.5;
}
.m1-meta-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(10px);
  padding: 16px 60px;
  display: flex;
  gap: 20px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.75);
  align-items: center;
}
.m1-meta-dot { opacity: 0.4; }

.m1-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 0;
}

.m1-main {
  padding: 48px 48px 48px 60px;
  border-right: 1px solid var(--border-color);
}

.m1-block-title {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 16px;
  margin-top: 40px;
}
.m1-block-title:first-child { margin-top: 0; }

.m1-desc {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
}

.m1-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.m1-gallery-item {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 8px;
  cursor: zoom-in;
  background: var(--bg-secondary);
}
.m1-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s ease;
}
.m1-gallery-item:hover img { transform: scale(1.05); }

.m1-sidebar {
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.m1-sb-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 5px;
}
.m1-sb-val {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
}

.m1-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.m1-techs span {
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 3px 10px;
  border-radius: 50px;
}

.m1-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.m1-features li {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 0.82rem;
  color: var(--text-secondary);
}
.m1-features svg { flex-shrink: 0; margin-top: 2px; color: var(--accent-color); }

.m1-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}
.m1-link-btn {
  display: block;
  text-align: center;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}
.m1-link-btn:hover { opacity: 0.8; }
.m1-link-btn.primary { background: var(--accent-color); color: #000; }
.m1-link-btn.secondary { background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); }

/* ══════════════════════════════════════════════════════════════
   MODELO 2 — SPLIT SCREEN
══════════════════════════════════════════════════════════════ */
.m2-wrap {
  display: grid;
  grid-template-columns: 340px 1fr;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  min-height: 700px;
}

.m2-panel {
  position: relative;
}
.m2-panel-inner {
  position: sticky;
  top: 80px;
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.m2-tipo {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 10px;
}
.m2-title {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  color: #fff;
  line-height: 0.95;
  margin-bottom: 16px;
}
.m2-tagline {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.55;
  margin-bottom: 24px;
}
.m2-divider {
  height: 1px;
  background: rgba(255,255,255,0.2);
  margin-bottom: 24px;
}
.m2-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.m2-meta div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.m2-mlabel {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
.m2-mval {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
}
.m2-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 32px;
}
.m2-techs span {
  font-size: 0.68rem;
  font-weight: 600;
  background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.9);
  padding: 3px 10px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.2);
}
.m2-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}
.m2-link {
  display: block;
  text-align: center;
  padding: 11px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.25);
  transition: background 0.2s;
}
.m2-link:hover { background: rgba(255,255,255,0.25); }

.m2-scroll {
  background: var(--bg-primary);
  overflow-y: auto;
}
.m2-main-img {
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: top;
  display: block;
}
.m2-content {
  padding: 48px;
}
.m2-block-title {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 16px;
  margin-top: 40px;
}
.m2-block-title:first-child { margin-top: 0; }
.m2-desc {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
}
.m2-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.m2-features li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}
.m2-feat-num {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-tertiary);
  letter-spacing: 0.06em;
  min-width: 28px;
}
.m2-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 0;
}
.m2-gallery-item {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 8px;
  cursor: zoom-in;
  background: var(--bg-secondary);
}
.m2-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s;
}
.m2-gallery-item:hover img { transform: scale(1.04); }

/* ══════════════════════════════════════════════════════════════
   MODELO 3 — NARRATIVE SCROLL
══════════════════════════════════════════════════════════════ */
.m3-wrap {
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-primary);
}

.m3-header {
  padding: 48px 60px 40px;
}
.m3-tipo {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-color);
  margin-bottom: 10px;
}
.m3-title {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  color: var(--text-primary);
  margin-bottom: 20px;
}
.m3-meta-row {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.82rem;
  color: var(--text-tertiary);
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}
.m3-meta-row a {
  margin-left: auto;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
}
.m3-meta-row a + a { margin-left: 0; }
.m3-meta-row a:hover { text-decoration: underline; }

.m3-full-img {
  aspect-ratio: 21 / 7;
  overflow: hidden;
}
.m3-full-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.m3-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 420px;
}
.m3-row-reverse { direction: rtl; }
.m3-row-reverse > * { direction: ltr; }

.m3-text {
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  border-right: 1px solid var(--border-color);
}
.m3-row-reverse .m3-text { border-right: none; border-left: 1px solid var(--border-color); }

.m3-text h3 {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}
.m3-text p {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--text-secondary);
}
.m3-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.m3-techs span {
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-tertiary);
  padding: 3px 10px;
  border-radius: 50px;
}

.m3-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.m3-features li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 13px 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.93rem;
  color: var(--text-primary);
}
.m3-features li span {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-tertiary);
  letter-spacing: 0.06em;
  min-width: 24px;
}

.m3-img-side {
  overflow: hidden;
  cursor: zoom-in;
}
.m3-img-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  transition: transform 0.5s ease;
}
.m3-img-side:hover img { transform: scale(1.04); }

.m3-gallery-title {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding: 40px 60px 16px;
  border-top: 1px solid var(--border-color);
}

.m3-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.m3-gallery-item {
  aspect-ratio: 4/3;
  overflow: hidden;
  cursor: zoom-in;
  background: var(--bg-secondary);
}
.m3-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  transition: transform 0.4s, filter 0.4s;
}
.m3-gallery-item:hover img {
  transform: scale(1.06);
  filter: brightness(1.1);
}

/* ══════════════════════════════════════════════════════════════
   MODELO 4 — BENTO DASHBOARD
══════════════════════════════════════════════════════════════ */
.m4-wrap {
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-primary);
  padding: 32px;
}

.m4-bento {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
  margin-bottom: 12px;
}

.m4-cell {
  border-radius: 14px;
  padding: 28px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* col 1, row 1+2 */
.m4-name-cell {
  grid-column: 1;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* col 2, rows 1+2 */
.m4-img-cell {
  grid-column: 2;
  grid-row: 1 / 3;
  padding: 0;
  overflow: hidden;
}
.m4-img-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

/* col 3, row 1 */
.m4-meta-cell {
  grid-column: 3;
  grid-row: 1;
}

/* col 3, row 2 (split into 2 more cells below) */
.m4-tech-cell {
  grid-column: 3;
  grid-row: 2;
}

.m4-tipo {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
}
.m4-title {
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  color: #fff;
  line-height: 1;
  margin: 4px 0 8px;
}
.m4-tagline {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.55;
  flex: 1;
}
.m4-links {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.15);
}
.m4-links a {
  flex: 1;
  text-align: center;
  padding: 9px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  transition: background 0.2s;
}
.m4-links a:hover { background: rgba(255,255,255,0.25); }

.m4-ml {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 3px;
}
.m4-mv {
  font-size: 0.88rem;
  color: var(--text-primary);
  font-weight: 500;
}
.m4-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.m4-techs span {
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 3px 10px;
  border-radius: 50px;
}

.m4-feat-cell {
  grid-column: 1 / 4;
  padding: 20px 28px;
}
.m4-features {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}
.m4-features li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.m4-features svg { color: var(--accent-color); flex-shrink: 0; }

.m4-desc-section {
  padding: 32px 0 24px;
  border-top: 1px solid var(--border-color);
  margin-top: 20px;
}
.m4-block-title {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 14px;
}
.m4-desc {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 760px;
}

.m4-gallery {
  columns: 4;
  column-gap: 8px;
  margin-top: 12px;
}
.m4-gallery-item {
  break-inside: avoid;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  cursor: zoom-in;
  background: var(--bg-secondary);
}
.m4-gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s, filter 0.4s;
}
.m4-gallery-item:hover img {
  transform: scale(1.03);
  filter: brightness(1.08);
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .lab-proj { padding: 80px 24px 60px; }
  .m1-body { grid-template-columns: 1fr; }
  .m1-sidebar { border-top: 1px solid var(--border-color); border-right: none; }
  .m2-wrap { grid-template-columns: 1fr; }
  .m2-panel-inner { position: static; padding: 40px 32px; }
  .m3-row { grid-template-columns: 1fr; }
  .m3-row-reverse { direction: ltr; }
  .m3-row-reverse .m3-text { border-left: none; border-top: 1px solid var(--border-color); }
  .m3-img-side { aspect-ratio: 16 / 7; }
  .m4-bento { grid-template-columns: 1fr 1fr; }
  .m4-name-cell { grid-column: 1; grid-row: auto; }
  .m4-img-cell { grid-column: 2; grid-row: auto; height: 280px; }
  .m4-meta-cell, .m4-tech-cell { grid-column: auto; grid-row: auto; }
  .m4-feat-cell { grid-column: 1 / 3; }
  .m4-gallery { columns: 3; }
}

@media (max-width: 640px) {
  .lab-proj { padding: 70px 16px 48px; }
  .m1-hero { height: 360px; }
  .m1-hero-overlay { padding: 32px; }
  .m1-meta-bar { padding: 14px 32px; flex-wrap: wrap; gap: 10px; }
  .m1-main { padding: 32px 24px; }
  .m1-gallery { grid-template-columns: repeat(2, 1fr); }
  .m3-gallery { grid-template-columns: repeat(2, 1fr); }
  .m4-bento { grid-template-columns: 1fr; }
  .m4-img-cell { grid-column: auto; height: 200px; }
  .m4-feat-cell { grid-column: auto; }
  .m4-gallery { columns: 2; }
  .model-desc { display: none; }
}
</style>
