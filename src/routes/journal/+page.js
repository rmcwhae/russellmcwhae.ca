import { posts } from '$lib/services/posts'

export const prerender = true

export async function load() {
    return {
        posts,
    }
}
