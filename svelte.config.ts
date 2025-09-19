import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.ts'
import adapter from '@sveltejs/adapter-vercel'
import { imagePreprocessor } from 'svimg'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import type { Config } from '@sveltejs/kit'

const config: Config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        mdsvex(mdsvexConfig),
        imagePreprocessor({
            inputDir: 'static',
            outputDir: 'static/g',
            webp: true,
            avif: true,
        }),
        vitePreprocess(),
    ],
    kit: {
        adapter: adapter(),
        alias: {
            $root: '.',
        },
    },
}

export default config
