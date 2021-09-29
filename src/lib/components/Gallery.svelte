<script>
    import Gallery from 'svelte-gallery'
    import Image from '$lib/components/Image.svelte'

    const rowHeight = 460
    const gutter = 8

    export let images
</script>

<div class="full-bleed">
    <Gallery {images} {rowHeight} {gutter} imageComponent={Image} />
</div>
<!-- {#each images as { name, filePath, width, height, thumbnail }}
    <Image {name} {filePath} {width} {height} {thumbnail} />
{/each} -->
