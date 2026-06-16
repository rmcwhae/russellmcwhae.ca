<script>
    import { resolve } from '$app/paths'
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

    const rel = $derived(external ? 'noopener noreferrer nofollow' : '')
    const target = $derived(external ? '_blank' : '')
</script>

{#snippet label()}
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
{/snippet}

{#if external}
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL -->
    <a class="button" {href} {rel} {target}>{@render label()}</a>
{:else}
    <a class="button" href={resolve(href)} {rel} {target}>{@render label()}</a>
{/if}

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
