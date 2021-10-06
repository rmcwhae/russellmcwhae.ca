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
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let event

    const { images, count, date, title } = event
</script>

<SEO {title} />

<div class="flex justify-between align-center">
    <h1>{title}</h1>
    <Button href="/events" text="Events" left />
</div>
<div class="sub">{date} &middot; {count} photos</div>

<Gallery {images} />

<style>
    .sub {
        margin-top: var(--s-1);
        margin-bottom: var(--s1);
    }
</style>
