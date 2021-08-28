<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    import Image from '$lib/components/Image.svelte'
    export let images
</script>

<h1>Portfolio</h1>

<p>
    These are my favourite photos. Also see <a href="/events">Events</a>.
</p>

{#each images as image}
    <Image value={image} />
{/each}
