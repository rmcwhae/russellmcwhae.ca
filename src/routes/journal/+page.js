import { posts } from '$lib/services/posts'

export const prerender = true

export async function load() {
    return {
        latestPost: posts[0],
        posts: posts.slice(1, posts.length),
    }
}
