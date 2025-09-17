<script>
    import LeftChevron from '$lib/components/icons/LeftChevron.svelte'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} href
     * @property {any} text
     * @property {boolean} [external]
     * @property {boolean} [left]
     * @property {boolean} [right]
     */

    /** @type {Props} */
    let { href, text, external = false, left = false, right = false } = $props()

    const rel = external ? 'noopener noreferrer nofollow' : ''
    const target = external ? '_blank' : ''
</script>

<a {href} class="button" {rel} {target}>
    {#if left}
        <span class="left">
            <LeftChevron />
        </span>
    {/if}
    <span>{text}</span>
    {#if right}
        <span class="right">
            <RightChevron />
        </span>
    {/if}
</a>

<style>
    a {
        display: inline-flex;
        align-items: center;
    }
    .left {
        margin-right: var(--s-2);
    }
    .right {
        margin-left: var(--s-2);
    }
</style>
