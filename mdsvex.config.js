import path from 'path'
import remarkfootnotes from 'remark-footnotes'
import readingTime from 'remark-reading-time'
import autolink from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [remarkToc, readingTime(), remarkfootnotes, slug],
    rehypePlugins: [
        [
            autolink,
            {
                behavior: 'wrap',
            },
        ],
    ],
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
