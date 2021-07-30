import path from 'path'
import find from 'unist-util-find'
import toc from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'
import remarkfootnotes from 'remark-footnotes'
import readingTime from 'remark-reading-time'
import autolink from 'rehype-autolink-headings'

const config = {
    extensions: ['.svelte.md', '.md', '.svx'],

    smartypants: {
        dashes: 'oldschool',
    },

    remarkPlugins: [
        // adds a `readingTime` frontmatter attribute
        readingTime(),
        remarkfootnotes,
        slug,
    ],
    rehypePlugins: [
        rehypeSlug,
        [
            toc,
            {
                customizeTOC,
            },
        ],
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
            // remove timezone from parsed date
            // date: file.data.fm.date
            //     ? new Date(file.data.fm.date).toLocaleDateString()
            //     : undefined,
        }
    }
}

function customizeTOC(toc) {
    const isEmpty = !find(toc, (node) => node.type === 'text' && !!node.value)
    if (isEmpty) {
        return false
    }

    const heading = {
        type: 'element',
        tagName: 'h2',
        children: [{ type: 'text', value: 'Table of Contents' }],
        properties: {
            className: 'app-toc__heading',
        },
    }

    return {
        type: 'element',
        tagName: 'div',
        properties: { className: 'toc-container' },
        children: [heading, toc],
    }
}
