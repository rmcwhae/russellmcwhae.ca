<script context="module">
    export async function load({ page, fetch }) {
        const slug = page.params.slug
        const event = await fetch(`/events/${slug}.json`).then((r) => r.json())
        return {
            props: { event },
        }
    }
</script>

<script>
    import Gallery from '$lib/components/Gallery.svelte'
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

    export let event

    const { images, count, date, title } = event
    const items = [
        { text: 'Portfolio', url: '/photography' },
        { text: 'Events', url: '/events' },
        { text: title },
    ]
</script>

<Breadcrumbs {items} />

<h1>{title}</h1>
<p class="sub">{date} &middot; {count} photos</p>

<Gallery {images} />

<style>
    h1 {
        margin: var(--s0) 0;
    }
</style>
