<script>
    import { generateSrcSets, sizes } from '$lib/utils/images'
    import 'lazysizes'

    export let name
    export let filePath
    export let width
    export let height
    export let thumbnail
    export let lockedRatio = false
    export let photoswipe = false

    const srcset = generateSrcSets(filePath)
</script>

<div class:lockedRatio>
    {#if photoswipe}
        <a
            href={thumbnail}
            data-pswp-width={width}
            data-pswp-height={height}
            data-pswp-src={thumbnail}
            data-pswp-srcset={srcset}
        >
            <img
                data-sizes="auto"
                data-srcset={srcset}
                src={thumbnail}
                {sizes}
                {width}
                {height}
                alt={name}
                class="lazyload"
            />
        </a>
    {:else}
        <img
            data-sizes="auto"
            data-srcset={srcset}
            src={thumbnail}
            {sizes}
            {width}
            {height}
            alt={name}
            class="lazyload"
        />
    {/if}
</div>

<style>
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
