<script>
    // Use native lazy loading; remove lazysizes dependency
    import { generateSrcSets, sizes } from '$lib/utils/images'

    export let filePath
    export let width
    export let height
    export let lqip // low quality image placeholder
    export let customMetadata
    export let lockedRatio = false
    export let photoswipe = false

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
                sizes={sizes}
                srcset={srcset}
                src={lqip}
                {width}
                {height}
                alt={caption}
            />
        </a>
    {:else}
        <img
            loading="lazy"
            sizes={sizes}
            srcset={srcset}
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
