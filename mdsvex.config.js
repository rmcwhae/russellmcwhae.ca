import remarkGfm from 'remark-gfm'
import readingTime from 'remark-reading-time'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { frontMatterSlug } from './src/lib/utils/markdown.js'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    layout: {
        page: './src/lib/components/layout/Page.svelte',
        micro: './src/lib/components/layout/Micro.svelte',
    },

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [readingTime(), remarkGfm, frontMatterSlug],
    rehypePlugins: [
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'wrap',
            },
        ],
        rehypeExternalLinks,
    ],
}

export default config
