import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export const GET: RequestHandler = async () => {
    const homepageImages = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return json(homepageImages)
}
