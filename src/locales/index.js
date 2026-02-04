import { createI18n } from 'vue-i18n'
import es from './es.json'
import en from './en.json'

// Detectar idioma del navegador o usar español por defecto
const getBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0]
  return ['es', 'en'].includes(browserLang) ? browserLang : 'es'
}

// Obtener idioma guardado o usar el del navegador
const savedLanguage = localStorage.getItem('portfolio-language') || getBrowserLanguage()

const i18n = createI18n({
  legacy: false, // Usar Composition API
  locale: savedLanguage,
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})

// Función para cambiar idioma y guardarlo
export const setLanguage = (lang) => {
  i18n.global.locale.value = lang
  localStorage.setItem('portfolio-language', lang)
  document.documentElement.lang = lang
}

// Función para obtener el idioma actual
export const getCurrentLanguage = () => i18n.global.locale.value

// Función para alternar entre idiomas
export const toggleLanguage = () => {
  const newLang = i18n.global.locale.value === 'es' ? 'en' : 'es'
  setLanguage(newLang)
}

export default i18n
