import remarkfootnotes from 'remark-footnotes'
import readingTime from 'remark-reading-time'
import remarkSlug from 'remark-slug'
import rehypeExternalLinks from 'rehype-external-links'
import { slug, buildToc } from './src/lib/utils/markdown.js'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    layout: {
        page: './src/lib/components/layout/Page.svelte',
    },

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [remarkSlug, readingTime(), remarkfootnotes, slug, buildToc],
    rehypePlugins: [rehypeExternalLinks],
}

export default config
