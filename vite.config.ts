import adapter from '@sveltejs/adapter-vercel'
import type { Config } from '@sveltejs/kit'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import { imagePreprocessor } from 'svimg'
import mdsvexConfig from './mdsvex.config.ts'
import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
    ssr: {
        noExternal: [],
    },
    server: {
        fs: {
            allow: ['..'],
        },
    },
    plugins: [
        sveltekit({
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
            adapter: adapter(),
        }),
    ],
}

export default config
