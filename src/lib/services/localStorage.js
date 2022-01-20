export function create(key) {
    return {
        get() {
            if (localStorageEnabled) {
                return localStorage.getItem(key)
            }
        },
        set(value) {
            if (localStorageEnabled) {
                localStorage.setItem(key, value)
            }
        },
    }
}

const localStorageEnabled = typeof localStorage !== 'undefined' && localStorage
