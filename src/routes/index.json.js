import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function get() {
    const images = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        searchQuery: 'tags IN ["homepage"]',
    })

    return {
        body: JSON.stringify(images),
    }
}
