<script>
    // PhotoSwipe must only load on the client
    import layout from 'svelte-gallery/src/lib/layout.js'
    import Image from './Image.svelte'
    import 'photoswipe/dist/photoswipe.css'

    $effect(async () => {
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
    let containerWidth = $state(0)

    let scaledImages = $derived(
        layout({
            images,
            containerWidth: containerWidth || 1280,
            targetHeight: rowHeight,
            gutter,
        })
    )

    function imgStyle({ scaledWidth, scaledHeight, isLastInRow, isLastRow }) {
        let marginRight = gutter + 'px'
        let flex = `0 0 ${scaledWidth}px`
        let marginBottom = isLastRow ? '0' : marginRight

        if (isLastInRow) {
            marginRight = '0'
            flex = `1 1 ${scaledWidth - 4}px`
        }

        return `height: ${scaledHeight}px; flex: ${flex}; margin-right: ${marginRight}; margin-bottom: ${marginBottom};`
    }

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
    {#key images[0]?.filePath}
        <div class="masonry" bind:clientWidth={containerWidth}>
            <div
                class="container"
                style:width="{containerWidth}px"
                class:hidden={!containerWidth}
            >
                {#each scaledImages as { scaledHeight, scaledWidth, isLastInRow, isLastRow, ...image } (image.filePath)}
                    <div
                        class="image"
                        style={imgStyle({
                            scaledHeight,
                            scaledWidth,
                            isLastInRow,
                            isLastRow,
                        })}
                    >
                        <Image {...image} displayWidth={scaledWidth} />
                    </div>
                {/each}
            </div>
        </div>
    {/key}
</div>

<style>
    .masonry {
        max-width: 100%;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .image {
        position: relative;
        height: 100%;
    }

    .image > :global(*) {
        width: 100%;
        height: 100%;
    }

    .hidden {
        visibility: hidden;
    }

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
