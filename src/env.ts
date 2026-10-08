import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
    PUBLIC_IMAGEKIT_URL_ENDPOINT: {
        public: true,
        schema: (input) => input ?? '',
    },
    IMAGEKIT_PRIVATE_KEY: { static: true },
})
