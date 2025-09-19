import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
// Removed deprecated vite-plugin-iso-import; use SvelteKit's client guards instead

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
