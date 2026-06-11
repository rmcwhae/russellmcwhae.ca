<script>
    import { resolve } from '$app/paths'

    let { category } = $props()
</script>

{#if category}
    <span>
        <a href={resolve('/journal/category/[category]', { category })}>
            {category}
        </a>
    </span>
{/if}

<style>
    a {
        color: var(--text-color);
    }
</style>
