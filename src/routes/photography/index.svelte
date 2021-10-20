<script context="module">
    export async function load({ fetch }) {
        const { images } = await fetch('/photography.json').then((r) =>
            r.json()
        )

        return {
            props: {
                images,
            },
        }
    }
</script>

<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Pagination from '$lib/components/misc/Pagination.svelte'

    export let images
    export let pages
    export let currentPage
</script>

<div class="flex items-center justify-between">
    <h1>Portfolio</h1>
    <Button right href="/events" text="All events" />
</div>

<SEO title="Photography" />

<Gallery {images} />
<Pagination {pages} {currentPage} href={(page) => `/photography/${page}`} />

<style>
    div {
        margin-bottom: var(--s1);
    }
</style>
