import { json } from '@sveltejs/kit'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function GET() {
    const homepageImages = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return json(homepageImages)
}
