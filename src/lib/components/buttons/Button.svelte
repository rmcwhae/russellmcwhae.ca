<script>
    import { resolve } from '$app/paths'
    import ArrowNorthEast from '#lib/components/icons/ArrowNorthEast.svelte'
    import LeftChevron from '#lib/components/icons/LeftChevron.svelte'

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
</script>

{#snippet content()}
    {#if left}
        <span class="left">
            <LeftChevron />
        </span>
    {/if}
    <span>{text}</span>
    {#if right}
        <span class="right">
            <ArrowNorthEast />
        </span>
    {/if}
{/snippet}

{#if external}
    <a
        {href}
        class="button"
        rel="external noopener noreferrer nofollow"
        target="_blank"
    >
        {@render content()}
    </a>
{:else}
    <a href={resolve(href)} class="button">
        {@render content()}
    </a>
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
