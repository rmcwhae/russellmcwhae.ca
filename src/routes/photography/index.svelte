<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    import Gallery from 'svelte-gallery'
    export let images
</script>

<h1>Portfolio</h1>

<p>
    These are my favourite photos. Also see <a href="/photos">Events</a>.
</p>

<Gallery {images} rowHeight="400" />
