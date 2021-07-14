import adapter from '@sveltejs/adapter-static'
import pack from 'vite-imagetools'
import preprocess from 'svelte-preprocess'

const { imagetools } = pack

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: preprocess(),
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
