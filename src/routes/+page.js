import { posts } from '$lib/services/posts'

export async function load({ fetch }) {
    const images = await fetch(`/data`).then((r) => r.json())
    const latestPosts = posts.slice(0, 4)

    return {
        images,
        latestPosts,
    }
}
