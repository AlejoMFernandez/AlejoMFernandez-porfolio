# 🤖 Prompt template — Agregar un proyecto al portfolio

> Pegá este prompt en una sesión nueva de Claude / ChatGPT / Cursor cuando termines un proyecto nuevo y quieras que lo integre solo en el portfolio.
>
> Reemplazá lo que está entre `[CORCHETES]` con la info real del proyecto.

---

## 📋 El prompt

```
Necesito que agregues un proyecto nuevo a mi portfolio Vue.js.

CONTEXTO DEL PORTFOLIO
─────────────────────────────────────────────────────────────────
Ruta absoluta: C:\xampp\htdocs\AlejoMFernandez-porfolio
Framework: Vue 3 + Vite + Vue Router + vue-i18n (es/en/pt) + GSAP
Estructura clave:
  - src/data/projects.json   → array de proyectos (data principal)
  - src/data/galleries.json  → mapeo id → array de paths de imágenes
  - src/components/ProjectCard.vue  → card en lista (NO TOCAR)
  - src/views/WorkView.vue   → lista de proyectos (NO TOCAR)
  - src/views/ProjectView.vue → detalle con bento dashboard (NO TOCAR)
  - public/images/projects/  → assets visuales

SCHEMA DE UN PROYECTO EN projects.json
─────────────────────────────────────────────────────────────────
{
  "id": "slug-kebab-case",                ← único, lowercase
  "nombre": "NombreDelProyecto",
  "descripcionCorta": { "es": "...", "en": "...", "pt": "..." },  ← 1-2 líneas
  "descripcionLarga": { "es": "...", "en": "...", "pt": "..." },  ← 3-5 líneas
  "fechaInicio": "YYYY-MM",
  "fechaFin": "YYYY-MM" o "Actualidad",
  "cliente": "Nombre" o null,
  "rol": { "es": "Desarrollador Full-Stack", "en": "...", "pt": "..." },
  "tecnologias": ["Tech1", "Tech2", ...],
  "linkDemo": "https://...",
  "linkGithub": "https://github.com/...",
  "imagenPrincipal": "/images/projects/{id}main.png",
  "logo": "/images/projects/{id}logo.png" o null,
  "imagenes": [],                          ← vacío si usás galleries.json
  "video": null,
  "colorFondo": "linear-gradient(...)" o "#hex",  ← acorde a la marca del proyecto
  "colorTexto": "#ffffff",
  "features": {
    "es": ["Feature 1", "Feature 2", ...],
    "en": ["...", "..."],
    "pt": ["...", "..."]
  },
  "tipo": "WEBAPP" | "ABM" | "PWA" | "LANDING" | "FRONTEND" | "WORDPRESS" | "INTRANET",
  "destacado": true | false,
  "orden": número (1 = primero en la lista)
}

DATOS DEL PROYECTO NUEVO
─────────────────────────────────────────────────────────────────
Nombre: [NOMBRE_DEL_PROYECTO]
ID (slug): [slug-en-kebab-case]
Repo GitHub: [https://github.com/AlejoMFernandez/REPO]
Demo en vivo: [https://...]
Stack/Tecnologías: [PHP, MySQL, Three.js, etc.]
Tipo: [WEBAPP | ABM | PWA | LANDING | FRONTEND | WORDPRESS | INTRANET]
Cliente: [nombre o "ninguno (proyecto propio)"]
Fecha inicio: [YYYY-MM]
Fecha fin: [YYYY-MM o "Actualidad"]
Rol: [Desarrollador Full-Stack | Frontend | etc.]
¿Es destacado?: [sí/no]
¿Debería ir como orden 1 (primero) o al final?: [decisión]

Descripción corta (1-2 líneas en español, lo traducís a en + pt):
[DESCRIPCION_CORTA]

Descripción larga (3-5 líneas en español, lo traducís a en + pt):
[DESCRIPCION_LARGA]

Features principales (5-8 bullets, español, traducís a en + pt):
1. [Feature 1]
2. [Feature 2]
3. ...

Paleta visual de la marca del proyecto:
- Color fondo principal: [#hex o gradient]
- Color texto: [#hex, normalmente #ffffff]

TAREAS A REALIZAR
─────────────────────────────────────────────────────────────────
1. Leé src/data/projects.json para confirmar el patrón existente.
2. Agregá el nuevo proyecto al inicio del array con orden 1 (si va destacado).
3. Si lo agregás como orden 1, bumpeá +1 el orden de TODOS los otros
   proyectos (empezá del orden más alto hacia abajo para evitar colisiones).
4. Si NO va como orden 1, ponelo con el orden libre más bajo disponible.
5. Las traducciones a inglés y portugués hacelas vos (mantenelas precisas
   y naturales — sin acentos en portugués es OK si así lo tiene el resto
   del JSON).
6. Si no tengo screenshots aún, creá DOS placeholders SVG branded:
   - public/images/projects/{id}logo.svg (monograma/logo simplificado)
   - public/images/projects/{id}main.svg (hero 1600×1000 con la paleta
     del proyecto + nombre + elemento visual representativo)
   Usá colores/identidad del proyecto, no genéricos.
7. Creá la carpeta public/images/projects/{id}/ con un .gitkeep para los
   screenshots reales futuros.
8. Agregá a src/data/galleries.json una entrada {id}: [...] con 4-6 paths
   placeholder tipo /images/projects/{id}/{id}-01.png ... -06.png.
9. Validá con node -e que projects.json y galleries.json sigan siendo
   JSON válido y mostrame los orden finales.
10. Decime qué screenshots me faltan capturar y en qué rutas exactas
    dropearlos para que se vea 100%.

LO QUE NO TENÉS QUE HACER
─────────────────────────────────────────────────────────────────
- NO toques ProjectCard.vue, WorkView.vue ni ProjectView.vue (ya
  consumen el JSON dinámicamente).
- NO instales paquetes nuevos.
- NO commitees ni hagas push — solo aplicá los cambios y avisá.
- NO inventes URLs de demo o repo. Si falta info, preguntámela
  ANTES de empezar.
```

---

## 🎯 Cómo usarlo

1. Abrí una sesión nueva de Claude Code (o similar) en cualquier carpeta — la herramienta puede acceder al portfolio por path absoluto.
2. Copiá el prompt completo de arriba.
3. Reemplazá los `[CORCHETES]` con la data real del proyecto nuevo.
4. Pegalo y enviá.
5. La AI hace todo el trabajo: lee el patrón, agrega entry, bumpea orden, crea SVGs, valida JSON.
6. Después solo te queda dropear screenshots reales y `npm run dev` para ver.

---

## 📝 Checklist post-integración

Una vez que la AI terminó:

- [ ] `npm run dev` y verificar que aparece el proyecto en `/proyectos` (o la ruta que uses)
- [ ] Verificar que los 3 idiomas se ven correctos (es/en/pt)
- [ ] Click en la card → detail view carga OK
- [ ] Links demo + GitHub funcionan
- [ ] Capturar screenshots reales y dropearlos en `/public/images/projects/{id}/`
- [ ] Si querés reemplazar el SVG hero por un PNG real:
  - Drop el PNG en `public/images/projects/{id}main.png`
  - Editar en `projects.json` el path de `imagenPrincipal` (cambiar `.svg` → `.png`)
- [ ] Git commit + push

---

## 💡 Notas

- **Tipos válidos** según el JSON actual: `WEBAPP`, `ABM`, `PWA`, `LANDING`, `FRONTEND`, `WORDPRESS`, `INTRANET`. Si necesitás uno nuevo, mencionalo en el prompt.
- **`destacado: true`** se usa en HomeView para mostrar solo proyectos destacados en la landing.
- **`orden: 1`** = primer lugar de la lista. Los `orden` no necesitan ser consecutivos pero conviene mantenerlos limpios.
- **Galería**: la `ProjectView.vue` usa `imagenes` del JSON; si está vacío, fallback a `galleries.json[id]`. Por eso conviene dejar `imagenes: []` y usar `galleries.json`.
- **`colorFondo`**: puede ser solid (`"#1a1a1a"`) o gradient (`"linear-gradient(135deg, #X 0%, #Y 100%)"`). Se usa en el bento dashboard del detail view.
