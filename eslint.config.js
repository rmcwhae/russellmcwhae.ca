import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'

export default [
    {
        ignores: [
            '.svelte-kit/**',
            'build/**',
            'node_modules/**',
            '.vercel/**',
            'static/_app/**',
        ],
    },
    js.configs.recommended,
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
            // Prefer warnings for unused variables to avoid blocking builds
            'no-unused-vars': 'warn',
        },
    },
    {
        files: ['cypress/**/*.{js,ts}', 'cypress.config.{js,ts}'],
        languageOptions: {
            globals: {
                cy: 'readonly',
                Cypress: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                beforeEach: 'readonly',
                after: 'readonly',
                afterEach: 'readonly',
                expect: 'readonly',
            },
        },
    },
]
