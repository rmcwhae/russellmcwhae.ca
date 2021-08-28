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
    import * as StringUtils from '$lib/utils/string'
    import Image from '$lib/components/Image.svelte'

    export let event

    const { images, slug, count } = event
    const date = StringUtils.extractDate(slug)
    const title = StringUtils.createTitle(slug)
</script>

<h1>{title}</h1>

<p>
    <a href="/photography">Portfolio</a> /
    <a href="/events">Events</a> /
    {title}
</p>

<p class="sub">{date} &middot; {count} photos</p>

{#each images as image}
    <Image value={image} />
{/each}
