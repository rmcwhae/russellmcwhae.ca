import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ fetch, data }) => {
    const { images } = await fetch('/api/photography').then((r) => r.json())

    return {
        ...data,
        portfolioCount: images?.length ?? 0,
        portfolioImage: images?.[0] ?? null,
    }
}
