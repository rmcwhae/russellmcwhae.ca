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
    loadComponent: () => Promise<SvelteComponent>
    loadReadingTime: () => Promise<ReturnType<typeof readingTime>>
}

// Lazy import compiled markdown modules and their raw source text
const postModules = import.meta.glob('/content/journal/*.md') as Record<
    string,
    () => Promise<PostModule>
>
const postSources = import.meta.glob('/content/journal/*.md', {
    query: '?raw',
    import: 'default',
}) as Record<string, () => Promise<string>>

// Load metadata lazily as well to avoid the eager/lazy conflict
const postMetadataModules = import.meta.glob('/content/journal/*.md', {
    import: 'metadata',
}) as Record<string, () => Promise<PostMetadata>>

// Create posts with lazy loading for everything
const postEntries = Object.entries(postModules).map(
    ([path, postModuleLoader]) => {
        const sourceLoader = postSources[path]
        const metadataLoader = postMetadataModules[path]

        // Generate slug from filename (we'll get the actual slug from metadata later)
        const filenameSlug = path.split('/').pop()?.replace('.md', '') || ''

        return {
            // Basic properties available immediately
            slug: filenameSlug,
            href: '/journal/' + filenameSlug,

            // Load metadata lazily
            loadMetadata: async () => {
                const metadata = await metadataLoader()
                return {
                    ...metadata,
                    slug: metadata?.slug || filenameSlug,
                    href: '/journal/' + (metadata?.slug || filenameSlug),
                }
            },

            // Load component lazily
            loadComponent: async () => {
                const postModule = await postModuleLoader()
                return postModule.default
            },

            // Load reading time lazily
            loadReadingTime: async () => {
                if (!sourceLoader) return readingTime('')
                const rawSource = await sourceLoader()
                return readingTime(rawSource)
            },
        }
    }
)

// Create a function to get posts with metadata loaded
export async function getPosts(): Promise<Post[]> {
    const postsWithMetadata = await Promise.all(
        postEntries.map(async (post) => {
            const metadata = await post.loadMetadata()
            const readingTime = await post.loadReadingTime()
            return {
                ...metadata,
                readingTime,
                loadComponent: post.loadComponent,
                loadReadingTime: post.loadReadingTime,
            }
        })
    )

    return postsWithMetadata
        .filter((post) => !post.draft)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// For backward compatibility, we'll need to load posts on first access
const _postsCache: Post[] | null = null
export const posts: Post[] = new Proxy([], {
    get(target, prop) {
        if (_postsCache === null) {
            // This is a synchronous access, so we can't load async data here
            // We'll need to update the consuming code to use getPosts() instead
            throw new Error('Posts not loaded. Use getPosts() instead.')
        }
        return _postsCache[prop as keyof Post[]]
    },
})
