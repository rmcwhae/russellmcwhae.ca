export const prerender = true

export async function load({ fetch }) {
    const { images } = await fetch('/api/photography').then((r) => r.json())

    return {
        images,
    }
}
