import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
    resolve: {
        // svimg only exports Image.svelte under the "svelte" condition
        conditions: ['svelte', 'import', 'module', 'browser', 'default'],
    },
    ssr: {
        noExternal: [],
    },
    server: {
        allowedHosts: ['m2.local'],
        fs: {
            allow: ['..'],
        },
    },
    // Prefer SvelteKit's kit.alias in svelte.config.js rather than Vite alias.
    plugins: [sveltekit()],
}

export default config
