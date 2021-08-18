<script context="module">
    export async function load({ page, fetch }) {
        const slug = page.params.slug
        const gallery = await fetch(`/photos/${slug}.json`).then((r) =>
            r.json()
        )
        return {
            props: { gallery },
        }
    }
</script>

<script>
    import Gallery from 'svelte-gallery'

    export let gallery

    const { images, title, date, count } = gallery
</script>

<h1>{title}</h1>

<p>
    <a href="/photography">Portfolio</a> /
    <a href="/photos">Events</a> /
    {title}
</p>

<p class="sub">{date} &middot; {count} photos</p>

<Gallery {images} rowHeight="400" />
