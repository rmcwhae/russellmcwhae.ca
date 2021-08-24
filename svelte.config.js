import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
import pack from 'vite-imagetools'
import preprocess from 'svelte-preprocess'
import svelteImage from 'svelte-image'
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
        // svelteImage({
        //     outputDir: '/g',

        //     trace: {
        //         background: '#fff',
        //         color: '#000',
        //         threshold: 120,
        //     },

        //     // should be ./static for Sapper and ./public for plain Svelte projects
        //     publicDir: './static/',
        //     processFolders: ['portfolio-images'],
        //     placeholder: 'trace', // or "blur",
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
            optimizeDeps: {
                include: ['blurhash'],
            },
            ssr: {
                noExternal: ['svimg'],
            },
            resolve: {
                alias: {
                    $static: path.resolve('static'),
                },
            },
            plugins: [imagetools()],
        },
    },
}

export default config
