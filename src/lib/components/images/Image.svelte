<script>
    // Use native lazy loading; remove lazysizes dependency
    import {
        generateSrcSets,
        buildURL,
        DISPLAY_WIDTH,
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
     * @property {string} sizes
     * @property {string} [placeholder] Blurred preview data URI
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
        sizes,
        placeholder = undefined,
    } = $props()

    /** @type {HTMLImageElement | undefined} */
    let img = $state()
    let mounted = $state(false)
    let loaded = $state(false)

    // Images can finish loading before hydration, when onload has no
    // listener yet. Fading only starts once mounted, so without JavaScript
    // images are simply visible.
    $effect(() => {
        mounted = true
        if (img?.complete) loaded = true
    })

    const src = $derived(
        buildURL(filePath, {
            width: Math.min(DISPLAY_WIDTH, Number(width) || DISPLAY_WIDTH),
        })
    )
    const fullSrc = $derived(buildURL(filePath, { width }))
    const srcset = $derived(generateSrcSets(filePath))
    const caption = $derived(customMetadata?.caption ?? '')
</script>

{#snippet photo()}
    <img
        bind:this={img}
        class:pending={mounted && !loaded}
        onload={() => (loaded = true)}
        onerror={() => (loaded = true)}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        {sizes}
        {srcset}
        {src}
        {width}
        {height}
        alt={caption}
    />
{/snippet}

<div
    class:lockedRatio
    class:has-lqip={placeholder}
    style={placeholder ? `--lqip: url("${placeholder}")` : undefined}
>
    {#if photoswipe}
        <a
            href={fullSrc}
            data-pswp-width={width}
            data-pswp-height={height}
            data-pswp-src={fullSrc}
            data-pswp-srcset={srcset}
            data-cropped={lockedRatio ? 'true' : undefined}
            aria-label={caption ? undefined : 'View photo'}
        >
            {@render photo()}
        </a>
    {:else}
        {@render photo()}
    {/if}
</div>

<style>
    div {
        line-height: 0;
        background-color: var(--stone);
    }
    img {
        border-radius: var(--radius);
        width: 100%;
        height: auto;
    }

    /* The tiny preview, blurred and scaled up a touch to hide soft edges */
    .has-lqip {
        position: relative;
        overflow: hidden;
    }
    .has-lqip::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--lqip) center / cover no-repeat;
        filter: blur(12px);
        transform: scale(1.1);
    }
    /* Stacks above the preview; locked-ratio images are already positioned */
    .has-lqip:not(.lockedRatio) img {
        position: relative;
    }

    .pending {
        opacity: 0;
    }
    @media (prefers-reduced-motion: no-preference) {
        img {
            transition: opacity 0.3s ease;
        }
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
