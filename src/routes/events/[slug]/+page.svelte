<script>
    import { resolve } from '$app/paths'
    import Gallery from '#lib/components/images/Gallery.svelte'
    import SEO from '#lib/components/base/SEO.svelte'

    let { data } = $props()

    let images = $derived(data.event.images)
    let count = $derived(data.event.count)
    let date = $derived(data.event.date)
    let title = $derived(data.event.title)
</script>

<SEO {title} />

<header class="page-header">
    <p class="eyebrow">
        <a href={resolve('/events')}>Field Expeditions</a>
    </p>
    <h1>{title}</h1>
    <p class="meta">{date} · {count} photos</p>
</header>

<Gallery {images} />

<style>
    .meta {
        color: var(--medium-grey);
        font-family: var(--font-sans);
        font-size: var(--text-sm);
    }
</style>
