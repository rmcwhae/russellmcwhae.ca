import { writable } from 'svelte/store'
import * as LocalStorage from '$lib/services/localStorage'

const storage = LocalStorage.create('user-theme')

const store = writable(storage.get() || '')

export const mode = {
    ...store,
    set(mode: string) {
        store.set(mode)
        storage.set(mode)
    },
}
