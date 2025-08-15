// Import only the browser-safe implementation to avoid Node stream/util
import readingTime from 'reading-time/lib/reading-time.js'

// Eagerly import compiled markdown modules and their raw source text
const postModules = import.meta.glob('/content/journal/*.md', { eager: true })
const postSources = import.meta.glob('/content/journal/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
})

export const posts = Object.entries(postModules)
    .map(([path, postModule]) => {
        const rawSource = /** @type {string} */ (postSources[path] || '')
        const computedReadingTime = readingTime(rawSource)

        return {
            // frontmatter data
            ...postModule.metadata,
            href: '/journal/' + postModule.metadata.slug,
            // include computed reading stats
            readingTime: computedReadingTime,
            // the processed Svelte component from the markdown file
            component: postModule.default,
        }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
