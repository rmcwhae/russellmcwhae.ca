import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function get() {
    const images = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        sort: 'DESC_NAME',
    })

    return {
        body: {
            images,
        },
    }
}
