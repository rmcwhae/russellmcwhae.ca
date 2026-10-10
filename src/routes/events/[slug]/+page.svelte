<script>
    import Gallery from '#lib/components/images/Gallery.svelte'
    import SEO from '#lib/components/base/SEO.svelte'

    let { data } = $props()

    let images = $derived(data.event.images)
    let count = $derived(data.event.count)
    let date = $derived(data.event.date)
    let title = $derived(data.event.title)
</script>

<SEO {title} />

<div class="page-header">
    <p class="eyebrow">
        <a href="/events">Field Expeditions</a>
    </p>
    <h1>{title}</h1>
    <p class="meta">{date} · {count} photos</p>
</div>

<Gallery {images} />

<style>
    .meta {
        margin: 0;
        color: var(--medium-grey);
        font-family: var(--font-sans);
        font-size: var(--text-sm);
    }
</style>
