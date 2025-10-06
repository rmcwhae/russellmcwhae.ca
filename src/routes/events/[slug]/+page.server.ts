import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import * as ImageKitNodeServices from '$lib/services/imageKitNode'
import { parseTitleAndDate } from '$lib/utils/string'

export const prerender = true

export async function entries() {
    try {
        const events = await ImageKitNodeServices.listFiles({
            path: '/events/',
            type: 'folder',
        })

        if (!Array.isArray(events)) {
            console.error(
                'Non-array response from ImageKit for events:',
                events
            )
            return []
        }

        return events
            .filter((event) => event && event.name)
            .map((event) => ({
                slug: event.name,
            }))
    } catch (error) {
        console.error('Error generating event entries:', error)
        return []
    }
}

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
        throw error(400, 'Invalid event slug')
    }

    try {
        const images = await ImageKitNodeServices.listFiles({
            path: '/events/' + slug,
            sort: 'ASC_NAME',
        })

        // Ensure images is an array
        if (!Array.isArray(images)) {
            console.error('Non-array response from ImageKit:', images)
            throw error(500, 'Invalid response from image service')
        }

        const { title, date } = parseTitleAndDate(slug)

        if (images.length > 0) {
            return {
                event: {
                    count: images.length,
                    title,
                    date,
                    images,
                },
            }
        } else {
            throw error(404, 'No images found for this event')
        }
    } catch (err: unknown) {
        // If it's already a SvelteKit error, re-throw it
        if (err.status) {
            throw err
        }

        console.error('Error loading event:', err)
        throw error(500, 'Failed to load event')
    }
}
