import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function get() {
    const events = await ImageKitNodeServices.listFiles({
        path: '/events/',
        type: 'folder',
    })

    // TODO get featured image too…

    return {
        body: JSON.stringify({ events }),
    }
}
