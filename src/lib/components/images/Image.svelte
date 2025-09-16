<script>
    // Use native lazy loading; remove lazysizes dependency
    import { generateSrcSets, sizes } from '$lib/utils/images'

    /**
     * @typedef {Object} Props
     * @property {any} filePath
     * @property {any} width
     * @property {any} height
     * @property {any} lqip - low quality image placeholder
     * @property {any} customMetadata
     * @property {boolean} [lockedRatio]
     * @property {boolean} [photoswipe]
     */

    /** @type {Props} */
    let {
        filePath,
        width,
        height,
        lqip,
        customMetadata,
        lockedRatio = false,
        photoswipe = false
    } = $props();

    const srcset = generateSrcSets(filePath)
    const { caption } = customMetadata || {}
</script>

<div class:lockedRatio>
    {#if photoswipe}
        <a
            class="no-shadow"
            href={lqip}
            data-pswp-width={width}
            data-pswp-height={height}
            data-pswp-src={lqip}
            data-pswp-srcset={srcset}
        >
            <img
                loading="lazy"
                {sizes}
                {srcset}
                src={lqip}
                {width}
                {height}
                alt={caption}
            />
        </a>
    {:else}
        <img
            loading="lazy"
            {sizes}
            {srcset}
            src={lqip}
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
