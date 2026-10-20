<script>
    import Image from './Image.svelte'
    import { gallerySizes } from '#lib/utils/images/static.js'

    /**
     * Image component for svelte-gallery on the events index.
     * Extra props from the mosaic layout are ignored.
     * @typedef {Object} Props
     * @property {string} [filePath]
     * @property {number} [width]
     * @property {number} [height]
     * @property {string} title
     * @property {string} href
     * @property {string} [placeholder]
     */

    /** @type {Props} */
    let {
        filePath,
        width = 3,
        height = 2,
        title,
        href,
        placeholder = undefined,
    } = $props()
</script>

<a class="event-card" {href} {title}>
    {#if filePath}
        <Image
            {filePath}
            {width}
            {height}
            customMetadata={undefined}
            sizes={gallerySizes}
            photoswipe={false}
            {placeholder}
        />
    {:else}
        <div class="event-placeholder"></div>
    {/if}
    <span class="event-title">
        <span class="event-title-text media-caption">{title}</span>
    </span>
</a>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .event-card {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: var(--radius);
        color: inherit;
        text-decoration: none;
    }

    .event-card:hover {
        text-decoration: none;
    }

    .event-card :global(div) {
        width: 100%;
        height: 100%;
    }

    .event-card :global(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--radius);
    }

    .event-placeholder {
        width: 100%;
        height: 100%;
        background: var(--light-grey);
    }

    .event-title {
        /* Room for Cardo italic descenders between lines and above the card edge */
        --title-leading: 1.55;

        position: absolute;
        inset: auto 0 0;
        margin: 0;
        padding: 1.5rem 0.55rem 0.4rem;
        color: var(--paper);
        line-height: var(--title-leading);
        background: linear-gradient(
            to top,
            color-mix(in srgb, var(--scrim-color) 70%, transparent),
            transparent
        );
        pointer-events: none;
    }

    .event-title-text {
        /*
         * Clamp on an inner span — padding/gradient on the parent confuse line-clamp.
         * max-height matches two line boxes so descenders aren’t shaved off.
         */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        max-height: calc(var(--title-leading) * 2em);
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
    }

    @media (prefers-reduced-motion: no-preference) {
        .event-card :global(img) {
            transition:
                transform 600ms ease,
                opacity 0.3s ease;
        }

        .event-card:hover :global(img) {
            transform: scale(1.03);
        }
    }

    @include for-tablet-portrait-up {
        .event-title {
            --title-leading: 1.45;

            padding: 2.5rem 1rem 0.5rem;
        }
    }
</style>
