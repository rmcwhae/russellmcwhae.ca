export async function load({ fetch }) {
    try {
        const events = await fetch('/events.json').then((r) => r.json())
        return {
            events,
        }
    } catch (error) {
        console.error(error)
    }
}
