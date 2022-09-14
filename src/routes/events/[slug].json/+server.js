import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '../index.json'

export async function GET({ params }) {
    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + params.slug,
        sort: 'ASC_NAME',
    })

    const { title, date } = parseTitleAndDate(params.slug)

    if (images) {
        return {
            body: {
                count: images.length,
                title,
                date,
                images,
            },
        }
    } else {
        return {
            status: 404,
        }
    }
}
