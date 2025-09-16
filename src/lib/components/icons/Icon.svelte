<script>
    /**
     * @typedef {Object} Props
     * @property {string} [viewBox]
     * @property {string} [height]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { viewBox = '0 0 24 24', height = '1em', children } = $props();
</script>

<svg
    class="icon"
    style="height: {height}"
    xmlns="http://www.w3.org/2000/svg"
    {viewBox}
    fill="currentColor"
>
    {@render children?.()}
</svg>

<style>
    .icon {
        vertical-align: middle;
    }

    :global(.with-icon) {
        display: inline-flex;
        align-items: baseline;
    }

    :global(.with-icon) .icon {
        margin-inline-end: 1rem;
    }
</style>
