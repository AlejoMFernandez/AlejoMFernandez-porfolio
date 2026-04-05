import { useI18n } from 'vue-i18n'

/**
 * Composable to resolve localized fields from JSON data.
 * Fields can be plain strings or { es: "...", en: "...", pt: "..." } objects.
 * Returns the value for the current locale, with fallback to Spanish/English.
 */
export function useLocalized() {
  const { locale } = useI18n()

  const l = (value) => {
    if (value === null || value === undefined) return value
    if (typeof value === 'object' && !Array.isArray(value)) {
      if ('es' in value || 'en' in value || 'pt' in value) {
        return value[locale.value] ?? value.es ?? value.en ?? value.pt ?? ''
      }
    }
    return value
  }

  return { l, locale }
}
