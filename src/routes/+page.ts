import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch, data }) => {
    const images = await fetch(`/api/home`).then((r) => r.json())

    return {
        ...data,
        images,
    }
}
