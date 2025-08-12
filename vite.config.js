import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
// Removed deprecated vite-plugin-iso-import; use SvelteKit's client guards instead

/** @type {import('vite').UserConfig} */
const config = {
    ssr: {
        noExternal: [],
    },
    server: {
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['..'],
        },
    },
    resolve: {
        alias: {
            $static: path.resolve('static'),
            $root: path.resolve('.'),
        },
    },
    define: {
        'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(
            process.env.VERCEL_ANALYTICS_ID
        ),
    },
    plugins: [sveltekit()],
}

export default config
