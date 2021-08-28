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

    export let event

    const { images, count, date, title } = event

    console.log('event', event)
</script>

<h1>{title}</h1>

<p>
    <a href="/photography">Portfolio</a> /
    <a href="/events">Events</a> /
    {title}
</p>

<p class="sub">{date} &middot; {count} photos</p>

<Gallery {images} />
