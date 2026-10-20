import { getPosts } from '#lib/services/posts.server.js'
import type { PageServerLoad } from './$types'

export const prerender = true

export const load: PageServerLoad = () => {
    return {
        latestPosts: getPosts().slice(0, 4),
    }
}
