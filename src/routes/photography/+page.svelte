<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props();

    let images = $derived(data.images)
</script>

<div class="flex items-center justify-between mb-s0">
    <h1>Portfolio</h1>
    <Button right href="/events" text="All events" />
</div>

<SEO title="Photography" />

<Gallery {images} />
