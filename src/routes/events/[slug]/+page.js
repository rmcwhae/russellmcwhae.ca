export async function load({ params, fetch }) {
    const { slug } = params
    const event = await fetch(`/events/${slug}.json`).then((r) => r.json())

    return { event }
}
