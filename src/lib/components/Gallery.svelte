<script>
    import { onMount } from 'svelte'
    import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js?client'
    import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js?client'
    import 'photoswipe/dist/photoswipe.css'

    import Gallery from 'svelte-gallery'
    import Image from '$lib/components/Image.svelte'

    onMount(() => {
        const lightbox = new PhotoSwipeLightbox({
            pswpModule: PhotoSwipe,
            gallery: '#gallery',
            children: 'a',
            zoomSVG: '',
        })
        lightbox.init()
    })

    const rowHeight = 460
    const gutter = 8

    export let images
</script>

<div id="gallery" class="full-bleed">
    <Gallery {images} {rowHeight} {gutter} imageComponent={Image} />
</div>
