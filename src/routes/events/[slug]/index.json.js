import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '../index.json'

export async function get({ params }) {
    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + params.slug,
        sort: 'ASC_NAME',
    })

    const { title, date } = parseTitleAndDate(params.slug)

    if (images) {
        return {
            body: JSON.stringify({
                count: images.length,
                title,
                date,
                images,
            }),
        }
    } else {
        return {
            status: 404,
        }
    }
}
