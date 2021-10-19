<script context="module">
    export async function load({ page, fetch }) {
        const { images, pages } = await fetch(
            `/photography.json?${page.query}`
        ).then((r) => r.json())

        return {
            props: {
                images,
                pages,
            },
        }
    }
</script>

<script>
    import { page } from '$app/stores'
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Pagination from '$lib/components/misc/Pagination.svelte'

    export let images
    export let pages

    $: currentPage = +$page.query.get('page') || 1
</script>

<div class="flex items-center justify-between">
    <h1>Portfolio</h1>
    <Button right href="/events" text="All events" />
</div>

<SEO title="Photography" />

<Gallery {images} />
<Pagination {pages} {currentPage} href={(page) => `?page=${page}`} />

<style>
    div {
        margin-bottom: var(--s1);
    }
</style>
