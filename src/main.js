import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import { vMagnetic } from './composables/useMagnetic'
import { initAnalytics } from './services/analytics'
import './assets/main.css'

const app = createApp(App)
initAnalytics()
app.use(router)
app.use(i18n)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  }
})
app.directive('magnetic', vMagnetic)
app.mount('#app')
