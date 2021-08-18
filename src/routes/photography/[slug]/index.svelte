<script context="module">
    export async function load({ page, fetch }) {
        const slug = page.params.slug
        const gallery = await fetch(`/photography/${slug}.json`).then((r) =>
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

    const { images, title, date } = gallery

    console.log('images', images)
</script>

<h1>{title}</h1>

<p>{date}</p>

<Gallery {images} rowHeight="400" />
