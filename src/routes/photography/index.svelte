<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    import Gallery from '$lib/components/Gallery.svelte'
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

    const items = [{ text: 'Portfolio' }]

    export let images
</script>

<h1>Portfolio</h1>

<Breadcrumbs {items} />

<p>
    These are my favourite photos. Also see <a href="/events">Events</a>.
</p>

<Gallery {images} />
