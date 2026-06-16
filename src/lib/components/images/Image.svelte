<script>
    import {
        generateSrcSets,
        buildURL,
        displaySizes,
        pickSrcWidth,
        LIGHTBOX_MAX_WIDTH,
    } from '$lib/utils/images'

    /**
     * @typedef {Object} Props
     * @property {any} filePath
     * @property {any} width
     * @property {any} height
     * @property {any} customMetadata
     * @property {boolean} [lockedRatio]
     * @property {boolean} [photoswipe]
     * @property {number} [displayWidth] Rendered width in px (for accurate sizes/src).
     */

    /** @type {Props} */
    let {
        filePath,
        width,
        height,
        customMetadata,
        lockedRatio = false,
        photoswipe = false,
        displayWidth = undefined,
    } = $props()

    const src = $derived(
        buildURL(filePath, { width: pickSrcWidth(displayWidth) })
    )
    const lightboxSrc = $derived(
        buildURL(filePath, {
            width: Math.min(width ?? LIGHTBOX_MAX_WIDTH, LIGHTBOX_MAX_WIDTH),
        })
    )
    const srcset = $derived(generateSrcSets(filePath))
    const imgSizes = $derived(displaySizes(displayWidth))
    const caption = $derived(customMetadata?.caption ?? '')
</script>

<div class:lockedRatio>
    {#if photoswipe}
        <a
            class="no-shadow"
            href={lightboxSrc}
            data-pswp-width={width}
            data-pswp-height={height}
            data-pswp-src={lightboxSrc}
            data-pswp-srcset={srcset}
        >
            <img
                loading="lazy"
                sizes={imgSizes}
                {srcset}
                {src}
                {width}
                {height}
                alt={caption}
            />
        </a>
    {:else}
        <img
            loading="lazy"
            sizes={imgSizes}
            {srcset}
            {src}
            {width}
            {height}
            alt={caption}
        />
    {/if}
</div>

<style>
    div {
        line-height: 0;
    }
    img {
        border-radius: var(--radius);
        width: 100%;
        height: auto;
    }
    .lockedRatio {
        position: relative;
    }
    /* Create a pseudo element that uses padding-bottom to take up space */
    .lockedRatio::after {
        display: block;
        content: '';
        aspect-ratio: 3 / 2;
    }

    /* Image is positioned absolutely relative to the parent element */
    .lockedRatio img {
        /* Image should match parent box size */
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
