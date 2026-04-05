import { createI18n } from 'vue-i18n'
import es from './es.json'
import en from './en.json'
import pt from './pt.json'

const supportedLanguages = ['es', 'en', 'pt']

// Detectar idioma del navegador o usar español por defecto
const getBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0]
  return supportedLanguages.includes(browserLang) ? browserLang : 'es'
}

// Obtener idioma guardado o usar el del navegador
const savedLanguage = localStorage.getItem('portfolio-language') || getBrowserLanguage()

const i18n = createI18n({
  legacy: false, // Usar Composition API
  locale: savedLanguage,
  fallbackLocale: 'es',
  messages: {
    es,
    en,
    pt
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
  const currentIndex = supportedLanguages.indexOf(i18n.global.locale.value)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % supportedLanguages.length
  const newLang = supportedLanguages[nextIndex]
  setLanguage(newLang)
}

export default i18n
