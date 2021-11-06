<script>
    import LeftChevron from '$lib/components/icons/LeftChevron.svelte'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'

    export let href
    export let text
    export let external = false
    export let left = false
    export let right = false

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
