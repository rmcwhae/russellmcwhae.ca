<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();
</script>

<div>
    {@render children?.()}
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        gap: var(--s0);
    }
</style>
