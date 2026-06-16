<script>
    /**
     * @typedef {Object} Props
     * @property {any} filename
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { filename, children } = $props()

    const href = $derived('/pdf/' + filename)
</script>

<section>
    <!-- Static PDF asset, not a SvelteKit route -->
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a {href} target="_blank" rel="noopener noreferrer nofollow"
        >{@render children?.()}</a
    >
</section>
