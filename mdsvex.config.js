import path from 'path'
import toc from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'
import remarkfootnotes from 'remark-footnotes' // TODO get me working
import readingTime from 'remark-reading-time'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    layout: './src/lib/components/Post.svelte',

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [
        // adds a `readingTime` frontmatter attribute
        readingTime(),
        remarkfootnotes,
        slug,
    ],
    rehypePlugins: [rehypeSlug, toc],
}

export default config

function slug() {
    return (_, file) => {
        const parsed = path.parse(file.filename)
        const slug = parsed.base.replace('.md', '')

        file.data.fm = {
            ...file.data.fm,
            slug,
            // remove timezone from parsed date
            // date: file.data.fm.date ? new Date(file.data.fm.date).toLocaleDateString() : undefined
        }
    }
}
