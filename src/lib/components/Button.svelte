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
        <LeftChevron />
    {/if}
    {text}
    {#if right}
        <RightChevron />
    {/if}
</a>
