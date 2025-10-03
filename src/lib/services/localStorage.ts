interface Storage {
    get<T>(defaultValue?: T): T
    set<T>(value: T): void
}

export function create(key: string): Storage {
    try {
        // Trying a test key
        const testKey = '99999'
        localStorage.setItem(testKey, testKey)
        localStorage.removeItem(testKey)

        return {
            get<T>(defaultValue?: T): T {
                const value = localStorage.getItem(key)

                try {
                    return value ? JSON.parse(value) : defaultValue!
                } catch {
                    return (value || defaultValue) as T
                }
            },
            set<T>(value: T): void {
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

function identity<T>(arg: T): T {
    return arg
}

function noop(): void {}
