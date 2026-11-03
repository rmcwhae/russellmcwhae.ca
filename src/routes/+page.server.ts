import { getPosts } from '#lib/services/posts.server.js'
import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'
import type { PageServerLoad } from './$types'

export const prerender = true

export const load: PageServerLoad = async () => {
    const homepageImages = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return {
        latestPosts: getPosts().slice(0, 4),
        images: homepageImages.map(ImageKitNodeServices.toPhoto),
    }
}
