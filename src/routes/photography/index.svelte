<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    import Gallery from '$lib/components/Gallery.svelte'
    import Button from '$lib/components/Button.svelte'
    import SEO from '$lib/components/SEO.svelte'

    export let images
</script>

<h1>Portfolio</h1>

<div>
    <p class="big">This is a showcase of my favourite photos.</p>
    <p class="nowrap second">
        <Button right href="/events" text="All events" />
    </p>
</div>

<SEO title="Photography" />

<Gallery {images} />

<style>
    .big {
        font-size: 1.2em;
        /* TODO make me reusable and responsive (disable on mobile…) */
    }
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* flex-wrap: wrap; */
    }
    .second {
        margin-left: var(--s0);
    }
    h1 {
        margin: var(--s0) 0;
    }
    p {
        margin-top: 0;
    }
</style>
