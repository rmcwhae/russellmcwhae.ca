<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    // import Gallery from 'svelte-gallery'
    import Image from 'svelte-image'
    // import Image from 'svimg'
    export let images

    // console.log('images[0]', images[0])
</script>

<h1>Portfolio</h1>

<p>
    These are my favourite photos. Also see <a href="/photos">Events</a>.
</p>
<!-- <Image src="RMCWHAE-20210504-DSC00303-Edit-Edit.jpg" /> -->
{#each images as { title, src, width, height }}
    <Image {src} />
{/each}
