import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
    // Inlined at build so prerendered pages don’t need /_app/env.js, which
    // `vite preview` would fill from its own environment
    PUBLIC_IMAGEKIT_URL_ENDPOINT: {
        public: true,
        static: true,
        schema: (input) => input ?? '',
    },
    IMAGEKIT_PRIVATE_KEY: { static: true },
})
