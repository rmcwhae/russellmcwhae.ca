import { getPosts } from '$lib/services/posts'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async () => {
    const posts = await getPosts()
    
    // Load reading times for all posts to calculate total word count
    const readingTimes = await Promise.all(
        posts.map(post => post.loadReadingTime())
    )
    
    const totalWordCount = readingTimes.reduce((acc, readingTime) => {
        return acc + readingTime.words
    }, 0)

    return {
        latestPost: posts[0],
        posts: posts.slice(1, posts.length),
        totalWordCount,
    }
}
