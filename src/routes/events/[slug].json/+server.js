import { json as json$1 } from '@sveltejs/kit'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

export async function GET({ params }) {
    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + params.slug,
        sort: 'ASC_NAME',
    })

    const { title, date } = parseTitleAndDate(params.slug)

    if (images) {
        return json$1({
            count: images.length,
            title,
            date,
            images,
        })
    } else {
        return new Response(undefined, { status: 404 })
    }
}
