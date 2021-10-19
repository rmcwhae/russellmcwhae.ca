import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { IMAGES_PER_PAGE } from '$lib/constants'
import * as ArrayUtils from '$lib/utils/array'

export async function get({ query }) {
    const page = +query.get('page') || 1

    const images = await ImageKitNodeServices.listFiles({
        path: '/portfolio/',
        sort: 'DESC_NAME',
    }) // FIXME: could add server-side pagination with LIMIT and SKIP (but still need total count…)

    return {
        body: {
            images: ArrayUtils.paginate(images, IMAGES_PER_PAGE, page),
            pages: Math.ceil(images.length / IMAGES_PER_PAGE),
        },
    }
}
// TODO make me less WET with events/[slug]…
