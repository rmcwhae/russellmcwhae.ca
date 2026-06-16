<script>
    import {
        buildURL,
        generateSrcSets,
        gridSizes,
        DEFAULT_SRC_WIDTH,
        LIGHTBOX_MAX_WIDTH,
    } from '$lib/utils/images'
    import 'photoswipe/dist/photoswipe.css'

    let { images } = $props()

    let galleryEl = $state(null)

    $effect(() => {
        if (!galleryEl) return
        const items = galleryEl.querySelectorAll('.gallery-item')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )
        items.forEach((item, i) => {
            item.style.setProperty('--delay', `${Math.min(i, 3) * 0.08}s`)
            observer.observe(item)
        })
        return () => observer.disconnect()
    })

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

<div id="homepage-gallery" class="homepage-gallery-grid" bind:this={galleryEl}>
    {#each images as image (image.filePath)}
        {@const caption = image.customMetadata?.caption ?? ''}
        {@const fullSrc = buildURL(image.filePath, { width: LIGHTBOX_MAX_WIDTH })}
        {@const thumbSrc = buildURL(image.filePath, { width: DEFAULT_SRC_WIDTH })}
        {@const srcset = generateSrcSets(image.filePath)}
        <div class="gallery-item">
            <a
                class="no-shadow"
                href={fullSrc}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                data-pswp-src={fullSrc}
                data-pswp-srcset={srcset}
            >
                <div class="thumb">
                    <img
                        loading="lazy"
                        sizes={gridSizes}
                        {srcset}
                        src={thumbSrc}
                        width={image.width}
                        height={image.height}
                        alt={caption}
                    />
                </div>
            </a>
            {#if caption}
                <div class="thumb-caption">{caption}</div>
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .homepage-gallery-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;

        @include for-tablet-portrait-down {
            grid-template-columns: repeat(2, 1fr);
        }

        @include for-phone-only {
            grid-template-columns: 1fr;
        }
    }

    .gallery-item {
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(16px);
        transition:
            opacity 0.5s ease-out,
            transform 0.5s ease-out;
        transition-delay: var(--delay, 0s);

        @media (prefers-reduced-motion: reduce) {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }

    .gallery-item:global(.visible) {
        opacity: 1;
        transform: none;
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
        }
    }

    a:hover .thumb img {
        transform: scale(1.03);
    }

    .thumb-caption {
        font-size: 14px;
        font-family: var(--font-sans);
        color: var(--medium-grey);
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
