import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
// import adapter from '@sveltejs/adapter-netlify'
import pack from 'vite-imagetools'
import preprocess from 'svelte-preprocess'
// import imagePreprocessor from 'svimg'
import path from 'path'

const { imagetools } = pack

/** @type {import('@sveltejs/kit').Config} */

const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        mdsvex(mdsvexConfig),
        // imagePreprocessor({
        //     inputDir: 'static',
        //     outputDir: 'static/g',
        //     webp: true,
        //     avif: true,
        // }),
        preprocess(),
    ],
    kit: {
        target: 'body',
        amp: false,
        prerender: {
            crawl: true,
            enabled: true,
        },
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
        }),
        vite: {
            ssr: {
                noExternal: [],
            },
            resolve: {
                alias: {
                    $static: path.resolve('static'),
                    $root: path.resolve('.'),
                },
            },
            plugins: [imagetools()],
        },
    },
}

export default config
