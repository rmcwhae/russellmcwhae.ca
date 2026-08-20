import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch }) => {
    const { images } = await fetch('/api/photography').then((r) => r.json())

    return {
        images,
    }
}
