<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Pagination from '$lib/components/misc/Pagination.svelte'
    import { paginate } from '$lib/utils/array'
    import { IMAGES_PER_PAGE } from '$lib/constants'

    export let data

    $: images = data.images

    const pageSize = IMAGES_PER_PAGE

    let currentPage = 1

    $: paginatedImages = paginate(images, pageSize, currentPage)
</script>

<div class="flex items-center justify-between mb-s0">
    <h1>Portfolio</h1>
    <Button right href="/events" text="All events" />
</div>

<SEO title="Photography" />

<Gallery images={paginatedImages} />

<Pagination
    totalItems={images.length}
    {pageSize}
    {currentPage}
    on:setPage={(e) => {
        currentPage = e.detail.page
    }}
/>
