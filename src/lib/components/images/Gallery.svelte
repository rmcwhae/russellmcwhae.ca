<script>
    // PhotoSwipe must only load on the client
    import Gallery from 'svelte-gallery'
    import Image from './Image.svelte'
    import { mountPhotoSwipe } from './mountPhotoSwipe.js'

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

    let { images, rowHeight = 500 } = $props()
</script>

<div id="gallery">
    {#key images[0]}
        <Gallery {images} {rowHeight} {gutter} imageComponent={Image} />
    {/key}
</div>
