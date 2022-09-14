import { json, error } from '@sveltejs/kit'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

export async function GET({ params }) {
    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + params.slug,
        sort: 'ASC_NAME',
    })

    const { title, date } = parseTitleAndDate(params.slug)

    if (images.length > 0) {
        return json({
            count: images.length,
            title,
            date,
            images,
        })
    } else {
        throw error(404, 'Not found')
    }
}
