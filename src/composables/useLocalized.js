import { useI18n } from 'vue-i18n'

/**
 * Composable to resolve bilingual fields from JSON data.
 * Fields can be plain strings or { es: "...", en: "..." } objects.
 * Returns the value for the current locale, with fallback to Spanish.
 */
export function useLocalized() {
  const { locale } = useI18n()

  const l = (value) => {
    if (value === null || value === undefined) return value
    if (typeof value === 'object' && !Array.isArray(value)) {
      if ('es' in value || 'en' in value) {
        return value[locale.value] ?? value.es ?? value.en ?? ''
      }
    }
    return value
  }

  return { l, locale }
}
