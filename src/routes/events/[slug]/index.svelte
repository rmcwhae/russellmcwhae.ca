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
    import Button from '$lib/components/Button.svelte'
    import SEO from '$lib/components/SEO.svelte'

    export let event

    const { images, count, date, title } = event
</script>

<SEO {title} />

<div class="flex justify-between align-center">
    <h1>{title}</h1>
    <Button href="/events" text="Events" left />
</div>
<p class="sub">{date} &middot; {count} photos</p>

<Gallery {images} />
