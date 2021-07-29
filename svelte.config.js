import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
import pack from 'vite-imagetools'
import preprocess from 'svelte-preprocess'

const { imagetools } = pack

/** @type {import('@sveltejs/kit').Config} */

const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [mdsvex(mdsvexConfig), [preprocess()]],
    kit: {
        target: 'body',
        amp: false,
        prerender: {
            crawl: true,
            enabled: true,
            force: false,
        },
        adapter: adapter(),
        vite: {
            plugins: [imagetools()],
        },
    },
}

export default config
