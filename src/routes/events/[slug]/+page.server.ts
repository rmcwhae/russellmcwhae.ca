import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import * as ImageKitNodeServices from '#lib/services/imageKitNode.js'
import { parseTitleAndDate } from '#lib/utils/string/index.js'

export const prerender = true

export async function entries() {
    const events = await ImageKitNodeServices.listFiles({
        path: '/events/',
        type: 'folder',
    })

    return events
        .filter((event) => event.name)
        .map((event) => ({ slug: event.name }))
}

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params

    const images = await ImageKitNodeServices.listFiles({
        path: '/events/' + slug,
        type: 'file',
        sort: 'ASC_NAME',
    })

    if (images.length === 0) {
        throw error(404, 'No images found for this event')
    }

    const { title, date } = parseTitleAndDate(slug)

    return {
        event: {
            count: images.length,
            title,
            date,
            images: images.map(ImageKitNodeServices.toPhoto),
        },
    }
}
