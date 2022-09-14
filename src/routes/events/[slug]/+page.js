export async function load({ params, fetch }) {
    const { slug } = params
    const event = await fetch(`/api/events/${slug}`).then((r) => r.json())

    return { event }
}
