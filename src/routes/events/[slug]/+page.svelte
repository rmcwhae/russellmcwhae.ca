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
    h1 {
        margin-top: 0.35rem;
        margin-bottom: 0.4rem;
    }

    .eyebrow a {
        color: inherit;
        font-weight: 500;
        text-decoration: none;
    }

    .eyebrow a:hover {
        color: var(--alpine);
        text-decoration: none;
    }

    .meta {
        margin: 0 0 var(--s1);
        color: var(--medium-grey);
        font-family: var(--font-sans);
        font-size: 0.95rem;
    }
</style>
