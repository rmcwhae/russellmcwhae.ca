<script context="module">
    export async function load({ params, fetch }) {
        const { slug } = params
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
    import Pagination from '$lib/components/misc/Pagination.svelte'
    import { paginate } from '$lib/utils/array'
    import { IMAGES_PER_PAGE } from '$lib/constants'

    export let event

    const { images, count, date, title } = event

    const pageSize = IMAGES_PER_PAGE

    let currentPage = 1

    $: paginatedImages = paginate(images, pageSize, currentPage)
</script>

<SEO {title} />

<div class="flex items-center justify-between">
    <h1>{title}</h1>
    <Button href="/events" text="Events" left />
</div>
<div class="sub mb-s0">{date} &middot; {count} photos</div>

<Gallery images={paginatedImages} />

<Pagination
    totalItems={images.length}
    {pageSize}
    {currentPage}
    on:setPage={(e) => {
        currentPage = e.detail.page
    }}
/>

<style>
    .sub {
        margin-top: var(--s-1);
        margin-bottom: var(--s1);
    }
</style>
