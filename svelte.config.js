import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
// import adapter from '@sveltejs/adapter-static'
import adapter from '@sveltejs/adapter-vercel'
import { isoImport } from 'vite-plugin-iso-import'
import preprocess from 'svelte-preprocess'
import imagePreprocessor from 'svimg'
import path from 'path'

// const { imagetools } = pack

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
        preprocess(),
    ],
    kit: {
        prerender: {
            crawl: true,
            default: true,
            enabled: true,
        },
        adapter: adapter({
            // pages: 'build',
            // assets: 'build',
            // fallback: null,
        }),
        vite: {
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
            plugins: [isoImport()],
        },
    },
}

export default config
