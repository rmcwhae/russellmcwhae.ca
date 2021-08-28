import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function get({ params }) {
    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + params.slug,
        sort: 'ASC_NAME',
    })

    if (images) {
        return {
            body: JSON.stringify({
                slug: params.slug,
                images,
                count: images.length,
            }),
        }
    } else {
        return {
            status: 404,
        }
    }
}
