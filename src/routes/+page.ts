import { getPosts } from '$lib/services/posts'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch }) => {
    const images = await fetch(`/api/home`).then((r) => r.json())
    const posts = await getPosts()
    const latestPosts = posts.slice(0, 4)

    return {
        images,
        latestPosts,
    }
}
