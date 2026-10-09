import { browser } from '$app/env'
import { writable } from 'svelte/store'
import * as LocalStorage from '#lib/services/localStorage.js'

export type ThemeMode = 'light' | 'dark' | 'system'

const storageKey = 'user-theme'
const storage = LocalStorage.create(storageKey)

function parseStoredMode(raw: string | null): unknown {
    if (!raw) return null

    try {
        return JSON.parse(raw)
    } catch {
        return null
    }
}

function normalizeMode(value: unknown): ThemeMode {
    if (value === 'light' || value === 'dark' || value === 'system') {
        return value
    }

    return 'system'
}

const store = writable<ThemeMode>(normalizeMode(storage.get()))

if (browser) {
    window.addEventListener('storage', (event) => {
        if (event.key !== storageKey) return

        store.set(normalizeMode(parseStoredMode(event.newValue)))
    })
}

export const mode = {
    ...store,
    set(nextMode: ThemeMode) {
        store.set(nextMode)
        storage.set(nextMode)
    },
}
