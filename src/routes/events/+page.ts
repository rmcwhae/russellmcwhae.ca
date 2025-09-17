import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch }) => {
    try {
        const events = await fetch('/api/events').then((r) => r.json())
        return {
            events,
        }
    } catch (error) {
        console.error(error)
    }
}
