import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
    ssr: {
        noExternal: [],
    },
    server: {
        fs: {
            allow: ['..'],
        },
    },
    // Prefer SvelteKit's kit.alias in svelte.config.js rather than Vite alias.
    plugins: [sveltekit()],
}

export default config
