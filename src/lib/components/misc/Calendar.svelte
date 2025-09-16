<script>
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import PurchaseCalendar from '$lib/components/misc/PurchaseCalendar.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} filename
     * @property {boolean} [purchase]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { filename, purchase = false, children } = $props();

    const href = '/pdf/' + filename
</script>

<section>
    <a {href} target="_blank" rel="noopener noreferrer nofollow">{@render children?.()}</a>
    <div class="mb-2">
        {#if purchase}
            <ButtonSet>
                <Button text="Preview" {href} external right />
                <PurchaseCalendar />
            </ButtonSet>
        {:else}
            <Button text="Preview" {href} external right />
        {/if}
    </div>
</section>

<style>
    div {
        margin-top: var(--s-1);
    }
</style>
