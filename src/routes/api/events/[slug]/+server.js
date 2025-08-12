import { json, error } from '@sveltejs/kit'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

export async function GET({ params }) {
    try {
        // Validate slug parameter
        if (!params.slug || typeof params.slug !== 'string') {
            throw error(400, 'Invalid slug parameter')
        }

        const images = await ImageKitNodeServices.listFiles({
            path: '/events/' + params.slug,
            sort: 'ASC_NAME',
        })

        // Ensure images is an array
        if (!Array.isArray(images)) {
            console.error('Non-array response from ImageKit:', images)
            throw error(500, 'Invalid response from image service')
        }

        const { title, date } = parseTitleAndDate(params.slug)

        if (images.length > 0) {
            return json({
                count: images.length,
                title,
                date,
                images,
            })
        } else {
            throw error(404, 'No images found for this event')
        }
    } catch (err) {
        // If it's already a SvelteKit error, re-throw it
        if (err.status) {
            throw err
        }

        console.error('Error in event API:', err)
        throw error(500, 'Internal server error')
    }
}
