<script context="module">
    export async function load({ page, fetch }) {
        const slug = page.params.slug
        const { event, pages } = await fetch(
            `/events/${slug}.json?${page.query}`
        ).then((r) => r.json())

        return {
            props: { event, pages },
        }
    }
</script>

<script>
    import { page } from '$app/stores'
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Pagination from '$lib/components/misc/Pagination.svelte'

    export let event
    export let pages

    $: ({ images, count, date, title } = event)
    $: currentPage = +$page.query.get('page') || 1
</script>

<SEO {title} />

<div class="flex items-center justify-between">
    <h1>{title}</h1>
    <Button href="/events" text="Events" left />
</div>
<div class="sub">{date} &middot; {count} photos</div>

<Gallery {images} />
<Pagination {pages} {currentPage} href={(page) => `?page=${page}`} />

<style>
    .sub {
        margin-top: var(--s-1);
        margin-bottom: var(--s1);
    }
</style>
