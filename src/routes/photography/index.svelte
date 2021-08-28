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
<p class="big">This is a showcase of my favourite photos.</p>
<p>
    Also see <a href="/events">Events</a>.
</p>

<Gallery {images} />

<style>
    .big {
        font-size: 1.2em;
    }
</style>
