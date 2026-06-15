<script>
    /** @typedef {'latest' | 'long-read'} StatusVariant */

    /**
     * @typedef {Object} Props
     * @property {StatusVariant} variant
     */

    /** @type {Props} */
    let { variant } = $props()

    /** @type {Record<StatusVariant, string>} */
    const labels = {
        latest: 'Latest',
        'long-read': 'Long Read',
    }
</script>

<span class="status-pill" data-variant={variant}>{labels[variant]}</span>

<style lang="scss">
    .status-pill {
        display: inline-block;
        padding: 0.08em 0.6em;
        border-radius: 999px;
        font-size: 0.85rem;
        line-height: 1.3;
        white-space: nowrap;
        background-color: transparent;
        color: var(--pill-color);
        border: 1px solid var(--light-grey);
    }

    .status-pill[data-variant='latest'] {
        --pill-color: var(--high-contrast-color);
    }

    .status-pill[data-variant='long-read'] {
        --pill-color: #b45309;
    }

    :global(html body[data-theme='dark'])
        .status-pill[data-variant='long-read'] {
        --pill-color: #fbbf24;
    }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light']))
            .status-pill[data-variant='long-read'] {
            --pill-color: #fbbf24;
        }
    }
</style>
