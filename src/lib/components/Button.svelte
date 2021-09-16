<script>
    import LeftChevron from '$lib/components/icons/LeftChevron.svelte'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'

    export let href
    export let text
    export let left = false
    export let right = false
</script>

<a {href} class="button">
    {#if left}
        <span class="chevron left">
            <LeftChevron />
        </span>
    {/if}
    <span>{text}</span>
    {#if right}
        <span class="chevron right">
            <RightChevron />
        </span>
    {/if}
</a>

<style>
    .chevron {
        font-size: 0.75em;
    }
    a {
        display: inline-flex;
    }
    .left {
        margin-right: var(--s-2);
    }
    .right {
        margin-left: var(--s-2);
    }
</style>
