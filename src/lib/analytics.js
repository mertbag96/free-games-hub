/**
 * Optional Google Analytics 4 with Consent Mode v2 primitives.
 * Loads gtag.js only after the user grants optional analytics in the cookie banner.
 *
 * Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXX) in `.env`. If unset, this module stays inert.
 */
import { ANALYTICS_EVENT, getConsentSnapshot } from '@/lib/consentCookies.js'

const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()

let injectPromise = null
/** @type {boolean} */
let gtagBootstrapDone = false
/** @type {boolean} */
let measurementConfigured = false

/** @returns {Promise<void>} */
function injectGtagJs() {
    if (!GA_ID || typeof document === 'undefined') {
        return Promise.resolve()
    }
    if (injectPromise) return injectPromise
    injectPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('gtag failed to load'))
        document.head.appendChild(script)
    })
    return injectPromise
}

/** @returns {boolean} */
export function hasMeasurementConfig() {
    return Boolean(GA_ID)
}

function ensureGtagSkeleton() {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    if (typeof window.gtag === 'function') return
    window.gtag = function gtagFunction() {
        window.dataLayer.push(arguments)
    }
}

let consentDefaultsSeeded = false

function primeConsentDefaultsDenied() {
    if (!window.gtag || consentDefaultsSeeded) return
    window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
        wait_for_update: 500,
    })
    consentDefaultsSeeded = true
}

/** @returns {Promise<void>} */
async function enableMeasurement() {
    if (!GA_ID) return
    ensureGtagSkeleton()
    primeConsentDefaultsDenied()

    await injectGtagJs()

    if (!gtagBootstrapDone) {
        window.gtag('js', new Date())
        gtagBootstrapDone = true
    }

    window.gtag('consent', 'update', {
        analytics_storage: 'granted',
    })

    if (!measurementConfigured) {
        /** Router + explicit calls emit page_view; avoids duplicate automatic hits */
        window.gtag('config', GA_ID, { send_page_view: false })
        measurementConfigured = true
    }
}

function revokeMeasurementConsent() {
    if (!window.gtag) return
    window.gtag('consent', 'update', {
        analytics_storage: 'denied',
    })
}

function firePageView() {
    const snap = getConsentSnapshot()
    if (!snap?.optional || !window.gtag || !GA_ID) return
    const path =
        typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/'
    const loc =
        typeof window !== 'undefined' ? `${window.location.origin}${path}` : undefined
    window.gtag('event', 'page_view', {
        page_title: typeof document !== 'undefined' ? document.title : '',
        page_path: path,
        page_location: loc,
    })
}

/**
 * @param {boolean} analyticsGranted
 * @param {{ emitPageView?: boolean }} [options]
 */
export async function applyAnalyticsConsentDecision(analyticsGranted, options = {}) {
    const { emitPageView = true } = options
    if (!GA_ID || typeof window === 'undefined') return

    ensureGtagSkeleton()

    if (analyticsGranted) {
        try {
            await enableMeasurement()
            if (emitPageView) {
                firePageView()
            }
        } catch {
            /* blocked network / extensions */
        }
    } else {
        primeConsentDefaultsDenied()
        revokeMeasurementConsent()
    }
}

/** Default-deny ASAP; hydrate prior acceptances — awaits GA bootstrap when opted in */
export async function syncAnalyticsWithStoredConsent() {
    if (!GA_ID || typeof window === 'undefined') return

    ensureGtagSkeleton()
    primeConsentDefaultsDenied()

    const snap = getConsentSnapshot()
    if (!snap) return

    /** First route hit is routed through `router.afterEach` once the app mounts */
    if (snap.optional) await applyAnalyticsConsentDecision(true, { emitPageView: false })
    else revokeMeasurementConsent()
}

/** SPA transitions after analytics is granted */
export function registerAnalyticsRouter(router) {
    if (!GA_ID || !router || typeof router.afterEach !== 'function') return

    router.afterEach(() => {
        firePageView()
    })
}

export function installConsentAnalyticsBridge() {
    if (typeof window === 'undefined') return

    window.addEventListener(
        ANALYTICS_EVENT,
        (event) => {
            void applyAnalyticsConsentDecision(Boolean(event.detail?.optional), { emitPageView: true })
        },
        false,
    )
}
