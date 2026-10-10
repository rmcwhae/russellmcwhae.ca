<script>
    // Use native lazy loading; remove lazysizes dependency
    import {
        generateSrcSets,
        sizes,
        buildURL,
    } from '#lib/utils/images/index.js'

    /**
     * @typedef {Object} Props
     * @property {any} filePath
     * @property {any} width
     * @property {any} height
     * @property {any} customMetadata
     * @property {boolean} [lockedRatio]
     * @property {boolean} [photoswipe]
     * @property {boolean} [priority]
     */

    /** @type {Props} */
    let {
        filePath,
        width,
        height,
        customMetadata,
        lockedRatio = false,
        photoswipe = false,
        priority = false,
    } = $props()

    const src = $derived(buildURL(filePath, { width, height }))
    const srcset = $derived(generateSrcSets(filePath))
    const caption = $derived(customMetadata?.caption ?? '')
</script>

<div class:lockedRatio>
    {#if photoswipe}
        <a
            href={src}
            data-pswp-width={width}
            data-pswp-height={height}
            data-pswp-src={src}
            data-pswp-srcset={srcset}
            data-cropped={lockedRatio ? 'true' : undefined}
        >
            <img
                loading={priority ? 'eager' : 'lazy'}
                fetchpriority={priority ? 'high' : 'auto'}
                {sizes}
                {srcset}
                {src}
                {width}
                {height}
                alt={caption}
            />
        </a>
    {:else}
        <img
            loading={priority ? 'eager' : 'lazy'}
            fetchpriority={priority ? 'high' : 'auto'}
            {sizes}
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

    .lockedRatio a {
        position: absolute;
        inset: 0;
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
