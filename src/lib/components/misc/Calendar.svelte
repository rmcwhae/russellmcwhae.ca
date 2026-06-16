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
    <a {href} target="_blank" rel="noopener noreferrer nofollow"
        >{@render children?.()}</a
    >
</section>
