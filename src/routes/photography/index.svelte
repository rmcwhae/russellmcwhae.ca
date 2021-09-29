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
    import Button from '$lib/components/Button.svelte'
    import SEO from '$lib/components/SEO.svelte'

    export let images
</script>

<div class="flex items-center justify-between">
    <h1>Portfolio</h1>
    <!-- <p>This is a showcase of my favourite photos.</p> -->
    <p class="nowrap">
        <Button right href="/events" text="All events" />
    </p>
</div>

<SEO title="Photography" />

<Gallery {images} />
