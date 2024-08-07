import { posts } from '$lib/services/posts'

export const prerender = true

export async function load({ fetch }) {
    const images = await fetch(`/api/home`).then((r) => r.json())
    const latestPosts = posts.slice(0, 4)

    return {
        images,
        latestPosts,
    }
}
