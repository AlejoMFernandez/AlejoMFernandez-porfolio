import { createApp } from 'vue'
import App from './App.vue'
import { initAnalytics, trackPageView } from './services/analytics'
import './assets/main.css'

initAnalytics()
trackPageView('/')

createApp(App).mount('#app')
