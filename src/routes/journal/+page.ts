import { getPosts } from '$lib/services/posts'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async () => {
    const posts = await getPosts()
    
    // Calculate total word count from reading times
    const totalWordCount = posts.reduce((acc, post) => {
        return acc + post.readingTime.words
    }, 0)

    return {
        latestPost: posts[0],
        posts: posts.slice(1, posts.length),
        totalWordCount,
    }
}
