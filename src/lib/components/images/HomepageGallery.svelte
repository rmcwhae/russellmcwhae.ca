<script>
    import {
        buildURL,
        generateSrcSets,
        carouselSizes,
        DEFAULT_SRC_WIDTH,
        LIGHTBOX_MAX_WIDTH,
    } from '$lib/utils/images'
    import 'photoswipe/dist/photoswipe.css'

    let { images } = $props()

    let galleryEl = $state(null)
    let isDragging = $state(false)
    let startX = $state(0)
    let scrollLeft = $state(0)
    let didDrag = $state(false)

    function onPointerDown(e) {
        isDragging = true
        didDrag = false
        startX = e.clientX
        scrollLeft = galleryEl.scrollLeft
        // No setPointerCapture — allows click events to reach child <a> elements
    }

    function onPointerMove(e) {
        if (!isDragging) return
        const dx = e.clientX - startX
        if (Math.abs(dx) > 5) didDrag = true
        galleryEl.scrollLeft = scrollLeft - dx
    }

    function onPointerUp() {
        isDragging = false
    }

    $effect(async () => {
        const { default: PhotoSwipeLightbox } =
            await import('photoswipe/lightbox')
        const { default: PhotoSwipe } = await import('photoswipe')

        const lightbox = new PhotoSwipeLightbox({
            pswpModule: PhotoSwipe,
            gallery: '#homepage-gallery',
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
</script>

<div
    id="homepage-gallery"
    class="homepage-gallery-carousel"
    class:dragging={isDragging}
    bind:this={galleryEl}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
>
    {#each images as image (image.filePath)}
        {@const caption = image.customMetadata?.caption ?? ''}
        {@const fullSrc = buildURL(image.filePath, {
            width: LIGHTBOX_MAX_WIDTH,
        })}
        {@const thumbSrc = buildURL(image.filePath, {
            width: DEFAULT_SRC_WIDTH,
        })}
        {@const srcset = generateSrcSets(image.filePath)}
        <div class="gallery-item">
            <!-- PhotoSwipe uses href as the full-size image URL, not in-app navigation -->
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            <a
                class="no-shadow"
                href={fullSrc}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                data-pswp-src={fullSrc}
                data-pswp-srcset={srcset}
                onclick={(e) => {
                    if (didDrag) {
                        e.preventDefault()
                        didDrag = false
                    }
                }}
            >
                <div class="thumb">
                    <img
                        loading="lazy"
                        sizes={carouselSizes}
                        {srcset}
                        src={thumbSrc}
                        width={image.width}
                        height={image.height}
                        alt={caption}
                    />
                </div>
            </a>
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
            {#if caption}
                <div class="thumb-caption">{caption}</div>
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .homepage-gallery-carousel {
        display: flex;
        gap: 20px;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 12px;
        cursor: grab;
        user-select: none;

        &::-webkit-scrollbar {
            height: 3px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: var(--medium-grey);
            border-radius: 2px;
        }
        scrollbar-width: thin;
        scrollbar-color: var(--medium-grey) transparent;

        @include for-phone-only {
            gap: 12px;
        }
    }

    .homepage-gallery-carousel.dragging {
        cursor: grabbing;
        scroll-snap-type: none;
    }

    .gallery-item {
        flex: 0 0 clamp(320px, 42%, 520px);
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;

        @include for-tablet-portrait-down {
            flex: 0 0 clamp(260px, 72%, 380px);
        }

        @include for-phone-only {
            flex: 0 0 clamp(240px, 85vw, 320px);
        }
    }

    .thumb {
        aspect-ratio: 3 / 2;
        overflow: hidden;
        border-radius: 2px;
        margin-bottom: 12px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 2px;
            transition: transform 0.3s ease;
            will-change: transform;
        }
    }

    a:hover .thumb img {
        transform: scale(1.03);
    }

    .thumb-caption {
        font-size: 14px;
        font-family: var(--font-sans);
        color: var(--high-contrast-color);
        line-height: 1.4;
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
</style>
