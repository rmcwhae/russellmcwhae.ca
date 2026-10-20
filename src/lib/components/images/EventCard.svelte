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

<a class="event-card" {href}>
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
    <span class="event-title">{title}</span>
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
        position: absolute;
        inset: auto 0 0;
        margin: 0;
        padding: 1.5rem 0.55rem 0.45rem;
        color: var(--paper);
        font-family: var(--font-serif);
        font-size: var(--text-xs);
        font-weight: var(--serif-heading-weight);
        line-height: var(--leading-snug);
        letter-spacing: var(--tracking-heading);
        text-wrap: pretty;
        background: linear-gradient(to top, rgb(9 10 9 / 70%), transparent);
        pointer-events: none;
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
            padding: 2.5rem 1rem 0.85rem;
            font-size: var(--text-md);
        }
    }

    @media (max-width: 576px) {
        .event-title {
            /* Keep long titles from dominating the shorter mosaic cells */
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
</style>
