import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
    const { slug } = params

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
        throw error(400, 'Invalid event slug')
    }

    try {
        const response = await fetch(`/api/events/${slug}`)

        if (!response.ok) {
            if (response.status === 404) {
                throw error(404, 'Event not found')
            }
            throw error(response.status, 'Failed to load event')
        }

        const event = await response.json()

        // Validate event data structure
        if (!event || !Array.isArray(event.images)) {
            console.error('Invalid event data structure:', event)
            throw error(500, 'Invalid event data')
        }

        return { event }
    } catch (err) {
        // If it's already a SvelteKit error, re-throw it
        if (err.status) {
            throw err
        }

        console.error('Error loading event:', err)
        throw error(500, 'Failed to load event')
    }
}
