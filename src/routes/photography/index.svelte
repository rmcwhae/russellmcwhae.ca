<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let images
</script>

<div class="flex items-center justify-between">
    <h1>Portfolio</h1>
    <Button right href="/events" text="All events" />
</div>

<SEO title="Photography" />

<Gallery {images} />

<style>
    div {
        margin-bottom: var(--s1);
    }
</style>
