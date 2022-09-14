export async function load({ fetch }) {
    try {
        const events = await fetch('/api/events').then((r) => r.json())
        return {
            events,
        }
    } catch (error) {
        console.error(error)
    }
}
