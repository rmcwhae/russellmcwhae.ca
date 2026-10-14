<script>
    // PhotoSwipe must only load on the client
    import Gallery from 'svelte-gallery'
    import Image from './Image.svelte'
    import { mountPhotoSwipe } from './mountPhotoSwipe.js'
    import { gallerySizes } from '#lib/utils/images/static.js'

    $effect(() => {
        let lightbox
        let cancelled = false

        mountPhotoSwipe('#gallery').then((instance) => {
            if (cancelled) instance.destroy()
            else lightbox = instance
        })

        return () => {
            cancelled = true
            lightbox?.destroy()
        }
    })

    const gutter = 12

    let { images, rowHeight = 300 } = $props()

    let galleryImages = $derived(
        images.map((image, index) => ({
            ...image,
            sizes: gallerySizes,
            priority: index === 0,
        }))
    )
</script>

<div id="gallery">
    {#key images[0]}
        <Gallery
            images={galleryImages}
            {rowHeight}
            {gutter}
            imageComponent={Image}
        />
    {/key}
</div>
