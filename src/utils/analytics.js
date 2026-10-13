const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

function isValidMeasurementId(value) {
  return typeof value === 'string' && /^G-[A-Z0-9]+$/i.test(value) && !value.includes('XXXX');
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || !isValidMeasurementId(measurementId)) return;
  if (window.__theOsasAnalyticsInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  window.__theOsasAnalyticsInitialized = true;
}

export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, parameters);
    } catch {
      return;
    }
  }
}