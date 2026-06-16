import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch, data }) => {
    const { images } = await fetch('/api/photography').then((r) => r.json())

    return {
        images: images?.slice(0, 10),
        events: data.events,
    }
}
