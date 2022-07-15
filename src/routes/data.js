import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function GET() {
    const homepageImages = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return {
        body: homepageImages,
    }
}
