import { posts } from '$lib/services/posts'

export const prerender = true

export async function load() {
    const totalWordCount = posts.reduce((acc, post) => {
        return acc + post.readingTime.words
    }, 0)

    return {
        latestPost: posts[0],
        posts: posts.slice(1, posts.length),
        totalWordCount,
    }
}
