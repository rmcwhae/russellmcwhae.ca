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
     */

    /** @type {Props} */
    let { filePath, width = 3, height = 2, title, href } = $props()
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
        />
    {:else}
        <div class="event-placeholder"></div>
    {/if}
    <span class="event-title">
        <span class="event-title-text">{title}</span>
    </span>
</a>

<style>
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
        /* Room for Cardo bold descenders between lines and above the card edge */
        --title-leading: 1.55;

        position: absolute;
        inset: auto 0 0;
        margin: 0;
        padding: 1.5rem 0.55rem 0.4rem;
        color: var(--paper);
        font-family: var(--font-serif);
        font-size: var(--text-xs);
        font-weight: var(--serif-heading-weight);
        line-height: var(--title-leading);
        letter-spacing: var(--tracking-heading);
        background: linear-gradient(to top, rgb(9 10 9 / 70%), transparent);
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
            transition: transform 600ms ease;
        }

        .event-card:hover :global(img) {
            transform: scale(1.03);
        }
    }

    @media (min-width: 577px) {
        .event-title {
            --title-leading: 1.45;

            padding: 2.5rem 1rem 0.5rem;
            font-size: var(--text-md);
        }
    }
</style>
