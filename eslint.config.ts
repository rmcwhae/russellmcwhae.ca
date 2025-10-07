import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import tseslint from 'typescript-eslint'

export default [
    {
        ignores: [
            '.svelte-kit/**',
            'build/**',
            'node_modules/**',
            '.vercel/**',
            'static/_app/**',
            'playwright-report/**',
            'test-results/**',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...svelte.configs['flat/recommended'],
    {
        // Global language options (apply to JS and Svelte)
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: {
                // Browser globals to avoid no-undef in client code
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                location: 'readonly',
                fetch: 'readonly',
                AbortController: 'readonly',
                Request: 'readonly',
                Response: 'readonly',
                Headers: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                Blob: 'readonly',
                IntersectionObserver: 'readonly',
                ResizeObserver: 'readonly',
                // Node/browser common
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
            },
        },
        rules: {
            // Loosen some Svelte rules where project intentionally uses them
            'svelte/no-at-html-tags': 'warn',
            'svelte/require-each-key': 'warn',
            'svelte/no-unused-svelte-ignore': 'warn',
            'svelte/no-navigation-without-resolve': 'warn',
            // Prefer warnings for unused variables to avoid blocking builds
            'no-unused-vars': 'warn',
        },
    },
]
