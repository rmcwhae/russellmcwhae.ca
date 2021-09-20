<script>
    import Button from './Button.svelte'

    export let page
    export let pageSize
    export let length
    export let href
</script>

<div>
    {#if page === 2}
        <Button left {href} text="Back" />
    {/if}
    {#if page > 2}
        <Button left href={href + '?page=' + (page - 1)} text="Back" />
    {/if}
    {#if length === pageSize}
        <div class="right">
            <Button right href={href + '?page=' + (page + 1)} text="Next" />
        </div>
    {/if}
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
    }
    .right {
        text-align: right;
        margin-left: auto;
    }
</style>
