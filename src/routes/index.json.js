import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function get() {
    const homepageImages = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return {
        body: JSON.stringify(homepageImages),
    }
}
