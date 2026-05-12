import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const STORAGE_PREFIX = 'fgh_library_v1_'

/** @param {string|number|null|undefined} raw */
function normalizeGameId(raw) {
    if (raw === null || raw === undefined || raw === '') return ''
    return String(raw)
}

/** @param {unknown} raw */
function clipToastTitle(raw, max = 34) {
    const t = String(raw ?? '')
        .replace(/\s+/g, ' ')
        .trim()
    if (!t) return 'This game'
    return t.length <= max ? t : `${t.slice(0, Math.max(0, max - 1))}…`
}

const MAX_LIBRARY_TOASTS = 5
const LIBRARY_TOAST_MS = 2700

let authWatcherInitialized = false

/** Toast ids → timeout handles */
const libraryToastTimers = new Map()

export const useLibraryStore = defineStore('library', () => {
    const userUid = ref(/** @type {string|null} */ (null))
    /** Preserve add order / unique IDs as strings */
    const gameIds = ref(/** @type {string[]} */ ([]))

    /** Newest first (top of stack in UI); max MAX_LIBRARY_TOASTS items */
    const libraryToasts = ref(/** @type {{ id: string, body: string }[]} */ ([]))

    function storageKey(uid) {
        return STORAGE_PREFIX + uid
    }

    /** @param {string} id */
    function removeLibraryToast(id) {
        const handle = libraryToastTimers.get(id)
        if (typeof window !== 'undefined' && handle !== undefined) {
            window.clearTimeout(handle)
        }
        libraryToastTimers.delete(id)
        libraryToasts.value = libraryToasts.value.filter((t) => t.id !== id)
    }

    function dismissLibraryToast() {
        if (typeof window !== 'undefined') {
            for (const handle of libraryToastTimers.values()) {
                window.clearTimeout(handle)
            }
        }
        libraryToastTimers.clear()
        libraryToasts.value = []
    }

    /** @param {string} line */
    function queueLibraryToast(line) {
        if (typeof window === 'undefined') return

        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
        libraryToasts.value = [{ id, body: line }, ...libraryToasts.value]

        while (libraryToasts.value.length > MAX_LIBRARY_TOASTS) {
            const dropped = libraryToasts.value.pop()
            if (dropped) removeLibraryToast(dropped.id)
        }

        const handle = window.setTimeout(() => {
            removeLibraryToast(id)
        }, LIBRARY_TOAST_MS)
        libraryToastTimers.set(id, handle)
    }

    function persist() {
        if (!userUid.value) return
        const payload = { v: 1, ids: gameIds.value }
        try {
            localStorage.setItem(storageKey(userUid.value), JSON.stringify(payload))
        } catch {
            /* quota / privacy mode */
        }
    }

    function loadFromDiskForUid(uid) {
        if (!uid) {
            gameIds.value = []
            return
        }
        try {
            const raw = localStorage.getItem(storageKey(uid))
            if (!raw) {
                gameIds.value = []
                return
            }
            const parsed = JSON.parse(raw)
            const list = Array.isArray(parsed?.ids) ? parsed.ids : []
            gameIds.value = [...new Set(list.map(normalizeGameId).filter(Boolean))]
        } catch {
            gameIds.value = []
        }
    }

    /** @param {import('firebase/auth').User|null} user */
    function applyAuthUser(user) {
        userUid.value = user?.uid ?? null
        dismissLibraryToast()
        if (!userUid.value) {
            gameIds.value = []
            return
        }
        loadFromDiskForUid(userUid.value)
    }

    function initAuthSync() {
        if (authWatcherInitialized) return
        authWatcherInitialized = true
        const auth = getAuth()
        applyAuthUser(auth.currentUser)
        onAuthStateChanged(auth, applyAuthUser)
    }

    /** @param {string|number} rawId */
    function has(rawId) {
        const id = normalizeGameId(rawId)
        if (!id || !userUid.value) return false
        return gameIds.value.includes(id)
    }

    /** @param {string|number} rawId */
    function add(rawId) {
        const id = normalizeGameId(rawId)
        if (!id || !userUid.value) return
        if (gameIds.value.includes(id)) return
        gameIds.value = [...gameIds.value, id]
        persist()
    }

    /** @param {string|number} rawId */
    function remove(rawId) {
        const id = normalizeGameId(rawId)
        if (!id || !userUid.value) return
        gameIds.value = gameIds.value.filter((x) => x !== id)
        persist()
    }

    /**
     * @param {string|number} rawId
     * @param {string} [titleHint]
     */
    function toggle(rawId, titleHint = '') {
        const id = normalizeGameId(rawId)
        if (!id || !userUid.value) return
        const short = clipToastTitle(titleHint)
        if (gameIds.value.includes(id)) {
            remove(id)
            queueLibraryToast(`Released "${short}" from your shelf.`)
        } else {
            add(id)
            queueLibraryToast(`Snuggled "${short}" into My Library.`)
        }
    }

    return {
        userUid,
        gameIds,
        libraryToasts,
        initAuthSync,
        has,
        add,
        remove,
        toggle,
    }
})
