import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { imagePreprocessor } from 'svimg'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */

const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        mdsvex(mdsvexConfig),
        vitePreprocess(),
        imagePreprocessor({
            inputDir: 'static',
            outputDir: 'static/g',
            webp: true,
            avif: true,
        }),
        preprocess(),
    ],
    kit: {
        adapter: adapter(),
        alias: {
            $root: '.',
        },
    },
}

export default config
