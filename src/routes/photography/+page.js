export async function load({ fetch }) {
    const { images } = await fetch('/photography.json').then((r) => r.json())

    return {
        images,
    }
}
