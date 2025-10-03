import adapter from '@sveltejs/adapter-vercel'
import type { Config } from '@sveltejs/kit'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import { imagePreprocessor } from 'svimg'
import mdsvexConfig from './mdsvex.config.ts'

const config: Config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        mdsvex(mdsvexConfig as unknown as Parameters<typeof mdsvex>[0]),
        imagePreprocessor({
            inputDir: 'static',
            outputDir: 'static/g',
            webp: true,
            avif: true,
        }),
        vitePreprocess(),
    ] as Config['preprocess'],
    kit: {
        adapter: adapter(),
        alias: {
            $root: '.',
        },
    },
}

export default config
