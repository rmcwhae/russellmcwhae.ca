import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.ts'
import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { imagePreprocessor } from 'svimg'
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
        preprocess({
            scss: {
                includePaths: ['src', 'src/lib/scss'],
            },
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
