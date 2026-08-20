<script>
    import {
        buildURL,
        generateSrcSets,
        DEFAULT_SRC_WIDTH,
        LIGHTBOX_MAX_WIDTH,
    } from '$lib/utils/images'
    import 'photoswipe/dist/photoswipe.css'

    let { images } = $props()

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

<div id="homepage-gallery" class="stack-gallery">
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
            >
                <div class="thumb">
                    <img
                        loading="lazy"
                        sizes="50vw"
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
    .stack-gallery {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--s1);
    }

    .gallery-item {
        display: flex;
        flex-direction: column;
    }

    .thumb {
        aspect-ratio: 3 / 2;
        overflow: hidden;
        border-radius: 2px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: opacity 0.3s ease;
        }
    }

    a:hover .thumb img {
        opacity: 0.92;
    }

    .thumb-caption {
        font-size: var(--text-base);
        font-family: var(--font-sans);
        color: var(--high-contrast-color);
        line-height: 1.4;
        margin-top: 10px;
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
