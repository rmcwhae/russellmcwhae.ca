<script>
    // PhotoSwipe must only load on the client
    import Gallery from 'svelte-gallery'
    import Image from './Image.svelte'
    import 'photoswipe/dist/photoswipe.css'

    $effect(async () => {
        // Dynamic imports to avoid linter issues
        const { default: PhotoSwipeLightbox } =
            await import('photoswipe/lightbox')
        const { default: PhotoSwipe } = await import('photoswipe')

        const lightbox = new PhotoSwipeLightbox({
            pswpModule: PhotoSwipe,
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
                onInit: (el) => {
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

        return () => {
            lightbox.destroy()
        }
    })

    const rowHeight = 500
    const gutter = 12

    let { images } = $props()
    let galleryEl = $state(null)

    $effect(() => {
        if (!galleryEl || !images.length) return

        let observer

        const id = setTimeout(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('scroll-in-visible')
                            observer.unobserve(entry.target)
                        }
                    })
                },
                { threshold: 0.05 }
            )

            galleryEl.querySelectorAll('img').forEach((img, i) => {
                if (!img.classList.contains('scroll-in-visible')) {
                    img.style.setProperty(
                        '--scroll-delay',
                        `${Math.min(i % 4, 3) * 0.07}s`
                    )
                    observer.observe(img)
                }
            })
        }, 50)

        return () => {
            clearTimeout(id)
            observer?.disconnect()
        }
    })
</script>

<div id="gallery" bind:this={galleryEl}>
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

    #gallery :global(img) {
        opacity: 0;
        transform: translateY(12px);
        transition:
            opacity 0.45s ease-out var(--scroll-delay, 0s),
            transform 0.45s ease-out var(--scroll-delay, 0s);
    }

    #gallery :global(img.scroll-in-visible) {
        opacity: 1;
        transform: none;
    }

    @media (prefers-reduced-motion: reduce) {
        #gallery :global(img) {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
</style>
