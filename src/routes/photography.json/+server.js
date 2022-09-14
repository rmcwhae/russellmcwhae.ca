import * as ImageKitNodeServices from '$lib/services/imageKitNode'

export async function GET() {
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
