import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'
import type { PageServerLoad } from './$types'

export const prerender = true

export const load: PageServerLoad = async () => {
    const images = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        sort: 'DESC_NAME',
    })

    return {
        images: images.map(ImageKitNodeServices.toPhoto),
    }
}
