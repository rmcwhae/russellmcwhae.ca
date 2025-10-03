// Import only the browser-safe implementation to avoid Node stream/util
import readingTime from 'reading-time/lib/reading-time'
import type { SvelteComponent } from 'svelte'

interface PostMetadata {
    slug: string
    title: string
    date: string
    draft?: boolean
    category?: string
    description?: string
}

interface PostModule {
    metadata: PostMetadata
    default: SvelteComponent
}

interface Post extends PostMetadata {
    href: string
    readingTime: ReturnType<typeof readingTime>
    component: SvelteComponent
}

// Eagerly import compiled markdown modules and their raw source text
const postModules = import.meta.glob('/content/journal/*.md', {
    eager: true,
}) as Record<string, PostModule>
const postSources = import.meta.glob('/content/journal/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>

export const posts: Post[] = Object.entries(postModules)
    .map(([path, postModule]) => {
        const rawSource = postSources[path] || ''
        const computedReadingTime = readingTime(rawSource)

        // Generate slug from filename if not present in metadata
        const slug =
            postModule.metadata.slug ||
            path.split('/').pop()?.replace('.md', '') ||
            ''

        return {
            // frontmatter data
            ...postModule.metadata,
            slug,
            href: '/journal/' + slug,
            // include computed reading stats
            readingTime: computedReadingTime,
            // the processed Svelte component from the markdown file
            component: postModule.default,
        }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
