import { posts } from '$lib/services/posts'

export async function load() {
    return {
        posts,
    }
}
