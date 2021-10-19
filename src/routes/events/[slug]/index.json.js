import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { IMAGES_PER_PAGE } from '$lib/constants'
import * as ArrayUtils from '$lib/utils/array'
import { parseTitleAndDate } from '../index.json'

export async function get({ query, params }) {
    const page = +query.get('page') || 1

    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + params.slug,
        sort: 'ASC_NAME',
    })

    const { title, date } = parseTitleAndDate(params.slug)

    if (images) {
        return {
            body: {
                event: {
                    count: images.length,
                    title,
                    date,
                    images: ArrayUtils.paginate(images, IMAGES_PER_PAGE, page),
                },
                pages: Math.ceil(images.length / IMAGES_PER_PAGE),
            },
        }
    } else {
        return {
            status: 404,
        }
    }
}
