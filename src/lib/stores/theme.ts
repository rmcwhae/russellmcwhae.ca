import { writable } from 'svelte/store'
import * as LocalStorage from '$lib/services/localStorage'

export type ThemeMode = 'light' | 'dark' | 'system'

const storage = LocalStorage.create('user-theme')

function normalizeMode(value: unknown): ThemeMode {
    if (value === 'light' || value === 'dark' || value === 'system') {
        return value
    }

    return 'system'
}

const store = writable<ThemeMode>(normalizeMode(storage.get()))

export const mode = {
    ...store,
    set(nextMode: ThemeMode) {
        store.set(nextMode)
        storage.set(nextMode)
    },
}
