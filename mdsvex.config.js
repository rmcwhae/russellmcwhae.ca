import path from 'path'
import remarkfootnotes from 'remark-footnotes'
import readingTime from 'remark-reading-time'
import remarkToc from 'remark-toc'
import remarkSlug from 'remark-slug'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    layout: {
        page: './src/lib/components/layout/Page.svelte',
    },

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [
        remarkToc,
        remarkSlug,
        readingTime(),
        remarkfootnotes,
        slug,
    ],
    rehypePlugins: [],
}

export default config

function slug() {
    return (_, file) => {
        const parsed = path.parse(file.filename)
        const slug = parsed.base.replace('.md', '')

        file.data.fm = {
            ...file.data.fm,
            slug,
        }
    }
}
