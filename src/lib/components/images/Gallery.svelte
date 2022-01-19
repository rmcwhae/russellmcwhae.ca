<script>
    import { onMount } from 'svelte'
    import 'photoswipe/dist/photoswipe.css'

    import Gallery from 'svelte-gallery'
    import Image from './Image.svelte'

    onMount(async () => {
        const PhotoSwipeLightbox = await import(
            'photoswipe/dist/photoswipe-lightbox.esm.js'
        )
        const PhotoSwipe = await import('photoswipe/dist/photoswipe.esm.js')
        const lightbox = new PhotoSwipeLightbox.default({
            pswpModule: PhotoSwipe.default,
            gallery: '#gallery',
            children: 'a',
            zoomSVG: '',
        })

        lightbox.on('uiRegister', function () {
            lightbox.pswp.ui.registerElement({
                name: 'custom-caption',
                order: 9,
                isButton: false,
                appendTo: 'root',
                html: 'Caption text',
                onInit: (el, pswp) => {
                    lightbox.pswp.on('change', () => {
                        const currSlideElement =
                            lightbox.pswp.currSlide.data.element
                        let captionHTML = ''
                        if (currSlideElement) {
                            // get caption from alt attribute
                            captionHTML = currSlideElement
                                .querySelector('img')
                                .getAttribute('alt')
                        }
                        el.innerHTML = captionHTML || ''
                        if (!captionHTML) {
                            el.classList.add('no-caption')
                        } else {
                            el.classList.remove('no-caption')
                        }
                    })
                },
            })
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

<style>
    :global(.pswp__custom-caption) {
        background: var(--background-color-transparent);
        color: var(--high-contrast-color);
        max-width: 400px;
        padding: var(--s-4) var(--s0);
        border-radius: var(--radius);
        position: absolute;
        left: 50%;
        bottom: var(--s0);
        transform: translateX(-50%);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    }
    :global(.no-caption) {
        display: none;
    }
</style>
