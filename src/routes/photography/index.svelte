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
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

    const items = [{ text: 'Portfolio' }]

    export let images
</script>

<!-- <h1>Portfolio</h1> -->
<Breadcrumbs {items} />
<div>
    <p class="big">This is a showcase of my favourite photos.</p>
    <p class="nowrap second">
        <a href="/events" class="button">All Events</a>
    </p>
</div>

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
</style>
