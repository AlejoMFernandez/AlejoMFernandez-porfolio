import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/**
 * Plugin que escanea public/images/projects/ y genera src/data/galleries.json
 * automáticamente al iniciar el servidor o hacer build.
 */
function galleryManifestPlugin() {
  const projectsDir = path.resolve(__dirname, 'public/images/projects')
  const outputFile  = path.resolve(__dirname, 'src/data/galleries.json')
  const imageRe     = /\.(png|jpe?g|gif|webp|avif|svg)$/i

  function build() {
    const manifest = {}
    if (fs.existsSync(projectsDir)) {
      for (const folder of fs.readdirSync(projectsDir)) {
        const folderPath = path.join(projectsDir, folder)
        if (!fs.statSync(folderPath).isDirectory()) continue
        manifest[folder] = fs.readdirSync(folderPath)
          .filter(f => imageRe.test(f))
          .sort()
          .map(f => `/images/projects/${folder}/${encodeURIComponent(f)}`)
      }
    }
    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2))
  }

  return {
    name: 'gallery-manifest',
    buildStart() { build() },
    configureServer(server) {
      build()
      // Re-generar cuando se agregan/eliminan imágenes en dev
      server.watcher.on('add',    f => { if (f.includes('images/projects')) build() })
      server.watcher.on('unlink', f => { if (f.includes('images/projects')) build() })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    galleryManifestPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
