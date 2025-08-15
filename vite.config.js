import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
// Removed deprecated vite-plugin-iso-import; use SvelteKit's client guards instead

/** @type {import('vite').UserConfig} */
const config = {
    ssr: {
        noExternal: [],
    },
    // Prefer SvelteKit's kit.alias in svelte.config.js rather than Vite alias.
    plugins: [sveltekit()],
}

export default config
