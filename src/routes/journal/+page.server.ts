import { getPosts } from '#lib/services/posts.server.js'
import type { PageServerLoad } from './$types'

export const prerender = true

export const load: PageServerLoad = () => {
    const posts = getPosts()

    // Calculate total word count from reading times
    const totalWordCount = posts.reduce((acc, post) => {
        return acc + post.readingTime.words
    }, 0)

    return {
        posts,
        totalWordCount,
    }
}
