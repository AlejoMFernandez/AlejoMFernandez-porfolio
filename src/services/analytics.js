let isInitialized = false

function getMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID || ''
}

function hasAnalytics() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

function injectGtagScript(measurementId) {
  if (document.querySelector('script[data-ga4="true"]')) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.dataset.ga4 = 'true'
  document.head.appendChild(script)
}

export function initAnalytics() {
  const measurementId = getMeasurementId()

  if (!measurementId || isInitialized || typeof window === 'undefined') {
    return
  }

  injectGtagScript(measurementId)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())

  // Disable automatic page view because this is an SPA and routes are tracked manually.
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true
  })

  isInitialized = true
}

export function trackPageView(pagePath) {
  const measurementId = getMeasurementId()

  if (!measurementId || !hasAnalytics()) {
    return
  }

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title
  })
}

export function trackEvent(eventName, params = {}) {
  const measurementId = getMeasurementId()

  if (!measurementId || !hasAnalytics()) {
    return
  }

  window.gtag('event', eventName, params)
}
