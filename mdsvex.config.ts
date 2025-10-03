import * as path from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { frontMatterSlug } from './src/lib/markdown/front-matter.ts'
import rehypeFootnotes from './src/lib/markdown/rehype-footnotes.ts'
import remarkFootnotes from './src/lib/markdown/remark-footnotes.ts'

const layoutRoot = path.resolve('src/lib/components/layout')

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    layout: {
        page: path.join(layoutRoot, 'Page.svelte'),
        micro: path.join(layoutRoot, 'Micro.svelte'),
    },

    remarkPlugins: [remarkGfm, frontMatterSlug, remarkFootnotes],
    rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [
            rehypeExternalLinks,
            { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
        rehypeFootnotes,
    ],
}

export default config
