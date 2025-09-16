import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { imagePreprocessor } from 'svimg'

/** @type {import('@sveltejs/kit').Config} */

const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        mdsvex(mdsvexConfig),
        imagePreprocessor({
            inputDir: 'static',
            outputDir: 'static/g',
            webp: true,
            avif: true,
        }),
        preprocess({
            scss: {
                includePaths: ['src', 'src/lib/scss']
            }
        }),
    ],
    kit: {
        adapter: adapter(),
        alias: {
            $root: '.',
        },
    },
}

export default config
