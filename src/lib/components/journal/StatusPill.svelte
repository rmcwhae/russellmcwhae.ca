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
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        line-height: 1.3;
        white-space: nowrap;
        color: var(--medium-grey);
    }
</style>
