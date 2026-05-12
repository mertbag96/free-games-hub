/** @typedef {{ v: number, optional: boolean, ts?: number }} ConsentRecord */

export const LOCAL_STORAGE_KEY = 'fgh_cookie_consent_v1'

const DOC_VERSION = 1

/** First-party preference cookie mirrored with localStorage (readable server-side via future SSR / API). */
export const COOKIE_PREFERENCES = 'fgh_cookie_prefs'

/** Marks that essential / consent scaffolding is active (~13 months default). */
export const COOKIE_ESSENTIAL = 'fgh_cookie_essential'

export const ANALYTICS_EVENT = 'fgh:cookie-consent'

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 400 // ~13 months – common consent cookie horizon

/** @returns {boolean} */
function isSecureCookiesPreferred() {
    if (typeof location === 'undefined') return false
    return location.protocol === 'https:'
}

/**
 * @param {string} name
 * @param {string} value
 * @param {number} [maxAgeSeconds]
 */
export function writeFirstPartyCookie(name, value, maxAgeSeconds = COOKIE_MAX_AGE_SEC) {
    if (typeof document === 'undefined') return
    const parts = [
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        'Path=/',
        `SameSite=Lax`,
        maxAgeSeconds > 0 ? `Max-Age=${maxAgeSeconds}` : '',
        isSecureCookiesPreferred() ? 'Secure' : '',
    ].filter(Boolean)
    document.cookie = parts.join('; ')
}

/** @param {string} name */
export function readFirstPartyCookie(name) {
    if (typeof document === 'undefined') return ''
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${encodeURIComponent(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : ''
}

/** Encode consent for the compact preferences cookie (`v:o` where o is 0|1). */
function encodePrefsPayload(optional) {
    return `${DOC_VERSION}:${optional ? 1 : 0}`
}

/**
 * @returns {ConsentRecord|null}
 */
function normalizeRecord(raw) {
    if (!raw || typeof raw !== 'object') return null
    if (raw.v !== DOC_VERSION || typeof raw.optional !== 'boolean') return null
    return { v: raw.v, optional: raw.optional, ts: raw.ts }
}

/**
 * @returns {ConsentRecord|null}
 */
function readFromLocalStorage() {
    if (typeof localStorage === 'undefined') return null
    try {
        const parsed = normalizeRecord(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || ''))
        return parsed
    } catch {
        return null
    }
}

/**
 * @returns {ConsentRecord|null}
 */
export function readFromCookies() {
    const rawEssential = readFirstPartyCookie(COOKIE_ESSENTIAL)
    const rawPrefs = readFirstPartyCookie(COOKIE_PREFERENCES)
    if (!rawEssential || !rawPrefs) return null
    const [, optDigit] = String(rawPrefs).split(':').map(Number)
    if (!(optDigit === 0 || optDigit === 1)) return null
    const optional = Boolean(optDigit)
    return normalizeRecord({
        v: DOC_VERSION,
        optional,
        ts: Date.now(),
    })
}

/**
 * Authoritative merged consent (storage first – cookies catch cold embeds).
 * When only cookies hold data, silently align localStorage.
 * @returns {ConsentRecord|null}
 */
export function getConsentSnapshot() {
    let fromLs = readFromLocalStorage()
    const fromCk = readFromCookies()

    if (!fromLs && fromCk && typeof localStorage !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fromCk))
        fromLs = fromCk
    }

    return fromLs
}

/** Push consent into HTTP cookies (and localStorage stays source for SPA fast path). */
function mirrorConsentToCookies(optional) {
    writeFirstPartyCookie(COOKIE_ESSENTIAL, '1', COOKIE_MAX_AGE_SEC)
    writeFirstPartyCookie(COOKIE_PREFERENCES, encodePrefsPayload(optional), COOKIE_MAX_AGE_SEC)

    /** Clear legacy dangling analytics cookies if rejecting (best-effort, GA-only names). */
    if (!optional) {
        deleteCookie('_ga')
        deleteCookie('_gid')
    }
}

/**
 * @param {string} name
 * @param {string} [domain]
 */
export function deleteCookie(name, domain) {
    if (typeof document === 'undefined') return
    const expires = 'Max-Age=0'
    const dom = domain ? `Domain=${domain}` : ''
    const parts = [
        `${encodeURIComponent(name)}=`,
        'Path=/',
        expires,
        'SameSite=Lax',
        isSecureCookiesPreferred() ? 'Secure' : '',
        dom,
    ].filter(Boolean)
    document.cookie = parts.join('; ')
}

/**
 * Persist banner decision: localStorage + first-party cookies + global event for analytics shim.
 * @param {boolean} optional
 */
export function persistConsent(optional) {
    const payload = { v: DOC_VERSION, optional, ts: Date.now() }
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload))
    }
    mirrorConsentToCookies(Boolean(optional))
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: { optional: Boolean(optional) } }))
    }
}

/**
 * On cold load, if LS has consent but cookies were cleared, recreate cookies server-readable mirror.
 */
export function hydrateConsentCookiesFromStorage() {
    const ls = readFromLocalStorage()
    if (!ls) return
    const ck = readFromCookies()
    if (!ck) {
        mirrorConsentToCookies(ls.optional)
    }
}
