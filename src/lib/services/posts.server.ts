// Server-only: reads every post’s raw source, which must never reach the
// browser. Loads return plain summaries that serialize into page data.
import readingTime from 'reading-time/lib/reading-time'
import { extractPreview } from '#lib/utils/string/index.js'

interface PostMetadata {
    slug?: string
    title: string
    date: string
    draft?: boolean
    category?: string
    description?: string
}

export interface Post extends PostMetadata {
    slug: string
    href: string
    preview: string
    readingTime: ReturnType<typeof readingTime>
}

const postMetadata = import.meta.glob('/content/journal/*.md', {
    import: 'metadata',
    eager: true,
}) as Record<string, PostMetadata>

const postSources = import.meta.glob('/content/journal/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>

const posts: Post[] = Object.entries(postMetadata)
    .map(([path, metadata]) => {
        const slug =
            metadata.slug || (path.split('/').pop()?.replace('.md', '') ?? '')
        const rawSource = postSources[path] ?? ''

        return {
            ...metadata,
            slug,
            href: '/journal/' + slug,
            preview: extractPreview(rawSource, 2),
            readingTime: readingTime(rawSource),
        }
    })
    .filter((post) => !post.draft)
    // Front matter dates may parse as Date or string; compare as timestamps
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPosts(): Post[] {
    return posts
}
