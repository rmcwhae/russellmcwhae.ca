import * as ImageKitServices from '$lib/services/imagekit'

export async function get() {
    const images = await ImageKitServices.getFiles({
        path: '/portfolio/',
        sort: 'DESC_NAME',
    })

    return {
        body: JSON.stringify({
            images,
        }),
    }
}
