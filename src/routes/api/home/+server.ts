import type { RequestHandler } from './$types'
import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'

export const GET: RequestHandler = async () => {
    const homepageImages = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return Response.json(homepageImages)
}
