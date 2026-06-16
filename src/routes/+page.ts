import { getPosts } from '$lib/services/posts'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch }) => {
    const images = await fetch(`/api/home`).then((r) => r.json())
    const posts = await getPosts()
    const featuredPost = posts[0]
    const recentPosts = posts.slice(1, 4)

    return {
        images,
        featuredPost,
        recentPosts,
    }
}
