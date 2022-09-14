import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
    const { slug } = params
    let event

    try {
        event = await fetch(`/api/events/${slug}`).then((r) => r.json())

        return { event }
    } catch (e) {
        throw error(404, 'Not found')
    }
}
