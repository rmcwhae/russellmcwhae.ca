export function create(key) {
    try {
        // Trying a test key
        const testKey = '99999'
        localStorage.setItem(testKey, testKey)
        localStorage.removeItem(testKey)

        return {
            get(defaultValue) {
                const value = localStorage.getItem(key)

                try {
                    return value ? JSON.parse(value) : defaultValue
                } catch {
                    return value || defaultValue
                }
            },
            set(value) {
                localStorage.setItem(key, JSON.stringify(value))
            },
        }
    } catch {
        return {
            get: identity,
            set: noop,
        }
    }
}

function identity(arg) {
    return arg
}

function noop() {}
