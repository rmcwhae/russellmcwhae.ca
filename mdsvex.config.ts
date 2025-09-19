import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { frontMatterSlug } from './src/lib/utils/markdown.ts'
import * as path from 'path'

const layoutRoot = path.resolve('src/lib/components/layout')

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    layout: {
        page: path.join(layoutRoot, 'Page.svelte'),
        micro: path.join(layoutRoot, 'Micro.svelte'),
    },

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [remarkGfm, frontMatterSlug],
    rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [
            rehypeExternalLinks,
            { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
    ],
}

export default config
