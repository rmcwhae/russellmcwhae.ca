<script>
    import 'lazysizes'
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
                data-sizes="auto"
                data-srcset={srcset}
                src={lqip}
                {sizes}
                {width}
                {height}
                alt={caption}
                class="lazyload"
            />
        </a>
    {:else}
        <img
            data-sizes="auto"
            data-srcset={srcset}
            src={lqip}
            {sizes}
            {width}
            {height}
            alt={caption}
            class="lazyload"
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
