<script>
    import { onMount } from 'svelte'
    import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js?client'
    import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js?client'
    import 'photoswipe/dist/photoswipe.css'

    import Gallery from 'svelte-gallery'
    import Image from './Image.svelte'

    onMount(() => {
        const lightbox = new PhotoSwipeLightbox({
            pswpModule: PhotoSwipe,
            gallery: '#gallery',
            children: 'a',
            zoomSVG: '',
        })
        lightbox.init()
    })

    const rowHeight = 500
    const gutter = 12

    export let images
</script>

<div id="gallery" class="full-bleed">
    {#key images[0]}
        <Gallery {images} {rowHeight} {gutter} imageComponent={Image} />
    {/key}
</div>
